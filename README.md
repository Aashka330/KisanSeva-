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

## License

© 2026 KisanSeva. All rights reserved.
