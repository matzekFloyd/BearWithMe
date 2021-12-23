import { getCurrentDayNumber, itsChristmas } from "./util";

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