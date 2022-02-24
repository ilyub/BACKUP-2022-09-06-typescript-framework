import type { Facade } from "@skylib/facades/dist/showAlert";
import * as fn from "@skylib/functions/dist/function";

export const implementation = fn.run<Facade>(() => {
  function jsAlert(message: string): void {
    // eslint-disable-next-line no-alert
    alert(message);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  jsAlert.async = async (message: string): Promise<void> => {
    // eslint-disable-next-line no-alert
    alert(message);
  };

  return jsAlert;
});
