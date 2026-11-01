// BİZİM eklediğimiz harita noktaları: giriş/çıkış noktaları, boss alanları, sığınaklar, anahtarlı kapılar...
// Resmi noktalar veri/resmi_noktalar.js dosyasında, ona dokunma.
//
// KAYNAK: Her noktanın nereden geldiğini "kaynak" alanında tutuyoruz:
//   (yazılmazsa) -> ekibin kendi bulduğu nokta, haritada "Ekip" rozeti çıkar
//   'dmzhub'     -> DMZHub haritasından alınan nokta, haritada "Kaynak: DMZHub" yazar.
//                   Site herkese açık yayınlanacaksa önce DMZHub'dan izin al (contact@dmzhub.gg).
//                   İzin yoksa veri/site.js içinde dmzhubVerileri: false yap, bu noktalar gizlenir.
//   'ipucu'      -> oyunun kendi ipucundaki yer (ör. 3D yazıcının "Ingredient Locations" ekranı),
//                   haritada "Oyun ipucu" yazar. Yerini biz yerleştirdik.
//   'rapor'      -> rehber sitelerinin ve oyuncuların anlattığı yer (ör. silah kılavuzunun çok çıktığı yerler),
//                   haritada "Oyuncu raporu" yazar. Yerini biz yerleştirdik.
//
// Yeni nokta eklemek için:
//   1. Sitede Harita sayfasını aç, sağ üstteki "Koordinat" düğmesine bas.
//   2. Haritada noktanın olduğu yere tıkla, çıkan satırı kopyala.
//   3. Aşağıdaki listeye yapıştır, ad / kategori / aciklama alanlarını doldur.
// Oyun içi taktik harita ekran görüntüsü gönderirsen noktaları görüntüden otomatik de yerleştirebiliriz.
//
// Kategoriler: giris, hikaye, cikis, soncikis, boss, keskin, sam, siginak, anahtar, kasa, kayipikmal, roket, malzeme, kilavuz, satinalma, diger
// İsteğe bağlı alanlar: tr (Türkçe adı), nadirlik (anahtar odasında işaretin rengi), anahtar (açan anahtar),
// izgara (oyundaki ızgara kodu, ör. H7), malzemeler (yazıcı malzemesi alanında çıkan malzemeler, veri/malzemeler.js),
// kilavuzlar (oyuncuların o yerde bulduğu silah kılavuzları, eşya kimlikleriyle)
// (tam liste: veri/kategoriler.js)
// "dogrulandi: true" yazarsan noktanın yanında "Doğrulandı" rozeti çıkar.
// "alan: 200" yazarsan noktanın çevresindeki şeffaf daire o yarıçapta çizilir (boss noktalarının
// varsayılanı veri/kategoriler.js içinde).
//
// Örnek:
//   { id: 'cikis-hava-ussu', ad: 'Exfil', kategori: 'cikis', x: 1010, y: 2400,
//     aciklama: 'Helikopter buraya iner. Çevresi açık alan, dikkatli ol.', dogrulandi: true },

window.DMZ = window.DMZ || {};

DMZ.noktalar = [
  // --- Giriş noktaları (Infil) ---
  // Kaynak: ekibin kendi bulup işaretlediği noktalar, 30 Ekim 2026 (kaynak/oyun_ss/ekip_giris_noktalari.webp)
  // Sıra: sol üstten başlayıp saat yönünde haritanın kenarı boyunca
  { id: 'giris-01', ad: 'Infil', kategori: 'giris', x: 1005, y: 1177 }, // Jayon Warehouses
  { id: 'giris-02', ad: 'Infil', kategori: 'giris', x: 1298, y: 1180 }, // Russian Border Crossing (West)
  { id: 'giris-03', ad: 'Infil', kategori: 'giris', x: 1426, y: 1276 }, // Hanrim Village kuzeyi
  { id: 'giris-04', ad: 'Infil', kategori: 'giris', x: 1643, y: 1476 }, // Revolution Dam
  { id: 'giris-05', ad: 'Infil', kategori: 'giris', x: 1747, y: 1738 }, // Tong-il Village
  { id: 'giris-06', ad: 'Infil', kategori: 'giris', x: 1945, y: 1818 }, // Russian Border Crossing
  { id: 'giris-07', ad: 'Infil', kategori: 'giris', x: 2357, y: 1823 }, // Cheongun Village kuzeydoğusu
  { id: 'giris-08', ad: 'Infil', kategori: 'giris', x: 2971, y: 2184 }, // Oamsik Turtle Islands kuzeyi
  { id: 'giris-09', ad: 'Infil', kategori: 'giris', x: 3040, y: 2839 }, // Songdo Pier güneyi
  { id: 'giris-10', ad: 'Infil', kategori: 'giris', x: 2966, y: 3310 }, // South Island güneydoğusu
  { id: 'giris-11', ad: 'Infil', kategori: 'giris', x: 2629, y: 3295 }, // South Island güneyi
  { id: 'giris-12', ad: 'Infil', kategori: 'giris', x: 1946, y: 3275 }, // Namjin Riverside doğusu
  { id: 'giris-13', ad: 'Infil', kategori: 'giris', x: 1535, y: 3276 }, // Namjin Riverside batısı
  { id: 'giris-14', ad: 'Infil', kategori: 'giris', x: 1227, y: 3206 }, // Deadtown güneyi
  { id: 'giris-15', ad: 'Infil', kategori: 'giris', x: 1060, y: 3137 }, // Deadtown güneybatısı
  { id: 'giris-16', ad: 'Infil', kategori: 'giris', x: 886, y: 2571 },  // Chang-san Air Base güneybatısı
  { id: 'giris-17', ad: 'Infil', kategori: 'giris', x: 802, y: 2001 },  // Chang-san Air Base kuzeybatısı
  { id: 'giris-18', ad: 'Infil', kategori: 'giris', x: 970, y: 1565 },  // 14th Political Prison batısı

  // --- Hikaye görevi girişleri (Story Mission Infil) ---
  // Kaynak: aynı görüntü. Hangi noktanın hangi göreve ait olduğu henüz bilinmiyor.
  { id: 'hikaye-01', ad: 'Story Mission Infil', kategori: 'hikaye', x: 1039, y: 2624 }, // Deadtown kuzeybatısı
  { id: 'hikaye-02', ad: 'Story Mission Infil', kategori: 'hikaye', x: 2059, y: 2126 }, // Cheongun Village güneyi
  { id: 'hikaye-03', ad: 'Story Mission Infil', kategori: 'hikaye', x: 2534, y: 2161 }, // Mirae General Hospital doğusu
  { id: 'hikaye-04', ad: 'Story Mission Infil', kategori: 'hikaye', x: 2624, y: 2399 }, // NuriGo Mall
  { id: 'hikaye-05', ad: 'Story Mission Infil', kategori: 'hikaye', x: 2772, y: 2242 }, // Shoreline Station kuzeybatısı

  // ===== Aşağıdakiler DMZHub haritasının ekran görüntülerinden (30 Ekim 2026) =====
  // Kaynak görüntüler: kaynak/dmzhub_ekran_goruntuleri/ (görüntü haritayla otomatik hizalandı)

  // --- Boss alanları (Colossus) ---
  { id: 'boss-01', ad: 'Colossus Spawn', kategori: 'boss', x: 1269, y: 1674, kaynak: 'dmzhub' }, // 14th Political Prison
  { id: 'boss-02', ad: 'Colossus Spawn', kategori: 'boss', x: 2085, y: 1901, kaynak: 'dmzhub' }, // Cheongun Village kuzeyi
  { id: 'boss-03', ad: 'Colossus Spawn', kategori: 'boss', x: 2975, y: 1934, kaynak: 'dmzhub' }, // Haneul Nuclear Reactor doğusu
  { id: 'boss-04', ad: 'Colossus Spawn', kategori: 'boss', x: 2664, y: 2345, kaynak: 'dmzhub' }, // NuriGo Mall
  { id: 'boss-05', ad: 'Colossus Spawn', kategori: 'boss', x: 2038, y: 2549, kaynak: 'dmzhub' }, // Cheonwang Peak Array
  { id: 'boss-06', ad: 'Colossus Spawn', kategori: 'boss', x: 1125, y: 2712, kaynak: 'dmzhub' }, // Deadtown batısı
  { id: 'boss-07', ad: 'Colossus Spawn', kategori: 'boss', x: 2752, y: 2637, kaynak: 'dmzhub' }, // Construction Zone
  { id: 'boss-08', ad: 'Colossus Spawn', kategori: 'boss', x: 2958, y: 2675, kaynak: 'dmzhub' }, // Songdo Wharf doğusu
  { id: 'boss-09', ad: 'Colossus Spawn', kategori: 'boss', x: 1517, y: 2889, kaynak: 'dmzhub' }, // Imjin Farmland güneybatısı
  { id: 'boss-10', ad: 'Colossus Spawn', kategori: 'boss', x: 2224, y: 2858, kaynak: 'dmzhub' }, // Wolves Stadium güneybatısı
  { id: 'boss-11', ad: 'Colossus Spawn', kategori: 'boss', x: 2387, y: 2776, kaynak: 'dmzhub' }, // Wolves Stadium

  // --- Çıkış noktaları (Exfil) ---
  { id: 'cikis-01', ad: 'Exfil', kategori: 'cikis', x: 1015, y: 1154, kaynak: 'dmzhub' }, // Jayon Warehouses
  { id: 'cikis-02', ad: 'Exfil', kategori: 'cikis', x: 1642, y: 1570, kaynak: 'dmzhub' }, // Revolution Dam güneyi
  { id: 'cikis-03', ad: 'Exfil', kategori: 'cikis', x: 1343, y: 1592, kaynak: 'dmzhub' }, // 14th Political Prison doğusu
  { id: 'cikis-04', ad: 'Exfil', kategori: 'cikis', x: 1712, y: 1816, kaynak: 'dmzhub' }, // Tong-il Village
  { id: 'cikis-05', ad: 'Exfil', kategori: 'cikis', x: 1481, y: 2022, kaynak: 'dmzhub' }, // Pyonghwa Village
  { id: 'cikis-06', ad: 'Exfil', kategori: 'cikis', x: 1054, y: 2092, kaynak: 'dmzhub' }, // Chang-san Air Base kuzeyi
  { id: 'cikis-07', ad: 'Exfil', kategori: 'cikis', x: 1936, y: 2039, kaynak: 'dmzhub' }, // Cheongun Outskirts güneyi
  { id: 'cikis-08', ad: 'Exfil', kategori: 'cikis', x: 2053, y: 2050, kaynak: 'dmzhub' }, // Cheongun Village
  { id: 'cikis-09', ad: 'Exfil', kategori: 'cikis', x: 1187, y: 2322, kaynak: 'dmzhub' }, // Chang-san Air Base doğusu
  { id: 'cikis-10', ad: 'Exfil', kategori: 'cikis', x: 1315, y: 2297, kaynak: 'dmzhub' }, // Chang-san Air Base doğusu
  { id: 'cikis-11', ad: 'Exfil', kategori: 'cikis', x: 1326, y: 2197, kaynak: 'dmzhub' }, // Pyonghwa Village güneybatısı
  { id: 'cikis-12', ad: 'Exfil', kategori: 'cikis', x: 2647, y: 2317, kaynak: 'dmzhub' }, // NuriGo Mall
  { id: 'cikis-13', ad: 'Exfil', kategori: 'cikis', x: 1401, y: 2408, kaynak: 'dmzhub' }, // Imjin Suburb batısı
  { id: 'cikis-14', ad: 'Exfil', kategori: 'cikis', x: 2006, y: 2335, kaynak: 'dmzhub' }, // Mujin Pass
  { id: 'cikis-15', ad: 'Exfil', kategori: 'cikis', x: 2700, y: 2553, kaynak: 'dmzhub' }, // Construction Zone kuzeyi
  { id: 'cikis-16', ad: 'Exfil', kategori: 'cikis', x: 2894, y: 2519, kaynak: 'dmzhub' }, // Shoreline Station güneyi
  { id: 'cikis-17', ad: 'Exfil', kategori: 'cikis', x: 1023, y: 2688, kaynak: 'dmzhub' }, // Deadtown batısı
  { id: 'cikis-18', ad: 'Exfil', kategori: 'cikis', x: 1116, y: 2750, kaynak: 'dmzhub' }, // Deadtown batısı
  { id: 'cikis-19', ad: 'Exfil', kategori: 'cikis', x: 1764, y: 2652, kaynak: 'dmzhub' }, // Imjin Farmland kuzeydoğusu
  { id: 'cikis-20', ad: 'Exfil', kategori: 'cikis', x: 2353, y: 2755, kaynak: 'dmzhub' }, // Wolves Stadium
  { id: 'cikis-21', ad: 'Exfil', kategori: 'cikis', x: 2411, y: 2683, kaynak: 'dmzhub' }, // Wolves Stadium kuzeydoğusu
  { id: 'cikis-22', ad: 'Exfil', kategori: 'cikis', x: 3071, y: 2738, kaynak: 'dmzhub' }, // Songdo Pier
  { id: 'cikis-23', ad: 'Exfil', kategori: 'cikis', x: 3135, y: 2711, kaynak: 'dmzhub' }, // Songdo Pier
  { id: 'cikis-24', ad: 'Exfil', kategori: 'cikis', x: 2028, y: 2827, kaynak: 'dmzhub' }, // Daesong Ridge güneyi
  { id: 'cikis-25', ad: 'Exfil', kategori: 'cikis', x: 2375, y: 2833, kaynak: 'dmzhub' }, // Wolves Stadium
  { id: 'cikis-26', ad: 'Exfil', kategori: 'cikis', x: 2269, y: 3099, kaynak: 'dmzhub' }, // Hajin River Heights güneybatısı

  // --- Son çıkışlar (Final Exfil): radyasyon fırtınası kapanırken son kaçış ---
  { id: 'soncikis-01', ad: 'Final Exfil', kategori: 'soncikis', x: 1254, y: 1187, kaynak: 'dmzhub' }, // Russian Border Crossing (West)
  { id: 'soncikis-02', ad: 'Final Exfil', kategori: 'soncikis', x: 3002, y: 2458, kaynak: 'dmzhub' }, // Shoreline Station güneydoğusu
  { id: 'soncikis-03', ad: 'Final Exfil', kategori: 'soncikis', x: 2958, y: 2881, kaynak: 'dmzhub' }, // Songdo Pier güneybatısı
  { id: 'soncikis-04', ad: 'Final Exfil', kategori: 'soncikis', x: 3058, y: 2997, kaynak: 'dmzhub' }, // Songdo Pier güneyi
  { id: 'soncikis-05', ad: 'Final Exfil', kategori: 'soncikis', x: 2797, y: 3241, kaynak: 'dmzhub' }, // South Island güneydoğusu

  // --- Sığınaklar (Bunker / Silo): rögar kapağından girilir ---
  { id: 'siginak-01', ad: 'Bunker', kategori: 'siginak', x: 1219, y: 1428, kaynak: 'dmzhub' }, // 14th Political Prison kuzeyi
  { id: 'siginak-02', ad: 'Bunker', kategori: 'siginak', x: 1556, y: 1608, kaynak: 'dmzhub' }, // Revolution Dam güneybatısı
  { id: 'siginak-03', ad: 'Bunker', kategori: 'siginak', x: 1440, y: 1821, kaynak: 'dmzhub' }, // Pyonghwa Village kuzeyi
  { id: 'siginak-04', ad: 'Bunker', kategori: 'siginak', x: 824, y: 2216, kaynak: 'dmzhub' },  // Chang-san Air Base kuzeybatısı
  { id: 'siginak-05', ad: 'Bunker', kategori: 'siginak', x: 911, y: 2657, kaynak: 'dmzhub' },  // Deadtown batısı
  { id: 'siginak-06', ad: 'Bunker', kategori: 'siginak', x: 862, y: 2866, kaynak: 'dmzhub' },  // Deadtown batısı

  // --- Kayıp ikmal sandıkları (Lost Supply Drop): "Crashed Crate" emri için ---
  // Kaynak görüntü: 5_kayip_ikmal.webp, 30 Ekim 2026
  { id: 'kayipikmal-01', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1778, y: 1965, kaynak: 'dmzhub' }, // Cheongun Outskirts batısı
  { id: 'kayipikmal-02', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 2811, y: 2104, kaynak: 'dmzhub' }, // Haneul Nuclear Reactor güneyi
  { id: 'kayipikmal-03', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1244, y: 2219, kaynak: 'dmzhub' }, // Chang-san Air Base kuzeydoğusu
  { id: 'kayipikmal-04', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 2256, y: 2189, kaynak: 'dmzhub' }, // Mirae General Hospital
  { id: 'kayipikmal-05', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1378, y: 2360, kaynak: 'dmzhub' }, // Pyonghwa Village güneybatısı
  { id: 'kayipikmal-06', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 3009, y: 2334, kaynak: 'dmzhub' }, // Oamsik Turtle Islands
  { id: 'kayipikmal-07', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1085, y: 2483, kaynak: 'dmzhub' }, // Chang-san Air Base güneyi
  { id: 'kayipikmal-08', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 2599, y: 2515, kaynak: 'dmzhub' }, // Hanex Bank
  { id: 'kayipikmal-09', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1444, y: 2687, kaynak: 'dmzhub' }, // Imjin Farmland kuzeybatısı
  { id: 'kayipikmal-10', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1936, y: 2745, kaynak: 'dmzhub' }, // Daesong Ridge
  { id: 'kayipikmal-11', ad: 'Lost Supply Drop', kategori: 'kayipikmal', x: 1931, y: 3049, kaynak: 'dmzhub' }, // Namjin Riverside kuzeydoğusu

  // --- Roketler (Rocket): yere saplanmış patlamamış füze, içinde ganimet ---
  // Kaynak görüntü: 6_roket.webp, 30 Ekim 2026. Oamsik Turtle Islands'taki 4 roket yan yana duruyor (05-08).
  { id: 'roket-01', ad: 'Rocket', kategori: 'roket', x: 1348, y: 2004, kaynak: 'dmzhub' }, // Pyonghwa Village batısı
  { id: 'roket-02', ad: 'Rocket', kategori: 'roket', x: 1810, y: 2291, kaynak: 'dmzhub' }, // Imjin Suburb kuzeydoğusu
  { id: 'roket-03', ad: 'Rocket', kategori: 'roket', x: 2052, y: 2270, kaynak: 'dmzhub' }, // Mujin Pass
  { id: 'roket-04', ad: 'Rocket', kategori: 'roket', x: 2904, y: 2230, kaynak: 'dmzhub' }, // Oamsik Turtle Islands kuzeybatısı
  { id: 'roket-05', ad: 'Rocket', kategori: 'roket', x: 3021, y: 2315, kaynak: 'dmzhub' }, // Oamsik Turtle Islands
  { id: 'roket-06', ad: 'Rocket', kategori: 'roket', x: 3033, y: 2304, kaynak: 'dmzhub' }, // Oamsik Turtle Islands
  { id: 'roket-07', ad: 'Rocket', kategori: 'roket', x: 3044, y: 2293, kaynak: 'dmzhub' }, // Oamsik Turtle Islands
  { id: 'roket-08', ad: 'Rocket', kategori: 'roket', x: 3009, y: 2326, kaynak: 'dmzhub' }, // Oamsik Turtle Islands
  { id: 'roket-09', ad: 'Rocket', kategori: 'roket', x: 1558, y: 2587, kaynak: 'dmzhub' }, // Imjin Farmland kuzeyi
  { id: 'roket-10', ad: 'Rocket', kategori: 'roket', x: 1859, y: 3054, kaynak: 'dmzhub' }, // Namjin Riverside kuzeyi
  { id: 'roket-11', ad: 'Rocket', kategori: 'roket', x: 1894, y: 3148, kaynak: 'dmzhub' }, // Namjin Riverside kuzeydoğusu
  { id: 'roket-12', ad: 'Rocket', kategori: 'roket', x: 2083, y: 3104, kaynak: 'dmzhub' }, // Namjin Riverside doğusu

  // --- Colossus: DMZHub'da sonradan eklenen 2 alan (31 Ekim 2026) ---
  { id: 'boss-12', ad: 'Colossus Spawn', kategori: 'boss', x: 992, y: 2349, kaynak: 'dmzhub' },
  { id: 'boss-13', ad: 'Colossus Spawn', kategori: 'boss', x: 1291, y: 2770, kaynak: 'dmzhub' },

  // --- Anahtar odaları (Key Room): nadirlik anahtarın nadirliği, boşsa anahtarı bilinmiyor ---
  // Kaynak: DMZHub haritası (31 Ekim 2026). Aynı binadaki odalar görünsün diye birkaç piksel aralandı.
  { id: 'anahtar-01', ad: 'Blackmarket Weapons Locker', tr: 'Karaborsa Silah Dolabı', kategori: 'anahtar', x: 1469, y: 1402, nadirlik: 'nadir', anahtar: 'Blackmarket Weapons Locker', izgara: 'C2', aciklama: 'Bodrumda iki silah dolabı var; anahtar sadece birini açıyor, hangisi olacağını sen seçiyorsun.', kaynak: 'dmzhub' },
  { id: 'anahtar-02', ad: 'Silo Control Room', tr: 'Silo Kontrol Odası', kategori: 'anahtar', x: 1226, y: 1450, izgara: 'B2', aciklama: 'Sığınağın içinde, yeraltında.', kaynak: 'dmzhub' },
  { id: 'anahtar-03', ad: 'Police Station Armory', tr: 'Karakol Cephaneliği', kategori: 'anahtar', x: 1647, y: 1515, nadirlik: 'siradisi', anahtar: 'Police Station Armory', izgara: 'D3', kaynak: 'dmzhub' },
  { id: 'anahtar-04', ad: 'Prison Encampment Storage', tr: 'Hapishane Kampı Deposu', kategori: 'anahtar', x: 1388, y: 1710, nadirlik: 'nadir', anahtar: 'Prison Encampment Storage', izgara: 'C3', kaynak: 'dmzhub' },
  { id: 'anahtar-05', ad: 'Haneul Boat House', tr: 'Haneul Kayıkhanesi', kategori: 'anahtar', x: 2967, y: 1807, izgara: 'I4', kaynak: 'dmzhub' },
  { id: 'anahtar-06', ad: 'Silo Control Room', tr: 'Silo Kontrol Odası', kategori: 'anahtar', x: 1461, y: 1815, izgara: 'C4', aciklama: 'Sığınağın içinde, yeraltında.', kaynak: 'dmzhub' },
  { id: 'anahtar-07', ad: 'Reactor 02 Control Room', tr: 'Reaktör 02 Kontrol Odası', kategori: 'anahtar', x: 2870, y: 1832, nadirlik: 'nadir', anahtar: 'Reactor 02 Control Room', izgara: 'I4', aciklama: 'Reaktör 02 binasının içinde. Ya çökmüş sarı reaktör geçidine çıkıp kapının yanına atla, ya da Reaktör 2\'nin 2. katına çıkıp kenardan yürü.', kaynak: 'dmzhub' },
  { id: 'anahtar-08', ad: 'The Chemist\'s Secure Armory', tr: 'Kimyager\'in Güvenli Cephaneliği', kategori: 'anahtar', x: 2942, y: 1839, nadirlik: 'efsanevi', anahtar: 'The Chemist\'s Secure Armory', izgara: 'I4', kaynak: 'dmzhub' },
  { id: 'anahtar-09', ad: 'Reactor DRC Locker', tr: 'Reaktör DRC Dolabı', kategori: 'anahtar', x: 2870, y: 1862, nadirlik: 'ultra', anahtar: 'Reactor DRC Locker', izgara: 'I4', aciklama: 'Çökmüş reaktör havuzunun su altında.', kaynak: 'dmzhub' },
  { id: 'anahtar-10', ad: 'Gun Store Weapons Locker', tr: 'Silah Dükkânı Silah Dolabı', kategori: 'anahtar', x: 2036, y: 1896, nadirlik: 'nadir', anahtar: 'Gun Store Weapons Locker', izgara: 'F4', aciklama: 'Bodrumda üç kilitli dolap.', kaynak: 'dmzhub' },
  { id: 'anahtar-11', ad: 'Jin-Tae\'s Private Lounge', tr: 'Jin-Tae\'nin Özel Salonu', kategori: 'anahtar', x: 2186, y: 1901, nadirlik: 'efsanevi', anahtar: 'Jin-Tae\'s Private Lounge', izgara: 'F4', kaynak: 'dmzhub' },
  { id: 'anahtar-12', ad: 'Counting Room Vault', tr: 'Sayım Odası Kasası', kategori: 'anahtar', x: 2238, y: 1920, nadirlik: 'epik', anahtar: 'Counting Room Vault', izgara: 'F4', aciklama: 'Kumarhanenin ana salonunda, "Cashier" bölümünün arkasında.', kaynak: 'dmzhub' },
  { id: 'anahtar-13', ad: 'Vault Armory', tr: 'Kasa Cephaneliği', kategori: 'anahtar', x: 2186, y: 1931, nadirlik: 'epik', anahtar: 'Vault Armory', izgara: 'F4', kaynak: 'dmzhub' },
  { id: 'anahtar-14', ad: 'Utility Maintenance Storage', tr: 'Bakım Deposu', kategori: 'anahtar', x: 2845, y: 1952, nadirlik: 'nadir', anahtar: 'Utility Maintenance Storage', izgara: 'I4', aciklama: 'Haneul Nükleer Reaktörü\'nde, Reaktör 01\'in yanındaki trafo alanının altındaki bakım odası.', kaynak: 'dmzhub' },
  { id: 'anahtar-15', ad: 'Blackmarket Weapons Locker', tr: 'Karaborsa Silah Dolabı', kategori: 'anahtar', x: 1485, y: 2050, nadirlik: 'nadir', anahtar: 'Blackmarket Weapons Locker', izgara: 'C4', kaynak: 'dmzhub' },
  { id: 'anahtar-16', ad: 'Rail Depot Storage', tr: 'Demiryolu Deposu', kategori: 'anahtar', x: 2028, y: 2058, nadirlik: 'nadir', anahtar: 'Rail Depot Storage', izgara: 'F4', aciklama: 'Yeraltındaki kilitli kapı.', kaynak: 'dmzhub' },
  { id: 'anahtar-17', ad: 'Hazard Storehouse', tr: 'Tehlikeli Madde Deposu', kategori: 'anahtar', x: 2934, y: 2098, nadirlik: 'nadir', anahtar: 'Hazard Storehouse', izgara: 'I5', aciklama: 'Reaktör adasının güneyindeki SAM bataryasının yanındaki depo. İçinde el bombası dolapları ve kimyasal dolapları var (11 taneye kadar görülmüş).', kaynak: 'dmzhub' },
  { id: 'anahtar-18', ad: 'Mechanic\'s Shack', tr: 'Tamirci Kulübesi', kategori: 'anahtar', x: 2084, y: 2114, izgara: 'F5', kaynak: 'dmzhub' },
  { id: 'anahtar-19', ad: 'Mirae Electrical Room', tr: 'Mirae Elektrik Odası', kategori: 'anahtar', x: 2246, y: 2155, nadirlik: 'nadir', anahtar: 'Mirae Electrical Room', izgara: 'F5', kaynak: 'dmzhub' },
  { id: 'anahtar-20', ad: 'The Doctor\'s Command Office', tr: 'Doktor\'un Komuta Ofisi', kategori: 'anahtar', x: 2238, y: 2211, izgara: 'F5', kaynak: 'dmzhub' },
  { id: 'anahtar-21', ad: 'Silo Control Room', tr: 'Silo Kontrol Odası', kategori: 'anahtar', x: 822, y: 2236, izgara: 'A5', aciklama: 'Sığınağın içinde, yeraltında.', kaynak: 'dmzhub' },
  { id: 'anahtar-22', ad: 'Field Depot', tr: 'Saha Deposu', kategori: 'anahtar', x: 1129, y: 2240, izgara: 'B5', aciklama: 'Chang-san Hava Üssü\'nde, kliniğin kuzeydoğusundaki askeri ikmal deposunun 1. katındaki teçhizat bakım odası.', kaynak: 'dmzhub' },
  { id: 'anahtar-23', ad: 'Weapons Mod Workshop', tr: 'Silah Modifiye Atölyesi', kategori: 'anahtar', x: 1008, y: 2268, nadirlik: 'nadir', anahtar: 'Weapons Mod Workshop', izgara: 'B5', aciklama: '2. katta.', kaynak: 'dmzhub' },
  { id: 'anahtar-24', ad: 'Commandant Office', tr: 'Komutan Ofisi', kategori: 'anahtar', x: 1056, y: 2333, nadirlik: 'epik', anahtar: 'Commandant Office', izgara: 'B5', aciklama: 'Hava üssündeki idari binanın (Admin Complex) içinde.', kaynak: 'dmzhub' },
  { id: 'anahtar-25', ad: 'Coin Mining Den', tr: 'Kripto Madencilik Odası', kategori: 'anahtar', x: 2513, y: 2381, nadirlik: 'nadir', anahtar: 'Coin Mining Den', izgara: 'G6', aciklama: '3. katta.', kaynak: 'dmzhub' },
  { id: 'anahtar-26', ad: 'Shopping DRC Locker', tr: 'AVM DRC Dolabı', kategori: 'anahtar', x: 2619, y: 2422, nadirlik: 'ultra', anahtar: 'Shopping DRC Locker', izgara: 'H6', aciklama: 'Yeraltı otoparkında, K9 batarya çekirdeğiyle açılan kapalı bir kapının arkasında. Gece görüş gözlüğü gerekiyor.', kaynak: 'dmzhub' },
  { id: 'anahtar-27', ad: 'Jang-Ui\'s Converted Power Room', tr: 'Jang-Ui\'nin Dönüştürülmüş Enerji Odası', kategori: 'anahtar', x: 2675, y: 2430, nadirlik: 'efsanevi', anahtar: 'Jang-Ui\'s Converted Power Room', izgara: 'H6', aciklama: 'NuriGO Mall\'un en alt katında, robot köpek parkurunun yanındaki kapalı jeneratör odası.', kaynak: 'dmzhub' },
  { id: 'anahtar-28', ad: 'Netshin Security Office', tr: 'Netshin Güvenlik Ofisi', kategori: 'anahtar', x: 2454, y: 2466, izgara: 'G6', aciklama: '14. katta.', kaynak: 'dmzhub' },
  { id: 'anahtar-29', ad: 'Netshin IT Room', tr: 'Netshin Bilgi İşlem Odası', kategori: 'anahtar', x: 2470, y: 2493, nadirlik: 'epik', anahtar: 'Netshin IT Room', izgara: 'G6', aciklama: 'En üstte, boss\'un genelde durduğu büyük sunucu odasında.', kaynak: 'dmzhub' },
  { id: 'anahtar-30', ad: 'Executive Arms Auction', tr: 'Yönetici Silah Müzayedesi', kategori: 'anahtar', x: 2546, y: 2495, nadirlik: 'epik', anahtar: 'Executive Arms Auction', izgara: 'H6', aciklama: 'DBN Headquarters binasının en üst katında.', kaynak: 'dmzhub' },
  { id: 'anahtar-31', ad: 'Roze\'s Highrise Armory', tr: 'Roze\'nin Gökdelen Cephaneliği', kategori: 'anahtar', x: 2497, y: 2511, nadirlik: 'efsanevi', anahtar: 'Roze\'s Highrise Armory', izgara: 'G6', aciklama: 'Gökdelenin çatısından bir iki kat aşağıda. İçinde 2 silah dolabı, 2 taktik çanta, 1 silah sandığı ve bir Teğmen çantası (LT Bag) var; Roze\'nin keskin nişancı tüfeği burada çıkabiliyor.', kaynak: 'dmzhub' },
  { id: 'anahtar-32', ad: 'Hanex Guard Station', tr: 'Hanex Güvenlik Noktası', kategori: 'anahtar', x: 2594, y: 2527, nadirlik: 'epik', anahtar: 'Hanex Guard Station', izgara: 'H6', aciklama: 'Çatının bir alt katında, kasa dairesi kapısının yanındaki odada.', kaynak: 'dmzhub' },
  { id: 'anahtar-33', ad: 'Haejeok Radio Station', tr: 'Haejeok Radyo İstasyonu', kategori: 'anahtar', x: 1672, y: 2543, nadirlik: 'nadir', anahtar: 'Haejeok Radio Station', izgara: 'D6', kaynak: 'dmzhub' },
  { id: 'anahtar-34', ad: 'Gun Store Weapons Locker', tr: 'Silah Dükkânı Silah Dolabı', kategori: 'anahtar', x: 2910, y: 2543, nadirlik: 'nadir', anahtar: 'Gun Store Weapons Locker', izgara: 'I6', aciklama: 'Bodrumda üç kilitli dolap.', kaynak: 'dmzhub' },
  { id: 'anahtar-35', ad: 'Lucera Suite 703 Bedroom', tr: 'Lucera Suit 703 Yatak Odası', kategori: 'anahtar', x: 2611, y: 2600, nadirlik: 'epik', anahtar: 'Lucera Suite 703 Bedroom', izgara: 'H6', aciklama: 'Çatıdan hemen önceki en üst katta, dairelerden birinin kapısı kilitli. Senaryo modunda asansörden sonra temizlediğin odalardan biri.', kaynak: 'dmzhub' },
  { id: 'anahtar-36', ad: 'Iskra\'s Control Room', tr: 'Iskra\'nın Kontrol Odası', kategori: 'anahtar', x: 2068, y: 2608, nadirlik: 'efsanevi', anahtar: 'Iskra\'s Control Room', izgara: 'F6', kaynak: 'dmzhub' },
  { id: 'anahtar-37', ad: 'Haksan School Armory', tr: 'Haksan Okulu Cephaneliği', kategori: 'anahtar', x: 1210, y: 2632, nadirlik: 'nadir', anahtar: 'Haksan School Armory', izgara: 'B7', aciklama: 'Okul binasının 2. katında; kilitli kapıya binanın dışından ulaşılıyor.', kaynak: 'dmzhub' },
  { id: 'anahtar-38', ad: 'Underground Equipment Storage', tr: 'Yeraltı Ekipman Deposu', kategori: 'anahtar', x: 1142, y: 2660, izgara: 'B7', aciklama: 'Bodrumda.', kaynak: 'dmzhub' },
  { id: 'anahtar-39', ad: 'Underground Propaganda Store Room', tr: 'Yeraltı Propaganda Deposu', kategori: 'anahtar', x: 1158, y: 2687, nadirlik: 'nadir', anahtar: 'Underground Propaganda Store Room', izgara: 'B7', aciklama: 'Bodrumda. İçinde bir kasa var.', kaynak: 'dmzhub' },
  { id: 'anahtar-40', ad: 'Hanwoori Arts Records Room', tr: 'Hanwoori Sanat Kayıt Odası', kategori: 'anahtar', x: 2594, y: 2689, izgara: 'H7', aciklama: 'Zemin katta. Dikkatli olursan ve susturuculu silahın varsa gizlice girebilirsin.', kaynak: 'dmzhub' },
  { id: 'anahtar-41', ad: 'Re-Education Center Annex', tr: 'Yeniden Eğitim Merkezi Ek Binası', kategori: 'anahtar', x: 1145, y: 2713, nadirlik: 'epik', anahtar: 'Re-Education Center Annex', izgara: 'B7', kaynak: 'dmzhub' },
  { id: 'anahtar-42', ad: 'Gas Station Electrical Room', tr: 'Benzinlik Elektrik Odası', kategori: 'anahtar', x: 2716, y: 2721, nadirlik: 'nadir', anahtar: 'Gas Station Electrical Room', izgara: 'H7', aciklama: 'Bodrumda.', kaynak: 'dmzhub' },
  { id: 'anahtar-43', ad: 'Police Weapon Depository', tr: 'Polis Silah Deposu', kategori: 'anahtar', x: 2441, y: 2770, nadirlik: 'epik', anahtar: 'Police Weapon Depository', izgara: 'G7', aciklama: 'Karakolun yanındaki küçük binada.', kaynak: 'dmzhub' },
  { id: 'anahtar-44', ad: 'Blackmarket Weapons Locker', tr: 'Karaborsa Silah Dolabı', kategori: 'anahtar', x: 1113, y: 2778, nadirlik: 'nadir', anahtar: 'Blackmarket Weapons Locker', izgara: 'B7', aciklama: 'Bodrumda iki dolap var, anahtarla açılıyor.', kaynak: 'dmzhub' },
  { id: 'anahtar-45', ad: 'Old Barber Shop', tr: 'Eski Berber Dükkânı', kategori: 'anahtar', x: 2910, y: 2786, nadirlik: 'nadir', anahtar: 'Old Barber Shop', izgara: 'I7', aciklama: 'Kilitli kapı 1. katta.', kaynak: 'dmzhub' },
  { id: 'anahtar-46', ad: 'Police Station Armory', tr: 'Karakol Cephaneliği', kategori: 'anahtar', x: 2449, y: 2794, nadirlik: 'siradisi', anahtar: 'Police Station Armory', izgara: 'G7', aciklama: 'Karakolun bodrumunda.', kaynak: 'dmzhub' },
  { id: 'anahtar-47', ad: 'Shop Records Room', tr: 'Dükkân Kayıt Odası', kategori: 'anahtar', x: 2262, y: 2827, nadirlik: 'nadir', anahtar: 'Shop Records Room', izgara: 'F7', aciklama: 'Goh24 binasının 2. katında.', kaynak: 'dmzhub' },
  { id: 'anahtar-48', ad: 'Gangbyeon Apartment B', tr: 'Gangbyeon B Apartmanı', kategori: 'anahtar', x: 2562, y: 2845, nadirlik: 'siradisi', anahtar: 'Gangbyeon Apartment B', izgara: 'H7', kaynak: 'dmzhub' },
  { id: 'anahtar-49', ad: 'Militia Arms Depot', tr: 'Milis Silah Deposu', kategori: 'anahtar', x: 2548, y: 2888, nadirlik: 'nadir', anahtar: 'Militia Arms Depot', izgara: 'H7', kaynak: 'dmzhub' },
  { id: 'anahtar-50', ad: 'Gorani\'s Scout Overlook', tr: 'Gorani\'nin Gözetleme Noktası', kategori: 'anahtar', x: 1691, y: 2927, nadirlik: 'efsanevi', anahtar: 'Gorani\'s Scout Overlook', izgara: 'D8', aciklama: 'Kapıya ulaşmak için binanın tepesine tırmanman gerekiyor.', kaynak: 'dmzhub' },
  { id: 'anahtar-51', ad: 'Rice Mill Bunker', tr: 'Pirinç Değirmeni Sığınağı', kategori: 'anahtar', x: 1675, y: 2954, izgara: 'D8', kaynak: 'dmzhub' },
  { id: 'anahtar-52', ad: 'Imjin Mill Foreman\'s Office', tr: 'Imjin Değirmeni Ustabaşı Ofisi', kategori: 'anahtar', x: 1706, y: 2954, nadirlik: 'nadir', anahtar: 'Imjin Mill Foreman\'s Office', izgara: 'D8', kaynak: 'dmzhub' },
  { id: 'anahtar-53', ad: 'Hoesik Supply Room', tr: 'Hoesik İkmal Odası', kategori: 'anahtar', x: 1720, y: 3045, nadirlik: 'epik', anahtar: 'Hoesik Supply Room', izgara: 'D8', kaynak: 'dmzhub' },
  { id: 'anahtar-54', ad: 'Fire Station Storage', tr: 'İtfaiye Deposu', kategori: 'anahtar', x: 1607, y: 3086, izgara: 'D8', kaynak: 'dmzhub' },

  // --- Kasalar (Safe): açınca farklı nadirlikte ganimet çıkar ---
  // Kaynak: DMZHub haritası (31 Ekim 2026). Aynı binadaki kasalar birkaç piksel aralandı.
  { id: 'kasa-01', ad: 'Safe', kategori: 'kasa', x: 1097, y: 1993, izgara: 'B4', aciklama: '2. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-02', ad: 'Safe', kategori: 'kasa', x: 1121, y: 2001, izgara: 'B4', kaynak: 'dmzhub' },
  { id: 'kasa-03', ad: 'Safe', kategori: 'kasa', x: 2153, y: 2018, izgara: 'F4', kaynak: 'dmzhub' },
  { id: 'kasa-04', ad: 'Safe', kategori: 'kasa', x: 2084, y: 2033, izgara: 'F4', kaynak: 'dmzhub' },
  { id: 'kasa-05', ad: 'Safe', kategori: 'kasa', x: 2153, y: 2048, izgara: 'F4', kaynak: 'dmzhub' },
  { id: 'kasa-06', ad: 'Safe', kategori: 'kasa', x: 1704, y: 2067, izgara: 'D5', kaynak: 'dmzhub' },
  { id: 'kasa-07', ad: 'Safe', kategori: 'kasa', x: 1704, y: 2097, izgara: 'D5', aciklama: '2. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-08', ad: 'Safe', kategori: 'kasa', x: 2797, y: 2171, izgara: 'H5', kaynak: 'dmzhub' },
  { id: 'kasa-09', ad: 'Safe', kategori: 'kasa', x: 975, y: 2187, izgara: 'A5', kaynak: 'dmzhub' },
  { id: 'kasa-10', ad: 'Safe', kategori: 'kasa', x: 1113, y: 2213, izgara: 'B5', aciklama: '1. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-11', ad: 'Safe', kategori: 'kasa', x: 1073, y: 2236, izgara: 'B5', aciklama: '2. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-12', ad: 'Safe', kategori: 'kasa', x: 1097, y: 2240, izgara: 'B5', aciklama: '2. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-13', ad: 'Safe', kategori: 'kasa', x: 2489, y: 2430, izgara: 'G6', kaynak: 'dmzhub' },
  { id: 'kasa-14', ad: 'Safe', kategori: 'kasa', x: 2012, y: 2527, izgara: 'E6', aciklama: '1. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-15', ad: 'Safe', kategori: 'kasa', x: 2052, y: 2565, izgara: 'F6', aciklama: '2. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-16', ad: 'Safe', kategori: 'kasa', x: 2756, y: 2592, izgara: 'H6', kaynak: 'dmzhub' },
  { id: 'kasa-17', ad: 'Safe', kategori: 'kasa', x: 2052, y: 2595, izgara: 'F6', aciklama: '4. katta.', kaynak: 'dmzhub' },
  { id: 'kasa-18', ad: 'Safe', kategori: 'kasa', x: 2926, y: 2609, izgara: 'I7', kaynak: 'dmzhub' },
  { id: 'kasa-19', ad: 'Safe', kategori: 'kasa', x: 2926, y: 2639, izgara: 'I7', kaynak: 'dmzhub' },
  { id: 'kasa-20', ad: 'Safe', kategori: 'kasa', x: 1127, y: 2687, izgara: 'B7', aciklama: 'Yeraltında. Önce Yeraltı Propaganda Deposu\'nu (Underground Propaganda Store Room) açman gerekiyor.', kaynak: 'dmzhub' },
  { id: 'kasa-21', ad: 'Safe', kategori: 'kasa', x: 1939, y: 2835, izgara: 'E7', kaynak: 'dmzhub' },
  { id: 'kasa-22', ad: 'Safe', kategori: 'kasa', x: 2539, y: 2861, izgara: 'H7', aciklama: 'Çatıda.', kaynak: 'dmzhub' },
  { id: 'kasa-23', ad: 'Safe', kategori: 'kasa', x: 2585, y: 2861, izgara: 'H7', aciklama: 'Yeraltı otoparkında.', kaynak: 'dmzhub' },
  { id: 'kasa-24', ad: 'Safe', kategori: 'kasa', x: 2335, y: 2881, izgara: 'G8', kaynak: 'dmzhub' },
  { id: 'kasa-25', ad: 'Safe', kategori: 'kasa', x: 2319, y: 2908, izgara: 'G8', kaynak: 'dmzhub' },
  { id: 'kasa-26', ad: 'Safe', kategori: 'kasa', x: 2351, y: 2908, izgara: 'G8', kaynak: 'dmzhub' },
  { id: 'kasa-27', ad: 'Safe', kategori: 'kasa', x: 2125, y: 3013, izgara: 'F8', kaynak: 'dmzhub' },

  // --- SAM bataryaları (SAM Site) ---
  // Kaynak: DMZHub haritası ve ekibin ekran görüntüsü (31 Ekim 2026)
  { id: 'sam-01', ad: 'SAM Site', kategori: 'sam', x: 2805, y: 1952, izgara: 'H4', kaynak: 'dmzhub' },
  { id: 'sam-02', ad: 'SAM Site', kategori: 'sam', x: 2125, y: 2122, izgara: 'F5', kaynak: 'dmzhub' },
  { id: 'sam-03', ad: 'SAM Site', kategori: 'sam', x: 2530, y: 2317, izgara: 'G5', kaynak: 'dmzhub' },
  { id: 'sam-04', ad: 'SAM Site', kategori: 'sam', x: 2439, y: 2493, izgara: 'G6', kaynak: 'dmzhub' },
  { id: 'sam-05', ad: 'SAM Site', kategori: 'sam', x: 2465, y: 2600, izgara: 'G6', kaynak: 'dmzhub' },
  { id: 'sam-06', ad: 'SAM Site', kategori: 'sam', x: 2983, y: 2681, izgara: 'I7', kaynak: 'dmzhub' },
  { id: 'sam-07', ad: 'SAM Site', kategori: 'sam', x: 2343, y: 2705, izgara: 'G7', kaynak: 'dmzhub' },
  { id: 'sam-08', ad: 'SAM Site', kategori: 'sam', x: 1040, y: 2754, izgara: 'B7', kaynak: 'dmzhub' },
  { id: 'sam-09', ad: 'SAM Site', kategori: 'sam', x: 1445, y: 2875, izgara: 'C7', kaynak: 'dmzhub' },
  { id: 'sam-10', ad: 'SAM Site', kategori: 'sam', x: 2222, y: 2875, izgara: 'F7', kaynak: 'dmzhub' },
  { id: 'sam-11', ad: 'SAM Site', kategori: 'sam', x: 2576, y: 2888, izgara: 'H7', kaynak: 'dmzhub' },
  { id: 'sam-12', ad: 'SAM Site', kategori: 'sam', x: 2797, y: 3078, izgara: 'H8', kaynak: 'dmzhub' },

  // --- 3D yazıcı malzemesi alanları: oyunun "Ingredient Locations" ipucundaki yerler (bilgiler veri/malzemeler.js'te) ---
  // Yerleri bizim yerleştirmemiz: resmi haritadaki bölge ve kalelere, içerideki odalar anahtar odalarına göre.
  // Daire arama alanını gösterir; işaret, kaledeki ikonun üstüne binmesin diye biraz kenarda.
  // Namjjog İstasyonu ve elektrik trafolarının yeri henüz bilinmiyor, onlar haritada yok. Bubun Yard GameRant'a göre
  // Chang-san Hava Üssü'nün içinde, üssün alanına dahil.
  { id: 'malzeme-01', ad: 'Netshin Tech Complex', tr: 'Netshin Teknoloji Kompleksi, sunucu odası', kategori: 'malzeme', x: 2418, y: 2492, alan: 80, izgara: 'G6',
    malzemeler: ['cpu', 'comms-module'], aciklama: 'Gökdelenin en üst katındaki büyük sunucu odası; Netshin IT Room anahtar odası da orada. The Grid haritanın en tehlikeli yerlerinden.', kaynak: 'ipucu' },
  { id: 'malzeme-02', ad: 'Cheonwang Peak Array', tr: 'Cheonwang Zirvesi, sunucu odaları', kategori: 'malzeme', x: 1990, y: 2530, alan: 105,
    malzemeler: ['cpu', 'comms-module'], aciklama: 'Anten dizisinin binalarındaki sunucu odaları. Oyuncular 4. kattaki veri merkezinde (Data Farm) çok sunucu rafı olduğunu yazıyor.', kaynak: 'ipucu' },
  { id: 'malzeme-03', ad: 'Deadtown Hillside Buildings', tr: 'Deadtown, yamaçtaki binalar', kategori: 'malzeme', x: 1310, y: 2715, alan: 90,
    malzemeler: ['cpu', 'comms-module'], aciklama: 'Deadtown\'ın doğusundaki yamaçta, açık mavi cepheli binaların üst katlarındaki bilgisayar odaları. Hangi binada çok çıktığı belli değil.', kaynak: 'ipucu' },
  { id: 'malzeme-04', ad: 'Hangar, Repair Bay, Armory, Barracks', tr: 'Hangar, tamir atölyesi, cephanelik ve koğuşlar', kategori: 'malzeme', x: 985, y: 2235, alan: 165, izgara: 'B5',
    malzemeler: ['structural-alloy', 'alloyed-plating', 'high-tenacity-fibers', 'ballistic-fabric'], aciklama: 'Hangar, tamir atölyeleri ve Bubun Yard\'da Structural Alloy ve Alloyed Plating; cephanelik ve koğuşlarda High-Tenacity Fibers ve Ballistic Fabric. Tamir atölyesi muhtemelen kliniğin batısındaki askeri garaj (Weapons Mod Workshop anahtar odasının binası). Bubun Yard\'ın üssün neresinde olduğu henüz bilinmiyor. Üs aşırı tehlikeli.', kaynak: 'ipucu' },
  { id: 'malzeme-05', ad: 'La Grande Vie Rooftop', tr: 'La Grande Vie otelinin çatısı', kategori: 'malzeme', x: 2840, y: 2720, alan: 85,
    malzemeler: ['high-tenacity-fibers', 'ballistic-fabric'], aciklama: 'Songdo İskelesi\'ndeki otel. Güney taraftaki asansörlerle çık, sonra merdivenle yüksek çatıya. Sayfa 8\'deki Triangulation emri de buraya verici koyduruyor.', kaynak: 'ipucu' },
  { id: 'malzeme-06', ad: 'DRC Lab', tr: 'NuriGO AVM, DRC laboratuvarı', kategori: 'malzeme', x: 2690, y: 2445, alan: 90, izgara: 'H6',
    malzemeler: ['nitro-compounds', 'volatile-explosives'], aciklama: 'AVM\'deki DRC laboratuvarı. Laboratuvarın AVM içindeki tam yeri henüz paylaşılmadı.', kaynak: 'ipucu' },
  { id: 'malzeme-07', ad: 'Citadel Wings & Prison Yard', tr: 'Citadel kanatları ve hapishane avlusu', kategori: 'malzeme', x: 1158, y: 1628, alan: 110, izgara: 'B3',
    malzemeler: ['nylon-cloth', 'nylon-laminate', 'nitro-compounds', 'volatile-explosives'], aciklama: 'Ana binanın kanatlarında Nylon Cloth ve Nylon Laminate, hapishane avlusundaki kimya binalarında Nitro Compounds ve Volatile Explosives.', kaynak: 'ipucu' },
  { id: 'malzeme-08', ad: 'Storage Tents', tr: 'Imjin Tarlaları, depo çadırları', kategori: 'malzeme', x: 1560, y: 2760, alan: 130, izgara: 'D7',
    malzemeler: ['nitro-compounds', 'volatile-explosives'], aciklama: 'Tarlalardaki depo çadırları. Çadırların tam yeri belli değil, bölgedeki çadırlara bak.', kaynak: 'ipucu' },
  { id: 'malzeme-09', ad: 'Underground Holding Area', tr: 'Deadtown, yeraltı tutukevi', kategori: 'malzeme', x: 1100, y: 2735, alan: 75, izgara: 'B7',
    malzemeler: ['nylon-cloth', 'nylon-laminate'], aciklama: 'Yeniden Eğitim Merkezi\'nin altındaki hücreler. Bodrumdaki Yeraltı Propaganda Deposu ve kasa da o katta.', kaynak: 'ipucu' },
  { id: 'malzeme-10', ad: 'Mujin Nightclub', tr: 'Heavenly Luck Casino, Mujin gece kulübü', kategori: 'malzeme', x: 2255, y: 1960, alan: 80, izgara: 'F4',
    malzemeler: ['nylon-cloth', 'nylon-laminate'], aciklama: 'Kumarhanenin içindeki gece kulübü.', kaynak: 'ipucu' },
  { id: 'malzeme-11', ad: 'Haneul Nuclear Reactor', tr: 'Haneul Nükleer Reaktörü', kategori: 'malzeme', x: 2815, y: 1865, alan: 150, izgara: 'I4',
    malzemeler: ['printed-circuit-board', 'power-regulator'], aciklama: 'Reaktör binaları. Oyuncular Reaktör 02\'deki kimyasal depolama kutusunda Power Regulator bulduğunu yazıyor. Radyasyon var, koruyucu kıyafetle gir. İpucunda elektrik trafo binaları da geçiyor ama onların haritada belli bir yeri yok.', kaynak: 'ipucu' },
  { id: 'malzeme-12', ad: 'Mirae General Hospital', tr: 'Mirae Genel Hastanesi ve tıbbi çadırlar', kategori: 'malzeme', x: 2330, y: 2215, alan: 110, izgara: 'F5',
    malzemeler: ['binding-catalyst', 'stabilized-reagents'], aciklama: 'Hastanenin içi ve bahçesindeki triyaj çadırları. İpucundaki "tıbbi çadırlar" (medical tents) muhtemelen bunlar.', kaynak: 'ipucu' },
  { id: 'malzeme-13', ad: 'Rice Mill', tr: 'Pirinç değirmeni', kategori: 'malzeme', x: 1725, y: 2905, alan: 75, izgara: 'D8',
    malzemeler: ['stock-rod', 'turned-components'], aciklama: 'Oyuncular değirmendeki alet sandığında ve alet kutusunda Stock Rod bulduğunu yazıyor.', kaynak: 'ipucu' },
  { id: 'malzeme-14', ad: 'Construction Zone', tr: 'Hajin şehri, inşaat alanı', kategori: 'malzeme', x: 2700, y: 2690, alan: 100, izgara: 'H7',
    malzemeler: ['stock-rod', 'turned-components'], aciklama: 'Hajin şehrinin doğusundaki inşaat alanı.', kaynak: 'ipucu' },

  // --- Silah kılavuzu noktaları: kılavuzun çok çıktığı yazılan yerler (bilgiler veri/kilavuzlar.js ve Rehber'de) ---
  // Kılavuzların sabit yeri yok. Bunlar rehber sitelerinin ve oyuncuların en çok bulduğunu yazdığı yerler;
  // "kilavuzlar" oyuncuların orada bulduğu kılavuzlar. Yerleri bizim yerleştirmemiz. Tren ve sığınaklar haritada
  // nokta olarak yok, Rehber'de anlatılıyor.
  { id: 'kilavuz-01', ad: 'Air Base Barracks', tr: 'Chang-san Hava Üssü, koğuşlar', kategori: 'kilavuz', x: 1060, y: 2190, izgara: 'B5',
    kilavuzlar: ['manual-type-73', 'manual-ppsh-41'], aciklama: 'En çok önerilen yer. Operation Iron Citadel hikaye görevini seç; görev seni üssün yanında başlatır, görevi yapman gerekmiyor. Çevre duvarını takip et, çalıların arkasındaki yıkık yerden içeri gir ve duvarın hemen içindeki üç alçak koğuşu tara: mavi spor çantaları, yeşil sandıklar, dolaplar, yataklar ve banyo dolapları. İçeride düşman yok ama dışarıda nöbetçiler var; ateş edersen bütün üs alarma geçer. Hiç kılavuz çıkmayan turlar da oluyor. Koğuşların üssün tam neresinde olduğunu kaynaklar söylemiyor.', kaynak: 'rapor' },
  { id: 'kilavuz-02', ad: 'Supreme Leader\'s Bunker', tr: 'Yüce Lider Sığınağı', kategori: 'kilavuz', x: 1090, y: 2365, izgara: 'B5',
    aciklama: 'Admin Complex No. 2\'deki merdivenden inilen sığınak. Iron Citadel görevinden çıkan geçiş kartıyla (Supreme Leader\'s Bunker Access Card) açılır. İçinde iki silah dolabı ve bir Teğmen sandığı var.', kaynak: 'rapor' },
  { id: 'kilavuz-03', ad: 'Reactor 02', tr: 'Reaktör 02, ışınlanmış konteyner işleme', kategori: 'kilavuz', x: 2835, y: 1845, izgara: 'I4',
    kilavuzlar: ['manual-kg-7-vulcan', 'manual-mar-9'], aciklama: 'Kliniklerdeki, yerleşkelerdeki, itfaiye ve karakollardaki kimyasal depolardan çıkan ışınlanmış konteyneri (Irradiated Container, sahada açılmaz) buraya getir. Zemin kattaki yıkık sarı platformun yanındaki "Process Radioactive Material" makinesine koy, birkaç saniye sonra çıkan kutuyu ara. Bazı oyuncular neredeyse her seferinde kılavuz çıktığını yazıyor, garanti değil. Ana kapılar kilitli; arka merdiven ve çatı merdiveninden gir. Radyasyon koruyucu kıyafet şart. Reaktör DRC Dolabı da bu binada.', kaynak: 'rapor' },
  { id: 'kilavuz-04', ad: 'Cheonwang Safes', tr: 'Cheonwang Zirvesi, üç kasa', kategori: 'kilavuz', x: 2100, y: 2560,
    kilavuzlar: ['manual-ppsh-41'], aciklama: 'Üç kasa: ana kulenin 4. katında, L şeklindeki binanın 2. katında (arka merdivenden) ve çevredeki küçük binanın zemin katında. Kasalar haritada "Kasa" katmanında da var.', kaynak: 'rapor' },
  { id: 'kilavuz-05', ad: 'Vault Armory & Counting Room', tr: 'Heavenly Luck Casino, kilitli odalar', kategori: 'kilavuz', x: 2190, y: 1890, izgara: 'F4',
    kilavuzlar: ['manual-ppsh-41'], aciklama: 'Kumarhanenin yeraltı otoparkındaki kafesli Kasa Cephaneliği (Vault Armory) ve ana salondaki Sayım Odası kasası (Counting Room Vault). İkisi de anahtarla açılıyor; yerleri Anahtar Odası katmanında.', kaynak: 'rapor' },
  { id: 'kilavuz-06', ad: 'Gangbyeon Apartments', tr: 'Gangbyeon apartmanları', kategori: 'kilavuz', x: 2595, y: 2870, izgara: 'H7',
    aciklama: 'A apartmanının yeraltı otoparkında bir kasa var; B apartmanının anahtarı A\'nın içinde çıkıyor. Çatıdan B\'ye geç: bir silah dolabı ve çatıda bir kasa var. Oyuncuların çok uğradığı, çatışmalı bir yer.', kaynak: 'rapor' },
];
