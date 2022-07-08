import * as testUtils from "@skylib/functions/dist/test-utils";
import { implementations } from "@";

const { configurableTestDelay } = implementations.testDelay;

testUtils.installFakeTimer();

test("configure, getConfiguration", () => {
  expect(configurableTestDelay.getConfiguration().timeout).toBe(1000);
  configurableTestDelay.configure({ timeout: 1001 });
  expect(configurableTestDelay.getConfiguration().timeout).toBe(1001);
});

test("testDelay", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    await expect(configurableTestDelay).executionTimeToBe(0);
    configurableTestDelay.configure({ enabled: true });
    await expect(configurableTestDelay).executionTimeToBe(1000);
  });
});
