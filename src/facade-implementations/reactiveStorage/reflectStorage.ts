import type {
  Facade,
  Handler,
  Observer,
  Reducer
} from "@skylib/facades/dist/reactiveStorage";
import * as assert from "@skylib/functions/dist/assertions";
import * as is from "@skylib/functions/dist/guards";
import { wrapProxyHandler } from "@skylib/functions/dist/helpers";
import * as map from "@skylib/functions/dist/map";
import * as o from "@skylib/functions/dist/object";
import * as reflect from "@skylib/functions/dist/reflect";

declare global {
  namespace facades {
    namespace reactiveStorage {
      interface Observer {
        readonly symbol: symbol;
      }
    }
  }
}

export const implementation: Facade = o.extend(
  <T extends object>(obj: T): T => {
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
        if (value === oldValue) {
          // Not modified
        } else {
          const callbacks = reflect.getMetadata(callbacksKey, reactive);

          assert.byGuard(callbacks, isCallbacks);

          for (const callback of callbacks.values()) callback();
        }

        return true;
      }

      return false;
    }
  },
  {
    unwatch(obj: object, observer: Observer): void {
      const callbacks = reflect.getMetadata(callbacksKey, obj);

      assert.byGuard(callbacks, isCallbacks);

      reflect.defineMetadata(
        callbacksKey,
        map.delete(callbacks, observer.symbol),
        obj
      );
    },
    watch<T extends object>(
      obj: T,
      handler: Handler<T>,
      reducer?: Reducer<T>
    ): Observer {
      const observer: Observer = {
        _type: "ReactiveStorageObserver",
        symbol: Symbol("Callback")
      };

      const callbacks = reflect.getMetadata(callbacksKey, obj);

      assert.byGuard(callbacks, isCallbacks);

      if (reducer) {
        let reduced = reducer(obj);

        reflect.defineMetadata(
          callbacksKey,
          map.set(callbacks, observer.symbol, () => {
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
          callbacksKey,
          map.set(callbacks, observer.symbol, () => {
            handler(obj);
          }),
          obj
        );

      return observer;
    }
  }
);

const callbacksKey = Symbol("Callbacks");

const isCallbacks = is.factory(is.map.of, is.symbol, is.callable);
