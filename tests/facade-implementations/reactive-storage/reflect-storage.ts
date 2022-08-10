/* eslint-disable @skylib/typescript/prefer-readonly-property -- Ok */
/* eslint-disable @typescript-eslint/no-unsafe-return -- Ok */

import { implementations } from "@";
import type { reactiveStorage } from "@skylib/facades";

const { reflectStorage } = implementations.reactiveStorage;

interface TestObject {
  x: number;
  y: TestSubObject;
}

interface TestSubObject {
  z: number;
}

test.each([
  {
    expected: [[{ x: 1, y: { z: 0 } }]],
    subtest: (obj: TestObject) => {
      obj.x = 1;
    }
  },
  {
    expected: [[{ x: 1, y: { z: 0 } }]],
    reducer: (obj: TestObject) => obj.x,
    subtest: (obj: TestObject) => {
      obj.x = 1;
    }
  },
  {
    expected: [[{ x: 0, y: { z: 1 } }]],
    subtest: (obj: TestObject) => {
      obj.y.z = 1;
    }
  },
  {
    expected: [],
    reducer: (obj: TestObject) => obj.x,
    subtest: (obj: TestObject) => {
      obj.y.z = 1;
    }
  },
  {
    expected: [],
    subtest: (obj: TestObject, observer: reactiveStorage.Observer) => {
      reflectStorage.unwatch(obj, observer);
      obj.x = 1;
      obj.y.z = 1;
    }
  },
  {
    expected: new Error(
      "'set' on proxy: trap returned falsish for property 'x'"
    ),
    expectedToThrow: true,
    subtest: (obj: TestObject) => {
      Object.freeze(obj);
      obj.x = 3;
    }
  }
])("watch, unwatch", ({ expected, expectedToThrow, reducer, subtest }) => {
  const callback = jest.fn();

  const obj = reflectStorage(reflectStorage<TestObject>({ x: 0, y: { z: 0 } }));

  const observer = reflectStorage.watch(obj, callback, reducer);

  expect(() => {
    subtest(obj, observer);

    return callback.mock.calls;
  }).executionResultToBe(expected, expectedToThrow);
});
