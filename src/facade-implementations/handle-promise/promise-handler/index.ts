import { defineFn, o } from "@skylib/functions";
import { handle, moduleConfig, promises } from "./core";
import type { AsyncPromise } from "@skylib/functions";
import type { Configurable } from "./core";
import type { handlePromise } from "@skylib/facades";

export const promiseHandler: Configurable & handlePromise.Facade = defineFn(
  <T>(
    type: handlePromise.Type | undefined,
    mixed: AsyncPromise<T>,
    errorMessage = ""
  ) => {
    handle(mixed, type, errorMessage);
  },
  {
    configure: (config: promiseHandler.PartialConfiguration) => {
      o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig,
    runAll: async () => {
      await Promise.all(promises.values());
    },
    running: () => promises.size > 0,
    silent: <T>(mixed: AsyncPromise<T>, errorMessage = "") => {
      handle(mixed, undefined, errorMessage);
    }
  }
);

export namespace promiseHandler {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
