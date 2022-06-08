// eslint-disable-next-line import/no-internal-modules -- Ok
import { datetimeToBe, progressToBe } from "@/test-utils/expect";
import { datetime } from "@skylib/facades";

test("datetimeToBe", () => {
  {
    const result = datetimeToBe(
      datetime.create("1950-01-01 14:30"),
      "1950-01-01 14:30"
    );

    const expected = 'Expected date not to be "1950-01-01 14:30"';

    expect(result.pass).toBeTrue();
    expect(result.message()).toStrictEqual(expected);
  }

  {
    const result = datetimeToBe(
      datetime.create("1950-01-01 14:30"),
      "1950-01-01 14:31"
    );

    const expected =
      'Expected date ("1950-01-01 14:30") to be "1950-01-01 14:31"';

    expect(result.pass).toBeFalse();
    expect(result.message()).toStrictEqual(expected);
  }
});

test("progressToBe", () => {
  {
    const result = progressToBe("#progressBar", 0);

    const expected = "Expected progress not to be 0";

    expect(result.pass).toBeTrue();
    expect(result.message()).toStrictEqual(expected);
  }

  {
    const result = progressToBe("#progressBar", 1);

    const expected = "Expected progress (0) to be 1";

    expect(result.pass).toBeFalse();
    expect(result.message()).toStrictEqual(expected);
  }
});
