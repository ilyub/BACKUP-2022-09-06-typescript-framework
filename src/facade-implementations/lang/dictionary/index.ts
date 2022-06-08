import type { Definitions } from "./Definitions";
import type { LocaleName, Rec } from "@skylib/functions";

export { Definitions } from "./Definitions";

export { Dictionary } from "./Dictionary";

// eslint-disable-next-line no-restricted-syntax -- Ok
export type { Configuration, PartialConfiguration } from "./core";

// eslint-disable-next-line no-restricted-syntax -- Ok
export { pluralReduce, configure, getConfiguration } from "./core";

export type DefinitionsByLocale = Rec<LocaleName, Definitions>;
