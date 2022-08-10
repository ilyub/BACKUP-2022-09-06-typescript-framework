/* eslint-disable github/no-inner-html -- Ok */

import * as testUtils from "@skylib/functions/dist/test-utils";
import { implementations } from "@";
import { wait } from "@skylib/functions";

const { progressBar } = implementations.progressReporter;

testUtils.installFakeTimer();
beforeEach(() => {
  document.body.innerHTML = '<div id="progressBar">';
});

test.each([
  { expected: 0.8, timeout: 1000 },
  { expected: 0, timeout: 2000 }
])("Process.done: finalEasing", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    progressBar.configure({ finalEasing: true, finalEasingSpeed: 3000 });
    progressBar.spawn().setProgress(0.5).done();
    await wait(timeout);
    expect("#progressBar").progressToBe(expected);
  });
});

test.each([
  { expected: 0, timeout: 1000 },
  { expected: 0.5, timeout: 2000 }
])("Process.done: latency", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    progressBar.configure({ latency: 1500 });
    progressBar.spawn().setProgress(0.5);
    await wait(timeout);
    expect("#progressBar").progressToBe(expected);
    progressBar.configure({ enabled: false });
  });
});

test.each([
  { expected: 0.593, timeout: 1000 },
  { expected: 0.85, timeout: 2000 }
])("Process.setAuto", async ({ expected, timeout }) => {
  expect.hasAssertions();
  await testUtils.run(async () => {
    progressBar.spawn().setAuto(1000);
    await wait(timeout);
    expect("#progressBar").progressToBe(expected);
    progressBar.configure({ enabled: false });
  });
});

test("Process.setProgress", () => {
  progressBar.spawn().setProgress(0.5);
  expect("#progressBar").progressToBe(0.5);
});

test("Process.setWeight", () => {
  progressBar.spawn().setWeight(0.2).setProgress(0.5);
  progressBar.spawn().setWeight(0.8).done();
  expect("#progressBar").progressToBe(0.9);
});

test.each([
  { config: {}, expected: 0 },
  { config: { latency: 1 }, expected: 1 }
])("configure, getConfiguration", ({ config, expected }) => {
  progressBar.configure(config);
  expect(progressBar.getConfiguration().latency).toBe(expected);
});
