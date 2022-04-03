"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definitions = void 0;
const tslib_1 = require("tslib");
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const s = tslib_1.__importStar(require("@skylib/functions/dist/string"));
const _1 = require(".");
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
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
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
    has(key) {
        return is.not.empty(this.words[key]);
    }
}
exports.Definitions = Definitions;
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
function mapDefinitions(definitions, callback) {
    return o.fromEntries.exhaustive(o
        .entries(definitions)
        .map(([key, definition]) => [key, map(definition, callback)]));
}
/**
 * Builds word forms.
 *
 * @param raw - Language definition.
 * @returns Word forms.
 */
function getWords(raw) {
    const result = {};
    for (const [key, value] of o.entries(raw.words)) {
        result[s.lcFirst(key)] = new _1.Definition(map(value, x => s.lcFirst(x)), s.lcFirst(key));
        result[s.ucFirst(key)] = new _1.Definition(map(value, x => s.ucFirst(x)), s.ucFirst(key));
        result[key.toLowerCase()] = new _1.Definition(map(value, x => x.toLowerCase()), key.toLowerCase());
        result[key.toUpperCase()] = new _1.Definition(map(value, x => x.toUpperCase()), key.toUpperCase());
    }
    return result;
}
/**
 * Validates language definition.
 *
 * @param raw - Language definition.
 */
function validate(raw) {
    assert.toBeTrue(o
        .entries(raw.wordForms)
        .every(([key, forms]) => key === key.toLowerCase() &&
        forms.every(form => form === form.toLowerCase())), "Expecting lowercase word forms");
}
//# sourceMappingURL=Definitions.js.map