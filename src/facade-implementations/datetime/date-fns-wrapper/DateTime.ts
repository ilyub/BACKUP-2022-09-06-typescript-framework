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
import { formatStrings, moduleConfig } from "./core";
import type { FirstDayOfWeek } from "./core";
import type { NumStr } from "@skylib/functions";
import { TimeUnit } from "@skylib/facades";
import type { datetime } from "@skylib/facades";
import { is } from "@skylib/functions";

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

  public add(amount: number, unit: TimeUnit): datetime.DateTime {
    const duration: Duration = {};

    switch (unit) {
      case TimeUnit.minute:
      case TimeUnit.minutes:
        duration.minutes = amount;

        break;

      case TimeUnit.hour:
      case TimeUnit.hours:
        duration.hours = amount;

        break;

      case TimeUnit.day:
      case TimeUnit.days:
        duration.days = amount;

        break;

      case TimeUnit.week:
      case TimeUnit.weeks:
        duration.weeks = amount;

        break;

      case TimeUnit.month:
      case TimeUnit.months:
        duration.months = amount;

        break;

      case TimeUnit.year:
      case TimeUnit.years:
        duration.years = amount;
    }

    return new DateTime(add(this.value, duration));
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
    return new DateTime(setDate(this.value, day));
  }

  public setDayOfWeek(
    day: number,
    weekStartsOn: FirstDayOfWeek
  ): datetime.DateTime {
    return new DateTime(setDay(this.value, day, { weekStartsOn }));
  }

  public setDayOfWeekLocale(day: number): datetime.DateTime {
    const weekStartsOn = moduleConfig.firstDayOfWeek;

    return new DateTime(setDay(this.value, day, { weekStartsOn }));
  }

  public setHours(hours: number): datetime.DateTime {
    return new DateTime(setHours(this.value, hours));
  }

  public setMinutes(minutes: number): datetime.DateTime {
    return new DateTime(setMinutes(this.value, minutes));
  }

  public setMonth(month: number): datetime.DateTime {
    return new DateTime(setMonth(this.value, month));
  }

  public setStartOfDay(): datetime.DateTime {
    return new DateTime(startOfDay(this.value));
  }

  public setStartOfHour(): datetime.DateTime {
    return new DateTime(startOfHour(this.value));
  }

  public setStartOfMinute(): datetime.DateTime {
    return new DateTime(startOfMinute(this.value));
  }

  public setStartOfMonth(): datetime.DateTime {
    return new DateTime(startOfMonth(this.value));
  }

  public setStartOfWeek(weekStartsOn: FirstDayOfWeek): datetime.DateTime {
    return new DateTime(startOfWeek(this.value, { weekStartsOn }));
  }

  public setStartOfWeekLocale(): datetime.DateTime {
    const weekStartsOn = moduleConfig.firstDayOfWeek;

    return new DateTime(startOfWeek(this.value, { weekStartsOn }));
  }

  public setStartOfYear(): datetime.DateTime {
    return new DateTime(startOfYear(this.value));
  }

  public setYear(year: number): datetime.DateTime {
    return new DateTime(setYear(this.value, year));
  }

  public sub(amount: number, unit: TimeUnit): datetime.DateTime {
    const duration: Duration = {};

    switch (unit) {
      case TimeUnit.minute:
      case TimeUnit.minutes:
        duration.minutes = amount;

        break;

      case TimeUnit.hour:
      case TimeUnit.hours:
        duration.hours = amount;

        break;

      case TimeUnit.day:
      case TimeUnit.days:
        duration.days = amount;

        break;

      case TimeUnit.week:
      case TimeUnit.weeks:
        duration.weeks = amount;

        break;

      case TimeUnit.month:
      case TimeUnit.months:
        duration.months = amount;

        break;

      case TimeUnit.year:
      case TimeUnit.years:
        duration.years = amount;
    }

    return new DateTime(sub(this.value, duration));
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

  protected readonly value: Date;
}
