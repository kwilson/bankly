import { format } from "./dateFormatter";

describe("currencyFormatter", () => {
  describe("en-GB", () => {
    const tests: [string, string][] = [
      ["1980-01-01", "1 January 1980"],
      ["2022-01-01", "1 January 2022"],
      ["2022-02-05", "5 February 2022"],
      ["2022-03-10", "10 March 2022"],
      ["2022-04-15", "15 April 2022"],
      ["2022-05-20", "20 May 2022"],
      ["2022-06-24", "24 June 2022"],
      ["2022-07-28", "28 July 2022"],
      ["2022-08-30", "30 August 2022"],
      ["2022-09-30", "30 September 2022"],
      ["2022-10-31", "31 October 2022"],
      ["2022-11-05", "5 November 2022"],
      ["2022-12-25", "25 December 2022"],
      ["2042-12-01", "1 December 2042"],
    ];

    test.each(tests)("formats %p as %p", (input, expected) => {
      const result = format(input);
      expect(result).toEqual(expected);
    });
  });
});
