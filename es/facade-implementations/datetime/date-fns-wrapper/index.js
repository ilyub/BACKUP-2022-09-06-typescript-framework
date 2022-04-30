import { DateTime } from "./DateTime";
import { formatStrings, moduleConfig } from "./core";
import { o } from "@skylib/functions";
import { isValid, parse } from "date-fns";
export const dateFnsWrapper = {
    DateTime,
    configure(config) {
        o.assign(moduleConfig, config);
    },
    create(date) {
        return new DateTime(date);
    },
    getConfiguration() {
        return moduleConfig;
    },
    now() {
        return new DateTime().toString();
    },
    time() {
        return Date.now();
    },
    timeSec() {
        return Date.now() / 1000;
    },
    validate(date) {
        const now = Date.now();
        return formatStrings.some(formatString => isValid(parse(date, formatString, now)));
    }
};
//# sourceMappingURL=index.js.map