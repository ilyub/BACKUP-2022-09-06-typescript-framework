import { defineFn, o, wait } from "@skylib/functions";
export const configurableTestDelay = defineFn(async () => {
    if (moduleConfig.enabled)
        await wait(moduleConfig.timeout);
}, {
    configure: (config) => {
        o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig
});
const moduleConfig = {
    enabled: false,
    timeout: 100
};
//# sourceMappingURL=configurable-test-delay.js.map