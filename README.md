# 🧺 Laundry Ledger

**Laundry Ledger** is a **mobile-first, offline-capable PWA** for tracking laundry pickups, service rates, payments, and running balances — built for real-world usage in India where laundry services are handled informally.

Instead of messy diaries and manual calculations, Laundry Ledger provides a **simple, reliable ledger** that works even without internet.

---

## ✨ Why Laundry Ledger?

In many households:

- Laundry is picked up multiple times before payment
- Rates may vary by service and over time
- Payments can be partial or in advance
- Calculating final dues is painful and error-prone

**Laundry Ledger solves this by:**

- Tracking every pickup (“lot”) with service-wise quantities
- Locking rates at the time of pickup
- Supporting partial payments and advances
- Automatically maintaining accurate balances
- Working fully offline

---

## 🧠 Core Concepts

- **Account**  
  Represents a laundry service provider (or customer).

- **Rate Card**  
  Defines service prices (ironing, washing, dry clean, etc.).  
  Supports historical rate changes with effective dates.

- **Lot (Pickup Entry)**  
  A single laundry pickup with quantities and locked rates.

- **Payment**  
  Any payment made (full, partial, or advance).

- **Balance**  
  Automatically calculated as:  
  `Total Lots − Total Payments`

---

## 📱 Features

### ✅ Current

- Offline-first (IndexedDB via Dexie)
- Installable PWA (Android & iOS)
- Multiple accounts
- Global & per-account rate cards
- Pickup (lot) entry with locked rates
- Partial & advance payments
- Accurate running balance
- Clean, mobile-friendly UI

### 🛠 Planned

- Fast mobile lot entry UX
- Monthly statements
- PDF receipts
- Data export / backup
- Optional cloud sync

---

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Storage:** IndexedDB (Dexie.js)
- **State Management:** React Hooks
- **Styling:** Tailwind CSS
- **Typography:**
  - Headings → Sora
  - Body → DM Sans
- **PWA:** Web App Manifest + iOS support

---

## 📴 Offline-First by Design

- All data is stored locally using IndexedDB
- App works without internet once loaded
- No backend required for core functionality
- Designed to degrade gracefully on iOS PWA constraints

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
pnpm install
```

### 2️⃣ Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📲 PWA Installation

### Android (Chrome)

- Open the app
- Tap **“Add to Home Screen”**

### iOS (Safari)

- Open the app
- Tap **Share → Add to Home Screen**

The app will run in **standalone mode**, like a native app.

---

## 🗂 Project Structure (High-Level)

```
app/                # App Router pages
components/         # UI components
components/ui/      # Reusable UI primitives
features/           # Domain-specific hooks & logic
lib/
  ├── db/            # Dexie schema & DB setup
  ├── ledger/        # Balance & accounting logic
public/
  ├── icons/         # PWA icons
```

---

## 🔒 Data Safety Notes

- Data lives **only on the device**
- Clearing browser storage will delete data
- iOS may evict storage if unused for long periods
- Export / backup features are planned

---

## 🧪 Development Notes

- Mobile-first UX
- Offline-first architecture
- Deterministic accounting logic
- Reusable UI components
- PWA-focused design decisions

---

## 📄 License

This project is currently for **personal / internal use**.  
License to be decided if/when open-sourced publicly.

---

## 🙌 Motivation

Laundry Ledger is built to solve a **real, everyday problem**, not as a demo or tutorial app.

If it works well for daily use, it can scale into a shared tool for both:

- Service providers
- Customers

---

> _“Good software removes friction from real life.”_
