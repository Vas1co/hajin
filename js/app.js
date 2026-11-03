// Sayfa geçişleri (/harita/hajin/, /esyalar/?e=... gibi gerçek adresler) ve menüler.
// Her adresin sunucuda bir dosyası var (araclar/sayfalari_uret.mjs bu index.html'in kopyalarını yazar),
// adres doğrudan açılınca da aynı uygulama yüklenir. Site içi tıklamalarda sayfa yenilenmez, sadece adres değişir.
(function () {
  const { $, $$, kacis } = DMZ.yardim;

  const SAYFALAR = [
    { id: 'ana',         yol: '/',             ad: 'Ana Sayfa',   kisa: 'Ana',      ikon: 'ana',    ciz: DMZ.Sayfalar.anaSayfa },
    { id: 'harita',      yol: '/harita/hajin/', ad: 'Harita',     kisa: 'Harita',   ikon: 'harita' },
    { id: 'lokasyonlar', yol: '/lokasyonlar/', ad: 'Lokasyonlar', kisa: 'Lokasyon', ikon: 'bolge',  ciz: DMZ.Sayfalar.lokasyonlar },
    { id: 'gorevler',    yol: '/gorevler/',    ad: 'Görevler',    kisa: 'Görev',    ikon: 'gorev',  ciz: DMZ.Sayfalar.gorevler },
    { id: 'esyalar',     yol: '/esyalar/',     ad: 'Eşyalar',     kisa: 'Eşya',     ikon: 'esya',   ciz: DMZ.Sayfalar.esyalar },
    { id: 'rehber',      yol: '/rehber/',      ad: 'Rehber',      kisa: 'Rehber',   ikon: 'kilavuz', ciz: DMZ.Sayfalar.rehber },
  ];
  // Haritalar /harita/<ad>/ adresinde. Şimdilik sadece Hajin; yeni harita (ör. Black Site) gelince buraya eklenir.
  const HARITALAR = ['hajin'];
  const cizilenler = new Set();
  // Sayfa ilk açıldığındaki <title> (Google'da çıkan); o sayfaya dönünce uygulama onu ezmesin
  const basliklar = { ana: DMZ.site.anaBaslik };

  function menuleriKur() {
    const site = DMZ.site;
    $$('[data-site-ad]').forEach((e) => { e.textContent = site.ad; });
    $$('[data-site-alt]').forEach((e) => { e.textContent = site.altBaslik; });
    $('#site-guncelleme').textContent = `Son güncelleme: ${site.guncelleme}`;
    if (site.iletisim) { $('#site-iletisim').innerHTML = `İletişim, hata ya da öneri: ${DMZ.iletisimHtml()}`; $('#site-iletisim').hidden = false; }

    $('#ust-menu').innerHTML = SAYFALAR.map((s) => `
      <a href="${s.yol}" data-sayfa="${s.id}">${DMZ.ikon(s.ikon)}<span>${kacis(s.ad)}</span></a>`).join('');
    $('#alt-menu').innerHTML = SAYFALAR.map((s) => `
      <a href="${s.yol}" data-sayfa="${s.id}">${DMZ.ikon(s.ikon)}<span>${kacis(s.kisa)}</span></a>`).join('');

    // Harita sayfasındaki ikonlar
    $$('[data-ikon]').forEach((e) => { e.insertAdjacentHTML('afterbegin', DMZ.ikon(e.dataset.ikon)); });
  }

  // Adres uygulamanın bir sayfası mı? Değilse (ör. /esyalar/medkit/ ayrı sayfa) tarayıcı normal açar.
  function sayfaBul(yol) {
    const [bir, iki, ...fazla] = yol.split('/').filter(Boolean);
    if (fazla.length) return null;
    if (!bir) return { sayfa: SAYFALAR[0], yol: '/' };
    if (bir === 'harita') {
      if (iki && !HARITALAR.includes(iki)) return null;
      return { sayfa: SAYFALAR[1], yol: `/harita/${iki || HARITALAR[0]}/` };
    }
    const sayfa = !iki && SAYFALAR.find((s) => s.id === bir);
    return sayfa ? { sayfa, yol: sayfa.yol } : null;
  }

  function git() {
    const bulunan = sayfaBul(location.pathname) || { sayfa: SAYFALAR[0], yol: '/' };
    const { sayfa } = bulunan;
    const parametreler = new URLSearchParams(location.search);
    // /harita/ → /harita/hajin/, bilinmeyen adres → ana sayfa
    if (bulunan.yol !== location.pathname) history.replaceState(null, '', bulunan.yol + location.search + location.hash);
    const oncekiAcik = $('.sayfa:not([hidden])');

    SAYFALAR.forEach((s) => { $(`#sayfa-${s.id}`).hidden = s.id !== sayfa.id; });
    $$('[data-sayfa]').forEach((a) => {
      if (a.dataset.sayfa === sayfa.id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.body.dataset.sayfa = sayfa.id;
    if (!oncekiAcik) basliklar[sayfa.id] = document.title;
    document.title = basliklar[sayfa.id] || `${sayfa.ad} · ${DMZ.site.ad}`;

    if (sayfa.ciz && !cizilenler.has(sayfa.id)) {
      sayfa.ciz($(`#sayfa-${sayfa.id}`));
      cizilenler.add(sayfa.id);
    }

    if (sayfa.id === 'harita') DMZ.Harita.goster(parametreler);
    else if (oncekiAcik && oncekiAcik.id !== `sayfa-${sayfa.id}`) window.scrollTo(0, 0);

    if (sayfa.id === 'lokasyonlar' && parametreler.get('l')) {
      requestAnimationFrame(() => DMZ.Sayfalar.lokasyonVurgula(parametreler.get('l')));
    }
    if (sayfa.id === 'gorevler' && parametreler.get('g')) {
      requestAnimationFrame(() => DMZ.Sayfalar.gorevVurgula(parametreler.get('g')));
    }
    if (sayfa.id === 'esyalar' && parametreler.get('e')) {
      requestAnimationFrame(() => DMZ.Sayfalar.esyaVurgula(parametreler.get('e')));
    }
    if (sayfa.id === 'rehber' && parametreler.get('b')) {
      requestAnimationFrame(() => DMZ.Sayfalar.rehberGit(parametreler.get('b')));
    }
    if (sayfa.id === 'rehber' && parametreler.get('t')) {
      requestAnimationFrame(() => DMZ.Sayfalar.terimVurgula(parametreler.get('t')));
    }
  }

  // Site içi bağlantılar: sayfayı yenilemeden adresi değiştir. Aynı adrese tıklanınca da (ör. haritada aynı nokta) yine gider.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download') || a.getAttribute('href').startsWith('#')) return;
    const hedef = new URL(a.href);
    if (hedef.origin !== location.origin || !sayfaBul(hedef.pathname)) return;
    e.preventDefault();
    if (hedef.href !== location.href) history.pushState(null, '', hedef.pathname + hedef.search + hedef.hash);
    git();
  });

  menuleriKur();
  window.addEventListener('popstate', git);
  git();
})();
