import { defineFn, o, wait } from "@skylib/functions";
export const configurableTestDelay = defineFn(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
async () => {
    if (moduleConfig.enabled)
        await wait(moduleConfig.timeout);
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    configure: (config) => {
        o.assign(moduleConfig, config);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    getConfiguration: () => moduleConfig
});
const moduleConfig = {
    enabled: false,
    timeout: 100
};
//# sourceMappingURL=configurable-test-delay.js.map