/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import $ from "jquery";

import { AssertionError } from "@skylib/functions/dist/errors/AssertionError";

import * as shortcuts from "@/plugins/shortcuts";

const subtests = [
  {
    key: "Escape",
    selector: "x-shortcut-esc",
    timesBody: 1,
    timesTextarea: 1
  },
  {
    key: "PageDown",
    selector: " x-shortcut-page-down",
    timesBody: 1,
    timesTextarea: 0
  },
  {
    key: "PageUp",
    selector: "x-shortcut-page-up",
    timesBody: 1,
    timesTextarea: 0
  }
];

shortcuts.install();

it("install: Double install", () => {
  expect(() => {
    shortcuts.install();
  }).toThrow(new AssertionError("Double install"));
});

it("install: Handled by container", () => {
  for (const subtest of subtests) {
    const onClick = jest.fn();

    document.body.innerHTML = `
      <div class="x-shortcuts-container ${subtest.selector}">
        <textarea></textarea>
      </div>
    `;

    $(".x-shortcuts-container").on("click", onClick);

    {
      expect(onClick).not.toBeCalled();
      $("body").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toBeCalledTimes(subtest.timesBody);
      onClick.mockClear();
    }

    {
      expect(onClick).not.toBeCalled();
      $("textarea").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toBeCalledTimes(subtest.timesTextarea);
    }
  }
});

it("install: Handled by container's descendants", () => {
  for (const subtest of subtests) {
    const onClick = jest.fn();

    document.body.innerHTML = `
      <div class="x-shortcuts-container"></div>
      <div class="x-shortcuts-container" style="z-index: 1"></div>
      <div class="x-shortcuts-container" data-shortcuts-container-priority="1"></div>
      <div class="x-shortcuts-container" data-shortcuts-container-priority="3">
        <div class="${subtest.selector}"></div>
      </div>
      <div class="x-shortcuts-container" data-shortcuts-container-priority="2"></div>
      <div class="x-shortcuts-container" style="z-index: 2"></div>
      <div class="x-shortcuts-container"></div>
      <textarea></textarea>
    `;

    $(".x-shortcuts-container").on("click", onClick);

    {
      expect(onClick).not.toBeCalled();
      $("body").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toBeCalledTimes(subtest.timesBody);
      onClick.mockClear();
    }

    {
      expect(onClick).not.toBeCalled();
      $("textarea").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toBeCalledTimes(subtest.timesTextarea);
    }
  }
});

it("install: Unhandled", () => {
  $("body").trigger($.Event("keydown", { key: "Escape" }));
});
