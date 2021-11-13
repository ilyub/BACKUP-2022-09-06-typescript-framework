/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import type { TaskType } from "@skylib/facades/dist/handlePromise";
import { handlePromise } from "@skylib/facades/dist/handlePromise";
import { progressReporter } from "@skylib/facades/dist/progressReporter";
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

it("errorMessage", async () => {
  const action = new FailedAction();

  expect(handlePromise.running()).toBeFalse();
  expect(alertMock).not.toBeCalled();
  expect(errorHandler).not.toBeCalled();

  {
    action.spawn();
    expect(handlePromise.running()).toBeTrue();
    expect(alertMock).not.toBeCalled();
    expect(errorHandler).not.toBeCalled();
  }

  {
    alertMock.mockImplementationOnce(() => {});
    errorHandler.mockImplementationOnce(() => {});
    await expect(handlePromise.runAll()).rejects.toStrictEqual(testError);
    expect(handlePromise.running()).toBeFalse();
    expect(alertMock).toBeCalledTimes(1);
    expect(alertMock).toBeCalledWith(testErrorMessage);
    expect(errorHandler).toBeCalledTimes(1);
    expect(errorHandler).toBeCalledWith(testError);
  }
});

it("execute", async () => {
  const action = new SilentAction();

  expect(action.running).toBeFalse();
  await expect(action.execute()).resolves.toBeUndefined();
  expect(action.running).toBeFalse();
});

it("execute: Not implemented", async () => {
  const action = new Action();

  const error = new Error("Not implemented");

  expect(action.running).toBeFalse();
  await expect(action.execute()).rejects.toStrictEqual(error);
  expect(action.running).toBeFalse();
});

it("running, spawn", async () => {
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

it("type", async () => {
  await testUtils.run(async () => {
    const action = new VerboseAction();

    expect(action.running).toBeFalse();
    expect(progressReporter.getProgress()).toStrictEqual(0);

    {
      action.spawn();
      expect(action.running).toBeTrue();
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }

    {
      await wait(1000);
      expect(action.running).toBeTrue();
      expect(progressReporter.getProgress()).toStrictEqual(0.551);
    }

    {
      await wait(1000);
      expect(action.running).toBeFalse();
      expect(progressReporter.getProgress()).toStrictEqual(0);
    }
  });
});
