import { DateTime } from "./DateTime";
import { formatStrings, moduleConfig } from "./core";
import { o } from "@skylib/functions";
import { isValid, parse } from "date-fns";
import type { Configuration, PartialConfiguration } from "./core";
import type { datetime } from "@skylib/facades";
import type { NumStr } from "@skylib/functions";

export class DateFnsWrapper implements datetime.Facade {
  public readonly DateTime = DateTime;

  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  public readonly configure = (config: PartialConfiguration): void => {
    o.assign(moduleConfig, config);
  };

  public readonly create = (
    date?: Date | datetime.DateTime | NumStr
  ): DateTime => new DateTime(date);

  /**
   * Returns plugin configuration.
   *
   * @returns Plugin configuration.
   */
  public readonly getConfiguration = (): Configuration => moduleConfig;

  public readonly now = (): string => new DateTime().toString();

  public readonly time = (): number => Date.now();

  public readonly timeSec = (): number => Date.now() / 1000;

  public readonly validate = (date: string): boolean => {
    const now = Date.now();

    return formatStrings.some(formatString =>
      isValid(parse(date, formatString, now))
    );
  };
}
