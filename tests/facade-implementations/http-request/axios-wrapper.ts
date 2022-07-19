import { implementations } from "@";
import jestMockAxios from "jest-mock-axios";

const axios = implementations.httpRequest.axiosWrapper;

beforeEach(jestMockAxios.reset);

test.each([
  { config: {}, expected: 1000 },
  { config: { timeout: 1001 }, expected: 1001 }
])("configure, getConfiguration", ({ config, expected }) => {
  axios.configure(config);
  expect(axios.getConfiguration().timeout).toBe(expected);
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
