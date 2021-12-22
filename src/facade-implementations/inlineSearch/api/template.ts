import type {
  Engine as EngineInterface,
  Facade
} from "@skylib/facades/dist/inlineSearch";

export type Constructor = new <T extends object>(
  idField: keyof T & string,
  fields: ReadonlyArray<keyof T & string>,
  items: readonly T[]
) => EngineInterface<T>;

/**
 * Creates search engine.
 *
 * @param ctor - Search engine constructor.
 * @returns Search engine.
 */
export function createImplementation(ctor: Constructor): Facade {
  return {
    create<T extends object>(
      idField: keyof T & string,
      fields: ReadonlyArray<keyof T & string>,
      items: readonly T[]
    ): EngineInterface<T> {
      return new ctor<T>(idField, fields, items);
    }
  };
}

export abstract class Engine<T extends object, I>
  implements EngineInterface<T>
{
  /**
   * Creates class instance.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   */
  public constructor(
    idField: keyof T & string,
    fields: ReadonlyArray<keyof T & string>,
    items: readonly T[]
  ) {
    this.idField = idField;
    this.items = items;
    this.index = this.buildIndex(idField, fields, items);
  }

  public abstract search(query: string): readonly T[];

  protected idField: keyof T & string;

  protected index: I;

  protected items: readonly T[];

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  /**
   * Builds index.
   *
   * @param idField - ID field.
   * @param fields - Searchable fields.
   * @param items - Items.
   * @returns Index.
   */
  protected abstract buildIndex(
    idField: keyof T & string,
    fields: ReadonlyArray<keyof T & string>,
    items: readonly T[]
  ): I;
}
