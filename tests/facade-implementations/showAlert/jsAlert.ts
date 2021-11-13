import { showAlert } from "@skylib/facades/dist/showAlert";

const alertMock = jest.fn();

globalThis.alert = alertMock;

it("showAlert", () => {
  alertMock.mockImplementationOnce(() => {});
  showAlert("Sample message");
  expect(alertMock).toBeCalledTimes(1);
  expect(alertMock).toBeCalledWith("Sample message");
});

it("showAlert.async", async () => {
  alertMock.mockImplementationOnce(() => {});
  await showAlert.async("Sample message");
  expect(alertMock).toBeCalledTimes(1);
  expect(alertMock).toBeCalledWith("Sample message");
});
