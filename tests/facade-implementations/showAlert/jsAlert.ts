import { showAlert } from "@skylib/facades";
import { fn } from "@skylib/functions";

const alertMock = jest.fn();

globalThis.alert = alertMock;

test("showAlert", () => {
  alertMock.mockImplementationOnce(fn.noop);
  showAlert("Sample message");
  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock).toHaveBeenCalledWith("Sample message");
});

test("showAlert.async", async () => {
  alertMock.mockImplementationOnce(fn.noop);
  await showAlert.async("Sample message");
  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock).toHaveBeenCalledWith("Sample message");
});
