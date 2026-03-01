const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

function transformKeys<T>(
  obj: unknown,
  transform: (_key: string) => string,
): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeys(item, transform)) as T;
  }
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, val]) => [
        transform(key),
        transformKeys(val, transform),
      ]),
    ) as T;
  }
  return obj as T;
}

export async function apiFetch<T>(
  path: string,
  options: Parameters<typeof fetch>[1] = {},
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as { detail?: string }).detail ?? `HTTP ${res.status}`,
    );
  }

  if (res.status === 204) return undefined as T;

  const data = await res.json();
  return transformKeys<T>(data, toCamelCase);
}

export function toApiBody(data: unknown): string {
  return JSON.stringify(transformKeys(data, toSnakeCase));
}
