"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const helpers_1 = require("@skylib/functions/dist/helpers");
const map = tslib_1.__importStar(require("@skylib/functions/dist/map"));
const reflect = tslib_1.__importStar(require("@skylib/functions/dist/reflect"));
exports.implementation = fn.run(() => {
    function reflectStorage(obj) {
        if (reflect.hasMetadata(callbacksKey, obj))
            return obj;
        const reactive = new Proxy(obj, (0, helpers_1.wrapProxyHandler)("reflectStorage", "doDefault", {
            get,
            set
        }));
        reflect.defineMetadata(callbacksKey, new Map(), reactive);
        return reactive;
        function get(target, key) {
            const value = reflect.get(target, key);
            return is.object(value)
                ? new Proxy(value, (0, helpers_1.wrapProxyHandler)("reflectStorage", "doDefault", { get, set }))
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
        assert.byGuard(observer, is.symbol);
        reflect.defineMetadata(callbacksKey, map.delete(callbacks, observer), obj);
    };
    reflectStorage.watch = (obj, handler, reducer) => {
        const observer = Symbol("Callback");
        const callbacks = reflect.getMetadata(callbacksKey, obj);
        assert.byGuard(callbacks, isCallbacks);
        if (reducer) {
            let reduced = reducer(obj);
            reflect.defineMetadata(callbacksKey, map.set(callbacks, observer, () => {
                const oldReduced = reduced;
                reduced = reducer(obj);
                if (reduced !== oldReduced)
                    handler(obj);
            }), obj);
        }
        else
            reflect.defineMetadata(callbacksKey, map.set(callbacks, observer, () => {
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
const isCallbacks = is.factory(is.map, is.symbol, is.callable);
//# sourceMappingURL=reflectStorage.js.map