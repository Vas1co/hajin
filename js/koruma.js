// Kopyalamaya karşı basit önlemler: sağ tık menüsü, resim sürükleme, yazı seçme ve kopyalama, sayfayı kaydetme,
// yazdırma ve kaynak kodu / geliştirici araçlarını açma kısayolları kapalı. Bu işlerden anlamayanlar sitedeki
// resimleri ve yazıları kolayca kopyalayamasın diye; bilen biri yine de alabilir.
// Arama kutularında yazı seçme, sağ tık ve kopyalama çalışmaya devam eder.
// Kapatmak için veri/site.js içinde kopyaKorumasi: false yap.
(function () {
  if (!window.DMZ || !DMZ.site || DMZ.site.kopyaKorumasi === false) return;
  document.documentElement.classList.add('korumali');

  // Yazı yazılan yerler ve koordinat aracındaki kod satırı serbest
  const serbest = (el) => !!(el && el.closest && el.closest('input, textarea, [contenteditable="true"], .kod'));

  document.addEventListener('contextmenu', (e) => { if (!serbest(e.target)) e.preventDefault(); });
  document.addEventListener('dragstart', (e) => { if (e.target && e.target.tagName === 'IMG') e.preventDefault(); });
  document.addEventListener('copy', (e) => { if (!serbest(document.activeElement)) e.preventDefault(); });
  document.addEventListener('cut', (e) => { if (!serbest(document.activeElement)) e.preventDefault(); });

  document.addEventListener('keydown', (e) => {
    const tus = (e.key || '').toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const engelle = e.key === 'F12'
      || (ctrl && !e.shiftKey && ['s', 'u', 'p'].includes(tus))                 // kaydet, kaynağı gör, yazdır
      || (ctrl && e.shiftKey && ['i', 'j', 'c'].includes(tus))                   // geliştirici araçları
      || (e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].includes(tus));          // Mac'teki karşılıkları
    if (engelle) e.preventDefault();
  });
})();
