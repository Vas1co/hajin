// Haritadaki hızlı tren (js/tren.js): rayların üstünden giden güzergâh ve duraklar.
// Noktalar harita pikseli (4096'lık resim, sol üst köşeden). South Island istasyonundan başlıyor, kuzeye
// Shoreline istasyonuna, sonra batıya hastaneye doğru gidiyor; tren batı ucunda kaybolup geri dönüyor.
// Rayın yeri harita resminden elle çıkarıldı. Bir yerde raydan kayıyorsa o noktayı düzelt ya da araya nokta ekle.
// Treni kapatmak için veri/site.js'te haritaTreni: false yap.
window.DMZ = window.DMZ || {};

DMZ.trenHatti = {
  noktalar: [
    [2643, 3094], [2700, 3058], [2757, 3022], [2810, 2985], [2835, 2960], [2847, 2930], [2852, 2890],
    [2853, 2800], [2853, 2700], [2853, 2600], [2856, 2520], [2864, 2470], [2869, 2420], [2867, 2370],
    [2859, 2330], [2845, 2285], [2826, 2248], [2805, 2220], [2780, 2202], [2740, 2181], [2700, 2160],
    [2650, 2133], [2600, 2106], [2550, 2088], [2500, 2075], [2450, 2064], [2400, 2056],
  ],
  // Trenin ortası bu noktaya gelince "bekle" saniye durur. İlki kalkış istasyonu.
  duraklar: [
    { ad: 'South Island', x: 2760, y: 3020, bekle: 6 },
    { ad: 'Shoreline Station', x: 2869, y: 2412, bekle: 4 },
  ],
  vagon: 6,        // vagon sayısı
  vagonBoyu: 16,   // bir vagonun boyu, harita pikseli
  hiz: 45,         // harita pikseli / saniye
  gizliBekle: 8,   // batı ucunda kaybolduktan sonra geri gelene kadar geçen saniye
};
