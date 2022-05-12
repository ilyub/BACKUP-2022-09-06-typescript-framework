export interface Configuration {
  readonly timeout: number;
}

export interface PartialConfiguration extends Partial<Configuration> {}
