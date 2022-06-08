import { implementations } from "@";
// eslint-disable-next-line @skylib/consistent-import, import/no-internal-modules -- Ok
import * as handleError from "@/facade-implementations/handle-promise/promise-handler/core/handle-error";
import { evaluate, fn, wait } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";
import type { booleanU } from "@skylib/functions";

const alertFn = evaluate(() => {
  const result = jest.fn();

  globalThis.alert = result;

  return result;
});

const errorSpy = jest.spyOn(handleError, "handleError");

const { promiseHandler } = implementations.handlePromise;

testUtils.installFakeTimer();

test("configure, getConfiguration", () => {
  const expectedDurations = {
    createDb: 1001,
    dbRequest: 1001,
    destroyDb: 1001,
    httpRequest: 1001,
    navigation: 1001
  };

  const getConfiguration = promiseHandler.getConfiguration;

  expect(getConfiguration().expectedDurations.createDb).toBe(1000);
  promiseHandler.configure({ expectedDurations });
  expect(getConfiguration().expectedDurations.createDb).toBe(1001);
});

test("handleError", () => {
  const error = new Error("Sample error");

  expect(() => {
    handleError.handleError(error);
  }).toThrow(error);
});

test("runAll", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    let done: booleanU;

    promiseHandler.silent(wait(1000));
    promiseHandler.runAll().then(fulfilled).catch(rejected);

    {
      expect(done).toBeUndefined();
      await wait(1000);
      expect(done).toBeTrue();
    }

    function fulfilled(): void {
      done = true;
    }

    function rejected(): void {
      done = false;
    }
  });
});

test("running", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    {
      expect(promiseHandler.running()).toBeFalse();
      promiseHandler.silent(wait(1000));
      expect(promiseHandler.running()).toBeTrue();
    }

    {
      await wait(1000);
      expect(promiseHandler.running()).toBeFalse();
    }
  });
});

test("silent: Async", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    promiseHandler.silent(callback);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
    await wait(1000);
    expect("#progressBar").progressToBe(0);

    async function callback(): Promise<void> {
      await wait(2000);
    }
  });
});

test("silent: Error", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const error = new Error("Sample error");

    alertFn.mockImplementationOnce(fn.noop);
    errorSpy.mockImplementationOnce(fn.noop);

    {
      promiseHandler.silent(fail);
      expect(alertFn).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    }

    {
      await wait(1000);
      expect(alertFn).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(error);
    }

    async function fail(): Promise<void> {
      await wait(1000);

      throw error;
    }
  });
});

test("silent: Promise", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    promiseHandler.silent(wait(2000));
    await wait(1000);
    expect("#progressBar").progressToBe(0);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});

test("verbose: Async", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    document.body.innerHTML = '<div id="progressBar">';
    promiseHandler("createDb", callback);
    await wait(1000);
    expect("#progressBar").progressToBe(0.593);
    await wait(1000);
    expect("#progressBar").progressToBe(0);

    async function callback(): Promise<void> {
      await wait(2000);
    }
  });
});

test("verbose: Error", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const error = new Error("Sample error");

    const errorMessage = "Sample error message";

    alertFn.mockImplementationOnce(fn.noop);
    errorSpy.mockImplementationOnce(fn.noop);

    {
      promiseHandler("createDb", fail, errorMessage);
      expect(alertFn).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    }

    {
      await wait(2000);
      expect(alertFn).toHaveBeenCalledTimes(1);
      expect(alertFn).toHaveBeenCalledWith(errorMessage);
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(error);
    }

    async function fail(): Promise<void> {
      await wait(1000);

      throw error;
    }
  });
});

test("verbose: Promise", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    promiseHandler("createDb", wait(2000));
    await wait(1000);
    expect("#progressBar").progressToBe(0.593);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});
