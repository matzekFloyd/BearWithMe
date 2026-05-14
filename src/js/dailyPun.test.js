import { pickDailyPun, getDailyPun } from "./dailyPun";

test("pickDailyPun returns null for empty list", () => {
  expect(pickDailyPun(7, [])).toBeNull();
});

test("pickDailyPun uses seed modulo length", () => {
  let list = ["a", "b", "c"];
  expect(pickDailyPun(0, list)).toBe("a");
  expect(pickDailyPun(4, list)).toBe("b");
});

test("getDailyPun is stable for the same UTC calendar day", () => {
  let morningUtc = new Date(Date.UTC(2026, 4, 14, 2, 30, 0));
  let eveningUtc = new Date(Date.UTC(2026, 4, 14, 22, 0, 0));
  expect(getDailyPun(morningUtc)).toEqual(getDailyPun(eveningUtc));
});

test("getDailyPun changes across UTC midnight", () => {
  let before = new Date(Date.UTC(2026, 4, 14, 23, 59, 0));
  let after = new Date(Date.UTC(2026, 4, 15, 0, 1, 0));
  expect(getDailyPun(before)).not.toEqual(getDailyPun(after));
});
