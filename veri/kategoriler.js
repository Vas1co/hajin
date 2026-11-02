// Harita kategorileri. "ad" Türkçe adı, "en" oyundaki İngilizce adı.
// "ikon" js/ikonlar.js içindeki ikonlardan biri, "renk" haritadaki işaretin rengi.
// "ikonRenk": işaretin üstündeki ikonun rengi; yazılmazsa beyaz (açık renkli işaretlerde koyu yap).
// "rozet": işaretin köşesine konan küçük ek işaret (son çıkıştaki "!" gibi).
// "resim": site/harita/ikonlar klasöründeki oyun ikonu. Varsa ve veri/site.js'te resimIkonlar açıksa
//          işaretin üstünde bu resim çıkar, yoksa "ikon". Resimleri istediğin gibi düzenleyebilirsin.
// "tamResim": kendi rengi ve çerçevesi olan hazır ikon (DMZHub ikonları gibi); işaretin kendisi bu resim olur.
//          Varsa "resim" ve "ikon" yerine bu çıkar. DMZHub ikonlarını kapatmak için veri/site.js'te dmzhubVerileri: false.
// "aciklama": noktanın kendi açıklaması yoksa haritada bu çıkar.
// "alan": yazılırsa haritada her noktanın çevresine bu yarıçapta (harita pikseli) şeffaf bir daire çizilir.
// Açıklamalar Activision'ın resmi Hajin rehberinden (5 Ekim 2026) ve ekibin oyun içi bilgisinden yazıldı.
window.DMZ = window.DMZ || {};

DMZ.kategoriler = {
  // --- Bölgeler ---
  bolge: {
    ad: 'Bölge adları', en: 'Area names', grup: 'bolgeler', ikon: 'bolge', renk: '#e7ebe3', ikonRenk: '#0b0d0b',
  },
  kale: {
    ad: 'Kale', en: 'Fortress', grup: 'bolgeler', ikon: 'kale', renk: '#ff5a3c', resim: 'kale.png',
    aciklama: 'Bölgenin en tehlikeli ve genelde en değerli yapısı. Ekip halinde, hazırlıklı gir.',
  },

  // --- Giriş ve çıkış ---
  giris: {
    ad: 'Giriş Noktası', en: 'Infil', grup: 'giriscikis', ikon: 'giris', renk: '#16a34a',
    tamResim: 'dmzhub-player-spawn.webp',
    aciklama: 'Oyuncuların maça başladığı (doğduğu) noktalar. Hepsi haritanın kenarlarında.',
  },
  hikaye: {
    ad: 'Hikaye Görevi Girişi', en: 'Story Mission Infil', grup: 'giriscikis', ikon: 'hikaye', renk: '#facc15', ikonRenk: '#1c1917',
    aciklama: 'Hikaye görevleri (Story Mission) için başlangıç noktaları.',
  },
  cikis: {
    ad: 'Çıkış Noktası', en: 'Exfil', grup: 'giriscikis', ikon: 'cikis', renk: '#0ea5e9', resim: 'cikis.png',
    tamResim: 'dmzhub-exfil.webp',
    aciklama: 'Her maçta çıkışlar bir havuzdan seçilir ve yeşil dumanla işaretlenir. Helikopteri çağır, gelene kadar alanı tut, sonra bin. Başka ekipler çıkışlarda pusu kurabilir. Fulton balonu ya da işaret fişeğiyle (Flare) de çıkabilirsin.',
  },
  soncikis: {
    ad: 'Son Çıkış', en: 'Final Exfil', grup: 'giriscikis', ikon: 'soncikis', renk: '#0ea5e9', rozet: '!', resim: 'soncikis.png',
    tamResim: 'dmzhub-final-exfil.webp', // "!" resmin içinde var, ek işaret çizilmez
    aciklama: 'Radyasyon fırtınası (oyuncular arasında "gaz") kapanırken son kaçış için kullanılan çıkış noktaları. Ekrandaki kalan süre (Time Remaining) azaldıysa en yakın son çıkışa yönel.',
  },

  // --- Tehlikeli noktalar ---
  boss: {
    ad: 'Boss Alanı (Colossus)', en: 'Colossus Spawn', grup: 'tehlike', ikon: 'boss', renk: '#ef4444',
    tamResim: 'dmzhub-colossus.webp',
    alan: 130, // şeffaf dairenin yarıçapı; büyütmek için sayıyı artır
    aciklama: 'Colossus bu alanlardan birinde ortaya çıkabilir (haritadaki şeffaf daireler yaklaşık alanı gösterir). Resmi rehbere göre yaklaşık 2,1 metre boyunda, ağır zırhlı bir asker; seyreltilmiş uranyum mermili bir minigun taşıyor. Komutan (Commander) sınıfı bir boss: yakındayken taktik haritada görünür ve ekip liderin seni uyarır.\n\nÖldürüp çıkarsan değerli 3D yazıcı malzemeleri alırsın, ilk öldürmede ayrıca DMZ parası verilir. Çatışma yakındaki düşmanları ve başka ekipleri de çekebilir.',
  },
  yerleske: {
    ad: 'Yerleşke', en: 'Compound', grup: 'tehlike', ikon: 'yerleske', renk: '#8b5cf6', resim: 'yerleske.png',
    aciklama: 'Küçük ya da orta boy tahkimatlı askeri mevzi. Sıkı korunur ama ganimeti ve istihbaratı daha iyidir. Gürültülü girersen içerideki düşmanların hepsi aynı anda üstüne gelir, sessiz yaklaşmak daha iyi. İçinde kullanabileceğin zırhlı araçlar (LTV gibi) olabilir.',
  },
  tegmen: {
    ad: 'Teğmen Kulesi', en: 'Lieutenant Tower', grup: 'tehlike', ikon: 'tegmen', renk: '#ec4899', resim: 'tegmen.png',
    aciklama: 'Yüksek iletişim kulesi. Tepeye tırman ve oradaki laptopu kullan: yakındaki bir Teğmen\'in (Lieutenant) yaklaşık yeri haritada çıkar, yan görev de tamamlanır.\n\nTeğmenler dayanıklı ve tehlikelidir. Öldürünce silahını ve künye kutusunu alabilirsin ama künyeyi alırsan yerin bütün oyunculara görünür, hızlı çık.',
  },
  keskin: {
    ad: 'Keskin Nişancı Kulesi', en: 'Sniper Tower', grup: 'tehlike', ikon: 'keskin', renk: '#991b1b',
    tamResim: 'dmzhub-sniper-tower.webp',
    aciklama: 'Keskin nişancı tehlikesi olan kule. Önünden geçerken açıkta durma.',
  },

  // --- İkmal ve keşif ---
  iha: {
    ad: 'İHA Kulesi', en: 'UAV Tower', grup: 'ikmal', ikon: 'iha', renk: '#0d9488', resim: 'iha.png',
    aciklama: 'Küçük, taşınabilir bir iletişim kulesi, genelde düşman korur. Çalıştırınca yan görev tamamlanır, DMZ parası kazanırsın ve yakındaki oyuncuların ve düşmanların yeri bir anlığına görünür.',
  },
  sam: {
    ad: 'SAM Bataryası', en: 'SAM Site', grup: 'ikmal', ikon: 'sam', renk: '#9f1239', resim: 'sam.png',
    aciklama: 'Ele geçirilebilen füze bataryası. Ele geçirince kargo taşıyan helikopterleri ve Deathstalker\'ları düşürebilirsin; düşen helikopterden sandık çıkar. Birkaç DMZ emri bunu istiyor (Eye in the Sky, Multi-Talented, Stalking the Stalker).',
  },
  ammo: {
    ad: 'Mühimmat ve Zırh Sandığı', en: 'Ammo Armor Cache', grup: 'ikmal', ikon: 'ammo', renk: '#a3e635', ikonRenk: '#1a2e05', resim: 'ammo.png',
    tamResim: 'dmzhub-ammo-cache.webp',
    aciklama: 'Mermini doldurur, zırh plakası alırsın. Çoğu düşmanın tuttuğu yerleşkelerin içindedir. Kullandıktan sonra bir süre tekrar açılmaz.',
  },
  klinik: {
    ad: 'Klinik', en: 'Clinic', grup: 'ikmal', ikon: 'klinik', renk: '#f1f5f9', ikonRenk: '#dc2626', resim: 'klinik.png',
    aciklama: 'Yeşil cepheli küçük sağlık binası. Sağlık malzemesi çıkabilir. İçeride yaralı oyuncuları bekleyen başka bir ekip olabilir, dikkatli gir.',
  },
  benzinlik: {
    ad: 'Benzin İstasyonu', en: 'Gas Station', grup: 'ikmal', ikon: 'benzinlik', renk: '#ea580c', resim: 'benzinlik.png',
    aciklama: 'Kara ve hava araçlarını tamir edip yakıt doldurursun. Yanında taşıdığın benzin bidonunu da burada doldurabilirsin.',
  },
  tekne: {
    ad: 'Tekne Benzinliği', en: 'Marine Gas Station', grup: 'ikmal', ikon: 'tekne', renk: '#ea580c', resim: 'tekne.png', // benzinlikle aynı renk, ikon farklı
    aciklama: 'Küçük bir iskele ve iki pompa. Botları tamir eder, yakıt doldurursun. Yakına park edilen araçlar ve benzin bidonları da dolar.',
  },
  itfaiye: {
    ad: 'İtfaiye', en: 'Fire Station', grup: 'ikmal', ikon: 'itfaiye', renk: '#dc2626', resim: 'itfaiye.png',
    tamResim: 'dmzhub-fire-station.webp',
    aciklama: 'Kırmızı binalar, genelde yerleşim yerlerinde. Düşman bekle. Radyasyon kıyafeti ve paraşüt aramak için en iyi yer. Nükleer santrale gideceksen önce buraya uğra.',
  },
  karakol: {
    ad: 'Karakol', en: 'Police Station', grup: 'ikmal', ikon: 'karakol', renk: '#2563eb', resim: 'karakol.png',
    tamResim: 'dmzhub-police-station.webp',
    aciklama: 'Mavi renkli binalar. Düşman direnci ve temizlenecek çok oda var, bazılarından çatıya çıkılır. Askeri teçhizat ve kilitli bir cephanelik (Armory) bulunur.',
  },

  // --- Ganimet ---
  siginak: {
    ad: 'Sığınak (Silo)', en: 'Bunker', grup: 'ganimet', ikon: 'siginak', renk: '#c026d3',
    tamResim: 'dmzhub-silo.webp',
    aciklama: 'Rögar kapağından inilen yeraltı sığınağı, silo olarak da geçiyor. Resmi rehbere göre kırsal ve ormanlık alanlarda bu tür yeraltı girişlerine dikkat etmek lazım.',
  },
  kayipikmal: {
    ad: 'Kayıp İkmal Sandığı', en: 'Lost Supply Drop', grup: 'ganimet', ikon: 'kayipikmal', renk: '#4ade80', ikonRenk: '#052e16',
    tamResim: 'dmzhub-lost-supply.webp',
    aciklama: 'Kayıp ikmal sandığının çıkabileceği noktalar. "Crashed Crate" (Düşmüş Sandık) adlı DMZ emri için gerekiyor.',
  },
  roket: {
    ad: 'Roket', en: 'Rocket', grup: 'ganimet', ikon: 'roket', renk: '#e2e8f0', ikonRenk: '#0f172a',
    tamResim: 'dmzhub-rocket.png',
    aciklama: 'Yere saplanmış, patlamamış bir füze. Haritanın birçok yerinde var; içini arayınca farklı nadirlikte ganimet çıkabilir.',
  },
  anahtar: {
    ad: 'Anahtar Odası', en: 'Key Room', grup: 'ganimet', ikon: 'anahtar', renk: '#64748b', // nadirliği bilinen odalar o nadirliğin renginde
    aciklama: 'Anahtarla açılan kilitli oda ya da dolap. İşaretin rengi anahtarın nadirliğini gösterir: yeşil sıra dışı, mavi nadir, mor epik, turuncu efsanevi, kırmızı ultra; gri olanların anahtarı bilinmiyor. Anahtar genelde ceketlerde ve ev eşyası kaplarında çıkar; listesi Eşyalar sayfasında.',
  },
  kasa: {
    ad: 'Kasa', en: 'Safe', grup: 'ganimet', ikon: 'kasa', renk: '#1d4ed8', ikonRenk: '#facc15',
    alan: 40, // küçük şeffaf daire (boss ve malzeme dairelerinin üçte biri kadar)
    aciklama: 'Haritaya dağılmış küçük kasalar. Açınca farklı nadirlikte değerli ganimet çıkar. Bazı DMZ emirleri kasa açmanı istiyor (Robbery, Nothing Is Secure).',
  },
  malzeme: {
    ad: 'Yazıcı Malzemesi', en: 'Printer Ingredients', grup: 'ganimet', ikon: 'malzeme', renk: '#f59e0b', ikonRenk: '#1c1917',
    alan: 100, // arama alanını gösteren şeffaf dairenin varsayılan yarıçapı (noktada "alan" yazıyorsa o)
    aciklama: '3D yazıcı malzemelerinin oyunun ipucuna göre en çok çıktığı yerler (yazıcıda tarif seç, "Ingredient Locations"a bas). Kesin doğma noktası değil, arama alanı: oradaki kutulara, çantalara ve dolaplara bak. Tam liste Rehber\'de.',
  },
  kilavuz: {
    ad: 'Silah Kılavuzu', en: 'Weapon Manuals', grup: 'ganimet', ikon: 'silah', renk: '#6366f1',
    alan: 40, // küçük şeffaf daire (boss ve malzeme dairelerinin üçte biri kadar)
    aciklama: 'Silah kılavuzunun çok çıktığı yazılan yerler. Kılavuzun sabit yeri yok, rastgele ganimet; burada sadece şansın daha yüksek. Bulup çıkarınca Silah Ustası\'nda (Gunsmith) o silahı satın alabilirsin. Ayrıntı Rehber\'de.',
  },
  satinalma: {
    ad: 'Satın Alma İstasyonu', en: 'Buy Station', grup: 'ganimet', ikon: 'satinalma', renk: '#10b981',
  },
  diger: {
    ad: 'Diğer', en: 'Other', grup: 'ganimet', ikon: 'nokta', renk: '#64748b',
  },
};

DMZ.kategoriGruplari = [
  { id: 'bolgeler',   ad: 'Bölgeler' },
  { id: 'giriscikis', ad: 'Giriş ve çıkış' },
  { id: 'tehlike',    ad: 'Tehlikeli noktalar' },
  { id: 'ikmal',      ad: 'İkmal ve keşif' },
  { id: 'ganimet',    ad: 'Ganimet ve sığınaklar' },
];
