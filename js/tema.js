// Tema (css/temalar.css). Varsayılanı veri/site.js'teki "tema" ayarı; site.js bu yüzden sayfanın başında yükleniyor,
// sayfa çizilmeden tema seçilsin, renkler bir an eski görünmesin.
// Başka temaya bakmak için adrese ?tema=klasik gibi ekle: o zaman sol altta temalar arasında geçiş düğmeleri çıkar.
(function () {
  const TEMALAR = {
    klasik: 'Klasik',
    'radyasyon-sade': 'Radyasyon · Sade',
    radyasyon: 'Radyasyon (şeritli)',
    'radyasyon-kehribar': 'Radyasyon · Kehribar',
    menu: 'Oyun Menüsü',
  };
  const kok = document.documentElement;
  // "klasik" site.css'teki eski renkler: tema yok
  const uygula = (t) => { if (t && t !== 'klasik' && TEMALAR[t]) kok.dataset.tema = t; else delete kok.dataset.tema; };

  const adres = new URLSearchParams(location.search);
  const deneme = adres.has('tema');
  uygula(deneme ? adres.get('tema') : window.DMZ && DMZ.site && DMZ.site.tema);
  if (!deneme) return;

  document.addEventListener('DOMContentLoaded', () => {
    const kutu = document.createElement('div');
    kutu.className = 'tema-secici';
    kutu.innerHTML = '<b>Tema dene</b>' + Object.entries(TEMALAR)
      .map(([t, ad]) => `<button type="button" data-tema-sec="${t}">${ad}</button>`).join('');
    const isaretle = () => kutu.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.temaSec === (kok.dataset.tema || 'klasik')));
    });
    kutu.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      uygula(b.dataset.temaSec);
      const simdiki = new URLSearchParams(location.search);
      simdiki.set('tema', b.dataset.temaSec);
      history.replaceState(history.state, '', `${location.pathname}?${simdiki}${location.hash}`);
      isaretle();
    });
    isaretle();
    document.body.appendChild(kutu);
  });
})();
