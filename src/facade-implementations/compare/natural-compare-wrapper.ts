import type { compare } from "@skylib/facades";
import { defineFn } from "@skylib/functions";
import naturalCompare from "natural-compare";

export const naturalCompareWrapper: compare.Facade = defineFn(
  (x: unknown, y: unknown) => Math.sign((x as number) - (y as number)),
  { strings: naturalCompare }
);
