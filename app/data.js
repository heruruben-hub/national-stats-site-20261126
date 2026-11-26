// NusaStats data: real figures about Indonesia, each with its source and year.
// Sources are Statistics Indonesia (BPS) unless another publisher is named.
// All figures are the published headline numbers; nothing here is estimated
// by this site. Amounts in rupiah are nominal (current prices).

export const country = {
  name: 'Indonesia',
  tagline: 'Indonesia in Numbers',
  provinces: 38,
  regenciesCities: 514,
  islands: '17,508',
  capital: 'Jakarta (Nusantara under construction)',
  updated: 'Figures as published by BPS, 2024 unless noted',
};

export const keyIndicators = [
  { label: 'Population', value: '283.5m', note: 'mid-year estimate, 2024', href: '#/population' },
  { label: 'GDP', value: 'Rp22,139tr', note: 'nominal, 2024', href: '#/economy' },
  { label: 'GDP per capita', value: 'US$4,960', note: '2024', href: '#/economy' },
  { label: 'Inflation', value: '1.57%', note: 'Dec 2024, year on year', href: '#/economy' },
  { label: 'Unemployment', value: '4.91%', note: 'Aug 2024', href: '#/people' },
  { label: 'Poverty rate', value: '8.57%', note: 'Sep 2024', href: '#/people' },
  { label: 'Human Development Index', value: '75.02', note: '2024', href: '#/people' },
  { label: 'Life expectancy', value: '73.9 yrs', note: '2024', href: '#/people' },
];

// Population at each census, plus the 2024 mid-year estimate (millions).
export const census = [
  { year: 1961, pop: 97.0 },
  { year: 1971, pop: 119.2 },
  { year: 1980, pop: 146.8 },
  { year: 1990, pop: 179.4 },
  { year: 2000, pop: 205.1 },
  { year: 2010, pop: 237.6 },
  { year: 2020, pop: 270.2 },
  { year: 2024, pop: 283.5 },
];

// Age structure, 2024 (% of population). Source: BPS.
export const ageStructure = [
  { group: '0–14 years', share: 24.4 },
  { group: '15–64 years', share: 68.5 },
  { group: '65+ years', share: 7.1 },
];

// Economy: yearly series. Sources: BPS.
export const gdpGrowth = [
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

export const gdpNominal = [
  { year: 2020, value: 15443 },
  { year: 2021, value: 16977 },
  { year: 2022, value: 19588 },
  { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

export const inflation = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const trade = [
  { year: 2020, exports: 163.19, imports: 141.57 },
  { year: 2021, exports: 231.61, imports: 196.19 },
  { year: 2022, exports: 291.90, imports: 237.52 },
  { year: 2023, exports: 258.82, imports: 221.89 },
  { year: 2024, exports: 264.70, imports: 233.66 },
];

// Share of GDP by sector, 2024 (%). Source: BPS.
export const sectors = [
  { name: 'Manufacturing', share: 18.7 },
  { name: 'Wholesale & retail trade', share: 12.9 },
  { name: 'Agriculture, forestry & fishing', share: 12.0 },
  { name: 'Construction', share: 9.9 },
  { name: 'Mining & quarrying', share: 8.4 },
  { name: 'Transport & storage', share: 4.9 },
  { name: 'Information & communication', share: 4.2 },
  { name: 'Financial & insurance', share: 4.1 },
  { name: 'All other sectors', share: 24.9 },
];

// People: yearly series. Sources: BPS.
export const unemployment = [
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

export const poverty = [
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

export const hdi = [
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 73.37 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

export const peopleFacts = [
  { label: 'Median age', value: '30.7 years', source: 'BPS, 2024' },
  { label: 'Urban population', value: '58.6%', source: 'BPS, 2024' },
  { label: 'Mean years of schooling', value: '9.13 years', source: 'BPS, 2024' },
  { label: 'Internet users', value: '79.5% of people', source: 'APJII survey, 2024 (221.6m users)' },
  { label: 'Households with electricity', value: '99.85%', source: 'Ministry of Energy, 2023' },
  { label: 'Rice production', value: '52.66m tonnes', source: 'BPS, 2024' },
  { label: 'Foreign visitor arrivals', value: '13.90m', source: 'BPS, 2024' },
  { label: 'Fertility rate', value: '2.0 children per woman', source: 'BPS, 2024' },
];

// Provinces: the 16 largest by population. Population is the 2024 mid-year
// estimate (millions); area in km². Source: BPS.
export const provinces = [
  { slug: 'west-java', name: 'West Java', capital: 'Bandung', island: 'Java', pop: 50.35, area: 35378 },
  { slug: 'east-java', name: 'East Java', capital: 'Surabaya', island: 'Java', pop: 41.81, area: 47803 },
  { slug: 'central-java', name: 'Central Java', capital: 'Semarang', island: 'Java', pop: 37.89, area: 32801 },
  { slug: 'north-sumatra', name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', pop: 15.59, area: 72981 },
  { slug: 'banten', name: 'Banten', capital: 'Serang', island: 'Java', pop: 12.43, area: 9663 },
  { slug: 'jakarta', name: 'DKI Jakarta', capital: 'Jakarta', island: 'Java', pop: 10.56, area: 664 },
  { slug: 'south-sulawesi', name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', pop: 9.36, area: 46717 },
  { slug: 'lampung', name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9.03, area: 34624 },
  { slug: 'south-sumatra', name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', pop: 8.84, area: 91592 },
  { slug: 'riau', name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6.91, area: 87024 },
  { slug: 'west-sumatra', name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', pop: 5.83, area: 42013 },
  { slug: 'west-kalimantan', name: 'West Kalimantan', capital: 'Pontianak', island: 'Kalimantan', pop: 5.80, area: 147307 },
  { slug: 'aceh', name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', pop: 5.55, area: 57956 },
  { slug: 'bali', name: 'Bali', capital: 'Denpasar', island: 'Bali', pop: 4.41, area: 5780 },
  { slug: 'south-kalimantan', name: 'South Kalimantan', capital: 'Banjarmasin', island: 'Kalimantan', pop: 4.18, area: 38744 },
  { slug: 'east-kalimantan', name: 'East Kalimantan', capital: 'Samarinda', island: 'Kalimantan', pop: 3.85, area: 127347 },
];

export function provinceBySlug(slug) {
  return provinces.find((p) => p.slug === slug);
}

export function density(p) {
  return Math.round((p.pop * 1000000) / p.area);
}

export function nationalShare(p) {
  return ((p.pop / 283.5) * 100).toFixed(1);
}
