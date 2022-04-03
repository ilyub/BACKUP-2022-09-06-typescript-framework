import enUS from "date-fns/locale/en-US"; // eslint-disable-line import/no-duplicates
import ru from "date-fns/locale/ru"; // eslint-disable-line import/no-duplicates

import type { DateTime } from "@skylib/facades/dist/datetime";
import { datetime } from "@skylib/facades/dist/datetime";
import * as testUtils from "@skylib/functions/dist/testUtils";

import * as dateFnsWrapper from "@/facade-implementations/datetime/date-fns-wrapper";

function d(dt = "1950-06-15 14:30"): DateTime {
  return datetime.create(dt);
}

const d1 = d("1950-06-15 14:30");

const d2 = d("1950-06-15 14:31");

const d3 = d("1950-06-15 15:30");

const d4 = d("1950-06-16 14:30");

const d5 = d("1950-07-15 14:30");

const d6 = d("1951-06-15 14:30");

const firstDayOfWeekOptions: readonly dateFnsWrapper.FirstDayOfWeek[] = [0, 1];

const pmOptions = [true, false];

testUtils.installFakeTimer();

test("configure, getConfiguration", () => {
  expect(dateFnsWrapper.getConfiguration().firstDayOfWeek).toBe(0);
  dateFnsWrapper.configure({ firstDayOfWeek: 1 });
  expect(dateFnsWrapper.getConfiguration().firstDayOfWeek).toBe(1);
});

test("implementation.create", () => {
  const dt1 = datetime.create("1950-06-15 14:30");

  const dt2 = datetime.create(dt1);

  const dt3 = datetime.create(dt1.toDate());

  const dt4 = datetime.create(dt1.toTime());

  expect(dt1).datetimeToEqual("1950-06-15 14:30");
  expect(dt2).datetimeToEqual("1950-06-15 14:30");
  expect(dt3).datetimeToEqual("1950-06-15 14:30");
  expect(dt4).datetimeToEqual("1950-06-15 14:30");

  {
    dt1.add(1, "minute");
    expect(dt1).datetimeToEqual("1950-06-15 14:31");
    expect(dt2).datetimeToEqual("1950-06-15 14:30");
    expect(dt3).datetimeToEqual("1950-06-15 14:30");
    expect(dt4).datetimeToEqual("1950-06-15 14:30");
  }

  {
    dt2.add(1, "hour");
    expect(dt1).datetimeToEqual("1950-06-15 14:31");
    expect(dt2).datetimeToEqual("1950-06-15 15:30");
    expect(dt3).datetimeToEqual("1950-06-15 14:30");
    expect(dt4).datetimeToEqual("1950-06-15 14:30");
  }

  {
    dt3.add(1, "day");
    expect(dt1).datetimeToEqual("1950-06-15 14:31");
    expect(dt2).datetimeToEqual("1950-06-15 15:30");
    expect(dt3).datetimeToEqual("1950-06-16 14:30");
    expect(dt4).datetimeToEqual("1950-06-15 14:30");
  }

  {
    dt4.add(1, "month");
    expect(dt1).datetimeToEqual("1950-06-15 14:31");
    expect(dt2).datetimeToEqual("1950-06-15 15:30");
    expect(dt3).datetimeToEqual("1950-06-16 14:30");
    expect(dt4).datetimeToEqual("1950-07-15 14:30");
  }

  {
    const error = new Error("Invalid date: invalid");

    expect(() => datetime.create("invalid")).toThrow(error);
  }
});

test("implementation.now", () => {
  expect(datetime.now()).toStrictEqual(datetime.create().toString());
});

test("implementation.time", () => {
  expect(datetime.time()).toStrictEqual(Date.now());
});

test("implementation.timeSec", () => {
  expect(datetime.timeSec()).toStrictEqual(Date.now() / 1000);
});

test("implementation.validate", () => {
  expect(datetime.validate("2016-06-15")).toBeTrue();
  expect(datetime.validate("1")).toBeFalse();
  expect(datetime.validate("")).toBeFalse();
});

test("dateTime.add", () => {
  expect(d().add(1, "minute")).datetimeToEqual("1950-06-15 14:31");
  expect(d().add(2, "minutes")).datetimeToEqual("1950-06-15 14:32");
  expect(d().add(1, "hour")).datetimeToEqual("1950-06-15 15:30");
  expect(d().add(2, "hours")).datetimeToEqual("1950-06-15 16:30");
  expect(d().add(1, "day")).datetimeToEqual("1950-06-16 14:30");
  expect(d().add(2, "days")).datetimeToEqual("1950-06-17 14:30");
  expect(d().add(1, "week")).datetimeToEqual("1950-06-22 14:30");
  expect(d().add(2, "weeks")).datetimeToEqual("1950-06-29 14:30");
  expect(d().add(1, "month")).datetimeToEqual("1950-07-15 14:30");
  expect(d().add(2, "months")).datetimeToEqual("1950-08-15 14:30");
  expect(d().add(1, "year")).datetimeToEqual("1951-06-15 14:30");
  expect(d().add(2, "years")).datetimeToEqual("1952-06-15 14:30");
});

test("dateTime.clone", () => {
  const dt1 = d();

  const dt2 = dt1.clone();

  expect(dt1).datetimeToEqual("1950-06-15 14:30");
  expect(dt2).datetimeToEqual("1950-06-15 14:30");

  {
    dt1.add(1, "minute");
    expect(dt1).datetimeToEqual("1950-06-15 14:31");
    expect(dt2).datetimeToEqual("1950-06-15 14:30");
  }

  {
    dt2.add(1, "hour");
    expect(dt1).datetimeToEqual("1950-06-15 14:31");
    expect(dt2).datetimeToEqual("1950-06-15 15:30");
  }
});

test("dateTime.dayOfMonth", () => {
  expect(d("1950-06-15 14:30").dayOfMonth()).toBe(15);
  expect(d("1950-06-16 14:30").dayOfMonth()).toBe(16);
  expect(d("1950-06-17 14:30").dayOfMonth()).toBe(17);
});

test.each(firstDayOfWeekOptions)("dateTime.dayOfWeek", firstDayOfWeek => {
  dateFnsWrapper.configure({ firstDayOfWeek });
  expect(d("1950-06-15 14:30").dayOfWeek()).toBe(4);
  expect(d("1950-06-16 14:30").dayOfWeek()).toBe(5);
  expect(d("1950-06-17 14:30").dayOfWeek()).toBe(6);
});

test("dateTime.format: English", () => {
  dateFnsWrapper.configure({ locale: enUS, pm: true });
  expect(d().format("d MMM yyyy")).toBe("15 Jun 1950");
  expect(d().format("HHHH:mm A")).toBe("02:30 PM");
  expect(d().format("HHH:mm A")).toBe("2:30 PM");
  expect(d().format("hh:mm a")).toBe("02:30 PM");
  expect(d().format("h:mm a")).toBe("2:30 PM");
  expect(d().format("HH:mm")).toBe("14:30");
  expect(d().format("H:mm")).toBe("14:30");
});

test("dateTime.format: Russian", () => {
  dateFnsWrapper.configure({ locale: ru, pm: false });
  expect(d().format("d MMM yyyy")).toBe("15 июн. 1950");
  expect(d().format("HHHH:mm A")).toBe("14:30");
  expect(d().format("HHH:mm A")).toBe("14:30");
  expect(d().format("hh:mm a")).toBe("02:30 ПП");
  expect(d().format("h:mm a")).toBe("2:30 ПП");
  expect(d().format("HH:mm")).toBe("14:30");
  expect(d().format("H:mm")).toBe("14:30");
});

test("dateTime.hours", () => {
  expect(d("1950-06-15 14:30").hours()).toBe(14);
  expect(d("1950-06-15 15:30").hours()).toBe(15);
  expect(d("1950-06-15 16:30").hours()).toBe(16);
});

test("dateTime.isSameDayOfMonth", () => {
  expect(d1.isSameDayOfMonth(d1)).toBeTrue();
  expect(d1.isSameDayOfMonth(d2)).toBeTrue();
  expect(d1.isSameDayOfMonth(d3)).toBeTrue();
  expect(d1.isSameDayOfMonth(d4)).toBeFalse();
  expect(d1.isSameDayOfMonth(d5)).toBeFalse();
  expect(d1.isSameDayOfMonth(d6)).toBeFalse();
});

test("dateTime.isSameHour", () => {
  expect(d1.isSameHour(d1)).toBeTrue();
  expect(d1.isSameHour(d2)).toBeTrue();
  expect(d1.isSameHour(d3)).toBeFalse();
  expect(d1.isSameHour(d4)).toBeFalse();
  expect(d1.isSameHour(d5)).toBeFalse();
  expect(d1.isSameHour(d6)).toBeFalse();
});

test("dateTime.isSameMinute", () => {
  expect(d1.isSameMinute(d1)).toBeTrue();
  expect(d1.isSameMinute(d2)).toBeFalse();
  expect(d1.isSameMinute(d3)).toBeFalse();
  expect(d1.isSameMinute(d4)).toBeFalse();
  expect(d1.isSameMinute(d5)).toBeFalse();
  expect(d1.isSameMinute(d6)).toBeFalse();
});

test("dateTime.isSameMonth", () => {
  expect(d1.isSameMonth(d1)).toBeTrue();
  expect(d1.isSameMonth(d2)).toBeTrue();
  expect(d1.isSameMonth(d3)).toBeTrue();
  expect(d1.isSameMonth(d4)).toBeTrue();
  expect(d1.isSameMonth(d5)).toBeFalse();
  expect(d1.isSameMonth(d6)).toBeFalse();
});

test("dateTime.isSameYear", () => {
  expect(d1.isSameYear(d1)).toBeTrue();
  expect(d1.isSameYear(d2)).toBeTrue();
  expect(d1.isSameYear(d3)).toBeTrue();
  expect(d1.isSameYear(d4)).toBeTrue();
  expect(d1.isSameYear(d5)).toBeTrue();
  expect(d1.isSameYear(d6)).toBeFalse();
});

test("dateTime.minutes", () => {
  expect(d("1950-06-15 14:30").minutes()).toBe(30);
  expect(d("1950-06-15 14:31").minutes()).toBe(31);
  expect(d("1950-06-15 14:32").minutes()).toBe(32);
});

test("dateTime.month", () => {
  expect(d("1950-01-15 14:30").month()).toBe(0);
  expect(d("1950-02-15 14:30").month()).toBe(1);
  expect(d("1950-03-15 14:30").month()).toBe(2);
});

test("dateTime.setDayOfMonth", () => {
  expect(d().setDayOfMonth(2)).datetimeToEqual("1950-06-02 14:30");
});

test("dateTime.setDayOfWeek", () => {
  expect(d().setDayOfWeek(6, 0)).datetimeToEqual("1950-06-17 14:30");
  expect(d().setDayOfWeek(6, 1)).datetimeToEqual("1950-06-17 14:30");
});

test("dateTime.setDayOfWeekLocale", () => {
  {
    dateFnsWrapper.configure({ firstDayOfWeek: 0 });
    expect(d().setDayOfWeekLocale(6)).datetimeToEqual("1950-06-17 14:30");
  }

  {
    dateFnsWrapper.configure({ firstDayOfWeek: 1 });
    expect(d().setDayOfWeekLocale(6)).datetimeToEqual("1950-06-17 14:30");
  }
});

test("dateTime.setHours", () => {
  expect(d().setHours(15)).datetimeToEqual("1950-06-15 15:30");
});

test("dateTime.setMinutes", () => {
  expect(d().setMinutes(31)).datetimeToEqual("1950-06-15 14:31");
});

test("dateTime.setMonth", () => {
  expect(d().setMonth(1)).datetimeToEqual("1950-02-15 14:30");
});

test("dateTime.setStartOfHour", () => {
  expect(d().setStartOfHour()).datetimeToEqual("1950-06-15 14:00");
});

test("dateTime.setStartOfDay", () => {
  expect(d().setStartOfDay()).datetimeToEqual("1950-06-15 00:00");
});

test("dateTime.setStartOfMonth", () => {
  expect(d().setStartOfMonth()).datetimeToEqual("1950-06-01 00:00");
});

test("dateTime.setStartOfWeek", () => {
  expect(d().setStartOfWeek(0)).datetimeToEqual("1950-06-11 00:00");
  expect(d().setStartOfWeek(1)).datetimeToEqual("1950-06-12 00:00");
});

test("dateTime.setStartOfWeekLocale", () => {
  {
    dateFnsWrapper.configure({ firstDayOfWeek: 0 });
    expect(d().setStartOfWeekLocale()).datetimeToEqual("1950-06-11 00:00");
  }

  {
    dateFnsWrapper.configure({ firstDayOfWeek: 1 });
    expect(d().setStartOfWeekLocale()).datetimeToEqual("1950-06-12 00:00");
  }
});

test("dateTime.setYear", () => {
  expect(d().setYear(1951)).datetimeToEqual("1951-06-15 14:30");
});

test("dateTime.sub", () => {
  expect(d().sub(1, "minute")).datetimeToEqual("1950-06-15 14:29");
  expect(d().sub(2, "minutes")).datetimeToEqual("1950-06-15 14:28");
  expect(d().sub(1, "hour")).datetimeToEqual("1950-06-15 13:30");
  expect(d().sub(2, "hours")).datetimeToEqual("1950-06-15 12:30");
  expect(d().sub(1, "day")).datetimeToEqual("1950-06-14 14:30");
  expect(d().sub(2, "days")).datetimeToEqual("1950-06-13 14:30");
  expect(d().sub(1, "week")).datetimeToEqual("1950-06-08 14:30");
  expect(d().sub(2, "weeks")).datetimeToEqual("1950-06-01 14:30");
  expect(d().sub(1, "month")).datetimeToEqual("1950-05-15 14:30");
  expect(d().sub(2, "months")).datetimeToEqual("1950-04-15 14:30");
  expect(d().sub(1, "year")).datetimeToEqual("1949-06-15 14:30");
  expect(d().sub(2, "years")).datetimeToEqual("1948-06-15 14:30");
});

test("dateTime.toDate", () => {
  expect(d().toDate()).toStrictEqual(new Date("1950-06-15 14:30"));
});

test.each(pmOptions)("dateTime.toString", pm => {
  dateFnsWrapper.configure({ pm });
  expect(d().toString()).toBe("1950-06-15 14:30");
});

test("dateTime.toTime", () => {
  const expected = new Date("1950-06-15 14:30").getTime();

  expect(d().toTime()).toStrictEqual(expected);
});

test("dateTime.toTimeSec", () => {
  const expected = new Date("1950-06-15 14:30").getTime() / 1000;

  expect(d().toTimeSec()).toStrictEqual(expected);
});

test("dateTime.year", () => {
  expect(d("1950-06-15 14:30").year()).toBe(1950);
  expect(d("1951-06-15 14:30").year()).toBe(1951);
  expect(d("1952-06-15 14:30").year()).toBe(1952);
});
