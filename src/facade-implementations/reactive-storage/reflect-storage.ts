import {
  assert,
  defineFn,
  is,
  map,
  reflect,
  wrapProxyHandler
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
      // eslint-disable-next-line @skylib/functions/no-restricted-syntax -- Ok
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
      // eslint-disable-next-line @skylib/functions/no-restricted-syntax -- Ok
      const oldValue = reflect.get(target, key);

      // eslint-disable-next-line @skylib/functions/no-restricted-syntax -- Ok
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
    unwatch: (obj: object, observer: reactiveStorage.Observer) => {
      assert.not.empty(observer.symbol);

      const callbacks = reflect.getMetadata(MetadataKey, obj);

      assert.byGuard(callbacks, isCallbacks);

      reflect.defineMetadata(
        MetadataKey,
        map.delete(callbacks, observer.symbol),
        obj
      );
    },
    watch: <T extends object>(
      obj: T,
      handler: reactiveStorage.Handler<T>,
      reducer?: reactiveStorage.Reducer<T>
    ): reactiveStorage.Observer => {
      const symbol = Symbol("reflect-storage-callback");

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

const MetadataKey = Symbol("reflect-storage-callbacks");

const isCallbacks = is.factory(is.map.of, is.symbol, is.callable);
