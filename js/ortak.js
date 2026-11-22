// Ortak yardımcılar ve ikonlar. Tüm sayfalar bunları kullanır.
window.DMZ = window.DMZ || {};

DMZ.yardim = (function () {
  const $ = (secici, kok = document) => kok.querySelector(secici);
  const $$ = (secici, kok = document) => Array.from(kok.querySelectorAll(secici));

  function kacis(metin) {
    return String(metin ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Paragrafları (\n\n) <p> etiketine çevirir
  function paragraflar(metin) {
    return String(metin || '').split(/\n{2,}/).filter(Boolean).map((p) => `<p>${kacis(p).replace(/\n/g, '<br>')}</p>`).join('');
  }

  // Aramada Türkçe karakter farkını yok sayar: "sifa" yazan "Şifa"yı bulur
  function sade(metin) {
    return String(metin || '')
      .toLocaleLowerCase('tr-TR')
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  // Tarayıcı hafızası gizli pencerede ya da kapalıysa hata verebilir, site yine de çalışsın
  const depo = {
    oku(anahtar, varsayilan) {
      try { const v = localStorage.getItem(anahtar); return v === null ? varsayilan : JSON.parse(v); } catch { return varsayilan; }
    },
    yaz(anahtar, deger) {
      try { localStorage.setItem(anahtar, JSON.stringify(deger)); return true; } catch { return false; }
    },
  };

  async function kopyala(metin) {
    try { await navigator.clipboard.writeText(metin); return true; } catch { /* eski yönteme geç */ }
    const alan = document.createElement('textarea');
    alan.value = metin;
    alan.setAttribute('readonly', '');
    alan.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(alan);
    alan.select();
    let oldu = false;
    try { oldu = document.execCommand('copy'); } catch { oldu = false; }
    alan.remove();
    return oldu;
  }

  let bildirimZamani;
  function bildirim(metin) {
    let kutu = $('#bildirim');
    if (!kutu) {
      kutu = document.createElement('div');
      kutu.id = 'bildirim';
      kutu.className = 'bildirim';
      kutu.setAttribute('role', 'status');
      kutu.setAttribute('aria-live', 'polite');
      document.body.appendChild(kutu);
    }
    kutu.textContent = metin;
    kutu.classList.add('gorunur');
    clearTimeout(bildirimZamani);
    bildirimZamani = setTimeout(() => kutu.classList.remove('gorunur'), 2200);
  }

  // Sitenin bulunduğu adresle birlikte paylaşılabilir bağlantı
  function baglanti(yol) {
    return location.origin + yol;
  }

  return { $, $$, kacis, paragraflar, sade, depo, kopyala, bildirim, baglanti };
})();

// İkonlar js/ikonlar.js dosyasında (Font Awesome Free, araclar/ikonlari_uret.mjs üretir)
DMZ.ikon = function (ad, sinif = '') {
  const [genislik, yol] = DMZ.ikonlar[ad] || DMZ.ikonlar.nokta;
  return `<svg class="ikon ${sinif}" viewBox="0 0 ${genislik} 512" fill="currentColor" aria-hidden="true"><path d="${yol}"/></svg>`;
};

// Kategorinin rozet rengi ve rozetin üstündeki ikonun rengi (açık renkli rozette ikon koyu olur)
DMZ.renkStili = (kat) => `--renk:${kat.renk};--ikon-renk:${kat.ikonRenk || '#fff'}`;

// DMZHub'dan alınan veriler (noktalar, hazır ikonlar, emirler) gösterilsin mi? Ayar: veri/site.js, dmzhubVerileri
DMZ.dmzhubAcik = () => !DMZ.site || DMZ.site.dmzhubVerileri !== false;

// Kategorinin hazır ikonu (kendi rengi ve çerçevesi olan, DMZHub ikonları gibi); site.js'teki ayarlarla kapanır
DMZ.tamResim = (kat) => DMZ.site.resimIkonlar !== false && DMZ.dmzhubAcik() && kat.tamResim;

// Kategori rozetinin içi: hazır ikon varsa sadece o. Yoksa oyun ikonu resmi (varsa ve açıksa) ya da
// Font Awesome ikonu, üstüne varsa köşedeki ek işaret (son çıkıştaki "!"). Noktanın kendi resmi (kaleler) önce gelir.
DMZ.rozetIci = function (kat, n) {
  const { kacis } = DMZ.yardim;
  const tam = DMZ.tamResim(kat);
  if (tam) return `<img class="ikon-tam" src="/harita/ikonlar/${kacis(tam)}" alt="" draggable="false">`;
  const resim = DMZ.site.resimIkonlar !== false && ((n && n.resim) || kat.resim);
  const ikon = resim
    ? `<img class="ikon-resim${kat.ikonRenk ? ' ikon-resim-ters' : ''}" src="/harita/ikonlar/${kacis(resim)}" alt="" draggable="false">`
    : DMZ.ikon(kat.ikon);
  return ikon + (kat.rozet ? `<i class="ek-isaret" aria-hidden="true">${kacis(kat.rozet)}</i>` : '');
};

// Bir noktanın listelerdeki küçük rozeti (arama sonuçları): haritadaki işaretin aynısı, nadirliği varsa onun renginde
DMZ.noktaRozeti = function (n, sinif) {
  const kat = DMZ.kategoriler[n.kategori] || DMZ.kategoriler.diger;
  const nad = n.nadirlik && DMZ.nadirlikler && DMZ.nadirlikler[n.nadirlik];
  return `<span class="${sinif} kat-${n.kategori}${DMZ.tamResim(kat) ? ' rozet-tam' : ''}" style="${DMZ.renkStili(nad ? { ...kat, renk: nad.renk } : kat)}">${DMZ.rozetIci(kat, n)}</span>`;
};

// DMZ Emirleri sayfaları; DMZHub'dan gelenler site.js'teki dmzhubVerileri ayarıyla gizlenebilir
DMZ.emirSayfalari = () => (DMZ.gorevler || []).filter((s) => s.kaynak !== 'dmzhub' || DMZ.dmzhubAcik());

// Eşya listesi: bizim yazdıklarımız (açıklamalı, önce) + DMZHub veritabanındaki nadirlik/değer bilgisi ve
// diğer eşyalar (kategori, sonra nadirlik sırasıyla). DMZHub kısmı site.js'teki dmzhubVerileri ayarıyla kapanır.
DMZ.tumEsyalar = function () {
  if (DMZ._esyalar) return DMZ._esyalar;
  if (!DMZ.dmzhubAcik()) return (DMZ._esyalar = DMZ.esyalar || []);
  const bilgi = DMZ.dmzhubEsyaBilgisi || {};
  const katSira = Object.keys(DMZ.esyaKategorileri);
  const nadirSira = Object.keys(DMZ.nadirlikler).reverse();
  const sira = (e) => [katSira.indexOf(e.kategori), (nadirSira.indexOf(e.nadirlik) + 99) % 99];
  const digerleri = (DMZ.dmzhubEsyalari || []).slice().sort((a, b) => {
    const [ka, na] = sira(a), [kb, nb] = sira(b);
    return ka - kb || na - nb || a.ad.localeCompare(b.ad);
  });
  DMZ._esyalar = (DMZ.esyalar || []).map((e) => (bilgi[e.id] ? { ...bilgi[e.id], ...e } : e)).concat(digerleri);
  return DMZ._esyalar;
};

// veri/site.js'teki iletişim bilgisi; e-posta adresiyse tıklanabilir
DMZ.iletisimHtml = function () {
  const { kacis } = DMZ.yardim;
  const i = String(DMZ.site.iletisim || '').trim();
  return /^[^s@]+@[^s@]+.[a-z]+$/i.test(i) ? `<a href="mailto:${kacis(i)}">${kacis(i)}</a>` : kacis(i);
};

// Eşyanın oyun içi resmi (veri/esya_resimleri.js, araclar/esya_resimleri_kes.ps1 üretir). Resimler DMZHub'ın
// eşya sayfasından alındığı için site.js'te dmzhubVerileri ya da resimIkonlar kapalıysa gösterilmez.
DMZ.esyaResmi = function (id) {
  if (!DMZ._esyaResimleri) DMZ._esyaResimleri = new Set(DMZ.esyaResimleri || []);
  return DMZ.site.resimIkonlar !== false && DMZ.dmzhubAcik() && DMZ._esyaResimleri.has(id) ? `/resimler/esyalar/${id}.png` : null;
};

// Özellik (trait) listesi ve ikonu. İkonlar da DMZHub'dan alındığı için aynı ayarlarla kapanır.
// Pro sürümün kendi ikonu yoksa ana özelliğinkini kullanır.
DMZ.tumOzellikler = () => (DMZ.dmzhubAcik() ? DMZ.ozellikler || [] : []);
DMZ.ozellikBul = (id) => DMZ.tumOzellikler().find((o) => o.id === id);
DMZ.ozellikResmi = function (o) {
  if (!DMZ._ozellikResimleri) DMZ._ozellikResimleri = new Set(DMZ.ozellikResimleri || []);
  if (DMZ.site.resimIkonlar === false || !DMZ.dmzhubAcik() || !o) return null;
  const id = DMZ._ozellikResimleri.has(o.id) ? o.id : o.ana && DMZ._ozellikResimleri.has(o.ana) ? o.ana : null;
  return id ? `/resimler/ozellikler/${id}.png` : null;
};
// Özelliğin bağlı olduğu ağaç (Pro sürüm ana özelliğin ağacında)
DMZ.ozellikAgaci = (o) => o && (o.agac || (o.ana && (DMZ.ozellikBul(o.ana) || {}).agac)) || null;
DMZ.OZELLIK_TIPLERI = { ana: 'Ana özellik', kucuk: 'Küçük özellik', pro: 'Prestij (Pro)' };

// Haritada bir eşyanın arandığı yerler: yazıcı malzemesi alanları ("malzemeler") ve oyuncuların silah kılavuzu
// bulduğu yerler ("kilavuzlar"), veri/noktalar.js
DMZ.malzemeAlanlari = (id) => DMZ.tumNoktalar().filter((n) => (n.malzemeler || []).includes(id) || (n.kilavuzlar || []).includes(id));

// Malzeme adları nadirlik renginde küçük etiketler; eşya listede varsa (DMZHub verisi açıksa) kartına gider
DMZ.malzemeCipleri = function (idler) {
  const { kacis } = DMZ.yardim;
  return idler.map((id) => {
    const bilgi = (DMZ.malzemeBilgisi || {})[id] || {};
    const e = DMZ.tumEsyalar().find((x) => x.id === id);
    const nadirlik = (e && e.nadirlik) || bilgi.nadirlik || '';
    const resim = DMZ.esyaResmi(id);
    const ic = (resim ? `<img src="${kacis(resim)}" alt="">` : '')
      + `<span lang="en">${kacis((e && e.ad) || bilgi.ad || id)}</span><small>${kacis((e && e.tr) || bilgi.tr || '')}</small>`;
    return e
      ? `<a class="malzeme-cip nadirlik-${kacis(nadirlik)}" href="/esyalar/#e=${encodeURIComponent(id)}">${ic}</a>`
      : `<span class="malzeme-cip nadirlik-${kacis(nadirlik)}">${ic}</span>`;
  }).join('');
};

// Lokasyon kartında hangi malzeme alanları gösterilsin: her alan en yakın lokasyona, 75 pikselden yakın
// diğer lokasyonlara (aynı yerdeki bölge ve kale gibi) ve bunların bağlı olduğu bölgeye ait
DMZ.lokasyonMalzemeleri = function (lokId) {
  if (!DMZ._lokasyonMalzemeleri) {
    const sonuc = {};
    const ekle = (l, malzemeler) => {
      [l.id, l.ust].filter(Boolean).forEach((id) => {
        sonuc[id] = sonuc[id] || new Set();
        malzemeler.forEach((m) => sonuc[id].add(m));
      });
    };
    const lokNoktalari = (DMZ.lokasyonlar || [])
      .map((l) => [l, l.nokta && DMZ.tumNoktalar().find((x) => x.id === l.nokta)])
      .filter(([, p]) => p);
    DMZ.tumNoktalar().filter((n) => n.malzemeler).forEach((n) => {
      const uzaklik = lokNoktalari.map(([l, p]) => [l, Math.hypot(p.x - n.x, p.y - n.y)]).sort((a, b) => a[1] - b[1]);
      uzaklik.filter(([, d], i) => i === 0 || d <= 75).forEach(([l]) => ekle(l, n.malzemeler));
    });
    DMZ._lokasyonMalzemeleri = sonuc;
  }
  return [...(DMZ._lokasyonMalzemeleri[lokId] || [])];
};

// Anahtar eşyası ile haritadaki anahtar odası, odadaki "anahtar" adıyla birbirine bağlanır
DMZ.anahtarOdalari = function (e) {
  if (!e || e.kategori !== 'anahtar') return [];
  const ad = DMZ.yardim.sade(e.ad);
  return DMZ.tumNoktalar().filter((n) => n.anahtar && DMZ.yardim.sade(n.anahtar) === ad);
};
DMZ.anahtarEsyasi = function (n) {
  if (!n || !n.anahtar) return null;
  const ad = DMZ.yardim.sade(n.anahtar);
  return DMZ.tumEsyalar().find((e) => e.kategori === 'anahtar' && DMZ.yardim.sade(e.ad) === ad) || null;
};

// Tüm harita noktaları (resmi + bizim eklediklerimiz) ve hızlı arama tabloları
DMZ.tumNoktalar = function () {
  if (!DMZ._noktalar) {
    const resmi = (DMZ.resmiNoktalar || []).map((n) => ({ ...n, kaynak: 'resmi' }));
    const dmzhubGoster = DMZ.dmzhubAcik();
    const bizim = (DMZ.noktalar || [])
      .filter((n) => n.kaynak !== 'dmzhub' || dmzhubGoster)
      .map((n) => ({ ...n, kaynak: n.kaynak || 'topluluk' }));
    // X01 Black Site noktaları (veri/x01_noktalar.js) DMZHub'dan; DMZHub kapalıysa gösterilmez
    const x01 = dmzhubGoster ? DMZ.x01Noktalar || [] : [];
    DMZ._noktalar = resmi.concat(bizim, x01);
  }
  return DMZ._noktalar;
};

// Çoklu harita: noktanın haritası (yazılmamışsa Hajin), o haritanın noktaları ve noktanın paylaşılan adresi.
// Seçili nokta # işaretinden sonra (/harita/x01/#n=...): Google bunu ayrı sayfa saymaz, eski ?n= linkleri de çalışır.
DMZ.noktaHaritasi = (n) => (n && n.harita) || 'hajin';
DMZ.haritaNoktalari = (id, kat) => DMZ.tumNoktalar().filter((n) => DMZ.noktaHaritasi(n) === id && (kat == null || !n.kat || n.kat === kat));
DMZ.haritaYolu = (id) => `/harita/${id}/`;
DMZ.noktaLinki = (n) => `${DMZ.haritaYolu(DMZ.noktaHaritasi(n))}#n=${encodeURIComponent(n.id)}`;
// Haritanın bilgisi var mı ve noktası var mı (X01 DMZHub kapatılınca boş kalır, menüde ve sitemap'te çıkmaz)
DMZ.haritaAcik = (id) => Boolean(DMZ.haritalar && DMZ.haritalar[id]) && (id === 'hajin' || DMZ.haritaNoktalari(id).length > 0);
DMZ.acikHaritalar = () => Object.keys(DMZ.haritalar || { hajin: 1 }).filter(DMZ.haritaAcik);

// Haritadaki kategoriler ve sayıları (bölge adları hariç), çok olandan aza
DMZ.haritaSayilari = function (id) {
  const s = {};
  DMZ.haritaNoktalari(id).forEach((n) => { if (n.kategori !== 'bolge') s[n.kategori] = (s[n.kategori] || 0) + 1; });
  return Object.entries(s).sort((a, b) => b[1] - a[1]);
};

// Haritanın sol panelinin üstü: başlık (H1), kısa tanıtım ve haritalar arası geçiş.
// Hem tarayıcıda (js/harita.js) hem sayfa üretirken (araclar/sayfalari_uret.mjs) kullanılır, ikisi aynı metni yazar.
DMZ.haritaGirisHtml = function (id) {
  const { kacis } = DMZ.yardim;
  const h = DMZ.haritalar[id];
  const digerleri = DMZ.acikHaritalar();
  return `
    <h1 class="harita-h1">${kacis(h.h1)}</h1>
    <p class="harita-giris-metin">${kacis(h.giris)}</p>
    ${digerleri.length > 1 ? `<nav class="harita-secici" aria-label="Haritalar">${digerleri.map((k) => `
      <a href="${DMZ.haritaYolu(k)}"${k === id ? ' aria-current="page"' : ''}>${DMZ.ikon('harita')}<span>${kacis(DMZ.haritalar[k].ad)}</span></a>`).join('')}</nav>` : ''}`;
};

// Panelin altındaki açılır kutu: haritada neler var, arama ve filtreler nasıl kullanılır, ilgili sayfalar
DMZ.haritaNasilHtml = function (id) {
  const { kacis } = DMZ.yardim;
  const h = DMZ.haritalar[id];
  const sayilar = DMZ.haritaSayilari(id);
  const katli = Boolean(h.katlar);
  return `
    <details class="harita-nasil">
      <summary>Haritada neler var, nasıl kullanılır?</summary>
      <p>${katli ? `İki kat var: ${h.katlar.map((k) => `${kacis(k.ad)} (<span lang="en">${kacis(k.en)}</span>)`).join(' ve ')}. Haritanın üstündeki kat düğmesiyle geçiş yap; merdivenler ve halatlar katların bağlandığı yerleri gösterir.` : `Haritada ${DMZ.haritaNoktalari(id).filter((n) => n.kategori !== 'bolge').length} nokta ve ${DMZ.haritaNoktalari(id).filter((n) => n.kategori === 'bolge').length} bölge adı var.`}</p>
      <ul class="harita-sayilar">${sayilar.map(([k, adet]) => {
        const kat = DMZ.kategoriler[k] || DMZ.kategoriler.diger;
        return `<li><b>${adet}</b> ${kacis(kat.ad)} <span lang="en">(${kacis(kat.en)})</span></li>`;
      }).join('')}</ul>
      <p><b>Arama:</b> üstteki kutuya yazmaya başla; ilk harften itibaren bu haritadaki noktalar, sonra eşyalar, görevler ve rehber süzülür. Türkçe ya da oyundaki İngilizce adla yazabilirsin, Enter ilk sonuca götürür.</p>
      <p><b>Filtreler:</b> listeden görmek istediğin kategorileri aç ya da kapat; başlıktaki anahtar o gruptaki her şeyi birden açar. Seçimin bu tarayıcıda hatırlanır.</p>
      <p><b>Noktalar:</b> bir noktaya dokununca Türkçe açıklaması, oyundaki İngilizce adı ve ızgara kodu çıkar. "Bağlantıyı kopyala" ile ekibine gönder, linki açan aynı noktaya gelir. "İşaretle" oyundaki gibi etrafına altın halka koyar.</p>
      <p>İlgili sayfalar: <a href="/lokasyonlar/">Hajin lokasyonları ve tehlike seviyeleri</a>, <a href="/rehber/anahtarlar/">anahtar odalarının listesi</a>, <a href="/esyalar/">eşya ve malzeme listesi</a>, <a href="/gorevler/">DMZ Emirleri adım adım</a>${id === 'x01' ? ', <a href="/rehber/x01-black-site/">X01 Black Site rehberi</a>' : ''}.</p>
      ${h.not ? `<p class="soluk">${kacis(h.not)}</p>` : ''}
    </details>
    <p class="harita-imza">Bir <a href="https://peekdock.com/">peekdock</a> projesi · <a href="/">DMZ Rehberi ana sayfa</a></p>`;
};

// Ana sayfa: genel proje tanıtımı ve bölümlere giden bağlantılar. Tarayıcıda js/sayfalar.js çizer,
// araclar/sayfalari_uret.mjs aynı HTML'i index.html'e yazar (JavaScript çalışmadan da okunsun diye).
DMZ.anaSayfaHtml = function () {
  const { kacis } = DMZ.yardim;
  const site = DMZ.site;
  const hajinNokta = DMZ.haritaNoktalari('hajin').filter((n) => n.kategori !== 'bolge').length;
  const x01Nokta = DMZ.haritaNoktalari('x01').filter((n) => n.kategori !== 'bolge').length;
  const gorev = DMZ.emirSayfalari().filter((s) => !s.ornek).reduce((t, s) => t + s.gorevler.length, 0);
  const esya = DMZ.tumEsyalar().filter((e) => !e.ornek).length;
  const ozellik = DMZ.tumOzellikler ? DMZ.tumOzellikler().length : 0;
  const kartlar = [
    { yol: '/harita/hajin/', ikon: 'harita', baslik: 'Hajin İnteraktif Haritası', metin: 'Anahtar odaları, kasalar, çıkışlar, boss alanları ve yazıcı malzemeleri tek haritada. Ara, filtrele, noktayı ekibine gönder.', sayi: `${hajinNokta} nokta` },
    x01Nokta && { yol: '/harita/x01/', ikon: 'kat', baslik: 'X01 Black Site Haritası', metin: 'Sezon 1\'in yeraltı tesisi, iki kat: anahtar odaları, Derin Kasa, gizli girişler ve Wheelson.', sayi: `${x01Nokta} nokta` },
    { yol: '/lokasyonlar/', ikon: 'bolge', baslik: 'Lokasyonlar', metin: 'Hajin\'in bölgeleri ve kaleleri: tehlike seviyesi, nasıl girilir, içinde ne var.', sayi: `${(DMZ.lokasyonlar || []).length} lokasyon` },
    { yol: '/gorevler/', ikon: 'gorev', baslik: 'DMZ Emirleri', metin: 'Görevler (Orders) sayfa sayfa, adım adım Türkçe. Bitirdiğin görevi işaretle.', sayi: gorev ? `${gorev} görev` : 'Hazırlanıyor' },
    { yol: '/esyalar/', ikon: 'esya', baslik: 'Eşyalar', metin: 'Zırh, çanta, anahtar, yazıcı malzemesi: ne işe yarar, nerede bulunur.', sayi: esya ? `${esya} eşya` : 'Hazırlanıyor' },
    ozellik && { yol: '/ozellikler/', ikon: 'operator', baslik: 'Özellikler', metin: 'Operatör yetenek ağaçları (Traits), prestij özellikleri ve önerilen dizilişler.', sayi: `${ozellik} özellik` },
    { yol: '/rehber/', ikon: 'kilavuz', baslik: 'Rehber', metin: 'Giriş, çıkış, tehlike seviyeleri, boss\'lar ve oyundaki İngilizce terimlerin Türkçe sözlüğü.', sayi: `${(DMZ.rehber || []).length} konu` },
  ].filter(Boolean);

  // Arama en üstte: oyunda bir şey bulan direkt adını yazsın, sonuçlar hemen altında çıksın
  return `
      <section class="ana-arama" aria-label="Sitede ara">
        <label class="arama-kutusu">${DMZ.ikon('ara')}<input type="search" id="ana-ara" placeholder="Her şeyi ara: anahtar, eşya, kale, görev…" autocomplete="off" enterkeyhint="search" aria-label="Sitede ara"></label>
        <div class="genel-sonuclar" id="ana-sonuclar" hidden></div>
      </section>
      <section class="giris">
        <div class="giris-metin">
          <span class="ust-etiket">Modern Warfare 4 · DMZ · Türkçe</span>
          <h1>DMZ Rehberi<br><em>Her şey Türkçe.</em></h1>
          <p class="giris-tanitim">Call of Duty: Modern Warfare 4 DMZ için arkadaşlarımızla hazırladığımız Türkçe hayran rehberi. Haritalar, lokasyonlar, görevler, eşyalar ve operatör özellikleri oyundaki İngilizce adlarıyla birlikte.</p>
          <div class="giris-dugmeler">
            <a class="dugme dugme-vurgu dugme-buyuk" href="/harita/hajin/">${DMZ.ikon('harita')} Hajin haritasını aç</a>
            ${x01Nokta ? `<a class="dugme dugme-buyuk" href="/harita/x01/">${DMZ.ikon('kat')} X01 Black Site</a>` : ''}
          </div>
        </div>
        <a class="giris-harita" href="/harita/hajin/" aria-label="Hajin interaktif haritasını aç">
          <img src="/harita/tiles/2/1/1.jpg" alt=""><img src="/harita/tiles/2/2/1.jpg" alt="">
          <img src="/harita/tiles/2/1/2.jpg" alt=""><img src="/harita/tiles/2/2/2.jpg" alt="">
          <span class="giris-harita-etiket">${DMZ.ikon('koordinat')} Hajin Yasak Bölgesi</span>
        </a>
      </section>

      <section class="bolum-kartlari">
        ${kartlar.map((k) => `
          <a class="bolum-karti" href="${k.yol}">
            <span class="bolum-ikon">${DMZ.ikon(k.ikon)}</span>
            <h2>${kacis(k.baslik)}</h2>
            <p>${kacis(k.metin)}</p>
            <span class="bolum-alt"><b>${kacis(k.sayi)}</b>${DMZ.ikon('ok')}</span>
          </a>`).join('')}
      </section>

      <section class="iki-kolon">
        <div class="kutu">
          <h2 class="kutu-baslik">Nasıl kullanılır?</h2>
          <ol class="adim-listesi">
            <li><b>Ne arıyorsan yaz.</b> Her sayfanın üstündeki arama kutusu her şeyde arar: anahtar, eşya, kale, görev, terim. İlk harften süzmeye başlar, Türkçe de yazabilirsin.</li>
            <li><b>Haritayı aç,</b> soldaki listeden görmek istediğin şeyleri seç. Başlıkların yanındaki anahtar o gruptaki her şeyi birden açıp kapatır. Telefonda "Katmanlar" düğmesine bas.</li>
            <li><b>Bir noktaya dokun.</b> Türkçe açıklaması ve oyundaki İngilizce adı çıkar. "İşaretle" dersen oyundaki gibi etrafına altın halka gelir.</li>
            <li><b>"Bağlantıyı kopyala"</b> ile o noktayı ekibine gönder, açan direkt oraya gider.</li>
            <li><b>Yeni misin?</b> Önce <a href="/rehber/">Türkçe DMZ rehberini</a> oku: giriş, çıkış ve oyundaki İngilizce terimler orada.</li>
          </ol>
        </div>
        <div class="kutu kutu-vurgu">
          <h2 class="kutu-baslik">Bir şey mi buldun?</h2>
          <p>Bu site oyuncularla büyüyor. Çıkış noktası, anahtarlı kapı, kasa ya da görev bilgisi bulduysan ekran görüntüsünü al ve gönder, ekleyelim.</p>
          <p class="iletisim">${site.iletisim ? `Gönder: ${DMZ.iletisimHtml()}` : 'İletişim bilgisi yakında eklenecek.'}</p>
        </div>
      </section>`;
};

// Rehber'in "Anahtarlar" bölümündeki tablo: bütün anahtar odaları (Hajin, sonra X01), anahtarı, nadirliği, ızgarası.
// statik: true ise eşya bağlantıları düz sayfalara gider (/esyalar/<id>/), değilse sitedeki karta (/esyalar/#e=...).
DMZ.anahtarOdalariHtml = function (statik) {
  const { kacis } = DMZ.yardim;
  const odalar = DMZ.tumNoktalar().filter((n) => n.kategori === 'anahtar');
  const satir = (n) => {
    const esya = DMZ.anahtarEsyasi(n);
    const nad = n.nadirlik && DMZ.nadirlikler[n.nadirlik];
    const h = DMZ.haritalar[DMZ.noktaHaritasi(n)];
    const katBilgi = n.kat && (h.katlar || []).find((k) => k.kat === n.kat);
    const anahtar = esya
      ? `<a href="${statik ? `/esyalar/${esya.id}/` : `/esyalar/#e=${encodeURIComponent(esya.id)}`}" lang="en">${kacis(esya.ad)}</a>`
      : n.anahtar ? `<span lang="en">${kacis(n.anahtar)}</span>` : '<span class="soluk">Bilinmiyor</span>';
    return `<tr><td class="ilk"><span lang="en">${kacis(n.ad)}</span>${n.tr ? `<br><small class="soluk">${kacis(n.tr)}</small>` : ''}</td>
      <td>${anahtar}</td><td>${nad ? `<span class="nadirlik nadirlik-${kacis(n.nadirlik)}">${kacis(nad.ad)}</span>` : '<span class="soluk">–</span>'}</td>
      <td>${kacis([h.ad, katBilgi && katBilgi.ad, n.izgara].filter(Boolean).join(' · '))}</td>
      <td><a href="${DMZ.noktaLinki(n)}">Haritada göster</a></td></tr>`;
  };
  return `
    <h3 class="rehber-alt-baslik">Bütün anahtar odaları (${odalar.length})</h3>
    <div class="tablo-kap"><table class="rehber-tablo anahtar-tablosu">
      <thead><tr><th>Oda</th><th>Anahtar</th><th>Nadirlik</th><th>Harita ve ızgara</th><th></th></tr></thead>
      <tbody>${odalar.map(satir).join('')}</tbody>
    </table></div>`;
};

// Bir Hajin lokasyonunun çevresindeki harita noktaları (yarıçap harita pikseli, yaklaşık; bölge türüne göre)
DMZ.CEVRE_KATEGORILERI = ['giris', 'cikis', 'soncikis', 'boss', 'siginak', 'anahtar', 'kasa', 'kayipikmal', 'roket', 'sam', 'tegmen', 'iha', 'ammo', 'klinik', 'benzinlik', 'tekne', 'itfaiye', 'karakol', 'yerleske'];
DMZ.CEVRE_YARICAP = { ana: 330, kale: 200, ara: 230 };
DMZ.cevredekiNoktalar = function (l, n) {
  const r = DMZ.CEVRE_YARICAP[l.tur] || 230;
  return DMZ.haritaNoktalari('hajin').filter((p) => p.id !== n.id && DMZ.CEVRE_KATEGORILERI.includes(p.kategori)
    && (p.x - n.x) ** 2 + (p.y - n.y) ** 2 <= r * r);
};

// "Clinic" gibi aynı adlı noktaları ayırt etmek için en yakın bölge adı (aynı harita ve katta)
DMZ.enYakinBolge = function (n) {
  if (n.kategori === 'bolge') return null;
  let enYakin = null, enKisa = Infinity;
  DMZ.tumNoktalar().forEach((b) => {
    if (b.kategori !== 'bolge' || DMZ.noktaHaritasi(b) !== DMZ.noktaHaritasi(n) || (b.kat || 0) !== (n.kat || 0)) return;
    const d = (b.x - n.x) ** 2 + (b.y - n.y) ** 2;
    if (d < enKisa) { enKisa = d; enYakin = b; }
  });
  return enYakin;
};

DMZ.lokasyonBul = (id) => (DMZ.lokasyonlar || []).find((l) => l.id === id);
DMZ.lokasyonNoktadan = (noktaId) => (DMZ.lokasyonlar || []).find((l) => l.nokta === noktaId);

// Oyundaki "Threat" seviyeleri: Low, Medium, High, Critical, Extreme
DMZ.tehlikeler = {
  dusuk:  { ad: 'Düşük',  en: 'Low' },
  orta:   { ad: 'Orta',   en: 'Medium' },
  yuksek: { ad: 'Yüksek', en: 'High' },
  kritik: { ad: 'Kritik', en: 'Critical' },
  asiri:  { ad: 'Aşırı',  en: 'Extreme' },
};
