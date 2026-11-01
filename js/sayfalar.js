// Ana Sayfa, Lokasyonlar, Görevler ve Eşyalar sayfaları.
window.DMZ = window.DMZ || {};

DMZ.Sayfalar = (function () {
  const { $, $$, kacis, paragraflar, sade, depo, bildirim } = DMZ.yardim;
  const TUR_ADLARI = { ana: 'Ana bölge', ara: 'Ara bölge', kale: 'Kale' };
  const emirSayfalari = DMZ.emirSayfalari;

  // Her sayfanın üstündeki arama kutusu bütün sitede arar (js/arama.js). Sayfanın kendi listesi varsa
  // o liste süzülür, diğer bölümlerde bulunanlar altındaki "Başka bölümlerde" kutusunda çıkar.
  const aramaKutusu = (id, yer) => `
    <label class="arama-kutusu">${DMZ.ikon('ara')}<input type="search" id="${id}" placeholder="${kacis(yer)}" autocomplete="off" enterkeyhint="search" aria-label="Sitede ara"></label>`;
  const digerBolumler = (secenekler) => ({ baslik: 'Başka bölümlerde de var', bossaGizle: true, sinir: 4, ozetEsik: 6, ...secenekler });

  // Bağlantıyla gelinen kartı göster ve bir an parlat. Uzaktaysa (uzun eşya listesi) kaydırmadan direkt atla.
  function vurgula(el, blok = 'center') {
    const uzak = Math.abs(el.getBoundingClientRect().top) > innerHeight * 2;
    el.scrollIntoView({ behavior: uzak ? 'auto' : 'smooth', block: blok });
    el.classList.remove('vurgulu');
    void el.offsetWidth;
    el.classList.add('vurgulu');
  }

  const ornekUyari = (ne) => `
    <div class="uyari-serit">${DMZ.ikon('uyari')}<p><b>Örnek veri.</b> Bu bölümdeki ${ne} düzeni göstermek için konuldu, gerçek bilgilerle değiştirilecek.</p></div>`;

  const tehlikeRozeti = (t) => {
    const bilgi = DMZ.tehlikeler[t];
    return bilgi
      ? `<span class="tehlike tehlike-${t}"><i></i>${kacis(bilgi.ad)}</span>`
      : '<span class="tehlike tehlike-yok"><i></i>Bilinmiyor</span>';
  };

  function sekmeler(kok, secenekler, secili, degisince) {
    kok.innerHTML = secenekler.map((s) => `
      <button class="cip" data-deger="${kacis(s.deger)}" aria-pressed="${s.deger === secili}">${kacis(s.ad)}${s.sayi != null ? `<span>${s.sayi}</span>` : ''}</button>`).join('');
    kok.addEventListener('click', (e) => {
      const d = e.target.closest('button.cip');
      if (!d) return;
      $$('button.cip', kok).forEach((b) => b.setAttribute('aria-pressed', String(b === d)));
      degisince(d.dataset.deger);
    });
  }

  // ---------------- Ana Sayfa ----------------

  function anaSayfa(el) {
    const site = DMZ.site;
    const noktaSayisi = DMZ.tumNoktalar().filter((n) => n.kategori !== 'bolge').length;
    const gercekGorev = emirSayfalari().filter((s) => !s.ornek).reduce((t, s) => t + s.gorevler.length, 0);
    const gercekEsya = DMZ.tumEsyalar().filter((e) => !e.ornek).length;
    const kartlar = [
      { hash: '#/harita', ikon: 'harita', baslik: 'Hajin Haritası', metin: 'Yakınlaştırılabilir harita. Klinik, benzinlik, İHA kulesi, kale... Hepsi Türkçe ve filtrelenebilir.', sayi: `${noktaSayisi} nokta` },
      { hash: '#/lokasyonlar', ikon: 'bolge', baslik: 'Lokasyonlar', metin: 'Bölgeler ve kaleler: neresi tehlikeli, oraya nasıl girilir, içinde ne var.', sayi: `${DMZ.lokasyonlar.length} lokasyon` },
      { hash: '#/gorevler', ikon: 'gorev', baslik: 'Görevler', metin: 'DMZ Orders sayfa sayfa, adım adım Türkçe. Bitirdiğin görevi işaretle.', sayi: gercekGorev ? `${gercekGorev} görev` : 'Hazırlanıyor' },
      { hash: '#/esyalar', ikon: 'esya', baslik: 'Eşyalar', metin: 'Zırh, çanta, sağlık, anahtar, malzeme: ne işe yarar, nerede bulunur.', sayi: gercekEsya ? `${gercekEsya} eşya` : 'Hazırlanıyor' },
      { hash: '#/rehber', ikon: 'kilavuz', baslik: 'Rehber', metin: 'Giriş, çıkış, tehlike seviyeleri, boss\'lar, araçlar ve oyundaki İngilizce terimlerin Türkçe sözlüğü.', sayi: `${(DMZ.rehber || []).length} konu` },
    ];

    // Arama en üstte: oyunda bir şey bulan direkt adını yazsın, sonuçlar hemen altında çıksın
    el.innerHTML = `
      <section class="ana-arama" aria-label="Sitede ara">
        ${aramaKutusu('ana-ara', 'Her şeyi ara: anahtar, eşya, kale, görev…')}
        <div class="genel-sonuclar" id="ana-sonuclar" hidden></div>
      </section>
      <section class="giris">
        <div class="giris-metin">
          <span class="ust-etiket">Modern Warfare 4 · DMZ · Hajin</span>
          <h1>Hajin'de kaybolma.<br><em>Her şey Türkçe.</em></h1>
          <div class="giris-dugmeler">
            <a class="dugme dugme-vurgu dugme-buyuk" href="#/harita">${DMZ.ikon('harita')} Haritayı aç</a>
            <a class="dugme dugme-buyuk" href="#/lokasyonlar">${DMZ.ikon('bolge')} Lokasyonlar</a>
          </div>
        </div>
        <a class="giris-harita" href="#/harita" aria-label="Haritayı aç">
          <img src="harita/tiles/2/1/1.jpg" alt=""><img src="harita/tiles/2/2/1.jpg" alt="">
          <img src="harita/tiles/2/1/2.jpg" alt=""><img src="harita/tiles/2/2/2.jpg" alt="">
          <span class="giris-harita-etiket">${DMZ.ikon('koordinat')} Hajin Dışlama Bölgesi</span>
        </a>
      </section>

      <section class="bolum-kartlari">
        ${kartlar.map((k) => `
          <a class="bolum-karti" href="${k.hash}">
            <span class="bolum-ikon">${DMZ.ikon(k.ikon)}</span>
            <h2>${k.baslik}</h2>
            <p>${k.metin}</p>
            <span class="bolum-alt"><b>${k.sayi}</b>${DMZ.ikon('ok')}</span>
          </a>`).join('')}
      </section>

      <section class="iki-kolon">
        <div class="kutu">
          <h2 class="kutu-baslik">Nasıl kullanılır?</h2>
          <ol class="adim-listesi">
            <li><b>Ne arıyorsan yaz.</b> Her sayfanın üstündeki arama kutusu her şeyde arar: anahtar, eşya, kale, görev, terim. İlk harften süzmeye başlar, Türkçe de yazabilirsin.</li>
            <li><b>Haritayı aç,</b> soldaki listeden görmek istediğin şeyleri seç. Başlıkların yanındaki anahtar o gruptaki her şeyi birden açıp kapatır. Telefonda "Katmanlar" düğmesine bas.</li>
            <li><b>Bir noktaya dokun.</b> Türkçe açıklaması ve oyundaki İngilizce adı çıkar. "İşaretle" dersen oyundaki gibi etrafına altın halka gelir.</li>
            <li><b>"Bağlantıyı kopyala"</b> ile o noktayı ekibine gönder, açan direkt oraya gider.</li>
            <li><b>Yeni misin?</b> Önce <a href="#/rehber">Rehber</a>'i oku: giriş, çıkış ve oyundaki İngilizce terimler orada.</li>
          </ol>
        </div>
        <div class="kutu kutu-vurgu">
          <h2 class="kutu-baslik">Bir şey mi buldun?</h2>
          <p>Bu site oyuncularla büyüyor. Çıkış noktası, anahtarlı kapı, kasa ya da görev bilgisi bulduysan ekran görüntüsünü al ve gönder, ekleyelim.</p>
          <p class="iletisim">${site.iletisim ? kacis(site.iletisim) : 'İletişim bilgisi yakında eklenecek.'}</p>
        </div>
      </section>`;

    DMZ.Arama.bagla($('#ana-ara', el), $('#ana-sonuclar', el), { enter: true });
  }

  // ---------------- Lokasyonlar ----------------

  const lokasyonDurumu = { tur: 'hepsi', sorgu: '' };

  // Kartın "Çevrede" satırı: haritadaki noktalardan bu lokasyona yakın olanların sayısı (yarıçap harita pikseli, yaklaşık)
  const CEVRE_KATEGORILERI = ['giris', 'cikis', 'soncikis', 'boss', 'siginak', 'anahtar', 'kasa', 'kayipikmal', 'roket', 'sam', 'tegmen', 'iha', 'ammo', 'klinik', 'benzinlik', 'tekne', 'itfaiye', 'karakol', 'yerleske'];
  const CEVRE_YARICAP = { ana: 330, kale: 200, ara: 230 };

  function cevredekiler(l, n) {
    const r = CEVRE_YARICAP[l.tur] || 230;
    const sayim = {};
    DMZ.tumNoktalar().forEach((p) => {
      if (CEVRE_KATEGORILERI.includes(p.kategori) && (p.x - n.x) ** 2 + (p.y - n.y) ** 2 <= r * r) {
        sayim[p.kategori] = (sayim[p.kategori] || 0) + 1;
      }
    });
    return CEVRE_KATEGORILERI.filter((k) => sayim[k]).map((k) => {
      const kat = DMZ.kategoriler[k];
      return `<span class="cevre-cip" style="${DMZ.renkStili(kat)}" title="${kacis(kat.ad)}">${DMZ.ikon(kat.ikon)}${sayim[k]}<span class="gizli-metin"> ${kacis(kat.ad)}</span></span>`;
    }).join('');
  }

  // Adımlarında bu lokasyonun adı geçen ya da doğrudan bu lokasyona bağlı DMZ emirleri
  function lokasyonEmirleri(l) {
    const ad = sade(l.ad);
    const sonuc = [];
    emirSayfalari().forEach((s) => s.gorevler.forEach((g) => {
      if (g.lokasyon === l.id || (g.adimlar || []).some((a) => sade(a).includes(ad))) sonuc.push({ s, g });
    }));
    return sonuc;
  }

  function lokasyonKarti(l) {
    const n = DMZ.tumNoktalar().find((x) => x.id === l.nokta);
    const ust = l.ust ? DMZ.lokasyonBul(l.ust) : null;
    const turAd = TUR_ADLARI[l.tur] || '';
    const cevre = n ? cevredekiler(l, n) : '';
    const malzemeler = DMZ.lokasyonMalzemeleri(l.id);
    const emirler = lokasyonEmirleri(l);
    const gorsel = l.foto
      ? `<div class="lok-gorsel"><img src="${kacis(l.foto)}" alt="" loading="lazy"></div>`
      : n ? `<div class="lok-gorsel lok-harita" style="--bx:${1024 - n.x / 2}px;--by:${1024 - n.y / 2}px"><i></i></div>` : '<div class="lok-gorsel"></div>';
    return `
      <article class="lok-kart" id="lok-${kacis(l.id)}" data-tur="${kacis(l.tur)}">
        ${gorsel}
        <div class="lok-govde">
          <div class="lok-ust-satir"><span class="lok-tur lok-tur-${kacis(l.tur)}">${turAd}</span>${tehlikeRozeti(l.tehlike)}</div>
          <h3 lang="en">${kacis(l.ad)}</h3>
          ${l.tr ? `<div class="lok-tr">${kacis(l.tr)}</div>` : ''}
          ${ust ? `<div class="lok-bagli">${DMZ.ikon('bolge')} ${kacis(ust.ad)} içinde</div>` : ''}
          ${l.radyasyon ? `<span class="radyasyon">${DMZ.ikon('radyasyon')} Radyasyon: koruyucu kıyafet şart</span>` : ''}
          ${l.tehlikeDetay && l.tehlikeDetay.length > 1 ? `
            <div class="tehlike-detay" aria-label="Bölgedeki alanların tehlike seviyeleri">
              ${l.tehlikeDetay.map((d) => `<div><span lang="en">${kacis(d.ad)}</span>${tehlikeRozeti(d.seviye)}</div>`).join('')}
            </div>` : ''}
          <div class="lok-aciklama">${l.aciklama ? paragraflar(l.aciklama) : '<p class="soluk">Henüz Türkçe açıklama eklenmedi.</p>'}</div>
          ${cevre ? `<div class="lok-cevre"><small>Çevrede</small>${cevre}</div>` : ''}
          ${malzemeler.length ? `<div class="lok-malzemeler"><small>Burada aranacak yazıcı malzemeleri</small>${DMZ.malzemeCipleri(malzemeler)}</div>` : ''}
          ${emirler.length ? `
            <div class="lok-emirler"><small>Burada geçen DMZ emirleri</small>
              ${emirler.map(({ s, g }) => `<a class="lok-emir" href="#/gorevler?g=${encodeURIComponent(g.id)}"><b>S${kacis(s.sayfa)}</b> ${kacis(g.tr || g.ad)}</a>`).join('')}
            </div>` : ''}
          ${n ? `<a class="dugme dugme-kucuk" href="#/harita?n=${encodeURIComponent(n.id)}">${DMZ.ikon('harita')} Haritada göster</a>` : ''}
        </div>
      </article>`;
  }

  function lokasyonlar(el) {
    const turSayisi = (t) => DMZ.lokasyonlar.filter((l) => l.tur === t).length;
    el.innerHTML = `
      <header class="sayfa-baslik">
        <span class="ust-etiket">Taktik istihbarat</span>
        <h1>Lokasyonlar</h1>
        <p>Hajin'deki bölgeler ve kaleler. Her kartta oyundaki İngilizce adı, Türkçe karşılığı, haritadaki yeri, çevresindeki önemli noktalar ve orada geçen DMZ emirleri var. Tehlike seviyesi oyunda pusulanın altında <b>Threat</b> olarak görünür: Low (Düşük), Medium (Orta), High (Yüksek), Critical (Kritik), Extreme (Aşırı).</p>
      </header>
      <p class="kaynak-notu">Tehlike seviyeleri ve bilgiler Activision'ın <a href="https://www.callofduty.com/blog/2026/10/call-of-duty-modern-warfare-4-dmz-deep-dive-hajin" target="_blank" rel="noopener">resmi Hajin rehberinden</a> (5 Ekim 2026). Kartta gördüğün seviye, bölgedeki en tehlikeli alanınki.</p>
      <div class="arac-cubugu">
        ${aramaKutusu('lok-ara', 'Ara: lokasyon, kale, anahtar, eşya…')}
        <div class="cipler" id="lok-sekmeler"></div>
      </div>
      <div class="genel-sonuclar" id="lok-genel" hidden></div>
      <p class="sonuc-sayisi" id="lok-sayi"></p>
      <div class="lok-izgara" id="lok-izgara"></div>`;

    sekmeler($('#lok-sekmeler', el), [
      { deger: 'hepsi', ad: 'Tümü', sayi: DMZ.lokasyonlar.length },
      { deger: 'ana', ad: 'Ana bölgeler', sayi: turSayisi('ana') },
      { deger: 'kale', ad: 'Kaleler', sayi: turSayisi('kale') },
      { deger: 'ara', ad: 'Ara bölgeler', sayi: turSayisi('ara') },
    ], lokasyonDurumu.tur, (d) => { lokasyonDurumu.tur = d; lokasyonCiz(); });

    lokasyonArama = DMZ.Arama.bagla($('#lok-ara', el), $('#lok-genel', el), digerBolumler({
      haric: ['lokasyon'],
      degisince: (v) => { lokasyonDurumu.sorgu = v; lokasyonCiz(); },
    }));
    lokasyonCiz();
  }

  let lokasyonArama;
  const lokasyonAlanlari = (l) => [
    [l.ad, l.tr],
    [TUR_ADLARI[l.tur], l.ust && (DMZ.lokasyonBul(l.ust) || {}).ad, ...(l.tehlikeDetay || []).map((d) => d.ad)],
    [l.aciklama],
  ];

  function lokasyonCiz() {
    const turdakiler = DMZ.lokasyonlar.filter((l) => lokasyonDurumu.tur === 'hepsi' || l.tur === lokasyonDurumu.tur);
    const { liste, benzer } = DMZ.Arama.suz(turdakiler, lokasyonDurumu.sorgu, lokasyonAlanlari);
    $('#lok-sayi').textContent = benzer ? `Tam eşleşme yok, yazdığına benzeyen ${liste.length} lokasyon` : `${liste.length} lokasyon`;
    $('#lok-izgara').innerHTML = liste.length ? liste.map(lokasyonKarti).join('') : '<p class="bos-durum">Aramana uyan lokasyon yok.</p>';
  }

  function lokasyonVurgula(id) {
    if (!id) return;
    let kart = $(`#lok-${CSS.escape(id)}`);
    if (!kart) {
      // Filtre yüzünden gizliyse filtreyi temizle
      lokasyonDurumu.tur = 'hepsi';
      $('#lok-ara').value = '';
      $$('#lok-sekmeler .cip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.deger === 'hepsi')));
      lokasyonArama.guncelle();
      kart = $(`#lok-${CSS.escape(id)}`);
    }
    if (!kart) return;
    vurgula(kart);
  }

  // ---------------- Görevler ----------------

  const GOREV_ANAHTARI = 'hajin.gorevler.tamam';

  function gorevler(el) {
    const tamam = new Set(depo.oku(GOREV_ANAHTARI, []));
    const sayfalar = emirSayfalari();
    const ornekVar = sayfalar.some((s) => s.ornek);
    const dmzhubVar = sayfalar.some((s) => s.kaynak === 'dmzhub');

    el.innerHTML = `
      <header class="sayfa-baslik">
        <span class="ust-etiket">Operasyonlar</span>
        <h1>Görevler <small>DMZ Orders</small></h1>
        <p>Görevler oyunda sayfa sayfa açılıyor. Bir sayfaya dokun, görevleri adım adım gör, bitirdiğini işaretle. İşaretlerin sadece bu cihazda saklanır.</p>
      </header>
      <div class="rehber-liste gorev-bilgi">${(DMZ.gorevBilgi || []).map(rehberBolumu).join('')}</div>
      <h2 class="ara-baslik">Emir sayfaları</h2>
      ${ornekVar ? ornekUyari('görevler') : ''}
      ${dmzhubVar ? `
      <p class="kaynak-notu">Emirler <a class="rozet rozet-dmzhub" href="https://dmzhub.gg/orders" target="_blank" rel="noopener">Kaynak: DMZHub</a> topluluk verisinden Türkçeleştirildi. Bazı sayfaların adı ve ödülü eksik olabilir; oyunda farklı görürsen haber ver, düzeltelim.</p>` : ''}
      <div class="arac-cubugu">
        ${aramaKutusu('gorev-ara', 'Ara: görev, anahtar, eşya, lokasyon…')}
        ${sayfalar.length ? `<button class="dugme dugme-kucuk" id="gorev-sifirla">${DMZ.ikon('sifirla')} İlerlemeyi sıfırla</button>` : ''}
      </div>
      <div class="genel-sonuclar" id="gorev-genel" hidden></div>
      ${sayfalar.length ? '<p class="sonuc-sayisi" id="gorev-sayi" hidden></p>' : `
      <div class="kutu bos-kutu">
        <p><b>Emir listesi henüz girilmedi.</b> Resmi kaynaklarda emirlerin tam listesi yok, oyundan toplanacak.</p>
        <p>Oyundaki <b>DMZ Emirleri</b> istasyonundan her sayfanın ekran görüntüsünü alıp gönderin. Türkçeleştirip buraya adım adım ekleyelim, bitirdiklerinizi de işaretleyebilirsiniz.</p>
      </div>`}
      <div class="gorev-listesi" id="gorev-listesi">
        ${sayfalar.map((s) => `
          <details class="gorev-sayfa" data-sayfa="${kacis(s.id)}">
            <summary>
              <span class="gorev-no">S${kacis(s.sayfa)}</span>
              <span class="gorev-sayfa-ad">
                <b>${kacis(s.tr || s.ad)}</b>
                <small>${kacis(s.ad)}${s.ornek ? ' · <span class="rozet rozet-ornek">ÖRNEK</span>' : ''}</small>
              </span>
              <span class="gorev-ilerleme"><span class="ilerleme-yazi"></span><span class="ilerleme-cubuk"><i></i></span></span>
            </summary>
            <div class="gorev-icerik">
              ${s.not ? `<p class="gorev-not">${kacis(s.not)}</p>` : ''}
              ${s.gorevler.map((g) => {
                const lok = g.lokasyon ? DMZ.lokasyonBul(g.lokasyon) : null;
                return `
                <div class="gorev" data-gorev="${kacis(g.id)}">
                  <label class="gorev-isaret">
                    <input type="checkbox" data-gorev-id="${kacis(g.id)}" ${tamam.has(g.id) ? 'checked' : ''}>
                    <span class="kutucuk">${DMZ.ikon('onay')}</span>
                    <span class="gorev-ad"><b>${kacis(g.tr || g.ad)}</b><small>${kacis(g.ad)}</small></span>
                  </label>
                  ${g.adimlar && g.adimlar.length ? `<ol class="gorev-adimlar">${g.adimlar.map((a) => `<li>${kacis(a)}</li>`).join('')}</ol>` : ''}
                  ${g.ipucu ? `<p class="gorev-ipucu">${DMZ.ikon('uyari')} ${kacis(g.ipucu)}</p>` : ''}
                  <div class="gorev-alt">
                    ${g.odul ? `<span class="gorev-odul"><small>Ödül</small>${kacis(g.odul)}</span>` : ''}
                    ${lok && lok.nokta ? `<a class="dugme dugme-kucuk" href="#/harita?n=${encodeURIComponent(lok.nokta)}">${DMZ.ikon('harita')} ${kacis(lok.ad)}</a>` : ''}
                  </div>
                </div>`;
              }).join('')}
              ${s.odul ? `<div class="sayfa-odul"><small>Sayfa ödülü</small>${kacis(s.odul)}</div>` : ''}
            </div>
          </details>`).join('')}
      </div>
      <p class="bos-durum" id="gorev-bos" hidden>Aramana uyan emir yok.</p>`;

    const ilerlemeGuncelle = () => {
      $$('.gorev-sayfa', el).forEach((d) => {
        const kutular = $$('input[data-gorev-id]', d);
        const biten = kutular.filter((k) => k.checked).length;
        $('.ilerleme-yazi', d).textContent = kutular.length ? `${biten}/${kutular.length}` : 'bilgi yok';
        $('.ilerleme-cubuk i', d).style.width = kutular.length ? `${(biten / kutular.length) * 100}%` : '0';
        d.classList.toggle('tamamlandi', kutular.length > 0 && biten === kutular.length);
        kutular.forEach((k) => k.closest('.gorev').classList.toggle('bitti', k.checked));
      });
    };

    el.addEventListener('change', (e) => {
      const k = e.target.closest('input[data-gorev-id]');
      if (!k) return;
      if (k.checked) tamam.add(k.dataset.gorevId); else tamam.delete(k.dataset.gorevId);
      depo.yaz(GOREV_ANAHTARI, [...tamam]);
      ilerlemeGuncelle();
    });

    const sifirla = $('#gorev-sifirla', el);
    if (sifirla) sifirla.addEventListener('click', () => {
      if (!confirm('Tüm görev işaretlerin silinsin mi?')) return;
      tamam.clear();
      depo.yaz(GOREV_ANAHTARI, []);
      $$('input[data-gorev-id]', el).forEach((k) => { k.checked = false; });
      ilerlemeGuncelle();
      bildirim('İlerleme sıfırlandı');
    });

    ilerlemeGuncelle();

    // Arama: uyan emirler kalır ve sayfaları açılır; arama silinince arama yüzünden açılan sayfalar yine kapanır
    const tumEmirler = sayfalar.flatMap((s) => s.gorevler.map((g) => ({ s, g })));
    const emirAlanlari = ({ s, g }) => [[g.ad, g.tr], [`s${s.sayfa}`, s.ad, s.tr], [...(g.adimlar || []), g.ipucu, g.odul]];
    const gorevleriSuz = (metin) => {
      const { liste, aktif, benzer } = DMZ.Arama.suz(tumEmirler, metin, emirAlanlari);
      const uyan = new Set(liste.map(({ g }) => g.id));
      $$('.gorev-sayfa', el).forEach((d) => {
        let gorunen = 0;
        $$('.gorev', d).forEach((k) => { k.hidden = aktif && !uyan.has(k.dataset.gorev); if (!k.hidden) gorunen++; });
        d.hidden = aktif && !gorunen;
        if (aktif && gorunen && !d.open) { d.open = true; d.dataset.aramaActi = '1'; }
        if (!aktif && d.dataset.aramaActi) { d.open = false; delete d.dataset.aramaActi; }
      });
      const sayi = $('#gorev-sayi', el);
      if (sayi) {
        sayi.hidden = !aktif || !uyan.size;
        sayi.textContent = benzer ? `Tam eşleşme yok, yazdığına benzeyen ${uyan.size} emir` : `${uyan.size} emir bulundu`;
      }
      $('#gorev-bos', el).hidden = !aktif || uyan.size > 0 || !sayfalar.length;
    };
    gorevArama = DMZ.Arama.bagla($('#gorev-ara', el), $('#gorev-genel', el), digerBolumler({ haric: ['gorev'], degisince: gorevleriSuz }));
  }

  let gorevArama;

  // #/gorevler?g=e17-1 gibi bağlantılar: emrin sayfasını açıp emri vurgula
  function gorevVurgula(id) {
    const kart = $(`.gorev[data-gorev="${CSS.escape(id)}"]`);
    if (!kart) return;
    // Arama yüzünden gizliyse aramayı temizle
    if (kart.hidden || kart.closest('.gorev-sayfa').hidden) { $('#gorev-ara').value = ''; gorevArama.guncelle(); }
    kart.closest('details').open = true;
    vurgula(kart);
  }

  // ---------------- Eşyalar ----------------

  const esyaDurumu = { kategori: 'hepsi', nadirlik: 'hepsi', sorgu: '' };
  let esyaVerisi = [];
  let esyaArama;

  function esyalar(el) {
    esyaVerisi = DMZ.tumEsyalar(); // bizimkiler + DMZHub eşya veritabanı (ortak.js)
    const kategoriSayisi = (k) => esyaVerisi.filter((e) => e.kategori === k).length;
    const ornekVar = esyaVerisi.some((e) => e.ornek);
    const dmzhubVar = esyaVerisi.some((e) => e.kaynak === 'dmzhub');
    el.innerHTML = `
      <header class="sayfa-baslik">
        <span class="ust-etiket">Saha veritabanı</span>
        <h1>Eşyalar</h1>
        <p>Her eşyanın oyundaki İngilizce adı, Türkçe karşılığı, nadirliği, değeri ve biliniyorsa ne işe yaradığı ve nerede bulunduğu.</p>
      </header>
      ${ornekVar ? ornekUyari('eşyalar') : `<p class="kaynak-notu">Açıklamalar Activision'ın resmi DMZ yazılarından. ${dmzhubVar
        ? 'Nadirlik, değer ve yığın bilgileri, diğer eşyalar ve eşya resimleri <a class="rozet rozet-dmzhub" href="https://dmzhub.gg/items" target="_blank" rel="noopener">Kaynak: DMZHub</a> eşya veritabanından; oyun içi görseller Activision\'a aittir.'
        : 'Nadirlik ve fiyatlar oyunda gördükçe eklenecek.'}</p>`}
      <div class="arac-cubugu">
        ${aramaKutusu('esya-ara', 'Ara: eşya, anahtar, lokasyon, görev…')}
        <div class="cipler" id="esya-kategoriler"></div>
        <div class="cipler cipler-nadirlik" id="esya-nadirlik"></div>
      </div>
      <div class="genel-sonuclar" id="esya-genel" hidden></div>
      <p class="sonuc-sayisi" id="esya-sayi"></p>
      <div class="esya-izgara" id="esya-izgara"></div>`;

    sekmeler($('#esya-kategoriler', el), [{ deger: 'hepsi', ad: 'Tümü', sayi: esyaVerisi.length }].concat(
      Object.entries(DMZ.esyaKategorileri).map(([k, kat]) => ({ deger: k, ad: kat.ad, sayi: kategoriSayisi(k) })).filter((s) => s.sayi > 0)
    ), esyaDurumu.kategori, (d) => { esyaDurumu.kategori = d; esyaCiz(); });

    // Nadirlik filtresi sadece veride nadirliği girilmiş eşya varsa çıkar
    const varOlanNadirlikler = Object.entries(DMZ.nadirlikler).filter(([k]) => esyaVerisi.some((e) => e.nadirlik === k));
    if (varOlanNadirlikler.length) {
      sekmeler($('#esya-nadirlik', el), [{ deger: 'hepsi', ad: 'Her nadirlik' }].concat(
        varOlanNadirlikler.map(([k, n]) => ({ deger: k, ad: n.ad }))
      ), esyaDurumu.nadirlik, (d) => { esyaDurumu.nadirlik = d; esyaCiz(); });
      $$('#esya-nadirlik .cip', el).forEach((b) => { if (b.dataset.deger !== 'hepsi') b.classList.add(`nadirlik-${b.dataset.deger}`); });
    } else {
      $('#esya-nadirlik', el).hidden = true;
    }

    esyaArama = DMZ.Arama.bagla($('#esya-ara', el), $('#esya-genel', el), digerBolumler({
      haric: ['esya'],
      degisince: (v) => { esyaDurumu.sorgu = v; esyaCiz(); },
    }));
    esyaCiz();
  }

  const esyaAlanlari = (e) => {
    const kat = DMZ.esyaKategorileri[e.kategori];
    const nad = DMZ.nadirlikler[e.nadirlik];
    const malzeme = (DMZ.malzemeBilgisi || {})[e.id] || {};
    return [[e.ad, e.tr], [kat && kat.ad, nad && nad.ad], [e.not, e.nerede, malzeme.nerede, ...(malzeme.kullanim || [])]];
  };

  // Malzemenin girdiği tarif eşya listesinde varsa adı o eşyanın kartına gider
  let esyaAdlari;
  const tarifAdi = (ad) => {
    esyaAdlari = esyaAdlari || new Map(DMZ.tumEsyalar().map((e) => [sade(e.ad), e]));
    const e = esyaAdlari.get(sade(ad));
    return e ? `<a href="#/esyalar?e=${encodeURIComponent(e.id)}" lang="en">${kacis(ad)}</a>` : `<span lang="en">${kacis(ad)}</span>`;
  };

  function esyaCiz() {
    const secili = esyaVerisi.filter((e) =>
      (esyaDurumu.kategori === 'hepsi' || e.kategori === esyaDurumu.kategori) &&
      (esyaDurumu.nadirlik === 'hepsi' || e.nadirlik === esyaDurumu.nadirlik));
    const { liste, benzer } = DMZ.Arama.suz(secili, esyaDurumu.sorgu, esyaAlanlari);
    $('#esya-sayi').textContent = benzer ? `Tam eşleşme yok, yazdığına benzeyen ${liste.length} eşya` : `${liste.length} eşya`;
    $('#esya-izgara').innerHTML = liste.length ? liste.map((e) => {
      const kat = DMZ.esyaKategorileri[e.kategori] || { ad: e.kategori, ikon: 'esya' };
      const nad = DMZ.nadirlikler[e.nadirlik];
      const lok = e.lokasyon ? DMZ.lokasyonBul(e.lokasyon) : null;
      const odalar = DMZ.anahtarOdalari(e);
      // Yazıcı malzemesiyse oyunun ipucu, yazıcıda üretimi ve haritadaki arama alanları (veri/malzemeler.js);
      // silah kılavuzuysa genel bilgi ve oyuncuların bulduğu yer (veri/kilavuzlar.js)
      const kilavuz = e.kategori === 'kilavuz' ? DMZ.kilavuzBilgisi || {} : null;
      const malzeme = (DMZ.malzemeBilgisi || {})[e.id]
        || (kilavuz ? { nerede: kilavuz.nerede, bulunan: (kilavuz.bulunan || {})[e.id] } : {});
      const alanlar = DMZ.malzemeAlanlari(e.id);
      const nerede = e.nerede || malzeme.nerede;
      const resim = DMZ.esyaResmi(e.id);
      return `
        <article class="esya-kart nadirlik-${kacis(e.nadirlik)}" id="esya-${kacis(e.id)}">
          <div class="esya-ust">
            <span class="esya-ikon${resim ? ' esya-resimli' : ''}">${resim ? `<img src="${kacis(resim)}" alt="" loading="lazy">` : DMZ.ikon(kat.ikon)}</span>
            <div>
              <h3 lang="en">${kacis(e.ad)}</h3>
              ${e.tr ? `<div class="esya-tr">${kacis(e.tr)}</div>` : ''}
            </div>
          </div>
          <div class="esya-rozetler">
            ${nad ? `<span class="nadirlik nadirlik-${kacis(e.nadirlik)}">${kacis(nad.ad)}</span>` : ''}
            <span class="rozet">${kacis(kat.ad)}</span>
            ${e.ornek ? '<span class="rozet rozet-ornek">ÖRNEK</span>' : ''}
          </div>
          <dl class="esya-bilgi">
            ${e.not ? `<div><dt>Ne işe yarar</dt><dd>${kacis(e.not)}</dd></div>` : ''}
            ${nerede ? `<div><dt>Nerede</dt><dd>${kacis(nerede)}</dd></div>` : ''}
            ${malzeme.bulunan ? `<div><dt>Oyuncuların bulduğu yerler</dt><dd>${kacis(malzeme.bulunan)}</dd></div>` : ''}
            ${malzeme.uretim ? `<div><dt>Yazıcıda üretimi</dt><dd>${kacis(malzeme.uretim)}</dd></div>` : ''}
            ${malzeme.kullanim ? `<div><dt>Kullanıldığı tarifler</dt><dd class="tarifler">${malzeme.kullanim.map(tarifAdi).join(', ')}</dd></div>` : ''}
            ${e.deger != null ? `<div><dt>Değer</dt><dd>$${Number(e.deger).toLocaleString('tr-TR')}</dd></div>` : ''}
            ${e.yigin ? `<div><dt>Yığın</dt><dd>En fazla ${kacis(e.yigin)} tane üst üste</dd></div>` : ''}
          </dl>
          ${lok && lok.nokta ? `<a class="dugme dugme-kucuk" href="#/harita?n=${encodeURIComponent(lok.nokta)}">${DMZ.ikon('harita')} ${kacis(lok.ad)}</a>` : ''}
          ${odalar.map((n) => `<a class="dugme dugme-kucuk" href="#/harita?n=${encodeURIComponent(n.id)}">${DMZ.ikon('harita')} Açtığı oda haritada${odalar.length > 1 && n.izgara ? ` (${kacis(n.izgara)})` : ''}</a>`).join('')}
          ${alanlar.length ? `<div class="esya-alanlar"><small>${kilavuz ? 'Haritada' : 'Haritada arama alanı'}</small>${alanlar.map((n) => `<a class="dugme dugme-kucuk" href="#/harita?n=${encodeURIComponent(n.id)}" lang="en">${DMZ.ikon('harita')} ${kacis(n.ad)}</a>`).join('')}</div>` : ''}
          ${kilavuz ? `<a class="dugme dugme-kucuk" href="#/rehber?b=kilavuzlar">${DMZ.ikon('kilavuz')} Kılavuz nereden çıkar?</a>` : ''}
        </article>`;
    }).join('') : '<p class="bos-durum">Aramana uyan eşya yok.</p>';
  }

  // #/esyalar?e=blackmarket-weapons-locker gibi bağlantılar: eşyanın kartını bul ve vurgula
  function esyaVurgula(id) {
    let kart = $(`#esya-${CSS.escape(id)}`);
    if (!kart) {
      // Filtre ya da arama yüzünden gizliyse hepsini temizle
      esyaDurumu.kategori = 'hepsi';
      esyaDurumu.nadirlik = 'hepsi';
      $$('#esya-kategoriler .cip, #esya-nadirlik .cip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.deger === 'hepsi')));
      $('#esya-ara').value = '';
      esyaArama.guncelle();
      kart = $(`#esya-${CSS.escape(id)}`);
    }
    if (!kart) return;
    vurgula(kart);
  }

  // ---------------- Rehber ----------------
  // rehber.js bizim yazdığımız içerik; metin ve maddelerde basit HTML (<b>) kullanılabilir

  function rehber(el) {
    const bolumler = DMZ.rehber || [];
    const bolumHtml = rehberBolumu;

    el.innerHTML = `
      <header class="sayfa-baslik">
        <span class="ust-etiket">Yeni başlayanlar için</span>
        <h1>Rehber</h1>
        <p>DMZ'nin temelleri Türkçe: nasıl girilir, nasıl çıkılır, neye dikkat edilir. En altta oyunda geçen İngilizce terimlerin sözlüğü var.</p>
      </header>
      <p class="kaynak-notu">Kaynak: Activision'ın resmi DMZ yazıları
        (<a href="https://www.callofduty.com/blog/2026/10/call-of-duty-modern-warfare-4-dmz-deep-dive-hajin" target="_blank" rel="noopener">Hajin rehberi</a>,
        <a href="https://www.callofduty.com/blog/2026/10/call-of-duty-modern-warfare-4-dmz-how-to-play-forward-operating-base-guide" target="_blank" rel="noopener">Üs rehberi</a>), kendi cümlelerimizle özetlendi.
        Üretim, anahtarlar, görev noktaları ve dronlar bölümleri DMZ Emirleri'nden ve DMZHub eşya verisinden derlendi.</p>
      <div class="arac-cubugu">${aramaKutusu('rehber-ara', 'Ara: konu, terim, anahtar, eşya…')}</div>
      <div class="genel-sonuclar" id="rehber-sonuclar" hidden></div>
      <nav class="cipler rehber-icindekiler" aria-label="Rehber bölümleri">
        ${bolumler.map((b) => `<button class="cip" data-hedef="rehber-${kacis(b.id)}">${kacis(b.baslik)}</button>`).join('')}
        <button class="cip" data-hedef="rehber-sozluk">Sözlük</button>
      </nav>
      <div class="rehber-liste">
        ${bolumler.map(bolumHtml).join('')}
        <section class="rehber-bolum" id="rehber-sozluk">
          <h2><span class="bolum-ikon">${DMZ.ikon('kilavuz')}</span>Sözlük: oyundaki İngilizce terimler</h2>
          <label class="arama-kutusu">${DMZ.ikon('ara')}<input type="search" id="sozluk-ara" placeholder="Sözlükte ara… (ör. exfil, künye)" autocomplete="off" enterkeyhint="search"></label>
          <dl class="sozluk" id="sozluk-liste"></dl>
        </section>
      </div>`;

    $('.rehber-icindekiler', el).addEventListener('click', (e) => {
      const d = e.target.closest('[data-hedef]');
      if (d) rehberGit(d.dataset.hedef.replace('rehber-', ''));
    });

    // Üstteki kutu bütün sitede arar, rehber konuları ve sözlük önce gelir
    DMZ.Arama.bagla($('#rehber-ara', el), $('#rehber-sonuclar', el), { once: 'rehber', enter: true });

    const sozlukAlanlari = (t) => [[t.en, t.tr], [], [t.aciklama]];
    sozlukCiz = (sorgu) => {
      const { liste, benzer } = DMZ.Arama.suz(DMZ.sozluk || [], sorgu, sozlukAlanlari);
      $('#sozluk-liste', el).innerHTML = (benzer ? '<p class="arama-not sozluk-not">Tam eşleşme yok, yazdığına benzeyenler:</p>' : '') + (liste.length
        ? liste.map((t) => `<div data-terim="${kacis(t.en)}"><dt><span lang="en">${kacis(t.en)}</span><small>${kacis(t.tr)}</small></dt><dd>${kacis(t.aciklama)}</dd></div>`).join('')
        : '<p class="bos-durum">Bu terim sözlükte yok.</p>');
    };
    $('#sozluk-ara', el).addEventListener('input', (e) => sozlukCiz(e.target.value));
    sozlukCiz('');
  }

  let sozlukCiz = () => {};

  // #/rehber?t=Exfil gibi bağlantılar: sözlükte o terimi bul ve vurgula
  function terimVurgula(en) {
    const bul = () => $$('#sozluk-liste [data-terim]').find((d) => d.dataset.terim === en);
    let terim = bul();
    if (!terim) { $('#sozluk-ara').value = ''; sozlukCiz(''); terim = bul(); }
    if (!terim) return;
    vurgula(terim);
  }

  // Rehber ve Görevler sayfalarındaki açıklama kutusu (içerik bizim veri dosyalarımızdan, basit HTML olabilir)
  function rehberBolumu(b) {
    return `
      <section class="rehber-bolum" id="rehber-${kacis(b.id)}">
        <h2><span class="bolum-ikon">${DMZ.ikon(b.ikon)}</span>${kacis(b.baslik)}</h2>
        ${b.metin ? b.metin.split(/\n{2,}/).map((p) => `<p>${p}</p>`).join('') : ''}
        ${b.maddeler ? `<ul class="rehber-maddeler">${b.maddeler.map((m) => `<li>${m}</li>`).join('')}</ul>` : ''}
        ${b.tablo ? `
          <div class="tablo-kap"><table class="rehber-tablo">
            <thead><tr>${b.tablo.basliklar.map((h) => `<th>${kacis(h)}</th>`).join('')}</tr></thead>
            <tbody>${b.tablo.satirlar.map((s) => `<tr>${s.map((h, i) => `<td${i === 0 ? ' class="ilk"' : ''}>${kacis(h)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>` : ''}
        ${b.ipucu ? `<p class="rehber-ipucu">${DMZ.ikon('uyari')}<span><b>İpucu:</b> ${b.ipucu}</span></p>` : ''}
      </section>`;
  }

  function rehberGit(id) {
    const hedef = id && $(`#rehber-${CSS.escape(id)}`);
    if (!hedef) return;
    vurgula(hedef, 'start');
  }

  return { anaSayfa, lokasyonlar, lokasyonVurgula, gorevler, gorevVurgula, esyalar, esyaVurgula, rehber, rehberGit, terimVurgula };
})();
