// node build.mjs → index.html (ja) / en.html / zh.html / ko.html
import { writeFileSync } from 'node:fs';
import { meta, guides, order, images } from './content.mjs';

const pages = [
  ['ja', 'index.html', 'ja'],
  ['en', 'en.html', 'en'],
  ['zh-Hant', 'zh.html', 'zh-Hant'],
  ['ko', 'ko.html', 'ko'],
];
const esc = s => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/"/g, '&quot;');
const strip = s => String(s).replace(/<[^>]+>/g, '');
const ext = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}<span class="ext" aria-hidden="true">↗</span></a>`;
const A = 'assets/v150/';

function img(file, caption, cls = '') {
  const [w, h] = images[file] || [1200, 800];
  const alt = esc(strip(caption));
  return `<figure class="shot ${cls}"><a class="zoom" href="${A}${file}" data-caption="${alt}"><img src="${A}${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"></a><figcaption>${caption}</figcaption></figure>`;
}

// Pad diagram (inline SVG): the same layout as the tool's pad, labelled in the page's language.
function pad(c, kind) {
  const L = c.pad[kind];
  const ear = kind === 'ear';
  const col = ear ? 'var(--ear)' : 'var(--tail)';
  const dot = ear ? [118, 70] : [146, 84];   // an example pose
  const dial = ear ? `<g transform="translate(298 112)">
<circle r="34" class="dial"/><path d="M0 -26 A26 26 0 0 1 18.4 -18.4" class="arc" style="stroke:${col}"/>
<line x1="0" y1="0" x2="18.4" y2="-18.4" style="stroke:${col}" class="hand"/><circle cx="18.4" cy="-18.4" r="4" style="fill:${col}"/>
<text y="-44" class="lbl b">${L.dial}</text><text x="-30" y="52" class="lbl s">${L.dialIn}</text><text x="30" y="52" class="lbl s">${L.dialOut}</text></g>` : '';
  const w = ear ? 350 : 250;
  return `<figure class="pad"><svg viewBox="0 0 ${w} 230" role="img" aria-label="${esc(c.pad[kind + 'Cap'])}">
<rect x="52" y="40" width="150" height="150" rx="12" class="face"/>
<circle cx="127" cy="115" r="66" class="ring"/><circle cx="127" cy="115" r="33" class="ring"/>
<line x1="58" y1="115" x2="196" y2="115" class="ring"/><line x1="127" y1="46" x2="127" y2="184" class="ring"/>
<line x1="127" y1="115" x2="${dot[0]}" y2="${dot[1]}" style="stroke:${col}" class="hand"/><circle cx="${dot[0]}" cy="${dot[1]}" r="9" style="fill:${col}"/><circle cx="${dot[0]}" cy="${dot[1]}" r="3.5" fill="#fff"/>
<text x="127" y="30" class="lbl b">${L.up}</text><text x="127" y="214" class="lbl b">${L.down}</text>
<text x="30" y="120" class="lbl b">${L.left}</text><text x="224" y="120" class="lbl b">${L.right}</text>
${dial}</svg><figcaption>${c.pad[kind + 'Cap']}</figcaption></figure>`;
}

function block(c, b) {
  const [type, a, x] = b;
  switch (type) {
    case 'lead': return `<p class="lead">${a}</p>`;
    case 'p': return `<p>${a}</p>`;
    case 'h3': return `<h3>${a}</h3>`;
    case 'img': return img(a, x);
    case 'steps': return `<ol class="steps">${a.map(([h, p]) => `<li><h4>${h}</h4><p>${p}</p></li>`).join('')}</ol>`;
    case 'cards': return `<div class="cards">${a.map(([h, p, im]) => `<article class="card">${im ? `<a class="zoom" href="${A}${im}" data-caption="${esc(strip(h))}"><img src="${A}${im}" alt="${esc(strip(h))}" width="${images[im][0]}" height="${images[im][1]}" loading="lazy" decoding="async"></a>` : ''}<h4>${h}</h4><p>${p}</p></article>`).join('')}</div>`;
    case 'dl': return `<dl class="terms">${a.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;
    case 'chips': return `<ul class="chips">${a.map(s => `<li>${s}</li>`).join('')}</ul>`;
    case 'list': return `<ul class="list">${a.map(s => `<li>${s}</li>`).join('')}</ul>`;
    case 'note': return `<p class="note${x ? ' ' + x : ''}">${a}</p>`;
    case 'pad': return pad(c, a);
    case 'faq': return a.map(([q, ans]) => `<details><summary>${q}</summary><p>${ans}</p></details>`).join('');
    case 'log': return `<div class="log">${a.map(([v, d, items]) => `<article><h3>v${v}${d ? ` <span>${d}</span>` : ''}</h3><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></article>`).join('')}</div>`;
    default: throw new Error('unknown block ' + type);
  }
}

function render(lang, file, htmlLang) {
  const c = guides[lang];
  const langs = pages.map(([l, f, hl]) => `<a href="${f}"${l === lang ? ' aria-current="page"' : ''} hreflang="${hl}" lang="${hl}">${guides[l].langName}</a>`).join('');
  let n = 0;
  const nums = {};
  for (const k of order) if (k !== 'new') nums[k] = ++n;
  const badge = k => nums[k] ? String(nums[k]).padStart(2, '0') : '★';
  const toc = order.map(k => `<li><a href="#${c.sections[k].id}"><span class="num">${badge(k)}</span>${c.sections[k].nav}</a></li>`).join('');
  const sections = order.map(k => {
    const s = c.sections[k];
    // Two pad diagrams side by side.
    const html = [];
    for (let i = 0; i < s.blocks.length; i++) {
      const b = s.blocks[i];
      if (b[0] === 'pad' && s.blocks[i + 1]?.[0] === 'pad') { html.push(`<div class="pads">${block(c, b)}${block(c, s.blocks[++i])}</div>`); continue; }
      html.push(block(c, b));
    }
    return `<section id="${s.id}" class="sec${k === 'new' ? ' new' : ''}"><h2><span class="num">${badge(k)}</span>${s.title}</h2>${html.join('\n')}</section>`;
  }).join('\n');
  const h = c.hero;
  const url = meta.site + (file === 'index.html' ? '' : file);
  return `<!doctype html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${c.title}</title>
<meta name="description" content="${esc(c.description)}">
<meta name="color-scheme" content="dark">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:image" content="${meta.site}${A}main.jpg">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
${pages.map(([, f, hl]) => `<link rel="alternate" hreflang="${hl}" href="${meta.site}${f === 'index.html' ? '' : f}">`).join('\n')}
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="site.css">
<script src="gallery.js" defer></script>
</head>
<body id="top">
<a class="skip" href="#main">${c.skip}</a>
<header class="bar"><a class="brand" href="#top"><img src="favicon.svg" alt="" width="28" height="28">ゆらもふ <span>v${meta.version}</span></a><nav class="langs" aria-label="Language">${langs}</nav></header>
<div class="hero">
<div class="hero-copy"><p class="eyebrow">${h.eyebrow}</p><h1>${h.headline}</h1><p class="lead">${h.lead}</p>
<div class="buttons"><a class="btn" href="#${c.sections.start.id}">${h.start}</a><a class="btn ghost" href="${meta.booth}" target="_blank" rel="noopener">${h.booth} ↗</a></div>
<p class="badge">${h.badge}</p></div>
<a class="hero-art zoom" href="${A}main.jpg" data-caption="${esc(h.imageAlt)}"><img src="${A}main.jpg" alt="${esc(h.imageAlt)}" width="1024" height="1024" fetchpriority="high"></a></div>
<div class="layout">
<nav class="toc" aria-label="${esc(c.toc)}"><p>${c.toc}</p><ol>${toc}</ol></nav>
<main id="main">
${sections}
</main></div>
<footer class="foot"><p>黒猫Dev · ゆらもふ v${meta.version} · ${c.updatedLabel} ${meta.updated}</p><p>${c.footer}</p>
<p>${ext(meta.booth, 'BOOTH')} · ${ext(meta.github, 'GitHub')} · <a href="#top">↑ ${c.top}</a></p></footer>
<dialog id="viewer" aria-label="${esc(c.enlarge)}"><button type="button" class="close" aria-label="${esc(c.close)}">×</button><figure><img alt=""><figcaption></figcaption></figure></dialog>
</body>
</html>
`;
}

for (const [lang, file, hl] of pages) writeFileSync(new URL(file, import.meta.url), render(lang, file, hl));
console.log('built', pages.map(p => p[1]).join(', '));
