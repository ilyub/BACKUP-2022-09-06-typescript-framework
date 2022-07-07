import { DateTime } from "./DateTime";
import { formatStrings, moduleConfig } from "./core";
import { o } from "@skylib/functions";
import { isValid, parse } from "date-fns";
import type { Configurable } from "./core";
import type { datetime } from "@skylib/facades";
import type { NumStr } from "@skylib/functions";

export const dateFnsWrapper: Configurable & datetime.Facade = {
  configure: (config: dateFnsWrapper.PartialConfiguration) => {
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

export namespace dateFnsWrapper {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
