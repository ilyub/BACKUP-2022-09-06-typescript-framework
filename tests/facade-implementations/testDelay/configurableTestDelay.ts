import { testDelay } from "@skylib/facades/dist/testDelay";
import * as testUtils from "@skylib/functions/dist/testUtils";

import * as configurableTestDelay from "@/facade-implementations/testDelay/configurableTestDelay";

testUtils.installFakeTimer();

it("configure, getConfiguration", () => {
  expect(configurableTestDelay.getConfiguration().timeout).toStrictEqual(1000);
  configurableTestDelay.configure({ timeout: 1001 });
  expect(configurableTestDelay.getConfiguration().timeout).toStrictEqual(1001);
});

it("testDelay", async () => {
  await testUtils.run(async () => {
    configurableTestDelay.configure({ enabled: true });
    await expect(testDelay).executionTimeToEqual(1000);
  });
});

it("testDelay: Disabled", async () => {
  await expect(testDelay).executionTimeToEqual(0);
});
