"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectStorage = void 0;
const functions_1 = require("@skylib/functions");
exports.reflectStorage = (0, functions_1.defineFn)(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(obj) => {
    if (functions_1.reflect.hasMetadata(MetadataKey, obj))
        return obj;
    const result = new Proxy(obj, (0, functions_1.wrapProxyHandler)("reflectStorage", "doDefault", { get, set }));
    functions_1.reflect.defineMetadata(MetadataKey, new Map(), result);
    return result;
    function get(target, key) {
        const value = functions_1.reflect.get(target, key);
        return functions_1.is.object(value)
            ? new Proxy(value, (0, functions_1.wrapProxyHandler)("reflectStorage", "doDefault", { get, set }))
            : value;
    }
    function set(target, key, value) {
        const oldValue = functions_1.reflect.get(target, key);
        if (functions_1.reflect.set(target, key, value)) {
            if (value === oldValue) {
                // Not modified
            }
            else {
                const callbacks = functions_1.reflect.getMetadata(MetadataKey, result);
                functions_1.assert.byGuard(callbacks, isCallbacks);
                for (const callback of callbacks.values())
                    callback();
            }
            return true;
        }
        return false;
    }
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    unwatch(obj, observer) {
        functions_1.assert.not.empty(observer.symbol);
        const callbacks = functions_1.reflect.getMetadata(MetadataKey, obj);
        functions_1.assert.byGuard(callbacks, isCallbacks);
        functions_1.reflect.defineMetadata(MetadataKey, functions_1.map.delete(callbacks, observer.symbol), obj);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    watch(obj, handler, reducer) {
        const symbol = Symbol("reflect-storage.callback");
        const callbacks = functions_1.reflect.getMetadata(MetadataKey, obj);
        functions_1.assert.byGuard(callbacks, isCallbacks);
        if (reducer) {
            let reduced = reducer(obj);
            functions_1.reflect.defineMetadata(MetadataKey, functions_1.map.set(callbacks, symbol, () => {
                const oldReduced = reduced;
                reduced = reducer(obj);
                if (reduced === oldReduced) {
                    // Not modified
                }
                else
                    handler(obj);
            }), obj);
        }
        else
            functions_1.reflect.defineMetadata(MetadataKey, functions_1.map.set(callbacks, symbol, () => {
                handler(obj);
            }), obj);
        return { _type: "ReactiveStorageObserver", symbol };
    }
});
const MetadataKey = Symbol("Callbacks");
const isCallbacks = functions_1.is.factory(functions_1.is.map.of, functions_1.is.symbol, functions_1.is.callable);
//# sourceMappingURL=reflect-storage.js.map