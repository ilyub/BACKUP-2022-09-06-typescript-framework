"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionary = void 0;
const facades_1 = require("@skylib/facades");
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
        Object.defineProperty(this, "proxified", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "subsPool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this._context = context;
        this.count = count;
        this.definitions = definitions;
        this.proxified = functions_1.fn.run(() => {
            const handler = (0, functions_1.wrapProxyHandler)("Dictionary", "throw", {
                get(target, key) {
                    functions_1.assert.string(key, "Expecting string key");
                    return target.has(key) ? target.get(key) : functions_1.reflect.get(target, key);
                },
                getOwnPropertyDescriptor(target, key) {
                    return Object.getOwnPropertyDescriptor(target, key);
                }
            });
            // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
            return new Proxy(this, handler);
        });
    }
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    static configure(config) {
        functions_1.o.assign(moduleConfig, config);
    }
    /**
     * Creates class instance.
     *
     * @param definitions - Language definitions.
     * @param context - Context.
     * @param count - Count for plural form.
     * @returns Dictionary.
     */
    static create(definitions, context, count) {
        return new Dictionary(definitions, context, count).proxified;
    }
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    static getConfiguration() {
        return functions_1.o.clone(moduleConfig);
    }
    context(context) {
        if (context === this._context)
            return this.proxified;
        let sub = this.subsPool.get(context);
        if (sub) {
            // Already exists
        }
        else {
            sub = Dictionary.create(this.definitions, context, this.count);
            this.subsPool.set(context, sub);
        }
        return sub;
    }
    get(key) {
        const definitions = this.definitions[moduleConfig.localeName];
        functions_1.assert.not.empty(definitions, `Missing dictionary for locale: ${moduleConfig.localeName}`);
        return definitions.get(key, this._context, [], this.count, replacementsPool)
            .value;
    }
    has(key) {
        const definitions = this.definitions[moduleConfig.localeName];
        functions_1.assert.not.empty(definitions, `Missing dictionary for locale: ${moduleConfig.localeName}`);
        return definitions.has(key);
    }
    plural(count) {
        count = this.pluralReduce(count);
        if (count === this.count)
            return this.proxified;
        let sub = this.subsPool.get(count);
        if (sub) {
            // Already exists
        }
        else {
            sub = Dictionary.create(this.definitions, this._context, count);
            this.subsPool.set(count, sub);
        }
        return sub;
    }
    with(search, replace) {
        switch (typeof replace) {
            case "number":
                replacementsPool.set(search.toUpperCase(), functions_1.cast.string(replace));
                replacementsPool.set(search.toLowerCase(), functions_1.cast.string(replace));
                replacementsPool.set(functions_1.s.ucFirst(search), functions_1.cast.string(replace));
                replacementsPool.set(functions_1.s.lcFirst(search), functions_1.cast.string(replace));
                return this.proxified;
            case "string":
                replacementsPool.set(search.toUpperCase(), replace.toUpperCase());
                replacementsPool.set(search.toLowerCase(), replace.toLowerCase());
                replacementsPool.set(functions_1.s.ucFirst(search), functions_1.s.ucFirst(replace));
                replacementsPool.set(functions_1.s.lcFirst(search), functions_1.s.lcFirst(replace));
                return this.proxified;
        }
    }
    /**
     * Reduces count for plural word form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    pluralReduce(count) {
        const definitions = this.definitions[moduleConfig.localeName];
        functions_1.assert.not.empty(definitions, `Missing dictionary for locale: ${moduleConfig.localeName}`);
        return definitions.pluralReduce(count);
    }
}
exports.Dictionary = Dictionary;
const moduleConfig = (0, functions_1.onDemand)(() => (0, facades_1.reactiveStorage)({ localeName: "en-US" }));
const replacementsPool = new Map();
//# sourceMappingURL=Dictionary.js.map