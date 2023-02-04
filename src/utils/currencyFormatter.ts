export function format(value: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency,
  });

  return formatter.format(value);
}
