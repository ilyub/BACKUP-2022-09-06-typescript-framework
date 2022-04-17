import type { lang } from "@skylib/facades";
import { reactiveStorage } from "@skylib/facades";
import {
  assert,
  cast,
  fn,
  onDemand,
  wrapProxyHandler,
  o,
  reflect,
  s
} from "@skylib/functions";
import type { LocaleName, NumStr, Rec } from "@skylib/functions";
import type { Definitions } from "./Definitions";

export class Dictionary implements lang.Dictionary<lang.Context> {
  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  public static configure(config: Partial<Dictionary.Configuration>): void {
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
    definitions: Rec<LocaleName, Definitions>,
    context?: lang.Context,
    count?: number
  ): lang.Facade {
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

  public context(context: lang.Context): lang.Facade {
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

  public has(key: string): boolean {
    const definitions = this.definitions[moduleConfig.localeName];

    assert.not.empty(
      definitions,
      `Missing dictionary for locale: ${moduleConfig.localeName}`
    );

    return definitions.has(key);
  }

  public plural(count: number): lang.Facade {
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

  public with(search: string, replace: NumStr): lang.Facade {
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

  protected readonly _context: lang.Context | undefined;

  protected readonly count: number;

  protected readonly definitions: Rec<LocaleName, Definitions>;

  protected readonly proxified: lang.Facade;

  protected readonly subsPool = new Map<NumStr, lang.Facade>();

  /**
   * Creates class instance.
   *
   * @param definitions - Language definitions.
   * @param context - Context.
   * @param count - Count for plural form.
   */
  protected constructor(
    definitions: Rec<LocaleName, Definitions>,
    context?: lang.Context,
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

      // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
      return new Proxy(this, handler) as unknown as lang.Facade;
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

export namespace Dictionary {
  export interface Configuration {
    readonly localeName: LocaleName;
  }
}

const moduleConfig = onDemand(() =>
  reactiveStorage<Dictionary.Configuration>({ localeName: "en-US" })
);

const replacementsPool = new Map<string, string>();
