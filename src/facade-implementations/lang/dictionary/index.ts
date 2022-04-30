import type { Definitions } from "./Definitions";
import type { LocaleName, Rec } from "@skylib/functions";

export { Definitions } from "./Definitions";

export { Dictionary } from "./Dictionary";

export type { Configuration, PartialConfiguration } from "./core";

export { pluralReduce, configure, getConfiguration } from "./core";

export type DefinitionsByLocale = Rec<LocaleName, Definitions>;
