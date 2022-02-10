import naturalCompare from "natural-compare";

import type { Facade } from "@skylib/facades/dist/compare";
import * as fn from "@skylib/functions/dist/function";

export const implementation = fn.run<Facade>(() => {
  function compare(x: unknown, y: unknown): number {
    if ((x as number) > (y as number)) return 1;

    if ((x as number) < (y as number)) return -1;

    return 0;
  }

  compare.strings = naturalCompare;

  return compare;
});
