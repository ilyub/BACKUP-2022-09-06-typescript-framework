import { LoremIpsumWrapper } from "./LoremIpsumWrapper";

export const loremIpsumWrapper = new LoremIpsumWrapper();

export namespace loremIpsumWrapper {
  export type Configuration = import("./types").Configuration;

  export type PartialConfiguration = import("./types").PartialConfiguration;
}
