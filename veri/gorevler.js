// Görevler sayfası.
//
// DMZ.gorevBilgi: sayfanın üstündeki açıklama kutuları (Rehber ile aynı biçim; metin/maddelerde basit HTML olabilir).
// Kaynak: Activision'ın resmi DMZ yazıları (Ekim 2026), kendi cümlelerimizle.
//
// DMZ.gorevler: DMZ Emirleri (DMZ Orders), sayfa sayfa. Her sayfada 3 emir ve bir sayfa ödülü var.
// Emirler DMZHub'ın topluluk verisinden (dmzhub.gg/orders, 30 Ekim 2026) Türkçeleştirildi; "kaynak: 'dmzhub'"
// olan sayfalar veri/site.js'teki dmzhubVerileri ayarıyla gizlenebilir. Oyunda farklı bir şey görürsen düzelt.
// Biçim:
//   {
//     id: 'e01', sayfa: 1, ad: 'İngilizce bölüm adı', tr: 'Türkçe başlık', odul: 'Sayfa ödülü', not: 'İsteğe bağlı',
//     gorevler: [
//       { id: 'e01-1', ad: 'Order name', tr: 'Türkçe adı',
//         adimlar: ['1. adım', '2. adım'], odul: 'Görev ödülü', ipucu: 'İsteğe bağlı', lokasyon: 'lokasyon-id' },
//     ],
//   },
// Görev "id"leri benzersiz olmalı ve değişmemeli: tamamlandı işaretleri bu id'lere göre cihazda saklanır.

window.DMZ = window.DMZ || {};

DMZ.gorevBilgi = [
  {
    id: 'emirler', baslik: 'DMZ Emirleri nasıl çalışır?', ikon: 'gorev',
    maddeler: [
      'DMZ Emirleri (DMZ Orders) sayfa sayfa açılan görev listeleri. Her sayfada 3 emir var; üçünü de bitirince sayfanın ödülü verilir ve sonraki sayfa açılır.',
      'Seni oyuna alıştırır, hikayeyi anlatır, operatörünü ve üssünü geliştirmeni sağlar. Bazı sayfalar bir bölümün (ör. Human Intel 1/2) parçası; bölümün son emri genelde bir hikaye görevi.',
      'Üste <b>DMZ Emirleri</b> istasyonundan, maç içinde de taktik haritanın sağ tarafından görebilirsin. Aktif emrin ekranın sağında yazar.',
      'Bir emir belirli bir yere gitmeni istiyorsa taktik haritada hedef işareti çıkar, ekibine ping atabilirsin.',
      'Emirlerde sık geçen işler: 3D yazıcıda üretmek (Print), Gunsmith\'te silah düzenlemek, dinamik operasyon (Dynamic Op) ve yan görev (Side Op) bitirmek, eşyayla çıkmak (Extract).',
      '<b>Boss Panosu</b> 2. DMZ emrini bitirince açılır.',
    ],
    ipucu: 'Maça girmeden önce senin ve ekip arkadaşlarının emirlerine bakın. Aynı maçta birlikte bitirebileceğiniz hedefler olabilir.',
  },
  {
    id: 'hikaye', baslik: 'Hikaye Görevleri (Story Missions)', ikon: 'kilavuz',
    metin: 'Hajin\'de bir güç boşluğu var. Emirleri izleyip yeni tehdidin kim olduğunu ortaya çıkarıyor ve operasyonlarını çökertiyorsun.',
    maddeler: [
      'Deploy menüsünden <b>Story Missions</b>\'ı seçince görev listesi gelir. Bitirdiğin görevleri tekrar oynayabilirsin, istersen rastgele görev de seçebilirsin (Random Mission Deploy).',
      'Her görevin brifingi, hedefleri ve ödülü var. Ödül genelde değerli ekipman ve DMZ parası.',
      'Belirli sayıda görev bitirince ek ödüller açılır.',
      'Emirlerde geçen hikaye görevleri: Critical Extraction, Silent Ledger, Shopping Hacks, Grid Assault, Iron Citadel, Fallen Ember.',
      'Haritadaki <a href="/harita/hajin/">Hikaye Görevi Girişi</a> katmanı görevlerin başladığı noktaları gösterir.',
    ],
  },
  {
    id: 'operasyon', baslik: 'Dinamik operasyonlar ve yan görevler', ikon: 'iha',
    maddeler: [
      'Maç içinde başlatılan kısa görevler. Dinamik operasyon (Dynamic Op) bir telefonla başlar, bitince ödül sandığı gelir. Yan görevler (Side Op) kule çalıştırmak, kamyon tamiri, radyo kulesi yağmalamak gibi işler.',
      'Ayrıntılar <a href="/rehber/?b=operasyonlar">Rehber</a> sayfasında.',
    ],
  },
];

DMZ.gorevler = [
  {
    id: 'e01', sayfa: 1, ad: 'First Orders', tr: 'İlk Emirler', kaynak: 'dmzhub',
    odul: 'Medkit · 2-Plate Armor Vest · 20.000 DMZ parası',
    not: 'Yeni oyuncular için öğretici sayfa.',
    gorevler: [
      { id: 'e01-1', ad: 'Gear Up', tr: 'Teçhizatlan',
        adimlar: ['Depondan (Stash) bir silah, bir çanta, bir zırh yeleği ve bir Medkit kuşan.'] },
      { id: 'e01-2', ad: 'Crackshot', tr: 'Keskin Göz',
        adimlar: ['Atış poligonunda 3 hedef devir.'] },
      { id: 'e01-3', ad: 'First Op', tr: 'İlk Operasyon',
        adimlar: ['Dynamic Ops modunda DMZ\'ye gir.'] },
    ],
  },
  {
    id: 'e02', sayfa: 2, ad: 'Human Intel 1/2', tr: 'İnsan İstihbaratı 1/2', kaynak: 'dmzhub',
    odul: 'Flash · Basic Triage Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e02-1', ad: 'Hunter', tr: 'Avcı',
        adimlar: ['Bir Teğmen Kulesi (Hunt Lieutenant Tower) bul ve tepesine tırman.', 'Tepedeki terminali kullanıp en yakın Teğmen\'in yerini bul.'],
        ipucu: 'Haritada "Teğmen Kulesi" katmanını aç.' },
      { id: 'e02-2', ad: 'Triage Protocol', tr: 'Triyaj Protokolü',
        adimlar: ['Bir kliniğe git.', 'Bir bandaj topla.', '30 kimyasal (Chemicals) topla.'],
        ipucu: 'Klinikler haritada "Klinik" katmanında.' },
      { id: 'e02-3', ad: 'No One Left', tr: 'Geride Kimse Kalmasın',
        adimlar: ['Bir yerleşkeyi (Compound) temizle.', 'Temizledikten sonra düşen tıbbi tahliye istihbaratını (Medical Extraction Intel) al.'],
        ipucu: 'Yerleşkeler haritada "Yerleşke" katmanında.' },
    ],
  },
  {
    id: 'e03', sayfa: 3, ad: 'Human Intel 2/2', tr: 'İnsan İstihbaratı 2/2', kaynak: 'dmzhub',
    odul: 'UAV ×3 · 20.000 DMZ parası',
    gorevler: [
      { id: 'e03-1', ad: 'Blindness', tr: 'Körlük',
        adimlar: ['3D yazıcıda 4 flaş bombası (Flash Grenade) üret.', 'Flaşla kör ettiğin 8 düşmanı öldür.'] },
      { id: 'e03-2', ad: 'Payment Due', tr: 'Ödeme Günü',
        adimlar: ['Bir dinamik operasyon telefonu (Dynamic Op Phone) al.', 'Dinamik operasyonları bitirerek toplam 11.500 $ kazan.'] },
      { id: 'e03-3', ad: 'Operation Critical Extraction', tr: 'Hikaye görevi: Critical Extraction',
        adimlar: ['"Operation Critical Extraction" hikaye görevini bitir.'] },
    ],
  },
  {
    id: 'e04', sayfa: 4, ad: 'Operation Rewards · Preparation · Work Quietly', tr: 'Operasyon ödülleri ve hazırlık', kaynak: 'dmzhub',
    odul: 'Medium Backpack · Ammo Box · 20.000 DMZ parası',
    gorevler: [
      { id: 'e04-1', ad: 'Operation Rewards', tr: 'Operasyon Ödülleri', lokasyon: 'cheongun-village',
        adimlar: ['Cheongun Village\'da bir dinamik operasyon telefonu al.', 'Bir dinamik operasyonu bitir.', 'Dinamik operasyon sandığını (Dynamic Op Crate) yağmala.'] },
      { id: 'e04-2', ad: 'Preparation', tr: 'Hazırlık',
        adimlar: ['3D yazıcıda orta boy çanta (Medium Backpack) üret.', '3D yazıcıda 2 plakalı zırh yeleği (2-Plate Armor Vest) üret.'] },
      { id: 'e04-3', ad: 'Work Quietly', tr: 'Sessiz Çalış',
        adimlar: ['Gunsmith\'te bir silaha susturucu tak.', 'Bir fırlatma bıçağı (Throwing Knife) üret.', 'Hiç hasar almadan art arda 8 düşman öldür.'] },
    ],
  },
  {
    id: 'e05', sayfa: 5, ad: 'Counterfeit 1/2', tr: 'Sahte Para 1/2', kaynak: 'dmzhub',
    gorevler: [
      { id: 'e05-1', ad: 'Hostile Force', tr: 'Düşman Gücü',
        adimlar: ['Bir karakol bul ve içine gir.', 'Karakolda 3 kap (Container) ara.', 'Karakoldayken 5 asker öldür.'],
        ipucu: 'Karakollar haritada "Karakol" katmanında.' },
      { id: 'e05-2', ad: 'Robbery', tr: 'Soygun',
        adimlar: ['Bir kasa aç.', 'Toplam 5.000 değerinde çanta ve teçhizatla çık.'] },
      { id: 'e05-3', ad: 'Execute Intel', tr: 'İstihbaratı Uygula', lokasyon: 'deadtown',
        adimlar: ['Deadtown\'da bir İHA kulesini hackle.', 'İHA kulesinin işaretlediği 5 Kuzey Koreli askeri öldür.', 'İşaretli askerlerin düşürdüğü sahte parayı (Counterfeit Cash) al.'] },
    ],
  },
  {
    id: 'e06', sayfa: 6, ad: 'Counterfeit 2/2', tr: 'Sahte Para 2/2', kaynak: 'dmzhub',
    odul: '20.000 DMZ parası',
    gorevler: [
      { id: 'e06-1', ad: 'Suit Breach', tr: 'Kıyafet Delindi',
        adimlar: ['Hazmat kıyafetli 15 düşman öldür (genelde radyasyonlu bölgelerde olurlar).'] },
      { id: 'e06-2', ad: 'Eyes Everywhere', tr: 'Her Yerde Gözler', lokasyon: 'kale-heavenly-luck-casino',
        adimlar: ['Bir keşif dronu (Recon Drone) üret.', 'Heavenly Luck Casino\'da keşif dronuyla 10 düşman işaretle.'] },
      { id: 'e06-3', ad: 'Operation Silent Ledger', tr: 'Hikaye görevi: Silent Ledger',
        adimlar: ['"Operation Silent Ledger" hikaye görevini bitir.'] },
    ],
  },
  {
    id: 'e07', sayfa: 7, ad: 'Recognition · Radiation Station · Healer', tr: 'Radyasyon ve sağlık', kaynak: 'dmzhub',
    odul: 'UAV · Armor Box · 20.000 DMZ parası',
    gorevler: [
      { id: 'e07-1', ad: 'Recognition', tr: 'Adını Duyur',
        adimlar: ['Yüksek tehlike seviyeli bir bölgede susturucusuz silahla 15 düşman öldür.'],
        ipucu: 'Hangi bölgenin tehlike seviyesi yüksek, Lokasyonlar sayfasında yazıyor.' },
      { id: 'e07-2', ad: 'Radiation Station', tr: 'Radyasyon İstasyonu',
        adimlar: ['Bir itfaiye bul.', '3 gaz maskesi ya da radyasyon hapı topla.', 'Radyasyondayken 5 kap ara.'],
        ipucu: 'İtfaiyeler haritada "İtfaiye" katmanında. Radyasyon için Haneul Nuclear Reactor\'a gidebilirsin.' },
      { id: 'e07-3', ad: 'Healer', tr: 'Şifacı',
        adimlar: ['3D yazıcıda Medkit tarifini takibe al (Track).', 'Bir Medkit üret.'] },
    ],
  },
  {
    id: 'e08', sayfa: 8, ad: 'Underground 1/2', tr: 'Yeraltı 1/2', kaynak: 'dmzhub',
    gorevler: [
      { id: 'e08-1', ad: 'Eye in the Sky', tr: 'Gökteki Göz',
        adimlar: ['Bir SAM bataryasını (SAM Site) ele geçir.', 'Kargo taşıyan bir helikopteri SAM ile düşür.', 'Düşen helikopterden bir sandık yağmala.'] },
      { id: 'e08-2', ad: 'Watch for Bumps', tr: 'Tümseklere Dikkat',
        adimlar: ['Düşmandan bir araç çal.', 'Bir benzinlikte aracı tamir et ve yakıtını doldur.', 'Araçla 7 düşmanı ez.'],
        ipucu: 'Benzinlikler haritada "Benzin İstasyonu" katmanında.' },
      { id: 'e08-3', ad: 'Triangulation', tr: 'Üçgenleme', lokasyon: 'songdo-wharf',
        adimlar: ['2 radyo kulesinin tepesine verici (Transmitter) yerleştir.', 'Songdo Wharf\'taki La Grande Vie binasının tepesine verici yerleştir.'] },
    ],
  },
  {
    id: 'e09', sayfa: 9, ad: 'Underground 2/2', tr: 'Yeraltı 2/2', kaynak: 'dmzhub',
    gorevler: [
      { id: 'e09-1', ad: 'Dead Battery', tr: 'Bitik Pil',
        adimlar: ['DDOS saha ekipmanı (Field Upgrade) üret.', 'DDOS ile 3 düşman aracını ya da dronunu etkisiz hale getir.'] },
      { id: 'e09-2', ad: 'Death From Above', tr: 'Yukarıdan Gelen Ölüm',
        adimlar: ['Bir dronu tuzak bombasıyla (Decoy Grenade) kandır.', '3 dron yok et.', 'Yok ettiğin bir drondan dron anakartı (Drone Motherboard) al.'] },
      { id: 'e09-3', ad: 'Operation Shopping Hacks', tr: 'Hikaye görevi: Shopping Hacks',
        adimlar: ['"Operation Shopping Hacks" hikaye görevini bitir.'] },
    ],
  },
  {
    id: 'e10', sayfa: 10, ad: 'Crashed Crate · Surprise Me · Healer', tr: 'Kayıp sandıklar ve malzeme', kaynak: 'dmzhub',
    odul: 'Large Backpack · Basic Triage Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e10-1', ad: 'Crashed Crate', tr: 'Düşmüş Sandık',
        adimlar: ['3 kayıp ikmal sandığı (Lost Supply Drop) bul.', 'Bir radyo kulesi yağma yan görevini (Loot Radio Tower Side Op) bitir.'],
        ipucu: 'Haritadaki "Kayıp İkmal Sandığı" katmanı sandıkların çıkabileceği yerleri gösteriyor.' },
      { id: 'e10-2', ad: 'Surprise Me', tr: 'Şaşırt Beni',
        adimlar: ['5 dinamik operasyon bitir.', 'Rastgele görev seçeneğiyle (Random Mission Deploy) bir hikaye görevi bitir.'] },
      { id: 'e10-3', ad: 'Healer', tr: 'Metal toplama',
        adimlar: ['3 reaktif metal (Reactive Metals) üret ya da çıkar. Genelde garajlarda ve inşaat alanlarında bulunur.', '30 metal (Metals) çıkar.', 'Bir zırh kutusu (Armor Box) üret.'],
        ipucu: 'Bu emrin adı DMZHub\'da 7. sayfadaki "Healer" ile aynı yazıyor, oyunda farklı olabilir.' },
    ],
  },
  {
    id: 'e11', sayfa: 11, ad: 'Information Power · Arms Deal · Friendly Face', tr: 'İstihbarat ve silah', kaynak: 'dmzhub',
    odul: 'Defibrillator · Inflatable Decoy · C4 · 20.000 DMZ parası',
    gorevler: [
      { id: 'e11-1', ad: 'Information Power', tr: 'Bilgi Güçtür',
        adimlar: ['Boss Panosu\'nda (Boss Board) Teğmen istihbaratı satın al.', 'Bir Teğmen öldür.'] },
      { id: 'e11-2', ad: 'Arms Deal', tr: 'Silah Anlaşması',
        adimlar: ['Gunsmith\'ten bir silah satın al.', 'Gunsmith\'te bir silaha 3 ya da daha fazla eklenti tak.'] },
      { id: 'e11-3', ad: 'Friendly Face', tr: 'Dost Yüz',
        adimlar: ['Ping çarkıyla (Ping Wheel) başka bir ekipten ateşkes (Truce) iste.'] },
    ],
  },
  {
    id: 'e12', sayfa: 12, ad: 'The Grid 1/2', tr: 'The Grid 1/2', kaynak: 'dmzhub',
    odul: '3-Plate Armor Vest',
    gorevler: [
      { id: 'e12-1', ad: 'I\'m Over Here', tr: 'Buradayım',
        adimlar: ['Bir dronu şişme tuzakla (Inflatable Decoy) oyala.', '8 savaş dronu (Combat Drone) yok et.', '3 ağır savaş dronu (Heavy Combat Drone) yok et.'] },
      { id: 'e12-2', ad: 'Worth Every Penny', tr: 'Her Kuruşuna Değer',
        adimlar: ['DMZ satıcısından (DMZ Vendor) bir silah satın al.', 'En az Rare (nadir) seviyede bir silahla 50 düşman öldür.'] },
      { id: 'e12-3', ad: 'No Time', tr: 'Zaman Yok',
        adimlar: ['Bir dinamik operasyonu 8 dakikadan kısa sürede bitir.'] },
    ],
  },
  {
    id: 'e13', sayfa: 13, ad: 'The Grid 2/2', tr: 'The Grid 2/2', kaynak: 'dmzhub',
    odul: 'Recon Equipment Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e13-1', ad: 'Opulent', tr: 'Bolluk',
        adimlar: ['Tek bir maçta 6 yan görev (Side Op) bitir.'] },
      { id: 'e13-2', ad: 'Civil Service', tr: 'Kamu Hizmeti', lokasyon: 'nurigo-mall',
        adimlar: ['NuriGO Mall\'a gir.', 'Belediye binasını (City Hall) bul.', 'Belediye binasının 2. katındaki mali defter parçalarını (Financial Ledger Fragments) bul ve onlarla çık.'] },
      { id: 'e13-3', ad: 'Operation Grid Assault', tr: 'Hikaye görevi: Grid Assault',
        adimlar: ['"Operation Grid Assault" hikaye görevini bitir.'] },
    ],
  },
  {
    id: 'e14', sayfa: 14, ad: 'Lethal Tools · Committed · Nothing Is Secure', tr: 'Patlayıcılar ve kasalar', kaynak: 'dmzhub',
    odul: 'Structural Alloy ×2 · Stock Rod ×2 · 20.000 DMZ parası',
    gorevler: [
      { id: 'e14-1', ad: 'Lethal Tools', tr: 'Ölümcül Aletler',
        adimlar: ['6 öldürücü ekipman (Lethal) üret.', 'Öldürücü ekipmanla 13 düşman askeri öldür.'] },
      { id: 'e14-2', ad: 'Committed', tr: 'Kararlı',
        adimlar: ['Radyasyon yayılmaya başladıktan sonra çık (Exfil).'],
        ipucu: 'Fırtına kapanırken haritadaki "Son Çıkış" noktalarına yönel.' },
      { id: 'e14-3', ad: 'Nothing Is Secure', tr: 'Hiçbir Şey Güvende Değil',
        adimlar: ['4 kasa aç.', 'Toplam 20.000 değerinde çanta ve teçhizatla çık.'] },
    ],
  },
  {
    id: 'e15', sayfa: 15, ad: '', tr: 'Sayfa 15', kaynak: 'dmzhub',
    not: 'DMZHub\'da bu sayfa 13. sayfanın (The Grid 2/2) aynısı girilmiş, gerçek emirleri henüz belli değil. Oyunda görürsen ekran görüntüsünü at, ekleyelim.',
    gorevler: [],
  },
  {
    id: 'e16', sayfa: 16, ad: 'Hornet\'s Nest 1/2', tr: 'Eşek Arısı Yuvası 1/2', kaynak: 'dmzhub',
    gorevler: [
      { id: 'e16-1', ad: 'Goliath', tr: 'Golyat',
        adimlar: ['Colossus\'u termit ya da matkap şarjıyla (Thermite / Drill Charge) vur.', 'Colossus\'u şok çubuğuyla (Shock Stick) vur.'],
        ipucu: 'Colossus\'un çıkabileceği yerler haritada "Boss Alanı" katmanında.' },
      { id: 'e16-2', ad: 'Click, Boom', tr: 'Tık, Bum',
        adimlar: ['5 C4 üret.', 'C4 ile 12 zırhlı düşman öldür.', 'Tek bir C4 patlamasıyla 5 düşman öldür.'] },
      { id: 'e16-3', ad: 'Navigate with Care', tr: 'Dikkatli Sür',
        adimlar: ['Girişte parasını ödeyip Polaris Dagor A1 ile gir (Infil).', 'Bir Kuzey Kore konvoyunu temizle.', 'Konvoydan çıkan kimyasal bileşenleri (Chemical Components) al ve onlarla çık.'],
        ipucu: 'Polaris girişi 5.000 DMZ parası (Rehber → Maça giriş).' },
    ],
  },
  {
    id: 'e17', sayfa: 17, ad: 'Hornet\'s Nest 2/2', tr: 'Eşek Arısı Yuvası 2/2', kaynak: 'dmzhub',
    odul: '20.000 DMZ parası',
    gorevler: [
      { id: 'e17-1', ad: 'Jail Break', tr: 'Firar', lokasyon: '14th-political-prison',
        adimlar: ['14th Political Prison\'da 15 düşman öldür.', 'Bir takviye helikopterini düşür.', 'The Citadel\'de 10 düşman öldür.'] },
      { id: 'e17-2', ad: 'Keep Out', tr: 'Girmek Yasak',
        adimlar: ['3 Teğmen öldür.', 'Bir Teğmen anahtarı (Lieutenant Key) al.', 'Bir Teğmen odasına girip Teğmen\'in silahını al.'] },
      { id: 'e17-3', ad: 'Operation Iron Citadel', tr: 'Hikaye görevi: Iron Citadel',
        adimlar: ['"Operation Iron Citadel" hikaye görevini bitir.'] },
    ],
  },
  {
    id: 'e18', sayfa: 18, ad: 'How Bulletproof? · Abandoned · Locksmith', tr: 'Zırhlılar, K9\'lar ve anahtarlar', kaynak: 'dmzhub',
    odul: 'Nitro Compounds ×2 · Sere Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e18-1', ad: 'How Bulletproof?', tr: 'Ne Kadar Kurşun Geçirmez?',
        adimlar: ['30 düşman askeri öldür.', '15 zırhlı asker öldür.', '5 Teğmen öldür.'] },
      { id: 'e18-2', ad: 'Abandoned', tr: 'Terk Edilmiş', lokasyon: 'nurigo-mall',
        adimlar: ['NuriGO Mall\'daki yeraltına (Underground) gir.', '10 K9 (robot köpek) öldür.', '3 sağlam K9 batarya çekirdeğiyle (Pristine K9 Battery Core) çık.'] },
      { id: 'e18-3', ad: 'Locksmith', tr: 'Çilingir',
        adimlar: ['5 anahtar topla. Genelde ceketlerde ve ev eşyası kaplarında çıkar.', '3 kilitli yer aç.'] },
    ],
  },
  {
    id: 'e19', sayfa: 19, ad: 'Avionics · Philanthropist · Multi-Talented', tr: 'Aviyonik ve SAM bataryaları', kaynak: 'dmzhub',
    odul: 'Binding Catalyst ×2 · Explosives Equipment Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e19-1', ad: 'Avionics', tr: 'Aviyonik',
        adimlar: ['5 elektronik sensör (Electronic Sensors) üret ya da çıkar.', '1 yapısal alaşım (Structural Alloy) çıkar.', 'Bir UAV üret.'] },
      { id: 'e19-2', ad: 'Philanthropist', tr: 'Hayırsever',
        adimlar: ['Haftalık rastgele görevi (Weekly Random Mission Deploy) bitir.'] },
      { id: 'e19-3', ad: 'Multi-Talented', tr: 'Çok Yönlü',
        adimlar: ['6 SAM bataryası ele geçir.', '12 ikmal paketi (Supply Drop) aç.', '4 yerleşke temizle.'] },
    ],
  },
  {
    id: 'e20', sayfa: 20, ad: 'Ears Everywhere · The Vault · Massive Damage', tr: 'Yayın, banka kasası ve tank', kaynak: 'dmzhub',
    odul: '3-Plate Armor Vest · Bomb Glider · 20.000 DMZ parası',
    gorevler: [
      { id: 'e20-1', ad: 'Ears Everywhere', tr: 'Her Yerde Kulaklar', lokasyon: 'cheonwang-peak-array',
        adimlar: ['Cheonwang Peak Array\'e gir.', 'DBN TV binasının 2. katındaki iletişim yayın sistemini hackle.', 'Hacklediğin sistemden şifreli ses kayıtlarını (Encrypted Voice Logs) al.'] },
      { id: 'e20-2', ad: 'The Vault', tr: 'Banka Kasası',
        adimlar: ['Cheongun Village ya da Wolves Stadium\'daki bir Hanex Bank şubesine gir.', 'Erişim kontrol sistemlerinin elektriğini yeniden aç.', 'Kasa dairesine girmenin yolunu bul.'] },
      { id: 'e20-3', ad: 'Massive Damage', tr: 'Ağır Hasar',
        adimlar: ['Tankın reaktif zırhını DDOS ile devre dışı bırak.', 'Tanka roketle ateş et.', 'Tankı yok et.'] },
    ],
  },
  {
    id: 'e21', sayfa: 21, ad: 'Hard Carry · Stalking the Stalker · Fallen Ember', tr: 'Büyük çanta ve Deathstalker', kaynak: 'dmzhub',
    odul: 'Basic Triage Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e21-1', ad: 'Hard Carry', tr: 'Ağır Yük',
        adimlar: ['2 naylon laminat (Nylon Laminate) üret ya da çıkar.', '5 yapısal alaşım (Structural Alloy) çıkar.', 'Büyük çanta (Large Backpack) üret.'] },
      { id: 'e21-2', ad: 'Stalking the Stalker', tr: 'Avcıyı Avla',
        adimlar: ['SAM bataryasıyla 3 Deathstalker düşür.', 'Roketatarla bir Deathstalker düşür.', 'Bir Deathstalker\'ı DDOS\'la.'] },
      { id: 'e21-3', ad: 'Operation Fallen Ember', tr: 'Hikaye görevi: Fallen Ember',
        adimlar: ['"Operation Fallen Ember" hikaye görevini bitir.'] },
    ],
  },
  {
    id: 'e22', sayfa: 22, ad: 'DRC · Unstoppable · Astronaut', tr: 'DRC dolabı ve komutanlar', kaynak: 'dmzhub',
    odul: 'High-Tenacity Fibers ×2 · Explosives Equipment Kit · 20.000 DMZ parası',
    gorevler: [
      { id: 'e22-1', ad: 'DRC', tr: 'DRC', lokasyon: 'chang-san-air-base',
        adimlar: ['Chang-san Air Base cephaneliğindeki, Haneul Nuclear Reactor\'daki ya da NuriGO Mall laboratuvarlarındaki DRC silah dolabını (DRC Weapon Locker) yağmala.'] },
      { id: 'e22-2', ad: 'Unstoppable', tr: 'Durdurulamaz',
        adimlar: ['10 Komutan (Commander) öldür.', '15 Teğmen öldür.', '5 Teğmen künyesiyle (Lieutenant Dog Tags) çık.'] },
      { id: 'e22-3', ad: 'Astronaut', tr: 'Astronot',
        adimlar: ['Radyasyon hasarı almadan radyasyonlu alanda 21 kap ara.', 'Beyaz son çıkış helikopteriyle (Final Exfil) 3 kez çık.'] },
    ],
  },
  {
    id: 'e23', sayfa: 23, ad: 'Rule of Three · Temp Job · No Time', tr: 'Yelek ve yan görevler', kaynak: 'dmzhub',
    gorevler: [
      { id: 'e23-1', ad: 'Rule of Three', tr: 'Üçün Kuralı',
        adimlar: ['2 balistik kumaş (Ballistic Fabric) üret ya da çıkar.', '5 naylon kumaş (Nylon Cloth) çıkar.', '3 plakalı yelek (3-Plate Carrier) üret.'] },
      { id: 'e23-2', ad: 'Temp Job', tr: 'Geçici İş',
        adimlar: ['40 yan görev bitir.'] },
      { id: 'e23-3', ad: 'No Time', tr: 'Zaman Yok',
        adimlar: ['Tek bir maçta 4 dinamik operasyon bitir.'] },
    ],
  },
  {
    id: 'e24', sayfa: 24, ad: 'High Quality Loot · You Won\'t See Me · Upper Class', tr: 'Kaliteli ganimet ve keskin nişancı', kaynak: 'dmzhub',
    gorevler: [
      { id: 'e24-1', ad: 'High Quality Loot', tr: 'Kaliteli Ganimet',
        adimlar: ['2 silah kılavuzuyla (Weapon Manual) çık.', '4 tarifle (Recipe) çık.', 'Bir Ultra silahla çık.'] },
      { id: 'e24-2', ad: 'You Won\'t See Me', tr: 'Beni Göremezsin',
        adimlar: ['Gunsmith\'te 5 ya da daha fazla eklentili bir keskin nişancı tüfeği yap.', 'Bu tüfekle 100 düşman öldür.'] },
      { id: 'e24-3', ad: 'Upper Class', tr: 'Üst Sınıf',
        adimlar: ['Dinamik operasyonlardan ya da hikaye görevlerinden toplam 250.000 $ kazan.'] },
    ],
  },
];
