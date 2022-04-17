import type { uniqueId } from "@skylib/facades";
import { v4 } from "uuid";

export const implementation: uniqueId.Facade = v4;
