# NorthSMP Webstore

An exact modern Minecraft Webstore inspired by the **Everfront Base Template 4** (as featured on [FlaticSMP](https://flaticsmp.everfront.store/)), custom built and branded for **NorthSMP**.

---

## 🌟 Features Included

- **Exact Everfront Base Template Design**:
  - Dark glassmorphism cards, glowing borders, crisp Poppins typography, and modern responsive grid.
  - Pulsing animated NorthSMP custom logo emblem.
  - One-click server IP copy button (`play.northsmp.net`) with animated toast feedback.
  - Promotional release banner with a real-time countdown clock (Days, Hours, Minutes, Seconds).
  - Community payment goal progress bar.

- **Dynamic Interactive Store Engine**:
  - **Global Shopping Cart**: Real-time badge counter, dynamic quantity increments/decrements, item removal, and auto-calculating total.
  - **Multi-Currency Switcher**: Instant switching between **USD ($)**, **EUR (€)**, **GBP (£)**, **CAD ($)**, **INR (₹)**, and **AUD ($)** with live price conversions.
  - **Live Theme Toggle**: Switch between **NorthSMP Arctic Cyan** and **Crimson Flame** styles.
  - **Minecraft Auth / Session**:
    - Java & Bedrock platform selector.
    - Live player head/skin avatar preview powered by Minecraft Crafatar/MC-Heads API.
    - Persistent login across all pages with user badge and logout button in header.
  - **Package Lore & Perks Modal**: Full-featured modal displaying in-game commands, weekly kits, permissions, and claims.
  - **Gifting System**: Send any rank, package, or keys as a gift to any Minecraft username.
  - **Basket & Checkout Page**: Coupon code system (`NORTH25`, `WELCOME`), checkout agreements verification, and order confirmation simulation.

---

## 🚀 Running the Store Locally

### Method 1: Using Node.js (Built-in Server)
```bash
npm start
# or
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Direct Browser Opening
Simply double-click `index.html` to open it in Chrome, Edge, or Firefox.

---

## 📁 Project Structure

```
NorthSMP Web/
├── index.html          # Main homepage (Sale banner, Categories, Info, Goal)
├── ranks.html          # Economy & Server Ranks category
├── coins.html          # Network Points & Gems category
├── crates.html         # Crate Keys category
├── login.html          # Minecraft player login (Java / Bedrock + 3D avatar)
├── basket.html         # Basket & Checkout (Coupon codes, agreements, modal)
├── server.js           # Lightweight zero-dependency HTTP server
├── package.json        # Project metadata & start script
├── assets/
│   ├── css/
│   │   └── style.css   # Full template stylesheets & custom theme variables
│   ├── js/
│   │   └── store.js    # Store engine (cart, promo clock, auth, toast, currency)
│   └── images/
│       ├── logo.svg    # Custom NorthSMP pulsing vector logo
│       ├── ranks.svg   # 3D crown rank illustration
│       ├── coins.svg   # 3D gem & coin illustration
│       └── crates.svg  # 3D mystic crate illustration
└── references/         # Extracted reference assets from FlaticSMP Everfront template
```

---

## ⚙️ How to Customize Further

When you're ready to add more details:
1. **Server IP**: Update `serverIp` inside `assets/js/store.js` or in the `copyToClipboard()` calls.
2. **Discord Link**: Replace `https://discord.gg/northsmp` with your server's permanent invite link.
3. **Packages & Pricing**: Add or edit ranks and crate items directly inside `ranks.html`, `coins.html`, and `crates.html`.
4. **Tebex Webstore Integration**: To connect to a live Tebex webstore, simply add your Tebex account ident or API token.

