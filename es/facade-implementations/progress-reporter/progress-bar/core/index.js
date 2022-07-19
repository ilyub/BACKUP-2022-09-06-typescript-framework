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
export var State;
(function (State) {
    State["auto"] = "auto";
    State["done"] = "done";
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Ok
    State["finalEasing"] = "finalEasing";
    State["manual"] = "manual";
})(State || (State = {}));
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
            mutableState.state = State.done;
            mutableState.progress = 1;
        }
    }
    else {
        mutableState.state = State.done;
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