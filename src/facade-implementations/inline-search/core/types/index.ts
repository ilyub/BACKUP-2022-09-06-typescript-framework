import type { inlineSearch } from "@skylib/facades";

export interface BuildIndex<T extends object, I> {
  /**
   *Builds index.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   */
  (
    idField: string & keyof T,
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/facades update
    // fixme
    // eslint-disable-next-line @skylib/typescript/prefer-array-type-alias -- Ok
    fields: ReadonlyArray<string & keyof T>,
    items: readonly T[]
  ): I;
}

export interface Constructor {
  /**
   * Creates class instance.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   */
  new <T extends object>(
    idField: string & keyof T,
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/facades update
    // fixme
    // eslint-disable-next-line @skylib/typescript/prefer-array-type-alias -- Ok
    fields: ReadonlyArray<string & keyof T>,
    items: readonly T[]
  ): inlineSearch.Engine<T>;
}
