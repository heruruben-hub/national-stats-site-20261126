[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/heruruben-hub/national-stats-site-20261126/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/heruruben-hub/national-stats-site-20261126/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# NusaStats — Indonesia in Numbers

A national statistics site for Indonesia: population, economy, people and
provinces, with real figures from Statistics Indonesia (BPS), each with its
source and year. Built as an entry for the make.fun
[“Make the best national statistics site”](https://make.fun/c/best-national-statistics-site-20261126-0539)
bounty.

## What it is

A static site that runs offline in a desktop or phone browser — one HTML
shell, its own stylesheet, and its data and charts in plain JavaScript
modules. No build step, no network request, no framework.

- **Overview** — eight key indicators, population at every census (1961–2024), GDP growth, and the five largest provinces.
- **Population** — census series, age structure, and a table of the 16 largest provinces with density and national share.
- **Economy** — GDP growth and nominal GDP, GDP by sector, inflation, and a 2020–2024 trade table.
- **People** — unemployment, poverty, HDI, and everyday-life figures (schooling, internet use, electricity, rice, visitors).
- **Provinces** — a searchable, sortable table of the 16 largest provinces, plus a detail page per province.
- **About** — sources and how to read the figures.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Hand it in (as the kit's `main.ts` does):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
