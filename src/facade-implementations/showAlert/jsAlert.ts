import type { Facade } from "@skylib/facades/dist/showAlert";
import * as o from "@skylib/functions/dist/object";

export const implementation: Facade = o.extend(
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
