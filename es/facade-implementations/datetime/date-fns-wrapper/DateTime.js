import { formatStrings, moduleConfig } from "./core";
import { is } from "@skylib/functions";
import { add, format as formatDate, getDate, getDay, getHours, getMinutes, getMonth, getSeconds, getYear, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameYear, isValid, parse, setDate, setDay, setHours, setMinutes, setMonth, setYear, startOfDay, startOfHour, startOfMinute, startOfMonth, startOfWeek, startOfYear, sub } from "date-fns";
export class DateTime {
    /**
     * Creates class instance.
     *
     * @param date - Date.
     */
    constructor(date) {
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (date instanceof Date)
            this.value = date;
        else if (date instanceof DateTime)
            this.value = date.value;
        else if (is.number(date))
            this.value = new Date(date);
        else if (is.string(date))
            this.value = parseString(date);
        else
            this.value = new Date();
        function parseString(str) {
            const now = Date.now();
            for (const formatString of formatStrings) {
                const result = parse(str, formatString, now);
                if (isValid(result))
                    return result;
            }
            throw new Error(`Unknown date format: ${str}`);
        }
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
        return new DateTime(add(this.value, duration));
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
    format(format) {
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
    hours() {
        return getHours(this.value);
    }
    isSameDayOfMonth(date) {
        return isSameDay(this.value, date.toDate());
    }
    isSameHour(date) {
        return isSameHour(this.value, date.toDate());
    }
    isSameMinute(date) {
        return isSameMinute(this.value, date.toDate());
    }
    isSameMonth(date) {
        return isSameMonth(this.value, date.toDate());
    }
    isSameYear(date) {
        return isSameYear(this.value, date.toDate());
    }
    minutes() {
        return getMinutes(this.value);
    }
    month() {
        return getMonth(this.value);
    }
    setDayOfMonth(day) {
        return new DateTime(setDate(this.value, day));
    }
    setDayOfWeek(day, weekStartsOn) {
        return new DateTime(setDay(this.value, day, { weekStartsOn }));
    }
    setDayOfWeekLocale(day) {
        const weekStartsOn = moduleConfig.firstDayOfWeek;
        return new DateTime(setDay(this.value, day, { weekStartsOn }));
    }
    setHours(hours) {
        return new DateTime(setHours(this.value, hours));
    }
    setMinutes(minutes) {
        return new DateTime(setMinutes(this.value, minutes));
    }
    setMonth(month) {
        return new DateTime(setMonth(this.value, month));
    }
    setStartOfDay() {
        return new DateTime(startOfDay(this.value));
    }
    setStartOfHour() {
        return new DateTime(startOfHour(this.value));
    }
    setStartOfMinute() {
        return new DateTime(startOfMinute(this.value));
    }
    setStartOfMonth() {
        return new DateTime(startOfMonth(this.value));
    }
    setStartOfWeek(weekStartsOn) {
        return new DateTime(startOfWeek(this.value, { weekStartsOn }));
    }
    setStartOfWeekLocale() {
        const weekStartsOn = moduleConfig.firstDayOfWeek;
        return new DateTime(startOfWeek(this.value, { weekStartsOn }));
    }
    setStartOfYear() {
        return new DateTime(startOfYear(this.value));
    }
    setYear(year) {
        return new DateTime(setYear(this.value, year));
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
        return new DateTime(sub(this.value, duration));
    }
    toDate() {
        return this.value;
    }
    toString() {
        return getSeconds(this.value)
            ? formatDate(this.value, "yyyy-MM-dd HH:mm:ss")
            : formatDate(this.value, "yyyy-MM-dd HH:mm");
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
//# sourceMappingURL=DateTime.js.map