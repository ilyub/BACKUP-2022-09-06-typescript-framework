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
   */
  public constructor(
    idField: string & keyof T,
    fields: ReadonlyArray<string & keyof T>,
    items: readonly T[]
  ) {
    this.idField = idField;
    this.index = this.buildIndex(idField, fields, items);
    this.items = items;
  }

  public abstract search(query: string): readonly T[];

  protected readonly idField: string & keyof T;

  protected readonly index: I;

  protected readonly items: readonly T[];

  /**
   * Builds index.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   * @returns Index.
   */
  protected abstract buildIndex(
    idField: string & keyof T,
    fields: ReadonlyArray<string & keyof T>,
    items: readonly T[]
  ): I;
}
