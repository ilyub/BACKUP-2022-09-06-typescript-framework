import { reactiveStorage } from "@skylib/facades";
import { is, onDemand, o } from "@skylib/functions";
import { add, format, getDate, getDay, getHours, getMinutes, getMonth, getYear, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameYear, isValid, parse, setDate, setDay, setHours, setMinutes, setMonth, setYear, startOfDay, startOfHour, startOfMinute, startOfMonth, startOfWeek, startOfYear, sub
// eslint-disable-next-line import/no-duplicates -- Ok
 } from "date-fns";
// eslint-disable-next-line import/no-duplicates -- Ok
import enUS from "date-fns/locale/en-US";
export const formatStrings = [
    "yyyy-M-d h:m:s a",
    "yyyy-M-d H:m:s",
    "yyyy-M-d h:m a",
    "yyyy-M-d H:m",
    "yyyy-M-d"
];
export const moduleConfig = onDemand(() => reactiveStorage({
    firstDayOfWeek: 0,
    locale: enUS,
    pm: true
}));
export class DateTime {
    /**
     * Creates class instance.
     *
     * @param dt - Date/time.
     */
    constructor(dt) {
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (dt instanceof Date)
            this.value = dt;
        else if (dt instanceof DateTime)
            this.value = new Date(dt.value);
        else if (is.number(dt))
            this.value = new Date(dt);
        else if (is.string(dt))
            this.value = parseString(dt);
        else
            this.value = new Date();
    }
    add(amount, unit) {
        const duration = {};
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
    clone() {
        return new DateTime(this);
    }
    dayOfMonth() {
        return getDate(this.value);
    }
    dayOfWeek() {
        return getDay(this.value);
    }
    format(fmt) {
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
    hours() {
        return getHours(this.value);
    }
    isSameDayOfMonth(dt) {
        return isSameDay(this.value, dt.toDate());
    }
    isSameHour(dt) {
        return isSameHour(this.value, dt.toDate());
    }
    isSameMinute(dt) {
        return isSameMinute(this.value, dt.toDate());
    }
    isSameMonth(dt) {
        return isSameMonth(this.value, dt.toDate());
    }
    isSameYear(dt) {
        return isSameYear(this.value, dt.toDate());
    }
    minutes() {
        return getMinutes(this.value);
    }
    month() {
        return getMonth(this.value);
    }
    setDayOfMonth(day) {
        this.value = setDate(this.value, day);
        return this;
    }
    setDayOfWeek(day, weekStartsOn) {
        this.value = setDay(this.value, day, { weekStartsOn });
        return this;
    }
    setDayOfWeekLocale(day) {
        const weekStartsOn = moduleConfig.firstDayOfWeek;
        this.value = setDay(this.value, day, { weekStartsOn });
        return this;
    }
    setHours(hours) {
        this.value = setHours(this.value, hours);
        return this;
    }
    setMinutes(minutes) {
        this.value = setMinutes(this.value, minutes);
        return this;
    }
    setMonth(month) {
        this.value = setMonth(this.value, month);
        return this;
    }
    setStartOfDay() {
        this.value = startOfDay(this.value);
        return this;
    }
    setStartOfHour() {
        this.value = startOfHour(this.value);
        return this;
    }
    setStartOfMinute() {
        this.value = startOfMinute(this.value);
        return this;
    }
    setStartOfMonth() {
        this.value = startOfMonth(this.value);
        return this;
    }
    setStartOfWeek(weekStartsOn) {
        this.value = startOfWeek(this.value, { weekStartsOn });
        return this;
    }
    setStartOfWeekLocale() {
        const weekStartsOn = moduleConfig.firstDayOfWeek;
        this.value = startOfWeek(this.value, { weekStartsOn });
        return this;
    }
    setStartOfYear() {
        this.value = startOfYear(this.value);
        return this;
    }
    setYear(year) {
        this.value = setYear(this.value, year);
        return this;
    }
    sub(amount, unit) {
        const duration = {};
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
    toDate() {
        return this.value;
    }
    toString() {
        return format(this.value, "yyyy-MM-dd HH:mm");
    }
    toTime() {
        return this.value.getTime();
    }
    toTimeSec() {
        return this.value.getTime() / 1000;
    }
    year() {
        return getYear(this.value);
    }
}
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure(config) {
    o.assign(moduleConfig, config);
}
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration() {
    return moduleConfig;
}
/**
 * Parses string.
 *
 * @param dt - Date/time.
 * @returns Date object.
 */
function parseString(dt) {
    const now = Date.now();
    for (const formatString of formatStrings) {
        const result = parse(dt, formatString, now);
        if (isValid(result))
            return result;
    }
    throw new Error(`Invalid date: ${dt}`);
}
//# sourceMappingURL=DateTime.js.map