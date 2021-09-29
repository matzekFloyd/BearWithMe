import { NUMBER_OF_DAYS } from "./constants";

export function getCurrentDayNumber(date) {
  let number = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return number;
}

export function getIndex() {
  let numCurDay = getCurrentDayNumber(new Date());
  let evenDay = numCurDay % 2 === 0;
  let idx = evenDay ? numCurDay : NUMBER_OF_DAYS - numCurDay;
  return idx;
}
