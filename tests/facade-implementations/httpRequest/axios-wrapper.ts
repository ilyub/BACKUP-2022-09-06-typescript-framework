import { httpRequest } from "@skylib/facades/dist/httpRequest";
import jestMockAxios from "jest-mock-axios";
import * as axiosWrapper from "@/facade-implementations/httpRequest/axios-wrapper";

beforeEach(jestMockAxios.reset);

test("configure, getConfiguration", () => {
  expect(axiosWrapper.getConfiguration().timeout).toBe(30_000);
  axiosWrapper.configure({ timeout: 30_001 });
  expect(axiosWrapper.getConfiguration().timeout).toBe(30_001);
});

test("request", async () => {
  const data = "Sample response";

  const promise = httpRequest.send("http://localhost/");

  jestMockAxios.mockResponseFor(
    { method: "get", url: "http://localhost/" },
    {
      config: {},
      data,
      headers: {},
      status: 200,
      statusText: "OK"
    }
  );

  await expect(promise).resolves.toStrictEqual(data);
});
