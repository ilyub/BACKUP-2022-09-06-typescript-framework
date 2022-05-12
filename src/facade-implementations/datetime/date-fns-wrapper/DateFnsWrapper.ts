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
   * @param this - No this.
   * @param config - Plugin configuration.
   */
  public configure(this: void, config: PartialConfiguration): void {
    o.assign(moduleConfig, config);
  }

  public create(date?: Date | datetime.DateTime | NumStr): DateTime {
    return new DateTime(date);
  }

  /**
   * Returns plugin configuration.
   *
   * @param this - No this.
   * @returns Plugin configuration.
   */
  public getConfiguration(this: void): Configuration {
    return moduleConfig;
  }

  public now(): string {
    return new DateTime().toString();
  }

  public time(): number {
    return Date.now();
  }

  public timeSec(): number {
    return Date.now() / 1000;
  }

  public validate(date: string): boolean {
    const now = Date.now();

    return formatStrings.some(formatString =>
      isValid(parse(date, formatString, now))
    );
  }
}
