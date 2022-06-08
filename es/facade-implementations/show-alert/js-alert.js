import { defineFn } from "@skylib/functions";
export const jsAlert = defineFn(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(message) => {
    // eslint-disable-next-line no-alert -- Ok
    alert(message);
}, {
    // eslint-disable-next-line @skylib/require-jsdoc, @typescript-eslint/require-await -- Ok
    async: async (message) => {
        // eslint-disable-next-line no-alert -- Ok
        alert(message);
    }
});
//# sourceMappingURL=js-alert.js.map