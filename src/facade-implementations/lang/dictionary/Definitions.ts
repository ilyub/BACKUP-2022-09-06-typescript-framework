import { Definition } from "./Definition";
import { assert, is, o, s } from "@skylib/functions";
import type {
  PluralReduce,
  RawDefinition,
  RawDefinitions,
  RawLanguage,
  WordInfo
} from "./core";
import type { lang } from "@skylib/facades";
import type { Rec, WritableIndexedRecord, strings } from "@skylib/functions";

export class Definitions {
  public readonly keys: Rec<lang.Transform, lang.Transform>;

  public readonly pluralReduce: PluralReduce;

  /**
   * Creates class instance.
   *
   * @param raw - Language definition.
   */
  public constructor(raw: RawLanguage) {
    validate(raw);

    const keys: WritableIndexedRecord = {};

    for (const key of o.keys(raw.words)) {
      keys[s.lcFirst(key)] = s.lcFirst(key);
      keys[s.ucFirst(key)] = s.ucFirst(key);
      keys[key.toLowerCase()] = key.toLowerCase();
      keys[key.toUpperCase()] = key.toUpperCase();
    }

    this.keys = keys as typeof this.keys;
    this.pluralReduce = raw.pluralReduce;
    this.wordForms = new Map(o.entries(raw.wordForms));
    this.words = getWords(raw);
  }

  /**
   * Returns word based on context, count, and replacements.
   *
   * @param key - Key.
   * @param context - Context.
   * @param count - Count for plural form.
   * @param replacements - Replacements.
   * @param forms - Candidate word forms.
   * @returns Word.
   */
  public get(
    key: string,
    context: lang.Context | undefined,
    count: number,
    replacements: ReadonlyMap<string, string>,
    forms: strings | string = []
  ): WordInfo {
    if (is.string(forms)) forms = this.wordForms.get(forms) ?? [forms];

    const definition = this.words.get(key);

    assert.not.empty(definition, `Unknown word: ${key}`);

    return definition.get(this, context, count, replacements, forms);
  }

  /**
   * Checks if dictionary has word.
   *
   * @param key - Key.
   * @returns _True_ if dictionary has word, _false_ otherwise.
   */
  public has(key: string): boolean {
    return this.words.has(key);
  }

  protected readonly wordForms: ReadonlyMap<string, strings>;

  protected readonly words: ReadonlyMap<string, Definition>;
}

interface Callback {
  /**
   * Callback.
   *
   * @param str - String.
   * @returns Result.
   */
  (str: string): string;
}

/**
 * Returns words.
 *
 * @param raw - Language definition.
 * @returns Words.
 */
function getWords(raw: RawLanguage): ReadonlyMap<string, Definition> {
  const result = new Map<string, Definition>();

  for (const [key, value] of o.entries(raw.words)) {
    result.set(
      s.lcFirst(key),
      new Definition(
        map(value, x => s.lcFirst(x)),
        s.lcFirst(key)
      )
    );

    result.set(
      s.ucFirst(key),
      new Definition(
        map(value, x => s.ucFirst(x)),
        s.ucFirst(key)
      )
    );

    result.set(
      key.toLowerCase(),
      new Definition(
        map(value, x => x.toLowerCase()),
        key.toLowerCase()
      )
    );

    result.set(
      key.toUpperCase(),
      new Definition(
        map(value, x => x.toUpperCase()),
        key.toUpperCase()
      )
    );
  }

  return result;
}

/**
 * Applies callback to raw definition.
 *
 * @param definition - Raw definition.
 * @param callback - Callback.
 * @returns Raw definition.
 */
function map(definition: RawDefinition, callback: Callback): RawDefinition {
  switch (typeof definition) {
    case "string":
      return callback(definition);

    case "object":
      if (is.array(definition)) {
        const definitions = mapDefinitions(definition[1], callback);

        return definition.length === 3
          ? [definition[0], definitions, definition[2]]
          : [definition[0], definitions];
      }

      return mapDefinitions(definition, callback);
  }
}

/**
 * Applies callback to raw definitions.
 *
 * @param definitions - Raw definitions.
 * @param callback - Callback.
 * @returns Raw definitions.
 */
function mapDefinitions(
  definitions: RawDefinitions,
  callback: Callback
): RawDefinitions {
  return o.map(definitions, definition => map(definition, callback));
}

/**
 * Validates language definition.
 *
 * @param raw - Language definition.
 */
function validate(raw: RawLanguage): void {
  assert.toBeTrue(
    o.every(
      raw.wordForms,
      (forms, key) =>
        key === key.toLowerCase() &&
        forms.every(form => form === form.toLowerCase())
    ),
    "Expecting lowercase word forms"
  );
}
