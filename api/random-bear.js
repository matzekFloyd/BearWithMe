const CACHE_TTL_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

let cachedResponse = null;
let cacheExpiresAt = 0;
const rateLimitStore = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (!forwarded) return "unknown";
  return forwarded.split(",")[0].trim();
}

function withinRateLimit(ip, now) {
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return true;
}

function toMinimalBear(photo) {
  return {
    id: photo.id,
    width: photo.width,
    height: photo.height,
    photographer: photo.photographer,
    photographer_url: photo.photographer_url,
    url: photo.url,
    src: {
      large: photo.src?.large,
      large2x: photo.src?.large2x,
      landscape: photo.src?.landscape,
      medium: photo.src?.medium,
      original: photo.src?.original,
      portrait: photo.src?.portrait,
      small: photo.src?.small,
      tiny: photo.src?.tiny,
    },
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const now = Date.now();
  const clientIp = getClientIp(req);
  if (!withinRateLimit(clientIp, now)) {
    return res.status(429).json({ error: "rate_limited" });
  }

  if (cachedResponse && now < cacheExpiresAt) {
    res.setHeader("Cache-Control", "public, max-age=60");
    return res.status(200).json(cachedResponse);
  }

  const apiKey = process.env.PEXELS_API_KEY || process.env.REACT_APP_PEXELS_API_KEY;
  const collectionId =
    process.env.PEXELS_BEAR_COLLECTION_ID || process.env.REACT_APP_PEXELS_BEAR_COLLECTION_ID;
  if (!apiKey || !collectionId) {
    return res.status(500).json({
      error: "server_not_configured",
      message: "Missing PEXELS_API_KEY/PEXELS_BEAR_COLLECTION_ID environment variables",
    });
  }

  try {
    const page = Math.floor(Math.random() * 5) + 1;
    const response = await fetch(
      `https://api.pexels.com/v1/collections/${collectionId}?type=photos&per_page=80&page=${page}`,
      {
        headers: { Authorization: apiKey },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "upstream_error" });
    }

    const data = await response.json();
    const media = Array.isArray(data.media)
      ? data.media.filter((item) => item && item.type === "Photo" && item.src)
      : [];
    if (media.length === 0) {
      return res.status(404).json({ error: "no_bears_found" });
    }

    const randomIndex = Math.floor(Math.random() * media.length);
    const payload = { bear: toMinimalBear(media[randomIndex]) };

    cachedResponse = payload;
    cacheExpiresAt = now + CACHE_TTL_MS;

    res.setHeader("Cache-Control", "public, max-age=60");
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(502).json({ error: "proxy_request_failed" });
  }
};
