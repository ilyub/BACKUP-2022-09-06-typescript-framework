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

test("constructor", () => {
  expect(new Confirmable()).toBeInstanceOf(Confirmable);
  expect(new Confirmable(testConfirmation)).toBeInstanceOf(Confirmable);
});

test("execute: With message", async () => {
  const action = new TestConfirmable(testConfirmation);

  expect(callback).not.toHaveBeenCalled();
  expect(confirmMock).not.toHaveBeenCalled();

  {
    confirmMock.mockImplementationOnce(() => true);
    await action.execute();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith();
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith(testConfirmation);
    callback.mockClear();
    confirmMock.mockClear();
  }

  {
    confirmMock.mockImplementationOnce(() => false);
    await action.execute();
    expect(callback).not.toHaveBeenCalled();
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith(testConfirmation);
  }
});

test("execute: Without message", async () => {
  const action = new TestConfirmable();

  expect(callback).not.toHaveBeenCalled();
  expect(confirmMock).not.toHaveBeenCalled();

  {
    await action.execute();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith();
    expect(confirmMock).not.toHaveBeenCalled();
  }
});
