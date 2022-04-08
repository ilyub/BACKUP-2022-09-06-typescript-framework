import type { Facade } from "@skylib/facades/dist/showConfirm";
import * as o from "@skylib/functions/dist/object";

export const implementation: Facade = o.extend(
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
