import { o } from "@skylib/functions";
export const implementation = o.extend((message) => {
    // eslint-disable-next-line no-alert -- ???
    alert(message);
}, {
    // eslint-disable-next-line @typescript-eslint/require-await -- ???
    async async(message) {
        // eslint-disable-next-line no-alert -- ???
        alert(message);
    }
});
//# sourceMappingURL=jsAlert.js.map