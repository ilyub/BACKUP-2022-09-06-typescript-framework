import lunr from "lunr";

import type {
  Engine as EngineInterface,
  Facade
} from "@skylib/facades/dist/inlineSearch";

export const implementation: Facade = {
  create<T extends object>(
    idField: keyof T & string,
    fields: ReadonlyArray<keyof T & string>,
    items: readonly T[]
  ): Engine<T> {
    return new Engine(idField, fields, items);
  }
};

export class Engine<T extends object> implements EngineInterface<T> {
  /**
   * Creates class instance.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   */
  public constructor(
    idField: keyof T & string,
    fields: ReadonlyArray<keyof T & string>,
    items: readonly T[]
  ) {
    this.idField = idField;
    this.items = items;
    this.index = lunr(configFunction);

    function configFunction(builder: lunr.Builder): void {
      builder.ref(idField);

      for (const field of fields) builder.field(field);

      for (const item of items) builder.add(item);
    }
  }

  public search(query: string): readonly T[] {
    const refs = new Set<unknown>(
      this.index.search(query).map(result => result.ref)
    );

    return this.items.filter(item => refs.has(item[this.idField]));
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected idField: keyof T & string;

  protected index: lunr.Index;

  protected items: readonly T[];
}
