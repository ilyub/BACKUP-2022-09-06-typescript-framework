import type { DateTime as DateTimeInterface, Facade, Unit } from "@skylib/facades/dist/datetime";
import type { DeepReadonly } from "@skylib/functions/dist/types/core";
export interface Configuration {
    readonly firstDayOfWeek: FirstDayOfWeek;
    readonly locale: DeepReadonly<Locale>;
    readonly pm: boolean;
}
export declare type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
};
export declare type FirstDayOfWeek = 0 | 1;
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export declare function configure<K extends keyof Configuration>(config: PartialConfiguration<K>): void;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export declare function getConfiguration(): Configuration;
export declare const implementation: Facade;
export declare class DateTime implements DateTimeInterface {
    /**
     * Creates class instance.
     *
     * @param dt - Date/time.
     */
    constructor(dt?: string | Date | DateTimeInterface);
    add(amount: number, unit: Unit): DateTimeInterface;
    clone(): DateTimeInterface;
    dayOfMonth(): number;
    dayOfWeek(): number;
    format(fmt: string): string;
    hours(): number;
    isSameDayOfMonth(dt: DateTimeInterface): boolean;
    isSameHour(dt: DateTimeInterface): boolean;
    isSameMinute(dt: DateTimeInterface): boolean;
    isSameMonth(dt: DateTimeInterface): boolean;
    isSameYear(dt: DateTimeInterface): boolean;
    minutes(): number;
    month(): number;
    setDayOfMonth(day: number): DateTimeInterface;
    setDayOfWeek(day: number, weekStartsOn: FirstDayOfWeek): DateTimeInterface;
    setDayOfWeekLocale(day: number): DateTimeInterface;
    setHours(hours: number): DateTimeInterface;
    setMinutes(minutes: number): DateTimeInterface;
    setMonth(month: number): DateTimeInterface;
    setStartOfWeek(weekStartsOn: FirstDayOfWeek): DateTimeInterface;
    setStartOfWeekLocale(): DateTimeInterface;
    setYear(year: number): DateTimeInterface;
    sub(amount: number, unit: Unit): DateTimeInterface;
    toDate(): Date;
    toString(): string;
    toTime(): number;
    year(): number;
    protected value: Date;
}
//# sourceMappingURL=date-fns-wrapper.d.ts.map