import { formatStrings, moduleConfig } from "./core";
import { is } from "@skylib/functions";
import {
  add,
  format as formatDate,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  isSameYear,
  isValid,
  parse,
  setDate,
  setDay,
  setHours,
  setMinutes,
  setMonth,
  setYear,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfWeek,
  startOfYear,
  sub
} from "date-fns";
import type { FirstDayOfWeek } from "./core";
import type { datetime } from "@skylib/facades";
import type { NumStr } from "@skylib/functions";

export class DateTime implements datetime.DateTime {
  /**
   * Creates class instance.
   *
   * @param date - Date.
   */
  public constructor(date?: Date | datetime.DateTime | NumStr) {
    if (date instanceof Date) this.value = date;
    else if (date instanceof DateTime) this.value = date.value;
    else if (is.number(date)) this.value = new Date(date);
    else if (is.string(date)) this.value = parseString(date);
    else this.value = new Date();

    function parseString(str: string): Date {
      const now = Date.now();

      for (const formatString of formatStrings) {
        const result = parse(str, formatString, now);

        if (isValid(result)) return result;
      }

      throw new Error(`Unknown date format: ${str}`);
    }
  }

  public add(amount: number, unit: datetime.Unit): datetime.DateTime {
    const duration: Duration = {};

    switch (unit) {
      case "minute":
      case "minutes":
        duration.minutes = amount;

        break;

      case "hour":
      case "hours":
        duration.hours = amount;

        break;

      case "day":
      case "days":
        duration.days = amount;

        break;

      case "week":
      case "weeks":
        duration.weeks = amount;

        break;

      case "month":
      case "months":
        duration.months = amount;

        break;

      case "year":
      case "years":
        duration.years = amount;
    }

    this.value = add(this.value, duration);

    return this;
  }

  public clone(): datetime.DateTime {
    return new DateTime(this);
  }

  public dayOfMonth(): number {
    return getDate(this.value);
  }

  public dayOfWeek(): number {
    return getDay(this.value);
  }

  public format(format: string): string {
    format = moduleConfig.pm
      ? format
          .replace(/H{4}/gu, "hh")
          .replace(/H{3}/gu, "h")
          .replace(/A/gu, "a")
          .trim()
      : format
          .replace(/H{4}/gu, "HH")
          .replace(/H{3}/gu, "H")
          .replace(/A/gu, "")
          .trim();

    return formatDate(this.value, format, { locale: moduleConfig.locale });
  }

  public hours(): number {
    return getHours(this.value);
  }

  public isSameDayOfMonth(date: datetime.DateTime): boolean {
    return isSameDay(this.value, date.toDate());
  }

  public isSameHour(date: datetime.DateTime): boolean {
    return isSameHour(this.value, date.toDate());
  }

  public isSameMinute(date: datetime.DateTime): boolean {
    return isSameMinute(this.value, date.toDate());
  }

  public isSameMonth(date: datetime.DateTime): boolean {
    return isSameMonth(this.value, date.toDate());
  }

  public isSameYear(date: datetime.DateTime): boolean {
    return isSameYear(this.value, date.toDate());
  }

  public minutes(): number {
    return getMinutes(this.value);
  }

  public month(): number {
    return getMonth(this.value);
  }

  public setDayOfMonth(day: number): datetime.DateTime {
    this.value = setDate(this.value, day);

    return this;
  }

  public setDayOfWeek(
    day: number,
    weekStartsOn: FirstDayOfWeek
  ): datetime.DateTime {
    this.value = setDay(this.value, day, { weekStartsOn });

    return this;
  }

  public setDayOfWeekLocale(day: number): datetime.DateTime {
    const weekStartsOn = moduleConfig.firstDayOfWeek;

    this.value = setDay(this.value, day, { weekStartsOn });

    return this;
  }

  public setHours(hours: number): datetime.DateTime {
    this.value = setHours(this.value, hours);

    return this;
  }

  public setMinutes(minutes: number): datetime.DateTime {
    this.value = setMinutes(this.value, minutes);

    return this;
  }

  public setMonth(month: number): datetime.DateTime {
    this.value = setMonth(this.value, month);

    return this;
  }

  public setStartOfDay(): datetime.DateTime {
    this.value = startOfDay(this.value);

    return this;
  }

  public setStartOfHour(): datetime.DateTime {
    this.value = startOfHour(this.value);

    return this;
  }

  public setStartOfMinute(): datetime.DateTime {
    this.value = startOfMinute(this.value);

    return this;
  }

  public setStartOfMonth(): datetime.DateTime {
    this.value = startOfMonth(this.value);

    return this;
  }

  public setStartOfWeek(weekStartsOn: FirstDayOfWeek): datetime.DateTime {
    this.value = startOfWeek(this.value, { weekStartsOn });

    return this;
  }

  public setStartOfWeekLocale(): datetime.DateTime {
    const weekStartsOn = moduleConfig.firstDayOfWeek;

    this.value = startOfWeek(this.value, { weekStartsOn });

    return this;
  }

  public setStartOfYear(): datetime.DateTime {
    this.value = startOfYear(this.value);

    return this;
  }

  public setYear(year: number): datetime.DateTime {
    this.value = setYear(this.value, year);

    return this;
  }

  public sub(amount: number, unit: datetime.Unit): datetime.DateTime {
    const duration: Duration = {};

    switch (unit) {
      case "minute":
      case "minutes":
        duration.minutes = amount;

        break;

      case "hour":
      case "hours":
        duration.hours = amount;

        break;

      case "day":
      case "days":
        duration.days = amount;

        break;

      case "week":
      case "weeks":
        duration.weeks = amount;

        break;

      case "month":
      case "months":
        duration.months = amount;

        break;

      case "year":
      case "years":
        duration.years = amount;
    }

    this.value = sub(this.value, duration);

    return this;
  }

  public toDate(): Date {
    return this.value;
  }

  public toString(): string {
    return getSeconds(this.value)
      ? formatDate(this.value, "yyyy-MM-dd HH:mm:ss")
      : formatDate(this.value, "yyyy-MM-dd HH:mm");
  }

  public toTime(): number {
    return this.value.getTime();
  }

  public toTimeSec(): number {
    return this.value.getTime() / 1000;
  }

  public year(): number {
    return getYear(this.value);
  }

  protected value: Date;
}
