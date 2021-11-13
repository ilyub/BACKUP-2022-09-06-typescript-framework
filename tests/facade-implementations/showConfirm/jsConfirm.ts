import { showConfirm } from "@skylib/facades/dist/showConfirm";

const confirmMock = jest.fn();

const success = jest.fn();

const failure = jest.fn();

globalThis.confirm = confirmMock;

it("showConfirm: Success", () => {
  {
    confirmMock.mockImplementationOnce(() => true);
    showConfirm("Sample message");
    expect(confirmMock).toBeCalledTimes(1);
    expect(confirmMock).toBeCalledWith("Sample message");
    confirmMock.mockClear();
  }

  {
    confirmMock.mockImplementationOnce(() => true);
    showConfirm("Sample message", success, failure);
    expect(confirmMock).toBeCalledTimes(1);
    expect(success).toBeCalledTimes(1);
    expect(failure).not.toBeCalled();
    expect(confirmMock).toBeCalledWith("Sample message");
  }
});

it("showConfirm: Failure", () => {
  {
    confirmMock.mockImplementationOnce(() => false);
    showConfirm("Sample message");
    expect(confirmMock).toBeCalledTimes(1);
    expect(confirmMock).toBeCalledWith("Sample message");
    confirmMock.mockClear();
  }

  {
    confirmMock.mockImplementationOnce(() => false);
    showConfirm("Sample message", success, failure);
    expect(confirmMock).toBeCalledTimes(1);
    expect(success).not.toBeCalled();
    expect(failure).toBeCalledTimes(1);
    expect(confirmMock).toBeCalledWith("Sample message");
  }
});

it("showConfirm.async: Success", async () => {
  confirmMock.mockImplementationOnce(() => true);
  await expect(showConfirm.async("Sample message")).resolves.toBeTrue();
  expect(confirmMock).toBeCalledTimes(1);
  expect(confirmMock).toBeCalledWith("Sample message");
});

it("showConfirm.async: Failure", async () => {
  confirmMock.mockImplementationOnce(() => false);
  await expect(showConfirm.async("Sample message")).resolves.toBeFalse();
  expect(confirmMock).toBeCalledTimes(1);
  expect(confirmMock).toBeCalledWith("Sample message");
});
