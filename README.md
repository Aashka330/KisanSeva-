# KisanSeva

**Smart Farming. Better Decisions. Greener Future.**

---

## Run locally (step by step)

### Prerequisites

You need **Node.js 18+** installed. Check with:

```bash
node -v
npm -v
```

If Node is not installed, download it from [https://nodejs.org](https://nodejs.org) (LTS version).

### 1. Open the project folder in Terminal

```bash
cd /Users/ash/Desktop/KisanSeva
```

*(Replace the path if your project is somewhere else.)*

### 2. Install dependencies (first time only)

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

You should see output like:

```
  VITE v8.x.x  ready in 200 ms

  ➜  Local:   http://localhost:5173/
```

### 4. Open in your browser

Go to **http://localhost:5173**

The page hot-reloads when you save changes.

### 5. Stop the server

Press `Ctrl + C` in the terminal.

---

## Other commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Troubleshooting

**Port already in use?**
Vite will try the next port (5174, 5175…). Check the terminal for the actual URL.

**Blank page or old design?**
Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows).

**`npm install` fails?**
Make sure you have internet access and Node.js 18+.

**Images not loading?**
Images are stored in `public/images/`. They load from `/images/hero-farm.jpg` etc. — no external API needed.

---

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- React Router · Recharts · Framer Motion · Lucide React

## Crop recommendation data and limitations

The Crop Recommendation Center requires a successful location-data request before showing rankings. It uses:

- Open-Meteo geocoding to resolve an Indian city/village or optional GPS coordinates.
- Current conditions and a 7-day forecast from Open-Meteo's Forecast API.
- Historical daily gridded weather from Open-Meteo's Archive API. Seasonal temperature and rainfall averages use the complete seasonal years available in the approximately three-year archive; the page shows the number of years included.
- Farmer-selected soil type and water availability. Modelled surface moisture and soil temperature are weather-grid values, not measurements from the user's field.

Crop suitability is a transparent, rule-based relative fit score—not a trained model, probability, yield forecast, profit estimate, or guarantee. Crop climate bands and catalog ranges for soil, water, season, and region are provisional prototype heuristics; they are not yet validated against an authoritative crop-requirements dataset. Do not rely on these rankings as agronomic advice.

## Synthetic market model

The market page is still a demo. Its local linear model is trained on 2,400 generated price scenarios, and its displayed prices and historical observations are not a live mandi feed. It is not a financial forecast. Other parts of the prototype may also contain sample data.

Public sources:

- [Open-Meteo Forecast API](https://open-meteo.com/en/docs), [Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api), and [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — live weather and historical gridded climate fetched by the recommender.
- [FAOSTAT Crops and Livestock Products](https://www.fao.org/faostat/en/#data/QCL), [Agmarknet](https://agmarknet.gov.in/), and [Department of Agriculture & Farmers Welfare MSP information](https://agriwelfare.gov.in/en/MinimumSupportPrices) — reference links only; the app does not fetch these datasets.

## License

© 2026 KisanSeva. All rights reserved.
