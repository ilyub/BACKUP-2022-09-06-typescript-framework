import type { Writable, strings } from "@skylib/functions";
import type { Locale } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { onDemand } from "@skylib/functions";
import { reactiveStorage } from "@skylib/facades";

export const formatStrings: strings = [
  "yyyy-M-d h:m:s a",
  "yyyy-M-d H:m:s",
  "yyyy-M-d h:m a",
  "yyyy-M-d H:m",
  "yyyy-M-d"
];

export const moduleConfig = onDemand(() =>
  reactiveStorage<Writable<Configuration>>({
    firstDayOfWeek: 0,
    locale: enUS,
    pm: true
  })
);

export interface Configurable {
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

export interface Configuration {
  readonly firstDayOfWeek: FirstDayOfWeek;
  readonly locale: Locale;
  readonly pm: boolean;
}

export type FirstDayOfWeek = 0 | 1;

export interface PartialConfiguration extends Partial<Configuration> {}
