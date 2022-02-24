import type {
  Context,
  Dictionary as DictionaryInterface,
  Facade,
  Transforms,
  Word
} from "@skylib/facades/dist/lang";
import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";
import * as assert from "@skylib/functions/dist/assertions";
import * as cast from "@skylib/functions/dist/converters";
import * as fn from "@skylib/functions/dist/function";
import { onDemand, wrapProxyHandler } from "@skylib/functions/dist/helpers";
import * as o from "@skylib/functions/dist/object";
import * as reflect from "@skylib/functions/dist/reflect";
import * as s from "@skylib/functions/dist/string";
import type { NumStr, ReadonlyRecord } from "@skylib/functions/dist/types/core";
import type { LocaleName } from "@skylib/functions/dist/types/locales";

import type { Definitions } from ".";

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace Dictionary {
  export interface Configuration {
    readonly localeName: LocaleName;
  }

  export type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
  };
}

// eslint-disable-next-line import/export
export class Dictionary implements DictionaryInterface {
  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  public static configure<K extends keyof Dictionary.Configuration>(
    config: Dictionary.PartialConfiguration<K>
  ): void {
    o.assign(moduleConfig, config);
  }

  /**
   * Creates class instance.
   *
   * @param definitions - Language definitions.
   * @param context - Context.
   * @param count - Count for plural form.
   * @returns Dictionary.
   */
  public static create(
    definitions: ReadonlyRecord<LocaleName, Definitions>,
    context?: Context,
    count?: number
  ): Facade {
    return new Dictionary(definitions, context, count).proxified;
  }

  /**
   * Returns plugin configuration.
   *
   * @returns Plugin configuration.
   */
  public static getConfiguration(): Dictionary.Configuration {
    return o.clone(moduleConfig);
  }

  public context(context: Context): Facade {
    if (context === this._context) return this.proxified;

    let sub = this.subsPool.get(context);

    if (sub) {
      // Already exists
    } else {
      sub = Dictionary.create(this.definitions, context, this.count);
      this.subsPool.set(context, sub);
    }

    return sub;
  }

  public get(key: string): string {
    const definitions = this.definitions[moduleConfig.localeName];

    assert.not.empty(
      definitions,
      `Missing dictionary for locale: ${moduleConfig.localeName}`
    );

    return definitions.get(key, this._context, [], this.count, replacementsPool)
      .value;
  }

  public has(key: string): key is Transforms<Word> {
    const definitions = this.definitions[moduleConfig.localeName];

    assert.not.empty(
      definitions,
      `Missing dictionary for locale: ${moduleConfig.localeName}`
    );

    return definitions.has(key);
  }

  public plural(count: number): Facade {
    count = this.pluralReduce(count);

    if (count === this.count) return this.proxified;

    let sub = this.subsPool.get(count);

    if (sub) {
      // Already exists
    } else {
      sub = Dictionary.create(this.definitions, this._context, count);
      this.subsPool.set(count, sub);
    }

    return sub;
  }

  public with(search: string, replace: NumStr): Facade {
    switch (typeof replace) {
      case "number":
        replacementsPool.set(search.toUpperCase(), cast.string(replace));
        replacementsPool.set(search.toLowerCase(), cast.string(replace));
        replacementsPool.set(s.ucFirst(search), cast.string(replace));
        replacementsPool.set(s.lcFirst(search), cast.string(replace));

        return this.proxified;

      case "string":
        replacementsPool.set(search.toUpperCase(), replace.toUpperCase());
        replacementsPool.set(search.toLowerCase(), replace.toLowerCase());
        replacementsPool.set(s.ucFirst(search), s.ucFirst(replace));
        replacementsPool.set(s.lcFirst(search), s.lcFirst(replace));

        return this.proxified;
    }
  }

  protected _context: Context | undefined;

  protected count: number;

  protected definitions: ReadonlyRecord<LocaleName, Definitions>;

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected proxified: Facade;

  protected subsPool = new Map<NumStr, Facade>();

  /**
   * Creates class instance.
   *
   * @param definitions - Language definitions.
   * @param context - Context.
   * @param count - Count for plural form.
   */
  protected constructor(
    definitions: ReadonlyRecord<LocaleName, Definitions>,
    context?: Context,
    count = 1
  ) {
    this._context = context;

    this.count = count;

    this.definitions = definitions;

    this.proxified = fn.run(() => {
      const handler = wrapProxyHandler<Dictionary>("Dictionary", "throw", {
        get(target, key) {
          assert.string(key, "Expecting string key");

          return target.has(key) ? target.get(key) : reflect.get(target, key);
        },
        getOwnPropertyDescriptor(target, key) {
          return Object.getOwnPropertyDescriptor(target, key);
        }
      });

      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return new Proxy(this, handler) as unknown as Facade;
    });
  }

  /**
   * Reduces count for plural word form.
   *
   * @param count - Count.
   * @returns Reduced count.
   */
  protected pluralReduce(count: number): number {
    const definitions = this.definitions[moduleConfig.localeName];

    assert.not.empty(
      definitions,
      `Missing dictionary for locale: ${moduleConfig.localeName}`
    );

    return definitions.pluralReduce(count);
  }
}

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

const moduleConfig = onDemand(() =>
  reactiveStorage<Dictionary.Configuration>({
    localeName: "en-US"
  })
);

const replacementsPool = new Map<string, string>();
