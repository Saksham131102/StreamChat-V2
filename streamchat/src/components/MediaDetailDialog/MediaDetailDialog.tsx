import type { IMedia } from '@/types/media'
// import { FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import WatchPartyButton from '../WatchPartyButton/WatchPartyButton';

function PlayIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
      <path d="M1 1l10 6L1 13V1z" />
    </svg>
  );
}

const MediaDetailDialog = ({media}: {media: IMedia}) => {
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-hide">
      {/* Hero Header Section */}
      <div className="relative w-full aspect-video">
        <img 
          src={media.media_assets.backdrop.url || "/placeholder-backdrop.jpg"} 
          alt={media.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating Title on Image */}
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-8 right-3 sm:right-8 flex flex-col gap-1">
          <div className="hidden sm:flex flex-wrap gap-2">
            {media.genres.slice(0, 3).map((g) => (
              <span
                key={g}
                className="text-[11px] border border-white/25 text-white/80 px-3 py-1 rounded-full bg-white/10 tracking-wide"
              >
                {g}
              </span>
            ))}
          </div>
          <h2 className="text-xl sm:text-4xl mt-1 sm:mt-2 font-black tracking-tight drop-shadow-2xl mb-1.5 sm:mb-3">
            {media.title}
          </h2>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link
              to={`/browse/watch/${media._id}`}
              className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/20 cursor-pointer"
            >
              <PlayIcon /> Play
            </Link>
            <WatchPartyButton mediaId={media._id} />
            {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/20 cursor-pointer">
              <FaUsers /> Watch Party
            </button> */}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-8 space-y-4 sm:space-y-8">
        {/* Meta Row */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-sm text-neutral-400 font-medium">
          {media.trending_score > 0 && (
            <span className="text-green-500 font-bold">{media.trending_score}% Match</span>
          )}

          {media.meta?.duration_mins && (
            <span className="border border-red-500/40 text-red-400 px-2 py-0.5 rounded text-[11px]">
              {Math.floor(media.meta.duration_mins / 60)}h {media.meta.duration_mins % 60}m
            </span>
          )}

          {media.total_seasons && (
            <span className="border border-red-500/40 text-red-400 px-2 py-0.5 rounded text-[11px]">
              {media.total_seasons} Season{media.total_seasons > 1 ? 's' : ''}
            </span>
          )}
          {media.total_episodes && (
            <span className="border border-neutral-700 px-2 py-0.5 rounded text-[11px]">
              {media.total_episodes} Episode{media.total_episodes > 1 ? 's' : ''}
            </span>
          )}

          <span className="border border-neutral-700 px-2 py-0.5 rounded text-[11px] uppercase">
            {media.language}
          </span>
          {media.is_featured && (
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded text-[11px] font-semibold">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Genres on mobile (hidden in hero on mobile) */}
        <div className="flex sm:hidden flex-wrap gap-2">
          {media.genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className="text-[11px] border border-white/25 text-white/80 px-3 py-1 rounded-full bg-white/10 tracking-wide"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          {/* Left Column: Description */}
          <div className="sm:col-span-2 space-y-4">
            <p className="text-neutral-200 leading-relaxed text-sm sm:text-base font-light">
              {media.description}
            </p>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-2.5 sm:space-y-3 text-sm border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
            {media.director && (
              <div>
                <span className="text-neutral-500">Director: </span>
                <span className="text-neutral-300">{media.director}</span>
              </div>
            )}
            {media.cast?.length > 0 && (
              <div>
                <span className="text-neutral-500">Cast: </span>
                <span className="text-neutral-300">{media.cast.join(', ')}</span>
              </div>
            )}
            {media.genres?.length > 0 && (
              <div>
                <span className="text-neutral-500">Genres: </span>
                <span className="text-neutral-300">{media.genres.join(', ')}</span>
              </div>
            )}
            {media.release_date && (
              <div>
                <span className="text-neutral-500">Release Date: </span>
                <span className="text-neutral-300">
                  {new Date(media.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            )}
            {media.view_count > 0 && (
              <div>
                <span className="text-neutral-500">Views: </span>
                <span className="text-neutral-300">{media.view_count.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Seasons Summary (for web_series / tv) */}
        {media.seasons_summary && media.seasons_summary.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Seasons</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {media.seasons_summary.map((season) => (
                <div key={season.season_no} className="bg-white/5 border border-white/10 rounded-lg p-2.5 sm:p-3 text-center">
                  <div className="text-white font-bold text-sm sm:text-lg">Season {season.season_no}</div>
                  <div className="text-neutral-400 text-xs mt-1">
                    {season.episode_count} Episode{season.episode_count > 1 ? 's' : ''}
                    {season.year && <span> · {season.year}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MediaDetailDialog