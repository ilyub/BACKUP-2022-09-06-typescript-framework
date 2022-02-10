/* eslint-disable no-alert */

import type { Facade } from "@skylib/facades/dist/showConfirm";
import * as fn from "@skylib/functions/dist/function";

export const implementation = fn.run<Facade>(() => {
  function jsConfirm(
    message: string,
    success?: () => void,
    failure?: () => void
  ): void {
    if (confirm(message)) success?.();
    else failure?.();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  jsConfirm.async = async (message: string): Promise<boolean> =>
    confirm(message);

  return jsConfirm;
});
