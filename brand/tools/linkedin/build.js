// Couverture LinkedIn BLACKVAULT, direction « Signal souverain » (variante A retenue, corrections des critiques).
// Mise en page à 1128 x 188 px CSS (ratio 6:1), export 4200 x 700 (taille de téléversement recommandée par LinkedIn).
// Usage : node build.js  -> écrit cover.html, puis les PNG/JPG et les aperçus dans assets/linkedin/.
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const REPO = path.resolve(__dirname, '../../..');
const OUT = path.join(REPO, 'assets/linkedin');
const FONTS = path.join(REPO, 'plugin/blackvault-design/assets/fonts');
const AVATAR = 'file://' + path.join(REPO, 'assets/favicon/blackvault-icon-512.png');
const W = 1128, H = 188, EXPORT_W = 4200;
const DSF = EXPORT_W / W; // 3,7234 -> 4200 x 700

const C = { bg: '#070B10', bgAlt: '#0B121A', borderStrong: '#2A3B4D', ink: '#E6EDF4', muted: '#93A3B5', accentSoft: '#5EAAE3', signal: '#F2B138' };
const f = (n) => Number(n.toFixed(1));

// Rails : 13 lignes qui entrent par la droite et convergent vers un nœud creux.
const node = { x: 930, y: H / 2, ring: 15 };
const railStartX = W + 6, span = railStartX - node.x, END_R = 28, LEAD = 46, MAXANG = 45;
const offsets = [-132, -102, -76, -54, -35, -17, 0, 17, 35, 54, 76, 102, 132];
const rails = offsets.map((o, i) => {
  const a = (-MAXANG + i * (2 * MAXANG / (offsets.length - 1))) * Math.PI / 180; // angles d'arrivée réguliers : pas de cône au nœud
  const y0 = node.y + o;
  const p = [railStartX, y0, railStartX - span * 0.30, y0,
    node.x + (END_R + LEAD) * Math.cos(a), node.y + (END_R + LEAD) * Math.sin(a),
    node.x + END_R * Math.cos(a), node.y + END_R * Math.sin(a)];
  const k = Math.abs(o) / 132;
  return { o, p, op: Math.round((0.52 - 0.26 * k) * 100) / 100 };
});
const bez = (a, b, c, d, t) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; };
const onRail = (o, t) => { const r = rails.find((x) => x.o === o).p; return { x: bez(r[0], r[2], r[4], r[6], t), y: bez(r[1], r[3], r[5], r[7], t) }; };
const dots = [
  { o: -54, t: 0.42, c: C.accentSoft, a: 0.75 },
  { o: -17, t: 0.28, c: C.accentSoft, a: 0.6 },
  { o: 35, t: 0.46, c: C.accentSoft, a: 0.75 },
  { o: 54, t: 0.70, c: C.accentSoft, a: 0.7 },
  { o: 17, t: 0.64, c: C.signal, a: 0.95 }, // l'alerte qui compte
].map((d) => ({ ...d, ...onRail(d.o, d.t) }));
for (const d of dots) {
  if (d.x < 12 || d.x > W - 12 || d.y < 22 || d.y > H - 22) throw new Error(`point hors zone : ${JSON.stringify(d)}`);
}

// Étoiles à huit branches (zellige) : deux autour du nœud, et une trame étoiles-croix sous l'avatar.
const octagram = (cx, cy, r) => {
  const s = r * Math.SQRT1_2;
  return `M${f(cx + s)} ${f(cy + s)}L${f(cx - s)} ${f(cy + s)}L${f(cx - s)} ${f(cy - s)}L${f(cx + s)} ${f(cy - s)}Z` +
    `M${f(cx)} ${f(cy + r)}L${f(cx - r)} ${f(cy)}L${f(cx)} ${f(cy - r)}L${f(cx + r)} ${f(cy)}Z`;
};
const star = (cx, cy, R) => {
  const r = R * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8); let p = '';
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, rr = k % 2 ? r : R; p += (k ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a)); }
  return p + 'Z';
};
let lattice = '';
for (let x = 24; x < 340; x += 48) for (let y = H / 2 - 96; y < H + 48; y += 48) lattice += star(x, y, 24);

const out = { x1: 850, x2: node.x - node.ring - 2 };

const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const LATIN_EXT = 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1E9F, U+20A0-20AB, U+20AD-20C0, U+2C60-2C7F, U+A720-A7FF';
const face = (fam, file, w, range) => `@font-face{font-family:'${fam}';src:url('file://${FONTS}/${file}') format('woff2');font-weight:${w};font-display:block;unicode-range:${range};}`;
const fontCss = [
  face('Sora', 'sora-latin-600-normal.woff2', 600, LATIN), face('Sora', 'sora-latin-ext-600-normal.woff2', 600, LATIN_EXT),
  face('IBM Plex Mono', 'ibm-plex-mono-latin-500-normal.woff2', 500, LATIN), face('IBM Plex Mono', 'ibm-plex-mono-latin-ext-500-normal.woff2', 500, LATIN_EXT),
].join('\n');

const svg = `<svg class="art" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
 <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse" x="4" y="6"><circle cx="1" cy="1" r=".9" fill="${C.borderStrong}"/></pattern>
 <linearGradient id="dotFade" x1="0" x2="${W}" y1="0" y2="0" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/>
  <stop offset=".78" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/>
 </linearGradient>
 <mask id="dotMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotFade)"/></mask>
 <linearGradient id="latFade" x1="0" x2="300" y1="0" y2="0" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".55" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
 </linearGradient>
 <mask id="latMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="300" height="${H}" fill="url(#latFade)"/></mask>
</defs>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotMask)"/>
<path d="${lattice}" stroke="${C.accentSoft}" stroke-opacity=".08" mask="url(#latMask)"/>
<path d="${octagram(node.x, node.y, 74)}" stroke="${C.accentSoft}" stroke-opacity=".14"/>
<path d="${octagram(node.x, node.y, 46)}" stroke="${C.accentSoft}" stroke-opacity=".16"/>
<g stroke="${C.accentSoft}" stroke-width="1" stroke-linecap="round">
${rails.map((r) => ` <path d="M${f(r.p[0])} ${f(r.p[1])}C${f(r.p[2])} ${f(r.p[3])} ${f(r.p[4])} ${f(r.p[5])} ${f(r.p[6])} ${f(r.p[7])}" stroke-opacity="${r.op}"/>`).join('\n')}
</g>
${dots.map((d) => `<circle cx="${f(d.x)}" cy="${f(d.y)}" r="${d.c === C.signal ? 2.1 : 1.8}" fill="${d.c}" fill-opacity="${d.a}"/>`).join('\n')}
<path d="M${out.x1} ${node.y}H${out.x2}" stroke="${C.accentSoft}" stroke-opacity=".45" stroke-width="1.2"/>
<circle cx="${out.x1 - 3.5}" cy="${node.y}" r="2.5" fill="${C.bg}" stroke="${C.accentSoft}" stroke-opacity=".6"/>
<circle cx="${node.x}" cy="${node.y}" r="${node.ring}" fill="${C.bgAlt}" stroke="${C.accentSoft}" stroke-opacity=".55"/>
<circle cx="${node.x}" cy="${node.y}" r="3.5" fill="${C.accentSoft}"/>
</svg>`;

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>BLACKVAULT couverture LinkedIn</title><style>
${fontCss}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;background:${C.bg};overflow:hidden}
.cover{position:relative;width:${W}px;height:${H}px;overflow:hidden;-webkit-font-smoothing:antialiased;
 background:linear-gradient(90deg,rgba(11,18,26,0) 0%,rgba(11,18,26,0) 58%,rgba(11,18,26,.9) 100%),${C.bg}}
.art{position:absolute;inset:0}
.copy{position:absolute;left:336px;top:0;height:${H}px;display:flex;flex-direction:column;justify-content:center;gap:16px}
h1{font-family:'Sora',sans-serif;font-weight:600;font-size:38px;line-height:1.08;letter-spacing:-0.026em;color:${C.ink};white-space:nowrap}
h1 .second{color:${C.muted}}
.labels{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;line-height:1;letter-spacing:.12em;text-transform:uppercase;
 color:${C.accentSoft};white-space:nowrap;display:flex;align-items:center;gap:10px}
.labels::before{content:"";width:16px;height:1px;background:${C.accentSoft};opacity:.7;margin-right:2px}
.labels .sep{color:${C.muted};opacity:.6;letter-spacing:0}
</style></head><body><div class="cover">
${svg}
<div class="copy">
 <h1>Un SOC qui décide,<br><span class="second">pas seulement qui alerte.</span></h1>
 <p class="labels"><span>Cyberdéfense</span><span class="sep">·</span><span>IA souveraine</span><span class="sep">·</span><span>SOC 24/7</span></p>
</div></div></body></html>`;
fs.writeFileSync(path.join(__dirname, 'cover.html'), html);

const SYS = '-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
const desktop = (src) => `<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}
body{width:1400px;height:520px;background:#F3F2EF;font-family:${SYS};overflow:hidden}
.card{position:absolute;left:136px;top:24px;width:1128px;height:472px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
.cover{display:block;width:1128px;height:${H}px}.logo{position:absolute;left:24px;top:${H - 66}px;width:132px;height:132px;border:4px solid #fff;border-radius:8px;background:#fff;overflow:hidden}
.logo img{display:block;width:124px;height:124px}.name{position:absolute;left:24px;top:${H + 82}px;font-size:24px;font-weight:600;color:rgba(0,0,0,.9)}
.bar{position:absolute;left:24px;height:10px;border-radius:5px;background:#E8E6E1}.btn{position:absolute;top:${H + 184}px;height:32px;border-radius:16px}</style></head><body>
<div class="card"><img class="cover" src="${src}"><div class="logo"><img src="${AVATAR}"></div><div class="name">BLACKVAULT</div>
<div class="bar" style="top:${H + 126}px;width:520px"></div><div class="bar" style="top:${H + 148}px;width:340px"></div>
<div class="btn" style="left:24px;width:112px;background:#0A66C2"></div><div class="btn" style="left:148px;width:150px;border:1px solid #0A66C2"></div></div></body></html>`;
// Mobile : l'application ne garde que la partie centrale (environ 900 px sur 1128) ; on simule ce recadrage.
const mobile = (src) => { const cw = 390, ch = Math.round(cw * H / 900), iw = Math.round(cw * W / 900); return `<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}
body{width:390px;height:320px;background:#fff;font-family:${SYS};overflow:hidden;position:relative}.top{height:44px;border-bottom:1px solid #E8E6E1}
.crop{width:${cw}px;height:${ch}px;overflow:hidden;position:relative}.crop img{position:absolute;left:${-Math.round((iw - cw) / 2)}px;top:0;width:${iw}px;height:${ch}px}
.logo{position:absolute;left:16px;top:${44 + ch - 36}px;width:72px;height:72px;border:4px solid #fff;border-radius:8px;background:#fff;overflow:hidden}.logo img{display:block;width:64px;height:64px}
.name{position:absolute;left:16px;top:${44 + ch + 48}px;font-size:20px;font-weight:600;color:rgba(0,0,0,.9)}.bar{position:absolute;left:16px;height:8px;border-radius:4px;background:#E8E6E1}</style></head><body>
<div class="top"></div><div class="crop"><img src="${src}"></div><div class="logo"><img src="${AVATAR}"></div><div class="name">BLACKVAULT</div>
<div class="bar" style="top:${44 + ch + 84}px;width:300px"></div><div class="bar" style="top:${44 + ch + 100}px;width:200px"></div></body></html>`; };

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
  const p = await ctx.newPage();
  await p.goto('file://' + path.join(__dirname, 'cover.html'));
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const info = await p.evaluate(() => {
    const fonts = []; document.fonts.forEach((x) => { if (x.status === 'loaded') fonts.push(x.family + ' ' + x.weight); });
    const box = (s) => { const r = document.querySelector(s).getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]; };
    return { fonts, h1: box('h1'), labels: box('.labels') };
  });
  const clip = { x: 0, y: 0, width: W, height: H };
  await p.screenshot({ path: path.join(OUT, 'blackvault-linkedin-couverture-4200x700.png'), clip });
  await p.screenshot({ path: path.join(OUT, 'blackvault-linkedin-couverture-4200x700.jpg'), clip, type: 'jpeg', quality: 92 });
  await ctx.close();
  const src = 'file://' + path.join(OUT, 'blackvault-linkedin-couverture-4200x700.png');
  for (const [name, htmlStr, vw, vh] of [['apercu-desktop.png', desktop(src), 1400, 520], ['apercu-mobile.png', mobile(src), 390, 320]]) {
    const tmp = path.join(__dirname, '_' + name + '.html'); fs.writeFileSync(tmp, htmlStr);
    const c2 = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: name.includes('mobile') ? 3 : 1 });
    const q = await c2.newPage(); await q.goto('file://' + tmp);
    await q.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {})))); await q.waitForTimeout(200);
    await q.screenshot({ path: path.join(OUT, name) }); await c2.close(); fs.unlinkSync(tmp);
  }
  await b.close();
  console.log(JSON.stringify({ ...info, dots: dots.map((d) => [f(d.x), f(d.y)]) }));
})();
