export function ucwords(str: string) {
  return (" " + str).replace(/ [\w]/g, (w) => w.toLocaleUpperCase()).trim();
}
