"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const functions_1 = require("@skylib/functions");
exports.implementation = functions_1.o.extend((obj) => {
    if (functions_1.reflect.hasMetadata(callbacksKey, obj))
        return obj;
    const reactive = new Proxy(obj, (0, functions_1.wrapProxyHandler)("reflectStorage", "doDefault", { get, set }));
    functions_1.reflect.defineMetadata(callbacksKey, new Map(), reactive);
    return reactive;
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
                const callbacks = functions_1.reflect.getMetadata(callbacksKey, reactive);
                functions_1.assert.byGuard(callbacks, isCallbacks);
                for (const callback of callbacks.values())
                    callback();
            }
            return true;
        }
        return false;
    }
}, {
    unwatch(obj, observer) {
        const callbacks = functions_1.reflect.getMetadata(callbacksKey, obj);
        functions_1.assert.byGuard(callbacks, isCallbacks);
        functions_1.reflect.defineMetadata(callbacksKey, functions_1.map.delete(callbacks, observer.symbol), obj);
    },
    watch(obj, handler, reducer) {
        const observer = {
            _type: "ReactiveStorageObserver",
            symbol: Symbol("Callback")
        };
        const callbacks = functions_1.reflect.getMetadata(callbacksKey, obj);
        functions_1.assert.byGuard(callbacks, isCallbacks);
        if (reducer) {
            let reduced = reducer(obj);
            functions_1.reflect.defineMetadata(callbacksKey, functions_1.map.set(callbacks, observer.symbol, () => {
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
            functions_1.reflect.defineMetadata(callbacksKey, functions_1.map.set(callbacks, observer.symbol, () => {
                handler(obj);
            }), obj);
        return observer;
    }
});
const callbacksKey = Symbol("Callbacks");
const isCallbacks = functions_1.is.factory(functions_1.is.map.of, functions_1.is.symbol, functions_1.is.callable);
//# sourceMappingURL=reflectStorage.js.map