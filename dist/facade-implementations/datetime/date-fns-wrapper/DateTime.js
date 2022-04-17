"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.configure = exports.DateTime = exports.moduleConfig = exports.formatStrings = void 0;
const tslib_1 = require("tslib");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
const date_fns_1 = require("date-fns");
// eslint-disable-next-line import/no-duplicates -- Ok
const en_US_1 = tslib_1.__importDefault(require("date-fns/locale/en-US"));
exports.formatStrings = [
    "yyyy-M-d h:m:s a",
    "yyyy-M-d H:m:s",
    "yyyy-M-d h:m a",
    "yyyy-M-d H:m",
    "yyyy-M-d"
];
exports.moduleConfig = (0, functions_1.onDemand)(() => (0, facades_1.reactiveStorage)({
    firstDayOfWeek: 0,
    locale: en_US_1.default,
    pm: true
}));
class DateTime {
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
        else if (functions_1.is.number(dt))
            this.value = new Date(dt);
        else if (functions_1.is.string(dt))
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
    format(fmt) {
        fmt = exports.moduleConfig.pm
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
        return (0, date_fns_1.format)(this.value, fmt, { locale: exports.moduleConfig.locale });
    }
    hours() {
        return (0, date_fns_1.getHours)(this.value);
    }
    isSameDayOfMonth(dt) {
        return (0, date_fns_1.isSameDay)(this.value, dt.toDate());
    }
    isSameHour(dt) {
        return (0, date_fns_1.isSameHour)(this.value, dt.toDate());
    }
    isSameMinute(dt) {
        return (0, date_fns_1.isSameMinute)(this.value, dt.toDate());
    }
    isSameMonth(dt) {
        return (0, date_fns_1.isSameMonth)(this.value, dt.toDate());
    }
    isSameYear(dt) {
        return (0, date_fns_1.isSameYear)(this.value, dt.toDate());
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
        const weekStartsOn = exports.moduleConfig.firstDayOfWeek;
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
        const weekStartsOn = exports.moduleConfig.firstDayOfWeek;
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
        return (0, date_fns_1.format)(this.value, "yyyy-MM-dd HH:mm");
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
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    functions_1.o.assign(exports.moduleConfig, config);
}
exports.configure = configure;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
function getConfiguration() {
    return exports.moduleConfig;
}
exports.getConfiguration = getConfiguration;
/**
 * Parses string.
 *
 * @param dt - Date/time.
 * @returns Date object.
 */
function parseString(dt) {
    const now = Date.now();
    for (const formatString of exports.formatStrings) {
        const result = (0, date_fns_1.parse)(dt, formatString, now);
        if ((0, date_fns_1.isValid)(result))
            return result;
    }
    throw new Error(`Invalid date: ${dt}`);
}
//# sourceMappingURL=DateTime.js.map