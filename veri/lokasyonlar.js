// Lokasyonlar sayfasındaki kartlar. Bu dosyayı elle düzenleyebilirsin.
//
// Alanlar:
//   ad            Oyundaki İngilizce adı (değiştirme, arkadaşlar oyunda bu adı görüyor)
//   tr            Türkçe karşılığı
//   tur           'ana' (ana bölge), 'kale' (Fortress) veya 'ara' (ara bölge)
//   ust           Bağlı olduğu ana bölgenin id'si
//   nokta         Haritadaki noktanın id'si ("Haritada göster" düğmesi buna gider)
//   tehlike       Bölgedeki EN YÜKSEK tehlike: null (bilinmiyor), 'dusuk', 'orta', 'yuksek', 'kritik', 'asiri'
//   tehlikeDetay  Bölgenin içindeki alanların tehlikesi: [{ ad: 'Prison', seviye: 'yuksek' }, ...]
//   radyasyon     true ise kartta radyasyon uyarısı çıkar
//   aciklama      Türkçe açıklama. Birden fazla paragraf için \n\n kullan.
//   foto          İstersen 'foto/lokasyon-adi.jpg' (site/foto klasörüne koy)
//
// Tehlike seviyeleri ve bilgiler: Activision'ın resmi Hajin rehberi (callofduty.com, 5 Ekim 2026).
// Açıklamalar o rehberden yararlanılarak kendi cümlelerimizle yazıldı.

window.DMZ = window.DMZ || {};

DMZ.lokasyonlar = [
  // --- Ana bölgeler ---
  {
    id: '14th-political-prison', ad: '14th Political Prison', tr: '14. Siyasi Cezaevi', tur: 'ana', nokta: 'r6007',
    tehlike: 'kritik',
    tehlikeDetay: [{ ad: 'Prison', seviye: 'yuksek' }, { ad: 'The Fortress Prison Yard', seviye: 'yuksek' }, { ad: 'The Citadel', seviye: 'kritik' }],
    aciklama: 'Kuzeybatıda, ormanların ortasında düzleştirilmiş bir tepenin üstüne kurulmuş dev bir cezaevi. Yüksek beton duvarlarla çevrili, her köşesinde gözetleme kulesi var. Ana giriş ve kontrol noktası güneyde, koğuşlar doğuda, batısında kirli bir nehir akıyor.\n\nAvlunun ortasındaki Y şeklindeki bina İç Kale (The Citadel): dar köprüler, hücre blokları ve büyük bir fırın odası. İçeride kolayca kuşatılabilirsin, keşif yapmadan dalma.',
  },
  {
    id: 'chang-san-air-base', ad: 'Chang-san Air Base', tr: 'Chang-san Hava Üssü', tur: 'ana', nokta: 'r6008',
    tehlike: 'asiri',
    tehlikeDetay: [{ ad: 'Air Base Exterior', seviye: 'kritik' }, { ad: 'Air Base Bunker', seviye: 'asiri' }],
    aciklama: 'Batıda, granit bir tepenin yamacına kurulmuş askeri hava üssü. Haritanın en tehlikeli yerlerinden biri. Yüzeyde pist, helipad, hastane, koğuşlar, depolar ve süslü bir komuta binası var.\n\nTepenin altında üssün kendisinden bile büyük bir sığınak ve tünel ağı uzanıyor. Güneydeki büyük sığınak kapıları oraya açılıyor. Doğu tarafı uçurum, oradan girmek zor. Ekipler güneydeki yüksek ormanlık alandan sızmayı başarmış. Kulelere yakalanmadan duvarda bir boşluk bulman gerekiyor.',
  },
  {
    id: 'deadtown', ad: 'Deadtown', tr: 'Ölü Kasaba', tur: 'ana', nokta: 'r6009',
    tehlike: 'orta',
    tehlikeDetay: [{ ad: 'Deadtown Exterior', seviye: 'dusuk' }, { ad: 'Re-Education Center', seviye: 'orta' }],
    aciklama: 'Güneybatıda, halkı boşaltılıp orduya bırakılmış bir tarım kasabası. Başlangıç için uygun: dışarıda hafif zırhlı düşmanlar ve konvoylar var. Ana toprak yolda bir klinik, iki ucunda birer benzinlik bulunuyor.\n\nDüşman, ortadaki iki Yeniden Eğitim Merkezi\'nde (Re-Education Center) yoğunlaşıyor. Kasabanın altında önemli binalara bağlanan bir kanalizasyon var. Nehre bakan doğu tarafı daha yüksek ve modern. Oradaki bazı apartmanlar aslında gizli askeri depo.',
  },
  {
    id: 'imjin-farmland', ad: 'Imjin Farmland', tr: 'Imjin Tarlaları', tur: 'ana', nokta: 'r6010',
    tehlike: 'orta',
    tehlikeDetay: [{ ad: 'Farmland Exterior', seviye: 'dusuk' }, { ad: 'Jeong Loading Dock', seviye: 'dusuk' }, { ad: 'Rice Mill', seviye: 'orta' }],
    aciklama: 'Güneybatı sınırında düz ve açık bir ova: pirinç tarlaları, kanallar, çiftlikler ve demiryolu. Siper az, görüş mesafesi uzun. Açık alanda dikkatli ilerle, düşman araçlarına dikkat et.\n\nBölgeye büyük Pirinç Değirmeni (Rice Mill) hakim, tepesi iyi bir gözetleme noktası. Çevresindeki depoları siper alarak yaklaş, içeride yakın mesafe silahına geç.',
  },
  {
    id: 'cheongun-village', ad: 'Cheongun Village', tr: 'Cheongun Köyü', tur: 'ana', nokta: 'r6011',
    tehlike: 'yuksek',
    tehlikeDetay: [{ ad: 'Cheongun Village', seviye: 'dusuk' }, { ad: 'Cheongun Outskirts', seviye: 'dusuk' }, { ad: 'Russian Border Crossing', seviye: 'dusuk' }, { ad: 'Heavenly Luck Casino', seviye: 'yuksek' }],
    aciklama: 'Hajin Nehri kıyısında, haritanın en kuzeyindeki Güney Kore köyü. Doğu ucunda Rus sınır kapısı var, güneyinden ana otoyol (Expressway No. 1) geçiyor. Nehrin karşısındaki sisli Rus sınırına şu an geçilemiyor.\n\nKöyün ortasındaki çok katlı Heavenly Luck Kumarhanesi asıl tehlike. İçinde yeraltı otoparkı ve kat kat oyun salonları var. Elektrik olmadığı için içerisi karanlık, gece görüş (NVG) kullan.',
  },
  {
    id: 'haneul-nuclear-reactor', ad: 'Haneul Nuclear Reactor', tr: 'Haneul Nükleer Reaktörü', tur: 'ana', nokta: 'r6012',
    tehlike: 'yuksek', radyasyon: true,
    tehlikeDetay: [{ ad: 'Reactor', seviye: 'yuksek' }, { ad: 'South Korean Border Zone', seviye: 'orta' }],
    aciklama: 'Kuzeydoğuda sızıntı yapan bir nükleer santral. Bütün alan radyasyonlu, en yoğunu reaktörün içinde. Radyasyon kıyafeti ve gaz maskesi olmadan girersen ölürsün. Radyasyon kıyafeti itfaiyelerde çıkabiliyor.\n\nGirmek için deniz yolunu ya da güneybatıdaki Compound Delta\'dan gelen tüneli kullanabilirsin. Reaktör 02 ağır hasarlı, Reaktör 01 şimdilik sağlam.',
  },
  {
    id: 'mirae-general-hospital', ad: 'Mirae General Hospital', tr: 'Mirae Genel Hastanesi', tur: 'ana', nokta: 'r6013',
    tehlike: 'dusuk',
    tehlikeDetay: [{ ad: 'Mirae General Hospital', seviye: 'dusuk' }],
    aciklama: 'Haritanın ortasına yakın, bütün Hajin\'e hizmet veren ana hastane. Yanında tren istasyonu ve otopark var, kuzeyinden ana otoyol geçiyor. Bahçeye triyaj çadırları ve geçici koğuşlar kurulmuş.\n\nİçeride yıkılmış çok katlı bir lobi ve renk kodlu koğuşlar var, yakın mesafe çatışmaya hazır ol. Güneydeki ormanlık tepede (Mujin Pass) keskin nişancılar olabilir.',
  },
  {
    id: 'nurigo-mall', ad: 'NuriGo Mall', tr: 'NuriGo AVM', tur: 'ana', nokta: 'r6014',
    tehlike: 'yuksek',
    tehlikeDetay: [{ ad: 'NuriGO East', seviye: 'orta' }, { ad: 'NuriGO West', seviye: 'yuksek' }],
    aciklama: 'Hajin şehrinin kuzeydoğusundaki alışveriş bölgesi. Yüzeyde karakol, klinik, belediye binası, restoranlar ve şehri çevreleyen, hâlâ çalışan bir monoray istasyonu var.\n\nEski tren istasyonunun yanındaki avluda üç yuvarlak yapı (bir giriş kulübesi ve iki ışık kuyusu, birinde asansör) yerin altındaki büyük AVM\'ye iniyor. Aşağıda elektrik yok, NVG kullan. Güneydeki The Grid çok daha tehlikeli.',
  },
  {
    id: 'cheonwang-peak-array', ad: 'Cheonwang Peak Array', tr: 'Cheonwang Zirvesi Anten Dizisi', tur: 'ana', nokta: 'r6015',
    tehlike: 'orta',
    tehlikeDetay: [{ ad: 'Cheonwang Peak Array', seviye: 'orta' }],
    aciklama: 'Haritanın ortasında, düz bir zirvenin üstündeki büyük DBN TV anten tesisi. Düşman ele geçirmiş ve binaları koğuşa çevirmiş, içerisi dar ve sıkışık.\n\nBatısındaki dev kayaların arasından patikalar geçiyor, kuzeydeki ormandan hastaneye inebilirsin. Çatıda bir helipad ve çevreyi uzaktan gören iyi bir gözetleme noktası var.',
  },
  {
    id: 'the-grid', ad: 'The Grid', tr: 'Tahkimatlı Şehir Merkezi', tur: 'ana', nokta: 'r6016',
    tehlike: 'asiri',
    tehlikeDetay: [{ ad: 'The Grid', seviye: 'kritik' }, { ad: 'Netshin Tech Complex', seviye: 'asiri' }, { ad: 'DBN Headquarters', seviye: 'kritik' }, { ad: 'Hanex Bank', seviye: 'kritik' }, { ad: 'Minsok Art School', seviye: 'kritik' }, { ad: 'Construction Zone', seviye: 'kritik' }],
    aciklama: 'Hajin şehir merkezinde, dikenli tel ve çelik duvarlarla çevrilmiş tahkimatlı bölge. Haritanın en tehlikeli yeri. Sokaklar barikatlı, her yerde gözetleme kulesi ve devriye var, kaçış yolu az.\n\nİçinde Hanex Bank kulesi, Hajin\'in en yüksek binası olan DBN TV kulesi, Minsok Sanat Okulu ve doğuda büyük bir inşaat alanı var. En tehlikelisi kırmızı çatılı ikiz kule Netshin Tech Complex. Önce çatılarda, sonra sokak sokak çatışma bekle.',
  },
  {
    id: 'songdo-wharf', ad: 'Songdo Wharf', tr: 'Songdo Rıhtımı', tur: 'ana', nokta: 'r6017',
    tehlike: 'dusuk',
    tehlikeDetay: [{ ad: 'Songdo Wharf', seviye: 'dusuk' }, { ad: 'Oamsik Turtle Island', seviye: 'dusuk' }, { ad: 'Shoreline Station', seviye: 'dusuk' }],
    aciklama: 'Şehrin doğu kıyısı. Kuzeyde nükleer santrale, güneyde nehrin güney koluna kadar uzanıyor. Tren ve monoray hatları hâlâ çalışıyor.\n\nKuzeyde bölgenin en yüksek binası olan La Grande Vie lüks apartmanı, kıyıda çadırlı bir pazar, iskele ve deniz feneri var. Kıyıdaki kayalık Oamsik Kaplumbağa Adası keşif yapmak ya da saklanmak için iyi. Güney ucuna yakın zamanda bir çıkarma yapılmış.',
  },
  {
    id: 'wolves-stadium', ad: 'Wolves Stadium', tr: 'Wolves Stadyumu', tur: 'ana', nokta: 'r6018',
    tehlike: 'orta',
    tehlikeDetay: [{ ad: 'Wolves Stadium', seviye: 'orta' }, { ad: 'Theatre', seviye: 'orta' }],
    aciklama: 'Şehrin güneyinde harabeye dönmüş bir beyzbol stadyumu. Kuzeyinde terk edilmiş bir açık hava tiyatrosu var. Çevresi karakol, banka, küçük AVM\'ler ve dar sokaklardan oluşuyor.\n\nEn tehlikeli kısım kuzeydeki The Grid sınırı.',
  },
  {
    id: 'hajin-river-heights', ad: 'Hajin River Heights', tr: 'Hajin Nehir Tepeleri', tur: 'ana', nokta: 'r6019',
    tehlike: 'orta',
    tehlikeDetay: [{ ad: 'Hajin River Heights', seviye: 'orta' }, { ad: 'South Island', seviye: 'orta' }, { ad: 'Jinseo Park Towers', seviye: 'orta' }],
    aciklama: 'Stadyumun güneyinde, saldırılarda ağır hasar görmüş apartmanlar ve dükkanlı dar sokaklar. Nehir kıyısından kuzeydoğuya gidersen apartmanlardan birinin askeri üsse çevrildiğini görürsün, adı Compound Echo.\n\nGüneyde Jinseo Park Towers konutları var. Nehrin ötesindeki Güney Ada\'nın tepesinde tek bir iletişim kulesi duruyor.',
  },

  // --- Kaleler (Fortress) ---
  {
    id: 'kale-the-citadel', ad: 'The Citadel', tr: 'İç Kale', tur: 'kale', ust: '14th-political-prison', nokta: 'r6048',
    tehlike: 'kritik',
    aciklama: 'Cezaevi avlusunun ortasındaki Y şeklindeki bina. Dar metal köprüler, karanlık koridorlar, hücre blokları ve büyük bir fırın odasından oluşuyor. İçeride sesler her yönden geliyor ve kolayca kuşatılabilirsin. Ekip halinde, katları paylaşarak temizleyin.',
  },
  {
    id: 'kale-heavenly-luck-casino', ad: 'Heavenly Luck Casino', tr: 'Heavenly Luck Kumarhanesi', tur: 'kale', ust: 'cheongun-village', nokta: 'r6049',
    tehlike: 'yuksek',
    aciklama: 'Cheongun Köyü\'ndeki çok katlı eski lüks kumarhane. Altında yeraltı otoparkı, katlarında oyun salonları var. Elektrik yok, oyun makinelerinin arası karanlık bir labirent. NVG takmadan girme.',
  },
  {
    id: 'kale-mirae-general-hospital', ad: 'Mirae General Hospital', tr: 'Mirae Genel Hastanesi', tur: 'kale', ust: 'mirae-general-hospital', nokta: 'r6050',
    tehlike: 'dusuk',
    aciklama: 'Hastane binasının kendisi. İçeride çok sayıda koğuş, bekleme salonu ve acil servis var. Katlar ve merdivenler renk kodlu, kaybolmamak için tabelalara bak.',
  },
  {
    id: 'kale-admin-complex-no-2', ad: 'Admin Complex No. 2', tr: '2 Numaralı İdari Bina', tur: 'kale', ust: 'chang-san-air-base', nokta: 'r6051',
    tehlike: null,
    aciklama: 'Chang-san Hava Üssü\'nün içindeki kale. Üs haritanın en tehlikeli yerlerinden biri: dış alan Kritik, yeraltı sığınağı Aşırı. Hemen yanında klinikler, mühimmat sandıkları ve bir İHA kulesi var; girmeden önce ikmalini tamamla.',
  },
  {
    id: 'kale-re-education-center', ad: 'Re-Education Center', tr: 'Yeniden Eğitim Merkezi', tur: 'kale', ust: 'deadtown', nokta: 'r6052',
    tehlike: 'orta',
    aciklama: 'Ölü Kasaba\'nın ortasındaki iki büyük bina. Kasabadaki düşmanın en yoğun olduğu yer. Değerli hedefler genelde bu büyük, süslü binaların içinde.',
  },
  {
    id: 'kale-rice-mill', ad: 'Rice Mill', tr: 'Pirinç Değirmeni', tur: 'kale', ust: 'imjin-farmland', nokta: 'r6053',
    tehlike: 'orta',
    aciklama: 'Imjin Tarlaları\'na hakim büyük sanayi değirmeni. Etrafı açık arazi olduğu için yaklaşırken görünürsün. Depoları siper alarak ilerle, içeride yakın mesafe silahı kullan.',
  },
  {
    id: 'kale-nurigo-mall', ad: 'NuriGO Mall', tr: 'NuriGO AVM', tur: 'kale', ust: 'nurigo-mall', nokta: 'r6054',
    tehlike: null,
    aciklama: 'Yerin altındaki büyük alışveriş merkezi. Girişler avludaki yuvarlak yapılardan, biri asansör. Koridorlar uzun ve karanlık, NVG kullan.',
  },

  // --- Ara bölgeler ---
  {
    id: 'jayon-warehouses', ad: 'Jayon Warehouses', tr: 'Jayon Depoları', tur: 'ara', nokta: 'r6020', tehlike: null,
    aciklama: 'Haritanın kuzeybatı köşesindeki depo alanı. Hemen yanında bir giriş (Infil) ve bir çıkış (Exfil) noktası var.',
  },
  {
    id: 'russian-border-crossing-west', ad: 'Russian Border Crossing (West)', tr: 'Rus Sınır Kapısı (Batı)', tur: 'ara', nokta: 'r6021', tehlike: null,
    aciklama: 'Kuzeybatıda, Rusya sınırındaki kontrol noktası. Yanında iki giriş noktası ve bir son çıkış (Final Exfil) var; tekne benzinliği ve itfaiye de yakın.',
  },
  {
    id: 'russian-border-crossing', ad: 'Russian Border Crossing', tr: 'Rus Sınır Kapısı', tur: 'ara', ust: 'cheongun-village', nokta: 'r6022',
    tehlike: 'dusuk',
    aciklama: 'Cheongun Köyü\'nün doğu ucundaki Rusya sınır kontrol noktası.',
  },
  {
    id: 'russian-border-crossing-east', ad: 'Russian Border Crossing (East)', tr: 'Rus Sınır Kapısı (Doğu)', tur: 'ara', nokta: 'r6023', tehlike: null,
    aciklama: 'Kuzeydoğuda, Haneul Nükleer Reaktörü\'ne yakın sınır kontrol noktası. Çevresinde iki İHA kulesi, bir Teğmen Kulesi ve iki benzinlik var.',
  },
  {
    id: 'hanrim-village', ad: 'Hanrim Village', tr: 'Hanrim Köyü', tur: 'ara', nokta: 'r6024', tehlike: null,
    aciklama: 'Kuzeyde, Rus Sınır Kapısı (Batı) ile Devrim Barajı arasındaki küçük köy. Yakınında bir giriş noktası, tekne benzinliği, itfaiye ve bir sığınak var.',
  },
  {
    id: 'revolution-dam', ad: 'Revolution Dam', tr: 'Devrim Barajı', tur: 'ara', nokta: 'r6025',
    tehlike: null,
    aciklama: 'Sağlam kalmış önemli bir baraj. Askeri polis burayı sıkı tutuyor. Tong-il Köyü hemen güneydoğusunda.',
  },
  {
    id: 'tong-il-village', ad: 'Tong-il Village', tr: 'Tong-il Köyü', tur: 'ara', nokta: 'r6026',
    tehlike: null,
    aciklama: 'Hajin Nehri\'nin kuzey deltasındaki taşkın ovasında eski bir çiftçi köyü. Eski bir liderin büyük heykeliyle kolay tanınır.',
  },
  {
    id: 'pyonghwa-village', ad: 'Pyonghwa Village', tr: 'Pyonghwa Köyü', tur: 'ara', nokta: 'r6027',
    tehlike: null,
    aciklama: 'Nehrin batısındaki düzlükte birkaç ev ve tarla. Yarısı yıkılmış duba köprüsünden araçla nehrin karşısına hızlıca geçebilirsin.',
  },
  {
    id: 'namjin-riverside', ad: 'Namjin Riverside', tr: 'Namjin Nehir Kıyısı', tur: 'ara', nokta: 'r6028',
    tehlike: null,
    aciklama: 'Haritanın güney kenarı, nehrin güney koluna yakın. Bir tünel çıkışının yanında terk edilmiş sivil araçlar yığılı.',
  },
  {
    id: 'south-island', ad: 'South Island', tr: 'Güney Ada', tur: 'ara', ust: 'hajin-river-heights', nokta: 'r6029',
    tehlike: 'orta',
    aciklama: 'Nehrin güneyindeki ormanlık ada. Tepesinde tek bir iletişim kulesi var.',
  },
  {
    id: 'cheongun-outskirts', ad: 'Cheongun Outskirts', tr: 'Cheongun Kenar Mahalleleri', tur: 'ara', ust: 'cheongun-village', nokta: 'r6030',
    tehlike: 'dusuk',
    aciklama: 'Köyün batısı: daha az bina ve sık orman. Güney Kore sınır kontrolü nehre yakın.',
  },
  {
    id: 'imjin-suburb', ad: 'Imjin Suburb', tr: 'Imjin Banliyösü', tur: 'ara', nokta: 'r6031',
    tehlike: null,
    aciklama: 'Nehir kenarında, ormanlık bir tepenin eteğinde, demiryoluna yakın küçük bir çiftçi mahallesi.',
  },
  {
    id: 'mujin-pass', ad: 'Mujin Pass', tr: 'Mujin Geçidi', tur: 'ara', nokta: 'r6032',
    tehlike: null,
    aciklama: 'İki büyük ormanın arasındaki çukurda küçük bir tarım köyü ve ana yol. Kuzeyinde hastane, güneyinde anten tesisi var. Ormanlık tepelerde keskin nişancı olabilir.',
  },
  {
    id: 'daesong-ridge', ad: 'Daesong Ridge', tr: 'Daesong Sırtı', tur: 'ara', nokta: 'r6033',
    tehlike: null,
    aciklama: 'Imjin Tarlaları\'nın kuzeydoğusunda kırsal bir yerleşim. Delik deşik yol boyunca yanmış zırhlı araç (APC) enkazları var.',
  },
  {
    id: 'oamsik-turtle-islands', ad: 'Oamsik Turtle Islands', tr: 'Oamsik Kaplumbağa Adaları', tur: 'ara', ust: 'songdo-wharf', nokta: 'r6034',
    tehlike: 'dusuk',
    aciklama: 'Songdo kıyısındaki kayalık adacıklar. Keşif yapmak ya da saklanmak için iyi.',
  },
  {
    id: 'nurigo-west', ad: 'NuriGO West', tr: 'NuriGO Batı', tur: 'ara', ust: 'nurigo-mall', nokta: 'r6035',
    tehlike: 'yuksek',
    aciklama: 'AVM bölgesinin batısı. Hastaneye yakın apartman blokları burada.',
  },
  {
    id: 'shoreline-station', ad: 'Shoreline Station', tr: 'Sahil İstasyonu', tur: 'ara', ust: 'songdo-wharf', nokta: 'r6036',
    tehlike: 'dusuk',
    aciklama: 'Songdo Wharf\'ın kuzey ucunda, doğu kıyısındaki istasyon. Tehlikesi düşük ama çevresi kalabalık: çıkış ve son çıkış noktaları, bir kayıp ikmal sandığı ve Oamsik Turtle Islands kıyısındaki roketler hemen yakında.',
  },
  {
    id: 'nurigo-east', ad: 'NuriGO East', tr: 'NuriGO Doğu', tur: 'ara', ust: 'nurigo-mall', nokta: 'r6037',
    tehlike: 'orta',
    aciklama: 'NuriGO Mall\'un doğu tarafı. İtfaiye neredeyse aynı yerde; çevresinde karakol, benzinlik, mühimmat sandıkları, hikaye görevi girişleri ve iki Colossus alanı var.',
  },
  {
    id: 'dbn-headquarters', ad: 'DBN Headquarters', tr: 'DBN Genel Merkezi', tur: 'ara', ust: 'the-grid', nokta: 'r6038',
    tehlike: 'kritik',
    aciklama: 'The Grid içinde. DBN TV kulesi Hajin\'in en yüksek binası.',
  },
  {
    id: 'hanex-bank', ad: 'Hanex Bank', tr: 'Hanex Bankası', tur: 'ara', ust: 'the-grid', nokta: 'r6039',
    tehlike: 'kritik',
    aciklama: 'The Grid içinde, tarihi Donpyeong Kapısı ve belediye binasının yakınındaki banka kulesi.',
  },
  {
    id: 'construction-zone', ad: 'Construction Zone', tr: 'İnşaat Alanı', tur: 'ara', ust: 'the-grid', nokta: 'r6040',
    tehlike: 'kritik',
    aciklama: 'The Grid\'in doğusunda birkaç sokak bloğuna yayılan inşaat alanı.',
  },
  {
    id: 'songdo-pier', ad: 'Songdo Pier', tr: 'Songdo İskelesi', tur: 'ara', ust: 'songdo-wharf', nokta: 'r6041',
    tehlike: null,
    aciklama: 'Pazardan bir köprüyle geçilen iskele ve deniz feneri.',
  },
];
