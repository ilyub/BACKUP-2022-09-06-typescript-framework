import lunr from "lunr";

import type { Facade } from "@skylib/facades/dist/inlineSearch";

import { createImplementation, Engine as BaseEngine } from "./api/template";

export class Engine<T extends object> extends BaseEngine<T, lunr.Index> {
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

  protected buildIndex(
    idField: keyof T & string,
    fields: ReadonlyArray<keyof T & string>,
    items: readonly T[]
  ): lunr.Index {
    return lunr(configFunction);

    function configFunction(builder: lunr.Builder): void {
      builder.ref(idField);

      for (const field of fields) builder.field(field);

      for (const item of items) builder.add(item);
    }
  }
}

export const implementation: Facade = createImplementation(Engine);
