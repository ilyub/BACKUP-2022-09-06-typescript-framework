import type { inlineSearch } from "@skylib/facades";
import { a, fn } from "@skylib/functions";
import MiniSearch from "minisearch";
import { createImplementation, Engine as BaseEngine } from "./api";

export const implementation: inlineSearch.Facade = createImplementation(
  fn.run(
    () =>
      class Engine<T extends object> extends BaseEngine<
        T,
        Readonly<MiniSearch>
      > {
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
        ): Readonly<MiniSearch> {
          const result = new MiniSearch({ fields: a.clone(fields), idField });

          result.addAll(a.clone(items));

          return result;
        }
      }
  )
);
