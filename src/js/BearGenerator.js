import { Pexels } from "./api/Pexels";
import { Bear } from "./models/Bear";
import { getIndex, itsChristmas } from "./util";
import BearFallback from "../json/bearFallback.json";
import Names from "../json/names.json";
import { FALLBACK_BEAR_NAME } from "./constants";

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
      bear = await Pexels.getRandomBear();
      if (!bear) {
        bear = new Bear(BearFallback);
        bear.setName(FALLBACK_BEAR_NAME);
      } else {
        bear.setName(Names[idx % Names.length]);
      }
    }
    return bear;
  }
}
