import { createClient } from "pexels";
import { getCurrentDayNumber } from "../util";

export class Api {
  static getPexelsClient() {
    if (!window.pexelsClient) {
      window.pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY);
    }
    return window.pexelsClient;
  }

  static async getBearCollection() {
    let pexelsClient = Api.getPexelsClient();
    let bears = [];
    for (let i = 0; i <= 5; i++) {
      let response = await pexelsClient.collections.media({
        id: process.env.REACT_APP_PEXELS_BEAR_COLLECTION_ID,
        page: i,
        per_page: 80,
      });
      if (response && response.media) {
        bears = bears.concat(response.media);
      }
    }
    return bears;
  }

  static async getRandomBear() {
    let bears = await Api.getBearCollection();
    let idx = Math.floor(Math.random() * (bears.length - 0 + 1) + 0);
    return bears[idx];
  }

  static async getBear() {
    let bears = await Api.getBearCollection();
    let numCurDay = getCurrentDayNumber(new Date());
    let evenDay = 273 % 2 === 0;
    let idx = evenDay ? numCurDay : bears.length - numCurDay;
    console.log("IDX ", idx, evenDay, numCurDay, bears.length);
    return bears[idx];
  }
}
