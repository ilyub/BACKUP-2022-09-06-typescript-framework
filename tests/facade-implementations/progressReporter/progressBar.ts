/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import $ from "jquery";

import { progressReporter } from "@skylib/facades/dist/progressReporter";
import { wait } from "@skylib/functions/dist/helpers";
import * as testUtils from "@skylib/functions/dist/testUtils";

import * as progressBar from "@/facade-implementations/progressReporter/progressBar";

function expectProgressToEqual(progress: number): void {
  if (progress) {
    expect(progressReporter.getProgress()).toStrictEqual(progress);
    expect($("#progressBar").attr("class")).toStrictEqual("x-active");
    expect($("#progressBar").attr("style")).toStrictEqual(
      `width: ${100 * progressReporter.getProgress()}%;`
    );
  } else {
    expect(progressReporter.getProgress()).toStrictEqual(0);
    expect($("#progressBar").attr("class")).toBeOneOf([undefined, ""]);
    expect($("#progressBar").attr("style")).toBeOneOf([undefined, ""]);
  }
}

testUtils.installFakeTimer();

beforeEach(() => {
  document.body.innerHTML = '<div id="progressBar"></div>';
});

it("configure, getConfiguration", () => {
  expect(progressBar.getConfiguration().latency).toStrictEqual(0);
  progressBar.configure({ latency: 1 });
  expect(progressBar.getConfiguration().latency).toStrictEqual(1);
});

it("implementation.getProgress, implementation.spawn, implementation.reset", () => {
  {
    progressReporter.spawn().setProgress(0.5);
    expectProgressToEqual(0.5);
  }

  {
    progressReporter.reset();
    expectProgressToEqual(0);
  }
});

it("Process.done", () => {
  const process1 = progressReporter.spawn();

  const process2 = progressReporter.spawn();

  {
    process1.done();
    process2.setProgress(0.4);
    expectProgressToEqual(0.7);
  }

  {
    process2.done();
    expectProgressToEqual(0);
  }
});

it("Process.done: Final easing", async () => {
  await testUtils.run(async () => {
    progressBar.configure({
      finalEasing: true,
      finalEasingSpeed: 3000
    });

    {
      progressReporter.spawn().setProgress(0.5).done();
      await wait(1000);
      expectProgressToEqual(0.8);
    }

    {
      await wait(1000);
      expectProgressToEqual(0);
    }
  });
});

it("Process.done: Latency", async () => {
  await testUtils.run(async () => {
    progressBar.configure({
      latency: 1500
    });

    const progress = progressReporter.spawn().setProgress(0.5);

    {
      await wait(1000);
      expectProgressToEqual(0);
    }

    {
      progress.done();
      expectProgressToEqual(0);
    }

    {
      await wait(1000);
      expectProgressToEqual(0);
    }
  });
});

it("Process.done: Latency overdue", async () => {
  await testUtils.run(async () => {
    progressBar.configure({
      latency: 1500
    });

    const progress = progressReporter.spawn().setProgress(0.5);

    {
      await wait(1000);
      expectProgressToEqual(0);
    }

    {
      await wait(1000);
      expectProgressToEqual(0.5);
    }

    {
      progress.done();
      expectProgressToEqual(0);
    }
  });
});

it("Process.setAuto", async () => {
  await testUtils.run(async () => {
    const progress = progressReporter.spawn().setAuto(1000);

    {
      await wait(1000);
      expectProgressToEqual(0.551);
    }

    {
      progress.done();
      expectProgressToEqual(0);
    }
  });
});

it("Process.setWeight", () => {
  const process1 = progressReporter.spawn();

  const process2 = progressReporter.spawn();

  process1.setWeight(0.8).done();
  process2.setWeight(0.2).setProgress(0.5);
  expectProgressToEqual(0.9);
});
