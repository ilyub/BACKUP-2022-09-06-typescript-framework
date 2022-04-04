import type { Context, Transforms, Word } from "@skylib/facades/dist/lang";
import * as assert from "@skylib/functions/dist/assertions";
import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import * as s from "@skylib/functions/dist/string";
import type {
  IndexedObject,
  strings,
  WritableIndexedObject
} from "@skylib/functions/dist/types/core";

import { Definition } from ".";
import type {
  PluralReduce,
  RawDefinition,
  RawDefinitions,
  RawLanguage,
  WordInfo
} from "./types";

export class Definitions {
  public pluralReduce: PluralReduce;

  /**
   * Creates class instance.
   *
   * @param raw - Language definition.
   */
  public constructor(raw: RawLanguage) {
    validate(raw);
    this.pluralReduce = raw.pluralReduce;
    this.wordForms = raw.wordForms;
    this.words = getWords(raw);
  }

  /**
   * Gets word based on context, count, and replacements.
   *
   * @param key - Word ID.
   * @param context - Context.
   * @param forms - Word forms or reference to wordForms.
   * @param count - Count for plural form.
   * @param replacements - Replacements.
   * @returns Word.
   */
  public get(
    key: string,
    context: Context | undefined,
    forms: strings | string,
    count: number,
    replacements: ReadonlyMap<string, string>
  ): WordInfo {
    if (is.string(forms)) {
      const candidate = this.wordForms[forms];

      forms = candidate ? candidate : [forms];
    }

    const definition = this.words[key];

    assert.not.empty(definition, `Unknown word: ${key}`);

    return definition.get(this, context, forms, count, replacements);
  }

  /**
   * Checks that dictionary has word.
   *
   * @param key - Word ID.
   * @returns _True_ if dictionary has word, _false_ otherwise.
   */
  public has(key: string): key is Transforms<Word> {
    return is.not.empty(this.words[key]);
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected wordForms: IndexedObject<strings>;

  protected words: IndexedObject<Definition> = {};
}

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

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
  return o.fromEntries.exhaustive(
    o
      .entries(definitions)
      .map(([key, definition]) => [key, map(definition, callback)])
  );
}

/**
 * Builds word forms.
 *
 * @param raw - Language definition.
 * @returns Word forms.
 */
function getWords(raw: RawLanguage): IndexedObject<Definition> {
  const result: WritableIndexedObject<Definition> = {};

  for (const [key, value] of o.entries(raw.words)) {
    result[s.lcFirst(key)] = new Definition(
      map(value, x => s.lcFirst(x)),
      s.lcFirst(key)
    );

    result[s.ucFirst(key)] = new Definition(
      map(value, x => s.ucFirst(x)),
      s.ucFirst(key)
    );

    result[key.toLowerCase()] = new Definition(
      map(value, x => x.toLowerCase()),
      key.toLowerCase()
    );

    result[key.toUpperCase()] = new Definition(
      map(value, x => x.toUpperCase()),
      key.toUpperCase()
    );
  }

  return result;
}

/**
 * Validates language definition.
 *
 * @param raw - Language definition.
 */
function validate(raw: RawLanguage): void {
  assert.toBeTrue(
    o
      .entries(raw.wordForms)
      .every(
        ([key, forms]) =>
          key === key.toLowerCase() &&
          forms.every(form => form === form.toLowerCase())
      ),
    "Expecting lowercase word forms"
  );
}
