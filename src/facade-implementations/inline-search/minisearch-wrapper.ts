import { createImplementation, Engine as BaseEngine } from "./core";
import { a } from "@skylib/functions";
import MiniSearch from "minisearch";
import type { inlineSearch } from "@skylib/facades";

export const minisearchWrapper: inlineSearch.Facade = createImplementation(
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
        this.index.search(query).map(result => result.id as unknown)
      );

      return this.items.filter(item => ids.has(item[this.idField]));
    }
  }
);

const buildIndex = <T extends object>(
  idField: string & keyof T,
  fields: ReadonlyArray<string & keyof T>,
  items: readonly T[]
): Index => {
  const result = new MiniSearch({ fields: a.clone(fields), idField });

  result.addAll(a.clone(items));

  return result;
};

type Index = Readonly<MiniSearch>;
