import { datetime } from "@skylib/facades";
import { a, fn, is, num, o } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { loremIpsum } from "lorem-ipsum";
import type { Configuration, PartialConfiguration } from "./types";
import type { faker } from "@skylib/facades";

export class LoremIpsumWrapper implements faker.Facade {
  public boolean(trueWeight = 0.5, falseWeight = 0.5): boolean {
    return Math.random() < trueWeight / (trueWeight + falseWeight);
  }

  /**
   * Configures plugin.
   *
   * @param this - No this.
   * @param config - Plugin configuration.
   */
  public configure(this: void, config: PartialConfiguration): void {
    o.assign(moduleConfig, config);
  }

  public date(
    from: faker.TimeInterval | string,
    to: faker.TimeInterval | string,
    step = 1,
    unit: faker.TimeUnit = "minute"
  ): string {
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

  public number(from: number, to: number, step = 1): number {
    return num.floor.step(_.random(from, to), step);
  }

  public oneOf<T>(values: readonly T[]): T {
    return a.get(values, _.random(0, values.length - 1));
  }

  public paragraph(
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
  }

  public phrase(minWords?: number, maxWords?: number): string {
    return loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    }).replace(/\.$/u, "");
  }

  public sentence(minWords?: number, maxWords?: number): string {
    return loremIpsum({
      sentenceLowerBound: minWords ?? moduleConfig.minWords,
      sentenceUpperBound: maxWords ?? moduleConfig.maxWords,
      suffix: "\n",
      units: "sentences"
    });
  }

  public word(): string {
    return loremIpsum({ suffix: "\n", units: "words" });
  }
}

const moduleConfig: Configuration = {
  maxSentences: 5,
  maxWords: 10,
  minSentences: 3,
  minWords: 5
};
