import type {
  Engine as EngineInterface,
  Facade
} from "@skylib/facades/dist/inlineSearch";

export { Engine } from "./Engine";

export type Constructor = new <T extends object>(
  idField: string & keyof T,
  fields: ReadonlyArray<string & keyof T>,
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
      idField: string & keyof T,
      fields: ReadonlyArray<string & keyof T>,
      items: readonly T[]
    ): EngineInterface<T> {
      return new ctor<T>(idField, fields, items);
    }
  };
}
