import type { Facade } from "@skylib/facades/dist/inlineSearch";
import * as a from "@skylib/functions/dist/array";
import * as fn from "@skylib/functions/dist/function";
import MiniSearch from "minisearch";
import { createImplementation, Engine as BaseEngine } from "./api";

export const implementation: Facade = createImplementation(
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
