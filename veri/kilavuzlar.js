// Silah kılavuzlarının (Weapon Manual) nereden çıktığı. Haritadaki "Silah Kılavuzu" noktaları veri/noktalar.js'te,
// ayrıntılı anlatım Rehber'in "Silah kılavuzları nereden çıkar?" bölümünde (veri/rehber.js).
//
// KAYNAK: Rehber siteleri ve oyuncu raporları (Ekim 2026): All Things How, DMZTracker, games.gg, Skycoach,
// ConquestCapped, Games of Food. Kılavuzların sabit doğma yeri yok, rastgele ganimet. Buradakiler kılavuzun
// çok çıktığı yazılan yerler ve oyuncuların tek tek bulduğu kılavuzlar; garanti değil.
//
//   nerede   bütün kılavuz kartlarında görünen genel bilgi
//   bulunan  oyuncuların belli bir yerde bulduğunu yazdığı kılavuzlar (eşya kimliği -> yer)

window.DMZ = window.DMZ || {};

DMZ.kilavuzBilgisi = {
  nerede: 'Sabit yeri yok, rastgele ganimet. En çok kasalarda, yeşil askeri sandıklarda, silah dolaplarında ve Chang-san Hava Üssü koğuşlarındaki mavi spor çantalarında çıkar.',
  bulunan: {
    'manual-type-73': 'Chang-san Hava Üssü koğuşlarında mavi bir spor çantası (Iron Citadel görevi).',
    'manual-ppsh-41': 'Chang-san koğuşlarında bir spor çantası; Heavenly Luck Casino\'nun Kasa Cephaneliği (Vault Armory); Cheonwang Zirvesi\'nde bir kasa.',
    'sang-9mm': 'Hareket eden trende, yolcu koltuğundaki mavi spor çantası (Cheongun Outskirts\'ten geçerken).',
    'manual-mar-9': 'Reaktör DRC Dolabı (Reactor DRC Locker).',
    'manual-kg-7-vulcan': 'Reaktör 02\'de işlenen radyoaktif konteynerden (Irradiated Container).',
  },
};
