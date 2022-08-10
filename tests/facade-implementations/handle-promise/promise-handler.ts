/* eslint jest/max-expects: [warn, { max: 2 }] -- Ok */
/* eslint-disable @skylib/consistent-import -- Ok */
/* eslint-disable @skylib/no-at-sign-internal-import -- Ok */
/* eslint-disable @skylib/no-internal-modules -- Ok */
/* eslint-disable github/no-inner-html -- Ok */

import * as handleError from "@/facade-implementations/handle-promise/promise-handler/core/handle-error";
import * as testUtils from "@skylib/functions/dist/test-utils";
import { evaluate, fn, wait } from "@skylib/functions";
import { PromiseType } from "@skylib/facades";
import { implementations } from "@";

const alertFn = evaluate(() => {
  const result = jest.fn();

  globalThis.alert = result;

  return result;
});

const errorFn = jest.spyOn(handleError, "handleError");

const { promiseHandler } = implementations.handlePromise;

testUtils.installFakeTimer();

async function failure(): Promise<void> {
  await wait(2000);

  throw new Error("Sample error");
}

async function success(): Promise<void> {
  await wait(2000);
}

test.each([
  {
    config: {},
    expected: {
      createDb: 1000,
      dbRequest: 1000,
      destroyDb: 1000,
      httpRequest: 1000,
      navigation: 1000
    }
  },
  {
    config: {
      expectedDurations: {
        createDb: 1001,
        dbRequest: 1001,
        destroyDb: 1001,
        httpRequest: 1001,
        navigation: 1001
      }
    },
    expected: {
      createDb: 1001,
      dbRequest: 1001,
      destroyDb: 1001,
      httpRequest: 1001,
      navigation: 1001
    }
  }
])("configure, getConfiguration", ({ config, expected }) => {
  promiseHandler.configure(config);
  expect(promiseHandler.getConfiguration().expectedDurations).toStrictEqual(
    expected
  );
});

test("handleError", () => {
  const error = new Error("Sample error");

  expect(() => {
    handleError.handleError(error);
  }).toThrow(error);
});

test.each([
  { expected: 0.593, timeout: 1000 },
  { expected: 0, timeout: 2000 }
])("promiseHandler", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    document.body.innerHTML = '<div id="progressBar">';
    promiseHandler(PromiseType.createDb, success);
    await wait(timeout);
    expect("#progressBar").progressToBe(expected);
  });
});

test.each([
  { expectedAlert: [], expectedError: [], timeout: 1000 },
  {
    expectedAlert: [["Sample error message"]],
    expectedError: [[new Error("Sample error")]],
    timeout: 2000
  }
])(
  "promiseHandler: Error",
  async ({ expectedAlert, expectedError, timeout }) => {
    expect.hasAssertions();
    await testUtils.run(async () => {
      promiseHandler(PromiseType.createDb, failure, "Sample error message");
      alertFn.mockImplementationOnce(fn.noop);
      errorFn.mockImplementationOnce(fn.noop);
      await wait(timeout);
      expect(alertFn).mockCallsToBe(...expectedAlert);
      expect(errorFn).mockCallsToBe(...expectedError);
    });
  }
);

test("promiseHandler.silent", async () => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    promiseHandler.silent(success);
    await wait(2000);
    expect("#progressBar").progressToBe(0);
  });
});

test.each([
  { expected: [], timeout: 1000 },
  { expected: [[new Error("Sample error")]], timeout: 2000 }
])("promiseHandler.silent: Error", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    promiseHandler.silent(failure);
    errorFn.mockImplementationOnce(fn.noop);
    await wait(timeout);
    expect(errorFn).mockCallsToBe(...expected);
  });
});

test.each([
  { expected: [], timeout: 1000 },
  { expected: [[]], timeout: 2000 }
])("runAll", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    const fulfilled = jest.fn();

    const rejected = jest.fn();

    promiseHandler.silent(wait(2000));
    promiseHandler.runAll().then(fulfilled).catch(rejected);
    await wait(timeout);
    expect(fulfilled).mockCallsToBe(...expected);
    expect(rejected).mockCallsToBe();
  });
});

test.each([
  { expected: true, timeout: 1000 },
  { expected: false, timeout: 2000 }
])("running", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    promiseHandler.silent(wait(2000));
    await wait(timeout);
    expect(promiseHandler.running()).toBe(expected);
  });
});
