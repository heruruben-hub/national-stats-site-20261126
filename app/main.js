// NusaStats router: one hash route per section, rendered into #app.
// Routes:
//   #/                     overview
//   #/population           population & demography
//   #/economy              economy
//   #/people               people & wellbeing
//   #/provinces            province table with search and sort
//   #/province/<slug>      one province
//   #/about                about & sources
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { about, economy, home, people, population, provinceDetail, provincesPage } from './views.js';
import { density } from './data.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.site-nav a')];

function markActive(route) {
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').slice(1);
    a.classList.toggle('active', target === route || (route.startsWith('/province/') && target === '/provinces'));
  });
}

// The provinces page is interactive: a search box filters rows and the
// sort buttons reorder them. Wired up fresh on every visit to the page.
function wireProvinces() {
  const rowsEl = document.getElementById('province-rows');
  const countEl = document.getElementById('province-count');
  const searchEl = document.getElementById('province-search');
  const buttons = [...document.querySelectorAll('.sort-buttons button')];
  if (!rowsEl || !searchEl) return;
  const data = JSON.parse(document.getElementById('province-data').textContent);
  let sortKey = 'pop';

  function sorted() {
    const copy = [...data];
    if (sortKey === 'pop') copy.sort((a, b) => b.pop - a.pop);
    if (sortKey === 'density') copy.sort((a, b) => density(b) - density(a));
    if (sortKey === 'area') copy.sort((a, b) => b.area - a.area);
    if (sortKey === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy;
  }

  function draw() {
    const q = searchEl.value.trim().toLowerCase();
    const shown = sorted().filter((p) => !q || `${p.name} ${p.capital} ${p.island}`.toLowerCase().includes(q));
    rowsEl.innerHTML = shown.map((p) => `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.island}</td><td>${p.pop.toFixed(2)}m</td><td>${p.area.toLocaleString('en-US')}</td><td>${density(p).toLocaleString('en-US')}</td><td><a href="#/province/${p.slug}">Details →</a></td></tr>`).join('');
    countEl.textContent = shown.length === data.length
      ? `Showing all ${data.length} provinces.`
      : `Showing ${shown.length} of ${data.length} provinces.`;
    if (shown.length === 0) {
      rowsEl.innerHTML = `<tr><td colspan="7">No province matches “${searchEl.value.trim()}”. Try another name.</td></tr>`;
    }
  }

  buttons.forEach((b) => b.addEventListener('click', () => {
    sortKey = b.dataset.sort;
    buttons.forEach((x) => x.classList.toggle('active', x === b));
    draw();
  }));
  searchEl.addEventListener('input', draw);
  draw();
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const provinceMatch = hash.match(/^#\/province\/([^/?]+)/);
  let route = '/';
  if (provinceMatch) {
    const slug = decodeURIComponent(provinceMatch[1]);
    document.title = `${slug.replace(/-/g, ' ')} | NusaStats`;
    app.innerHTML = provinceDetail(slug);
    route = '/provinces';
  } else if (hash.startsWith('#/population')) {
    route = '/population';
    document.title = 'Population | NusaStats';
    app.innerHTML = population();
  } else if (hash.startsWith('#/economy')) {
    route = '/economy';
    document.title = 'Economy | NusaStats';
    app.innerHTML = economy();
  } else if (hash.startsWith('#/people')) {
    route = '/people';
    document.title = 'People & wellbeing | NusaStats';
    app.innerHTML = people();
  } else if (hash.startsWith('#/provinces')) {
    route = '/provinces';
    document.title = 'Provinces | NusaStats';
    app.innerHTML = provincesPage();
    wireProvinces();
  } else if (hash.startsWith('#/about')) {
    route = '/about';
    document.title = 'About & sources | NusaStats';
    app.innerHTML = about();
  } else {
    document.title = 'NusaStats — Indonesia in Numbers';
    app.innerHTML = home();
  }
  markActive(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
