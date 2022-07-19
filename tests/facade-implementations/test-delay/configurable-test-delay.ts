import * as testUtils from "@skylib/functions/dist/test-utils";
import { implementations } from "@";

const { configurableTestDelay } = implementations.testDelay;

testUtils.installFakeTimer();

test.each([
  { config: {}, expected: 1000 },
  { config: { timeout: 1001 }, expected: 1001 }
])("configure, getConfiguration", ({ config, expected }) => {
  configurableTestDelay.configure(config);
  expect(configurableTestDelay.getConfiguration().timeout).toBe(expected);
});

test.each([
  { enabled: false, expected: 0 },
  { enabled: true, expected: 1000 }
])("testDelay", async ({ enabled, expected }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    configurableTestDelay.configure({ enabled });
    await expect(configurableTestDelay).executionTimeToBe(expected);
  });
});
