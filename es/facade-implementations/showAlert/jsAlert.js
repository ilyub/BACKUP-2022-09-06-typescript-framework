import * as fn from "@skylib/functions/es/function";
export const implementation = fn.run(() => {
    function jsAlert(message) {
        // eslint-disable-next-line no-alert
        alert(message);
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    jsAlert.async = async (message) => {
        // eslint-disable-next-line no-alert
        alert(message);
    };
    return jsAlert;
});
//# sourceMappingURL=jsAlert.js.map