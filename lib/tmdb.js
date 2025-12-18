
const BASE = "https://api.themoviedb.org/3";

export async function tmdb(path) {
  const r = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      "Content-Type": "application/json"
    },
    next: { revalidate: 3600 }
  });
  if (!r.ok) throw new Error("TMDB Error");
  return r.json();
}
