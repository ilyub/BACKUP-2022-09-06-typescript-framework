import { formatStrings, moduleConfig } from "./core";
import { isValid, parse } from "date-fns";
import type { Configurable } from "./core";
import { DateTime } from "./DateTime";
import type { NumStr } from "@skylib/functions";
import type { datetime } from "@skylib/facades";
import { o } from "@skylib/functions";

export const dateFnsWrapper: Configurable & datetime.Facade = {
  configure: config => {
    o.assign(moduleConfig, config);
  },
  create: (date?: Date | datetime.DateTime | NumStr) => new DateTime(date),
  getConfiguration: () => moduleConfig,
  now: () => new DateTime().toString(),
  time: () => Date.now(),
  timeSec: () => Date.now() / 1000,
  validate: (date: string) => {
    const now = Date.now();

    return formatStrings.some(formatString =>
      isValid(parse(date, formatString, now))
    );
  }
};

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Ok
export namespace dateFnsWrapper {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
