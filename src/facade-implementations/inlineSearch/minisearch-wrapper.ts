import MiniSearch from "minisearch";

import type {
  Engine as EngineInterface,
  Facade
} from "@skylib/facades/dist/inlineSearch";
import * as a from "@skylib/functions/dist/array";

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
    this.index = new MiniSearch({ fields: a.clone(fields), idField });
    this.index.addAll(a.clone(items));
  }

  public search(query: string): readonly T[] {
    const ids = new Set(
      this.index.search(query).map(result => result.id as unknown)
    );

    return this.items.filter(item => ids.has(item[this.idField]));
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected idField: keyof T & string;

  protected index: Readonly<MiniSearch>;

  protected items: readonly T[];
}
