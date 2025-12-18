
import { tmdb } from '@/lib/tmdb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const lang = searchParams.get("lang") || "en-US";

  const data = await tmdb(`/${type}/${id}?language=${lang}`);

  return Response.json({
    title: data.title || data.name,
    overview: data.overview,
    rating: data.vote_average,
    languages: data.spoken_languages?.map(l => l.english_name) || []
  });
}
