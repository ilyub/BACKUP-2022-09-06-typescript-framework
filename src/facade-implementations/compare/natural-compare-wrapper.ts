import { defineFn } from "@skylib/functions";
import naturalCompare from "natural-compare";
import type { compare } from "@skylib/facades";

export const naturalCompareWrapper: compare.Facade = defineFn(
  (x: unknown, y: unknown) => Math.sign((x as number) - (y as number)),
  { strings: naturalCompare }
);
