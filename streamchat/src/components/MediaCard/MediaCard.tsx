import type { IMedia } from '../../types/media';

interface MediaCardProps {
  media: IMedia;
  onClick?: (media: IMedia) => void;
}

const MediaCard = ({ media, onClick }: MediaCardProps) => {
  const posterUrl = media.media_assets?.poster?.url;
  const year = media.release_date
    ? new Date(media.release_date).getFullYear()
    : null;

  return (
    <div
      onClick={() => onClick?.(media)}
      className="group relative flex-shrink-0 w-40 sm:w-44 md:w-48 rounded-xl overflow-hidden cursor-pointer
                 transition-transform duration-300 ease-out hover:z-10
                 shadow-md hover:shadow-2xl hover:shadow-black/60"
    >
      {/* Poster */}
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={media.title}
          className="w-full h-64 object-cover block"
          loading="lazy"
        />
      ) : (
        /* Fallback when no poster */
        <div className="w-full h-64 bg-neutral-800 flex items-center justify-center">
          <span className="text-neutral-500 text-xs text-center px-2">{media.title}</span>
        </div>
      )}

      {/* Gradient overlay — always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-sm font-semibold leading-tight line-clamp-2">
          {media.title}
        </p>
        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {year && (
            <span className="text-neutral-400 text-xs">{year}</span>
          )}
          {media.genres?.[0] && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
              {media.genres[0]}
            </span>
          )}
        </div>
      </div>

      {/* Trending score badge */}
      {/* {media.trending_score >= 90 && (
        <div className="absolute top-2 right-2 bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
          🔥 Hot
        </div>
      )} */}
    </div>
  );
};

export default MediaCard;
