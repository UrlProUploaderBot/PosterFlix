
import { tmdb } from '../../../lib/tmdb';

function pick(list, lang) {
  return list.find(i => i.iso_639_1 === lang)
    || list.find(i => i.iso_639_1 === null)
    || list[0] || null;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const lang = searchParams.get("lang");

  const data = await tmdb(`/${type}/${id}/images`);
  const poster = pick(data.posters, lang);
  const backdrop = pick(data.backdrops, lang);

  return Response.json({
    portrait: poster ? `https://image.tmdb.org/t/p/original${poster.file_path}` : null,
    landscape: backdrop ? `https://image.tmdb.org/t/p/original${backdrop.file_path}` : null
  });
}
