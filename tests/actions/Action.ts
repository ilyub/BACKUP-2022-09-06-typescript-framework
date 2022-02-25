import type { TaskType } from "@skylib/facades/dist/handlePromise";
import { handlePromise } from "@skylib/facades/dist/handlePromise";
import { progressReporter } from "@skylib/facades/dist/progressReporter";
import * as fn from "@skylib/functions/dist/function";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

import { Action } from "@/actions/Action";
import * as promiseHandler from "@/facade-implementations/handlePromise/promiseHandler";

class FailedAction extends Action<[], void> {
  public override errorMessage = testErrorMessage;

  public override async _execute(): Promise<void> {
    await Promise.reject(testError);
  }
}

class SilentAction extends Action<[], void> {
  public override async _execute(): Promise<void> {
    await Promise.resolve();
  }
}

class VerboseAction extends Action<[], void> {
  public override type: TaskType = "createDb";

  public override async _execute(): Promise<void> {
    await wait(1500);
  }
}

const alertMock = jest.fn();

const errorHandler = jest.spyOn(promiseHandler.handlers, "error");

const testError = new Error("Sample error");

const testErrorMessage = "Sample error message";

{
  testUtils.installFakeTimer();
  globalThis.alert = alertMock;
}

test("errorMessage", async () => {
  const action = new FailedAction();

  expect(handlePromise.running()).toBeFalse();
  expect(alertMock).not.toHaveBeenCalled();
  expect(errorHandler).not.toHaveBeenCalled();

  {
    action.spawn();
    expect(handlePromise.running()).toBeTrue();
    expect(alertMock).not.toHaveBeenCalled();
    expect(errorHandler).not.toHaveBeenCalled();
  }

  {
    alertMock.mockImplementationOnce(fn.noop);
    errorHandler.mockImplementationOnce(fn.noop);
    await expect(handlePromise.runAll()).rejects.toStrictEqual(testError);
    expect(handlePromise.running()).toBeFalse();
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith(testErrorMessage);
    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(errorHandler).toHaveBeenCalledWith(testError);
  }
});

test("execute", async () => {
  const action = new SilentAction();

  expect(action.running).toBeFalse();
  await expect(action.execute()).resolves.toBeUndefined();
  expect(action.running).toBeFalse();
});

test("execute: Not implemented", async () => {
  const action = new Action();

  const error = new Error("Not implemented");

  expect(action.running).toBeFalse();
  await expect(action.execute()).rejects.toStrictEqual(error);
  expect(action.running).toBeFalse();
});

test("running, spawn", async () => {
  const action = new SilentAction();

  {
    expect(action.running).toBeFalse();
    action.spawn();
    expect(action.running).toBeTrue();
  }

  {
    await handlePromise.runAll();
    expect(action.running).toBeFalse();
  }
});

test("type", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    const action = new VerboseAction();

    expect(action.running).toBeFalse();
    expect(progressReporter.getProgress()).toBe(0);

    {
      action.spawn();
      expect(action.running).toBeTrue();
      expect(progressReporter.getProgress()).toBe(0);
    }

    {
      await wait(1000);
      expect(action.running).toBeTrue();
      expect(progressReporter.getProgress()).toBe(0.551);
    }

    {
      await wait(1000);
      expect(action.running).toBeFalse();
      expect(progressReporter.getProgress()).toBe(0);
    }
  });
});
