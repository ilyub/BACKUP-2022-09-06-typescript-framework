import { assert, is, wrapProxyHandler, map, o, reflect } from "@skylib/functions";
export const implementation = o.extend((obj) => {
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
            if (value === oldValue) {
                // Not modified
            }
            else {
                const callbacks = reflect.getMetadata(callbacksKey, reactive);
                assert.byGuard(callbacks, isCallbacks);
                for (const callback of callbacks.values())
                    callback();
            }
            return true;
        }
        return false;
    }
}, {
    unwatch(obj, observer) {
        assert.not.empty(observer.symbol);
        const callbacks = reflect.getMetadata(callbacksKey, obj);
        assert.byGuard(callbacks, isCallbacks);
        reflect.defineMetadata(callbacksKey, map.delete(callbacks, observer.symbol), obj);
    },
    watch(obj, handler, reducer) {
        const symbol = Symbol("Callback");
        const callbacks = reflect.getMetadata(callbacksKey, obj);
        assert.byGuard(callbacks, isCallbacks);
        if (reducer) {
            let reduced = reducer(obj);
            reflect.defineMetadata(callbacksKey, map.set(callbacks, symbol, () => {
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
            reflect.defineMetadata(callbacksKey, map.set(callbacks, symbol, () => {
                handler(obj);
            }), obj);
        return { _type: "ReactiveStorageObserver", symbol };
    }
});
const callbacksKey = Symbol("Callbacks");
const isCallbacks = is.factory(is.map.of, is.symbol, is.callable);
//# sourceMappingURL=reflectStorage.js.map