export function getCurrentDayNumber(date) {
  let number = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return number;
}

/**
 * UTC calendar date as YYYY-MM-DD. Same string for all users on the same UTC day.
 * @param {Date} [date]
 * @returns {string}
 */
export function getUtcDateKey(date = new Date()) {
  let y = date.getUTCFullYear();
  let m = String(date.getUTCMonth() + 1).padStart(2, "0");
  let d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Stable integer per UTC calendar day (days since Unix epoch at UTC midnight).
 * Used with modulo so everyone gets the same bear + name for that UTC day.
 * @param {Date} [date]
 * @returns {number}
 */
export function getDailyBearSeedUtc(date = new Date()) {
  let utcMidnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return Math.floor(utcMidnight / (24 * 60 * 60 * 1000));
}

export function itsChristmas(date = null) {
  let curDate = date ? date : new Date();
  return parseInt(curDate.getUTCDate()) === 24 && parseInt(curDate.getUTCMonth()) === 11;
}

export function environmentIsDev() {
  return process.env.NODE_ENV === "development";
}
