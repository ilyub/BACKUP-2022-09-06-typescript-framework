import { Confirmable } from "@/actions/Confirmable";

class TestConfirmable extends Confirmable<[]> {
  public override async _execute(): Promise<void> {
    await Promise.resolve();
    callback();
  }
}

const callback = jest.fn();

const confirmMock = jest.fn();

const testConfirmation = "Sample confirmation";

globalThis.confirm = confirmMock;

it("constructor", () => {
  expect(new Confirmable()).toBeInstanceOf(Confirmable);
  expect(new Confirmable(testConfirmation)).toBeInstanceOf(Confirmable);
});

it("execute: With message", async () => {
  const action = new TestConfirmable(testConfirmation);

  expect(callback).not.toBeCalled();
  expect(confirmMock).not.toBeCalled();

  {
    confirmMock.mockImplementationOnce(() => true);
    await action.execute();
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(confirmMock).toBeCalledTimes(1);
    expect(confirmMock).toBeCalledWith(testConfirmation);
    callback.mockClear();
    confirmMock.mockClear();
  }

  {
    confirmMock.mockImplementationOnce(() => false);
    await action.execute();
    expect(callback).not.toBeCalled();
    expect(confirmMock).toBeCalledTimes(1);
    expect(confirmMock).toBeCalledWith(testConfirmation);
  }
});

it("execute: Without message", async () => {
  const action = new TestConfirmable();

  expect(callback).not.toBeCalled();
  expect(confirmMock).not.toBeCalled();

  {
    await action.execute();
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith();
    expect(confirmMock).not.toBeCalled();
  }
});
