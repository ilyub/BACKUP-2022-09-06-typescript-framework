import { defineFn } from "@skylib/functions";
import naturalCompare from "natural-compare";
import type { compare } from "@skylib/facades";

export const naturalCompareWrapper: compare.Facade = defineFn(
  // eslint-disable-next-line @skylib/require-jsdoc, no-type-assertion/no-type-assertion -- Ok
  (x: unknown, y: unknown) => Math.sign((x as number) - (y as number)),
  { strings: naturalCompare }
);
