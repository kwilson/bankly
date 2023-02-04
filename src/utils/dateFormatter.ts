const formatter = new Intl.DateTimeFormat("en-GB", {  year: 'numeric', month: 'long', day: 'numeric' });

export function format(isoDateString: string) {
  // TODO: handle invalid formats being passed
  const date = new Date(isoDateString);
  return formatter.format(date);
}
