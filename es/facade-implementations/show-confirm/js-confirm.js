import { defineFn } from "@skylib/functions";
export const jsConfirm = defineFn((message, success, failure) => {
    // eslint-disable-next-line no-alert -- Ok
    if (confirm(message))
        success === null || success === void 0 ? void 0 : success();
    else
        failure === null || failure === void 0 ? void 0 : failure();
}, {
    // eslint-disable-next-line @typescript-eslint/require-await -- Ok
    async async(message) {
        // eslint-disable-next-line no-alert -- Ok
        return confirm(message);
    }
});
//# sourceMappingURL=js-confirm.js.map