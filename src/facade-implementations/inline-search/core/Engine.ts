import type { BuildIndex } from "./types";
import type { inlineSearch } from "@skylib/facades";

export abstract class Engine<T extends object, I>
  implements inlineSearch.Engine<T>
{
  /**
   * Creates class instance.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   * @param buildIndex - Index builder.
   */
  public constructor(
    idField: string & keyof T,
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/facades update
    // fixme
    // eslint-disable-next-line @skylib/typescript/prefer-array-type-alias -- Ok
    fields: ReadonlyArray<string & keyof T>,
    items: readonly T[],
    buildIndex: BuildIndex<T, I>
  ) {
    this.idField = idField;
    this.index = buildIndex(idField, fields, items);
    this.items = items;
  }

  public abstract search(query: string): readonly T[];

  protected readonly idField: string & keyof T;

  protected readonly index: I;

  protected readonly items: readonly T[];
}
