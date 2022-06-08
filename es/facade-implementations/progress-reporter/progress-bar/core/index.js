export const moduleConfig = {
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
export function finalEasing(mutableState) {
    if (moduleConfig.finalEasing) {
        const now = Date.now();
        const delta = (now - mutableState.lastUpdate) / moduleConfig.finalEasingSpeed;
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
/**
 * Grows progress.
 *
 * @param mutableState - Process state.
 */
export function growProgress(mutableState) {
    const now = Date.now();
    const delta = (now - mutableState.lastUpdate) / mutableState.expectedDuration;
    const exp = Math.exp(-delta);
    mutableState.lastUpdate = now;
    mutableState.progress += (1 - mutableState.progress) * (1 - exp);
}
//# sourceMappingURL=index.js.map