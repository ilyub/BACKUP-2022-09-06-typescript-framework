import type { inlineSearch } from "@skylib/facades";

export { Engine } from "./Engine";

export type Constructor = new <T extends object>(
  idField: string & keyof T,
  fields: ReadonlyArray<string & keyof T>,
  items: readonly T[]
) => inlineSearch.Engine<T>;

/**
 * Creates inline search facade implementation.
 *
 * @param ctor - Inline search constructor.
 * @returns Inline search facade implementation.
 */
export function createImplementation(ctor: Constructor): inlineSearch.Facade {
  return {
    create<T extends object>(
      idField: string & keyof T,
      fields: ReadonlyArray<string & keyof T>,
      items: readonly T[]
    ): inlineSearch.Engine<T> {
      return new ctor<T>(idField, fields, items);
    }
  };
}
