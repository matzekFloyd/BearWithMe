import { createClient } from "pexels";

export class Api {
  static getPexelsClient() {
    if (!window.pexelsClient) {
      window.pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY);
    }
    return window.pexelsClient;
  }

  static async getBearCollection() {
    let pexelsClient = Api.getPexelsClient();
    let response = await pexelsClient.collections.media({
      id: process.env.REACT_APP_PEXELS_BEAR_COLLECTION_ID,
    });
    return response && response.media ? response.media : [];
  }

  static async getRandomBear() {
    let bears = await Api.getBearCollection();
    let idx = Math.floor(Math.random() * (bears.length - 0 + 1) + 0);
    return bears[idx];
  }
}
