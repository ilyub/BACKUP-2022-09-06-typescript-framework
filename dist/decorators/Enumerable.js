"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enumerable = void 0;
const OwnProperty_1 = require("./OwnProperty");
/**
 * Propety decorator. Converts property into enumerable property.
 *
 * @param target - Target object.
 * @param key - Property name.
 * @param mutableDescriptor - Property descriptor.
 */
function Enumerable(target, key, mutableDescriptor) {
    mutableDescriptor.enumerable = true;
    (0, OwnProperty_1.OwnProperty)(target, key);
}
exports.Enumerable = Enumerable;
//# sourceMappingURL=Enumerable.js.map