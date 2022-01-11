import { reactiveStorage } from "@skylib/facades/es/reactiveStorage";
import * as assert from "@skylib/functions/es/assertions";
import * as cast from "@skylib/functions/es/converters";
import * as fn from "@skylib/functions/es/function";
import { onDemand, wrapProxyHandler } from "@skylib/functions/es/helpers";
import * as o from "@skylib/functions/es/object";
import * as reflect from "@skylib/functions/es/reflect";
import * as s from "@skylib/functions/es/string";
export class Dictionary {
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
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
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
        this.proxified = fn.run(() => {
            const handler = wrapProxyHandler("Dictionary", "throw", {
                get(target, key) {
                    assert.string(key, "Expecting string key");
                    return target.has(key) ? target.get(key) : reflect.get(target, key);
                },
                getOwnPropertyDescriptor(target, key) {
                    return Object.getOwnPropertyDescriptor(target, key);
                }
            });
            return new Proxy(this, handler);
        });
    }
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    static configure(config) {
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
    static create(definitions, context, count) {
        return new Dictionary(definitions, context, count).proxified;
    }
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    static getConfiguration() {
        return o.clone(moduleConfig);
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
        assert.not.empty(definitions, `Missing dictionary for locale: ${moduleConfig.localeName}`);
        return definitions.get(key, this._context, [], this.count, replacementsPool)
            .value;
    }
    has(key) {
        const definitions = this.definitions[moduleConfig.localeName];
        assert.not.empty(definitions, `Missing dictionary for locale: ${moduleConfig.localeName}`);
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
    /**
     * Reduces count for plural word form.
     *
     * @param count - Count.
     * @returns Reduced count.
     */
    pluralReduce(count) {
        const definitions = this.definitions[moduleConfig.localeName];
        assert.not.empty(definitions, `Missing dictionary for locale: ${moduleConfig.localeName}`);
        return definitions.pluralReduce(count);
    }
}
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const moduleConfig = onDemand(() => reactiveStorage({
    localeName: "en-US"
}));
const replacementsPool = new Map();
//# sourceMappingURL=Dictionary.js.map