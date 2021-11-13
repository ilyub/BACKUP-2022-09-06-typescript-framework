import { v4 } from "uuid";

import type { Facade } from "@skylib/facades/dist/uniqueId";

export const implementation: Facade = v4;
