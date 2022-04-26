import { o } from "@skylib/functions";
import type { showAlert } from "@skylib/facades";

export const implementation: showAlert.Facade = o.extend(
  (message: string): void => {
    // eslint-disable-next-line no-alert -- ???
    alert(message);
  },
  {
    // eslint-disable-next-line @typescript-eslint/require-await -- ???
    async async(message: string): Promise<void> {
      // eslint-disable-next-line no-alert -- ???
      alert(message);
    }
  }
);
