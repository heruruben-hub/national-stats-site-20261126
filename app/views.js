// Page templates for NusaStats. Each function returns the HTML for one
// hash route. Every figure shown comes from data.js with its source and
// year named on the page, and every link on a page is a real route.

import {
  ageStructure, census, country, density, gdpGrowth, gdpNominal, hdi,
  inflation, keyIndicators, nationalShare, peopleFacts, poverty,
  provinceBySlug, provinces, sectors, trade, unemployment,
} from './data.js';
import { barChart, donut, hbarChart, lineChart } from './charts.js';

function sourceNote(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function statCard(item) {
  return `<a class="card" href="${item.href}"><span class="card-label">${item.label}</span><span class="card-value">${item.value}</span><span class="card-note">${item.note}</span></a>`;
}

function head(title, intro) {
  return `<h1>${title}</h1><p class="lede">${intro}</p>`;
}

function missing() {
  return `<h1>Page not found</h1><p class="lede">That section does not exist. Start from the <a href="#/">overview</a> instead.</p>`;
}

export function home() {
  const topFive = [...provinces].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `
  <section class="hero">
    <p class="eyebrow">National statistics · Indonesia</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">The country's people, economy and provinces in one place — real
    figures from Statistics Indonesia (BPS), each with its source and year,
    drawn as charts you can read at a glance.</p>
    <p class="hero-links"><a class="btn" href="#/population">Explore population</a>
    <a class="btn btn-ghost" href="#/economy">Explore the economy</a></p>
  </section>
  <section>
    <h2>Key indicators</h2>
    <div class="cards">${keyIndicators.map(statCard).join('')}</div>
    ${sourceNote('Statistics Indonesia (BPS), 2024. Tap any card to see the full section.')}
  </section>
  <section class="grid-2">
    <div class="panel">
      <h2>Population at every census</h2>
      ${barChart(census.map((c) => ({ label: String(c.year), value: c.pop })), { unit: 'm' })}
      ${sourceNote('BPS population censuses 1961–2020; 2024 is the mid-year estimate.')}
    </div>
    <div class="panel">
      <h2>GDP growth, 2020–2024</h2>
      ${lineChart(gdpGrowth, { unit: '%', min: -3, max: 6 })}
      ${sourceNote('BPS, annual real GDP growth. 2020 is the pandemic contraction.')}
    </div>
  </section>
  <section>
    <h2>Largest provinces</h2>
    <p class="lede">Java holds more than half the country: the five largest provinces
    alone are home to about 152 million people.</p>
    <table class="data-table">
      <thead><tr><th>Province</th><th>Capital</th><th>Population (2024)</th><th>Density /km²</th><th></th></tr></thead>
      <tbody>${topFive.map((p) => `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.pop.toFixed(2)}m</td><td>${density(p).toLocaleString('en-US')}</td><td><a href="#/province/${p.slug}">Details →</a></td></tr>`).join('')}</tbody>
    </table>
    <p><a href="#/provinces">See all 16 provinces in the table →</a></p>
    ${sourceNote('BPS mid-year population estimates, 2024; density is population divided by land area.')}
  </section>`;
}

export function population() {
  return `
  ${head('Population', '283.5 million people (BPS mid-year estimate, 2024) live across 38 provinces, 514 regencies and cities, and 17,508 islands. The census series below shows how the country grew from 97 million in 1961.')}
  <section class="grid-2">
    <div class="panel">
      <h2>Population at every census</h2>
      ${barChart(census.map((c) => ({ label: String(c.year), value: c.pop })), { unit: 'm' })}
      ${sourceNote('BPS censuses 1961–2020; 2024 is the mid-year estimate.')}
    </div>
    <div class="panel">
      <h2>Age structure, 2024</h2>
      ${hbarChart(ageStructure.map((a) => ({ label: a.group, value: a.share })), { unit: '%' })}
      <p>Two in three Indonesians are of working age (15–64). The median age is 30.7 years.</p>
      ${sourceNote('BPS, 2024. Shares sum to 100%.')}
    </div>
  </section>
  <section>
    <h2>Where people live</h2>
    <p class="lede">Java is home to about 55% of the population on about 7% of the land.
    Jakarta is the densest province by far — about 15,900 people per km² —
    while Kalimantan's provinces are among the emptiest.</p>
    <table class="data-table">
      <thead><tr><th>Province</th><th>Island</th><th>Population (2024)</th><th>Share of Indonesia</th><th>Density /km²</th><th></th></tr></thead>
      <tbody>${provinces.map((p) => `<tr><td>${p.name}</td><td>${p.island}</td><td>${p.pop.toFixed(2)}m</td><td>${nationalShare(p)}%</td><td>${density(p).toLocaleString('en-US')}</td><td><a href="#/province/${p.slug}">Details →</a></td></tr>`).join('')}</tbody>
    </table>
    ${sourceNote('BPS mid-year estimates, 2024; density is population divided by land area.')}
  </section>`;
}

export function economy() {
  return `
  ${head('Economy', 'GDP reached Rp22,139 trillion in 2024 and grew 5.03% in real terms — the fifth year in a row above 5% except for the 2020 pandemic contraction. GDP per capita was about US$4,960.')}
  <section class="grid-2">
    <div class="panel">
      <h2>GDP growth, 2020–2024</h2>
      ${lineChart(gdpGrowth, { unit: '%', min: -3, max: 6 })}
      ${sourceNote('BPS, annual real GDP growth.')}
    </div>
    <div class="panel">
      <h2>GDP, nominal (Rp trillion)</h2>
      ${barChart(gdpNominal.map((g) => ({ label: String(g.year), value: g.value })), { unit: '' })}
      ${sourceNote('BPS, GDP at current prices.')}
    </div>
  </section>
  <section class="grid-2">
    <div class="panel">
      <h2>What the economy makes</h2>
      ${donut(sectors)}
      ${sourceNote('BPS, share of GDP by sector, 2024. Manufacturing is the largest single sector at 18.7%.')}
    </div>
    <div class="panel">
      <h2>Inflation, 2020–2024</h2>
      ${lineChart(inflation, { unit: '%', min: 0, max: 6 })}
      <p>Consumer prices rose 1.57% in December 2024 from a year earlier — the
      lowest year-end inflation in this five-year series after the 2022 spike to 5.51%.</p>
      ${sourceNote('BPS, consumer price index, December year on year.')}
    </div>
  </section>
  <section>
    <h2>Trade with the world</h2>
    <table class="data-table">
      <thead><tr><th>Year</th><th>Exports (US$bn)</th><th>Imports (US$bn)</th><th>Balance (US$bn)</th></tr></thead>
      <tbody>${trade.map((t) => `<tr><td>${t.year}</td><td>${t.exports.toFixed(2)}</td><td>${t.imports.toFixed(2)}</td><td>${(t.exports - t.imports).toFixed(2)}</td></tr>`).join('')}</tbody>
    </table>
    <p>Indonesia has run a goods trade surplus every year since 2020. Exports
    peaked at US$291.90bn in 2022 on high commodity prices.</p>
    ${sourceNote('BPS foreign trade statistics, 2020–2024.')}
  </section>`;
}

export function people() {
  return `
  ${head('People & wellbeing', 'Unemployment fell to 4.91% in August 2024, poverty to 8.57% in September 2024, and the Human Development Index reached 75.02 — the best readings in this five-year series on all three.')}
  <section class="grid-2">
    <div class="panel">
      <h2>Unemployment, 2020–2024</h2>
      ${lineChart(unemployment, { unit: '%', min: 0, max: 8 })}
      ${sourceNote('BPS, open unemployment rate, August each year.')}
    </div>
    <div class="panel">
      <h2>Poverty rate, 2020–2024</h2>
      ${lineChart(poverty, { unit: '%', min: 0, max: 12 })}
      ${sourceNote('BPS, share of people below the poverty line, September each year.')}
    </div>
  </section>
  <section class="grid-2">
    <div class="panel">
      <h2>Human Development Index</h2>
      ${lineChart(hdi, { unit: '', min: 70, max: 76 })}
      ${sourceNote('BPS, HDI 2020–2024. The index combines health, education and living standards.')}
    </div>
    <div class="panel">
      <h2>Everyday life in figures</h2>
      <dl class="facts">${peopleFacts.map((f) => `<div><dt>${f.label}</dt><dd>${f.value}</dd><dd class="fact-source">${f.source}</dd></div>`).join('')}</dl>
    </div>
  </section>`;
}

export function provincesPage() {
  return `
  ${head('Provinces', 'Sixteen largest of Indonesia’s 38 provinces, 2024. Use the search box to filter by name, capital or island, and the buttons to re-sort the table.')}
  <div class="controls">
    <label>Search <input id="province-search" type="search" placeholder="Type a province, capital or island…" autocomplete="off"></label>
    <div class="sort-buttons" role="group" aria-label="Sort provinces">
      <button type="button" data-sort="pop" class="active">By population</button>
      <button type="button" data-sort="density">By density</button>
      <button type="button" data-sort="area">By area</button>
      <button type="button" data-sort="name">By name</button>
    </div>
  </div>
  <p id="province-count" class="count"></p>
  <table class="data-table" id="province-table">
    <thead><tr><th>Province</th><th>Capital</th><th>Island</th><th>Population (2024)</th><th>Area (km²)</th><th>Density /km²</th><th></th></tr></thead>
    <tbody id="province-rows"></tbody>
  </table>
  ${sourceNote('BPS mid-year population estimates, 2024; area from BPS provincial profiles. Density is population divided by land area.')}
  <script type="application/json" id="province-data">${JSON.stringify(provinces)}</script>`;
}

export function provinceDetail(slug) {
  const p = provinceBySlug(slug);
  if (!p) return missing();
  const rank = [...provinces].sort((a, b) => b.pop - a.pop).findIndex((x) => x.slug === slug) + 1;
  return `
  <p><a href="#/provinces">← All provinces</a></p>
  ${head(p.name, `${p.name} is Indonesia's ${rank === 1 ? 'largest' : `number ${rank} largest`} province by population among the sixteen listed here, with ${p.pop.toFixed(2)} million people — ${nationalShare(p)}% of the country — in its capital ${p.capital} and across ${p.area.toLocaleString('en-US')} km² of ${p.island}.`)}
  <div class="cards">
    <div class="card"><span class="card-label">Population (2024)</span><span class="card-value">${p.pop.toFixed(2)}m</span><span class="card-note">BPS mid-year estimate</span></div>
    <div class="card"><span class="card-label">Share of Indonesia</span><span class="card-value">${nationalShare(p)}%</span><span class="card-note">of 283.5m people</span></div>
    <div class="card"><span class="card-label">Land area</span><span class="card-value">${p.area.toLocaleString('en-US')} km²</span><span class="card-note">BPS provincial profile</span></div>
    <div class="card"><span class="card-label">Density</span><span class="card-value">${density(p).toLocaleString('en-US')} /km²</span><span class="card-note">people per square kilometre</span></div>
    <div class="card"><span class="card-label">Capital</span><span class="card-value">${p.capital}</span><span class="card-note">provincial capital</span></div>
    <div class="card"><span class="card-label">Island group</span><span class="card-value">${p.island}</span><span class="card-note">one of Indonesia's major islands</span></div>
  </div>
  <section>
    <h2>${p.name} next to the other large provinces</h2>
    ${hbarChart([...provinces].sort((a, b) => b.pop - a.pop).map((x) => ({ label: x.name, value: x.pop })), { unit: 'm' })}
    ${sourceNote('BPS mid-year population estimates, 2024.')}
  </section>`;
}

export function about() {
  return `
  ${head('About & sources', 'NusaStats is an independent guide to Indonesia\u2019s headline statistics. It is not affiliated with Statistics Indonesia or any government body. Every figure on this site names its publisher and year where it appears.')}
  <section>
    <h2>Where the figures come from</h2>
    <ul class="sources-list">
      <li><b>Statistics Indonesia (BPS)</b> — population censuses and mid-year estimates, GDP and growth, inflation, unemployment, poverty, the Human Development Index, trade, and provincial population and area. The default source for every figure on this site, 2024 unless a year is given.</li>
      <li><b>APJII (Indonesian Internet Service Providers Association)</b> — internet users, 2024 survey.</li>
      <li><b>Ministry of Energy and Mineral Resources</b> — household electrification ratio, 2023.</li>
    </ul>
    <h2>How to read the figures</h2>
    <ul>
      <li>Population figures are mid-year estimates unless labelled a census year.</li>
      <li>GDP is nominal (current prices) in rupiah unless labelled real growth in percent.</li>
      <li>Density is population divided by land area, rounded to whole people per km².</li>
      <li>Shares of GDP by sector are rounded to one decimal and sum to 100%.</li>
    </ul>
    <h2>About this site</h2>
    <p>NusaStats was built as an entry for the make.fun “best national statistics site” bounty. It is a static site: one HTML shell, its own stylesheet, and its data and charts in plain JavaScript files. It loads nothing from the network and works offline in a desktop or phone browser.</p>
    <p>Country facts: ${country.provinces} provinces, ${country.regenciesCities} regencies and cities, ${country.islands} islands. ${country.updated}.</p>
  </section>`;
}
