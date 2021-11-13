import $ from "jquery";
import * as num from "@skylib/functions/es/number";
import * as o from "@skylib/functions/es/object";
import * as timer from "@skylib/functions/es/timer";
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
export const implementation = {
    getProgress() {
        return num.round(progress, moduleConfig.precision);
    },
    reset() {
        lastEasingUpdate = 0;
        processesPool.clear();
        progress = 0;
        timer.removeTimeout(timeout);
        $(moduleConfig.selector).removeClass("x-active").css("width", "");
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
        Object.defineProperty(this, "lastAutoGrow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Date.now()
        });
        Object.defineProperty(this, "progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "manual"
        });
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
    /*
    |*****************************************************************************
    |* Protected
    |*****************************************************************************
    |*/
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
                    implementation.reset();
            }
            else
                implementation.reset();
            if (progress)
                $(moduleConfig.selector)
                    .addClass("x-active")
                    .css("width", `${100 * implementation.getProgress()}%`);
        }
        else if (anyUnfinished) {
            // Keep waiting
        }
        else
            implementation.reset();
        if (processesPool.size) {
            timer.removeTimeout(timeout);
            timeout = timer.addTimeout(Process.update, moduleConfig.updateInterval);
        }
    }
}
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
let lastEasingUpdate = 0;
const moduleConfig = {
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
let timeout = undefined;
//# sourceMappingURL=progressBar.js.map