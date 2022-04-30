import {
  assert,
  is,
  wrapProxyHandler,
  map,
  reflect,
  defineFn
} from "@skylib/functions";
import type { reactiveStorage } from "@skylib/facades";

declare global {
  namespace facades {
    namespace reactiveStorage {
      interface Observer {
        readonly symbol?: symbol;
      }
    }
  }
}

export const reflectStorage: reactiveStorage.Facade = defineFn(
  // eslint-disable-next-line @skylib/require-jsdoc -- Ok
  <T extends object>(obj: T): T => {
    if (reflect.hasMetadata(MetadataKey, obj)) return obj;

    const result = new Proxy(
      obj,
      wrapProxyHandler("reflectStorage", "doDefault", { get, set })
    );

    reflect.defineMetadata(MetadataKey, new Map(), result);

    return result;

    function get<O extends object = object>(
      target: O,
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

    function set<O extends object = object>(
      target: O,
      key: PropertyKey,
      value: unknown
    ): boolean {
      const oldValue = reflect.get(target, key);

      if (reflect.set(target, key, value)) {
        if (value === oldValue) {
          // Not modified
        } else {
          const callbacks = reflect.getMetadata(MetadataKey, result);

          assert.byGuard(callbacks, isCallbacks);

          for (const callback of callbacks.values()) callback();
        }

        return true;
      }

      return false;
    }
  },
  {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    unwatch(obj: object, observer: reactiveStorage.Observer) {
      assert.not.empty(observer.symbol);

      const callbacks = reflect.getMetadata(MetadataKey, obj);

      assert.byGuard(callbacks, isCallbacks);

      reflect.defineMetadata(
        MetadataKey,
        map.delete(callbacks, observer.symbol),
        obj
      );
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    watch<T extends object>(
      obj: T,
      handler: reactiveStorage.Handler<T>,
      reducer?: reactiveStorage.Reducer<T>
    ): reactiveStorage.Observer {
      const symbol = Symbol("reflect-storage.callback");

      const callbacks = reflect.getMetadata(MetadataKey, obj);

      assert.byGuard(callbacks, isCallbacks);

      if (reducer) {
        let reduced = reducer(obj);

        reflect.defineMetadata(
          MetadataKey,
          map.set(callbacks, symbol, () => {
            const oldReduced = reduced;

            reduced = reducer(obj);

            if (reduced === oldReduced) {
              // Not modified
            } else handler(obj);
          }),
          obj
        );
      } else
        reflect.defineMetadata(
          MetadataKey,
          map.set(callbacks, symbol, () => {
            handler(obj);
          }),
          obj
        );

      return { _type: "ReactiveStorageObserver", symbol };
    }
  }
);

const MetadataKey = Symbol("Callbacks");

const isCallbacks = is.factory(is.map.of, is.symbol, is.callable);
