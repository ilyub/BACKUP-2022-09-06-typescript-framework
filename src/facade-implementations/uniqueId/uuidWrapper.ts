import type { Facade } from "@skylib/facades/dist/uniqueId";
import { v4 } from "uuid";

export const implementation: Facade = v4;
