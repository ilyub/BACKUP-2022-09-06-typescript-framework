import { implementations } from "@";
import { typedef } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";
// eslint-disable-next-line import/no-duplicates -- Ok
import enUS from "date-fns/locale/en-US";
// eslint-disable-next-line import/no-duplicates -- Ok
import ru from "date-fns/locale/ru";
import type { datetime } from "@skylib/facades";
import type { NumStr } from "@skylib/functions";

const dateFns = implementations.datetime.dateFnsWrapper;

testUtils.installFakeTimer();

function d(
  date: Date | datetime.DateTime | NumStr = "1950-06-15 14:30:30"
): datetime.DateTime {
  return dateFns.create(date);
}

test.each([
  { expected: "1950-06-15 14:31:30", unit: typedef<datetime.Unit>("minute") },
  { expected: "1950-06-15 15:30:30", unit: typedef<datetime.Unit>("hour") },
  { expected: "1950-06-16 14:30:30", unit: typedef<datetime.Unit>("day") },
  { expected: "1950-06-22 14:30:30", unit: typedef<datetime.Unit>("week") },
  { expected: "1950-07-15 14:30:30", unit: typedef<datetime.Unit>("month") },
  { expected: "1951-06-15 14:30:30", unit: typedef<datetime.Unit>("year") }
])("DateTime.add: 1", ({ expected, unit }) => {
  expect(d().add(1, unit)).datetimeToBe(expected);
});

test.each([
  { expected: "1950-06-15 14:32:30", unit: typedef<datetime.Unit>("minute") },
  { expected: "1950-06-15 16:30:30", unit: typedef<datetime.Unit>("hour") },
  { expected: "1950-06-17 14:30:30", unit: typedef<datetime.Unit>("day") },
  { expected: "1950-06-29 14:30:30", unit: typedef<datetime.Unit>("week") },
  { expected: "1950-08-15 14:30:30", unit: typedef<datetime.Unit>("month") },
  { expected: "1952-06-15 14:30:30", unit: typedef<datetime.Unit>("year") }
])("DateTime.add: 2", ({ expected, unit }) => {
  expect(d().add(2, unit)).datetimeToBe(expected);
});

test("DateTime.clone", () => {
  const date1 = d();

  const date2 = date1.clone();

  {
    expect(date1).datetimeToBe("1950-06-15 14:30:30");
    expect(date2).datetimeToBe("1950-06-15 14:30:30");
  }

  {
    date1.add(1, "minute");
    expect(date1).datetimeToBe("1950-06-15 14:31:30");
    expect(date2).datetimeToBe("1950-06-15 14:30:30");
  }

  {
    date2.add(1, "hour");
    expect(date1).datetimeToBe("1950-06-15 14:31:30");
    expect(date2).datetimeToBe("1950-06-15 15:30:30");
  }
});

test.each([
  { date: "1950-06-01 14:30", expected: 1 },
  { date: "1950-06-15 14:30", expected: 15 },
  { date: "1950-06-30 14:30", expected: 30 }
])("DateTime.dayOfMonth", ({ date, expected }) => {
  expect(d(date).dayOfMonth()).toBe(expected);
});

test.each([
  { date: "1950-06-11 14:30", expected: 0 },
  { date: "1950-06-12 14:30", expected: 1 },
  { date: "1950-06-17 14:30", expected: 6 }
])("DateTime.dayOfWeek", ({ date, expected }) => {
  dateFns.configure({ firstDayOfWeek: 0 });
  expect(d(date).dayOfWeek()).toBe(expected);
  dateFns.configure({ firstDayOfWeek: 1 });
  expect(d(date).dayOfWeek()).toBe(expected);
});

test.each([
  { expected: "15 Jun 1950", format: "d MMM yyyy" },
  { expected: "02:30 PM", format: "HHHH:mm A" },
  { expected: "2:30 PM", format: "HHH:mm A" },
  { expected: "02:30 PM", format: "hh:mm a" },
  { expected: "2:30 PM", format: "h:mm a" },
  { expected: "14:30", format: "HH:mm" },
  { expected: "14:30", format: "H:mm" }
])("DateTime.format: English", ({ expected, format }) => {
  dateFns.configure({ locale: enUS, pm: true });
  expect(d().format(format)).toBe(expected);
});

test.each([
  { expected: "15 июн. 1950", format: "d MMM yyyy" },
  { expected: "14:30", format: "HHHH:mm A" },
  { expected: "14:30", format: "HHH:mm A" },
  { expected: "02:30 ПП", format: "hh:mm a" },
  { expected: "2:30 ПП", format: "h:mm a" },
  { expected: "14:30", format: "HH:mm" },
  { expected: "14:30", format: "H:mm" }
])("DateTime.format: Russian", ({ expected, format }) => {
  dateFns.configure({ locale: ru, pm: false });
  expect(d().format(format)).toBe(expected);
});

test.each([
  { date: "1950-06-15 00:30", expected: 0 },
  { date: "1950-06-15 12:30", expected: 12 },
  { date: "1950-06-15 23:30", expected: 23 }
])("DateTime.hours", ({ date, expected }) => {
  expect(d(date).hours()).toBe(expected);
});

test.each([
  { date: "1950-06-15 14:30", expected: true },
  { date: "1950-06-15 14:31", expected: true },
  { date: "1950-06-15 15:30", expected: true },
  { date: "1950-06-16 14:30", expected: false },
  { date: "1950-07-15 14:30", expected: false },
  { date: "1951-06-15 14:30", expected: false }
])("DateTime.isSameDayOfMonth", ({ date, expected }) => {
  expect(d().isSameDayOfMonth(d(date))).toBe(expected);
});

test.each([
  { date: "1950-06-15 14:30", expected: true },
  { date: "1950-06-15 14:31", expected: true },
  { date: "1950-06-15 15:30", expected: false },
  { date: "1950-06-16 14:30", expected: false },
  { date: "1950-07-15 14:30", expected: false },
  { date: "1951-06-15 14:30", expected: false }
])("DateTime.isSameHour", ({ date, expected }) => {
  expect(d().isSameHour(d(date))).toBe(expected);
});

test.each([
  { date: "1950-06-15 14:30", expected: true },
  { date: "1950-06-15 14:31", expected: false },
  { date: "1950-06-15 15:30", expected: false },
  { date: "1950-06-16 14:30", expected: false },
  { date: "1950-07-15 14:30", expected: false },
  { date: "1951-06-15 14:30", expected: false }
])("DateTime.isSameMinute", ({ date, expected }) => {
  expect(d().isSameMinute(d(date))).toBe(expected);
});

test.each([
  { date: "1950-06-15 14:30", expected: true },
  { date: "1950-06-15 14:31", expected: true },
  { date: "1950-06-15 15:30", expected: true },
  { date: "1950-06-16 14:30", expected: true },
  { date: "1950-07-15 14:30", expected: false },
  { date: "1951-06-15 14:30", expected: false }
])("DateTime.isSameMonth", ({ date, expected }) => {
  expect(d().isSameMonth(d(date))).toBe(expected);
});

test.each([
  { date: "1950-06-15 14:30", expected: true },
  { date: "1950-06-15 14:31", expected: true },
  { date: "1950-06-15 15:30", expected: true },
  { date: "1950-06-16 14:30", expected: true },
  { date: "1950-07-15 14:30", expected: true },
  { date: "1951-06-15 14:30", expected: false }
])("DateTime.isSameYear", ({ date, expected }) => {
  expect(d().isSameYear(d(date))).toBe(expected);
});

test.each([
  { date: "1950-06-15 14:00", expected: 0 },
  { date: "1950-06-15 14:30", expected: 30 },
  { date: "1950-06-15 14:59", expected: 59 }
])("DateTime.minutes", ({ date, expected }) => {
  expect(d(date).minutes()).toBe(expected);
});

test.each([
  { date: "1950-01-15 14:30", expected: 0 },
  { date: "1950-06-15 14:30", expected: 5 },
  { date: "1950-12-15 14:30", expected: 11 }
])("DateTime.month", ({ date, expected }) => {
  expect(d(date).month()).toBe(expected);
});

test.each([
  { day: 1, expected: "1950-06-01 14:30:30" },
  { day: 15, expected: "1950-06-15 14:30:30" },
  { day: 30, expected: "1950-06-30 14:30:30" }
])("DateTime.setDayOfMonth", ({ day, expected }) => {
  expect(d().setDayOfMonth(day)).datetimeToBe(expected);
});

test.each([
  { day: 0, expected: "1950-06-11 14:30:30" },
  { day: 1, expected: "1950-06-12 14:30:30" },
  { day: 6, expected: "1950-06-17 14:30:30" }
])("DateTime.setDayOfWeek: 0", ({ day, expected }) => {
  expect(d().setDayOfWeek(day, 0)).datetimeToBe(expected);
});

test.each([
  { day: 0, expected: "1950-06-18 14:30:30" },
  { day: 1, expected: "1950-06-12 14:30:30" },
  { day: 6, expected: "1950-06-17 14:30:30" }
])("DateTime.setDayOfWeek: 1", ({ day, expected }) => {
  expect(d().setDayOfWeek(day, 1)).datetimeToBe(expected);
});

test.each([
  { day: 0, expected: "1950-06-11 14:30:30" },
  { day: 1, expected: "1950-06-12 14:30:30" },
  { day: 6, expected: "1950-06-17 14:30:30" }
])("DateTime.setDayOfWeekLocale", ({ day, expected }) => {
  dateFns.configure({ firstDayOfWeek: 0 });
  expect(d().setDayOfWeekLocale(day)).datetimeToBe(expected);
});

test.each([
  { day: 0, expected: "1950-06-18 14:30:30" },
  { day: 1, expected: "1950-06-12 14:30:30" },
  { day: 6, expected: "1950-06-17 14:30:30" }
])("DateTime.setDayOfWeekLocale", ({ day, expected }) => {
  dateFns.configure({ firstDayOfWeek: 1 });
  expect(d().setDayOfWeekLocale(day)).datetimeToBe(expected);
});

test.each([
  { expected: "1950-06-15 00:30:30", hours: 0 },
  { expected: "1950-06-15 12:30:30", hours: 12 },
  { expected: "1950-06-15 23:30:30", hours: 23 }
])("DateTime.setHours", ({ expected, hours }) => {
  expect(d().setHours(hours)).datetimeToBe(expected);
});

test.each([
  { expected: "1950-06-15 14:00:30", minutes: 0 },
  { expected: "1950-06-15 14:30:30", minutes: 30 },
  { expected: "1950-06-15 14:59:30", minutes: 59 }
])("DateTime.setMinutes", ({ expected, minutes }) => {
  expect(d().setMinutes(minutes)).datetimeToBe(expected);
});

test.each([
  { expected: "1950-01-15 14:30:30", month: 0 },
  { expected: "1950-06-15 14:30:30", month: 5 },
  { expected: "1950-12-15 14:30:30", month: 11 }
])("DateTime.setMonth", ({ expected, month }) => {
  expect(d().setMonth(month)).datetimeToBe(expected);
});

test("DateTime.setStartOfDay", () => {
  expect(d().setStartOfDay()).datetimeToBe("1950-06-15 00:00");
});

test("DateTime.setStartOfHour", () => {
  expect(d().setStartOfHour()).datetimeToBe("1950-06-15 14:00");
});

test("DateTime.setStartOfMinute", () => {
  expect(d().setStartOfMinute()).datetimeToBe("1950-06-15 14:30");
});

test("DateTime.setStartOfMonth", () => {
  expect(d().setStartOfMonth()).datetimeToBe("1950-06-01 00:00");
});

test("DateTime.setStartOfWeek", () => {
  expect(d().setStartOfWeek(0)).datetimeToBe("1950-06-11 00:00");
  expect(d().setStartOfWeek(1)).datetimeToBe("1950-06-12 00:00");
});

test("DateTime.setStartOfWeekLocale", () => {
  dateFns.configure({ firstDayOfWeek: 0 });
  expect(d().setStartOfWeekLocale()).datetimeToBe("1950-06-11 00:00");
  dateFns.configure({ firstDayOfWeek: 1 });
  expect(d().setStartOfWeekLocale()).datetimeToBe("1950-06-12 00:00");
});

test("DateTime.setStartOfYear", () => {
  expect(d().setStartOfYear()).datetimeToBe("1950-01-01 00:00");
});

test.each([
  { expected: "1951-06-15 14:30:30", year: 1951 },
  { expected: "1952-06-15 14:30:30", year: 1952 },
  { expected: "1953-06-15 14:30:30", year: 1953 }
])("DateTime.setYear", ({ expected, year }) => {
  expect(d().setYear(year)).datetimeToBe(expected);
});

test.each([
  { expected: "1950-06-15 14:29:30", unit: typedef<datetime.Unit>("minute") },
  { expected: "1950-06-15 13:30:30", unit: typedef<datetime.Unit>("hour") },
  { expected: "1950-06-14 14:30:30", unit: typedef<datetime.Unit>("day") },
  { expected: "1950-06-08 14:30:30", unit: typedef<datetime.Unit>("week") },
  { expected: "1950-05-15 14:30:30", unit: typedef<datetime.Unit>("month") },
  { expected: "1949-06-15 14:30:30", unit: typedef<datetime.Unit>("year") }
])("DateTime.sub: 1", ({ expected, unit }) => {
  expect(d().sub(1, unit)).datetimeToBe(expected);
});

test.each([
  { expected: "1950-06-15 14:28:30", unit: typedef<datetime.Unit>("minutes") },
  { expected: "1950-06-15 12:30:30", unit: typedef<datetime.Unit>("hours") },
  { expected: "1950-06-13 14:30:30", unit: typedef<datetime.Unit>("days") },
  { expected: "1950-06-01 14:30:30", unit: typedef<datetime.Unit>("weeks") },
  { expected: "1950-04-15 14:30:30", unit: typedef<datetime.Unit>("months") },
  { expected: "1948-06-15 14:30:30", unit: typedef<datetime.Unit>("years") }
])("DateTime.sub: 2", ({ expected, unit }) => {
  expect(d().sub(2, unit)).datetimeToBe(expected);
});

test.each(["1950-06-15 14:30", "1950-06-15 14:30:30"])(
  "DateTime.toDate",
  date => {
    expect(d(date).toDate()).toStrictEqual(new Date(date));
  }
);

test.each(["1950-06-15 14:30", "1950-06-15 14:30:30"])(
  "DateTime.toString",
  date => {
    dateFns.configure({ pm: true });
    expect(d(date).toString()).toBe(date);
    dateFns.configure({ pm: false });
    expect(d(date).toString()).toBe(date);
  }
);

test("DateTime.toTime", () => {
  const date = new Date();

  expect(d(date).toTime()).toBe(date.getTime());
});

test("DateTime.toTimeSec", () => {
  const date = new Date();

  expect(d(date).toTimeSec()).toBe(date.getTime() / 1000);
});

test.each([
  { date: "1950-06-15 14:30", expected: 1950 },
  { date: "1951-06-15 14:30", expected: 1951 },
  { date: "1952-06-15 14:30", expected: 1952 }
])("DateTime.year", ({ date, expected }) => {
  expect(d(date).year()).toBe(expected);
});

test("configure, getConfiguration", () => {
  expect(dateFns.getConfiguration().firstDayOfWeek).toBe(0);
  dateFns.configure({ firstDayOfWeek: 1 });
  expect(dateFns.getConfiguration().firstDayOfWeek).toBe(1);
});

test("create", () => {
  const date1 = dateFns.create("1950-06-15 14:30");

  const date2 = dateFns.create(date1);

  const date3 = dateFns.create(date1.toDate());

  const date4 = dateFns.create(date1.toTime());

  {
    expect(date1).datetimeToBe("1950-06-15 14:30");
    expect(date2).datetimeToBe("1950-06-15 14:30");
    expect(date3).datetimeToBe("1950-06-15 14:30");
    expect(date4).datetimeToBe("1950-06-15 14:30");
  }

  {
    date1.add(1, "minute");
    expect(date1).datetimeToBe("1950-06-15 14:31");
    expect(date2).datetimeToBe("1950-06-15 14:30");
    expect(date3).datetimeToBe("1950-06-15 14:30");
    expect(date4).datetimeToBe("1950-06-15 14:30");
  }

  {
    date2.add(1, "hour");
    expect(date1).datetimeToBe("1950-06-15 14:31");
    expect(date2).datetimeToBe("1950-06-15 15:30");
    expect(date3).datetimeToBe("1950-06-15 14:30");
    expect(date4).datetimeToBe("1950-06-15 14:30");
  }

  {
    date3.add(1, "day");
    expect(date1).datetimeToBe("1950-06-15 14:31");
    expect(date2).datetimeToBe("1950-06-15 15:30");
    expect(date3).datetimeToBe("1950-06-16 14:30");
    expect(date4).datetimeToBe("1950-06-15 14:30");
  }

  {
    date4.add(1, "month");
    expect(date1).datetimeToBe("1950-06-15 14:31");
    expect(date2).datetimeToBe("1950-06-15 15:30");
    expect(date3).datetimeToBe("1950-06-16 14:30");
    expect(date4).datetimeToBe("1950-07-15 14:30");
  }

  {
    const error = "Unknown date format: invalid";

    expect(() => dateFns.create("invalid")).toThrow(error);
  }
});

test("now", () => {
  expect(dateFns.now()).toBe(dateFns.create().toString());
});

test("time", () => {
  expect(dateFns.time()).toBe(Date.now());
});

test("timeSec", () => {
  expect(dateFns.timeSec()).toBe(Date.now() / 1000);
});

test.each([
  { date: "1950-06-15 02:30:30 AM", expected: true },
  { date: "1950-06-15 02:30:30 PM", expected: true },
  { date: "1950-06-15 2:30:30 AM", expected: true },
  { date: "1950-06-15 2:30:30 PM", expected: true },
  { date: "1950-06-15 14:30:30", expected: true },
  { date: "1950-06-15 02:30 AM", expected: true },
  { date: "1950-06-15 02:30 PM", expected: true },
  { date: "1950-06-15 2:30 AM", expected: true },
  { date: "1950-06-15 2:30 PM", expected: true },
  { date: "1950-06-15 14:30", expected: true },
  { date: "1950-06-15", expected: true },
  { date: "1", expected: false },
  { date: "", expected: false }
])("validate", ({ date, expected }) => {
  expect(dateFns.validate(date)).toBe(expected);
});
