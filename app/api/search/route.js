
import { tmdb } from '../../../../lib/tmdb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) return Response.json({ error: "q required" }, { status: 400 });

  const data = await tmdb(`/search/multi?query=${encodeURIComponent(q)}&include_adult=false`);

  const results = data.results
    .filter(i => i.media_type === "movie" || i.media_type === "tv")
    .map(i => ({
      id: i.id,
      type: i.media_type,
      title: i.title || i.name,
      year: (i.release_date || i.first_air_date || "").slice(0,4),
      poster: i.poster_path ? `https://image.tmdb.org/t/p/w500${i.poster_path}` : null,
      backdrop: i.backdrop_path ? `https://image.tmdb.org/t/p/w780${i.backdrop_path}` : null
    }));

  return Response.json({ success: true, results });
}
