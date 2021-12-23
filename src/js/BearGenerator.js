import { Pexels } from "./api/Pexels";
import { Bear } from "./models/Bear";
import { environmentIsDev, getIndex, itsChristmas } from "./util";
import BearFallback from "../json/bearFallback.json";
import Names from "../json/names.json";
import { FALLBACK_BEAR_NAME, NUMBER_OF_DAYS } from "./constants";

/**
 * @this BearGenerator
 */
export class BearGenerator {
  static async fetchBear() {
    let bear = null;
    let idx = getIndex();

    if (itsChristmas(new Date())) {
      console.log("Have a beary good christmas!");
      bear = new Bear({});
      bear.setName("Paddington");
      bear.setType("christmas");
    } else {
      console.log("Happy Bear day!");

      if (environmentIsDev()) {
        idx = localStorage.getItem("bearIndex");
        if (idx === NUMBER_OF_DAYS) idx = 0;
        idx++;
        localStorage.setItem("bearIndex", idx);
      }

      bear = await Pexels.getBearById(idx);
      if (!bear) {
        let bears = await Pexels.getBearCollection();
        bear = bears[idx];
      }
      if (!bear) {
        bear = new Bear(BearFallback);
        bear.setName(FALLBACK_BEAR_NAME);
      } else {
        bear = new Bear(bear);
        bear.setName(Names[idx]);
      }
    }
    return bear;
  }
}
