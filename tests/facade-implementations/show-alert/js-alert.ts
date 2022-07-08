import { evaluate, fn } from "@skylib/functions";
import { implementations } from "@";

const alertFn = evaluate(() => {
  const result = jest.fn();

  globalThis.alert = result;

  return result;
});

const { jsAlert } = implementations.showAlert;

test("showAlert", () => {
  alertFn.mockImplementationOnce(fn.noop);
  jsAlert("Sample message");
  expect(alertFn).mockCallsToBe(["Sample message"]);
});

test("showAlert.async", async () => {
  alertFn.mockImplementationOnce(fn.noop);
  await jsAlert.async("Sample message");
  expect(alertFn).mockCallsToBe(["Sample message"]);
});
