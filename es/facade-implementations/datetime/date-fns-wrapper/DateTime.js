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