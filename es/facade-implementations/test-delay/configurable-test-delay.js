import { wait, o, defineFn } from "@skylib/functions";
export const configurableTestDelay = defineFn(async () => {
    if (moduleConfig.enabled)
        await wait(moduleConfig.timeout);
}, {
    configure(config) {
        o.assign(moduleConfig, config);
    },
    getConfiguration() {
        return moduleConfig;
    }
});
const moduleConfig = {
    enabled: false,
    timeout: 100
};
//# sourceMappingURL=configurable-test-delay.js.map