// Operatör özellikleri (Traits) ve yetenek ağaçları.
//
// KAYNAK: Liste ve açıklamalar DMZHub'ın özellik sayfasından (dmzhub.gg/traits, 18 Kasım 2026), Türkçeleştirildi.
// Puan kuralları, ana özellik çiftleri, prestij ve önerilen dizilişler DMZTracker ve CODCentral rehberlerinden.
// veri/site.js içinde dmzhubVerileri: false yapılırsa bu sayfa gizlenir.
//
//   agac   savasci (Warfighter), kesif (Scout), hayatta (Survivalist); boşsa ağaca bağlı olmayan rastgele küçük özellik
//   tip    ana (seçilen büyük özellik), kucuk (rastgele gelen küçük özellik), pro (prestijle gelen gelişmiş sürüm)
//   puan   ana özelliğin açıldığı puan (3, 6, 9); aynı ağaçta aynı puandaki iki ana özellikten sadece biri seçilir
//   ana    pro sürümün hangi ana özelliğin gelişmişi olduğu

window.DMZ = window.DMZ || {};

DMZ.ozellikAgaclari = {
  savasci: { ad: 'Savaşçı', en: 'Warfighter', renk: '#ef4444', not: 'Çatışma: hızlı can dolumu, düşmana görünmezlik, ölünce kalkma.' },
  kesif:   { ad: 'Keşifçi', en: 'Scout', renk: '#38bdf8', not: 'Ganimet ve bilgi: fazla eşya, sahada üretim, İHA ve gizlilik.' },
  hayatta: { ad: 'Hayatta Kalan', en: 'Survivalist', renk: '#4ade80', not: 'Destek: hızlı diriltme, bedava yara sarma, yere düşünce duman.' },
};

DMZ.ozellikKurallari = [
  'Her operatör Künye (Dog Tag) seviyesi atladıkça 1 özellik puanı kazanır, toplam 18 puan. Bir ağaca en fazla 9 puan girer, yani iki ağacı tamamen doldurabilirsin, üçünü değil.',
  'Her ağaçta 6 ana ve 16 küçük özellik var. Ağacın ilk puanı rastgele bir küçük özellik verir. Sonraki satırlarda üç küçük özellikten birini seçersin; hangi üçünün çıkacağı her operatörde farklı.',
  '3, 6 ve 9. puanlarda iki ana özellikten birini seçersin; birini alınca diğeri kapanır.',
  'Seçimler geri alınamaz. Ağaçları sıfırlamanın tek yolu prestij (ya da operatörü silmek). Puanlar operatöre aittir; yeni operatör sıfırdan başlar, MIA operatörü kurtarınca özellikleri geri gelir.',
  'Prestij: 18 puanı dolu operatörü prestije sokunca üç ağaç sıfırlanır ve rastgele bir kalıcı prestij özelliği (Pro) gelir. En fazla 3 tane tutulur; 4. prestijden sonra yenisi eskilerden birinin yerine geçebilir. Pro özellikler 6 ve 9. puandaki ana özelliklerin gelişmiş halidir.',
  'Prestij şartları (CODCentral\'a göre): 1. prestij nadir silahlar, nadir zırh yeleği ve çanta, 4 yazıcı malzemesi ve 200.000 $; 2. prestij epik eşyalar ve 300.000 $; 3. ve sonrası efsanevi eşyalar ve 500.000 $. Operatör MIA olmamalı.',
];

DMZ.ozellikDizilisleri = [
  { ad: 'Ganimet', tr: 'Toplayıcı', secim: ['kesif', 'hayatta'], ozellikler: ['container-looter', 'field-crafting', 'thermal-padding', 'consumable-duration', 'free-revive', 'numb-the-pain'] },
  { ad: 'PvP', tr: 'Çatışmacı', secim: ['savasci', 'hayatta'], ozellikler: ['equipment-professional', 'quick-fix', 'possum', 'faster-revive', 'impact-smokes', 'numb-the-pain'] },
  { ad: 'Takım', tr: 'Ekip oyuncusu', secim: ['kesif', 'hayatta'], ozellikler: ['container-looter', 'uav-upgrade', 'overwatch', 'faster-revive', 'impact-smokes', 'numb-the-pain'] },
  { ad: 'Tek başına', tr: 'Yalnız kurt', secim: ['savasci', 'kesif'], ozellikler: ['equipment-professional', 'viper-sense', 'possum', 'container-looter', 'field-crafting', 'thermal-padding'] },
];

DMZ.ozellikler = [
  // --- Savaşçı (Warfighter): ana özellikler ---
  { id: 'equipment-professional', ad: 'Equipment Professional', tr: 'Ekipman Ustası', agac: 'savasci', tip: 'ana', puan: 3, aciklama: 'Kullandığın öldürücü ve taktik ekipmanlar zamanla kendiliğinden dolar, yuvanın sınırına kadar.' },
  { id: 'combat-resistance', ad: 'Combat Resistance', tr: 'Çatışma Direnci', agac: 'savasci', tip: 'ana', puan: 3, aciklama: 'Patlamalardan aldığın hasar ve düşmanın taktik ekipmanlarının (flaş, sersemletici) etkisi azalır.' },
  { id: 'viper-sense', ad: 'Viper Sense', tr: 'Engerek Duyusu', agac: 'savasci', tip: 'ana', puan: 6, aciklama: 'Termal dürbünlerde görünmezsin, yapay zekâ hedefleme sistemleri seni seçemez.' },
  { id: 'quick-fix', ad: 'Quick Fix', tr: 'Hızlı Toparlanma', agac: 'savasci', tip: 'ana', puan: 6, aciklama: 'Düşman operatör ya da asker öldürünce canın daha erken dolmaya başlar.' },
  { id: 'possum', ad: 'Possum', tr: 'Ölü Taklidi', agac: 'savasci', tip: 'ana', puan: 9, aciklama: 'Maç başına bir kez, ölünce kendi kendine son direnişe (Last Stand) kalkarsın ve canın tamamen dolar. 28 Ekim yamasından beri seni düşüren takım yakındayken ya da 4 dakika geçmeden çalışmıyor.' },
  { id: 'adaptive-restock', ad: 'Adaptive Restock', tr: 'Uyumlu İkmal', agac: 'savasci', tip: 'ana', puan: 9, aciklama: 'Düşman askerler öldüğünde bir eşya fazla düşürür.' },

  // --- Keşifçi (Scout): ana özellikler ---
  { id: 'hostile-looter', ad: 'Hostile Looter', tr: 'Düşman Yağmacısı', agac: 'kesif', tip: 'ana', puan: 3, aciklama: 'Düşman askerler bazen sıra dışı (yeşil) bir yazıcı malzemesi düşürür, çok düşük ihtimalle nadir (mavi) olanını.' },
  { id: 'container-looter', ad: 'Container Looter', tr: 'Kutu Yağmacısı', agac: 'kesif', tip: 'ana', puan: 3, aciklama: 'Kutulardan bir parça fazla ganimet çıkma ihtimali.' },
  { id: 'field-crafting', ad: 'Field Crafting', tr: 'Sahada Üretim', agac: 'kesif', tip: 'ana', puan: 6, aciklama: 'Maçtayken temel yazıcı kaynaklarından (metal, sentetik, kimyasal, elektronik) doğrudan eşya üretebilirsin.' },
  { id: 'uav-upgrade', ad: 'UAV Upgrade', tr: 'İHA Yükseltmesi', agac: 'kesif', tip: 'ana', puan: 6, aciklama: 'İHA\'ların menzili ve süresi artar, Gelişmiş İHA (Advanced UAV) olurlar.' },
  { id: 'overwatch', ad: 'Overwatch', tr: 'Gözcü', agac: 'kesif', tip: 'ana', puan: 9, aciklama: 'Senin açtığın İHA kuleleri hiç kapanmaz.' },
  { id: 'thermal-padding', ad: 'Thermal Padding', tr: 'Termal Astar', agac: 'kesif', tip: 'ana', puan: 9, aciklama: 'İHA\'larda görünmezsin; Gelişmiş İHA seni normal İHA gibi görür.' },

  // --- Hayatta Kalan (Survivalist): ana özellikler ---
  { id: 'faster-revive', ad: 'Faster Revive', tr: 'Hızlı Diriltme', agac: 'hayatta', tip: 'ana', puan: 3, aciklama: 'Diriltme hızın artar.' },
  { id: 'consumable-duration', ad: 'Consumable Duration', tr: 'Uzun Etki', agac: 'hayatta', tip: 'ana', puan: 3, aciklama: 'Tüketilen eşyaların (ağrı kesici, enerji içeceği gibi) etkisi daha uzun sürer.' },
  { id: 'impact-smokes', ad: 'Impact Smokes', tr: 'Düşüş Dumanı', agac: 'hayatta', tip: 'ana', puan: 6, aciklama: 'Yere düşünce etrafına duman çıkar.' },
  { id: 'free-revive', ad: 'Free Revive', tr: 'Bedava Yara Sarma', agac: 'hayatta', tip: 'ana', puan: 6, aciklama: 'İlk yaran kendiliğinden iyileşir.' },
  { id: 'numb-the-pain', ad: 'Numb the Pain', tr: 'Acıyı Dindir', agac: 'hayatta', tip: 'ana', puan: 9, aciklama: 'Diriltilince ağrı kesici ve koklama tuzu etkisi alırsın.' },
  { id: 'die-hard', ad: 'Die Hard', tr: 'Zor Ölen', agac: 'hayatta', tip: 'ana', puan: 9, aciklama: 'Son direnişteyken çıkış noktasına yaklaşınca çıkış kendiliğinden çağrılır, son direnişte kan kaybından ölmezsin.' },

  // --- Prestij (Pro) sürümleri ---
  { id: 'viper-sense-pro', ad: 'Viper Sense Pro', tr: 'Engerek Duyusu Pro', tip: 'pro', ana: 'viper-sense', aciklama: 'Termal dürbünlerde ve yapay zekâ hedeflemesinde görünmezsin; ayrıca bir düşman operatör sana nişan alınca uyarılırsın.' },
  { id: 'quick-fix-pro', ad: 'Quick Fix Pro', tr: 'Hızlı Toparlanma Pro', tip: 'pro', ana: 'quick-fix', aciklama: 'Düşman operatör ya da asker öldürünce canın hemen dolmaya başlar.' },
  { id: 'possum-pro', ad: 'Possum Pro', tr: 'Ölü Taklidi Pro', tip: 'pro', ana: 'possum', aciklama: 'Maç başına bir kez ölünce son direnişe kalkarsın; turnike can cezası da kalkar.' },
  { id: 'adaptive-restock-pro', ad: 'Adaptive Restock Pro', tr: 'Uyumlu İkmal Pro', tip: 'pro', ana: 'adaptive-restock', aciklama: 'Düşman askerlerin fazladan düşürdüğü eşyalar daha nadir olur.' },
  { id: 'field-crafting-pro', ad: 'Field Crafting Pro', tr: 'Sahada Üretim Pro', tip: 'pro', ana: 'field-crafting', aciklama: 'Maçta temel kaynaklardan eşya üretirsin ve her üretimin kaynak maliyeti yarıya iner.' },
  { id: 'uav-upgrade-pro', ad: 'UAV Upgrade Pro', tr: 'İHA Yükseltmesi Pro', tip: 'pro', ana: 'uav-upgrade', aciklama: 'İHA\'lar Gelişmiş İHA olur; mini haritan da 1,5 kat büyür.' },
  { id: 'overwatch-pro', ad: 'Overwatch Pro', tr: 'Gözcü Pro', tip: 'pro', ana: 'overwatch', aciklama: 'Açtığın İHA kuleleri hiç kapanmaz ve menzilleri artar.' },
  { id: 'thermal-padding-pro', ad: 'Thermal Padding Pro', tr: 'Termal Astar Pro', tip: 'pro', ana: 'thermal-padding', aciklama: 'Termal Astar, içinde olduğun aracı da İHA\'dan gizler.' },
  { id: 'impact-smokes-pro', ad: 'Impact Smokes Pro', tr: 'Düşüş Dumanı Pro', tip: 'pro', ana: 'impact-smokes', aciklama: 'Yere düşünce çıkan duman daha büyük olur ve daha uzun sürer.' },
  { id: 'free-revive-pro', ad: 'Free Revive Pro', tr: 'Bedava Yara Sarma Pro', tip: 'pro', ana: 'free-revive', aciklama: 'İlk yaran kendiliğinden iyileşir; yaralıyken turnike de takabilirsin.' },
  { id: 'numb-the-pain-pro', ad: 'Numb The Pain Pro', tr: 'Acıyı Dindir Pro', tip: 'pro', ana: 'numb-the-pain', aciklama: 'Diriltilince ağrı kesici ve koklama tuzu etkisi alırsın (gelişmiş sürüm).' },
  { id: 'die-hard-pro', ad: 'Die Hard Pro', tr: 'Zor Ölen Pro', tip: 'pro', ana: 'die-hard', aciklama: 'Son direnişte çıkışa yaklaşınca çıkış kendiliğinden çağrılır, kan kaybından ölmezsin ve daha hızlı hareket edersin.' },

  // --- Küçük özellikler: ağaçların rastgele satırlarında çıkar ---
  { id: 'adrenaline-burst', ad: 'Adrenaline Burst', tr: 'Adrenalin Patlaması', tip: 'kucuk', aciklama: 'Düşman öldürünce taktik koşu yenilenir.' },
  { id: 'air-superiority', ad: 'Air Superiority', tr: 'Hava Üstünlüğü', tip: 'kucuk', aciklama: 'İHA kulelerinin ve SAM bataryalarının süresi uzar.' },
  { id: 'ammo-reserves', ad: 'Ammo Reserves', tr: 'Cephane Yedeği', tip: 'kucuk', aciklama: 'Bütün mermi türlerinde taşıyabildiğin yedek cephane artar.' },
  { id: 'ammo-scavenger', ad: 'Ammo Scavenger', tr: 'Cephane Toplayıcı', tip: 'kucuk', aciklama: 'Cephane paketlerinden iki kat mermi alırsın.' },
  { id: 'auto-fill', ad: 'Auto Fill', tr: 'Otomatik Doldurma', tip: 'kucuk', aciklama: 'Öldürücü ve taktik ekipmanların çantadan kendiliğinden dolar.' },
  { id: 'bounty-hunter', ad: 'Bounty Hunter', tr: 'Ödül Avcısı', tip: 'kucuk', aciklama: 'Ödül avından (Bounty) aldığın ödüller artar.' },
  { id: 'bounty-intel', ad: 'Bounty Intel', tr: 'Ödül İstihbaratı', tip: 'kucuk', aciklama: 'Ödül istihbaratı satın almak ucuzlar.' },
  { id: 'cash-ops', ad: 'Cash Ops', tr: 'Nakit Görevler', tip: 'kucuk', aciklama: 'Operasyonlardan %20 fazla para alırsın.' },
  { id: 'combat-scanner', ad: 'Combat Scanner', tr: 'Çatışma Tarayıcı', tip: 'kucuk', aciklama: 'Bir oyuncuyu yere düşürünce onun yerinde tek seferlik İHA taraması olur.' },
  { id: 'combat-scavenger', ad: 'Combat Scavenger', tr: 'Çatışma Toplayıcısı', tip: 'kucuk', aciklama: 'Öldürülen düşman askerlerin küçük ihtimalle yazıcı malzemesi ya da değerli eşya düşürmesi.' },
  { id: 'consumable-stacker', ad: 'Consumable Stacker', tr: 'Etki Biriktirici', tip: 'kucuk', aciklama: 'Zaten etkisi süren bir tüketim eşyasını tekrar kullanınca süreler toplanır, en fazla iki katına kadar.' },
  { id: 'deep-breath', ad: 'Deep Breath', tr: 'Derin Nefes', tip: 'kucuk', aciklama: 'Su altında nefesin daha uzun yeter.' },
  { id: 'expedited-extraction', ad: 'Expedited Extraction', tr: 'Hızlı Çıkış', tip: 'kucuk', aciklama: 'Çıkış helikopteri çok daha çabuk gelir.' },
  { id: 'fast-learner', ad: 'Fast Learner', tr: 'Hızlı Öğrenen', tip: 'kucuk', aciklama: 'Operatör deneyimi %10 fazla gelir.' },
  { id: 'faster-learner', ad: 'Faster Learner', tr: 'Daha Hızlı Öğrenen', tip: 'kucuk', aciklama: 'Operatör deneyimi %10 fazla gelir; Hızlı Öğrenen ile toplanır.' },
  { id: 'field-medic', ad: 'Field Medic', tr: 'Sahra Sıhhiyecisi', tip: 'kucuk', aciklama: 'Takım arkadaşlarını daha hızlı diriltirsin.' },
  { id: 'final-intel', ad: 'Final Intel', tr: 'Son Çıkış Bilgisi', tip: 'kucuk', aciklama: 'Son çıkış noktası maçın başından taktik haritada işaretli olur.' },
  { id: 'free-prep', ad: 'Free Prep', tr: 'Bedava Hazırlık', tip: 'kucuk', aciklama: 'Bedava teçhizatla girince çantana rastgele bir tüketim eşyası eklenir.' },
  { id: 'fuel-economy', ad: 'Fuel Economy', tr: 'Yakıt Tasarrufu', tip: 'kucuk', aciklama: 'Araçlar daha az yakıt harcar.' },
  { id: 'hostile-ammo', ad: 'Hostile Ammo', tr: 'Düşman Cephanesi', tip: 'kucuk', aciklama: 'Öldürülen düşman askerler fazladan bir cephane paketi düşürür.' },
  { id: 'investor', ad: 'Investor', tr: 'Yatırımcı', tip: 'kucuk', aciklama: 'Çıkardığın para biraz artar.' },
  { id: 'key-cash', ad: 'Key Cash', tr: 'Anahtar Parası', tip: 'kucuk', aciklama: 'Kilitli bir yeri anahtarla açınca para kazanırsın; anahtar ne kadar nadirse o kadar çok.' },
  { id: 'killing-spree', ad: 'Killing Spree', tr: 'Öldürme Serisi', tip: 'kucuk', aciklama: 'Düşman öldürdükçe aktif etkilerin süresi uzar, en fazla iki katına kadar.' },
  { id: 'lt-hunter', ad: 'LT Hunter', tr: 'Teğmen Avcısı', tip: 'kucuk', aciklama: 'Teğmen kulesini açınca bir teğmen daha görünür.' },
  { id: 'lucky', ad: 'Lucky', tr: 'Şanslı', tip: 'kucuk', aciklama: 'Kötü bir etki altındayken ya da malzemen azken işe yarar eşya bulma ihtimalin artar.' },
  { id: 'mechanic', ad: 'Mechanic', tr: 'Tamirci', tip: 'kucuk', aciklama: 'Araçlara yakıt doldurma ve tamir hızın iki katına çıkar.' },
  { id: 'metabolism', ad: 'Metabolism', tr: 'Metabolizma', tip: 'kucuk', aciklama: 'Turnike yüzünden kaybettiğin can yavaş yavaş geri gelir.' },
  { id: 'mini-tracker', ad: 'Mini Tracker', tr: 'Mini İz Sürücü', tip: 'kucuk', aciklama: 'Açılmamış bir kutuyu yağmalayınca %50 ihtimalle radar taraması olur.' },
  { id: 'objective-oriented', ad: 'Objective Oriented', tr: 'Hedef Odaklı', tip: 'kucuk', aciklama: 'Operasyon ödül sandıkları bir nadirlik üstte çıkar, en fazla nadire kadar.' },
  { id: 'operator-tracker', ad: 'Operator Tracker', tr: 'Operatör İz Sürücü', tip: 'kucuk', aciklama: 'Düşman operatörlerini ayak izlerinden takip edebilirsin.' },
  { id: 'pack-rat', ad: 'Pack Rat', tr: 'İstifçi', tip: 'kucuk', aciklama: 'Taşıyabildiğin yazıcı kaynağı %20 artar; Kaynak Biriktirici ile toplanır.' },
  { id: 'plate-organization', ad: 'Plate Organization', tr: 'Plaka Düzeni', tip: 'kucuk', aciklama: 'Yedek zırh plakası yerin 2 artar; Plaka Kesesi ile toplanır.' },
  { id: 'plate-pouch', ad: 'Plate Pouch', tr: 'Plaka Kesesi', tip: 'kucuk', aciklama: 'Yedek zırh plakası yerin 2 artar; Plaka Düzeni ile toplanır.' },
  { id: 'plate-speed', ad: 'Plate Speed', tr: 'Hızlı Plaka', tip: 'kucuk', aciklama: 'Zırh plakası takmak daha kısa sürer.' },
  { id: 'popcorn-lethals', ad: 'Popcorn Lethals', tr: 'Patlayıcı Bereketi', tip: 'kucuk', aciklama: 'Öldürücü ekipmandan etkilenen düşman askerlerin öldürücü ekipman düşürme ihtimali artar.' },
  { id: 'popcorn-tacticals', ad: 'Popcorn Tacticals', tr: 'Taktik Bereketi', tip: 'kucuk', aciklama: 'Taktik ekipmandan etkilenen düşman askerlerin taktik ekipman düşürme ihtimali artar.' },
  { id: 'quick-knife', ad: 'Quick Knife', tr: 'Hızlı Bıçak', tip: 'kucuk', aciklama: 'Silahla vurma yerine bıçakla saldırırsın.' },
  { id: 'quick-regen', ad: 'Quick Regen', tr: 'Hızlı Yenilenme', tip: 'kucuk', aciklama: 'Can dolumunun başlaması biraz kısalır.' },
  { id: 'rad-blocker', ad: 'Rad Blocker', tr: 'Radyasyon Kalkanı', tip: 'kucuk', aciklama: 'Radyasyondan daha az hasar alırsın.' },
  { id: 'rampage', ad: 'Rampage', tr: 'Öfke', tip: 'kucuk', aciklama: 'Düşman operatör öldürünce kısa bir ağrı kesici etkisi alırsın.' },
  { id: 'rescuer', ad: 'Rescuer', tr: 'Kurtarıcı', tip: 'kucuk', aciklama: 'Yere düşmüş takım arkadaşını sürüklerken daha hızlı hareket edersin.' },
  { id: 'resource-hoarder', ad: 'Resource Hoarder', tr: 'Kaynak Biriktirici', tip: 'kucuk', aciklama: 'Taşıyabildiğin yazıcı kaynağı %20 artar; İstifçi ile toplanır.' },
  { id: 'resource-management', ad: 'Resource Management', tr: 'Kaynak Yönetimi', tip: 'kucuk', aciklama: 'Dolu olan bir kaynaktan aldığın fazlalığın bir kısmı en az olan kaynağına eklenir.' },
  { id: 'resource-pockets', ad: 'Resource Pockets', tr: 'Kaynak Cepleri', tip: 'kucuk', aciklama: 'Eşya söküp parçalayınca %20 fazla yazıcı kaynağı alırsın.' },
  { id: 'resupply', ad: 'Resupply', tr: 'Yeniden İkmal', tip: 'kucuk', aciklama: 'Cephane ikmallerinden ve sandıklarından fazla mermi, zırh kutularından 2 fazla plaka alırsın.' },
  { id: 'stealthy', ad: 'Stealthy', tr: 'Sinsi', tip: 'kucuk', aciklama: 'Av timi (Hunt Squad) peşine düşmeden önce daha çok düşman öldürebilirsin.' },
  { id: 'strong-arm', ad: 'Strong Arm', tr: 'Güçlü Kol', tip: 'kucuk', aciklama: 'Ekipmanları daha uzağa atarsın ve atış çizgisi görünür.' },
  { id: 'supplied-drops', ad: 'Supplied Drops', tr: 'Dolu İkmal', tip: 'kucuk', aciklama: 'İkmal paketinden fazladan bir kutu çıkma ihtimali; bütün takıma geçer ve toplanır.' },
];
