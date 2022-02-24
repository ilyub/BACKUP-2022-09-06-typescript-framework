import MiniSearch from "minisearch";

import type { Facade } from "@skylib/facades/dist/inlineSearch";
import * as a from "@skylib/functions/dist/array";

import { createImplementation, Engine as BaseEngine } from "./api/template";

export class Engine<T extends object> extends BaseEngine<
  T,
  Readonly<MiniSearch>
> {
  public search(query: string): readonly T[] {
    const ids = new Set(
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      this.index.search(query).map(result => result.id as unknown)
    );

    return this.items.filter(item => ids.has(item[this.idField]));
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected buildIndex(
    idField: string & keyof T,
    fields: ReadonlyArray<string & keyof T>,
    items: readonly T[]
  ): Readonly<MiniSearch> {
    const result = new MiniSearch({ fields: a.clone(fields), idField });

    result.addAll(a.clone(items));

    return result;
  }
}

export const implementation: Facade = createImplementation(Engine);
