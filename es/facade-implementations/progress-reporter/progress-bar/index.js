import { Process } from "./Process";
import { moduleConfig } from "./core";
import { o } from "@skylib/functions";
export const progressBar = {
    configure: config => {
        o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig,
    getProgress: Process.getProgress,
    reset: Process.reset,
    spawn: () => new Process()
};
//# sourceMappingURL=index.js.map