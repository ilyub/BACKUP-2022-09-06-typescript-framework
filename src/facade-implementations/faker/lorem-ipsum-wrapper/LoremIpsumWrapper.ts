import { datetime } from "@skylib/facades";
import { a, fn, is, num, o } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { loremIpsum } from "lorem-ipsum";
import type { Configuration, PartialConfiguration } from "./types";
import type { faker } from "@skylib/facades";

export class LoremIpsumWrapper implements faker.Facade {
  public readonly boolean = (trueWeight = 0.5, falseWeight = 0.5): boolean =>
    Math.random() < trueWeight / (trueWeight + falseWeight);

  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  public readonly configure = (config: PartialConfiguration): void => {
    o.assign(moduleConfig, config);
  };

  public readonly date = (
    from: faker.TimeInterval | string,
    to: faker.TimeInterval | string,
    step = 1,
    unit: faker.TimeUnit = "minute"
  ): string => {
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
  };

  /**
   * Returns plugin configuration.
   *
   * @returns Plugin configuration.
   */
  public readonly getConfiguration = (): Configuration => moduleConfig;

  public readonly number = (from: number, to: number, step = 1): number =>
    num.floor.step(_.random(from, to), step);

  public readonly oneOf = <T>(values: readonly T[]): T =>
    a.get(values, _.random(0, values.length - 1));

  public readonly paragraph = (
    minSentences?: number,
    maxSentences?: number,
    minWords?: number,
    maxWords?: number
  ): string =>
    loremIpsum({
      paragraphLowerBound: minSentences ?? moduleConfig.minSentences,
      paragraphUpperBound: maxSentences ?? moduleConfig.maxSentences,
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "paragraphs"
    });

  public readonly phrase = (minWords?: number, maxWords?: number): string =>
    loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    }).replace(/\.$/u, "");

  public readonly sentence = (minWords?: number, maxWords?: number): string =>
    loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    });

  public readonly word = (): string =>
    loremIpsum({ suffix: "\n", units: "words" });
}

const moduleConfig: Configuration = {
  maxSentences: 5,
  maxWords: 10,
  minSentences: 3,
  minWords: 5
};
