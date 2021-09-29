import { createClient } from "pexels";
import { getCurrentDayNumber } from "../util";
import BearKeys from "./bears.json";
import { Bear } from "../models/Bear";

const NUMBER_OF_DAYS = 366;

/**
 * @this Api
 */
export class Api {
  static getPexelsClient() {
    if (!window.pexelsClient) {
      window.pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY);
    }
    return window.pexelsClient;
  }

  static getIndex() {
    let numCurDay = getCurrentDayNumber(new Date());
    let evenDay = numCurDay % 2 === 0;
    let idx = evenDay ? numCurDay : NUMBER_OF_DAYS - numCurDay;
    return idx;
  }

  static async getBearCollection() {
    let collectionId = process.env.REACT_APP_PEXELS_BEAR_COLLECTION_ID;
    let pexelsClient = Api.getPexelsClient();
    let bears = [];
    try {
      for (let i = 0; i <= 5; i++) {
        let response = await pexelsClient.collections.media({
          id: collectionId,
          page: i,
          per_page: 80,
        });
        if (response && response.media) {
          bears = bears.concat(response.media);
        }
      }
      bears = bears.slice(0, NUMBER_OF_DAYS);
    } catch (error) {
      console.error(
        `Could not fetch collection from pexels with id ${collectionId} \n`,
        error
      );
      bears = [];
    }
    return bears;
  }

  static async getBearById() {
    let pexelsClient = Api.getPexelsClient();
    let id = BearKeys[Api.getIndex()];
    let bear = null;
    try {
      bear = await pexelsClient.photos.show({ id: id });
      bear = new Bear(bear);
    } catch (error) {
      console.error(
        `Could not fetch image from pexels with id ${id} \n`,
        error
      );
    }
    return bear;
  }

  static async getBear() {
    let bear = await Api.getBearById();
    if (bear === null) {
      let bears = await Api.getBearCollection();
      bear = bears[Api.getIndex()];
    }
    return new Bear(bear);
  }
}
