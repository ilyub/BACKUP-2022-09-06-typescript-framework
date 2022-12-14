import type { Rec, Writable, types } from "@skylib/functions";
import { progressReporter, showAlert } from "@skylib/facades";
import type { PromiseType } from "@skylib/facades";
import { evaluate } from "@skylib/functions";
import { handleError } from "./handle-error";

export const moduleConfig: Writable<Configuration> = {
  expectedDurations: {
    createDb: 10_000,
    dbRequest: 10_000,
    destroyDb: 10_000,
    httpRequest: 10_000,
    navigation: 10_000
  }
};

// eslint-disable-next-line @skylib/functions/prefer-ReadonlyMap -- Ok
export const promises = new Map<symbol, Promise<unknown>>();

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
  readonly expectedDurations: Rec<PromiseType, number>;
}

export interface PartialConfiguration extends Partial<Configuration> {}

/**
 * Handles promise.
 *
 * @param mixed - Promise or async function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
export function handle<T>(
  mixed: types.fn.AsyncPromise<T>,
  type: PromiseType | undefined,
  errorMessage: string
): void {
  const id = Symbol("promise-id");

  const promise = evaluate(mixed);

  const progress = type
    ? progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
    : undefined;

  promises.set(id, promise);
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
