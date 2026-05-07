# BearWithMe

BearWithMe is a small React app that shows a "bear of the day" with a sweet message.
It uses the Pexels API for bear images and includes local fallback content when remote fetches fail.

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

- `REACT_APP_PEXELS_API_KEY`
- `REACT_APP_PEXELS_BEAR_COLLECTION_ID`

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

## Notes on API Keys

`REACT_APP_*` variables are bundled into client-side code in Create React App.
Treat these keys as low-privilege and scoped/rate-limited.

For stronger protection, move Pexels calls behind a serverless endpoint and keep the provider key server-side only.
