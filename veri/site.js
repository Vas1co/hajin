// Sitenin genel ayarları. Site adını ve iletişim bilgisini buradan değiştir.
window.DMZ = window.DMZ || {};

DMZ.site = {
  ad: 'Hajin Rehberi',
  altBaslik: 'MW4 DMZ · Türkçe',
  guncelleme: '30 Ekim 2026',
  // Arkadaşların bilgi gönderebileceği yer, ör. 'Discord: kullaniciadi'. Boş kalırsa "yakında" yazar.
  iletisim: '',
  // DMZHub'dan alınan her şey gösterilsin mi: haritadaki noktalar (boss alanları, çıkışlar, sığınaklar,
  // kayıp ikmal, roketler), hazır ikonlar (harita/ikonlar/dmzhub-*) ve DMZ Emirleri.
  // Site herkese açık yayınlanacaksa ve DMZHub'dan izin yoksa false yap.
  dmzhubVerileri: true,
  // Haritada oyunun kendi ikonları (harita/ikonlar klasöründeki resimler) kullanılsın mı?
  // false yaparsan bütün işaretler Font Awesome ikonlarına döner. Hangi kategorinin hangi resmi
  // kullandığı veri/kategoriler.js içindeki "resim" ve "tamResim" alanlarında.
  resimIkonlar: true,
  // Kopyalamaya karşı basit önlemler (js/koruma.js): sağ tık menüsü, resim sürükleme, yazı seçme ve
  // sayfayı kaydetme / kaynak kodu açma kısayolları kapalı. Bu işlerden anlamayanlar kolayca kopyalayamasın
  // diye; bilen biri yine de alabilir. Siteyi düzenlerken rahatsız ederse false yap.
  kopyaKorumasi: true,
  // Haritanın sağ üstünde, kuzeydoğudaki boş arazide duran yazı. Harita ile birlikte büyüyüp küçülür.
  // "ust" satırının ilk kelimesi beyaz, gerisi turuncu. "imza" Korece harflerle "Vasco" (바스코).
  // Kaldırmak için haritaYazisi: null yap.
  haritaYazisi: { ust: 'DMZ TÜRKİYE', ad: 'HAJİN', imza: '바스코' },
};
