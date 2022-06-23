import { defineFn } from "@skylib/functions";
import type { showConfirm } from "@skylib/facades";

export const jsConfirm: showConfirm.Facade = defineFn(
  (message: string, success?: () => void, failure?: () => void) => {
    // eslint-disable-next-line no-alert -- Ok
    if (confirm(message)) success?.();
    else failure?.();
  },
  {
    // eslint-disable-next-line @typescript-eslint/require-await -- Ok
    async: async (message: string) =>
      // eslint-disable-next-line no-alert -- Ok
      confirm(message)
  }
);
