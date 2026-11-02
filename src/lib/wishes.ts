// Client for the Google Apps Script web app in scripts/wishes-apps-script.gs.
// Set NEXT_PUBLIC_WISHES_URL to the deployed ".../exec" URL.

export type Wish = { id: string; name: string; text: string; ts?: number };

const WISHES_URL = process.env.NEXT_PUBLIC_WISHES_URL ?? "";

export const wishesEnabled = WISHES_URL !== "";

export async function fetchWishes(): Promise<Wish[]> {
  if (!wishesEnabled) return [];
  const res = await fetch(WISHES_URL);
  if (!res.ok) throw new Error("fetch_failed");
  const data = (await res.json()) as { wishes?: Wish[] };
  return data.wishes ?? [];
}

export async function postWish(name: string, text: string): Promise<Wish> {
  if (!wishesEnabled) {
    return { id: crypto.randomUUID(), name, text, ts: Date.now() };
  }
  // text/plain keeps this a "simple" request (no CORS preflight), which Apps Script requires.
  const res = await fetch(WISHES_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ name, text }),
  });
  if (!res.ok) throw new Error("post_failed");
  const data = (await res.json()) as { ok: boolean; wish?: Wish };
  if (!data.ok || !data.wish) throw new Error("rejected");
  return data.wish;
}
