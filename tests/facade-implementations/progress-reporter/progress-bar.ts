import { implementations } from "@";
import { wait } from "@skylib/functions";
import * as testUtils from "@skylib/functions/dist/test-utils";

const { progressBar } = implementations.progressReporter;

testUtils.installFakeTimer();

beforeEach(() => {
  // eslint-disable-next-line github/no-inner-html -- Ok
  document.body.innerHTML = '<div id="progressBar">';
});

test("configure, getConfiguration", () => {
  expect(progressBar.getConfiguration().latency).toBe(0);
  progressBar.configure({ latency: 1 });
  expect(progressBar.getConfiguration().latency).toBe(1);
});

test("process.done: finalEasing", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    progressBar.configure({ finalEasing: true, finalEasingSpeed: 3000 });
    progressBar.spawn().setProgress(0.5).done();
    await wait(1000);
    expect("#progressBar").progressToBe(0.8);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});

test("process.done: latency", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    progressBar.configure({ latency: 1500 });
    progressBar.spawn().setProgress(0.5);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
    await wait(1000);
    expect("#progressBar").progressToBe(0.5);
    progressBar.configure({ enabled: false });
    expect("#progressBar").progressToBe(0.5);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});

test("process.setAuto", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    progressBar.spawn().setAuto(1000);
    await wait(1000);
    expect("#progressBar").progressToBe(0.593);
    progressBar.configure({ enabled: false });
    expect("#progressBar").progressToBe(0.593);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});

test("process.setProgress", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    progressBar.spawn().setProgress(0.5);
    expect("#progressBar").progressToBe(0.5);
    progressBar.configure({ enabled: false });
    expect("#progressBar").progressToBe(0.5);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});

test("process.setWeight", async () => {
  expect.hasAssertions();

  await testUtils.run(async () => {
    progressBar.spawn().setWeight(0.2).setProgress(0.5);
    progressBar.spawn().setWeight(0.8).done();
    expect("#progressBar").progressToBe(0.9);
    progressBar.configure({ enabled: false });
    expect("#progressBar").progressToBe(0.9);
    await wait(1000);
    expect("#progressBar").progressToBe(0);
  });
});
