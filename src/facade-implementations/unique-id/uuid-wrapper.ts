import { v4 } from "uuid";
import type { uniqueId } from "@skylib/facades";

export const uuidWrapper: uniqueId.Facade = v4;
