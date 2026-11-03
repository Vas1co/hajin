// Haritada rayların üstünde giden hızlı tren (güzergâh: veri/tren.js). Kuşbakışı, iki ucu gaga burunlu.
// Her vagon rayı ayrı takip eder, virajda tren kıvrılır. Her karede sadece vagonların yeri ve açısı değişir;
// harita görünmüyorsa, sekme arkadaysa ya da harita yakınlaştırılırken hiç iş yapılmaz.
window.DMZ = window.DMZ || {};

DMZ.Tren = (function () {
  const BURUN = '<svg viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true">'
    + '<path class="tren-govde" d="M1 2H55C78 2 93 8 99 13C93 18 78 24 55 24H1Z"/>'
    + '<path class="tren-cam" d="M60 7C72 7 82 10 88 13C82 16 72 19 60 19Z"/>'
    + '<rect class="tren-serit" x="1" y="11" width="56" height="4"/></svg>';
  const ORTA = '<svg viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true">'
    + '<rect class="tren-govde" x="1" y="2" width="98" height="22" rx="3"/>'
    + '<rect class="tren-serit" x="1" y="11" width="98" height="4"/></svg>';
  const ARA = 1.2;    // vagonlar arası boşluk, harita pikseli
  const RAMPA = 2.5;  // kalkışta hızlanma ve durakta yavaşlama süresi, saniye
  const SOLMA = 1.5;  // batı ucunda kaybolma ve geri gelirken belirme süresi, saniye

  // Güzergâh noktalarından yumuşak bir eğri (Catmull-Rom), her ~2 pikselde bir örnek ve baştan uzaklıkları
  function yolOlustur(noktalar) {
    const x = [], y = [], d = [];
    const p = (i) => noktalar[Math.max(0, Math.min(noktalar.length - 1, i))];
    for (let i = 0; i < noktalar.length - 1; i++) {
      const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
      const adim = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 2));
      for (let k = 0; k < adim; k++) {
        const t = k / adim, t2 = t * t, t3 = t2 * t;
        const f = (a, b, c, e) => 0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - e) * t2 + (3 * b - a - 3 * c + e) * t3);
        x.push(f(p0[0], p1[0], p2[0], p3[0])); y.push(f(p0[1], p1[1], p2[1], p3[1]));
      }
    }
    const son = noktalar[noktalar.length - 1];
    x.push(son[0]); y.push(son[1]);
    d.push(0);
    for (let i = 1; i < x.length; i++) d.push(d[i - 1] + Math.hypot(x[i] - x[i - 1], y[i] - y[i - 1]));
    return { x, y, d, boy: d[d.length - 1] };
  }

  // Yolun baştan "m" piksel uzağındaki nokta
  function nokta(yol, m) {
    m = Math.max(0, Math.min(yol.boy, m));
    let a = 0, b = yol.d.length - 1;
    while (b - a > 1) { const o = (a + b) >> 1; if (yol.d[o] <= m) a = o; else b = o; }
    const t = (m - yol.d[a]) / ((yol.d[b] - yol.d[a]) || 1);
    return [yol.x[a] + (yol.x[b] - yol.x[a]) * t, yol.y[a] + (yol.y[b] - yol.y[a]) * t];
  }

  // Bir noktanın yol üstündeki en yakın yerinin baştan uzaklığı
  function izdusum(yol, x, y) {
    let en = Infinity, m = 0;
    for (let i = 0; i < yol.x.length; i++) {
      const u = (yol.x[i] - x) ** 2 + (yol.y[i] - y) ** 2;
      if (u < en) { en = u; m = yol.d[i]; }
    }
    return m;
  }

  // Bir yerden bir yere gidiş: duruştan hızlanıp (bas) seyir hızında gidip duruşa yavaşlar (son).
  // Dönen nesne: süre ve t saniyedeki konum.
  function git(c0, c1, hiz, bas, son) {
    const s = Math.abs(c1 - c0), yon = Math.sign(c1 - c0), ivme = hiz / RAMPA;
    const rampa = hiz * RAMPA / 2; // hızlanırken ya da yavaşlarken alınan yol
    let sure, konum;
    if (bas && son && s < 2 * rampa) { // kısa yol: hiç seyir hızına çıkmadan
      sure = 2 * Math.sqrt(s / ivme);
      konum = (t) => (t < sure / 2 ? ivme * t * t / 2 : s - ivme * (sure - t) ** 2 / 2);
    } else {
      const r1 = bas ? rampa : 0, r2 = son ? rampa : 0;
      sure = (s - r1 - r2) / hiz + (bas ? RAMPA : 0) + (son ? RAMPA : 0);
      konum = (t) => {
        if (bas && t < RAMPA) return ivme * t * t / 2;
        if (son && t > sure - RAMPA) return s - ivme * (sure - t) ** 2 / 2;
        return r1 + hiz * (t - (bas ? RAMPA : 0));
      };
    }
    return { sure, c: (t) => c0 + yon * konum(t), opak: () => 1 };
  }
  const bekle = (c, sure, opak = 1) => ({ sure, c: () => c, opak: () => opak });

  function kur(harita, ll, maxZoom) {
    const hat = DMZ.trenHatti;
    if (!hat || (DMZ.site && DMZ.site.haritaTreni === false)) return;

    const yol = yolOlustur(hat.noktalar);
    const adim = hat.vagonBoyu + ARA;
    const trenBoyu = hat.vagon * adim;
    const enAz = trenBoyu / 2, enCok = yol.boy - trenBoyu / 2;
    const duraklar = hat.duraklar
      .map((d) => ({ ...d, c: Math.max(enAz, Math.min(enCok, izdusum(yol, d.x, d.y))) }))
      .sort((a, b) => a.c - b.c);

    // Bir tur: ilk duraktan batı ucuna giderken her durakta bekler, uçta kaybolur, aynı yoldan geri döner
    const ayaklar = [];
    duraklar.forEach((d, i) => {
      ayaklar.push(bekle(d.c, d.bekle));
      const sonraki = duraklar[i + 1];
      ayaklar.push(sonraki ? git(d.c, sonraki.c, hat.hiz, true, true) : git(d.c, enCok, hat.hiz, true, false));
    });
    const cikis = ayaklar[ayaklar.length - 1];
    cikis.opak = (t) => Math.max(0, Math.min(1, (cikis.sure - t) / SOLMA));
    ayaklar.push(bekle(enCok, hat.gizliBekle, 0));
    for (let i = duraklar.length - 1; i >= 0; i--) {
      const d = duraklar[i];
      const g = i === duraklar.length - 1 ? git(enCok, d.c, hat.hiz, false, true) : git(duraklar[i + 1].c, d.c, hat.hiz, true, true);
      if (i === duraklar.length - 1) g.opak = (t) => Math.max(0, Math.min(1, t / SOLMA));
      ayaklar.push(g);
      if (i > 0) ayaklar.push(bekle(d.c, d.bekle));
    }
    const devir = ayaklar.reduce((t, a) => t + a.sure, 0);

    // Vagonlar: yolda baştan sona dizili; ilkinin burnu geriye, sonuncununki ileriye bakar
    const pane = harita.createPane('tren');
    pane.style.zIndex = 450; // rayın üstünde, işaretlerin altında
    const vagonlar = Array.from({ length: hat.vagon }, (_, i) => {
      const burun = i === 0 || i === hat.vagon - 1;
      const m = L.marker(ll(hat.noktalar[0][0], hat.noktalar[0][1]), {
        pane: 'tren', interactive: false, keyboard: false,
        icon: L.divIcon({ className: 'tren-kap', html: `<div class="tren-vagon">${burun ? BURUN : ORTA}</div>`, iconSize: [0, 0] }),
      }).addTo(harita);
      return { m, el: m.getElement().firstChild, ters: i === 0 };
    });

    // Vagonun ekrandaki boyu yakınlaştırmaya göre; çok uzaktayken de bir çizgi kadar görünsün
    function boyutla() {
      const olcek = 2 ** (harita.getZoom() - maxZoom);
      pane.style.setProperty('--vagon-boy', `${Math.max(5, hat.vagonBoyu * olcek).toFixed(2)}px`);
      pane.style.setProperty('--vagon-en', `${Math.max(2.5, hat.vagonBoyu * 0.27 * olcek).toFixed(2)}px`);
    }

    let sonOpak = -1;
    function ciz(c, opak) {
      if (opak !== sonOpak) { pane.style.opacity = opak; sonOpak = opak; }
      if (opak === 0) return;
      vagonlar.forEach((v, i) => {
        const m = c - trenBoyu / 2 + (i + 0.5) * adim;
        const [x, y] = nokta(yol, m);
        const [ax, ay] = nokta(yol, m - hat.vagonBoyu / 2);
        const [bx, by] = nokta(yol, m + hat.vagonBoyu / 2);
        const aci = Math.atan2(by - ay, bx - ax) * 180 / Math.PI;
        v.m.setLatLng(ll(x, y));
        v.el.style.transform = `translate(-50%, -50%) rotate(${aci.toFixed(1)}deg)${v.ters ? ' scaleX(-1)' : ''}`;
      });
    }

    boyutla();
    harita.on('zoomend', boyutla);

    // Hareketi azalt ayarı açıksa tren kalkış istasyonunda durur
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { ciz(duraklar[0].c, 1); return; }

    let zoomda = false;
    harita.on('zoomstart', () => { zoomda = true; });
    harita.on('zoomend', () => { zoomda = false; });
    const kap = harita.getContainer();
    const baslangic = performance.now();
    function kare(simdi) {
      requestAnimationFrame(kare);
      if (zoomda || document.hidden || !kap.offsetParent) return;
      let t = ((simdi - baslangic) / 1000) % devir;
      for (const a of ayaklar) {
        if (t <= a.sure) { ciz(a.c(t), a.opak(t)); return; }
        t -= a.sure;
      }
    }
    requestAnimationFrame(kare);
  }

  return { kur };
})();
