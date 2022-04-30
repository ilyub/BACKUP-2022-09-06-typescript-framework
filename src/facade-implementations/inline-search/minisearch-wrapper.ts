import { createImplementation, Engine as BaseEngine } from "./api";
import { a, fn } from "@skylib/functions";
import MiniSearch from "minisearch";
import type { inlineSearch } from "@skylib/facades";

export const minisearchWrapper: inlineSearch.Facade = createImplementation(
  fn.run(() => {
    return class Engine<T extends object> extends BaseEngine<T, Index> {
      public search(query: string): readonly T[] {
        const ids = new Set(
          this.index.search(query).map(result => result.id as unknown)
        );

        return this.items.filter(item => ids.has(item[this.idField]));
      }

      protected buildIndex(
        idField: string & keyof T,
        fields: ReadonlyArray<string & keyof T>,
        items: readonly T[]
      ): Index {
        const result = new MiniSearch({ fields: a.clone(fields), idField });

        result.addAll(a.clone(items));

        return result;
      }
    };

    type Index = Readonly<MiniSearch>;
  })
);
