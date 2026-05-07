import { Bear } from "../models/Bear";

/**
 * @this Pexels
 */
export class Pexels {
  static async getRandomBear() {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "";
    let bearObj = null;
    try {
      const response = await fetch(`${apiBaseUrl}/api/random-bear`, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const payload = await response.json();
      bearObj = payload && payload.bear ? payload.bear : null;
    } catch (error) {
      console.error("Could not fetch random bear from backend endpoint", error);
    }
    return bearObj ? new Bear(bearObj) : null;
  }
}
