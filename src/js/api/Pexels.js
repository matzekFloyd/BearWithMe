import { createClient } from "pexels";
import BearKeys from "../../json/bears.json";
import Names from "../../json/names.json";
import { Bear } from "../models/Bear";
import { getIndex } from "../util";
import { NUMBER_OF_DAYS } from "../constants";

/**
 * @this Pexels
 */
export class Pexels {
  static getClient() {
    if (!window.pexelsClient) {
      window.pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY);
    }
    return window.pexelsClient;
  }

  static async getBearCollection() {
    let collectionId = process.env.REACT_APP_PEXELS_BEAR_COLLECTION_ID;
    let pexelsClient = Pexels.getClient();
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
    let pexelsClient = Pexels.getClient();
    let id = BearKeys[getIndex()];
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

  /**
   * @todo should move this out of Pexels.js, and have a fallback bear image that does not depend on pexels
   * @returns 
   */
  static async getBear() {
    let idx = getIndex();
    let bear = await Pexels.getBearById();
    if (bear === null) {
      let bears = await Pexels.getBearCollection();
      bear = bears[idx];
    }
    bear = new Bear(bear);
    bear.setName(Names[idx]);
    return bear;
  }
}
