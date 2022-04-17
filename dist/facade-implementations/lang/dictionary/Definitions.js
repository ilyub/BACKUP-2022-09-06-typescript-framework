"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definitions = void 0;
const functions_1 = require("@skylib/functions");
const Definition_1 = require("./Definition");
class Definitions {
    /**
     * Creates class instance.
     *
     * @param raw - Language definition.
     */
    constructor(raw) {
        Object.defineProperty(this, "pluralReduce", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "wordForms", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "words", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
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
    get(key, context, forms, count, replacements) {
        if (functions_1.is.string(forms)) {
            const candidate = this.wordForms[forms];
            forms = candidate ? candidate : [forms];
        }
        const definition = this.words[key];
        functions_1.assert.not.empty(definition, `Unknown word: ${key}`);
        return definition.get(this, context, forms, count, replacements);
    }
    /**
     * Checks that dictionary has word.
     *
     * @param key - Word ID.
     * @returns _True_ if dictionary has word, _false_ otherwise.
     */
    has(key) {
        return functions_1.is.not.empty(this.words[key]);
    }
}
exports.Definitions = Definitions;
/**
 * Builds word forms.
 *
 * @param raw - Language definition.
 * @returns Word forms.
 */
function getWords(raw) {
    // eslint-disable-next-line @skylib/no-mutable-signature -- ???
    const result = {};
    for (const [key, value] of functions_1.o.entries(raw.words)) {
        result[functions_1.s.lcFirst(key)] = new Definition_1.Definition(map(value, x => functions_1.s.lcFirst(x)), functions_1.s.lcFirst(key));
        result[functions_1.s.ucFirst(key)] = new Definition_1.Definition(map(value, x => functions_1.s.ucFirst(x)), functions_1.s.ucFirst(key));
        result[key.toLowerCase()] = new Definition_1.Definition(map(value, x => x.toLowerCase()), key.toLowerCase());
        result[key.toUpperCase()] = new Definition_1.Definition(map(value, x => x.toUpperCase()), key.toUpperCase());
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
function map(definition, callback) {
    switch (typeof definition) {
        case "string":
            return callback(definition);
        case "object":
            if (functions_1.is.array(definition)) {
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
function mapDefinitions(definitions, callback) {
    return functions_1.o.fromEntries.exhaustive(functions_1.o
        .entries(definitions)
        .map(([key, definition]) => [key, map(definition, callback)]));
}
/**
 * Validates language definition.
 *
 * @param raw - Language definition.
 */
function validate(raw) {
    functions_1.assert.toBeTrue(functions_1.o
        .entries(raw.wordForms)
        .every(([key, forms]) => key === key.toLowerCase() &&
        forms.every(form => form === form.toLowerCase())), "Expecting lowercase word forms");
}
//# sourceMappingURL=Definitions.js.map