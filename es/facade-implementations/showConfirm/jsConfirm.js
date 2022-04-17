import { o } from "@skylib/functions";
export const implementation = o.extend((message, success, failure) => {
    // eslint-disable-next-line no-alert -- ???
    if (confirm(message))
        success === null || success === void 0 ? void 0 : success();
    else
        failure === null || failure === void 0 ? void 0 : failure();
}, {
    // eslint-disable-next-line @typescript-eslint/require-await -- ???
    async: async (message) => 
    // eslint-disable-next-line no-alert -- ???
    confirm(message)
});
//# sourceMappingURL=jsConfirm.js.map