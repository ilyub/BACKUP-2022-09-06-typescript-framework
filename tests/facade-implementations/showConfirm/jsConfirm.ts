import { showConfirm } from "@skylib/facades/dist/showConfirm";

const confirmMock = jest.fn();

const success = jest.fn();

const failure = jest.fn();

globalThis.confirm = confirmMock;

test("showConfirm.async: Failure", async () => {
  confirmMock.mockImplementationOnce(() => false);
  await expect(showConfirm.async("Sample message")).resolves.toBeFalse();
  expect(confirmMock).toHaveBeenCalledTimes(1);
  expect(confirmMock).toHaveBeenCalledWith("Sample message");
});

test("showConfirm.async: Success", async () => {
  confirmMock.mockImplementationOnce(() => true);
  await expect(showConfirm.async("Sample message")).resolves.toBeTrue();
  expect(confirmMock).toHaveBeenCalledTimes(1);
  expect(confirmMock).toHaveBeenCalledWith("Sample message");
});

test("showConfirm: Failure", () => {
  {
    confirmMock.mockImplementationOnce(() => false);
    showConfirm("Sample message");
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith("Sample message");
    confirmMock.mockClear();
  }

  {
    confirmMock.mockImplementationOnce(() => false);
    showConfirm("Sample message", success, failure);
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(success).not.toHaveBeenCalled();
    expect(failure).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith("Sample message");
  }
});

test("showConfirm: Success", () => {
  {
    confirmMock.mockImplementationOnce(() => true);
    showConfirm("Sample message");
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith("Sample message");
    confirmMock.mockClear();
  }

  {
    confirmMock.mockImplementationOnce(() => true);
    showConfirm("Sample message", success, failure);
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(success).toHaveBeenCalledTimes(1);
    expect(failure).not.toHaveBeenCalled();
    expect(confirmMock).toHaveBeenCalledWith("Sample message");
  }
});
