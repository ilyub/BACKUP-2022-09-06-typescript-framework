import { handlePromise } from "@skylib/facades/dist/handlePromise";
import { progressReporter } from "@skylib/facades/dist/progressReporter";
import * as fn from "@skylib/functions/dist/function";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";
import type { booleanU } from "@skylib/functions/dist/types/core";
import * as promiseHandler from "@/facade-implementations/handlePromise/promiseHandler";

const alertMock = jest.fn();

const errorHandler = jest.spyOn(promiseHandler.handlers, "error");

const testError = new Error("Sample error");

{
  testUtils.installFakeTimer();
  globalThis.alert = alertMock;
}

async function fail(): Promise<void> {
  await wait(500);

  throw testError;
}

test("configure, getConfiguration", () => {
  expect(promiseHandler.getConfiguration().expectedDurations.createDb).toBe(
    1000
  );

  promiseHandler.configure({
    expectedDurations: {
      ...promiseHandler.getConfiguration().expectedDurations,
      createDb: 1001
    }
  });

  expect(promiseHandler.getConfiguration().expectedDurations.createDb).toBe(
    1001
  );
});

test("handlers.error", () => {
  expect(() => {
    promiseHandler.handlers.error("Sample error");
  }).toThrow(testError);
});

test("runAll", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    let done: booleanU;

    {
      handlePromise.silent(wait(1000));
      // eslint-disable-next-line github/no-then -- ???
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

test("running", async () => {
  expect.hasAssertions();

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

test("silent: Async", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    handlePromise.silent(async () => {
      await wait(1500);
    });

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0);
    }
  });
});

test("silent: Error", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    alertMock.mockImplementationOnce(fn.noop);
    errorHandler.mockImplementationOnce(fn.noop);

    {
      handlePromise.silent(fail);
      expect(alertMock).not.toHaveBeenCalled();
      expect(errorHandler).not.toHaveBeenCalled();
    }

    {
      await wait(1000);
      expect(alertMock).not.toHaveBeenCalled();
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledWith(testError);
    }
  });
});

test("silent: Promise", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    handlePromise.silent(wait(1500));

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0);
    }
  });
});

test("verbose: Async", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    handlePromise.verbose(async () => {
      await wait(1500);
    }, "createDb");

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0.551);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0);
    }
  });
});

test("verbose: Error", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const errorMessage = "Sample error message";

    alertMock.mockImplementationOnce(fn.noop);
    errorHandler.mockImplementationOnce(fn.noop);

    {
      handlePromise.verbose(fail, "createDb", errorMessage);
      expect(alertMock).not.toHaveBeenCalled();
      expect(errorHandler).not.toHaveBeenCalled();
    }

    {
      await wait(1500);
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith(errorMessage);
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledWith(testError);
    }
  });
});

test("verbose: Promise", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    handlePromise.verbose(wait(1500), "createDb");

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0.551);
    }

    {
      await wait(1000);
      expect(progressReporter.getProgress()).toBe(0);
    }
  });
});
