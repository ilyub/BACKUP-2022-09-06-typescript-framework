"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressBar = void 0;
const Process_1 = require("./Process");
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
exports.progressBar = {
    configure: config => {
        functions_1.o.assign(core_1.moduleConfig, config);
    },
    getConfiguration: () => core_1.moduleConfig,
    getProgress: Process_1.Process.getProgress,
    reset: Process_1.Process.reset,
    spawn: () => new Process_1.Process()
};
//# sourceMappingURL=index.js.map