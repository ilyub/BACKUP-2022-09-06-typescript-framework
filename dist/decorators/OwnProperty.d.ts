import type { Constructor } from "@skylib/functions/dist/types/core";
/**
 * Property decorator. Converts property into own property.
 *
 * @param target - Target object.
 * @param key - Property name.
 */
export declare function OwnProperty(target: object, key: string): void;
export declare namespace OwnProperty {
    var ClassDecorator: typeof OwnPropertyClassDecorator;
    var resetValidators: typeof OwnPropertyResetValidators;
    var validate: typeof OwnPropertyValidate;
}
/**
 * Class decorator. Converts properties into own properties.
 *
 * @param ctor - Constructor.
 * @returns Constructor.
 */
export declare function OwnPropertyClassDecorator<T extends Constructor<object>>(ctor: T): T;
/**
 * Reset validators.
 */
export declare function OwnPropertyResetValidators(): void;
/**
 * Checks for missing class decorators.
 */
export declare function OwnPropertyValidate(): void;
//# sourceMappingURL=OwnProperty.d.ts.map