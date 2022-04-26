import { v4 } from "uuid";
import type { uniqueId } from "@skylib/facades";

export const implementation: uniqueId.Facade = v4;
