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

test("install: Double install", () => {
  expect(() => {
    shortcuts.install();
  }).toThrow(new AssertionError("Double install"));
});

test("install: Handled by container", () => {
  expect.hasAssertions();

  for (const subtest of subtests) {
    const onClick = jest.fn();

    // eslint-disable-next-line github/no-inner-html
    document.body.innerHTML = `
      <div class="x-shortcuts-container ${subtest.selector}">
        <textarea></textarea>
      </div>
    `;

    $(".x-shortcuts-container").on("click", onClick);

    {
      expect(onClick).not.toHaveBeenCalled();
      $("body").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toHaveBeenCalledTimes(subtest.timesBody);
      onClick.mockClear();
    }

    {
      expect(onClick).not.toHaveBeenCalled();
      $("textarea").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toHaveBeenCalledTimes(subtest.timesTextarea);
    }
  }
});

test("install: Handled by container's descendants", () => {
  expect.hasAssertions();

  for (const subtest of subtests) {
    const onClick = jest.fn();

    // eslint-disable-next-line github/no-inner-html
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
      expect(onClick).not.toHaveBeenCalled();
      $("body").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toHaveBeenCalledTimes(subtest.timesBody);
      onClick.mockClear();
    }

    {
      expect(onClick).not.toHaveBeenCalled();
      $("textarea").trigger($.Event("keydown", { key: subtest.key }));
      expect(onClick).toHaveBeenCalledTimes(subtest.timesTextarea);
    }
  }
});

// eslint-disable-next-line jest/expect-expect
test("install: Unhandled", () => {
  $("body").trigger($.Event("keydown", { key: "Escape" }));
});
