import { OwnProperty } from "./OwnProperty";
/**
 * Propety decorator. Converts property into enumerable property.
 *
 * @param target - Target object.
 * @param key - Property name.
 * @param mutableDescriptor - Property descriptor.
 */
export function Enumerable(target, key, mutableDescriptor) {
    mutableDescriptor.enumerable = true;
    OwnProperty(target, key);
}
//# sourceMappingURL=Enumerable.js.map