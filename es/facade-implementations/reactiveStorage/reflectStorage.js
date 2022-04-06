import * as assert from "@skylib/functions/es/assertions";
import * as fn from "@skylib/functions/es/function";
import * as is from "@skylib/functions/es/guards";
import { wrapProxyHandler } from "@skylib/functions/es/helpers";
import * as map from "@skylib/functions/es/map";
import * as reflect from "@skylib/functions/es/reflect";
export const implementation = fn.run(() => {
    function reflectStorage(obj) {
        if (reflect.hasMetadata(callbacksKey, obj))
            return obj;
        const reactive = new Proxy(obj, wrapProxyHandler("reflectStorage", "doDefault", { get, set }));
        reflect.defineMetadata(callbacksKey, new Map(), reactive);
        return reactive;
        function get(target, key) {
            const value = reflect.get(target, key);
            return is.object(value)
                ? new Proxy(value, wrapProxyHandler("reflectStorage", "doDefault", { get, set }))
                : value;
        }
        function set(target, key, value) {
            const oldValue = reflect.get(target, key);
            if (reflect.set(target, key, value)) {
                if (value !== oldValue) {
                    const callbacks = reflect.getMetadata(callbacksKey, reactive);
                    assert.byGuard(callbacks, isCallbacks);
                    for (const callback of callbacks.values())
                        callback();
                }
                return true;
            }
            return false;
        }
    }
    reflectStorage.unwatch = (obj, observer) => {
        const callbacks = reflect.getMetadata(callbacksKey, obj);
        assert.byGuard(callbacks, isCallbacks);
        reflect.defineMetadata(callbacksKey, map.delete(callbacks, observer.symbol), obj);
    };
    reflectStorage.watch = (obj, handler, reducer) => {
        const observer = {
            _type: "ReactiveStorageObserver",
            symbol: Symbol("Callback")
        };
        const callbacks = reflect.getMetadata(callbacksKey, obj);
        assert.byGuard(callbacks, isCallbacks);
        if (reducer) {
            let reduced = reducer(obj);
            reflect.defineMetadata(callbacksKey, map.set(callbacks, observer.symbol, () => {
                const oldReduced = reduced;
                reduced = reducer(obj);
                if (reduced !== oldReduced)
                    handler(obj);
            }), obj);
        }
        else
            reflect.defineMetadata(callbacksKey, map.set(callbacks, observer.symbol, () => {
                handler(obj);
            }), obj);
        return observer;
    };
    return reflectStorage;
});
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const callbacksKey = Symbol("Callbacks");
const isCallbacks = is.factory(is.map.of, is.symbol, is.callable);
//# sourceMappingURL=reflectStorage.js.map