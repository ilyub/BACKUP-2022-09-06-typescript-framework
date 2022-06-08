"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.growProgress = exports.finalEasing = exports.moduleConfig = void 0;
exports.moduleConfig = {
    activeClass: "progress-bar-active",
    enabled: true,
    finalEasing: true,
    finalEasingSpeed: 500,
    latency: 0,
    precision: 3,
    selector: "#progressBar",
    updateInterval: 100
};
/**
 * Performs final easing.
 *
 * @param mutableState - Process state.
 */
function finalEasing(mutableState) {
    if (exports.moduleConfig.finalEasing) {
        const now = Date.now();
        const delta = (now - mutableState.lastUpdate) / exports.moduleConfig.finalEasingSpeed;
        mutableState.lastUpdate = now;
        mutableState.progress += delta;
        if (mutableState.progress > 1) {
            mutableState.state = "done";
            mutableState.progress = 1;
        }
    }
    else {
        mutableState.state = "done";
        mutableState.progress = 1;
    }
}
exports.finalEasing = finalEasing;
/**
 * Grows progress.
 *
 * @param mutableState - Process state.
 */
function growProgress(mutableState) {
    const now = Date.now();
    const delta = (now - mutableState.lastUpdate) / mutableState.expectedDuration;
    const exp = Math.exp(-delta);
    mutableState.lastUpdate = now;
    mutableState.progress += (1 - mutableState.progress) * (1 - exp);
}
exports.growProgress = growProgress;
//# sourceMappingURL=index.js.map