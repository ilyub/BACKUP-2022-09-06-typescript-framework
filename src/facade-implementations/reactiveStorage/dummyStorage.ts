import type { Facade } from "@skylib/facades/dist/reactiveStorage";
import * as fn from "@skylib/functions/dist/function";

export const implementation = fn.run((): Facade => {
  function dummyStorage<T extends object>(data: T): T {
    return data;
  }

  dummyStorage.withChangesHandler = <T extends object>(data: T): T => data;

  return dummyStorage;
});
