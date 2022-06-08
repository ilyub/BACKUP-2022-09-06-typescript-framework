import { handle, moduleConfig, promises } from "./core";
import { defineFn, o } from "@skylib/functions";
import type { Configurable } from "./core";
import type { handlePromise } from "@skylib/facades";
import type { AsyncPromise } from "@skylib/functions";

export const promiseHandler: Configurable & handlePromise.Facade = defineFn(
  // eslint-disable-next-line @skylib/require-jsdoc -- Ok
  <T>(
    type: handlePromise.Type | undefined,
    mixed: AsyncPromise<T>,
    errorMessage = ""
  ) => {
    handle(mixed, type, errorMessage);
  },
  {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    configure: (config: promiseHandler.PartialConfiguration) => {
      o.assign(moduleConfig, config);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    getConfiguration: () => moduleConfig,
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    runAll: async () => {
      await Promise.all(promises.values());
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    running: () => promises.size > 0,
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    silent: <T>(mixed: AsyncPromise<T>, errorMessage = "") => {
      handle(mixed, undefined, errorMessage);
    }
  }
);

export namespace promiseHandler {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
