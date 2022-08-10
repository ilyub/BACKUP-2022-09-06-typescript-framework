import type { LocaleName, NumStr, Rec } from "@skylib/functions";
import {
  ProxyHandlerAction,
  a,
  assert,
  cast,
  evaluate,
  o,
  s,
  wrapProxyHandler
} from "@skylib/functions";
import type { Definitions } from "./Definitions";
import type { lang } from "@skylib/facades";
import { moduleConfig } from "./core";

export class Dictionary implements lang.Dictionary<lang.Word, lang.Context> {
  /**
   * Creates dictionary.
   *
   * @param definitions - Language definitions.
   * @param context - Context.
   * @param count - Count for plural form.
   * @returns Dictionary.
   */
  public static readonly create = (
    definitions: Rec<LocaleName, Definitions>,
    context?: lang.Context,
    count?: number
  ): lang.Facade => new Dictionary(definitions, context, count).facade;

  public readonly keys: Rec<lang.Transforms, lang.Transforms>;

  public context(context: lang.Context): lang.Facade {
    if (context === this._context) return this.facade;

    let sub = this.subs.get(context);

    if (sub) {
      // Already exists
    } else {
      sub = Dictionary.create(this.definitions, context, this.count);
      this.subs.set(context, sub);
    }

    return sub;
  }

  public get(key: lang.Key): string {
    if (key.startsWith("plain:")) return key.slice(6);

    const definitions = this.definitions[moduleConfig.localeName];

    return definitions.get(key, this._context, this.count, replacements).value;
  }

  public getIfExists(key: string): string {
    if (key.startsWith("plain:")) return key.slice(6);

    const definitions = this.definitions[moduleConfig.localeName];

    return definitions.has(key)
      ? definitions.get(key, this._context, this.count, replacements).value
      : key;
  }

  public has(key: string): key is lang.Key {
    if (key.startsWith("plain:")) return true;

    const definitions = this.definitions[moduleConfig.localeName];

    return definitions.has(key);
  }

  // eslint-disable-next-line @skylib/require-jsdoc -- Ok
  public readonly plain = (str: string): lang.Plain => `plain:${str}`;

  public plural(count: number): lang.Facade {
    count = this.pluralReduce(count);

    if (count === this.count) return this.facade;

    let sub = this.subs.get(count);

    if (sub) {
      // Already exists
    } else {
      sub = Dictionary.create(this.definitions, this._context, count);
      this.subs.set(count, sub);
    }

    return sub;
  }

  public with(search: string, replace: NumStr): lang.Facade {
    switch (typeof replace) {
      case "number":
        replacements.set(search.toUpperCase(), cast.string(replace));
        replacements.set(search.toLowerCase(), cast.string(replace));
        replacements.set(s.ucFirst(search), cast.string(replace));
        replacements.set(s.lcFirst(search), cast.string(replace));

        break;

      case "string":
        replacements.set(search.toUpperCase(), replace.toUpperCase());
        replacements.set(search.toLowerCase(), replace.toLowerCase());
        replacements.set(s.ucFirst(search), s.ucFirst(replace));
        replacements.set(s.lcFirst(search), s.lcFirst(replace));
    }

    return this.facade;
  }

  protected readonly _context: lang.Context | undefined;

  protected readonly count: number;

  protected readonly definitions: Rec<LocaleName, Definitions>;

  protected readonly facade: lang.Facade;

  // eslint-disable-next-line @skylib/functions/prefer-ReadonlyMap -- Ok
  protected readonly subs = new Map<NumStr, lang.Facade>();

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
    const facade = evaluate((): lang.Facade => {
      const handler = wrapProxyHandler<Dictionary>(
        "Dictionary",
        ProxyHandlerAction.doDefault,
        {
          get: (target, key) => {
            assert.string(key, "Expecting string key");

            return target.has(key) ? target.get(key) : o.get(target, key);
          }
        }
      );

      return new Proxy(this, handler) as unknown as lang.Facade;
    });

    this._context = context;
    this.count = count;
    this.definitions = definitions;
    this.facade = facade;
    this.keys = a.first(o.values(definitions)).keys;
  }

  /**
   * Reduces count for plural form.
   *
   * @param count - Count.
   * @returns Reduced count.
   */
  protected pluralReduce(count: number): number {
    const definitions = this.definitions[moduleConfig.localeName];

    return definitions.pluralReduce(count);
  }
}

// eslint-disable-next-line @skylib/functions/prefer-ReadonlyMap -- Ok
const replacements = new Map<string, string>();
