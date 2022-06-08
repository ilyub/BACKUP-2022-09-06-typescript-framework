import { reactiveStorage } from "@skylib/facades";
import { onDemand } from "@skylib/functions";
import enUS from "date-fns/locale/en-US";
import type { strings } from "@skylib/functions";

export const formatStrings: strings = [
  "yyyy-M-d h:m:s a",
  "yyyy-M-d H:m:s",
  "yyyy-M-d h:m a",
  "yyyy-M-d H:m",
  "yyyy-M-d"
];

export const moduleConfig = onDemand(() =>
  reactiveStorage<Configuration>({
    firstDayOfWeek: 0,
    locale: enUS,
    pm: true
  })
);

export interface Configuration {
  readonly firstDayOfWeek: FirstDayOfWeek;
  readonly locale: Locale;
  readonly pm: boolean;
}

export type FirstDayOfWeek = 0 | 1;

export interface PartialConfiguration extends Partial<Configuration> {}