import { o } from "@skylib/functions";

export { Definitions } from "./Definitions";

export { Dictionary } from "./Dictionary";

/**
 * Plural reduction function.
 *
 * @param count - Count.
 * @returns Reduced count.
 */
export const pluralReduce = o.extend(
  (count: number): number => {
    count = Math.abs(count);

    return count === 1 ? 1 : 2;
  },
  {
    /**
     * Plural reduction function for Russian language.
     *
     * @param this - No this.
     * @param count - Count.
     * @returns Reduced count.
     */
    ru(this: void, count: number): number {
      count = Math.abs(count);

      if (count >= 10 && count <= 19) return 5;

      if (count % 10 === 1) return 1;

      if (count % 10 === 2) return 2;

      if (count % 10 === 3) return 2;

      if (count % 10 === 4) return 2;

      return 5;
    }
  }
);
