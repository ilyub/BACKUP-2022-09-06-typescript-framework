import * as a from "@skylib/functions/dist/array";
import * as assert from "@skylib/functions/dist/assertions";
import * as reflect from "@skylib/functions/dist/reflect";
import type {
  Constructor,
  strings,
  Writable
} from "@skylib/functions/dist/types/core";

/**
 * Property decorator. Converts property into own property.
 *
 * @param target - Target object.
 * @param key - Property name.
 */
export function OwnProperty(target: object, key: string): void {
  const ctor = target.constructor;

  getOwnProperties(ctor).push(key);

  validatorsStack.push(() => {
    assert.toBeTrue(
      hasFlag(ctor),
      `Missing OwnProperty.ClassDecorator: ${ctor.name}`
    );
  });
}

/**
 * Class decorator. Converts properties into own properties.
 *
 * @param ctor - Constructor.
 * @returns Constructor.
 */
export function OwnPropertyClassDecorator<T extends Constructor<object>>(
  ctor: T
): T {
  setFlag(ctor);

  class OwnPropertyWrapper extends ctor {
    /**
     * Creates class instance.
     *
     * @param args - Arguments.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);

      const properties = getOwnProperties(ctor);

      assert.toBeTrue(
        properties.length > 0,
        `Unnecessary OwnProperty.ClassDecorator: ${ctor.name}`
      );

      for (const property of properties) {
        const descriptor = Object.getOwnPropertyDescriptor(
          ctor.prototype,
          property
        );

        assert.not.empty(
          descriptor,
          `Missing descriptor: ${ctor.name}.${property}`
        );
        Object.defineProperty(this, property, descriptor);
      }
    }
  }

  return OwnPropertyWrapper;
}

OwnProperty.ClassDecorator = OwnPropertyClassDecorator;

/**
 * Reset validators.
 */
export function OwnPropertyResetValidators(): void {
  a.truncate(validatorsStack);
}

OwnProperty.resetValidators = OwnPropertyResetValidators;

/**
 * Checks for missing class decorators.
 */
export function OwnPropertyValidate(): void {
  for (const validator of validatorsStack) validator();
}

OwnProperty.validate = OwnPropertyValidate;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

const flagKey = Symbol("FlagKey");

const ownPropertiesKey = Symbol("OwnPropertiesKey");

const validatorsStack: Array<() => void> = [];

/**
 * Stores own properties as a metadata.
 *
 * @param ctor - Constructor.
 * @returns Editable array of own properties.
 */
function getOwnProperties(ctor: Function): Writable<strings> {
  if (reflect.hasOwnMetadata(ownPropertiesKey, ctor))
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return reflect.getOwnMetadata(ownPropertiesKey, ctor) as Writable<strings>;

  const result: Writable<strings> = [];

  reflect.defineMetadata(ownPropertiesKey, result, ctor);

  return result;
}

/**
 * Checks if class decorator flag is set.
 *
 * @param ctor - Constructor.
 * @returns _True_ if class decorator flag is set, _false_ otherwise.
 */
function hasFlag(ctor: Function): boolean {
  return reflect.getOwnMetadata(flagKey, ctor) === true;
}

/**
 * Sets class decorator flag.
 *
 * @param ctor - Constructor.
 */
function setFlag(ctor: Function): void {
  reflect.defineMetadata(flagKey, true, ctor);
}
