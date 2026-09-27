// Rend les cartes OG 1200x630 (JPEG) et les PNG du favicon.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const OUT = '/home/user/laanaya/assets';
(async () => {
  const list = JSON.parse(fs.readFileSync((process.env.OG_DIR || __dirname + '/og') + '/list.json', 'utf8'));
  fs.mkdirSync(OUT + '/og', { recursive: true });
  fs.mkdirSync(OUT + '/favicon', { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const [id, slug, f] of list) {
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${OUT}/og/og-${slug}.jpg`, type: 'jpeg', quality: 84 });
  }
  const svg = fs.readFileSync('/home/user/laanaya/plugin/blackvault-design/assets/favicon.svg', 'utf8');
  for (const s of process.env.SKIP_FAVICON ? [] : [512, 192, 180, 32]) {
    const q = await b.newPage({ viewport: { width: s, height: s }, deviceScaleFactor: 1 });
    await q.setContent(`<style>html,body{margin:0;background:transparent}</style>${svg.replace('<svg ', `<svg width="${s}" height="${s}" `)}`);
    await q.screenshot({ path: `${OUT}/favicon/blackvault-icon-${s}.png`, omitBackground: true });
    await q.close();
  }
  await b.close();
  console.log('done', list.length);
})();
