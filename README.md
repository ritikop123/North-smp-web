# NorthSMP Webstore

The official modern webstore for **NorthSMP**, built with **React**, **TypeScript**, and **Vite**, featuring custom high-performance glassmorphism design, anti-scrape obfuscation, and native **Cloudflare Pages** deployment.

---

## 🌟 Key Features

- **React 19 + TypeScript**:
  - Fully type-safe component and state architecture (`src/types/store.ts`).
  - Client-side routing with `react-router-dom` and automatic scroll-to-top.
  - Minified, obfuscated production output in `dist/` with no sourcemaps to prevent scraping.
  
- **Visual Design & Symmetry**:
  - Dark glassmorphism cards, glowing borders, crisp Poppins typography, and responsive grid.
  - Symmetrical grid layout: **Berry Rank** (5th rank) and **Spawner Key** (7th key) use `.col-center-6` to remain the exact same size as other cards while centered horizontally on their rows.
  - Dedicated custom artwork for all 7 keys (`Keyall`, `Turtle`, `Sun`, `Tropical`, `Shell`, `Coral`, `Spawner`).
  - Minimalist "Coming Soon" card for **Network Points** matching the dark store theme.
  - Pulsing animated NorthSMP custom logo emblem.
  - One-click server IP copy button (`northsmp.fun`) with animated toast feedback.
  - 25% OFF Summer Sale promotion banner with a real-time countdown clock.
  - Community payment goal progress bar (0% / $500.00).

- **Dynamic Interactive Store Engine**:
  - **Global Shopping Cart**: Real-time badge counter, quantity controls, item removal, and auto-calculating total.
  - **Multi-Currency Switcher**: Live price conversion across **USD ($)**, **EUR (€)**, **GBP (£)**, **CAD (C$)**, **INR (₹)**, and **AUD (A$)**.
  - **Minecraft Authentication / Session**:
    - Java & Bedrock platform selector.
    - Live player head/skin avatar preview powered by MC-Heads API.
    - Persistent session across all pages with user badge in header.
  - **Package Lore & Perks Modal**: Inspect in-game commands, weekly kits, permissions, and claim blocks.
  - **Gifting System**: Gift any rank or key directly to any Minecraft IGN with real-time skin preview.
  - **Basket & Checkout**: Coupon code system (`NORTH25`, `WELCOME`), checkout agreements verification, and order simulation modal.

---

## ▲ Deploying to Vercel

This repository is pre-configured for instant zero-configuration deployment on **Vercel**:

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** ➔ **Project** ➔ Import `ritikop123/North-smp-web`.
3. Vercel automatically detects the **Vite** framework preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

> **Note on SPA Routing**: A [`vercel.json`](vercel.json) rewrite rule is included so direct navigation and page refreshes (e.g. `/ranks`, `/crates`, `/coins`, `/basket`) work seamlessly without 404s.

---

## 🚀 Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Scripts
```bash
# Install dependencies
npm install

# Start development server (with hot module reload)
npm run dev

# Build obfuscated production bundle
npm run build

# Preview production build locally
npm run preview
# or
npm start
```

---

## 📁 Project Structure

```
NorthSMP Web/
├── public/                 # Static assets copied directly to dist/
│   ├── _redirects          # Cloudflare Pages SPA rewrite rule
│   └── assets/             # Images, icons, CSS stylesheets
├── src/
│   ├── components/         # Header, Footer, PackageCard, PackageModal, GiftModal, Toast
│   ├── config/             # Server info, pricing, ranks, keys, coupons
│   ├── context/            # React StoreContext (Cart, Currency, Auth, Modals)
│   ├── pages/              # HomePage, RanksPage, CoinsPage, CratesPage, BasketPage, LoginPage, TermsPage, PrivacyPage
│   ├── types/              # TypeScript interface definitions
│   ├── App.tsx             # Main routing configuration
│   └── main.tsx            # React DOM mounting entrypoint
├── index.html              # Vite HTML template
├── vite.config.ts          # Vite bundler configuration (minification, no sourcemap)
├── tsconfig.json           # TypeScript configuration
├── server.js / server.cjs  # Optional lightweight local HTTP server
└── package.json            # Dependencies and scripts
```

---

## 🔗 Official Links

- **Server IP**: `northsmp.fun` (Bedrock Port: `19036`)
- **Official Discord**: [https://discord.gg/jfDn6n74Gr](https://discord.gg/jfDn6n74Gr)
