import stringifyObject from "stringify-object";
import type { dump } from "@skylib/facades";

export const stringifyObjectWrapper: dump.Facade = value =>
  stringifyObject(value, { indent: "  " });
