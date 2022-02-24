import { datetime } from "@skylib/facades/dist/datetime";

import * as testUtils from "@/testUtils";

test("executionTimeToEqual", () => {
  {
    const result = testUtils.datetimeToEqual(
      datetime.create("1950-01-01 14:30"),
      "1950-01-01 14:30"
    );

    expect(result.pass).toBeTrue();
    expect(result.message()).toBe('Expected date not to be "1950-01-01 14:30"');
  }

  {
    const result = testUtils.datetimeToEqual(
      datetime.create("1950-01-01 14:30"),
      "1950-01-01 14:31"
    );

    expect(result.pass).toBeFalse();
    expect(result.message()).toBe(
      'Expected date to be "1950-01-01 14:31", got "1950-01-01 14:30"'
    );
  }
});
