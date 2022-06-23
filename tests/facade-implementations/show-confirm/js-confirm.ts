import { implementations } from "@";
import { evaluate } from "@skylib/functions";

const confirmFn = evaluate(() => {
  const result = jest.fn();

  globalThis.confirm = result;

  return result;
});

const failureFn = jest.fn();

const { jsConfirm } = implementations.showConfirm;

const successFn = jest.fn();

test("jsConfirm.async: Failure", async () => {
  confirmFn.mockImplementationOnce(() => false);
  await expect(jsConfirm.async("Sample message")).resolves.toBeFalse();
  expect(confirmFn).mockCallsToBe(["Sample message"]);
});

test("jsConfirm.async: Success", async () => {
  confirmFn.mockImplementationOnce(() => true);
  await expect(jsConfirm.async("Sample message")).resolves.toBeTrue();
  expect(confirmFn).mockCallsToBe(["Sample message"]);
});

test("jsConfirm: Failure", () => {
  {
    confirmFn.mockImplementationOnce(() => false);
    jsConfirm("Sample message");
    expect(confirmFn).mockCallsToBe(["Sample message"]);
  }

  {
    confirmFn.mockImplementationOnce(() => false);
    jsConfirm("Sample message", successFn, failureFn);
    expect(confirmFn).mockCallsToBe(["Sample message"]);
    expect(failureFn).mockCallsToBe([]);
    expect(successFn).mockCallsToBe();
  }
});

test("jsConfirm: Success", () => {
  {
    confirmFn.mockImplementationOnce(() => true);
    jsConfirm("Sample message");
    expect(confirmFn).mockCallsToBe(["Sample message"]);
  }

  {
    confirmFn.mockImplementationOnce(() => true);
    jsConfirm("Sample message", successFn, failureFn);
    expect(confirmFn).mockCallsToBe(["Sample message"]);
    expect(failureFn).mockCallsToBe();
    expect(successFn).mockCallsToBe([]);
  }
});
