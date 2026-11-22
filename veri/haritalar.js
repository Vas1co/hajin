// Sitedeki haritalar. Her haritanın adresi /harita/<id>/ (js/app.js ve araclar/sayfalari_uret.mjs bu listeyi okur).
// Yeni harita eklemek için: buraya bir kayıt, noktalarına harita: '<id>' alanı, sonra node araclar/sayfalari_uret.mjs.
//
//   baslik      sekme ve Google başlığı      h1      sayfadaki ana başlık (haritanın sol panelinin en üstünde)
//   aciklama    Google'da başlığın altındaki açıklama
//   giris       panelin üstündeki kısa tanıtım; "nasil" ve "not" panelin altındaki açılır kutuda
//   karo        harita görseli karoları; yoksa harita oyundaki ızgara üzerinde şema olarak çizilir
//   alan        oynanabilir bölge (4096 piksellik görselde); katlı haritalarda her katın kendi "izgara"sı var
//   katlar      kat listesi; gorsel: o katın harita resmi ve 4096'lık çerçevedeki yeri (x1, y1 sol üst, x2, y2 sağ alt).
//               X01 resimleri kaynak/x01/dmzmap'ten, anahtar odalarının iki sitedeki yerine göre hizalandı (hata 16 pikselin altında).
//               Resim yoksa kat oyundaki ızgara üzerinde şema olarak çizilir.
// izgara: oyundaki ızgaranın görseldeki yeri (0-1 arası), sütun (A, B, C...) ve satır (0, 1, 2...)
//               sayısı. Hücreler kare; satırlar çerçevenin altından yukarı dizilir (DMZHub'ın ızgara kodlarıyla böyle tutuyor).
window.DMZ = window.DMZ || {};

DMZ.haritalar = {
  hajin: {
    ad: 'Hajin',
    en: 'Hajin Exclusion Zone',
    baslik: 'DMZ Hajin Haritası – Türkçe İnteraktif Harita | peekdock',
    h1: 'DMZ Hajin İnteraktif Haritası',
    aciklama: 'Call of Duty: Modern Warfare 4 DMZ Hajin haritası Türkçe: anahtar odaları, kasalar, çıkış ve son çıkış noktaları, boss alanları, 3D yazıcı malzemeleri. Ara, filtrele, noktayı ekibine gönder.',
    giris: 'Call of Duty: Modern Warfare 4 DMZ\'nin ana bölgesi Hajin için Türkçe interaktif harita. Anahtar odalarını, kasaları, çıkışları, boss alanlarını ve 3D yazıcı malzemelerinin arandığı yerleri tek haritada gör; her noktanın Türkçe açıklaması var.',
    not: 'Bölge adları, ikmal noktaları ve kaleler Activision\'ın resmi Hajin haritasından.',
    karo: { url: '/harita/tiles/{z}/{x}/{y}.jpg', tileSize: 256, maxNativeZoom: 4, telif: 'Harita © Activision' },
    boyut: 4096,
    alan: { x1: 790, y1: 775, x2: 3300, y2: 3365 },
    telefonAlani: { x1: 950, y1: 1150, x2: 3050, y2: 3250 },
    depo: 'hajin',
  },
  x01: {
    ad: 'X01 Black Site',
    en: 'X01 Black Site',
    baslik: 'X01 Black Site Haritası – DMZ Türkçe İnteraktif Harita (Sezon 1)',
    h1: 'X01 Black Site İnteraktif Haritası',
    aciklama: 'MW4 DMZ Sezon 1 X01 Black Site haritası Türkçe: iki kat, anahtar odaları, Derin Kasa, gizli girişler, kasalar, silah dolapları, Wheelson Commander ve çıkış noktaları.',
    giris: 'Sezon 1 ile gelen X01, Hajin\'in altındaki GRANIT Arms yeraltı tesisi; Hajin\'den girilir. İki kattaki anahtar odalarını, Derin Kasa\'yı, gizli girişleri, kasaları, silah dolaplarını ve çıkışları Türkçe açıklamalarıyla gör.',
    not: 'Kat görselleri Activision’a ait oyun içi taktik haritadan. üstündeki ızgara oyundaki A–J, 0–8 ızgarası. X01 bilgileri resmi Sezon 1 yama notlarıyla karşılaştırıldı. Resmi notlara göre X01\'de İHA ve gelişmiş İHA kullanılamıyor.',
    boyut: 4096,
    katlar: [
      { kat: 1, ad: '1. kat', en: 'First Floor', izgara: { x: 0.238, y: 0.252, w: 0.564, h: 0.506, sutun: 10, satir: 9 },
        gorsel: { url: '/harita/gorseller/x01-kat1.webp', x1: 696, y1: 672, x2: 3537, y2: 3481 } },
      { kat: 2, ad: '2. kat', en: 'Second Floor', izgara: { x: 0.22, y: 0.239, w: 0.563, h: 0.533, sutun: 10, satir: 9 },
        gorsel: { url: '/harita/gorseller/x01-kat2.webp', x1: 692, y1: 677, x2: 3536, y2: 3495 } },
    ],
    depo: 'x01',
  },
};
