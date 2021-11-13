"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeDefined = void 0;
const tslib_1 = require("tslib");
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
const reflect = (0, tslib_1.__importStar)(require("@skylib/functions/dist/reflect"));
const MustBeDefinedError_1 = require("./errors/MustBeDefinedError");
const OwnProperty_1 = require("./OwnProperty");
/**
 * Property decorator. Ensures that property is defined before being used.
 *
 * @param target - Target object.
 * @param key - Property name.
 */
function MustBeDefined(target, key) {
    o.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        get() {
            const result = reflect.getOwnMetadataKey(metadataKey, this, key);
            assert.not.undefined(result, () => new MustBeDefinedError_1.MustBeDefinedError(`Property must be defined: ${target.constructor.name}.${key}`));
            return result;
        },
        set(value) {
            reflect.defineMetadataKey(metadataKey, value, this, key);
        }
    });
    (0, OwnProperty_1.OwnProperty)(target, key);
}
exports.MustBeDefined = MustBeDefined;
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const metadataKey = Symbol("MetadataKey");
//# sourceMappingURL=MustBeDefined.js.map