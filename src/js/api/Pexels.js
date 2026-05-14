import { Bear } from "../models/Bear";

/**
 * @this Pexels
 */
export class Pexels {
  static async getRandomBear() {
    let apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
    let path = `${apiBaseUrl}/api/random-bear`.replace(/\/{2,}/g, "/");
    if (!path.startsWith("http")) {
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      path = new URL(
        path,
        globalThis.location?.origin
          ? globalThis.location.origin
          : "http://localhost:3000"
      ).href;
    }
    let bearObj = null;
    try {
      const response = await fetch(path, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const payload = await response.json();
      bearObj = payload && payload.bear ? payload.bear : null;
    } catch (error) {
      if (!import.meta.env.VITEST) {
        console.error(
          "Could not fetch random bear from backend endpoint",
          error
        );
      }
    }
    return bearObj ? new Bear(bearObj) : null;
  }
}
