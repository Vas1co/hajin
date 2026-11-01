// Sayfa geçişleri (#/harita gibi adresler) ve menüler.
(function () {
  const { $, $$, kacis } = DMZ.yardim;

  const SAYFALAR = [
    { id: 'ana',         yol: '',            ad: 'Ana Sayfa',      kisa: 'Ana',      ikon: 'ana',    ciz: DMZ.Sayfalar.anaSayfa },
    { id: 'harita',      yol: 'harita',      ad: 'Harita',         kisa: 'Harita',   ikon: 'harita' },
    { id: 'lokasyonlar', yol: 'lokasyonlar', ad: 'Lokasyonlar',    kisa: 'Lokasyon', ikon: 'bolge',  ciz: DMZ.Sayfalar.lokasyonlar },
    { id: 'gorevler',    yol: 'gorevler',    ad: 'Görevler',       kisa: 'Görev',    ikon: 'gorev',  ciz: DMZ.Sayfalar.gorevler },
    { id: 'esyalar',     yol: 'esyalar',     ad: 'Eşyalar',        kisa: 'Eşya',     ikon: 'esya',   ciz: DMZ.Sayfalar.esyalar },
    { id: 'rehber',      yol: 'rehber',      ad: 'Rehber',         kisa: 'Rehber',   ikon: 'kilavuz', ciz: DMZ.Sayfalar.rehber },
  ];
  const cizilenler = new Set();

  function menuleriKur() {
    const site = DMZ.site;
    $$('[data-site-ad]').forEach((e) => { e.textContent = site.ad; });
    $$('[data-site-alt]').forEach((e) => { e.textContent = site.altBaslik; });
    $('#site-guncelleme').textContent = `Son güncelleme: ${site.guncelleme}`;

    $('#ust-menu').innerHTML = SAYFALAR.map((s) => `
      <a href="#/${s.yol}" data-sayfa="${s.id}">${DMZ.ikon(s.ikon)}<span>${kacis(s.ad)}</span></a>`).join('');
    $('#alt-menu').innerHTML = SAYFALAR.map((s) => `
      <a href="#/${s.yol}" data-sayfa="${s.id}">${DMZ.ikon(s.ikon)}<span>${kacis(s.kisa)}</span></a>`).join('');

    // Harita sayfasındaki ikonlar
    $$('[data-ikon]').forEach((e) => { e.insertAdjacentHTML('afterbegin', DMZ.ikon(e.dataset.ikon)); });
  }

  function adresiCoz() {
    const ham = location.hash.replace(/^#\/?/, '');
    const [yol, sorgu] = ham.split('?');
    const sayfa = SAYFALAR.find((s) => s.yol === yol) || SAYFALAR[0];
    return { sayfa, parametreler: new URLSearchParams(sorgu || '') };
  }

  function git() {
    const { sayfa, parametreler } = adresiCoz();
    const oncekiAcik = $('.sayfa:not([hidden])');

    SAYFALAR.forEach((s) => { $(`#sayfa-${s.id}`).hidden = s.id !== sayfa.id; });
    $$('[data-sayfa]').forEach((a) => {
      if (a.dataset.sayfa === sayfa.id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.body.dataset.sayfa = sayfa.id;
    document.title = sayfa.id === 'ana' ? `${DMZ.site.ad} · ${DMZ.site.altBaslik}` : `${sayfa.ad} · ${DMZ.site.ad}`;

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

  menuleriKur();
  window.addEventListener('hashchange', git);
  git();
})();
