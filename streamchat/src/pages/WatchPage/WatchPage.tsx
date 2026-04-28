import VideoPlayer from "@/components/VideoPlayer/VideoPlayer"
import type { IMedia } from "@/types/media"
import { FaUsers } from 'react-icons/fa6'

const MOCK_DATA: IMedia = {
  _id: 'mock-1',
  title: 'The Batman',
  type: 'movie',
  genres: ['Cyberpunk', 'Action', 'Sci-Fi'],
  language: 'en',
  release_date: '2024-12-25',
  created_at: new Date().toISOString(),
  trending_score: 95,
  view_count: 1000000,
  is_featured: true,
  cast: ['Hero One', 'Hero Two'],
  director: 'Visionary Director',
  search_tags: ['neon', 'future', 'cyberpunk'],
  description: 'In a rain-soaked metropolis of the year 2099, a rogue synthetic agent discovers a secret that could break the foundations of the digital world.',
  meta: { duration_mins: 142 },
  media_assets: {
    poster: { public_id: 'p1', url: 'https://res.cloudinary.com/dvkt1djfc/image/upload/v1728037490/thumbnailWithImage_myrflh.jpg' },
    backdrop: { public_id: 'b1', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777301428/Backdrop_izbv85.jpg' },
    trailer: { public_id: 't1', url: 'https://res.cloudinary.com/dvkt1djfc/video/upload/v1728037696/trailer_xfsfao.mp4' }
  }
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 14" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M1 1l10 6L1 13V1z" />
    </svg>
  )
}

const WatchPage = () => {
  const media = MOCK_DATA;

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* ── Video Player Placeholder ── */}
      {/* <div 
        className="w-full max-w-[1300px] aspect-[16/9] rounded-xl mx-auto  bg-linear-to-br from-[#0a0a0a] via-[#141414] to-[#0a0a0a] border-b border-white/5 relative overflow-hidden flex items-center justify-center group" 
        id="video-player-container"
      > */}
        {/* Decorative Grid */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        
        <div className="flex flex-col items-center gap-4 text-white/30 select-none relative z-10">
          <div className="w-[72px] h-[72px] rounded-full bg-red-600/15 border-2 border-red-600/30 flex items-center justify-center transition-all duration-300 group-hover:bg-red-600/20 group-hover:scale-110">
            <svg viewBox="0 0 12 14" className="w-7 h-7 fill-red-600/60 ml-1">
              <path d="M1 1l10 6L1 13V1z" />
            </svg>
          </div>
          <span className="text-[13px] font-medium tracking-wider uppercase text-white/25">Video Player</span>
        </div>
      </div> */}
      <div className="w-full max-w-[1300px] aspect-[16/9] mx-auto">
        <VideoPlayer src={media.media_assets.trailer.url} poster={media.media_assets.poster.url} />
      </div>

      {/* ── Movie Details ── */}
      <div className="mx-auto max-w-[1300px] pt-8 pb-16">
        {/* Title + Action Buttons */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight m-0">{media.title}</h1>
          <div className="flex gap-3 items-center flex-shrink-0">
            {/* <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm bg-red-600 shadow-[0_4px_20px_rgba(220,38,38,0.25)] hover:bg-red-700 transition-all active:scale-95 text-white cursor-pointer">
              <PlayIcon /> Play
            </button> */}
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm bg-purple-600 shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:bg-purple-700 transition-all active:scale-95 text-white cursor-pointer">
              <FaUsers /> Watch Party
            </button>
          </div>
        </div>

        {/* Meta Tags */}
        <div className="flex items-center flex-wrap gap-2.5 mt-5">
          {media.trending_score > 0 && (
            <span className="text-green-500 font-bold text-sm">{media.trending_score}% Match</span>
          )}
          {media.meta?.duration_mins && (
            <span className="text-[11px] px-2.5 py-1 rounded font-medium border border-red-500/40 text-red-400">
              {Math.floor(media.meta.duration_mins / 60)}h {media.meta.duration_mins % 60}m
            </span>
          )}
          {media.total_seasons && (
            <span className="text-[11px] px-2.5 py-1 rounded font-medium border border-red-500/40 text-red-400">
              {media.total_seasons} Season{media.total_seasons > 1 ? 's' : ''}
            </span>
          )}
          {media.total_episodes && (
            <span className="text-[11px] px-2.5 py-1 rounded font-medium border border-neutral-700 text-neutral-400">
              {media.total_episodes} Episode{media.total_episodes > 1 ? 's' : ''}
            </span>
          )}
          <span className="text-[11px] px-2.5 py-1 rounded font-medium border border-neutral-700 text-neutral-400 uppercase">{media.language}</span>
          {media.is_featured && (
            <span className="text-[11px] px-2.5 py-1 rounded bg-yellow-500/15 text-yellow-500 border border-yellow-500/30 font-semibold">⭐ Featured</span>
          )}
        </div>

        {/* Genre Chips */}
        <div className="flex flex-wrap gap-2 mt-5">
          {media.genres.map((g) => (
            <span key={g} className="text-xs border border-white/15 text-white/75 px-3.5 py-1 rounded-full bg-white/5 tracking-tight transition-all hover:bg-white/10 hover:border-white/25">
              {g}
            </span>
          ))}
        </div>

        <hr className="border-none h-[1px] bg-white/15 my-7" />

        {/* Content: Description + Sidebar Info */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 mt-1">
          {/* Left – Description */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-3">Synopsis</h3>
            <p className="text-[15px] leading-relaxed text-neutral-300 font-light m-0">{media.description}</p>
          </div>

          {/* Right – Info Sidebar */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-3">Details</h3>
            <div className="flex flex-col gap-3.5">
              {media.director && (
                <div className="text-sm">
                  <span className="text-neutral-500 mr-1">Director:</span>
                  <span className="text-neutral-300">{media.director}</span>
                </div>
              )}
              {media.cast?.length > 0 && (
                <div className="text-sm">
                  <span className="text-neutral-500 mr-1">Cast:</span>
                  <span className="text-neutral-300">{media.cast.join(', ')}</span>
                </div>
              )}
              {media.genres?.length > 0 && (
                <div className="text-sm">
                  <span className="text-neutral-500 mr-1">Genres:</span>
                  <span className="text-neutral-300">{media.genres.join(', ')}</span>
                </div>
              )}
              {media.release_date && (
                <div className="text-sm">
                  <span className="text-neutral-500 mr-1">Release Date:</span>
                  <span className="text-neutral-300">
                    {new Date(media.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {media.view_count > 0 && (
                <div className="text-sm">
                  <span className="text-neutral-500 mr-1">Views:</span>
                  <span className="text-neutral-300">{media.view_count.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seasons Summary (web_series / tv) */}
        {media.seasons_summary && media.seasons_summary.length > 0 && (
          <div className="mt-8">
            <hr className="border-none h-[1px] bg-white/5 my-7" />
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-3">Seasons</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 mt-3.5">
              {media.seasons_summary.map((season) => (
                <div key={season.season_no} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center transition-all duration-200 hover:bg-white/10 hover:border-red-600/30">
                  <div className="text-base font-bold text-white">Season {season.season_no}</div>
                  <div className="text-xs text-neutral-400 mt-1">
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

export default WatchPage