import type { compare } from "@skylib/facades";
import { o } from "@skylib/functions";
import naturalCompare from "natural-compare";

export const implementation: compare.Facade = o.extend(
  (x: unknown, y: unknown): number => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    if ((x as number) > (y as number)) return 1;

    // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
    if ((x as number) < (y as number)) return -1;

    return 0;
  },
  { strings: naturalCompare }
);
