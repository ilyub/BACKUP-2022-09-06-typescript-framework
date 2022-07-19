import type { FirstDayOfWeek } from "./core";
import type { NumStr } from "@skylib/functions";
import { TimeUnit } from "@skylib/facades";
import type { datetime } from "@skylib/facades";
export declare class DateTime implements datetime.DateTime {
    /**
     * Creates class instance.
     *
     * @param date - Date.
     */
    constructor(date?: Date | datetime.DateTime | NumStr);
    add(amount: number, unit: TimeUnit): datetime.DateTime;
    dayOfMonth(): number;
    dayOfWeek(): number;
    format(format: string): string;
    hours(): number;
    isSameDayOfMonth(date: datetime.DateTime): boolean;
    isSameHour(date: datetime.DateTime): boolean;
    isSameMinute(date: datetime.DateTime): boolean;
    isSameMonth(date: datetime.DateTime): boolean;
    isSameYear(date: datetime.DateTime): boolean;
    minutes(): number;
    month(): number;
    setDayOfMonth(day: number): datetime.DateTime;
    setDayOfWeek(day: number, weekStartsOn: FirstDayOfWeek): datetime.DateTime;
    setDayOfWeekLocale(day: number): datetime.DateTime;
    setHours(hours: number): datetime.DateTime;
    setMinutes(minutes: number): datetime.DateTime;
    setMonth(month: number): datetime.DateTime;
    setStartOfDay(): datetime.DateTime;
    setStartOfHour(): datetime.DateTime;
    setStartOfMinute(): datetime.DateTime;
    setStartOfMonth(): datetime.DateTime;
    setStartOfWeek(weekStartsOn: FirstDayOfWeek): datetime.DateTime;
    setStartOfWeekLocale(): datetime.DateTime;
    setStartOfYear(): datetime.DateTime;
    setYear(year: number): datetime.DateTime;
    sub(amount: number, unit: TimeUnit): datetime.DateTime;
    toDate(): Date;
    toString(): string;
    toTime(): number;
    toTimeSec(): number;
    year(): number;
    protected readonly value: Date;
}
//# sourceMappingURL=DateTime.d.ts.map