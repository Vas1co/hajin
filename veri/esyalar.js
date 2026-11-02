// Eşyalar. Yeni eşya eklemek için listeye bir satır kopyala ve doldur.
//
// Alanlar:
//   id (benzersiz), ad (oyundaki İngilizce adı), tr (Türkçe adı)
//   kategori  aşağıdaki DMZ.esyaKategorileri anahtarlarından biri
//   nadirlik  'yaygin', 'siradisi', 'nadir', 'epik', 'efsanevi' veya 'ultra' (bilinmiyorsa yazma)
//   deger     satış değeri (sayı, bilinmiyorsa yazma)
//   nerede    nerede bulunduğu (Türkçe)
//   not       ne işe yaradığı / ek bilgi
//   lokasyon  veri/lokasyonlar.js içindeki id (isteğe bağlı, "Haritada göster" düğmesi çıkar)
//
// Buradaki bilgiler Activision'ın resmi DMZ yazılarından (Ekim 2026) kendi cümlelerimizle yazıldı.
// Nadirlik ve fiyatlar resmi kaynakta yok; oyunda gördükçe ekleyin.

window.DMZ = window.DMZ || {};

DMZ.esyaKategorileri = {
  zirh:     { ad: 'Zırh',                   en: 'Armor',            ikon: 'zirh' },
  canta:    { ad: 'Çantalar',               en: 'Backpacks',        ikon: 'canta' },
  saglik:   { ad: 'Sağlık ve tüketim',      en: 'Consumables',      ikon: 'saglik' },
  ekipman:  { ad: 'Hayatta kalma ekipmanı', en: 'Survival Gear',    ikon: 'radyasyon' },
  saha:     { ad: 'Saha ekipmanı',          en: 'Field Upgrades',   ikon: 'ammo' },
  taktik:   { ad: 'Taktik ekipman',         en: 'Tacticals',        ikon: 'taktik' },
  oldurucu: { ad: 'Öldürücü ekipman',       en: 'Lethals',          ikon: 'oldurucu' },
  destek:   { ad: 'Ateş desteği',           en: 'Fire Support',     ikon: 'destek' },
  cikis:    { ad: 'Çıkış araçları',         en: 'Exfil Items',      ikon: 'cikis' },
  anahtar:  { ad: 'Anahtarlar',             en: 'Keys',             ikon: 'anahtar' },
  kunye:    { ad: 'Künyeler',               en: 'Dog Tags',         ikon: 'kunye' },
  kilavuz:  { ad: 'Silah kılavuzları',      en: 'Weapon Manuals',   ikon: 'kilavuz' },
  malzeme:  { ad: 'Üretim malzemesi',       en: 'Crafting',         ikon: 'malzeme' },
  kit:      { ad: 'Hayatta kalma kitleri',  en: 'Survival Kits',    ikon: 'esya' },
  degerli:  { ad: 'Değerli eşyalar',        en: 'Valuables',        ikon: 'degerli' },
  tamir:    { ad: 'Tamir parçaları',        en: 'Repair Items',     ikon: 'tamir' },
  para:     { ad: 'Para',                   en: 'Cash',             ikon: 'para' },
};

DMZ.nadirlikler = {
  // renk: haritada nadirliği olan işaretlerin (anahtar odaları) rengi; css'teki nadirlik renklerinin biraz
  // koyusu, üstündeki beyaz ikon okunsun diye
  yaygin:   { ad: 'Yaygın',     en: 'Common',    renk: '#8a9188' },
  siradisi: { ad: 'Sıra dışı',  en: 'Uncommon',  renk: '#4ea64a' },
  nadir:    { ad: 'Nadir',      en: 'Rare',      renk: '#3b82d6' },
  epik:     { ad: 'Epik',       en: 'Epic',      renk: '#9b5fd6' },
  efsanevi: { ad: 'Efsanevi',   en: 'Legendary', renk: '#e8892a' },
  ultra:    { ad: 'Ultra',      en: 'Ultra',     renk: '#ef3b5d' },
};

DMZ.esyalar = [
  // --- Zırh ---
  { id: 'plate-carrier', ad: 'Plate Carrier', tr: 'Zırh yeleği', kategori: 'zirh',
    not: 'Zırh plakalarını taşır. Kaç plaka aldığı modele göre değişir, ör. 2 plakalı yelek (2-Plate Carrier). Maça girerken teçhizatında olması önerilir.',
    nerede: 'Ganimet, hayatta kalma kitleri. Tarifi açılınca 3D yazıcıda da üretilebilir.' },
  { id: 'armor-plate', ad: 'Armor Plate', tr: 'Zırh plakası', kategori: 'zirh',
    not: 'Yeleğe takılır, hasarı emer. Girişte zırh yuvan otomatik dolar. Fazlasını çanta menüsünden yeleğe takabilirsin.',
    nerede: 'Mühimmat ve Zırh Sandıkları (Ammo Armor Cache), ganimet.' },

  // --- Çantalar ---
  { id: 'basic-pack', ad: 'Basic Pack', tr: 'Temel çanta', kategori: 'canta',
    not: 'Çantasız girersen bununla başlarsın: 8 yuva. Kaynaklar (kimyasal, elektronik vb.) her çantada ayrı bir cepte durur.' },
  { id: 'backpack', ad: 'Backpack', tr: 'Sırt çantası', kategori: 'canta',
    not: 'Daha fazla ve farklı türde yuva verir. Örnek: Medium Backpack (orta boy çanta).',
    nerede: 'Ganimet, hayatta kalma kitleri.' },

  // --- Sağlık ---
  { id: 'medkit', ad: 'Medkit', tr: 'Sağlık kiti', kategori: 'saglik',
    not: 'Yaraları onarır. Resmi rehber maça girerken yanına almanı öneriyor.' },
  { id: 'bandage', ad: 'Bandage', tr: 'Bandaj', kategori: 'saglik',
    not: 'Sağlığını geçici olarak yeniler. Çanta menüsünden kullanılır.' },
  { id: 'self-revive', ad: 'Self-Revive Kit', tr: 'Kendini diriltme kiti', kategori: 'saglik',
    not: 'Yere düştüğünde kendini kaldırmanı sağlar. Teçhizatında kendine ait bir yuvası var.' },

  // --- Hayatta kalma ekipmanı ---
  { id: 'radiation-gear', ad: 'Radiation Gear', tr: 'Radyasyon kıyafeti', kategori: 'ekipman',
    not: 'Haneul Nükleer Reaktörü\'ne gaz maskesiyle birlikte giyilmeden girilmez, yoksa radyasyon öldürür.',
    nerede: 'İtfaiyeler (Fire Station).', lokasyon: 'haneul-nuclear-reactor' },
  { id: 'gas-mask', ad: 'Gas Mask', tr: 'Gaz maskesi', kategori: 'ekipman',
    not: 'Kafa yuvasına takılır. Radyasyonlu bölgelerde radyasyon kıyafetiyle birlikte şart.' },
  { id: 'nvg', ad: 'NVG', tr: 'Gece görüş gözlüğü', kategori: 'ekipman',
    not: 'Kafa yuvasına takılır. Elektriği olmayan karanlık iç mekânlar için: Heavenly Luck Kumarhanesi, NuriGO yeraltı AVM\'si.',
    lokasyon: 'kale-heavenly-luck-casino' },
  { id: 'parachute', ad: 'Parachute', tr: 'Paraşüt', kategori: 'ekipman',
    not: 'Teçhizatında kendine ait bir yuvası var.',
    nerede: 'İtfaiyeler (Fire Station).' },
  { id: 'gas-can', ad: 'Gas Can', tr: 'Benzin bidonu', kategori: 'ekipman',
    not: 'Araçlara yakıt taşımak için.',
    nerede: 'Benzin istasyonlarında ve tekne benzinliklerinde doldurulur.' },

  // --- Saha ekipmanı ---
  { id: 'armor-box', ad: 'Armor Box', tr: 'Zırh kutusu', kategori: 'saha',
    not: 'Saha ekipmanı (Field Upgrade). Maça fazladan zırh plakası getirmenin yollarından biri.' },
  { id: 'ammo-box', ad: 'Ammo Box', tr: 'Mermi kutusu', kategori: 'saha',
    not: 'Saha ekipmanı. İkisini de taşıyorsan çanta menüsünden zırh kutusuyla yer değiştirebilirsin.' },

  // --- Çıkış araçları ---
  { id: 'fulton', ad: 'Fulton', tr: 'Fulton balonu', kategori: 'cikis',
    not: 'Helikopter beklemeden çıkış yapmanın alternatif yolu.' },
  { id: 'exfil-flare', ad: 'Flare', tr: 'İşaret fişeği', kategori: 'cikis',
    not: 'Alternatif çıkış yöntemi. Çok gürültülü ve çok uzaktan görünür, çatışmaya hazır ol.' },

  // --- Anahtarlar ---
  { id: 'keys', ad: 'Keys', tr: 'Anahtarlar', kategori: 'anahtar',
    not: 'Özel ganimet odalarını açar. Açıklamasında açtığı yerin ızgara kodu yazar (ör. D7). Teğmenler kendi kilitli odalarının anahtarını düşürebilir.',
    nerede: 'Ganimet, teğmenler.' },

  // --- Künyeler ---
  { id: 'dog-tag', ad: 'Dog Tag', tr: 'Operatör künyesi', kategori: 'kunye',
    not: 'Operatörünün seviyesini ve ödülünü gösterir. Öldürdüğün oyuncunun künyesini alıp çıkarsan üsteki Künye Kutusu\'nda sergilenir; ödüllüyse DMZ parası alırsın.' },
  { id: 'lt-dog-tag-case', ad: 'Lieutenant Dog Tag Case', tr: 'Teğmen künye kutusu', kategori: 'kunye',
    not: 'Teğmen öldürünce her zaman düşer. Alırsan yerin herkese görünür, hemen çık. Kutuyla çıkmak Boss Panosu\'nda ilerletir.',
    nerede: 'Teğmenler (Lieutenants).' },

  // --- Silah kılavuzları ---
  { id: 'weapon-manual', ad: 'Weapon Manual', tr: 'Silah kılavuzu', kategori: 'kilavuz',
    not: 'Bulup çıkarırsan Silah Ustası\'nda (Gunsmith) o silahı satın alabilirsin. Kılavuz çıkışta harcanır.',
    nerede: 'Sabit yeri yok, rastgele ganimet. En çok kasalarda, yeşil askeri sandıklarda, silah dolaplarında ve Chang-san Hava Üssü koğuşlarındaki mavi spor çantalarında çıkar.' },

  // --- Üretim malzemesi ---
  { id: 'ingredients', ad: '3D Printer Ingredients', tr: '3D yazıcı malzemeleri', kategori: 'malzeme',
    not: '3D yazıcıda kaynaklarla birlikte ekipman üretmek ve üs istasyonlarını yükseltmek için. Yazıcı, hangi malzemenin nerede çıktığına dair ipucu verir.',
    nerede: 'Ganimet. Komutanlar (Colossus, Deathstalker, tank) değerli malzeme düşürür.' },
  { id: 'resources', ad: 'Resources', tr: 'Kaynaklar', kategori: 'malzeme',
    not: 'Kimyasal (Chemicals), Elektronik (Electronics), Metal (Metals) ve Sentetik (Synthetics). Topladığın eşyalardan otomatik ayrışır, çantanda ayrı bir cepte durur.' },

  // --- Hayatta kalma kitleri ---
  { id: 'deployment-kit', ad: 'Deployment Kit', tr: 'Giriş kiti', kategori: 'kit', not: 'Temel ikmal malzemeleri.',
    nerede: 'DMZ seviye ödülleri, DMZ emirleri, görevler ve etkinlikler. Üsteki Hayatta Kalma Kitleri istasyonunda açılır.' },
  { id: 'triage-kit', ad: 'Triage Kit', tr: 'Triaj kiti', kategori: 'kit', not: 'Sağlık malzemeleri.',
    nerede: 'DMZ seviye ödülleri, DMZ emirleri, görevler ve etkinlikler.' },
  { id: 'armor-kit', ad: 'Armor Kit', tr: 'Zırh kiti', kategori: 'kit', not: 'Koruyucu eşyalar.',
    nerede: 'DMZ seviye ödülleri, DMZ emirleri, görevler ve etkinlikler.' },
  { id: 'equipment-kit', ad: 'Equipment Kit', tr: 'Ekipman kiti', kategori: 'kit', not: 'Ekipman.',
    nerede: 'DMZ seviye ödülleri, DMZ emirleri, görevler ve etkinlikler.' },
  { id: 'sere-kit', ad: 'SERE Kit', tr: 'SERE kiti', kategori: 'kit', not: 'Yüksek riskli kurtarmalar için.',
    nerede: 'DMZ seviye ödülleri, DMZ emirleri, görevler ve etkinlikler.' },

  // --- Para ---
  { id: 'dmz-cash', ad: 'DMZ Cash', tr: 'DMZ parası', kategori: 'para',
    not: 'Maçta bulduğun ya da kazandığın para. Çıkınca bankana geçer. Satıcı, silah ustası, pahalı giriş yöntemleri, teğmen istihbaratı ve kayıp operatörü kurtarmak için kullanılır.' },
];
