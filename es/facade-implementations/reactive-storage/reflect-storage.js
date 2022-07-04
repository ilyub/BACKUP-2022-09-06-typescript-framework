/* disable @skylib/functions/no-restricted-syntax[no-reflect-get] */
/* disable @skylib/functions/no-restricted-syntax[no-reflect-set] */
import { as, defineFn, is, map, reflect, wrapProxyHandler } from "@skylib/functions";
export const reflectStorage = defineFn((obj) => {
    if (reflect.hasMetadata(MetadataKey, obj))
        return obj;
    const result = new Proxy(obj, wrapProxyHandler("reflectStorage", "doDefault", { get, set }));
    reflect.defineMetadata(MetadataKey, new Map(), result);
    return result;
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
                const callbacks = reflect.getMetadata(MetadataKey, result, isCallbacks);
                for (const callback of callbacks.values())
                    callback();
            }
            return true;
        }
        return false;
    }
}, {
    unwatch: (obj, observer) => {
        const callbacks = reflect.getMetadata(MetadataKey, obj, isCallbacks);
        reflect.defineMetadata(MetadataKey, map.delete(callbacks, as.not.empty(observer.symbol)), obj);
    },
    watch: (obj, handler, reducer) => {
        const symbol = Symbol("reflect-storage-callback");
        const callbacks = reflect.getMetadata(MetadataKey, obj, isCallbacks);
        if (reducer) {
            let reduced = reducer(obj);
            reflect.defineMetadata(MetadataKey, map.set(callbacks, symbol, () => {
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
            reflect.defineMetadata(MetadataKey, map.set(callbacks, symbol, () => {
                handler(obj);
            }), obj);
        return { _type: "ReactiveStorageObserver", symbol };
    }
});
const MetadataKey = Symbol("reflect-storage-callbacks");
const isCallbacks = is.factory(is.map.of, is.symbol, is.callable);
//# sourceMappingURL=reflect-storage.js.map