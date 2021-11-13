/* eslint-disable no-alert */
import * as fn from "@skylib/functions/es/function";
export const implementation = fn.run(() => {
    function jsAlert(message) {
        alert(message);
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    jsAlert.async = async (message) => {
        alert(message);
    };
    return jsAlert;
});
//# sourceMappingURL=jsAlert.js.map