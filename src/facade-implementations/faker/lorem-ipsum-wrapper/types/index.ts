export interface Configuration {
  readonly maxSentences: number;
  readonly maxWords: number;
  readonly minSentences: number;
  readonly minWords: number;
}

export interface PartialConfiguration extends Partial<Configuration> {}
