import { format } from "./currencyFormatter";

describe("currencyFormatter", () => {
  describe("en-GB", () => {
    const tests: [number, string][] = [
      [0, "£0.00"],
      [-10, "-£10.00"],
      [10, "£10.00"],
      [123.45, "£123.45"],
      [123.45678, "£123.46"],
      [1234.5678, "£1,234.57"],
      [1234567890.123, "£1,234,567,890.12"],
    ];

    test.each(tests)("formats %p as %p", (input, expected) => {
      const result = format(input);
      expect(result).toEqual(expected);
    });
  });
});
