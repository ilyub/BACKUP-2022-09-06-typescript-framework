import { showConfirm } from "@skylib/facades/dist/showConfirm";
import * as is from "@skylib/functions/dist/guards";
import type { stringU } from "@skylib/functions/dist/types/core";

import { Action } from "./Action";

export class Confirmable<A extends unknown[]> extends Action<A, void> {
  /**
   * Creates class instance.
   *
   * @param message - Confirmation message.
   */
  public constructor(message?: string) {
    super();
    this.message = message;
  }

  /**
   * Executes action.
   *
   * @param args - Arguments.
   * @returns Result.
   */
  public override async execute(...args: A): Promise<void> {
    this._running++;

    try {
      if (is.not.empty(this.message)) {
        const confirmed = await showConfirm.async(this.message);

        if (confirmed) await this._execute(...args);
      } else await this._execute(...args);
    } finally {
      this._running--;
    }
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

  protected message: stringU = undefined;
}
