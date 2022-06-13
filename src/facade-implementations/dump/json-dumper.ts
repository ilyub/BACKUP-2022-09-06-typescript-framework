import { json } from "@skylib/functions";
import type { dump } from "@skylib/facades";

export const jsonDumper: dump.Facade = json.encode;
