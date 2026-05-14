# 🐻 BearWithMe

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)
[![Unit tests](https://github.com/matzekFloyd/BearWithMe/actions/workflows/test.yml/badge.svg)](https://github.com/matzekFloyd/BearWithMe/actions/workflows/test.yml)

BearWithMe is a small React app for a bear of the day: each UTC calendar date picks a photo, a name, and a pun from local JSON. Tap the bear to reveal the pun after it loads.

It uses a serverless proxy to fetch bear photos from Pexels and falls back to bundled images when that request fails.

## Tech Stack

- React 17
- [Vite](https://vitejs.dev/) (dev server and production build)
- Sass
- [Vitest](https://vitest.dev/) for unit tests

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy `.env.example` to `.env` and set your own values.

Frontend variables (must be prefixed with `VITE_` so Vite exposes them to the browser):

- `VITE_API_BASE_URL` (optional, only if the API is on another origin in development)

Do not commit `.env` files or secret values.

### 3) Run the app

```bash
npm start
```

The dev server runs at `http://localhost:3000` (see `vite.config.js`).

## Scripts

- `npm start` / `npm run dev` — start the Vite dev server
- `npm test` — run tests once (CI mode)
- `npm run test:watch` — run tests in watch mode
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run analyze` — inspect bundle size (after `npm run build`)

## Serverless API (`/api/random-bear`)

This repository includes a Vercel Serverless Function at `api/random-bear.js`.
On Vercel, it is automatically available at `/api/random-bear`.

### Server-side environment variables

Configure these in your Vercel project environment variables:

- `PEXELS_API_KEY`
- `PEXELS_BEAR_COLLECTION_ID`

These are read on the server and are never bundled into frontend assets.

### Deploying on Vercel

The repo includes `vercel.json` with `"framework": "vite"` so the output directory is `dist/`.
If you previously deployed a Create React App build, update the project to use the Vite output (`dist`) instead of `build`.

### Local API development

To run the frontend and serverless routes together locally, use:

```bash
vercel dev
```

If you run only `npm start`, set `VITE_API_BASE_URL` in `.env` to your API origin (for example where `vercel dev` serves the app).

### Protection and behavior

- In-memory per-IP rate limiting (best effort)
- Response caching headers where configured in `api/random-bear.js`
- Minimal payload returned to the browser
- Graceful frontend fallback when the API request fails
- **Daily bear, name, and pun** are keyed to the same **UTC calendar day** (midnight UTC rolls content forward). If you ever need a specific local timezone instead, change the seed logic in `src/js/util.js` / `src/js/dailyPun.js` together with `api/random-bear.js` so server and client stay aligned.
