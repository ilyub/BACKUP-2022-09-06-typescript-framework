import { showAlert } from "@skylib/facades/dist/showAlert";

const alertMock = jest.fn();

globalThis.alert = alertMock;

test("showAlert", () => {
  alertMock.mockImplementationOnce(() => {});
  showAlert("Sample message");
  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock).toHaveBeenCalledWith("Sample message");
});

test("showAlert.async", async () => {
  alertMock.mockImplementationOnce(() => {});
  await showAlert.async("Sample message");
  expect(alertMock).toHaveBeenCalledTimes(1);
  expect(alertMock).toHaveBeenCalledWith("Sample message");
});
