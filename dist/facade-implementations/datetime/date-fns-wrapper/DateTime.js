"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
const date_fns_1 = require("date-fns");
class DateTime {
    /**
     * Creates class instance.
     *
     * @param date - Date.
     */
    constructor(date) {
        // eslint-disable-next-line @skylib/no-restricted-syntax -- Ok
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
        else if (functions_1.is.number(date))
            this.value = new Date(date);
        else if (functions_1.is.string(date))
            this.value = parseString(date);
        else
            this.value = new Date();
        function parseString(str) {
            const now = Date.now();
            for (const formatString of core_1.formatStrings) {
                const result = (0, date_fns_1.parse)(str, formatString, now);
                if ((0, date_fns_1.isValid)(result))
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
        this.value = (0, date_fns_1.add)(this.value, duration);
        return this;
    }
    clone() {
        return new DateTime(this);
    }
    dayOfMonth() {
        return (0, date_fns_1.getDate)(this.value);
    }
    dayOfWeek() {
        return (0, date_fns_1.getDay)(this.value);
    }
    format(format) {
        format = core_1.moduleConfig.pm
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
        return (0, date_fns_1.format)(this.value, format, { locale: core_1.moduleConfig.locale });
    }
    hours() {
        return (0, date_fns_1.getHours)(this.value);
    }
    isSameDayOfMonth(date) {
        return (0, date_fns_1.isSameDay)(this.value, date.toDate());
    }
    isSameHour(date) {
        return (0, date_fns_1.isSameHour)(this.value, date.toDate());
    }
    isSameMinute(date) {
        return (0, date_fns_1.isSameMinute)(this.value, date.toDate());
    }
    isSameMonth(date) {
        return (0, date_fns_1.isSameMonth)(this.value, date.toDate());
    }
    isSameYear(date) {
        return (0, date_fns_1.isSameYear)(this.value, date.toDate());
    }
    minutes() {
        return (0, date_fns_1.getMinutes)(this.value);
    }
    month() {
        return (0, date_fns_1.getMonth)(this.value);
    }
    setDayOfMonth(day) {
        this.value = (0, date_fns_1.setDate)(this.value, day);
        return this;
    }
    setDayOfWeek(day, weekStartsOn) {
        this.value = (0, date_fns_1.setDay)(this.value, day, { weekStartsOn });
        return this;
    }
    setDayOfWeekLocale(day) {
        const weekStartsOn = core_1.moduleConfig.firstDayOfWeek;
        this.value = (0, date_fns_1.setDay)(this.value, day, { weekStartsOn });
        return this;
    }
    setHours(hours) {
        this.value = (0, date_fns_1.setHours)(this.value, hours);
        return this;
    }
    setMinutes(minutes) {
        this.value = (0, date_fns_1.setMinutes)(this.value, minutes);
        return this;
    }
    setMonth(month) {
        this.value = (0, date_fns_1.setMonth)(this.value, month);
        return this;
    }
    setStartOfDay() {
        this.value = (0, date_fns_1.startOfDay)(this.value);
        return this;
    }
    setStartOfHour() {
        this.value = (0, date_fns_1.startOfHour)(this.value);
        return this;
    }
    setStartOfMinute() {
        this.value = (0, date_fns_1.startOfMinute)(this.value);
        return this;
    }
    setStartOfMonth() {
        this.value = (0, date_fns_1.startOfMonth)(this.value);
        return this;
    }
    setStartOfWeek(weekStartsOn) {
        this.value = (0, date_fns_1.startOfWeek)(this.value, { weekStartsOn });
        return this;
    }
    setStartOfWeekLocale() {
        const weekStartsOn = core_1.moduleConfig.firstDayOfWeek;
        this.value = (0, date_fns_1.startOfWeek)(this.value, { weekStartsOn });
        return this;
    }
    setStartOfYear() {
        this.value = (0, date_fns_1.startOfYear)(this.value);
        return this;
    }
    setYear(year) {
        this.value = (0, date_fns_1.setYear)(this.value, year);
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
        this.value = (0, date_fns_1.sub)(this.value, duration);
        return this;
    }
    toDate() {
        return this.value;
    }
    toString() {
        return (0, date_fns_1.getSeconds)(this.value)
            ? (0, date_fns_1.format)(this.value, "yyyy-MM-dd HH:mm:ss")
            : (0, date_fns_1.format)(this.value, "yyyy-MM-dd HH:mm");
    }
    toTime() {
        return this.value.getTime();
    }
    toTimeSec() {
        return this.value.getTime() / 1000;
    }
    year() {
        return (0, date_fns_1.getYear)(this.value);
    }
}
exports.DateTime = DateTime;
//# sourceMappingURL=DateTime.js.map