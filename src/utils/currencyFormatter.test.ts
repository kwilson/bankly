import { format } from "./currencyFormatter";

describe("currencyFormatter", () => {
  describe("en-GB", () => {
    describe("GBP", () => {
      const tests: [number, string, string][] = [
        [0, "GBP", "£0.00"],
        [-10, "GBP", "-£10.00"],
        [10, "GBP", "£10.00"],
        [123.45, "GBP", "£123.45"],
        [123.45678, "GBP", "£123.46"],
        [1234.5678, "GBP", "£1,234.57"],
        [1234567890.123, "GBP", "£1,234,567,890.12"],
      ];

      test.each(tests)(
        "formats %p in %p as %p",
        (value, currency, expected) => {
          const result = format(value, currency);
          expect(result).toEqual(expected);
        }
      );
    });

    describe("EUR", () => {
      const tests: [number, string, string][] = [
        [0, "EUR", "€0.00"],
        [-10, "EUR", "-€10.00"],
        [10, "EUR", "€10.00"],
        [123.45, "EUR", "€123.45"],
        [123.45678, "EUR", "€123.46"],
        [1234.5678, "EUR", "€1,234.57"],
        [1234567890.123, "EUR", "€1,234,567,890.12"],
      ];

      test.each(tests)(
        "formats %p in %p as %p",
        (value, currency, expected) => {
          const result = format(value, currency);
          expect(result).toEqual(expected);
        }
      );
    });

    describe("USD", () => {
      const tests: [number, string, string][] = [
        [0, "USD", "$0.00"],
        [-10, "USD", "-$10.00"],
        [10, "USD", "$10.00"],
        [123.45, "USD", "$123.45"],
        [123.45678, "USD", "$123.46"],
        [1234.5678, "USD", "$1,234.57"],
        [1234567890.123, "USD", "$1,234,567,890.12"],
      ];

      test.each(tests)(
        "formats %p in %p as %p",
        (value, currency, expected) => {
          const result = format(value, currency);
          expect(result).toEqual(expected);
        }
      );
    });
  });
});
