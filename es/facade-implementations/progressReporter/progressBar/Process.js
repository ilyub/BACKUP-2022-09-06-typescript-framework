import { num, o, programFlow } from "@skylib/functions";
import $ from "jquery";
export const facade = {
    getProgress() {
        return num.round(progress, moduleConfig.precision);
    },
    reset() {
        lastEasingUpdate = 0;
        processesPool.clear();
        progress = 0;
        programFlow.clearTimeout(timeout);
        $(moduleConfig.selector)
            .removeClass(moduleConfig.activeClass)
            .css("width", "");
    },
    spawn() {
        return new Process();
    }
};
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
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "expectedDuration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Symbol("ProgressiveProcessId")
        });
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "lastAutoGrow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Date.now()
        });
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "manual"
        });
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "weight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        processesPool.set(this.id, this);
        Process.update();
    }
    done() {
        this.state = "done";
        this.progress = 1;
        Process.update();
        return this;
    }
    setAuto(expectedDuration) {
        this.state = "auto";
        this.expectedDuration = expectedDuration;
        this.lastAutoGrow = Date.now();
        Process.update();
        return this;
    }
    setProgress(value) {
        this.state = "manual";
        this.progress = value;
        Process.update();
        return this;
    }
    setWeight(value) {
        this.weight = value;
        Process.update();
        return this;
    }
    /**
     * Updates progress bar state.
     *
     * @param this - This argument.
     */
    static update() {
        const now = Date.now();
        let count = 0;
        let total = 0;
        let anyOverdue = false;
        let anyUnfinished = false;
        for (const staged of processesPool.values()) {
            count += staged.weight;
            total += staged.weight * staged.progress;
            if (moduleConfig.enabled && now >= staged.created + moduleConfig.latency)
                anyOverdue = true;
            switch (staged.state) {
                case "auto":
                    anyUnfinished = true;
                    {
                        const exp = Math.exp((staged.lastAutoGrow - now) / staged.expectedDuration);
                        staged.progress += (1 - staged.progress) * (1 - exp);
                        staged.lastAutoGrow = now;
                    }
                    break;
                case "manual":
                    anyUnfinished = true;
                    break;
                case "done":
            }
        }
        if (anyOverdue) {
            if (anyUnfinished)
                progress = total / count;
            else if (progress && moduleConfig.finalEasing) {
                if (lastEasingUpdate)
                    progress += (now - lastEasingUpdate) / moduleConfig.finalEasingSpeed;
                lastEasingUpdate = now;
                if (progress > 1)
                    facade.reset();
            }
            else
                facade.reset();
            if (progress)
                $(moduleConfig.selector)
                    .addClass(moduleConfig.activeClass)
                    .css("width", `${100 * facade.getProgress()}%`);
        }
        else if (anyUnfinished) {
            // Keep waiting
        }
        else
            facade.reset();
        if (processesPool.size) {
            programFlow.clearTimeout(timeout);
            timeout = programFlow.setTimeout(Process.update, moduleConfig.updateInterval);
        }
    }
}
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure(config) {
    o.assign(moduleConfig, config);
}
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration() {
    return moduleConfig;
}
let lastEasingUpdate = 0;
const moduleConfig = {
    activeClass: "progress-bar-active",
    enabled: false,
    finalEasing: false,
    finalEasingSpeed: 500,
    latency: 0,
    precision: 3,
    selector: "#progressBar",
    updateInterval: 100
};
const processesPool = new Map();
let progress = 0;
let timeout;
//# sourceMappingURL=Process.js.map