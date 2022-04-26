import { o } from "@skylib/functions";
import type { showConfirm } from "@skylib/facades";

export const implementation: showConfirm.Facade = o.extend(
  (message: string, success?: () => void, failure?: () => void): void => {
    // eslint-disable-next-line no-alert -- ???
    if (confirm(message)) success?.();
    else failure?.();
  },
  {
    // eslint-disable-next-line @typescript-eslint/require-await -- ???
    async: async (message: string): Promise<boolean> =>
      // eslint-disable-next-line no-alert -- ???
      confirm(message)
  }
);
