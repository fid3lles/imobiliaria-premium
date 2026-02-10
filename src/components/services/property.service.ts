export function buildSearchUrl(
  baseUrl: string,
  filters: Record<string, any>,
  page = 0,
  size = 12,
) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("size", String(size));

  Object.entries(filters).forEach(([key, val]) => {
    if (val === undefined || val === null) return;

    if (typeof val === "string" && val.trim() !== "") {
      params.set(key, val);
      return;
    }

    if (typeof val === "number") {
      params.set(key, String(val));
      return;
    }

    if (Array.isArray(val) && val.length > 0) {
      val.forEach((v) => params.append(key, String(v)));
      return;
    }

    if (typeof val === "object") {
      Object.entries(val).forEach(([subKey, subVal]) => {
        if (subVal !== undefined && subVal !== null) {
          params.set(`${key}.${subKey}`, String(subVal));
        }
      });
    }
  });

  return `${baseUrl}?${params.toString()}`;
}
