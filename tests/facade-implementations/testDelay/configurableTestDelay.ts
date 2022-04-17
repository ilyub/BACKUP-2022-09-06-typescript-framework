import { testDelay } from "@skylib/facades";
import { testUtils } from "@skylib/functions";
import * as facadeImplementations from "@/facade-implementations";

const configurableTestDelay =
  facadeImplementations.testDelay.configurableTestDelay;

testUtils.installFakeTimer();

test("configure, getConfiguration", () => {
  expect(configurableTestDelay.getConfiguration().timeout).toBe(1000);
  configurableTestDelay.configure({ timeout: 1001 });
  expect(configurableTestDelay.getConfiguration().timeout).toBe(1001);
});

test("testDelay", async () => {
  expect.assertions(1);
  await testUtils.run(async () => {
    configurableTestDelay.configure({ enabled: true });
    await expect(testDelay).executionTimeToBe(1000);
  });
});

test("testDelay: Disabled", async () => {
  await expect(testDelay).executionTimeToBe(0);
});
