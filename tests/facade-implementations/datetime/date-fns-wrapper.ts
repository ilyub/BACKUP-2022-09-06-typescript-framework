import enGB from "date-fns/locale/en-GB"; // eslint-disable-line import/no-duplicates
import ru from "date-fns/locale/ru"; // eslint-disable-line import/no-duplicates

import type { DateTime } from "@skylib/facades/dist/datetime";
import { datetime } from "@skylib/facades/dist/datetime";
import * as testUtils from "@skylib/functions/dist/testUtils";

import * as dateFnsWrapper from "@/facade-implementations/datetime/date-fns-wrapper";

function d(dt = "1950-01-01 14:30"): DateTime {
  return datetime.create(dt);
}

const d1 = d("1950-01-01 14:30");

const d2 = d("1950-01-01 14:31");

const d3 = d("1950-01-01 15:30");

const d4 = d("1950-01-02 14:30");

const d5 = d("1950-02-01 14:30");

const d6 = d("1951-01-01 14:30");

const firstDayOfWeekOptions: readonly dateFnsWrapper.FirstDayOfWeek[] = [0, 1];

const pmOptions = [true, false];

testUtils.installFakeTimer();

it("configure, getConfiguration", () => {
  expect(dateFnsWrapper.getConfiguration().firstDayOfWeek).toStrictEqual(0);
  dateFnsWrapper.configure({ firstDayOfWeek: 1 });
  expect(dateFnsWrapper.getConfiguration().firstDayOfWeek).toStrictEqual(1);
});

it("implementation.create", () => {
  const dt1 = datetime.create("1950-01-01 14:30");

  const dt2 = datetime.create(dt1);

  expect(dt1).datetimeToEqual("1950-01-01 14:30");
  expect(dt2).datetimeToEqual("1950-01-01 14:30");

  {
    dt1.add(1, "minute");
    expect(dt1).datetimeToEqual("1950-01-01 14:31");
    expect(dt2).datetimeToEqual("1950-01-01 14:30");
  }

  {
    dt2.add(1, "hour");
    expect(dt1).datetimeToEqual("1950-01-01 14:31");
    expect(dt2).datetimeToEqual("1950-01-01 15:30");
  }
});

it("implementation.now", () => {
  expect(datetime.now()).toStrictEqual(datetime.create().toString());
});

it("implementation.time", () => {
  expect(datetime.time()).toEqual(Date.now() / 1000);
});

it("implementation.validate", () => {
  expect(datetime.validate("2016-01-01")).toEqual(true);
  expect(datetime.validate("1")).toEqual(false);
  expect(datetime.validate("")).toEqual(false);
});

it("DateTime.add", () => {
  expect(d().add(1, "minute")).datetimeToEqual("1950-01-01 14:31");
  expect(d().add(2, "minutes")).datetimeToEqual("1950-01-01 14:32");
  expect(d().add(1, "hour")).datetimeToEqual("1950-01-01 15:30");
  expect(d().add(2, "hours")).datetimeToEqual("1950-01-01 16:30");
  expect(d().add(1, "day")).datetimeToEqual("1950-01-02 14:30");
  expect(d().add(2, "days")).datetimeToEqual("1950-01-03 14:30");
  expect(d().add(1, "week")).datetimeToEqual("1950-01-08 14:30");
  expect(d().add(2, "weeks")).datetimeToEqual("1950-01-15 14:30");
  expect(d().add(1, "month")).datetimeToEqual("1950-02-01 14:30");
  expect(d().add(2, "months")).datetimeToEqual("1950-03-01 14:30");
  expect(d().add(1, "year")).datetimeToEqual("1951-01-01 14:30");
  expect(d().add(2, "years")).datetimeToEqual("1952-01-01 14:30");
});

it("DateTime.clone", () => {
  const dt1 = d();

  const dt2 = dt1.clone();

  expect(dt1).datetimeToEqual("1950-01-01 14:30");
  expect(dt2).datetimeToEqual("1950-01-01 14:30");

  {
    dt1.add(1, "minute");
    expect(dt1).datetimeToEqual("1950-01-01 14:31");
    expect(dt2).datetimeToEqual("1950-01-01 14:30");
  }

  {
    dt2.add(1, "hour");
    expect(dt1).datetimeToEqual("1950-01-01 14:31");
    expect(dt2).datetimeToEqual("1950-01-01 15:30");
  }
});

it("DateTime.dayOfMonth", () => {
  expect(d("1950-01-01 14:30").dayOfMonth()).toStrictEqual(1);
  expect(d("1950-01-02 14:30").dayOfMonth()).toStrictEqual(2);
  expect(d("1950-01-03 14:30").dayOfMonth()).toStrictEqual(3);
});

it("DateTime.dayOfWeek", () => {
  for (const firstDayOfWeek of firstDayOfWeekOptions) {
    dateFnsWrapper.configure({ firstDayOfWeek });
    expect(d("1950-01-01 14:30").dayOfWeek()).toStrictEqual(0);
    expect(d("1950-01-02 14:30").dayOfWeek()).toStrictEqual(1);
    expect(d("1950-01-03 14:30").dayOfWeek()).toStrictEqual(2);
  }
});

it("DateTime.format: English", () => {
  dateFnsWrapper.configure({
    locale: enGB,
    pm: true
  });
  expect(d().format("d MMM yyyy")).toStrictEqual("1 Jan 1950");
  expect(d().format("HHHH:mm A")).toStrictEqual("02:30 PM");
  expect(d().format("HHH:mm A")).toStrictEqual("2:30 PM");
  expect(d().format("hh:mm a")).toStrictEqual("02:30 PM");
  expect(d().format("h:mm a")).toStrictEqual("2:30 PM");
  expect(d().format("HH:mm")).toStrictEqual("14:30");
  expect(d().format("H:mm")).toStrictEqual("14:30");
});

it("DateTime.format: Russian", () => {
  dateFnsWrapper.configure({
    locale: ru,
    pm: false
  });
  expect(d().format("d MMM yyyy")).toStrictEqual("1 янв. 1950");
  expect(d().format("HHHH:mm A")).toStrictEqual("14:30");
  expect(d().format("HHH:mm A")).toStrictEqual("14:30");
  expect(d().format("hh:mm a")).toStrictEqual("02:30 ПП");
  expect(d().format("h:mm a")).toStrictEqual("2:30 ПП");
  expect(d().format("HH:mm")).toStrictEqual("14:30");
  expect(d().format("H:mm")).toStrictEqual("14:30");
});

it("DateTime.hours", () => {
  expect(d("1950-01-01 14:30").hours()).toStrictEqual(14);
  expect(d("1950-01-01 15:30").hours()).toStrictEqual(15);
  expect(d("1950-01-01 16:30").hours()).toStrictEqual(16);
});

it("DateTime.isSameDayOfMonth", () => {
  expect(d1.isSameDayOfMonth(d1)).toBeTrue();
  expect(d1.isSameDayOfMonth(d2)).toBeTrue();
  expect(d1.isSameDayOfMonth(d3)).toBeTrue();
  expect(d1.isSameDayOfMonth(d4)).toBeFalse();
  expect(d1.isSameDayOfMonth(d5)).toBeFalse();
  expect(d1.isSameDayOfMonth(d6)).toBeFalse();
});

it("DateTime.isSameHour", () => {
  expect(d1.isSameHour(d1)).toBeTrue();
  expect(d1.isSameHour(d2)).toBeTrue();
  expect(d1.isSameHour(d3)).toBeFalse();
  expect(d1.isSameHour(d4)).toBeFalse();
  expect(d1.isSameHour(d5)).toBeFalse();
  expect(d1.isSameHour(d6)).toBeFalse();
});

it("DateTime.isSameMinute", () => {
  expect(d1.isSameMinute(d1)).toBeTrue();
  expect(d1.isSameMinute(d2)).toBeFalse();
  expect(d1.isSameMinute(d3)).toBeFalse();
  expect(d1.isSameMinute(d4)).toBeFalse();
  expect(d1.isSameMinute(d5)).toBeFalse();
  expect(d1.isSameMinute(d6)).toBeFalse();
});

it("DateTime.isSameMonth", () => {
  expect(d1.isSameMonth(d1)).toBeTrue();
  expect(d1.isSameMonth(d2)).toBeTrue();
  expect(d1.isSameMonth(d3)).toBeTrue();
  expect(d1.isSameMonth(d4)).toBeTrue();
  expect(d1.isSameMonth(d5)).toBeFalse();
  expect(d1.isSameMonth(d6)).toBeFalse();
});

it("DateTime.isSameYear", () => {
  expect(d1.isSameYear(d1)).toBeTrue();
  expect(d1.isSameYear(d2)).toBeTrue();
  expect(d1.isSameYear(d3)).toBeTrue();
  expect(d1.isSameYear(d4)).toBeTrue();
  expect(d1.isSameYear(d5)).toBeTrue();
  expect(d1.isSameYear(d6)).toBeFalse();
});

it("DateTime.minutes", () => {
  expect(d("1950-01-01 14:30").minutes()).toStrictEqual(30);
  expect(d("1950-01-01 14:31").minutes()).toStrictEqual(31);
  expect(d("1950-01-01 14:32").minutes()).toStrictEqual(32);
});

it("DateTime.month", () => {
  expect(d("1950-01-01 14:30").month()).toStrictEqual(0);
  expect(d("1950-02-01 14:30").month()).toStrictEqual(1);
  expect(d("1950-03-01 14:30").month()).toStrictEqual(2);
});

it("DateTime.setDayOfMonth", () => {
  expect(d().setDayOfMonth(2)).datetimeToEqual("1950-01-02 14:30");
});

it("DateTime.setDayOfWeek", () => {
  expect(d().setDayOfWeek(6, 0)).datetimeToEqual("1950-01-07 14:30");
  expect(d().setDayOfWeek(6, 1)).datetimeToEqual("1949-12-31 14:30");
});

it("DateTime.setDayOfWeekLocale", () => {
  {
    dateFnsWrapper.configure({ firstDayOfWeek: 0 });
    expect(d().setDayOfWeekLocale(6)).datetimeToEqual("1950-01-07 14:30");
  }

  {
    dateFnsWrapper.configure({ firstDayOfWeek: 1 });
    expect(d().setDayOfWeekLocale(6)).datetimeToEqual("1949-12-31 14:30");
  }
});

it("DateTime.setHours", () => {
  expect(d().setHours(15)).datetimeToEqual("1950-01-01 15:30");
});

it("DateTime.setMinutes", () => {
  expect(d().setMinutes(31)).datetimeToEqual("1950-01-01 14:31");
});

it("DateTime.setMonth", () => {
  expect(d().setMonth(1)).datetimeToEqual("1950-02-01 14:30");
});

it("DateTime.setStartOfWeek", () => {
  expect(d().setStartOfWeek(0)).datetimeToEqual("1950-01-01 14:30");
  expect(d().setStartOfWeek(1)).datetimeToEqual("1949-12-26 14:30");
});

it("DateTime.setStartOfWeekLocale", () => {
  {
    dateFnsWrapper.configure({ firstDayOfWeek: 0 });
    expect(d().setStartOfWeekLocale()).datetimeToEqual("1950-01-01 14:30");
  }

  {
    dateFnsWrapper.configure({ firstDayOfWeek: 1 });
    expect(d().setStartOfWeekLocale()).datetimeToEqual("1949-12-26 14:30");
  }
});

it("DateTime.setYear", () => {
  expect(d().setYear(1951)).datetimeToEqual("1951-01-01 14:30");
});

it("DateTime.sub", () => {
  expect(d().sub(1, "minute")).datetimeToEqual("1950-01-01 14:29");
  expect(d().sub(2, "minutes")).datetimeToEqual("1950-01-01 14:28");
  expect(d().sub(1, "hour")).datetimeToEqual("1950-01-01 13:30");
  expect(d().sub(2, "hours")).datetimeToEqual("1950-01-01 12:30");
  expect(d().sub(1, "day")).datetimeToEqual("1949-12-31 14:30");
  expect(d().sub(2, "days")).datetimeToEqual("1949-12-30 14:30");
  expect(d().sub(1, "week")).datetimeToEqual("1949-12-25 14:30");
  expect(d().sub(2, "weeks")).datetimeToEqual("1949-12-18 14:30");
  expect(d().sub(1, "month")).datetimeToEqual("1949-12-01 14:30");
  expect(d().sub(2, "months")).datetimeToEqual("1949-11-01 14:30");
  expect(d().sub(1, "year")).datetimeToEqual("1949-01-01 14:30");
  expect(d().sub(2, "years")).datetimeToEqual("1948-01-01 14:30");
});

it("DateTime.toDate", () => {
  expect(d().toDate()).toStrictEqual(new Date("1950-01-01 14:30"));
});

it("DateTime.toString", () => {
  for (const pm of pmOptions) {
    dateFnsWrapper.configure({ pm });
    expect(d().toString()).toStrictEqual("1950-01-01 14:30:00");
  }
});

it("DateTime.toTime", () => {
  const expected = new Date("1950-01-01 14:30").getTime() / 1000;

  expect(d().toTime()).toStrictEqual(expected);
});

it("DateTime.year", () => {
  expect(d("1950-01-01 14:30").year()).toStrictEqual(1950);
  expect(d("1951-01-01 14:30").year()).toStrictEqual(1951);
  expect(d("1952-01-01 14:30").year()).toStrictEqual(1952);
});
