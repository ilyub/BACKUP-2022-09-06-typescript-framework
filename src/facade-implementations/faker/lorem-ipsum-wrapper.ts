import { datetime } from "@skylib/facades";
import { a, fn, is, num, o } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { loremIpsum } from "lorem-ipsum";
import type { faker } from "@skylib/facades";

export const loremIpsumWrapper: faker.Facade & loremIpsumWrapper.Configurable =
  {
    boolean(trueWeight = 0.5, falseWeight = 0.5) {
      return Math.random() < trueWeight / (trueWeight + falseWeight);
    },
    configure(config) {
      o.assign(moduleConfig, config);
    },
    date(from, to, step = 1, unit = "minute") {
      const from2 = is.string(from)
        ? datetime.create(from).toTime()
        : datetime
            .create()
            .add(...from)
            .toTime();

      const to2 = is.string(to)
        ? datetime.create(to).toTime()
        : datetime
            .create()
            .add(...to)
            .toTime();

      const step2 = fn.run(() => {
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

      const time = num.floor.step(_.random(from2, to2), step2);

      return datetime.create(time).toString();
    },
    getConfiguration() {
      return moduleConfig;
    },
    number(from, to, step = 1) {
      return num.floor.step(_.random(from, to), step);
    },
    oneOf<T>(values: readonly T[]) {
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

export namespace loremIpsumWrapper {
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
    readonly maxSentences: number;
    readonly maxWords: number;
    readonly minSentences: number;
    readonly minWords: number;
  }

  export interface PartialConfiguration extends Partial<Configuration> {}
}

const moduleConfig: loremIpsumWrapper.Configuration = {
  maxSentences: 5,
  maxWords: 10,
  minSentences: 3,
  minWords: 5
};
