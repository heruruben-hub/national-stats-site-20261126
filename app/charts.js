// Small SVG chart builders for NusaStats. Every chart is drawn from the
// site's own data at render time; nothing is fetched and no library is used.
// Each function returns an SVG string with a <title> for screen readers.

function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet"><title>${label}</title>`;
}

function niceMax(value) {
  const power = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / power) * power;
}

// Vertical bars: points are { label, value }. valueLabel formats the number.
export function barChart(points, { width = 640, height = 300, unit = '', color = '#0e6b5c' } = {}) {
  const padL = 46, padB = 30, padT = 14, padR = 10;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = niceMax(Math.max(...points.map((p) => p.value)));
  const slot = innerW / points.length;
  const barW = Math.min(44, slot * 0.62);
  let out = svgOpen(width, height, 'Bar chart');
  for (let i = 0; i <= 4; i++) {
    const y = padT + (innerH * i) / 4;
    const gridValue = max * (1 - i / 4);
    out += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#dfe7e4" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#5a6b66">${gridValue.toFixed(0)}${unit}</text>`;
  }
  points.forEach((p, i) => {
    const h = (p.value / max) * innerH;
    const x = padL + slot * i + (slot - barW) / 2;
    const y = padT + innerH - h;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"/>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#14332c">${p.value}${unit}</text>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#5a6b66">${p.label}</text>`;
  });
  return out + '</svg>';
}

// Line chart over years: points are { year, value }. Shows dots and values.
export function lineChart(points, { width = 640, height = 300, unit = '', color = '#b45309', min = null, max = null } = {}) {
  const padL = 46, padB = 30, padT = 16, padR = 16;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = points.map((p) => p.value);
  const lo = min ?? Math.min(0, ...values);
  const hi = max ?? niceMax(Math.max(...values));
  const xAt = (i) => padL + (innerW * i) / (points.length - 1);
  const yAt = (v) => padT + innerH - ((v - lo) / (hi - lo)) * innerH;
  let out = svgOpen(width, height, 'Line chart');
  for (let i = 0; i <= 4; i++) {
    const y = padT + (innerH * i) / 4;
    const gridValue = hi - ((hi - lo) * i) / 4;
    out += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#dfe7e4" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#5a6b66">${gridValue.toFixed(1)}${unit}</text>`;
  }
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(' ');
  out += `<path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    out += `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(p.value).toFixed(1)}" r="4" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>`;
    out += `<text x="${xAt(i).toFixed(1)}" y="${(yAt(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#14332c">${p.value.toFixed(2)}${unit}</text>`;
    out += `<text x="${xAt(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#5a6b66">${p.year}</text>`;
  });
  return out + '</svg>';
}

// Horizontal bars: rows are { label, value }. Good for ranked lists.
export function hbarChart(rows, { width = 640, rowH = 34, unit = '', color = '#0e6b5c' } = {}) {
  const padL = 150, padR = 56, padT = 6;
  const height = padT + rows.length * rowH + 8;
  const max = niceMax(Math.max(...rows.map((r) => r.value)));
  const innerW = width - padL - padR;
  let out = svgOpen(width, height, 'Horizontal bar chart');
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const w = Math.max(2, (r.value / max) * innerW);
    out += `<text x="${padL - 8}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="12" fill="#14332c">${r.label}</text>`;
    out += `<rect x="${padL}" y="${y + 5}" width="${w.toFixed(1)}" height="${rowH - 12}" rx="3" fill="${color}"/>`;
    out += `<text x="${(padL + w + 6).toFixed(1)}" y="${y + rowH / 2 + 4}" font-size="12" font-weight="600" fill="#14332c">${r.value}${unit}</text>`;
  });
  return out + '</svg>';
}

// Donut: slices are { name, share }. Returns SVG plus a legend list.
export function donut(slices, { size = 220, colors = ['#0e6b5c', '#b45309', '#2563eb', '#7c3aed', '#0891b2', '#be185d', '#65a30d', '#ea580c', '#94a3b8'] } = {}) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, hole = r * 0.62;
  const total = slices.reduce((sum, s) => sum + s.share, 0);
  let angle = -Math.PI / 2;
  let out = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Share of GDP by sector"><title>Share of GDP by sector</title>`;
  slices.forEach((s, i) => {
    const frac = s.share / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + hole * Math.cos(a1), yi1 = cy + hole * Math.sin(a1);
    const xi0 = cx + hole * Math.cos(a0), yi0 = cy + hole * Math.sin(a0);
    out += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${hole},${hole} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    angle = a1;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#14332c">100%</text>`;
  out += `<text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="11" fill="#5a6b66">of GDP</text></svg>`;
  const legend = slices.map((s, i) => (
    `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${s.name}<b>${s.share.toFixed(1)}%</b></li>`
  )).join('');
  return `<div class="donut-wrap">${out}<ul class="legend">${legend}</ul></div>`;
}
