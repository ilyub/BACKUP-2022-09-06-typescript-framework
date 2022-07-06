"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definitions = void 0;
const Definition_1 = require("./Definition");
const functions_1 = require("@skylib/functions");
class Definitions {
    /**
     * Creates class instance.
     *
     * @param raw - Language definition.
     */
    constructor(raw) {
        Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
            value: void 0
        });
        validate(raw);
        const keys = {};
        for (const key of functions_1.o.keys(raw.words)) {
            keys[functions_1.s.lcFirst(key)] = functions_1.s.lcFirst(key);
            keys[functions_1.s.ucFirst(key)] = functions_1.s.ucFirst(key);
            keys[key.toLowerCase()] = key.toLowerCase();
            keys[key.toUpperCase()] = key.toUpperCase();
        }
        this.keys = keys;
        this.pluralReduce = raw.pluralReduce;
        this.wordForms = new Map(functions_1.o.entries(raw.wordForms));
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
    get(key, context, count, replacements, forms = []) {
        var _a;
        if (functions_1.is.string(forms))
            forms = (_a = this.wordForms.get(forms)) !== null && _a !== void 0 ? _a : [forms];
        const definition = this.words.get(key);
        functions_1.assert.not.empty(definition, `Unknown word: ${key}`);
        return definition.get(this, context, count, replacements, forms);
    }
    /**
     * Checks if dictionary has word.
     *
     * @param key - Key.
     * @returns _True_ if dictionary has word, _false_ otherwise.
     */
    has(key) {
        return this.words.has(key);
    }
}
exports.Definitions = Definitions;
/**
 * Returns words.
 *
 * @param raw - Language definition.
 * @returns Words.
 */
function getWords(raw) {
    const result = new Map();
    for (const [key, value] of functions_1.o.entries(raw.words)) {
        result.set(functions_1.s.lcFirst(key), new Definition_1.Definition(map(value, x => functions_1.s.lcFirst(x)), functions_1.s.lcFirst(key)));
        result.set(functions_1.s.ucFirst(key), new Definition_1.Definition(map(value, x => functions_1.s.ucFirst(x)), functions_1.s.ucFirst(key)));
        result.set(key.toLowerCase(), new Definition_1.Definition(map(value, x => x.toLowerCase()), key.toLowerCase()));
        result.set(key.toUpperCase(), new Definition_1.Definition(map(value, x => x.toUpperCase()), key.toUpperCase()));
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
    return functions_1.o.map(definitions, definition => map(definition, callback));
}
/**
 * Validates language definition.
 *
 * @param raw - Language definition.
 */
function validate(raw) {
    functions_1.assert.toBeTrue(functions_1.o.every(raw.wordForms, (forms, key) => key === key.toLowerCase() &&
        forms.every(form => form === form.toLowerCase())), "Expecting lowercase word forms");
}
//# sourceMappingURL=Definitions.js.map