// 3D yazıcı malzemelerinin (Ingredients) Hajin'de nerede çıktığı ve hangi tariflerde kullanıldığı.
//
// KAYNAK: Oyunun kendi ipucu. Üsteki 3D yazıcıda bir tarif seç, "Ingredient Locations"a bas: her malzemenin
// en çok nerede çıktığını söyler. Rehber siteleri bu ipuçlarını topladı (CODCentral, GameRant, DMZMap,
// DMZ Codex; Ekim 2026) ve dördü de aynı yerleri yazıyor. Burada bizim cümlelerimizle Türkçesi var.
// Kullanıldığı tarifler GameRant'ın listesinden (28 Ekim 2026).
// İpucu kesin doğma noktası değil, arama alanıdır: oradaki kutulara, çantalara, dolaplara bakmak lazım.
//
// Haritadaki "Yazıcı Malzemesi" alanları veri/noktalar.js içinde; her alanın "malzemeler" listesi
// buradaki adlarla (eşya kimlikleriyle) eşleşir. Rehber'deki malzeme tablosu da bu listeden çizilir.
//
//   ad, tr     oyundaki İngilizce adı ve Türkçesi
//   nadirlik   veri/esyalar.js'teki nadirlik adları
//   nerede     oyunun ipucu
//   uretim     yazıcıda üretilebiliyorsa tarifi ve gereken yazıcı yükseltmesi
//   bulunan    oyuncuların bulduğunu yazdığı yerler (tek tük, garanti değil)
//   kullanim   bu malzemenin girdiği tarifler ve yükseltmeler (oyundaki İngilizce adlarıyla)
//
// Bir malzemenin yerini oyunda farklı görürsen "nerede" satırını düzelt.

window.DMZ = window.DMZ || {};

DMZ.malzemeBilgisi = {
  // --- Sıra dışı: belli bir yerde değil, belli kutu türlerinde çıkar ---
  'biomaterials': {
    ad: 'Biomaterials', tr: 'Biyomalzemeler', nadirlik: 'siradisi',
    nerede: 'Hastaneler, klinikler ve kimyasal dolapları (Chemical Locker).',
    uretim: '20 Sentetik + 20 Kimyasal (Ingredient Printing yükseltmesiyle)',
    kullanim: ['3-Plate Ballistic Gel Vest', 'Dog Cast Upgrade I', 'Durable Gas Mask', 'Medkit', 'Radiation Blockers', 'Self-Revive Kit', 'Uncommon Ingredient Printing'],
  },
  'control-unit': {
    ad: 'Control Unit', tr: 'Kontrol ünitesi', nadirlik: 'siradisi',
    nerede: 'Bilgisayarlar ve teknoloji çantaları (Tech Bag).',
    uretim: '20 Elektronik + 20 Metal (Ingredient Printing yükseltmesiyle)',
    kullanim: ['Bomb Glider', 'Bombing Run', 'Care Package', 'Combat Drone', 'Defibrillator', 'Fulton Drop Marker', 'MIA Recovery Discount I', 'Night Vision Goggles', 'Railgun Sentry', 'Trophy System', 'Weak Night Vision Goggles'],
  },
  'detonators': {
    ad: 'Detonators', tr: 'Fünyeler', nadirlik: 'siradisi',
    nerede: 'Askeri ve sanayi bölgeleri.',
    uretim: '20 Elektronik + 20 Kimyasal (Ingredient Printing yükseltmesiyle)',
    kullanim: ['Artillery Beacon', 'DDOS', 'Impact Warhead', 'Revive Pistol', 'SAM Airburst Turret', 'Smelling Salts', 'Stash Item Upgrade II'],
  },
  'electronic-sensors': {
    ad: 'Electronic Sensors', tr: 'Elektronik sensörler', nadirlik: 'siradisi',
    nerede: 'Teknoloji çantaları (Tech Bag, IT Bag) ve ticari bölgeler: dükkânlar, ofisler.',
    uretim: '20 Sentetik + 20 Elektronik (Ingredient Printing yükseltmesiyle)',
    bulunan: 'Cheongun Village ve Hajin River Heights; Chang-san Hava Üssü sığınağındaki IT çantaları.',
    kullanim: ['Advanced UAV', 'Crossfire', 'Elite Night Vision Goggles', 'Recon Drone', 'Spotter Scope', 'Stash Item Upgrade I', 'UAV', 'Vendor Item Upgrade I'],
  },
  'reactive-metals': {
    ad: 'Reactive Metals', tr: 'Reaktif metaller', nadirlik: 'siradisi',
    nerede: 'Sanayi bölgeleri ve alet kutuları (Toolbox).',
    uretim: '20 Kimyasal + 20 Metal (Ingredient Printing yükseltmesiyle)',
    kullanim: ['2-Plate Armor Vest', '2-Plate Ballistic Gel Vest', '2-Plate Helmet Armor Vest', '3-Plate Armor Vest', '3-Plate Helmet Armor Vest', 'Armor Box', 'Gunsmith Upgrade I', 'Medium Secure Backpack', 'Secure Scavenger Backpack', 'Stash Weapon Upgrade I'],
  },
  'rigid-synthetics': {
    ad: 'Rigid Synthetics', tr: 'Sert sentetikler', nadirlik: 'siradisi',
    nerede: 'Yerleşim bölgeleri (evler) ve sivil spor çantaları (Duffel Bag).',
    uretim: '20 Sentetik + 20 Metal (Ingredient Printing yükseltmesiyle)',
    kullanim: ['2-Plate Armor Vest', '2-Plate Ballistic Gel Vest', '2-Plate Helmet Armor Vest', '3-Plate Armor Vest', '3-Plate Helmet Armor Vest', 'Armor Box', 'Gunsmith Upgrade I', 'Medium Secure Backpack', 'Secure Scavenger Backpack', 'Stash Weapon Upgrade I'],
  },

  // --- Nadir: oyunun gösterdiği belli yerler ---
  'binding-catalyst': {
    ad: 'Binding Catalyst', tr: 'Bağlayıcı katalizör', nadirlik: 'nadir',
    nerede: 'Mirae Genel Hastanesi ve bahçesindeki tıbbi (triyaj) çadırları.',
    kullanim: ['2-Plate Ballistic Gel Vest', 'Epic Ingredient Printing', 'Medkit', 'MIA Recovery Discount II', 'Revive Pistol', 'Self-Revive Kit', 'Stabilized Reagents'],
  },
  'cpu': {
    ad: 'CPU', tr: 'İşlemci', nadirlik: 'nadir',
    nerede: 'Sunucu odaları: Netshin Teknoloji Kompleksi (The Grid) ve Cheonwang Zirvesi Anten Dizisi. Bir de Deadtown\'ın yamaçtaki binaları. Bilgisayarlardan da çıkar.',
    kullanim: ['Combat Drone', 'Comms Module', 'Elite Night Vision Goggles', 'Gunsmith Upgrade I', 'Vendor Item Upgrade I'],
  },
  'high-tenacity-fibers': {
    ad: 'High-Tenacity Fibers', tr: 'Yüksek dayanımlı lifler', nadirlik: 'nadir',
    nerede: 'Chang-san Hava Üssü\'nün cephaneliği ve koğuşları; Songdo İskelesi\'ndeki La Grande Vie otelinin çatısı.',
    kullanim: ['Ballistic Fabric', 'Durable Gas Mask', 'Large Scavenger Backpack', 'Medium Weapon Backpack', 'Uncommon Ingredient Printing'],
  },
  'nitro-compounds': {
    ad: 'Nitro Compounds', tr: 'Nitro bileşikler', nadirlik: 'nadir',
    nerede: 'NuriGO AVM\'deki DRC laboratuvarı, Citadel hapishane avlusundaki kimya binaları ve Imjin Tarlaları\'ndaki depo çadırları.',
    kullanim: ['Advanced UAV', 'Artillery Beacon', 'Bombing Run', 'Impact Warhead', 'MIA Recovery Discount II', 'Railgun Sentry', 'Volatile Explosives'],
  },
  'nylon-cloth': {
    ad: 'Nylon Cloth', tr: 'Naylon kumaş', nadirlik: 'nadir',
    nerede: 'Citadel ana binasının kanatları, Deadtown\'ın yeraltındaki tutukevi (Yeniden Eğitim Merkezi\'nin altı) ve Heavenly Luck Casino\'daki Mujin gece kulübü.',
    kullanim: ['3-Plate Armor Vest', 'Medium Scavenger Backpack', 'Medium Secure Backpack', 'Nylon Laminate', 'Parachute', 'Stash Item Upgrade II'],
  },
  'printed-circuit-board': {
    ad: 'Printed Circuit Board', tr: 'Baskılı devre kartı', nadirlik: 'nadir',
    nerede: 'Haneul Nükleer Reaktörü ve elektrik trafo binaları (trafoların haritada belli bir yeri yok).',
    kullanim: ['Epic Ingredient Printing', 'Night Vision Goggles', 'Power Regulator', 'Vendor Item Upgrade I'],
  },
  'stock-rod': {
    ad: 'Stock Rod', tr: 'Ham metal çubuk', nadirlik: 'nadir',
    nerede: 'Imjin Tarlaları\'ndaki pirinç değirmeni (Rice Mill), Hajin şehrindeki inşaat alanı (Construction Zone) ve Namjjog İstasyonu (yeri henüz bilinmiyor).',
    bulunan: 'Pirinç değirmenindeki alet sandığı ve alet kutusu; Compound Alpha\'daki alet kutusu.',
    kullanim: ['Bomb Glider', 'Door Breacher Charge', 'Stash Weapon Upgrade I', 'Turned Components'],
  },
  'structural-alloy': {
    ad: 'Structural Alloy', tr: 'Yapısal alaşım', nadirlik: 'nadir',
    nerede: 'Chang-san Hava Üssü: hangar, tamir atölyeleri ve Bubun Yard (üssün içinde ama tam yeri henüz bilinmiyor).',
    kullanim: ['2-Plate Helmet Armor Vest', 'Alloyed Plating', 'Large Backpack', 'Small Secure Backpack', 'UAV'],
  },

  // --- Epik: nadir olanla aynı yerlerde çıkar, yazıcıda ondan da üretilir ---
  'alloyed-plating': {
    ad: 'Alloyed Plating', tr: 'Alaşımlı kaplama', nadirlik: 'epik',
    nerede: 'Chang-san Hava Üssü: hangar, tamir atölyeleri ve Bubun Yard (üssün içinde ama tam yeri henüz bilinmiyor).',
    uretim: '100 Metal + 3 Structural Alloy (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['3-Plate Helmet Armor Vest', 'Large Secure Backpack', 'Medium Secure Backpack', 'Stash Item Upgrade IV'],
  },
  'ballistic-fabric': {
    ad: 'Ballistic Fabric', tr: 'Balistik kumaş', nadirlik: 'epik',
    nerede: 'Chang-san Hava Üssü\'nün cephaneliği ve koğuşları; Songdo İskelesi\'ndeki La Grande Vie otelinin çatısı.',
    uretim: '100 Sentetik + 3 High-Tenacity Fibers (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['3-Plate Armor Vest', 'Tempered Armor Vest'],
  },
  'comms-module': {
    ad: 'Comms Module', tr: 'İletişim modülü', nadirlik: 'epik',
    nerede: 'Sunucu odaları: Netshin Teknoloji Kompleksi (The Grid) ve Cheonwang Zirvesi Anten Dizisi. Bir de Deadtown\'ın yamaçtaki binaları.',
    uretim: '100 Elektronik + 3 CPU (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['Advanced UAV', 'Fulton Drop Marker', 'MIA Recovery Discount III', 'Stash Weapon Upgrade I', 'Uncommon Ingredient Printing'],
  },
  'nylon-laminate': {
    ad: 'Nylon Laminate', tr: 'Naylon laminat', nadirlik: 'epik',
    nerede: 'Citadel ana binasının kanatları, Deadtown\'ın yeraltındaki tutukevi (Yeniden Eğitim Merkezi\'nin altı) ve Heavenly Luck Casino\'daki Mujin gece kulübü.',
    uretim: '100 Sentetik + 3 Nylon Cloth (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['Large Backpack', 'Large Scavenger Backpack', 'Secure Scavenger Backpack'],
  },
  'power-regulator': {
    ad: 'Power Regulator', tr: 'Güç regülatörü', nadirlik: 'epik',
    nerede: 'Haneul Nükleer Reaktörü ve elektrik trafo binaları (trafoların haritada belli bir yeri yok).',
    uretim: '100 Elektronik + 3 Printed Circuit Board (Epic Ingredient Printing yükseltmesiyle)',
    bulunan: 'Reaktör 02\'deki kimyasal depolama kutusu; Cheonwang Zirvesi\'nde bir sunucu kartı (Server Blade).',
    kullanim: ['Elite Night Vision Goggles', 'Gunsmith Upgrade I', 'MIA Recovery Discount III', 'Railgun Sentry', 'Revive Pistol', 'Stash Item Upgrade II'],
  },
  'stabilized-reagents': {
    ad: 'Stabilized Reagents', tr: 'Stabilize reaktifler', nadirlik: 'epik',
    nerede: 'Mirae Genel Hastanesi ve bahçesindeki tıbbi (triyaj) çadırları.',
    uretim: '100 Kimyasal + 3 Binding Catalyst (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['3-Plate Ballistic Gel Vest', 'Self-Revive Kit', 'Stash Weapon Upgrade III'],
  },
  'turned-components': {
    ad: 'Turned Components', tr: 'Tornalanmış parçalar', nadirlik: 'epik',
    nerede: 'Imjin Tarlaları\'ndaki pirinç değirmeni (Rice Mill), Hajin şehrindeki inşaat alanı (Construction Zone) ve Namjjog İstasyonu (yeri henüz bilinmiyor).',
    uretim: '100 Metal + 3 Stock Rod (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['Impact Warhead', 'Parachute', 'Stash Item Upgrade IV'],
  },
  'volatile-explosives': {
    ad: 'Volatile Explosives', tr: 'Uçucu patlayıcılar', nadirlik: 'epik',
    nerede: 'NuriGO AVM\'deki DRC laboratuvarı, Citadel hapishane avlusundaki kimya binaları ve Imjin Tarlaları\'ndaki depo çadırları.',
    uretim: '100 Kimyasal + 3 Nitro Compounds (Epic Ingredient Printing yükseltmesiyle)',
    kullanim: ['Artillery Beacon', 'Crossfire', 'Door Breacher Charge', 'Stash Weapon Upgrade III'],
  },

  // --- Efsanevi: çoğu haritada bulunmaz, komutanlardan düşer ---
  'experimental-compounds': {
    ad: 'Experimental Compounds', tr: 'Deneysel bileşikler', nadirlik: 'efsanevi',
    nerede: 'Komutanlardan (Colossus, Deathstalker, tank) ara sıra düşer.',
    kullanim: ['3-Plate Ballistic Gel Vest', 'Door Breacher Charge'],
  },
  'military-composites': {
    ad: 'Military Composites', tr: 'Askeri kompozitler', nadirlik: 'efsanevi',
    nerede: 'Sadece Colossus\'tan düşer. Doğduğu alanlar haritada "Boss Alanı" katmanında.',
    kullanim: ['Epic Ingredient Printing', 'Secure Scavenger Backpack', 'Tempered Armor Vest'],
  },
  'nano-structured-alloy': {
    ad: 'Nano-Structured Alloy', tr: 'Nano yapılı alaşım', nadirlik: 'efsanevi',
    nerede: 'Sadece tanktan düşer (Kuzey Kore ana muharebe tankı).',
    kullanim: ['3-Plate Helmet Armor Vest'],
  },
  'prototype-rf-module': {
    ad: 'Prototype RF Module', tr: 'Prototip RF modülü', nadirlik: 'efsanevi',
    nerede: 'Sadece Deathstalker\'dan düşer. Deathstalker\'ı SAM bataryasıyla düşürebilirsin.',
    kullanim: ['Crossfire', 'Fulton Drop Marker', 'Large Secure Backpack', 'Vendor Item Upgrade I'],
  },
  'sanctioned-assassination-list': {
    ad: 'Sanctioned Assassination List', tr: 'Onaylı suikast listesi', nadirlik: 'efsanevi',
    nerede: 'Askeri bölgeler.',
    kullanim: ['MIA Recovery Discount IV'],
  },

  // --- Ultra: üs yükseltmelerinde kullanılan değerli eşyalar ---
  'gold-bar': {
    ad: 'Gold Bar', tr: 'Külçe altın', nadirlik: 'ultra',
    nerede: 'Hajin\'deki kasalarda, nadiren. Kasalar haritada "Kasa" katmanında.',
    kullanim: ['Stash Weapon Upgrade III'],
  },
  'gold-skull': {
    ad: 'Gold Skull', tr: 'Altın kafatası', nadirlik: 'ultra',
    nerede: 'Hajin\'deki kasalarda, nadiren. Kasalar haritada "Kasa" katmanında.',
    kullanim: ['Stash Item Upgrade IV'],
  },
};
