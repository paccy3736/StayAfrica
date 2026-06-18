# StayAfrica — Hotel Booking Platform

A Booking.com-inspired hotel booking web app built with **React + Vite + Tailwind CSS**.

> Portfolio clone project. Uses royalty-free Unsplash images and original branding.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Vite | Build tool / dev server |
| React 18 | UI library |
| Tailwind CSS v4 | Styling & responsive design |
| React Router DOM | Client-side routing |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## Folder Structure

```
src/
├── components/
│   ├── Header.jsx        # Sticky nav with hamburger mobile menu
│   ├── Footer.jsx        # Footer with link columns
│   ├── SearchCard.jsx    # Hero search form (destination, dates, guests)
│   └── PropertyCard.jsx  # Reusable property listing card
├── pages/
│   ├── HomePage.jsx      # Hero, search, type tabs, trending, deals
│   ├── SearchPage.jsx    # Filter sidebar, sortable results grid
│   ├── PropertyPage.jsx  # Gallery, amenities, rooms table, booking widget
│   ├── LoginPage.jsx     # Sign-in form (UI only)
│   └── SignupPage.jsx    # Registration form (UI only)
├── data/
│   └── properties.json   # 10 sample listings (mock data)
├── App.jsx               # Route definitions
└── main.jsx              # App entry point with BrowserRouter
```

---

## Routing Map

```
/                    → HomePage
/search?destination= → SearchPage (with filters + sort)
/property/:id        → PropertyPage (detail view)
/login               → LoginPage
/signup              → SignupPage
```

---

## Component List

- **Header** — sticky, responsive with hamburger menu on mobile
- **Footer** — 4-column link grid + copyright bar
- **SearchCard** — controlled form that navigates to `/search` with query params
- **PropertyCard** — image, name, location, rating badge, amenity chips, price
- **HomePage** — hero + overlapping search card, property type tabs, trending destinations grid, deals carousel
- **SearchPage** — real-time filter by price/type/amenities, sort dropdown, mobile filter toggle
- **PropertyPage** — image gallery with lightbox, room types table, sticky booking widget with price calculation, reviews
- **LoginPage / SignupPage** — form layouts matching the reference style (UI only, no auth)

---

## Data Shape (`properties.json`)

```json
{
  "id": "1",
  "name": "Kigali Serena Hotel",
  "location": "Kigali, Rwanda",
  "pricePerNight": 185,
  "rating": 4.8,
  "reviewCount": 312,
  "stars": 5,
  "type": "Hotel",
  "amenities": ["Free WiFi", "Pool", "Breakfast included"],
  "images": ["url1", "url2", "url3"],
  "description": "...",
  "roomTypes": [
    { "name": "Standard Room", "capacity": 2, "price": 185 }
  ]
}
```

---

## Deploying

### Vercel (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework preset: **Vite** — Vercel detects this automatically
4. Click Deploy ✓

### Netlify
1. Push to GitHub
2. New site → Connect repo
3. Build command: `npm run build`, publish dir: `dist`
4. Deploy ✓
