"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnPropertyValidate = exports.OwnPropertyResetValidators = exports.OwnPropertyClassDecorator = exports.OwnProperty = void 0;
const tslib_1 = require("tslib");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const reflect = (0, tslib_1.__importStar)(require("@skylib/functions/dist/reflect"));
/**
 * Property decorator. Converts property into own property.
 *
 * @param target - Target object.
 * @param key - Property name.
 */
function OwnProperty(target, key) {
    const ctor = target.constructor;
    getOwnProperties(ctor).push(key);
    validatorsStack.push(() => {
        assert.toBeTrue(hasFlag(ctor), `Missing OwnProperty.ClassDecorator: ${ctor.name}`);
    });
}
exports.OwnProperty = OwnProperty;
/**
 * Class decorator. Converts properties into own properties.
 *
 * @param ctor - Constructor.
 * @returns Constructor.
 */
function OwnPropertyClassDecorator(ctor) {
    setFlag(ctor);
    class OwnPropertyWrapper extends ctor {
        /**
         * Creates class instance.
         *
         * @param args - Arguments.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            super(...args);
            const properties = getOwnProperties(ctor);
            assert.toBeTrue(properties.length > 0, `Unnecessary OwnProperty.ClassDecorator: ${ctor.name}`);
            for (const property of properties) {
                const descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, property);
                assert.not.empty(descriptor, `Missing descriptor: ${ctor.name}.${property}`);
                Object.defineProperty(this, property, descriptor);
            }
        }
    }
    return OwnPropertyWrapper;
}
exports.OwnPropertyClassDecorator = OwnPropertyClassDecorator;
OwnProperty.ClassDecorator = OwnPropertyClassDecorator;
/**
 * Reset validators.
 */
function OwnPropertyResetValidators() {
    a.truncate(validatorsStack);
}
exports.OwnPropertyResetValidators = OwnPropertyResetValidators;
OwnProperty.resetValidators = OwnPropertyResetValidators;
/**
 * Checks for missing class decorators.
 */
function OwnPropertyValidate() {
    for (const validator of validatorsStack)
        validator();
}
exports.OwnPropertyValidate = OwnPropertyValidate;
OwnProperty.validate = OwnPropertyValidate;
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const flagKey = Symbol("FlagKey");
const ownPropertiesKey = Symbol("OwnPropertiesKey");
const validatorsStack = [];
/**
 * Stores own properties as a metadata.
 *
 * @param ctor - Constructor.
 * @returns Editable array of own properties.
 */
function getOwnProperties(ctor) {
    if (reflect.hasOwnMetadata(ownPropertiesKey, ctor))
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return reflect.getOwnMetadata(ownPropertiesKey, ctor);
    const result = [];
    reflect.defineMetadata(ownPropertiesKey, result, ctor);
    return result;
}
/**
 * Checks if class decorator flag is set.
 *
 * @param ctor - Constructor.
 * @returns _True_ if class decorator flag is set, _false_ otherwise.
 */
function hasFlag(ctor) {
    return reflect.getOwnMetadata(flagKey, ctor) === true;
}
/**
 * Sets class decorator flag.
 *
 * @param ctor - Constructor.
 */
function setFlag(ctor) {
    reflect.defineMetadata(flagKey, true, ctor);
}
//# sourceMappingURL=OwnProperty.js.map