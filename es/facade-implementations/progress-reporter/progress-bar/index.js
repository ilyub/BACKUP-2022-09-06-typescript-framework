import { Process } from "./Process";
import { moduleConfig } from "./core";
import { o } from "@skylib/functions";
export const progressBar = {
    configure(config) {
        o.assign(moduleConfig, config);
    },
    getConfiguration() {
        return moduleConfig;
    },
    getProgress: Process.getProgress,
    reset: Process.reset,
    spawn() {
        return new Process();
    }
};
//# sourceMappingURL=index.js.map