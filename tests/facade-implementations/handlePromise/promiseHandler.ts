/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import { handlePromise } from "@skylib/facades/dist/handlePromise";
import { progressReporter } from "@skylib/facades/dist/progressReporter";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";
import type { booleanU } from "@skylib/functions/dist/types/core";

import * as promiseHandler from "@/facade-implementations/handlePromise/promiseHandler";

const alertMock = jest.fn();

const errorHandler = jest.spyOn(promiseHandler.handlers, "error");

const testError = new Error("Sample error");

async function fail(): Promise<void> {
  await wait(500);

  throw testError;
}

{
  testUtils.installFakeTimer();
  globalThis.alert = alertMock;
}

it("configure, getConfiguration", () => {
  expect(
    promiseHandler.getConfiguration().expectedDurations.createDb
  ).toStrictEqual(1000);

  promiseHandler.configure({
    expectedDurations: {
      ...promiseHandler.getConfiguration().expectedDurations,
      createDb: 1001
    }
  });

  expect(
    promiseHandler.getConfiguration().expectedDurations.createDb
  ).toStrictEqual(1001);
});

it("handlers.error", () => {
  expect(() => {
    promiseHandler.handlers.error("Sample error");
  }).toThrow(testError);
});

it("runAll", async () => {
  await testUtils.run(async () => {
    let done: booleanU = undefined;

    {
      handlePromise.silent(wait(1000));
      handlePromise.runAll().then(fulfilled).catch(rejected);
      expect(done).toBeUndefined();
    }

    {
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

it("running", async () => {
  await testUtils.run(async () => {
    {
      expect(handlePromise.running()).toBeFalse();
      handlePromise.silent(wait(500));
      expect(handlePromise.running()).toBeTrue();
    }

    {
      await wait(1000);
      expect(handlePromise.running()).toBeFalse();
    }
  });
});

it("silent: Async", async () => {
  await testUtils.run(async () => {
    handlePromise.silent(async () => wait(1500));

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }
  });
});

it("silent: Error", async () => {
  await testUtils.run(async () => {
    alertMock.mockImplementationOnce(() => {});
    errorHandler.mockImplementationOnce(() => {});

    {
      handlePromise.silent(fail);
      expect(alertMock).not.toBeCalled();
      expect(errorHandler).not.toBeCalled();
    }

    {
      await wait(1000);
      expect(alertMock).not.toBeCalled();
      expect(errorHandler).toBeCalledTimes(1);
      expect(errorHandler).toBeCalledWith(testError);
    }
  });
});

it("silent: Promise", async () => {
  await testUtils.run(async () => {
    handlePromise.silent(wait(1500));

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }
  });
});

it("verbose: Async", async () => {
  await testUtils.run(async () => {
    handlePromise.verbose(async () => wait(1500), "createDb");

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0.551);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }
  });
});

it("verbose: Error", async () => {
  await testUtils.run(async () => {
    const errorMessage = "Sample error message";

    alertMock.mockImplementationOnce(() => {});
    errorHandler.mockImplementationOnce(() => {});

    {
      handlePromise.verbose(fail, "createDb", errorMessage);
      expect(alertMock).not.toBeCalled();
      expect(errorHandler).not.toBeCalled();
    }

    {
      await wait(1500);
      expect(alertMock).toBeCalledTimes(1);
      expect(alertMock).toBeCalledWith(errorMessage);
      expect(errorHandler).toBeCalledTimes(1);
      expect(errorHandler).toBeCalledWith(testError);
    }
  });
});

it("verbose: Promise", async () => {
  await testUtils.run(async () => {
    handlePromise.verbose(wait(1500), "createDb");

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0.551);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }
  });
});
