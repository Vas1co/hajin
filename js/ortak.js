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
  function baglanti(hash) {
    return location.href.split('#')[0] + hash;
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
  if (tam) return `<img class="ikon-tam" src="harita/ikonlar/${kacis(tam)}" alt="" draggable="false">`;
  const resim = DMZ.site.resimIkonlar !== false && ((n && n.resim) || kat.resim);
  const ikon = resim
    ? `<img class="ikon-resim${kat.ikonRenk ? ' ikon-resim-ters' : ''}" src="harita/ikonlar/${kacis(resim)}" alt="" draggable="false">`
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

// Eşyanın oyun içi resmi (veri/esya_resimleri.js, araclar/esya_resimleri_kes.ps1 üretir). Resimler DMZHub'ın
// eşya sayfasından alındığı için site.js'te dmzhubVerileri ya da resimIkonlar kapalıysa gösterilmez.
DMZ.esyaResmi = function (id) {
  if (!DMZ._esyaResimleri) DMZ._esyaResimleri = new Set(DMZ.esyaResimleri || []);
  return DMZ.site.resimIkonlar !== false && DMZ.dmzhubAcik() && DMZ._esyaResimleri.has(id) ? `resimler/esyalar/${id}.png` : null;
};

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
      ? `<a class="malzeme-cip nadirlik-${kacis(nadirlik)}" href="#/esyalar?e=${encodeURIComponent(id)}">${ic}</a>`
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
    DMZ._noktalar = resmi.concat(bizim);
  }
  return DMZ._noktalar;
};

// "Clinic" gibi aynı adlı noktaları ayırt etmek için en yakın bölge adı
DMZ.enYakinBolge = function (n) {
  if (n.kategori === 'bolge') return null;
  let enYakin = null, enKisa = Infinity;
  DMZ.tumNoktalar().forEach((b) => {
    if (b.kategori !== 'bolge') return;
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
