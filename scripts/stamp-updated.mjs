// Stamps the current deploy time into index.html's "last updated" fields.
// Runs at build time on Vercel (buildCommand), so every deploy — from anyone —
// refreshes the date. Fail-safe: any error is swallowed and the build still
// succeeds with the last-committed date, so this can never break a deploy.
//
// It only touches the UI stamps wrapped in <!--U:type-->…<!--/U--> markers and
// the two SEO date fields. It never edits the analysis text (the "as of 11
// September" claims are editorial and stay put).
//
// Run locally with:  node scripts/stamp-updated.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const target = process.argv[2]
  ? process.argv[2]
  : fileURLToPath(new URL('../index.html', import.meta.url));

try {
  let html = readFileSync(target, 'utf8');
  const now = new Date();

  const partsIn = (tz) => {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    });
    const o = {};
    for (const p of f.formatToParts(now)) o[p.type] = p.value;
    return o;
  };
  const india = partsIn('Asia/Kolkata');
  const paris = partsIn('Europe/Paris');
  const parisOffset = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris', timeZoneName: 'shortOffset',
  }).formatToParts(now).find((p) => p.type === 'timeZoneName').value; // e.g. "GMT+2"
  const parisLabel = parisOffset.includes('+2') ? 'CEST' : 'CET';

  const mon3 = (m) => m.slice(0, 3);
  const stamps = {
    long:  `${india.day} ${india.month.toUpperCase()} ${india.year}, ${india.hour}:${india.minute} IST &nbsp;(${paris.hour}:${paris.minute} ${parisLabel})`,
    nav:   `${india.day} ${mon3(india.month)} ${india.year}, ${india.hour}:${india.minute} IST`,
    top:   `${india.day} ${mon3(india.month)}, ${india.hour}:${india.minute} IST`,
    short: `${india.day} ${mon3(india.month)}`,
  };
  for (const [type, value] of Object.entries(stamps)) {
    html = html.replace(
      new RegExp(`(<!--U:${type}-->)[\\s\\S]*?(<!--/U-->)`),
      `$1${value}$2`,
    );
  }

  const iso = now.toISOString().replace(/\.\d{3}Z$/, 'Z'); // 2026-09-11T08:00:00Z
  html = html.replace(
    /(<meta property="article:modified_time" content=")[^"]*(">)/,
    `$1${iso}$2`,
  );
  html = html.replace(/("dateModified":")[^"]*(")/, `$1${iso.slice(0, 10)}$2`);

  writeFileSync(target, html);
  console.log('[stamp-updated] set to', stamps.long.replace('&nbsp;', ' '));
} catch (err) {
  console.error('[stamp-updated] skipped:', err && err.message);
}
process.exit(0); // never fail the build
