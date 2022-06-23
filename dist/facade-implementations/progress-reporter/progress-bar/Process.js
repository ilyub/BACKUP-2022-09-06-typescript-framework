"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const tslib_1 = require("tslib");
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
class Process {
    /**
     * Creates class instance.
     */
    constructor() {
        Object.defineProperty(this, "created", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Date.now()
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                expectedDuration: 0,
                lastUpdate: Date.now(),
                progress: 0,
                state: "manual",
                weight: 1
            }
        });
        processes = functions_1.set.add(processes, this);
        Process.update();
    }
    done() {
        this.state.state = "finalEasing";
        this.state.lastUpdate = Date.now();
        Process.update();
        return this;
    }
    setAuto(expectedDuration) {
        this.state.state = "auto";
        this.state.expectedDuration = expectedDuration;
        this.state.lastUpdate = Date.now();
        Process.update();
        return this;
    }
    setProgress(value) {
        this.state.state = "manual";
        this.state.progress = value;
        Process.update();
        return this;
    }
    setWeight(value) {
        this.state.weight = value;
        Process.update();
        return this;
    }
    /**
     * Updates internal state.
     */
    update() {
        switch (this.state.state) {
            case "auto":
                (0, core_1.growProgress)(this.state);
                break;
            case "finalEasing":
                (0, core_1.finalEasing)(this.state);
                break;
            default:
        }
    }
}
exports.Process = Process;
/**
 * Returns progress.
 *
 * @returns Progress.
 */
Object.defineProperty(Process, "getProgress", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => functions_1.num.round(progress, core_1.moduleConfig.precision)
});
/**
 * Resets to initial state.
 */
Object.defineProperty(Process, "reset", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        if (processes.size > 0) {
            processes = new Set();
            progress = 0;
            functions_1.programFlow.clearTimeout(timeout);
            (0, jquery_1.default)(core_1.moduleConfig.selector)
                .removeClass(core_1.moduleConfig.activeClass)
                .css("width", "");
        }
    }
});
/**
 * Updates progress bar state.
 */
Object.defineProperty(Process, "update", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        if (core_1.moduleConfig.enabled) {
            const now = Date.now();
            const all = functions_1.a.fromIterable(processes);
            for (const p of all)
                p.update();
            const count = functions_1.num.sum(...all.map(p => p.state.weight));
            const total = functions_1.num.sum(...all.map(p => p.state.weight * p.state.progress));
            const overdue = all.some(p => now >= p.created + core_1.moduleConfig.latency);
            const unfinished = all.some(p => p.state.state !== "done");
            if (unfinished) {
                if (overdue) {
                    progress = total / count;
                    (0, jquery_1.default)(core_1.moduleConfig.selector)
                        .addClass(core_1.moduleConfig.activeClass)
                        .css("width", `${100 * Process.getProgress()}%`);
                }
                functions_1.programFlow.clearTimeout(timeout);
                timeout = functions_1.programFlow.setTimeout(Process.update, core_1.moduleConfig.updateInterval);
            }
            else
                Process.reset();
        }
        else
            Process.reset();
    }
});
let processes = new Set();
let progress = 0;
let timeout;
//# sourceMappingURL=Process.js.map