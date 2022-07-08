import type { uniqueId } from "@skylib/facades";
import { v4 } from "uuid";

export const uuidWrapper: uniqueId.Facade = v4;
