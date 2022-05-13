import type { Constructor } from "./types";
import type { inlineSearch } from "@skylib/facades";

/**
 * Creates inline search facade implementation.
 *
 * @param ctor - Inline search constructor.
 * @returns Inline search facade implementation.
 */
export function createImplementation(ctor: Constructor): inlineSearch.Facade {
  return {
    create: <T extends object>(
      idField: string & keyof T,
      fields: ReadonlyArray<string & keyof T>,
      items: readonly T[]
    ) => new ctor<T>(idField, fields, items)
  };
}
