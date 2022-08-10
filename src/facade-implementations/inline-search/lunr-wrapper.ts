import { Engine as BaseEngine, createImplementation } from "./core";
import { ReadonlySet } from "@skylib/functions";
import type { inlineSearch } from "@skylib/facades";
import lunr from "lunr";

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
      // eslint-disable-next-line no-warning-comments -- Wait for @skylib/facades update
      // fixme
      // eslint-disable-next-line @skylib/typescript/prefer-array-type-alias -- Ok
      fields: ReadonlyArray<string & keyof T>,
      items: readonly T[]
    ) {
      super(idField, fields, items, buildIndex);
    }

    public search(query: string): readonly T[] {
      const ids = new ReadonlySet(
        this.index.search(query).map(result => result.ref as unknown)
      );

      return this.items.filter(item => ids.has(item[this.idField]));
    }
  }
);

const buildIndex = <T extends object>(
  idField: string & keyof T,
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/facades update
  // fixme
  // eslint-disable-next-line @skylib/typescript/prefer-array-type-alias -- Ok
  fields: ReadonlyArray<string & keyof T>,
  items: readonly T[]
): Index =>
  lunr((builder): void => {
    builder.ref(idField);

    for (const field of fields) builder.field(field);

    for (const item of items) builder.add(item);
  });

type Index = lunr.Index;
