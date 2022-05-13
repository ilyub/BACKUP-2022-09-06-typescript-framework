import { moduleConfig } from "./core";
import {
  assert,
  cast,
  fn,
  wrapProxyHandler,
  reflect,
  s
} from "@skylib/functions";
import type { Definitions } from "./Definitions";
import type { lang } from "@skylib/facades";
import type { LocaleName, NumStr, Rec } from "@skylib/functions";

export class Dictionary implements lang.Dictionary<lang.Context> {
  /**
   * Creates dictionary.
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
    return new Dictionary(definitions, context, count).facade;
  }

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

  public get(key: string): string {
    const definitions = this.definitions[moduleConfig.localeName];

    return definitions.get(key, this._context, this.count, replacements).value;
  }

  public has(key: string): boolean {
    const definitions = this.definitions[moduleConfig.localeName];

    return definitions.has(key);
  }

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
    this._context = context;

    this.count = count;

    this.definitions = definitions;

    this.facade = fn.run(() => {
      const handler = wrapProxyHandler<Dictionary>("Dictionary", "doDefault", {
        get: (target, key) => {
          assert.string(key);

          return target.has(key) ? target.get(key) : reflect.get(target, key);
        }
      });

      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
      return new Proxy(this, handler) as unknown as lang.Facade;
    });
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

const replacements = new Map<string, string>();
