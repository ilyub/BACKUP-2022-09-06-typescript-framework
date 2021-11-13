import * as assert from "@skylib/functions/es/assertions";
import * as o from "@skylib/functions/es/object";
import * as reflect from "@skylib/functions/es/reflect";
import { MustBeDefinedError } from "./errors/MustBeDefinedError";
import { OwnProperty } from "./OwnProperty";
/**
 * Property decorator. Ensures that property is defined before being used.
 *
 * @param target - Target object.
 * @param key - Property name.
 */
export function MustBeDefined(target, key) {
    o.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        get() {
            const result = reflect.getOwnMetadataKey(metadataKey, this, key);
            assert.not.undefined(result, () => new MustBeDefinedError(`Property must be defined: ${target.constructor.name}.${key}`));
            return result;
        },
        set(value) {
            reflect.defineMetadataKey(metadataKey, value, this, key);
        }
    });
    OwnProperty(target, key);
}
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const metadataKey = Symbol("MetadataKey");
//# sourceMappingURL=MustBeDefined.js.map