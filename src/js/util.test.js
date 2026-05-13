import {
  getCurrentDayNumber,
  getDailyBearSeedUtc,
  getUtcDateKey,
  itsChristmas,
} from "./util";

test("expect the first day of january to be day #1", () => {
  let firstOfJanuary = new Date(Date.UTC(2021, 0, 1, 0, 0, 0));
  expect(getCurrentDayNumber(firstOfJanuary)).toEqual(1);
});

test("expect the last day of december to be day #365", () => {
  let lastOfDecember = new Date(Date.UTC(2021, 11, 31, 0, 0, 0));
  expect(getCurrentDayNumber(lastOfDecember)).toEqual(365);
});

test("expect the last day of december in a leap year to be day #366", () => {
  let lastOfDecemberLeapYear = new Date(Date.UTC(2004, 11, 31, 0, 0, 0));
  expect(getCurrentDayNumber(lastOfDecemberLeapYear)).toEqual(366);
});

test("expect date to be christmas", () => {
  let dateToCheck = new Date(Date.UTC(2013, 11, 24, 0, 0, 0));
  expect(itsChristmas(dateToCheck)).toEqual(true);
});

test("expect date to not be christmas", () => {
  let dateToCheck = new Date(Date.UTC(1991, 9, 22, 0, 0, 0));
  expect(itsChristmas(dateToCheck)).toEqual(false);
});

test("UTC date key and daily seed are stable for the same UTC calendar day", () => {
  let morningUtc = new Date(Date.UTC(2026, 4, 14, 2, 30, 0));
  let eveningUtc = new Date(Date.UTC(2026, 4, 14, 22, 0, 0));
  expect(getUtcDateKey(morningUtc)).toEqual("2026-05-14");
  expect(getUtcDateKey(eveningUtc)).toEqual("2026-05-14");
  expect(getDailyBearSeedUtc(morningUtc)).toEqual(getDailyBearSeedUtc(eveningUtc));
});

test("UTC daily seed changes across UTC midnight", () => {
  let before = new Date(Date.UTC(2026, 4, 14, 23, 59, 0));
  let after = new Date(Date.UTC(2026, 4, 15, 0, 1, 0));
  expect(getDailyBearSeedUtc(before)).not.toEqual(getDailyBearSeedUtc(after));
});