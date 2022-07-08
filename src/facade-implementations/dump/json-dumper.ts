import type { dump } from "@skylib/facades";
import { json } from "@skylib/functions";

export const jsonDumper: dump.Facade = json.encode;
