import type { Facade, TaskType } from "@skylib/facades/dist/handlePromise";
import { progressReporter } from "@skylib/facades/dist/progressReporter";
import { showAlert } from "@skylib/facades/dist/showAlert";
import * as fn from "@skylib/functions/dist/function";
import * as o from "@skylib/functions/dist/object";
import type {
  PromiseAsync,
  ReadonlyRecord
} from "@skylib/functions/dist/types/core";

export interface Configuration {
  readonly expectedDurations: ReadonlyRecord<TaskType, number>;
}

export type PartialConfiguration<K extends keyof Configuration> = {
  readonly [L in K]: Configuration[L];
};

export const handlers = o.freeze({
  error(error: unknown): void {
    throw error;
  }
});

/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure<K extends keyof Configuration>(
  config: PartialConfiguration<K>
): void {
  o.assign(moduleConfig, config);
}

/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration(): Configuration {
  return moduleConfig;
}

export const implementation: Facade = {
  async runAll() {
    await Promise.all(promisesPool.values());
  },
  running() {
    return promisesPool.size > 0;
  },
  silent<T>(promiseAsync: PromiseAsync<T>, errorMessage = "") {
    handle(promiseAsync, undefined, errorMessage);
  },
  verbose<T>(promiseAsync: PromiseAsync<T>, type: TaskType, errorMessage = "") {
    handle(promiseAsync, type, errorMessage);
  }
};

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

const promisesPool = new Map<symbol, Promise<unknown>>();

const moduleConfig: Configuration = {
  expectedDurations: {
    createDb: 10_000,
    dbRequest: 10_000,
    destroyDb: 10_000,
    httpRequest: 10_000,
    navigation: 10_000
  }
};

/**
 * Handles promise.
 *
 * @param promiseAsync - Promise or asynchronous function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
function handle<T>(
  promiseAsync: PromiseAsync<T>,
  type: TaskType | undefined,
  errorMessage: string
): void {
  const id = Symbol("PromiseId");

  const promise = fn.run(promiseAsync);

  const progress = type
    ? progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
    : undefined;

  promisesPool.set(id, promise);
  // eslint-disable-next-line github/no-then, promise/prefer-await-to-then
  promise.catch(rejected).then(fulfilled).catch(rejected);

  /**
   * Fulfilled callback.
   */
  function fulfilled(): void {
    promisesPool.delete(id);
    progress?.done();
  }

  /**
   * Rejected callback.
   *
   * @param reason - Reason.
   */
  function rejected(reason: unknown): void {
    promisesPool.delete(id);
    progress?.done();

    if (errorMessage) showAlert(errorMessage);

    handlers.error(reason);
  }
}
