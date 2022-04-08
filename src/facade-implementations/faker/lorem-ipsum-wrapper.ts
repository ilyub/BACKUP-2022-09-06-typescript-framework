import * as _ from "lodash";
import { loremIpsum } from "lorem-ipsum";

import { datetime } from "@skylib/facades/dist/datetime";
import type { Facade, Unit } from "@skylib/facades/dist/faker";
import * as a from "@skylib/functions/dist/array";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import * as num from "@skylib/functions/dist/number";
import * as o from "@skylib/functions/dist/object";

export const loremIpsumWrapper: Configurable & Facade = {
  boolean(): boolean {
    return this.oneOf([true, false]);
  },
  configure(config: Partial<Configuration>): void {
    o.assign(moduleConfig, config);
  },
  date(
    from: string | readonly [number, Unit],
    to: string | readonly [number, Unit],
    step = 1,
    unit: Unit = "minute"
  ): string {
    const fromTime = is.string(from)
      ? datetime.create(from).toTime()
      : datetime
          .create()
          .add(...from)
          .toTime();

    const toTime = is.string(to)
      ? datetime.create(to).toTime()
      : datetime
          .create()
          .add(...to)
          .toTime();

    const stepTime = fn.run(() => {
      switch (unit) {
        case "day":
        case "days":
          return step * 24 * 3600 * 1000;

        case "hour":
        case "hours":
          return step * 3600 * 1000;

        case "minute":
        case "minutes":
          return step * 60 * 1000;
      }
    });

    const time = num.floor.step(_.random(fromTime, toTime), stepTime);

    return datetime.create(new Date(time)).toString();
  },
  getConfiguration(): Configuration {
    return moduleConfig;
  },
  number(from: number, to: number, step = 1): number {
    return num.floor.step(_.random(from, to), step);
  },
  oneOf<T>(values: readonly T[]): T {
    return a.get(values, _.random(0, values.length - 1));
  },
  paragraph(
    minSentences?: number,
    maxSentences?: number,
    minWords?: number,
    maxWords?: number
  ): string {
    return loremIpsum({
      paragraphLowerBound: minSentences ?? moduleConfig.minSentences,
      paragraphUpperBound: maxSentences ?? moduleConfig.maxSentences,
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "paragraphs"
    });
  },
  phrase(minWords?: number, maxWords?: number): string {
    return loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    }).replace(/\.$/u, "");
  },
  sentence(minWords?: number, maxWords?: number): string {
    return loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    });
  },
  word(): string {
    return loremIpsum({ suffix: "\n", units: "words" });
  }
};

export interface Configurable {
  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  readonly configure: (config: Partial<Configuration>) => void;
  /**
   * Returns plugin configuration.
   *
   * @returns Plugin configuration.
   */
  readonly getConfiguration: () => Configuration;
}

export interface Configuration {
  readonly maxSentences: number;
  readonly maxWords: number;
  readonly minSentences: number;
  readonly minWords: number;
}

const moduleConfig: Configuration = {
  maxSentences: 5,
  maxWords: 10,
  minSentences: 3,
  minWords: 5
};
