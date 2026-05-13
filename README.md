# BearWithMe

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)

BearWithMe is a small React app that shows a "bear of the day" with a sweet message.
It uses a serverless proxy to fetch Pexels bear images and includes local fallback content when remote fetches fail.

## Tech Stack

- React (Create React App)
- Sass
- Pexels JavaScript SDK

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy `.env.example` to `.env` and set your own values.

Required variables:

- `REACT_APP_API_BASE_URL` (optional, only if API is on another origin)

Do not commit `.env` files or secret values.

### 3) Run the app

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Scripts

- `npm start` - start the development server
- `npm test` - run tests in watch mode
- `npm run build` - create a production build
- `npm run analyze` - inspect bundle size

## Serverless API (`/api/random-bear`)

This repository includes a Vercel Serverless Function at `api/random-bear.js`.
On Vercel, it is automatically available at `/api/random-bear`.

### Server-side environment variables

Configure these in your Vercel project environment variables:

- `PEXELS_API_KEY`
- `PEXELS_BEAR_COLLECTION_ID`

These are read on the server and are never bundled into frontend assets.

### Build compatibility note

This project currently uses `react-scripts@4`, which can require OpenSSL legacy mode on modern Node versions.
The `build` script already sets this flag via `cross-env`:

```bash
npm run build
```

For Vercel, set this environment variable to make deployments reproducible:

- `NODE_OPTIONS=--openssl-legacy-provider`

### Local API development

To run frontend and serverless routes together locally, use:

```bash
vercel dev
```

If you run only `npm start`, set `REACT_APP_API_BASE_URL` to your API host.

### Protection and behavior

- In-memory per-IP rate limiting (best effort)
- Short response cache (`max-age=60`)
- Minimal payload returned to the browser
- Graceful frontend fallback when API request fails
