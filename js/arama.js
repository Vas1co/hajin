// Sitenin her sayfasındaki arama: harita noktaları, lokasyonlar, eşyalar, görevler, rehber ve sözlük tek yerden.
// Yazmaya başlar başlamaz süzer: "b" yazınca adında b ile başlayan kelime olanlar gelir, yazdıkça daralır.
// Türkçe harf, büyük küçük harf ve boşluk farkı önemsiz ("black market" de "Blackmarket"i bulur).
// Hiç sonuç çıkmazsa küçük yazım hatalarına göz yumar ("wapons" da "Weapons"u bulur).
window.DMZ = window.DMZ || {};

DMZ.Arama = (function () {
  const { $, $$, kacis, sade } = DMZ.yardim;

  // Sonuçların gruplandığı bölümler, varsayılan sırasıyla
  const GRUPLAR = {
    harita:   { ad: 'Haritada', ikon: 'harita' },
    lokasyon: { ad: 'Lokasyonlar', ikon: 'bolge' },
    esya:     { ad: 'Eşyalar', ikon: 'esya' },
    gorev:    { ad: 'Görevler', ikon: 'gorev' },
    rehber:   { ad: 'Rehber ve sözlük', ikon: 'kilavuz' },
  };
  const TUR_ADLARI = { ana: 'Ana bölge', ara: 'Ara bölge', kale: 'Kale' };

  // ---------- Eşleştirme ----------

  // Metni aramaya hazırlar: harf farkı yok, noktalama boşluğa döner, boşluksuz hali de saklanır
  function hazirla(metin) {
    const duz = sade(metin).replace(/[^a-z0-9]+/g, ' ').trim();
    return { duz, bitisik: duz.replace(/ /g, ''), kelimeler: duz ? duz.split(' ') : [] };
  }

  // İki kelime arasındaki harf farkı (eksik, fazla, yanlış ya da yer değiştirmiş harf). Sınırı aşınca erken bırakır.
  function harfFarki(a, b, sinir) {
    if (Math.abs(a.length - b.length) > sinir) return sinir + 1;
    let ikiOnce = null;
    let once = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const satir = [i];
      let enAz = i;
      for (let j = 1; j <= b.length; j++) {
        let d = Math.min(once[j] + 1, satir[j - 1] + 1, once[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, ikiOnce[j - 2] + 1);
        satir.push(d);
        if (d < enAz) enAz = d;
      }
      if (enAz > sinir) return sinir + 1;
      ikiOnce = once;
      once = satir;
    }
    return once[b.length];
  }

  // Yazım hatalı kelime bir kelimenin başına benziyor mu? ("wapons" ~ "weapons", "markt" ~ "market")
  function benzerKelime(k, kelimeler) {
    const izin = k.length >= 7 ? 2 : 1;
    return kelimeler.some((w) => {
      for (let boy = Math.max(1, k.length - izin); boy <= Math.min(w.length, k.length + izin); boy++) {
        if (harfFarki(k, w.slice(0, boy), izin) <= izin) return true;
      }
      return false;
    });
  }

  // Aranan bir kelimenin bir alandaki eşleşmesi: 0 bir kelimenin başı, 1 kelimenin içi, 2 yazım hatasıyla benzer, -1 yok
  function kelimeEslesmesi(k, alan, benzer) {
    if (alan.kelimeler.some((w) => w.startsWith(k))) return 0;
    if (k.length >= 3 && (alan.duz.includes(k) || alan.bitisik.includes(k))) return 1;
    if (benzer && k.length >= 3 && benzerKelime(k, alan.kelimeler)) return 2;
    return -1;
  }

  // Bir kaydın aramaya uygunluğu; küçük puan daha iyi, uymuyorsa Infinity.
  // alanlar: [adlar, bağlam (kategori, bölge, ızgara...), uzun metin (açıklama, adımlar)], hepsi hazırlanmış.
  // Bir iki harflik aramada sadece adlara bakılır. Yazım hatası payı uzun metinlerde yok, yoksa her şey çıkar.
  function puanla(sorgu, alanlar, benzer) {
    const adlar = alanlar[0];
    // Adı yazılanla başlıyorsa en öne. Boşluk önemsiz: "black m" de "Blackmarket" ile başlıyor sayılır.
    if (adlar.some((a) => a.duz.startsWith(sorgu.duz) || a.bitisik.startsWith(sorgu.bitisik))) return -2;
    const kisa = sorgu.bitisik.length < 3;
    let toplam = 0;
    for (const k of sorgu.kelimeler) {
      let enIyi = Infinity;
      for (let sinif = 0; sinif < alanlar.length && enIyi > sinif * 3; sinif++) {
        if ((kisa && sinif > 0) || (sinif === 2 && k.length < 3)) break;
        for (const alan of alanlar[sinif]) {
          const e = kelimeEslesmesi(k, alan, benzer && sinif < 2);
          if (e >= 0 && sinif * 3 + e < enIyi) enIyi = sinif * 3 + e;
          if (enIyi === sinif * 3) break;
        }
      }
      if (enIyi === Infinity) { toplam = Infinity; break; }
      toplam += enIyi;
    }
    // Kelimeler tek tek uymasa da boşluksuz hali adın içinde geçiyorsa ("market w" ve "Blackmarket Weapons")
    if (toplam === Infinity && sorgu.bitisik.length >= 3 && adlar.some((a) => a.bitisik.includes(sorgu.bitisik))) toplam = 1;
    return toplam;
  }

  const alanHazirla = (gruplar) => gruplar.map((g) => g.filter(Boolean).map(hazirla));

  // Sayfadaki bir listeyi aynı kurallarla süzer (lokasyonlar, eşyalar, görevler, sözlük).
  // alanlar(oge): [adlar, bağlam, uzun metin]. En iyi eşleşen önde, eşitlerde listenin kendi sırası korunur.
  // Tam eşleşme yoksa yazım hatası payıyla yeniden dener; o zaman benzer: true döner.
  function suz(liste, metin, alanlar) {
    const sorgu = hazirla(metin);
    if (!sorgu.bitisik) return { liste, aktif: false, benzer: false };
    const hazir = liste.map((oge) => ({ oge, alanlar: alanHazirla(alanlar(oge)) }));
    const dene = (benzer) => hazir.map((h) => ({ oge: h.oge, puan: puanla(sorgu, h.alanlar, benzer) }))
      .filter((h) => h.puan < Infinity)
      .sort((a, b) => a.puan - b.puan);
    let bulunan = dene(false);
    let benzer = false;
    if (!bulunan.length && sorgu.bitisik.length >= 3) { bulunan = dene(true); benzer = bulunan.length > 0; }
    return { liste: bulunan.map((h) => h.oge), aktif: true, benzer };
  }

  // ---------- Bütün sitenin dizini ----------

  const duzMetin = (m) => String(m || '').replace(/<[^>]+>/g, ' ');
  const duzIkon = (ad) => `<span class="sonuc-ikon sonuc-ikon-duz">${DMZ.ikon(ad)}</span>`;

  let kayitlar = null;
  function dizin() {
    if (kayitlar) return kayitlar;
    kayitlar = [];
    const ekle = (k, adlar, baglam, metin) => kayitlar.push({ ...k, alanlar: alanHazirla([adlar, baglam, metin]) });
    // Haritadaki malzeme ve kılavuz noktaları, orada çıkan eşyaların adlarıyla da bulunsun
    const esyaAdlari = (id) => {
      const e = DMZ.tumEsyalar().find((x) => x.id === id);
      const m = (DMZ.malzemeBilgisi || {})[id];
      return [e && e.ad, e && e.tr, m && m.ad, m && m.tr];
    };

    DMZ.tumNoktalar().forEach((n) => {
      const kat = DMZ.kategoriler[n.kategori] || DMZ.kategoriler.diger;
      const lok = DMZ.lokasyonNoktadan(n.id);
      const yakin = DMZ.enYakinBolge(n);
      const nad = n.nadirlik && DMZ.nadirlikler[n.nadirlik];
      const katAd = n.kategori === 'bolge' ? (n.seviye === 'ana' ? 'Ana bölge' : 'Ara bölge') : kat.ad;
      ekle({
        grup: 'harita', id: n.id, baslik: n.ad, en: true,
        alt: [(lok && lok.tr) || n.tr, katAd, !lok && yakin && `${yakin.ad} yakını`, n.izgara].filter(Boolean).join(' · '),
        ikon: DMZ.noktaRozeti(n, 'sonuc-ikon'),
        hedef: `/harita/hajin/?n=${encodeURIComponent(n.id)}`,
        lokasyonlu: !!lok, // bölge ve kalelerin lokasyon kartı da var, harita dışında kart olarak çıkarlar
      }, [n.ad, n.tr, n.anahtar, lok && lok.ad, lok && lok.tr],
      [katAd, kat.en, yakin && yakin.ad, n.izgara, nad && nad.ad, ...((lok && lok.tehlikeDetay) || []).map((d) => d.ad),
        ...[...(n.malzemeler || []), ...(n.kilavuzlar || [])].flatMap(esyaAdlari)],
      [n.aciklama]);
    });

    (DMZ.lokasyonlar || []).forEach((l) => {
      const n = l.nokta && DMZ.tumNoktalar().find((x) => x.id === l.nokta);
      const ust = l.ust && DMZ.lokasyonBul(l.ust);
      const teh = DMZ.tehlikeler[l.tehlike];
      ekle({
        grup: 'lokasyon', id: l.id, baslik: l.ad, en: true,
        alt: [l.tr, TUR_ADLARI[l.tur], ust && `${ust.ad} içinde`].filter(Boolean).join(' · '),
        ikon: n ? DMZ.noktaRozeti(n, 'sonuc-ikon') : duzIkon('bolge'),
        hedef: `/lokasyonlar/?l=${encodeURIComponent(l.id)}`,
        ek: n && { hedef: `/harita/hajin/?n=${encodeURIComponent(n.id)}`, etiket: 'Haritada göster' },
      }, [l.ad, l.tr],
      [TUR_ADLARI[l.tur], ust && ust.ad, teh && teh.ad, ...(l.tehlikeDetay || []).map((d) => d.ad)],
      [l.aciklama]);
    });

    DMZ.tumEsyalar().forEach((e) => {
      const kat = DMZ.esyaKategorileri[e.kategori] || { ad: e.kategori, ikon: 'esya' };
      const nad = DMZ.nadirlikler[e.nadirlik];
      const oda = DMZ.anahtarOdalari(e)[0];
      const malzeme = (DMZ.malzemeBilgisi || {})[e.id] || {}; // yazıcı malzemesiyse yeri ve girdiği tarifler de aranır
      ekle({
        grup: 'esya', id: e.id, baslik: e.ad, en: true,
        alt: [e.tr, kat.ad, nad && nad.ad].filter(Boolean).join(' · '),
        ikon: DMZ.esyaResmi(e.id)
          ? `<span class="sonuc-ikon sonuc-ikon-esya sonuc-resimli" style="--renk:${nad ? nad.renk : 'var(--panel-3)'}"><img src="${kacis(DMZ.esyaResmi(e.id))}" alt="" loading="lazy"></span>`
          : `<span class="sonuc-ikon sonuc-ikon-esya" style="--renk:${nad ? nad.renk : 'var(--panel-3)'}">${DMZ.ikon(kat.ikon)}</span>`,
        hedef: `/esyalar/?e=${encodeURIComponent(e.id)}`,
        ek: oda && { hedef: `/harita/hajin/?n=${encodeURIComponent(oda.id)}`, etiket: 'Açtığı oda haritada' },
      }, [e.ad, e.tr], [kat.ad, nad && nad.ad],
      [e.not, e.nerede, malzeme.nerede, ...(malzeme.kullanim || []), ((DMZ.kilavuzBilgisi || {}).bulunan || {})[e.id]]);
    });

    DMZ.emirSayfalari().forEach((s) => s.gorevler.forEach((g) => {
      const lok = g.lokasyon && DMZ.lokasyonBul(g.lokasyon);
      ekle({
        grup: 'gorev', id: g.id, baslik: g.ad, en: true,
        alt: [`Sayfa ${s.sayfa}`, g.tr].filter(Boolean).join(' · '),
        ikon: duzIkon('gorev'),
        hedef: `/gorevler/?g=${encodeURIComponent(g.id)}`,
      }, [g.ad, g.tr], [`s${s.sayfa}`, s.ad, s.tr, lok && lok.ad, lok && lok.tr], [...(g.adimlar || []), g.ipucu, g.odul]);
    }));

    (DMZ.rehber || []).forEach((b) => {
      ekle({
        grup: 'rehber', id: b.id, baslik: b.baslik, en: false, alt: 'Rehber konusu',
        ikon: duzIkon(b.ikon), hedef: `/rehber/?b=${encodeURIComponent(b.id)}`,
      }, [b.baslik], [], [duzMetin(b.metin), ...(b.maddeler || []).map(duzMetin), duzMetin(b.ipucu), ...(b.tablo ? b.tablo.satirlar.flat() : [])]);
    });

    (DMZ.sozluk || []).forEach((t) => {
      ekle({
        grup: 'rehber', id: `terim-${t.en}`, baslik: t.en, en: true, alt: `${t.tr} · ${t.aciklama}`,
        ikon: duzIkon('kilavuz'), hedef: `/rehber/?t=${encodeURIComponent(t.en)}`,
      }, [t.en, t.tr], [], [t.aciklama]);
    });

    return kayitlar;
  }

  // Bütün sitede arar. Gruplar en iyi eşleşmesine göre sıralanır: adı tam tutan grup en üstte, Enter da ona gider.
  // secenekler:
  //   haric   gösterilmeyecek gruplar (sayfa kendi listesini zaten süzüyorsa)
  //   harita  harita sayfasındayız: bölge ve kaleler harita noktası olarak çıkar (başka yerde lokasyon kartı olarak)
  //   once    her zaman en üstte duracak grup (haritada harita noktaları, rehberde rehber)
  function ara(metin, secenekler = {}) {
    const sorgu = hazirla(metin);
    if (!sorgu.bitisik) return { aktif: false, gruplar: [], toplam: 0, benzer: false };
    const haric = new Set(secenekler.haric || []);
    const adaylar = dizin().filter((k) => !haric.has(k.grup) && (secenekler.harita || !k.lokasyonlu));
    const dene = (benzer) => adaylar.map((k) => ({ k, puan: puanla(sorgu, k.alanlar, benzer) }))
      .filter((s) => s.puan < Infinity)
      .sort((a, b) => a.puan - b.puan || a.k.baslik.localeCompare(b.k.baslik, 'tr') || a.k.alt.localeCompare(b.k.alt, 'tr'));
    let bulunan = dene(false);
    let benzer = false;
    if (!bulunan.length && sorgu.bitisik.length >= 3) { bulunan = dene(true); benzer = bulunan.length > 0; }
    const sira = Object.keys(GRUPLAR);
    const gruplar = sira
      .map((id) => {
        const s = bulunan.filter((x) => x.k.grup === id);
        return { id, ...GRUPLAR[id], enIyi: s.length ? s[0].puan : Infinity, sonuclar: s.map((x) => x.k) };
      })
      .filter((g) => g.sonuclar.length)
      .sort((a, b) => (b.id === secenekler.once) - (a.id === secenekler.once) || a.enIyi - b.enIyi || sira.indexOf(a.id) - sira.indexOf(b.id));
    return { aktif: true, gruplar, toplam: bulunan.length, benzer };
  }

  // ---------- Sonuç kutusu ----------

  function sonucSatiri(k) {
    return `
      <div class="sonuc-satir">
        <a class="sonuc" href="${kacis(k.hedef)}">
          ${k.ikon}
          <span class="sonuc-metin"><b${k.en ? ' lang="en"' : ''}>${kacis(k.baslik)}</b><small>${kacis(k.alt)}</small></span>
        </a>
        ${k.ek ? `<a class="sonuc-ek" href="${kacis(k.ek.hedef)}" title="${kacis(k.ek.etiket)}" aria-label="${kacis(k.ek.etiket)}">${DMZ.ikon('harita')}</a>` : ''}
      </div>`;
  }

  // Her grupta önce birkaç sonuç; "daha" düğmesi o grubun hepsini açar.
  // ozetEsik: sonuç bundan çoksa gruplar sadece sayılarıyla düğme olarak çıkar, basınca açılır
  // (listeli sayfalarda "Başka bölümlerde" kutusu sayfanın kendi sonuçlarını aşağı itmesin diye).
  function ciz(kutu, sonuc, secenekler, acikGruplar) {
    if (!sonuc.aktif || (!sonuc.toplam && secenekler.bossaGizle)) { kutu.hidden = true; kutu.innerHTML = ''; return; }
    kutu.hidden = false;
    const ozet = secenekler.ozetEsik && sonuc.toplam > secenekler.ozetEsik;
    const kapalilar = ozet ? sonuc.gruplar.filter((g) => !acikGruplar.has(g.id)) : [];
    const sinir = (g, i) => (acikGruplar.has(g.id) ? Infinity : i === 0 && secenekler.ilkSinir ? secenekler.ilkSinir : secenekler.sinir || 5);
    kutu.innerHTML = (secenekler.baslik ? `<p class="arama-ust">${kacis(secenekler.baslik)}</p>` : '')
      + (sonuc.benzer ? '<p class="arama-not">Tam eşleşme yok, yazdığına benzeyenler:</p>' : '')
      + (kapalilar.length ? `<div class="arama-ozet">${kapalilar.map((g) => `
          <button type="button" class="cip" data-daha="${g.id}">${DMZ.ikon(g.ikon)}${kacis(g.ad)}<span>${g.sonuclar.length}</span></button>`).join('')}</div>` : '')
      + (sonuc.toplam
        ? sonuc.gruplar.filter((g) => !kapalilar.includes(g)).map((g, i) => {
          const n = sinir(g, i);
          return `
            <section class="arama-grup">
              <h3 class="arama-grup-baslik">${DMZ.ikon(g.ikon)}${kacis(g.ad)}<span>${g.sonuclar.length}</span></h3>
              <div class="arama-liste">${g.sonuclar.slice(0, n).map(sonucSatiri).join('')}</div>
              ${g.sonuclar.length > n ? `<button type="button" class="arama-daha" data-daha="${g.id}">+${g.sonuclar.length - n} sonuç daha</button>` : ''}
            </section>`;
        }).join('')
        : '<p class="arama-not">Sonuç yok. Başka bir kelime dene.</p>');
  }

  // Bir arama kutusunu sonuç kutusuna bağlar. secenekler (ara ve çizimdekilere ek olarak):
  //   enter      Enter'a basınca ilk sonuca git (sayfanın kendi listesi yoksa)
  //   degisince  her harfte çağrılır (sayfa kendi listesini süzsün diye)
  //   secince    bir sonuca tıklanınca çağrılır (ör. telefonda harita panelini kapatmak için)
  //   baslik, bossaGizle, sinir, ilkSinir  sonuç kutusunun görünüşü
  function bagla(giris, kutu, secenekler = {}) {
    const acikGruplar = new Set();
    let son = null;
    const guncelle = () => {
      if (giris.value !== son) { acikGruplar.clear(); son = giris.value; }
      ciz(kutu, ara(giris.value, secenekler), secenekler, acikGruplar);
      if (secenekler.degisince) secenekler.degisince(giris.value);
    };
    giris.addEventListener('input', guncelle);
    giris.addEventListener('keydown', (e) => {
      const ilk = $('a.sonuc', kutu);
      if (e.key === 'Enter' && secenekler.enter && ilk) { e.preventDefault(); ilk.click(); }
      else if (e.key === 'ArrowDown' && ilk) { e.preventDefault(); ilk.focus(); }
      else if (e.key === 'Escape' && giris.value) { giris.value = ''; guncelle(); }
    });
    // Sonuçlar arasında ok tuşlarıyla gezinme
    kutu.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const linkler = $$('a.sonuc', kutu);
      const i = linkler.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      if (e.key === 'ArrowUp' && i === 0) giris.focus();
      else (linkler[i + (e.key === 'ArrowDown' ? 1 : -1)] || linkler[i]).focus();
    });
    kutu.addEventListener('click', (e) => {
      const daha = e.target.closest('[data-daha]');
      if (daha) {
        acikGruplar.add(daha.dataset.daha);
        ciz(kutu, ara(giris.value, secenekler), secenekler, acikGruplar);
        return;
      }
      const a = e.target.closest('a[href^="/"]');
      if (a && secenekler.secince) secenekler.secince(a);
    });
    return { guncelle };
  }

  return { ara, suz, bagla };
})();
