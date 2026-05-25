const FAVORITES_STORAGE_KEY = "topproperties:favorites:v1";

export function loadFavoritePropertyIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id): id is string => typeof id === "string" && id.trim().length > 0);
  } catch {
    return [];
  }
}

export function saveFavoritePropertyIds(ids: readonly string[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...new Set(ids)]));
  } catch {
    // Persisting favorites is a progressive enhancement; ignore storage failures.
  }
}
