import { OwnProperty } from "./OwnProperty";

/**
 * Propety decorator. Converts property into enumerable property.
 *
 * @param target - Target object.
 * @param key - Property name.
 * @param mutableDescriptor - Property descriptor.
 */
export function Enumerable(
  target: object,
  key: string,
  mutableDescriptor: PropertyDescriptor
): void {
  mutableDescriptor.enumerable = true;
  OwnProperty(target, key);
}
