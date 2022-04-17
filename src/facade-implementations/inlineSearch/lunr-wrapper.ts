import type { inlineSearch } from "@skylib/facades";
import { fn } from "@skylib/functions";
import lunr from "lunr";
import { createImplementation, Engine as BaseEngine } from "./api";

export const implementation: inlineSearch.Facade = createImplementation(
  fn.run(
    () =>
      class Engine<T extends object> extends BaseEngine<T, lunr.Index> {
        public search(query: string): readonly T[] {
          const refs = new Set<unknown>(
            this.index.search(query).map(result => result.ref)
          );

          return this.items.filter(item => refs.has(item[this.idField]));
        }

        protected buildIndex(
          idField: string & keyof T,
          fields: ReadonlyArray<string & keyof T>,
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
  )
);
