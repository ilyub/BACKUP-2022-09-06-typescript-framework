import type { datetime } from "@skylib/facades";
import type { NumStr, strings } from "@skylib/functions";
export declare const formatStrings: strings;
export declare const moduleConfig: Configuration;
export declare class DateTime implements datetime.DateTime {
    /**
     * Creates class instance.
     *
     * @param dt - Date/time.
     */
    constructor(dt?: Date | datetime.DateTime | NumStr);
    add(amount: number, unit: datetime.Unit): datetime.DateTime;
    clone(): datetime.DateTime;
    dayOfMonth(): number;
    dayOfWeek(): number;
    format(fmt: string): string;
    hours(): number;
    isSameDayOfMonth(dt: datetime.DateTime): boolean;
    isSameHour(dt: datetime.DateTime): boolean;
    isSameMinute(dt: datetime.DateTime): boolean;
    isSameMonth(dt: datetime.DateTime): boolean;
    isSameYear(dt: datetime.DateTime): boolean;
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
    sub(amount: number, unit: datetime.Unit): datetime.DateTime;
    toDate(): Date;
    toString(): string;
    toTime(): number;
    toTimeSec(): number;
    year(): number;
    protected value: Date;
}
export interface Configuration {
    readonly firstDayOfWeek: FirstDayOfWeek;
    readonly locale: Locale;
    readonly pm: boolean;
}
export declare type FirstDayOfWeek = 0 | 1;
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export declare function configure(config: Partial<Configuration>): void;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export declare function getConfiguration(): Configuration;
//# sourceMappingURL=DateTime.d.ts.map