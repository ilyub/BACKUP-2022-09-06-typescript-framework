import { createImplementation, Engine as BaseEngine } from "./api";
import { fn } from "@skylib/functions";
import lunr from "lunr";
import type { inlineSearch } from "@skylib/facades";

export const lunrWrapper: inlineSearch.Facade = createImplementation(
  fn.run(() => {
    return class Engine<T extends object> extends BaseEngine<T, Index> {
      public search(query: string): readonly T[] {
        const ids = new Set(
          this.index.search(query).map(result => result.ref as unknown)
        );

        return this.items.filter(item => ids.has(item[this.idField]));
      }

      protected buildIndex(
        idField: string & keyof T,
        fields: ReadonlyArray<string & keyof T>,
        items: readonly T[]
      ): Index {
        return lunr((builder): void => {
          builder.ref(idField);

          for (const field of fields) builder.field(field);

          for (const item of items) builder.add(item);
        });
      }
    };

    type Index = lunr.Index;
  })
);
