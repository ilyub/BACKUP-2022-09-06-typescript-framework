import { finalEasing, growProgress, moduleConfig } from "./core";
import { a, num, programFlow, set } from "@skylib/functions";
import $ from "jquery";
export class Process {
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
        processes = set.add(processes, this);
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
                growProgress(this.state);
                break;
            case "finalEasing":
                finalEasing(this.state);
                break;
            default:
        }
    }
}
/**
 * Returns progress.
 *
 * @returns Progress.
 */
Object.defineProperty(Process, "getProgress", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => num.round(progress, moduleConfig.precision)
});
/**
 * Resets to initial state.
 */
Object.defineProperty(Process, "reset", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        if (processes.size) {
            processes = new Set();
            progress = 0;
            programFlow.clearTimeout(timeout);
            $(moduleConfig.selector)
                .removeClass(moduleConfig.activeClass)
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
        if (moduleConfig.enabled) {
            const now = Date.now();
            const all = a.fromIterable(processes);
            for (const p of all)
                p.update();
            const count = num.sum(...all.map(p => p.state.weight));
            const total = num.sum(...all.map(p => p.state.weight * p.state.progress));
            const overdue = all.some(p => now >= p.created + moduleConfig.latency);
            const unfinished = all.some(p => p.state.state !== "done");
            if (unfinished) {
                if (overdue) {
                    progress = total / count;
                    $(moduleConfig.selector)
                        .addClass(moduleConfig.activeClass)
                        .css("width", `${100 * Process.getProgress()}%`);
                }
                programFlow.clearTimeout(timeout);
                timeout = programFlow.setTimeout(Process.update, moduleConfig.updateInterval);
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