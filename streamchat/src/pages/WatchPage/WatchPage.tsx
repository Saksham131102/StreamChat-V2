import VideoPlayer from "@/components/VideoPlayer/VideoPlayer"
import type { IMedia } from "@/types/media"
// import { FaUsers } from 'react-icons/fa6'
import WatchPartyButton from "@/components/WatchPartyButton/WatchPartyButton"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getMediaById } from "@/api/media"

// function PlayIcon() {
//   return (
//     <svg viewBox="0 0 12 14" fill="currentColor" className="w-3.5 h-3.5">
//       <path d="M1 1l10 6L1 13V1z" />
//     </svg>
//   )
// }

const WatchPage = () => {
  const { id } = useParams();
  const [media, setMedia] = useState<IMedia | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    let isMounted = true;
    setIsLoading(true);
    
    const fetchMedia = async () => {
      try {
        const res = await getMediaById(id);
        if (isMounted) {
          setMedia(res.data.data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load media:", err);
          setIsLoading(false);
        }
      }
    };

    fetchMedia();
      
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-black text-white">
        <div className="w-full max-w-[1300px] aspect-[16/9] mx-auto bg-white/10 animate-pulse" />
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-0 pt-6 sm:pt-8 pb-16">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="h-8 sm:h-12 w-2/3 max-w-[600px] bg-white/10 animate-pulse rounded-lg" />
            <div className="h-9 sm:h-10 w-28 sm:w-32 bg-white/10 animate-pulse rounded-lg" />
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-5">
            <div className="h-6 w-16 bg-white/10 animate-pulse rounded" />
            <div className="h-6 w-20 bg-white/10 animate-pulse rounded" />
            <div className="h-6 w-24 bg-white/10 animate-pulse rounded" />
          </div>
          <div className="flex gap-2 mt-4 sm:mt-5">
            <div className="h-6 w-20 bg-white/10 animate-pulse rounded-full" />
            <div className="h-6 w-20 bg-white/10 animate-pulse rounded-full" />
            <div className="h-6 w-20 bg-white/10 animate-pulse rounded-full" />
          </div>
          <hr className="border-none h-[1px] bg-white/10 my-6 sm:my-7" />
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 mt-1">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded mb-4" />
              <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
              <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded mb-4" />
              <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
              <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
              <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl font-bold">Media not found</h2>
      </div>
    );
  }

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
        <VideoPlayer src={media.media_assets.trailer.url} poster={media.media_assets.backdrop.url} />
      </div>

      {/* ── Movie Details ── */}
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-0 pt-6 sm:pt-8 pb-16">
        {/* Title + Action Buttons */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight m-0">{media.title}</h1>
          <div className="flex gap-2 sm:gap-3 items-center flex-shrink-0">
            <WatchPartyButton mediaId={media._id} />
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

        <hr className="border-none h-[1px] bg-white/15 my-6 sm:my-7" />

        {/* Content: Description + Sidebar Info */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 mt-1">
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
            <hr className="border-none h-[1px] bg-white/5 my-6 sm:my-7" />
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-3">Seasons</h3>
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 mt-3.5">
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