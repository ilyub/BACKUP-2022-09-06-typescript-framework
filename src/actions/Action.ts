import type { TaskType } from "@skylib/facades/dist/handlePromise";
import { handlePromise } from "@skylib/facades/dist/handlePromise";
import type { stringU } from "@skylib/functions/dist/types/core";

export class Action<A extends unknown[], R> {
  public readonly errorMessage: stringU = undefined;

  public readonly type: TaskType | undefined = undefined;

  /**
   * Checks if action is running.
   *
   * @returns _True_ if action is running, _false_ otherwise.
   */
  public get running(): boolean {
    return this._running > 0;
  }

  /**
   * Executes action.
   *
   * @param args - Arguments.
   * @returns Result.
   */
  public async execute(...args: A): Promise<R> {
    this._running++;

    try {
      return await this._execute(...args);
    } finally {
      this._running--;
    }
  }

  /**
   * Starts action.
   *
   * @param args - Arguments.
   */
  public spawn(...args: A): void {
    if (this.type)
      handlePromise.verbose(
        this.execute(...args),
        this.type,
        this.errorMessage
      );
    else handlePromise.silent(this.execute(...args), this.errorMessage);
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected _running = 0;

  /**
   * Executes action.
   *
   * @param _args - Arguments.
   * @returns Result.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  protected async _execute(..._args: A): Promise<R> {
    throw new Error("Not implemented");
  }
}
