const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function format(value: number) {
  return formatter.format(value);
}
