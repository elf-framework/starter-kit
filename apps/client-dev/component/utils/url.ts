const ROOT_URL = import.meta.env.BASE_URL;

export function url(urlString: string): string {
  return ROOT_URL + urlString;
}
