import { formatStrings, moduleConfig } from "./core";
import { isValid, parse } from "date-fns";
import { DateTime } from "./DateTime";
import { o } from "@skylib/functions";
export const dateFnsWrapper = {
    configure: config => {
        o.assign(moduleConfig, config);
    },
    create: (date) => new DateTime(date),
    getConfiguration: () => moduleConfig,
    now: () => new DateTime().toString(),
    time: () => Date.now(),
    timeSec: () => Date.now() / 1000,
    validate: (date) => {
        const now = Date.now();
        return formatStrings.some(formatString => isValid(parse(date, formatString, now)));
    }
};
//# sourceMappingURL=index.js.map