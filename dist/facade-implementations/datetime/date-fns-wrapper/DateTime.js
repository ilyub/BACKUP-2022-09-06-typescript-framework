"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const date_fns_1 = require("date-fns");
const core_1 = require("./core");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
class DateTime {
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
            case facades_1.TimeUnit.minute:
            case facades_1.TimeUnit.minutes:
                duration.minutes = amount;
                break;
            case facades_1.TimeUnit.hour:
            case facades_1.TimeUnit.hours:
                duration.hours = amount;
                break;
            case facades_1.TimeUnit.day:
            case facades_1.TimeUnit.days:
                duration.days = amount;
                break;
            case facades_1.TimeUnit.week:
            case facades_1.TimeUnit.weeks:
                duration.weeks = amount;
                break;
            case facades_1.TimeUnit.month:
            case facades_1.TimeUnit.months:
                duration.months = amount;
                break;
            case facades_1.TimeUnit.year:
            case facades_1.TimeUnit.years:
                duration.years = amount;
        }
        return new DateTime((0, date_fns_1.add)(this.value, duration));
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
        return new DateTime((0, date_fns_1.setDate)(this.value, day));
    }
    setDayOfWeek(day, weekStartsOn) {
        return new DateTime((0, date_fns_1.setDay)(this.value, day, { weekStartsOn }));
    }
    setDayOfWeekLocale(day) {
        const weekStartsOn = core_1.moduleConfig.firstDayOfWeek;
        return new DateTime((0, date_fns_1.setDay)(this.value, day, { weekStartsOn }));
    }
    setHours(hours) {
        return new DateTime((0, date_fns_1.setHours)(this.value, hours));
    }
    setMinutes(minutes) {
        return new DateTime((0, date_fns_1.setMinutes)(this.value, minutes));
    }
    setMonth(month) {
        return new DateTime((0, date_fns_1.setMonth)(this.value, month));
    }
    setStartOfDay() {
        return new DateTime((0, date_fns_1.startOfDay)(this.value));
    }
    setStartOfHour() {
        return new DateTime((0, date_fns_1.startOfHour)(this.value));
    }
    setStartOfMinute() {
        return new DateTime((0, date_fns_1.startOfMinute)(this.value));
    }
    setStartOfMonth() {
        return new DateTime((0, date_fns_1.startOfMonth)(this.value));
    }
    setStartOfWeek(weekStartsOn) {
        return new DateTime((0, date_fns_1.startOfWeek)(this.value, { weekStartsOn }));
    }
    setStartOfWeekLocale() {
        const weekStartsOn = core_1.moduleConfig.firstDayOfWeek;
        return new DateTime((0, date_fns_1.startOfWeek)(this.value, { weekStartsOn }));
    }
    setStartOfYear() {
        return new DateTime((0, date_fns_1.startOfYear)(this.value));
    }
    setYear(year) {
        return new DateTime((0, date_fns_1.setYear)(this.value, year));
    }
    sub(amount, unit) {
        const duration = {};
        switch (unit) {
            case facades_1.TimeUnit.minute:
            case facades_1.TimeUnit.minutes:
                duration.minutes = amount;
                break;
            case facades_1.TimeUnit.hour:
            case facades_1.TimeUnit.hours:
                duration.hours = amount;
                break;
            case facades_1.TimeUnit.day:
            case facades_1.TimeUnit.days:
                duration.days = amount;
                break;
            case facades_1.TimeUnit.week:
            case facades_1.TimeUnit.weeks:
                duration.weeks = amount;
                break;
            case facades_1.TimeUnit.month:
            case facades_1.TimeUnit.months:
                duration.months = amount;
                break;
            case facades_1.TimeUnit.year:
            case facades_1.TimeUnit.years:
                duration.years = amount;
        }
        return new DateTime((0, date_fns_1.sub)(this.value, duration));
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