"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.implementation = exports.getConfiguration = exports.configure = void 0;
const tslib_1 = require("tslib");
const date_fns_1 = require("date-fns"); // eslint-disable-line import/no-duplicates
const en_US_1 = (0, tslib_1.__importDefault)(require("date-fns/locale/en-US")); // eslint-disable-line import/no-duplicates
const reactiveStorage_1 = require("@skylib/facades/dist/reactiveStorage");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const helpers_1 = require("@skylib/functions/dist/helpers");
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    o.assign(moduleConfig, config);
}
exports.configure = configure;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
function getConfiguration() {
    return moduleConfig;
}
exports.getConfiguration = getConfiguration;
exports.implementation = {
    create(dt) {
        return new DateTime(dt);
    },
    now() {
        return new DateTime().toString();
    },
    time() {
        return Date.now() / 1000;
    },
    validate(dt) {
        const now = Date.now();
        return formatStrings.some(formatString => (0, date_fns_1.isValid)((0, date_fns_1.parse)(dt, formatString, now)));
    }
};
class DateTime {
    /**
     * Creates class instance.
     *
     * @param dt - Date/time.
     */
    constructor(dt) {
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
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
        return (0, date_fns_1.format)(this.value, fmt, { locale: moduleConfig.locale });
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
        const weekStartsOn = moduleConfig.firstDayOfWeek;
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
    setStartOfWeek(weekStartsOn) {
        return this.setDayOfWeek(weekStartsOn, weekStartsOn);
    }
    setStartOfWeekLocale() {
        const weekStartsOn = moduleConfig.firstDayOfWeek;
        return this.setDayOfWeek(weekStartsOn, weekStartsOn);
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
        return this.value.getTime() / 1000;
    }
    year() {
        return (0, date_fns_1.getYear)(this.value);
    }
}
exports.DateTime = DateTime;
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const formatStrings = [
    "yyyy-M-d h:m:s a",
    "yyyy-M-d H:m:s",
    "yyyy-M-d h:m a",
    "yyyy-M-d H:m",
    "yyyy-M-d"
];
const moduleConfig = (0, helpers_1.onDemand)(() => (0, reactiveStorage_1.reactiveStorage)({
    firstDayOfWeek: 0,
    locale: en_US_1.default,
    pm: true
}));
/**
 * Parses string.
 *
 * @param dt - Date/time.
 * @returns Date object.
 */
function parseString(dt) {
    const now = Date.now();
    for (const formatString of formatStrings) {
        const result = (0, date_fns_1.parse)(dt, formatString, now);
        if ((0, date_fns_1.isValid)(result))
            return result;
    }
    throw new Error(`Invalid date: ${dt}`);
}
//# sourceMappingURL=date-fns-wrapper.js.map