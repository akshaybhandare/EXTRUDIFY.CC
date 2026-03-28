# EXTRUDIFY.CC

Vue website for a 3D printing studio with a live quote flow.

## Run

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run server
```

Start the frontend:

```bash
npm run dev -- --host 0.0.0.0
```

Build for production:

```bash
npm run build
```

## Important Files

- `server/pricing.json` - update pricing, filaments, colors, machine rate, min profit, and build settings here
- `server/index.js` - simple Express API for quote preview and final email submission
- `server/quoteLogic.js` - quote calculation logic matching the reference `3d.html`
- `src/views/QuoteView.vue` - customer quote page UI

## How To Start

1. Install dependencies:

```bash
npm install
```

2. Set email variables:

```bash
export GMAIL_USER="yourgmail@gmail.com"
export GMAIL_APP_PASSWORD="your-app-password"
export OWNER_EMAIL="yourgmail@gmail.com"
```

3. Start backend:

```bash
npm run server
```

4. Start frontend in another terminal:

```bash
npm run dev -- --host 0.0.0.0
```

5. Open the local Vite URL shown in the terminal.

## How To Add Filament

Edit `server/pricing.json` inside `filamentCatalog`.

Example:

```json
{
  "id": "pla-silk",
  "label": "PLA Silk",
  "type": "PLA",
  "pricePerKg": 1800,
  "colors": ["Gold", "Silver", "Copper"]
}
```

Important:

- `id` must be unique
- `type` should match a key in `densities` and `materialPremiums`
- `colors` is what the customer sees in the quote form

After editing `server/pricing.json`, restart `npm run server`.

## How To Set Price

Edit `pricePerKg` for a filament in `server/pricing.json`.

Example:

```json
"pricePerKg": 1500
```

## Other Pricing Settings

Edit these in `server/pricing.json` under `quoteSettings`:

- `buildX`, `buildY`, `buildZ` - printer build size in mm
- `shell` - shell thickness
- `layer` - layer height used in pricing
- `speed` - print speed
- `rate` - machine hourly rate
- `minProfit` - minimum profit added if calculated profit is too low

You can also edit:

- `densities` - material density lookup
- `materialPremiums` - extra profit percentages by material type
- `maxFileSizeBytes` - max STL attachment size

## Email Setup

Set these environment variables before running `npm run server`:

```bash
export GMAIL_USER="yourgmail@gmail.com"
export GMAIL_APP_PASSWORD="your-app-password"
export OWNER_EMAIL="yourgmail@gmail.com"
```

## Quote Flow

- customer uploads an STL file
- customer selects filament, color, infill, copies, notes, and shipping details
- backend calculates the final price server-side
- on submit, the STL is attached to the email sent to you
- temp STL files are deleted after email handling

## Notes

- only one markdown file is kept in this repo
- max STL attachment size is controlled in `server/pricing.json`
- if pricing changes, rebuild is not required for frontend-only display, but restart the backend after editing `server/pricing.json`
