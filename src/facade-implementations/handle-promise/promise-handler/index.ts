import type { PromiseType, handlePromise } from "@skylib/facades";
import { defineFn, o } from "@skylib/functions";
import { handle, moduleConfig, promises } from "./core";
import type { Configurable } from "./core";
import type { types } from "@skylib/functions";

export const promiseHandler: Configurable & handlePromise.Facade = defineFn(
  <T>(
    type: PromiseType | undefined,
    mixed: types.fn.AsyncPromise<T>,
    errorMessage = ""
  ) => {
    handle(mixed, type, errorMessage);
  },
  {
    configure: config => {
      o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig,
    runAll: async () => {
      await Promise.all(promises.values());
    },
    running: () => promises.size > 0,
    silent: <T>(mixed: types.fn.AsyncPromise<T>, errorMessage = "") => {
      handle(mixed, undefined, errorMessage);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Ok
export namespace promiseHandler {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
