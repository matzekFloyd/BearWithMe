import puns from "../json/puns.json";
import { getDailyBearSeedUtc } from "./util";

/**
 * @param {number} seed
 * @param {string[]} punList
 * @returns {string | null}
 */
export function pickDailyPun(seed, punList) {
  if (punList.length === 0) {
    return null;
  }
  return punList[seed % punList.length];
}

/**
 * Pun for the given instant’s UTC calendar day (same seed as daily bear; see `getDailyBearSeedUtc`).
 * @param {Date} [date]
 * @returns {string | null}
 */
export function getDailyPun(date = new Date()) {
  let seed = getDailyBearSeedUtc(date);
  return pickDailyPun(seed, puns);
}
