import { implementations } from "@";
// eslint-disable-next-line import/no-unresolved -- Wait for @skylib/config update
import jestMockAxios from "jest-mock-axios";

const axios = implementations.httpRequest.axiosWrapper;

beforeEach(jestMockAxios.reset);

test("configure, getConfiguration", () => {
  expect(axios.getConfiguration().timeout).toBe(1000);
  axios.configure({ timeout: 1001 });
  expect(axios.getConfiguration().timeout).toBe(1001);
});

test("send", async () => {
  const promise = axios.send("http://localhost/");

  jestMockAxios.mockResponseFor(
    { method: "get", url: "http://localhost/" },
    {
      config: {},
      data: "sample-data",
      headers: {},
      status: 200,
      statusText: "OK"
    }
  );

  await expect(promise).resolves.toBe("sample-data");
});
