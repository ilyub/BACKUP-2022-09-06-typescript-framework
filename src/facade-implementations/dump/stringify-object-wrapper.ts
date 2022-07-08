import type { dump } from "@skylib/facades";
import stringifyObject from "stringify-object";

export const stringifyObjectWrapper: dump.Facade = value =>
  stringifyObject(value, { indent: "  " });
