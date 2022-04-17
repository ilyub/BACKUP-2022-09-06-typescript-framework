import type { datetime } from "@skylib/facades";
import type { NumStr } from "@skylib/functions";
import { isValid, parse } from "date-fns";
import { DateTime, formatStrings } from "./DateTime";

export { DateTime, configure, getConfiguration } from "./DateTime";

export type { Configuration, FirstDayOfWeek } from "./DateTime";

export const implementation: datetime.Facade = {
  create(dt?: Date | datetime.DateTime | NumStr) {
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
  validate(dt: string) {
    const now = Date.now();

    return formatStrings.some(formatString =>
      isValid(parse(dt, formatString, now))
    );
  }
};
