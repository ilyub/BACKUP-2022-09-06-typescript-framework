import type {
  Facade,
  Handler,
  Reducer
} from "@skylib/facades/dist/reactiveStorage";
import * as assert from "@skylib/functions/dist/assertions";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import { wrapProxyHandler } from "@skylib/functions/dist/helpers";
import * as map from "@skylib/functions/dist/map";
import * as reflect from "@skylib/functions/dist/reflect";

export const implementation = fn.run<Facade>(() => {
  function reflectStorage<T extends object>(obj: T): T {
    if (reflect.hasMetadata(callbacksKey, obj)) return obj;

    const reactive = new Proxy(
      obj,
      wrapProxyHandler("reflectStorage", "doDefault", { get, set })
    );

    reflect.defineMetadata(callbacksKey, new Map(), reactive);

    return reactive;

    function get<T2 extends object = object>(
      target: T2,
      key: PropertyKey
    ): unknown {
      const value = reflect.get(target, key);

      return is.object(value)
        ? new Proxy(
            value,
            wrapProxyHandler("reflectStorage", "doDefault", { get, set })
          )
        : value;
    }

    function set<T2 extends object = object>(
      target: T2,
      key: PropertyKey,
      value: unknown
    ): boolean {
      const oldValue = reflect.get(target, key);

      if (reflect.set(target, key, value)) {
        if (value !== oldValue) {
          const callbacks = reflect.getMetadata(callbacksKey, reactive);

          assert.byGuard(callbacks, isCallbacks);

          for (const callback of callbacks.values()) callback();
        }

        return true;
      }

      return false;
    }
  }

  reflectStorage.unwatch = (obj: object, observer: unknown): void => {
    const callbacks = reflect.getMetadata(callbacksKey, obj);

    assert.byGuard(callbacks, isCallbacks);
    assert.byGuard(observer, is.symbol);
    reflect.defineMetadata(callbacksKey, map.delete(callbacks, observer), obj);
  };

  reflectStorage.watch = <T extends object>(
    obj: T,
    handler: Handler<T>,
    reducer?: Reducer<T>
  ): unknown => {
    const observer = Symbol("Callback");

    const callbacks = reflect.getMetadata(callbacksKey, obj);

    assert.byGuard(callbacks, isCallbacks);

    if (reducer) {
      let reduced = reducer(obj);

      reflect.defineMetadata(
        callbacksKey,
        map.set(callbacks, observer, () => {
          const oldReduced = reduced;

          reduced = reducer(obj);

          if (reduced !== oldReduced) handler(obj);
        }),
        obj
      );
    } else
      reflect.defineMetadata(
        callbacksKey,
        map.set(callbacks, observer, () => {
          handler(obj);
        }),
        obj
      );

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
