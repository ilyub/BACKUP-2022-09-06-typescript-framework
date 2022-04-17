import type { faker } from "@skylib/facades";
import { datetime } from "@skylib/facades";
import { a, fn, is, num, o } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { loremIpsum } from "lorem-ipsum";

export const loremIpsumWrapper: Configurable & faker.Facade = {
  boolean(): boolean {
    return this.oneOf([true, false]);
  },
  configure(config): void {
    o.assign(moduleConfig, config);
  },
  date(from, to, step = 1, unit = "minute") {
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
  number(from, to, step = 1) {
    return num.floor.step(_.random(from, to), step);
  },
  oneOf<T>(values: readonly T[]): T {
    return a.get(values, _.random(0, values.length - 1));
  },
  paragraph(minSentences, maxSentences, minWords, maxWords) {
    return loremIpsum({
      paragraphLowerBound: minSentences ?? moduleConfig.minSentences,
      paragraphUpperBound: maxSentences ?? moduleConfig.maxSentences,
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "paragraphs"
    });
  },
  phrase(minWords, maxWords) {
    return loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    }).replace(/\.$/u, "");
  },
  sentence(minWords, maxWords) {
    return loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    });
  },
  word() {
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
