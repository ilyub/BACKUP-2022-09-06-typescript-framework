import { implementations } from "@";
import { fn } from "@skylib/functions";

const alertFn = fn.run(() => {
  const result = jest.fn();

  globalThis.alert = result;

  return result;
});

const { jsAlert } = implementations.showAlert;

test("showAlert", () => {
  alertFn.mockImplementationOnce(fn.noop);
  jsAlert("Sample message");
  expect(alertFn).toHaveBeenCalledTimes(1);
  expect(alertFn).toHaveBeenCalledWith("Sample message");
});

test("showAlert.async", async () => {
  alertFn.mockImplementationOnce(fn.noop);
  await jsAlert.async("Sample message");
  expect(alertFn).toHaveBeenCalledTimes(1);
  expect(alertFn).toHaveBeenCalledWith("Sample message");
});
