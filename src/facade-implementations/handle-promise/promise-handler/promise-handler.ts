import { handleError } from "./core";
import { progressReporter, showAlert } from "@skylib/facades";
import { fn, o } from "@skylib/functions";
import type { handlePromise as facade } from "@skylib/facades";
import type { Rec, AsyncPromise } from "@skylib/functions";

export const promiseHandler: facade.Facade & promiseHandler.Configurable = {
  configure(config) {
    o.assign(moduleConfig, config);
  },
  getConfiguration() {
    return moduleConfig;
  },
  async runAll() {
    await Promise.all(promises.values());
  },
  running() {
    return promises.size > 0;
  },
  silent<T>(mixed: AsyncPromise<T>, errorMessage = "") {
    handle(mixed, undefined, errorMessage);
  },
  verbose<T>(mixed: AsyncPromise<T>, type: facade.Type, errorMessage = "") {
    handle(mixed, type, errorMessage);
  }
};

export namespace promiseHandler {
  export interface Configurable {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    readonly configure: (config: PartialConfiguration) => void;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    readonly getConfiguration: () => Configuration;
  }

  export interface Configuration {
    readonly expectedDurations: Rec<facade.Type, number>;
  }

  export interface PartialConfiguration extends Partial<Configuration> {}
}

const moduleConfig: promiseHandler.Configuration = {
  expectedDurations: {
    createDb: 10_000,
    dbRequest: 10_000,
    destroyDb: 10_000,
    httpRequest: 10_000,
    navigation: 10_000
  }
};

const promises = new Map<symbol, Promise<unknown>>();

/**
 * Handles promise.
 *
 * @param mixed - Promise or async function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
function handle<T>(
  mixed: AsyncPromise<T>,
  type: facade.Type | undefined,
  errorMessage: string
): void {
  const id = Symbol("promise-id");

  const promise = fn.run(mixed);

  const progress = type
    ? progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
    : undefined;

  promises.set(id, promise);
  // eslint-disable-next-line github/no-then, promise/prefer-await-to-then -- Ok
  promise.catch(rejected).then(fulfilled).catch(rejected);

  function fulfilled(): void {
    promises.delete(id);
    progress?.done();
  }

  function rejected(reason: unknown): void {
    promises.delete(id);
    progress?.done();

    if (errorMessage) showAlert(errorMessage);

    handleError(reason);
  }
}
