"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionary = void 0;
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
class Dictionary {
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     */
    constructor(definitions, context, count = 1) {
        Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @skylib/require-jsdoc -- Ok
        Object.defineProperty(this, "plain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (str) => `plain:${str}`
        });
        Object.defineProperty(this, "_context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "count", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "definitions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "facade", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "subs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        const facade = (0, functions_1.evaluate)(() => {
            const handler = (0, functions_1.wrapProxyHandler)("Dictionary", "doDefault", {
                get: (target, key) => {
                    functions_1.assert.string(key, "Expecting string key");
                    return target.has(key) ? target.get(key) : functions_1.o.get(target, key);
                }
            });
            return new Proxy(this, handler);
        });
        this._context = context;
        this.count = count;
        this.definitions = definitions;
        this.facade = facade;
        this.keys = functions_1.a.first(functions_1.o.values(definitions)).keys;
    }
    context(context) {
        if (context === this._context)
            return this.facade;
        let sub = this.subs.get(context);
        if (sub) {
            // Already exists
        }
        else {
            sub = Dictionary.create(this.definitions, context, this.count);
            this.subs.set(context, sub);
        }
        return sub;
    }
    get(key) {
        if (key.startsWith("plain:"))
            return key.slice(6);
        const definitions = this.definitions[core_1.moduleConfig.localeName];
        return definitions.get(key, this._context, this.count, replacements).value;
    }
    getIfExists(key) {
        if (key.startsWith("plain:"))
            return key.slice(6);
        const definitions = this.definitions[core_1.moduleConfig.localeName];
        return definitions.has(key)
            ? definitions.get(key, this._context, this.count, replacements).value
            : key;
    }
    has(key) {
        if (key.startsWith("plain:"))
            return true;
        const definitions = this.definitions[core_1.moduleConfig.localeName];
        return definitions.has(key);
    }
    plural(count) {
        count = this.pluralReduce(count);
        if (count === this.count)
            return this.facade;
        let sub = this.subs.get(count);
        if (sub) {
            // Already exists
        }
        else {
            sub = Dictionary.create(this.definitions, this._context, count);
            this.subs.set(count, sub);
        }
        return sub;
    }
    with(search, replace) {
        switch (typeof replace) {
            case "number":
                replacements.set(search.toUpperCase(), functions_1.cast.string(replace));
                replacements.set(search.toLowerCase(), functions_1.cast.string(replace));
                replacements.set(functions_1.s.ucFirst(search), functions_1.cast.string(replace));
                replacements.set(functions_1.s.lcFirst(search), functions_1.cast.string(replace));
                break;
            case "string":
                replacements.set(search.toUpperCase(), replace.toUpperCase());
                replacements.set(search.toLowerCase(), replace.toLowerCase());
                replacements.set(functions_1.s.ucFirst(search), functions_1.s.ucFirst(replace));
                replacements.set(functions_1.s.lcFirst(search), functions_1.s.lcFirst(replace));
        }
        return this.facade;
    }
    /**
     * Reduces count for plural form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    pluralReduce(count) {
        const definitions = this.definitions[core_1.moduleConfig.localeName];
        return definitions.pluralReduce(count);
    }
}
exports.Dictionary = Dictionary;
/**
 * Creates dictionary.
 *
 * @param definitions - Language definitions.
 * @param context - Context.
 * @param count - Count for plural form.
 * @returns Dictionary.
 */
Object.defineProperty(Dictionary, "create", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (definitions, context, count) => new Dictionary(definitions, context, count).facade
});
const replacements = new Map();
//# sourceMappingURL=Dictionary.js.map