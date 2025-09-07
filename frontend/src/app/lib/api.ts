export const API = process.env.NEXT_PUBLIC_API_URL!;

// simple server-side fetch (no cache for now)
export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}