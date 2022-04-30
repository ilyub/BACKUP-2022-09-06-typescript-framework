import { DateTime } from "./DateTime";
import { formatStrings, moduleConfig } from "./core";
import { o } from "@skylib/functions";
import { isValid, parse } from "date-fns";
import type { datetime } from "@skylib/facades";
import type { NumStr } from "@skylib/functions";

export const dateFnsWrapper: dateFnsWrapper.Configurable & datetime.Facade = {
  DateTime,
  configure(config) {
    o.assign(moduleConfig, config);
  },
  create(date?: Date | datetime.DateTime | NumStr) {
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
  validate(date: string) {
    const now = Date.now();

    return formatStrings.some(formatString =>
      isValid(parse(date, formatString, now))
    );
  }
};

export namespace dateFnsWrapper {
  export interface Configurable {
    readonly DateTime: typeof DateTime;
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    readonly configure: (config: PartialConfiguration) => void;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    readonly getConfiguration: () => Configuration;
  }

  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
