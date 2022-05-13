import { createImplementation, Engine as BaseEngine } from "./core";
import lunr from "lunr";
import type { inlineSearch } from "@skylib/facades";

export const lunrWrapper: inlineSearch.Facade = createImplementation(
  class Engine<T extends object> extends BaseEngine<T, Index> {
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
      super(idField, fields, items, buildIndex);
    }

    public search(query: string): readonly T[] {
      const ids = new Set(
        this.index.search(query).map(result => result.ref as unknown)
      );

      return this.items.filter(item => ids.has(item[this.idField]));
    }
  }
);

const buildIndex = <T extends object>(
  idField: string & keyof T,
  fields: ReadonlyArray<string & keyof T>,
  items: readonly T[]
): Index =>
  lunr((builder): void => {
    builder.ref(idField);

    for (const field of fields) builder.field(field);

    for (const item of items) builder.add(item);
  });

type Index = lunr.Index;
