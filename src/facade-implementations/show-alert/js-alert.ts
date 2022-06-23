import { defineFn } from "@skylib/functions";
import type { showAlert } from "@skylib/facades";

export const jsAlert: showAlert.Facade = defineFn(
  (message: string) => {
    // eslint-disable-next-line no-alert -- Ok
    alert(message);
  },
  {
    // eslint-disable-next-line @typescript-eslint/require-await -- Ok
    async: async (message: string) => {
      // eslint-disable-next-line no-alert -- Ok
      alert(message);
    }
  }
);
