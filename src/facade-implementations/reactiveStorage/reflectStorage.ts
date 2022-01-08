import type {
  Facade,
  OnChange,
  Reduce
} from "@skylib/facades/dist/reactiveStorage";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import { wrapProxyHandler } from "@skylib/functions/dist/helpers";
import * as reflect from "@skylib/functions/dist/reflect";

export const implementation = fn.run((): Facade => {
  function reflectStorage<T extends object>(data: T): T {
    return data;
  }

  reflectStorage.withChangesHandler = <T extends object, R>(
    data: T,
    onChange: OnChange<R>,
    reduce: Reduce<T, R>
  ): T => {
    let reduced = reduce(data);

    return new Proxy(
      data,
      wrapProxyHandler("reflectStorage", "doDefault", {
        get,
        set
      })
    );

    function get<T2 extends object = object>(
      target: T2,
      key: PropertyKey
    ): unknown {
      const value = reflect.get(target, key);

      return is.object(value)
        ? new Proxy(
            value,
            wrapProxyHandler("reflectStorage", "doDefault", {
              get,
              set
            })
          )
        : value;
    }

    function set<T2 extends object = object>(
      target: T2,
      key: PropertyKey,
      value: unknown
    ): boolean {
      if (reflect.set(target, key, value)) {
        const oldReduced = reduced;

        reduced = reduce(data);

        if (reduced === oldReduced) {
          // Unchanged
        } else onChange(reduced);

        return true;
      }

      return false;
    }
  };

  return reflectStorage;
});
