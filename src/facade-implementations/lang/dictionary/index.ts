import type { LocaleName, Rec } from "@skylib/functions";
import type { Definitions } from "./Definitions";

export { Definitions } from "./Definitions";

export { Dictionary } from "./Dictionary";

export type { Configuration, PartialConfiguration } from "./core";

export { pluralReduce, configure, getConfiguration } from "./core";

export type DefinitionsByLocale = Rec<LocaleName, Definitions>;
