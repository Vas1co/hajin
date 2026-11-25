// Etkileşimli haritalar (Leaflet): Hajin ve X01 Black Site. Haritaların bilgisi veri/haritalar.js'te.
// Her harita 4096x4096 piksel; noktaların x/y değerleri sol üst köşeden piksel. Katlı haritada (X01) her katın
// noktaları ayrı gösterilir, kat düğmesiyle geçilir. Görseli olmayan harita oyundaki ızgara üzerinde şema olarak çizilir.
window.DMZ = window.DMZ || {};

DMZ.Harita = (function () {
  const { $, $$, kacis, paragraflar, depo, kopyala, bildirim, baglanti } = DMZ.yardim;

  const MAX_ZOOM = 4;          // 4096 piksel = 16 x 256 piksellik karo
  const ISARET_ANAHTARI = 'hajin.harita.isaretli'; // nokta id'leri bütün haritalarda farklı, tek liste yeter

  let harita;
  let kurulu = false;
  let koordinatModu = false;
  let aktif = null;       // açık haritanın id'si (hajin, x01)
  let aktifKat = null;    // katlı haritada açık kat
  let oyunSiniri, zemin, yazi;
  let katmanlar = {};     // kategori -> L.layerGroup (açık harita ve kat için)
  let isaretler = {};     // nokta id -> L.marker
  let kapali = new Set();
  const isaretliNoktalar = new Set(depo.oku(ISARET_ANAHTARI, [])); // altın halkalı noktaların id'leri

  const ll = (x, y) => harita.unproject([x, y], MAX_ZOOM);
  const H = () => DMZ.haritalar[aktif];
  const filtreAnahtari = () => `${H().depo}.harita.kapali`;
  const katBilgisi = () => (H().katlar || []).find((k) => k.kat === aktifKat);
  const noktaBul = (id) => DMZ.tumNoktalar().find((x) => x.id === id);

  const SIGDIRMA_PAYI = { padding: [12, 12] };
  const sinir = (a) => L.latLngBounds(ll(a.x1, a.y2), ll(a.x2, a.y1));

  // Oynanabilir bölge: Hajin'de sabit, katlı haritada o katın ızgarası
  function alanHesapla() {
    const h = H();
    const kat = katBilgisi();
    if (!kat) return h.alan;
    // Hücreler kare; satırlar çerçevenin altından yukarı dizilir (veri/haritalar.js'teki açıklama)
    const g = kat.izgara, b = h.boyut;
    const hucre = (g.w / g.sutun) * b;
    const y2 = (g.y + g.h) * b;
    return { x1: g.x * b, y1: g.satir ? y2 - g.satir * hucre : g.y * b, x2: (g.x + g.w) * b, y2 };
  }

  // Dar ekranda (telefon) bütün Hajin çok küçük kalıyor, açılışta bölgelerin yoğun olduğu ortaya odaklan
  const acilisSiniri = () => ($('#harita').clientWidth < 600 && H().telefonAlani ? sinir(H().telefonAlani) : oyunSiniri);

  function kur() {
    if (kurulu) return;
    kurulu = true;

    const kap = $('#harita');
    harita = L.map(kap, {
      crs: L.CRS.Simple,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 90,
      maxZoom: 6,
      zoomControl: false,
    });
    harita.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    L.control.zoom({ position: 'bottomright', zoomInTitle: 'Yakınlaştır', zoomOutTitle: 'Uzaklaştır' }).addTo(harita);

    panelOlaylari();
    araclariKur();

    harita.on('zoomend', yakinlikGuncelle);
    // Bilgi kutusundaki düğmeler; kutu yeniden çizilince de çalışsın diye haritaya bağlı
    kap.addEventListener('click', popupEylemi);
  }

  // Haritayı (ve katı) aç: zemini, sınırları, işaretleri ve paneli o haritaya göre baştan kur
  function haritaAc(id, kat) {
    if (!DMZ.haritalar[id]) id = 'hajin';
    const h = DMZ.haritalar[id];
    const yeniKat = h.katlar ? (h.katlar.some((k) => k.kat === kat) ? kat : aktif === id && aktifKat ? aktifKat : h.katlar[0].kat) : null;
    if (id === aktif && yeniKat === aktifKat) return;
    const haritaDegisti = id !== aktif;

    harita.closePopup();
    [zemin, yazi, ...Object.values(katmanlar)].forEach((k) => { if (k) harita.removeLayer(k); });
    yazi = null;
    katmanlar = {};
    isaretler = {};
    aktif = id;
    aktifKat = yeniKat;
    kapali = new Set(depo.oku(filtreAnahtari(), []));
    $('#harita').dataset.harita = id;

    if (h.karo) {
      zemin = L.tileLayer(h.karo.url, {
        minZoom: 0, maxZoom: 6, maxNativeZoom: h.karo.maxNativeZoom, tileSize: h.karo.tileSize, noWrap: true,
        bounds: L.latLngBounds(ll(0, h.boyut), ll(h.boyut, 0)), attribution: h.karo.telif,
      });
    } else if (katBilgisi() && katBilgisi().gorsel) {
      // Katın harita resmi (veri/haritalar.js: gorsel), üstünde oyundaki ızgara ince çizgilerle
      const g = katBilgisi().gorsel;
      zemin = L.layerGroup([
        L.imageOverlay(g.url, sinir(g), { attribution: 'Harita görseli © Activision', className: 'harita-kat-resmi' }),
        semaCiz(true),
      ]);
    } else {
      zemin = semaCiz();
    }
    zemin.addTo(harita);

    oyunSiniri = sinir(alanHesapla());
    harita.setMaxBounds(oyunSiniri.pad(0.3));
    harita.setMinZoom(0);
    if (haritaDegisti) harita.fitBounds(acilisSiniri(), SIGDIRMA_PAYI);
    harita.setMinZoom(Math.max(0, harita.getBoundsZoom(oyunSiniri) - 0.75));

    if (id === 'hajin') {
      haritaYazisiEkle();
      if (DMZ.Tren && DMZ.site.haritaTreni) DMZ.Tren.kur(harita, ll, MAX_ZOOM); // raylarda giden tren (js/tren.js)
    }

    noktalariYerlestir();
    paneliCiz(haritaDegisti);
    katSeciciCiz();
    yakinlikGuncelle();
  }

  // Görseli olmayan harita: oyundaki ızgara (A, B, C... sütunlar, 0, 1, 2... satırlar) koyu zemin üzerinde.
  // Noktaların ızgara kodları oyundaki taktik haritayla aynı, böylece "E4" gibi yerler bulunabilir.
  // ustte: harita resminin üstüne çizilir; zemin ve alt yazı olmaz, sadece çizgiler ve ızgara kodları
  function semaCiz(ustte = false) {
    const a = alanHesapla();
    const kat = katBilgisi();
    const g = kat.izgara;
    const hucre = (a.x2 - a.x1) / g.sutun;
    const satir = g.satir || Math.round((a.y2 - a.y1) / hucre);
    const pay = hucre * 0.7;
    const harfler = 'ABCDEFGHIJKLMNOP';
    let cizgiler = '', etiketler = '';
    for (let s = 0; s <= g.sutun; s++) cizgiler += `<line x1="${a.x1 + s * hucre}" y1="${a.y1}" x2="${a.x1 + s * hucre}" y2="${a.y1 + satir * hucre}"/>`;
    for (let r = 0; r <= satir; r++) cizgiler += `<line x1="${a.x1}" y1="${a.y1 + r * hucre}" x2="${a.x2}" y2="${a.y1 + r * hucre}"/>`;
    for (let s = 0; s < g.sutun; s++) {
      etiketler += `<text class="sema-sutun" x="${a.x1 + (s + 0.5) * hucre}" y="${a.y1 - pay * 0.3}">${harfler[s]}</text>`;
      for (let r = 0; r < satir; r++) etiketler += `<text class="sema-hucre" x="${a.x1 + s * hucre + hucre * 0.06}" y="${a.y1 + r * hucre + hucre * 0.16}">${harfler[s]}${r}</text>`;
    }
    for (let r = 0; r < satir; r++) etiketler += `<text class="sema-satir" x="${a.x1 - pay * 0.35}" y="${a.y1 + (r + 0.5) * hucre}">${r}</text>`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const x0 = a.x1 - pay, y0 = a.y1 - pay, gen = a.x2 - a.x1 + 2 * pay, yuk = satir * hucre + 2 * pay;
    svg.setAttribute('viewBox', `${x0} ${y0} ${gen} ${yuk}`);
    svg.style.setProperty('--hucre', hucre);
    svg.innerHTML = `
      ${ustte ? '' : `<rect class="sema-zemin" x="${a.x1}" y="${a.y1}" width="${a.x2 - a.x1}" height="${satir * hucre}"/>`}
      <g class="sema-cizgi">${cizgiler}</g>
      <g class="sema-yazi" font-size="${hucre * 0.11}">${etiketler}</g>
      ${ustte ? '' : `<text class="sema-baslik" x="${a.x2}" y="${a.y1 + satir * hucre + pay * 0.62}" font-size="${hucre * 0.22}">${kacis(H().ad)} · ${kacis(kat.ad)} (ızgara şeması)</text>`}`;
    return L.svgOverlay(svg, L.latLngBounds(ll(x0, y0 + yuk), ll(x0 + gen, y0)), {
      interactive: false, className: ustte ? 'harita-sema harita-sema-ust' : 'harita-sema', attribution: ustte ? '' : 'Harita görseli yakında',
    });
  }

  // Sağ üstteki site yazısı (veri/site.js, haritaYazisi). Kuzeydoğudaki boş arazide, 1200x760 harita
  // piksellik bir kutuya çizilen svg; harita ile birlikte büyüyüp küçülür, tıklamaları engellemez.
  function haritaYazisiEkle() {
    const y = DMZ.site.haritaYazisi;
    if (!y) return;
    const [ilk, ...kalan] = (y.ust || '').split(' ');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1200 760');
    svg.innerHTML = (y.ust ? `
      <text x="1180" y="150" font-size="118" letter-spacing="10" stroke-width="10"><tspan>${kacis(ilk)}</tspan><tspan class="yazi-vurgu"> ${kacis(kalan.join(' '))}</tspan></text>` : '') + `
      <text x="1180" y="420" font-size="270" letter-spacing="16" stroke-width="14">${kacis(y.ad || '')}</text>
      <text class="yazi-kore" x="1170" y="690" font-size="240" stroke-width="10">${kacis(y.imza || '')}</text>`;
    // y 800'ün altı: geniş ekranda açılışta görünen en üst sınır ve sağ üstteki düğmelerin altı.
    // Sağ kenar oyun alanının içinde (x 3300'den küçük), dar ekranda açılışta kesilmesin.
    yazi = L.svgOverlay(svg, L.latLngBounds(ll(2080, 1560), ll(3280, 800)), { interactive: false, className: 'harita-yazisi' }).addTo(harita);
  }

  // --- İşaretler ---

  function isaretIkonu(n) {
    const kat = DMZ.kategoriler[n.kategori] || DMZ.kategoriler.diger;
    if (n.kategori === 'bolge') {
      return L.divIcon({
        className: 'etiket-kap',
        html: `<span class="etiket etiket-${n.seviye || 'ara'}" lang="en">${kacis(n.ad)}</span>`,
        iconSize: [0, 0],
      });
    }
    // Önemli işaretler uzaktan bakınca da ikon olarak kalır, diğerleri noktaya döner
    const onemli = ['kale', 'giris', 'hikaye', 'cikis', 'soncikis', 'boss', 'siginak', 'acilcikis', 'wheelson', 'anahtar', 'yazici'].includes(n.kategori);
    const tam = tamResim(kat);
    const boy = n.kategori === 'kale' ? 36 : onemli ? 32 : 30;
    const siniflar = ['isaret', `isaret-${n.kategori}`];
    if (tam) siniflar.push('rozet-tam');
    if (onemli) siniflar.push('isaret-onemli');
    if (n.dogrulandi) siniflar.push('isaret-dogru');
    if (isaretliNoktalar.has(n.id)) siniflar.push('isaretli');
    // Nadirliği olan noktalar (anahtar odaları) o nadirliğin renginde
    const nad = n.nadirlik && DMZ.nadirlikler && DMZ.nadirlikler[n.nadirlik];
    return L.divIcon({
      className: 'isaret-kap',
      html: `<span class="${siniflar.join(' ')}" style="${DMZ.renkStili(nad ? { ...kat, renk: nad.renk } : kat)}">${rozetIci(kat, n)}</span>`,
      iconSize: [boy, boy],
      iconAnchor: [boy / 2, boy / 2],
      popupAnchor: [0, -boy / 2],
    });
  }

  // Rozetin içi ve hazır ikonlar ortak.js'te; arama sonuçları da aynılarını kullanıyor
  const tamResim = DMZ.tamResim;
  const rozetIci = DMZ.rozetIci;

  // Bölge adları en üstte kalsın ki uzaktan okunabilsin; işaretlenenler diğer işaretlerin üstünde
  const zSirasi = (n) => (n.kategori === 'bolge' ? 1000 : isaretliNoktalar.has(n.id) ? 500 : n.kategori === 'kale' ? 200 : 0);

  function popupIcerik(n) {
    const kat = DMZ.kategoriler[n.kategori] || DMZ.kategoriler.diger;
    const lok = DMZ.lokasyonNoktadan(n.id);
    const yakin = DMZ.enYakinBolge(n);
    const trAd = lok && lok.tr
      ? `<div class="popup-tr">${kacis(lok.tr)}</div>`
      : n.tr ? `<div class="popup-tr">${kacis(n.tr)}${yakin ? ` · ${kacis(yakin.ad)} yakını` : ''}</div>`
        : yakin ? `<div class="popup-tr">${DMZ.ikon('bolge')} ${kacis(yakin.ad)} yakını</div>` : '';
    // Anahtar odası ve kasa gibi noktaların ek bilgisi: anahtar, nadirlik, kat, ızgara kodu
    const nad = n.nadirlik && DMZ.nadirlikler[n.nadirlik];
    // Anahtar eşya listesinde varsa adı o eşyanın kartına gider
    const anahtarEsyasi = DMZ.anahtarEsyasi(n);
    const anahtarAdi = anahtarEsyasi
      ? `<a href="/esyalar/#e=${encodeURIComponent(anahtarEsyasi.id)}" lang="en">${kacis(n.anahtar)}</a>`
      : `<span lang="en">${kacis(n.anahtar)}</span>`;
    const katAdi = n.kat && (H().katlar || []).find((k) => k.kat === n.kat);
    const bilgiSatirlari = [
      n.anahtar
        ? `<div><dt>Anahtar</dt><dd>${anahtarAdi}${nad ? ` <span class="nadirlik nadirlik-${kacis(n.nadirlik)}">${kacis(nad.ad)}</span>` : ''}</dd></div>`
        : n.kategori === 'anahtar' && !n.aciklama ? '<div><dt>Anahtar</dt><dd class="soluk">Bilinmiyor</dd></div>' : '',
      katAdi ? `<div><dt>Kat</dt><dd>${kacis(katAdi.ad)}</dd></div>` : '',
      n.izgara ? `<div><dt>Izgara</dt><dd>${kacis(n.izgara)}</dd></div>` : '',
    ].join('');
    const katAd = n.kategori === 'bolge'
      ? (n.seviye === 'ana' ? 'Ana bölge' : 'Ara bölge')
      : `${kacis(kat.ad)} <span class="soluk">(${kacis(kat.en)})</span>`;
    const aciklama = n.aciklama || (lok && lok.aciklama) || kat.aciklama;
    const tehlike = lok && DMZ.tehlikeler[lok.tehlike]
      ? `<div class="popup-tehlike">Tehlike: <span class="tehlike tehlike-${lok.tehlike}"><i></i>${kacis(DMZ.tehlikeler[lok.tehlike].ad)}</span>${lok.radyasyon ? ` <span class="radyasyon">${DMZ.ikon('radyasyon')} Radyasyon</span>` : ''}</div>`
      : '';
    const rozet = n.kaynak === 'resmi'
      ? '<span class="rozet rozet-resmi">Resmi veri</span>'
      : n.kaynak === 'dmzhub'
        ? ''
        : n.kaynak === 'ipucu'
          ? '<a class="rozet rozet-ipucu" href="/rehber/#b=malzeme-yerleri">Oyun ipucu: 3D yazıcı</a>'
          : n.kaynak === 'rapor'
            ? '<a class="rozet rozet-rapor" href="/rehber/#b=kilavuzlar">Oyuncu raporu</a>'
            : `<span class="rozet rozet-topluluk">Ekip</span>${n.dogrulandi ? '<span class="rozet rozet-dogru">Doğrulandı</span>' : ''}`;
    // Yazıcı malzemesi alanında aranacak malzemeler, kılavuz noktasında oyuncuların bulduğu kılavuzlar; eşya kartlarına bağlı
    const malzemeler = [
      [n.malzemeler, 'Burada aranacak malzemeler'],
      [n.kilavuzlar, 'Oyuncuların burada bulduğu kılavuzlar'],
    ].filter(([liste]) => liste && liste.length)
      .map(([liste, baslik]) => `<div class="popup-malzemeler"><small>${baslik}</small>${DMZ.malzemeCipleri(liste)}</div>`)
      .join('');
    const lokDugme = lok
      ? `<a class="dugme dugme-kucuk" href="/lokasyonlar/#l=${encodeURIComponent(lok.id)}">Lokasyon kartı ${DMZ.ikon('ok')}</a>`
      : '';
    const isaretli = isaretliNoktalar.has(n.id);
    const isaretDugme = n.kategori === 'bolge' ? '' : `
          <button class="dugme dugme-kucuk dugme-isaretle" data-eylem="isaretle" data-id="${kacis(n.id)}" aria-pressed="${isaretli}">${DMZ.ikon('isaretle')} ${isaretli ? 'İşareti kaldır' : 'İşaretle'}</button>`;
    return `
      <div class="popup">
        <div class="popup-kat" style="${DMZ.renkStili(kat)}">${DMZ.ikon(kat.ikon)}<span>${katAd}</span></div>
        <h3 class="popup-baslik" lang="en">${kacis(n.ad)}</h3>
        ${trAd}
        ${tehlike}
        ${bilgiSatirlari ? `<dl class="popup-bilgi">${bilgiSatirlari}</dl>` : ''}
        ${malzemeler}
        <div class="popup-aciklama">${aciklama ? paragraflar(aciklama) : '<p class="soluk">Henüz Türkçe açıklama eklenmedi.</p>'}</div>
        <div class="popup-rozetler">${rozet}</div>
        <div class="popup-dugmeler">${isaretDugme}
          <button class="dugme dugme-kucuk" data-eylem="baglanti" data-id="${kacis(n.id)}">${DMZ.ikon('baglanti')} Bağlantıyı kopyala</button>
          ${lokDugme}
        </div>
      </div>`;
  }

  function noktalariYerlestir() {
    Object.keys(DMZ.kategoriler).forEach((k) => { katmanlar[k] = L.layerGroup(); });
    // Telefonda bilgi kutusu dar ve kısa olsun, haritanın çoğunu kapatmasın; uzun yazı kutunun içinde kayar
    const popupAyari = telefon()
      ? { maxWidth: 230, minWidth: 180, maxHeight: Math.round(innerHeight * 0.34), autoPanPaddingTopLeft: [10, 64], autoPanPaddingBottomRight: [10, 16] }
      : { maxWidth: 300, minWidth: 220, autoPanPadding: [24, 24] };
    DMZ.haritaNoktalari(aktif, aktifKat).forEach((n) => {
      const kat = katmanlar[n.kategori] ? n.kategori : 'diger';
      const isaret = L.marker(ll(n.x, n.y), {
        icon: isaretIkonu(n),
        title: n.kategori === 'bolge' ? '' : n.ad,
        keyboard: true,
        riseOnHover: true,
        zIndexOffset: zSirasi(n),
      });
      isaret.bindPopup(() => popupIcerik(n), popupAyari);
      isaret.addTo(katmanlar[kat]);
      isaretler[n.id] = isaret;
      alanCiz(n, katmanlar[kat]);
    });
    Object.entries(katmanlar).forEach(([k, katman]) => { if (!kapali.has(k)) katman.addTo(harita); });
  }

  // Colossus gibi tek bir yerde değil bir alanda çıkanlar için noktanın çevresine şeffaf daire.
  // Yarıçap harita pikseli: noktada "alan" yazıyorsa o, yoksa kategorinin "alan" değeri.
  function alanCiz(n, katman) {
    const kat = DMZ.kategoriler[n.kategori] || DMZ.kategoriler.diger;
    const yaricap = n.alan || kat.alan;
    if (!yaricap) return;
    L.circle(ll(n.x, n.y), {
      radius: yaricap / 2 ** MAX_ZOOM, // Leaflet birimi: en yakın zoomda 1 birim = 16 piksel
      color: kat.renk, weight: 1.5, opacity: 0.8, dashArray: '6 5',
      fillColor: kat.renk, fillOpacity: 0.16,
      interactive: false, // tıklamalar alttaki haritaya ve işaretlere geçsin
    }).addTo(katman);
  }

  function yakinlikGuncelle() {
    const z = harita.getZoom();
    $('#harita').dataset.yakinlik = z < 1.75 ? 'cok-uzak' : z < 2.5 ? 'uzak' : z < 3.5 ? 'orta' : 'yakin';
  }

  // --- Filtre paneli ---

  // Panel sayıları bütün katlardan; Hajin'de henüz noktası olmayan kategoriler "yakında" diye durur,
  // başka haritaya ait kategoriler (veri/kategoriler.js'te harita: 'x01') ve noktası olmayanlar X01'de çıkmaz.
  function paneliCiz(haritaDegisti) {
    const sayim = {};
    DMZ.haritaNoktalari(aktif).forEach((n) => { sayim[n.kategori] = (sayim[n.kategori] || 0) + 1; });
    const goster = ([k, kat]) => (aktif === 'hajin' ? !kat.harita && (k !== 'diger' || sayim.diger) : sayim[k] > 0);
    const gruplar = DMZ.kategoriGruplari.map((g) => {
      const kategoriler = Object.entries(DMZ.kategoriler).filter(([k, kat]) => kat.grup === g.id && goster([k, kat]));
      if (!kategoriler.length) return '';
      const satirlar = kategoriler.map(([k, kat]) => {
        const adet = sayim[k] || 0;
        const bos = adet === 0;
        return `
          <label class="filtre${bos ? ' filtre-bos' : ''}" style="${DMZ.renkStili(kat)}">
            <input type="checkbox" data-kategori="${k}" ${!kapali.has(k) ? 'checked' : ''} ${bos ? 'disabled' : ''}>
            <span class="filtre-ikon kat-${k}${tamResim(kat) ? ' rozet-tam' : ''}">${rozetIci(kat)}</span>
            <span class="filtre-ad">${kacis(kat.ad)}<small>${kacis(kat.en)}</small></span>
            <span class="filtre-sayi">${bos ? 'yakında' : adet}</span>
          </label>`;
      }).join('');
      return `
        <div class="filtre-grup">
          <label class="filtre-grup-baslik" title="Bu başlıktaki her şeyi aç ya da kapat">
            <span>${kacis(g.ad)}</span>
            <input type="checkbox" data-grup="${g.id}">
            <span class="anahtar" aria-hidden="true"></span>
          </label>
          ${satirlar}
        </div>`;
    }).join('');

    $('#harita-filtreler').innerHTML = gruplar;
    grupAnahtarlari();
    isaretOzeti();
    if (haritaDegisti) {
      $('#harita-giris').innerHTML = DMZ.haritaGirisHtml(aktif);
      $('#harita-nasil').innerHTML = DMZ.haritaNasilHtml(aktif);
      $('#harita-ara').placeholder = aktif === 'x01' ? 'Ara: anahtar odası, kasa, gizli giriş…' : 'Ara: anahtar, kale, eşya, görev…';
    }
  }

  // Panel olayları bir kez bağlanır, panelin içi harita değişince yeniden çizilir
  function panelOlaylari() {
    $('#harita-filtreler').addEventListener('change', (e) => {
      const anahtar = e.target.closest('input[data-grup]');
      if (anahtar) { grupAyarla(anahtar); return; }
      const kutu = e.target.closest('input[data-kategori]');
      if (!kutu) return;
      kategoriAyarla(kutu.dataset.kategori, kutu.checked);
    });

    $('#filtre-hepsi').addEventListener('click', () => topluAyarla(true));
    $('#filtre-hicbiri').addEventListener('click', () => topluAyarla(false));
    $('#isaret-temizle').addEventListener('click', isaretleriTemizle);

    // Arama bütün sitede (js/arama.js): önce haritalardaki noktalar, altında eşyalar, görevler ve rehber
    DMZ.Arama.bagla($('#harita-ara'), $('#harita-sonuclar'), {
      harita: true, haric: ['lokasyon'], once: 'harita', enter: true, ilkSinir: 8, sinir: 3,
      secince: () => { if (telefon()) panelAc(false); },
    });
  }

  function kategoriAyarla(k, acik) {
    if (!katmanlar[k]) return;
    if (acik) { katmanlar[k].addTo(harita); kapali.delete(k); } else { harita.removeLayer(katmanlar[k]); kapali.add(k); }
    depo.yaz(filtreAnahtari(), [...kapali]);
    const kutu = $(`input[data-kategori="${k}"]`);
    if (kutu) kutu.checked = acik;
    grupAnahtarlari();
  }

  // Başlıktaki anahtar o gruptaki bütün kategorileri birlikte açar ya da kapatır
  function grupAyarla(anahtar) {
    const acik = anahtar.checked; // döngüde anahtar yeniden hesaplanıyor, değeri baştan al
    $$('input[data-kategori]:not(:disabled)', anahtar.closest('.filtre-grup'))
      .forEach((kutu) => kategoriAyarla(kutu.dataset.kategori, acik));
  }

  // Gruptakilerin hepsi açıksa anahtar açık, hiçbiri açık değilse kapalı, bir kısmı açıksa yarım.
  // Yarımken tıklanınca hepsi açılır.
  function grupAnahtarlari() {
    $$('#harita-filtreler input[data-grup]').forEach((anahtar) => {
      const kutular = $$('input[data-kategori]:not(:disabled)', anahtar.closest('.filtre-grup'));
      const acik = kutular.filter((k) => k.checked).length;
      anahtar.disabled = !kutular.length;
      anahtar.checked = kutular.length > 0 && acik === kutular.length;
      anahtar.indeterminate = acik > 0 && acik < kutular.length;
    });
  }

  function topluAyarla(acik) {
    $$('#harita-filtreler input[data-kategori]:not(:disabled)').forEach((kutu) => kategoriAyarla(kutu.dataset.kategori, acik));
  }

  // --- Kat düğmesi (sadece katlı haritada) ---

  function katSeciciCiz() {
    const kutu = $('#kat-secici');
    const katlar = H().katlar;
    kutu.hidden = !katlar;
    if (!katlar) { kutu.innerHTML = ''; return; }
    kutu.innerHTML = katlar.map((k) => `
      <button type="button" class="kat-dugme" data-kat="${k.kat}" aria-pressed="${k.kat === aktifKat}" title="${kacis(k.en)}">${DMZ.ikon('kat')}<span>${kacis(k.ad)}</span></button>`).join('');
  }

  // --- Araç düğmeleri ---

  function araclariKur() {
    $('#arac-katman').addEventListener('click', () => panelAc(!panelAcikMi()));
    $('#arac-katman').setAttribute('aria-expanded', String(panelAcikMi()));
    $('#panel-kapat').addEventListener('click', () => panelAc(false));
    $('#arac-sifirla').addEventListener('click', () => { harita.closePopup(); harita.flyToBounds(acilisSiniri(), { ...SIGDIRMA_PAYI, duration: 0.6 }); });
    $('#arac-koordinat').addEventListener('click', () => koordinatAyarla(!koordinatModu));
    $('#kat-secici').addEventListener('click', (e) => {
      const d = e.target.closest('[data-kat]');
      if (d) haritaAc(aktif, Number(d.dataset.kat));
    });

    harita.on('mousemove', (e) => {
      if (!koordinatModu) return;
      const p = harita.project(e.latlng, MAX_ZOOM);
      $('#koordinat-gosterge').textContent = `x ${Math.round(p.x)} · y ${Math.round(p.y)}`;
    });

    harita.on('click', (e) => {
      if (!koordinatModu) return;
      const p = harita.project(e.latlng, MAX_ZOOM);
      const x = Math.round(p.x), y = Math.round(p.y);
      const yer = aktif === 'hajin' ? '' : ` harita: '${aktif}',${aktifKat ? ` kat: ${aktifKat},` : ''}`;
      const satir = `{ id: 'yeni-${x}-${y}',${yer} ad: '', kategori: 'cikis', x: ${x}, y: ${y}, aciklama: '' },`;
      L.popup({ maxWidth: 340, className: 'koordinat-popup' })
        .setLatLng(e.latlng)
        .setContent(`
          <div class="popup">
            <div class="popup-kat" style="--renk:var(--ikincil)">${DMZ.ikon('koordinat')}<span>Koordinat</span></div>
            <h3 class="popup-baslik">x ${x} · y ${y}</h3>
            <p class="soluk">Bu satırı <code>veri/noktalar.js</code> dosyasındaki listeye yapıştır, sonra ad ve kategoriyi doldur.</p>
            <pre class="kod">${kacis(satir)}</pre>
            <div class="popup-dugmeler">
              <button class="dugme dugme-kucuk dugme-vurgu" data-eylem="kopyala-satir" data-metin="${kacis(satir)}">${DMZ.ikon('kopyala')} Satırı kopyala</button>
            </div>
          </div>`)
        .openOn(harita);
    });
  }

  function koordinatAyarla(acik) {
    koordinatModu = acik;
    $('#harita').classList.toggle('koordinat-modu', acik);
    $('#arac-koordinat').setAttribute('aria-pressed', String(acik));
    $('#koordinat-gosterge').hidden = !acik;
    $('#koordinat-gosterge').textContent = 'Haritada bir yere tıkla';
    if (acik) bildirim('Koordinat modu açık: haritaya tıkla');
  }

  const telefon = () => matchMedia('(max-width: 899px)').matches;

  // Telefonda panel alttan açılır ("acik"), masaüstünde haritanın solunda durur ve gizlenebilir ("gizli")
  function panelAc(acik) {
    const panel = $('.harita-panel');
    if (telefon()) {
      panel.classList.toggle('acik', acik);
    } else {
      // Panel gidince harita sola doğru genişler; görünen yer kaymasın diye haritayı aynı miktar geri kaydır.
      // debounceMoveend: harita sınırı kontrolü bu kaydırma bitmeden araya girmesin
      const kap = $('#harita');
      const onceki = kap.getBoundingClientRect().left;
      panel.classList.toggle('gizli', !acik);
      harita.invalidateSize({ pan: false, debounceMoveend: true });
      harita.panBy([kap.getBoundingClientRect().left - onceki, 0], { animate: false });
    }
    $('#arac-katman').setAttribute('aria-expanded', String(acik));
  }

  function panelAcikMi() {
    const panel = $('.harita-panel');
    return telefon() ? panel.classList.contains('acik') : !panel.classList.contains('gizli');
  }

  async function popupEylemi(e) {
    const d = e.target.closest('[data-eylem]');
    if (!d) return;
    if (d.dataset.eylem === 'isaretle') isaretDegistir(d.dataset.id);
    if (d.dataset.eylem === 'baglanti') {
      const n = noktaBul(d.dataset.id);
      const oldu = n && await kopyala(baglanti(DMZ.noktaLinki(n)));
      bildirim(oldu ? 'Bağlantı kopyalandı, ekibe gönderebilirsin' : 'Kopyalanamadı');
    }
    if (d.dataset.eylem === 'kopyala-satir') {
      const oldu = await kopyala(d.dataset.metin);
      bildirim(oldu ? 'Satır kopyalandı' : 'Kopyalanamadı');
    }
  }

  // --- İşaretleme: oyundaki gibi, işaretlenen noktanın etrafında altın halka. Bu tarayıcıda saklanır. ---

  function isaretDegistir(id) {
    if (isaretliNoktalar.has(id)) isaretliNoktalar.delete(id); else isaretliNoktalar.add(id);
    depo.yaz(ISARET_ANAHTARI, [...isaretliNoktalar]);
    isaretYenile(id);
    isaretOzeti();
  }

  function isaretleriTemizle() {
    const idler = [...isaretliNoktalar];
    isaretliNoktalar.clear();
    depo.yaz(ISARET_ANAHTARI, []);
    idler.forEach(isaretYenile);
    isaretOzeti();
    bildirim('İşaretler temizlendi');
  }

  // İkonu yeniden çiz; bilgi kutusu açıksa düğmesi de güncellensin
  function isaretYenile(id) {
    const n = noktaBul(id);
    const isaret = isaretler[id];
    if (!n || !isaret) return;
    isaret.setIcon(isaretIkonu(n));
    isaret.setZIndexOffset(zSirasi(n));
    if (isaret.isPopupOpen()) isaret.getPopup().update();
  }

  // Paneldeki "N işaretli nokta · Temizle" satırı (açık haritada)
  function isaretOzeti() {
    const adet = DMZ.haritaNoktalari(aktif).filter((n) => isaretliNoktalar.has(n.id)).length;
    $('#isaret-ozeti').hidden = adet === 0;
    $('#isaret-sayisi').textContent = `${adet} işaretli nokta`;
  }

  // --- Dışarıdan çağrılanlar ---

  // Noktayı göster: başka kattaysa o katı aç, filtrede kapalıysa kategorisini aç
  function odakla(id) {
    const n = noktaBul(id);
    if (!n) return false;
    if (DMZ.noktaHaritasi(n) !== aktif || (n.kat && n.kat !== aktifKat)) haritaAc(DMZ.noktaHaritasi(n), n.kat);
    const isaret = isaretler[id];
    if (!isaret) return false;
    const kat = katmanlar[n.kategori] ? n.kategori : 'diger';
    if (kapali.has(kat)) kategoriAyarla(kat, true);
    harita.closePopup();
    harita.flyTo(ll(n.x, n.y), Math.max(harita.getZoom(), 4), { duration: 0.7 });
    harita.once('moveend', () => isaret.openPopup());
    return true;
  }

  function goster(parametreler, haritaId = 'hajin') {
    kur();
    haritaAc(haritaId);
    // Sayfa gizliyken boyut hesaplanamıyor, görünür olunca yeniden ölç
    requestAnimationFrame(() => {
      harita.invalidateSize();
      if (parametreler && parametreler.get('n')) odakla(parametreler.get('n'));
    });
  }

  return { goster, odakla };
})();
