import {
  add,
  format,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
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
  sub
} from "date-fns"; // eslint-disable-line import/no-duplicates
import enUS from "date-fns/locale/en-US"; // eslint-disable-line import/no-duplicates

import type {
  DateTime as DateTimeInterface,
  Facade,
  Unit
} from "@skylib/facades/dist/datetime";
import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";
import * as is from "@skylib/functions/dist/guards";
import { onDemand } from "@skylib/functions/dist/helpers";
import * as o from "@skylib/functions/dist/object";
import type { DeepReadonly } from "@skylib/functions/dist/types/core";

export interface Configuration {
  readonly firstDayOfWeek: FirstDayOfWeek;
  readonly locale: DeepReadonly<Locale>;
  readonly pm: boolean;
}

export type PartialConfiguration<K extends keyof Configuration> = {
  readonly [L in K]: Configuration[L];
};

export type FirstDayOfWeek = 0 | 1;

/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure<K extends keyof Configuration>(
  config: PartialConfiguration<K>
): void {
  o.assign(moduleConfig, config);
}

/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration(): Configuration {
  return moduleConfig;
}

export const implementation: Facade = {
  create(dt?: string | Date | DateTimeInterface) {
    return new DateTime(dt);
  },
  now() {
    return new DateTime().toString();
  },
  time() {
    return Date.now() / 1000;
  },
  validate(dt: string) {
    const now = Date.now();

    return formatStrings.some(formatString =>
      isValid(parse(dt, formatString, now))
    );
  }
};

export class DateTime implements DateTimeInterface {
  /**
   * Creates class instance.
   *
   * @param dt - Date/time.
   */
  public constructor(dt?: string | Date | DateTimeInterface) {
    if (dt instanceof Date) this.value = dt;
    else if (dt instanceof DateTime) this.value = new Date(dt.value);
    else if (is.string(dt)) this.value = parseString(dt);
    else this.value = new Date();
  }

  public add(amount: number, unit: Unit): DateTimeInterface {
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

  public clone(): DateTimeInterface {
    return new DateTime(this);
  }

  public dayOfMonth(): number {
    return getDate(this.value);
  }

  public dayOfWeek(): number {
    return getDay(this.value);
  }

  public format(fmt: string): string {
    fmt = moduleConfig.pm
      ? fmt
          .replace(/H{4}/gu, "hh")
          .replace(/H{3}/gu, "h")
          .replace(/A/gu, "a")
          .trim()
      : fmt
          .replace(/H{4}/gu, "HH")
          .replace(/H{3}/gu, "H")
          .replace(/A/gu, "")
          .trim();

    return format(this.value, fmt, { locale: moduleConfig.locale });
  }

  public hours(): number {
    return getHours(this.value);
  }

  public isSameDayOfMonth(dt: DateTimeInterface): boolean {
    return isSameDay(this.value, dt.toDate());
  }

  public isSameHour(dt: DateTimeInterface): boolean {
    return isSameHour(this.value, dt.toDate());
  }

  public isSameMinute(dt: DateTimeInterface): boolean {
    return isSameMinute(this.value, dt.toDate());
  }

  public isSameMonth(dt: DateTimeInterface): boolean {
    return isSameMonth(this.value, dt.toDate());
  }

  public isSameYear(dt: DateTimeInterface): boolean {
    return isSameYear(this.value, dt.toDate());
  }

  public minutes(): number {
    return getMinutes(this.value);
  }

  public month(): number {
    return getMonth(this.value);
  }

  public setDayOfMonth(day: number): DateTimeInterface {
    this.value = setDate(this.value, day);

    return this;
  }

  public setDayOfWeek(
    day: number,
    weekStartsOn: FirstDayOfWeek
  ): DateTimeInterface {
    this.value = setDay(this.value, day, { weekStartsOn });

    return this;
  }

  public setDayOfWeekLocale(day: number): DateTimeInterface {
    const weekStartsOn = moduleConfig.firstDayOfWeek;

    this.value = setDay(this.value, day, { weekStartsOn });

    return this;
  }

  public setHours(hours: number): DateTimeInterface {
    this.value = setHours(this.value, hours);

    return this;
  }

  public setMinutes(minutes: number): DateTimeInterface {
    this.value = setMinutes(this.value, minutes);

    return this;
  }

  public setMonth(month: number): DateTimeInterface {
    this.value = setMonth(this.value, month);

    return this;
  }

  public setStartOfWeek(weekStartsOn: FirstDayOfWeek): DateTimeInterface {
    return this.setDayOfWeek(weekStartsOn, weekStartsOn);
  }

  public setStartOfWeekLocale(): DateTimeInterface {
    const weekStartsOn = moduleConfig.firstDayOfWeek;

    return this.setDayOfWeek(weekStartsOn, weekStartsOn);
  }

  public setYear(year: number): DateTimeInterface {
    this.value = setYear(this.value, year);

    return this;
  }

  public sub(amount: number, unit: Unit): DateTimeInterface {
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
    return format(this.value, "yyyy-MM-dd HH:mm");
  }

  public toTime(): number {
    return this.value.getTime() / 1000;
  }

  public year(): number {
    return getYear(this.value);
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected value: Date;
}

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

const formatStrings: readonly string[] = [
  "yyyy-M-d h:m:s a",
  "yyyy-M-d H:m:s",
  "yyyy-M-d h:m a",
  "yyyy-M-d H:m",
  "yyyy-M-d"
];

const moduleConfig = onDemand(() =>
  reactiveStorage<Configuration>({
    firstDayOfWeek: 0,
    locale: enUS,
    pm: true
  })
);

/**
 * Parses string.
 *
 * @param dt - Date/time.
 * @returns Date object.
 */
function parseString(dt: string): Date {
  const now = Date.now();

  for (const formatString of formatStrings) {
    const result = parse(dt, formatString, now);

    if (isValid(result)) return result;
  }

  throw new Error(`Invalid date: ${dt}`);
}
