import { isValid, parse } from "date-fns";
import { DateTime, formatStrings } from "./DateTime";
export { DateTime, configure, getConfiguration } from "./DateTime";
export const implementation = {
    create(dt) {
        return new DateTime(dt);
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
    validate(dt) {
        const now = Date.now();
        return formatStrings.some(formatString => isValid(parse(dt, formatString, now)));
    }
};
//# sourceMappingURL=index.js.map