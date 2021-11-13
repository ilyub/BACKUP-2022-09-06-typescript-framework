import MiniSearch from "minisearch";

import type {
  Engine as EngineInterface,
  Facade
} from "@skylib/facades/dist/inlineSearch";
import * as a from "@skylib/functions/dist/array";

export const implementation: Facade = {
  create<T extends object>(
    idField: string,
    fields: readonly string[],
    items: readonly T[]
  ): Engine<T> {
    return new Engine(idField, fields, items);
  }
};

export class Engine<T extends object> implements EngineInterface {
  /**
   * Creates class instance.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   */
  public constructor(
    idField: string,
    fields: readonly string[],
    items: readonly T[]
  ) {
    this.minisearch = new MiniSearch({ fields: a.clone(fields), idField });
    this.minisearch.addAll(a.clone(items));
  }

  public search(query: string): readonly unknown[] {
    return this.minisearch.search(query).map(result => result.id as unknown);
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected minisearch: Readonly<MiniSearch>;
}
