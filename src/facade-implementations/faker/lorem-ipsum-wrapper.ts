import { loremIpsum } from "lorem-ipsum";

import type { Facade } from "@skylib/facades/dist/faker";
import * as o from "@skylib/functions/dist/object";

export interface Configurable {
  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  readonly configure: <K extends keyof Configuration>(
    config: PartialConfiguration<K>
  ) => void;
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

export type PartialConfiguration<K extends keyof Configuration> = {
  readonly [L in K]: Configuration[L];
};

export const loremIpsumWrapper: Configurable & Facade = {
  configure<K extends keyof Configuration>(
    config: PartialConfiguration<K>
  ): void {
    o.assign(moduleConfig, config);
  },
  getConfiguration(): Configuration {
    return moduleConfig;
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

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

const moduleConfig: Configuration = {
  maxSentences: 5,
  maxWords: 10,
  minSentences: 3,
  minWords: 5
};
