import useFeatured from "@/hooks/media/useFeatured";
import type { IMedia } from "@/types/media";
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import MediaDetailDialog from "../MediaDetailDialog/MediaDetailDialog";
// useLayoutEffect is used to keep totalRef in sync without triggering loop restarts.

// ─── Constants ────────────────────────────────────────────────────────────────

const AUTOPLAY_DURATION = 5000;

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkeletonSlide() {
  return (
    <div className="relative w-full aspect-[21/9] bg-[#0f0e1a] animate-pulse rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 p-10 space-y-3 w-1/2">
        <div className="h-4 w-24 bg-white/10 rounded-full" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-white/10 rounded-full" />
          <div className="h-5 w-16 bg-white/10 rounded-full" />
        </div>
        <div className="h-10 w-72 bg-white/10 rounded-lg" />
        <div className="h-4 w-80 bg-white/[0.07] rounded" />
        <div className="h-4 w-64 bg-white/[0.07] rounded" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-32 bg-white/10 rounded-xl" />
          <div className="h-10 w-10 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

interface SlideProps {
  media: IMedia;
  isActive: boolean;
}

function Slide({ media, isActive }: SlideProps) {
  // const badge =
  //   media.trending_score >= 90
  //     ? "🔥 Now Trending"
  //     : media.type === "web_series"
  //     ? "📺 Series"
  //     : "🎬 Featured";

  const meta =
    media.type === "web_series"
      ? `${media.total_seasons} Season${(media.total_seasons ?? 0) > 1 ? "s" : ""}`
      : media.meta?.duration_mins
      ? `${media.meta.duration_mins} min`
      : null;

  return (
    <div className="relative min-w-full aspect-[21/9] overflow-hidden">
      {/* Backdrop */}
      <img
        src={media.media_assets.backdrop.url || "/placeholder-backdrop.jpg"}
        alt={media.title}
        className={[
          "w-full h-full object-cover object-center"
        ].join(" ")}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080714]/90 via-[#080714]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080714]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-9 max-w-[58%] space-y-3">
        {/* Badge */}
        {/* <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase bg-white/10 border border-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
          {badge}
        </span> */}

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {media.genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className="text-[11px] border border-white/25 text-white/80 px-3 py-1 rounded-full bg-white/10 tracking-wide"
            >
              {g}
            </span>
          ))}
          {/* {meta && (
            <span className="text-[11px] border border-red-500/40 text-red-400 px-3 py-1 rounded-full tracking-wide">
              {meta}
            </span>
          )} */}
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h2
          className={[
            "font-black text-white leading-none tracking-tight transition-all duration-500 delay-200",
            "text-4xl sm:text-5xl",
            "[font-family:'Bebas_Neue',sans-serif]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          {media.title}
        </h2>
        <span>
          {meta && (
            <span className="text-[11px] border border-red-500/40 text-red-400 px-3 py-1.5 rounded-full tracking-wide">
              {meta}
            </span>
          )}
        </span>
        </div>

        {/* Description */}
        <p
          className={[
            "text-[13px] text-white/60 leading-relaxed font-light line-clamp-2 transition-all duration-500 delay-300",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          {media.description}
        </p>

        {/* Actions */}
        <div
          className={[
            "flex items-center gap-3 pt-1 transition-all duration-500 delay-[450ms]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer">
            <PlayIcon />
            Watch Now
          </button>

          {/* <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 cursor-pointer">
            <DownloadIcon />
          </button> */}

          <Dialog>
            <DialogTrigger>
              <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 cursor-pointer">
                <MoreIcon />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[85vh] p-0 bg-[#0a0a0a] text-white ring-1 ring-white/10 overflow-hidden border-none shadow-2xl">
              <MediaDetailDialog media={media} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
      <path d="M1 1l10 6L1 13V1z" />
    </svg>
  );
}

// function DownloadIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
//       <polyline points="7 10 12 15 17 10" />
//       <line x1="12" y1="15" x2="12" y2="3" />
//     </svg>
//   );
// }

function MoreIcon() {
  return (
    <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor">
      <circle cx="2" cy="2" r="2" />
      <circle cx="8" cy="2" r="2" />
      <circle cx="14" cy="2" r="2" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FeaturedCarousel() {
  const { data, isLoading, error } = useFeatured(10);

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides: IMedia[] = data ?? [];
  const total = slides.length;

  const rafRef      = useRef<number | null>(null);
  const elapsedRef  = useRef(0);             // ms consumed in the current slide's 5s window
  const lastTickRef = useRef<number | null>(null); // timestamp of the previous RAF frame
  const totalRef    = useRef(total);

  // Keep totalRef in sync so the RAF callback always sees the latest value
  // without being listed as a dependency (which would restart the loop)
  useLayoutEffect(() => { totalRef.current = total; }, [total]);

  const goTo = useCallback((index: number) => {
    // Reset the stopwatch — the useEffect below will start a fresh loop
    // because setCurrent triggers a re-render which re-runs the effect
    elapsedRef.current = 0;
    lastTickRef.current = null;
    setProgress(0);
    setCurrent((index + totalRef.current) % totalRef.current);
  }, []);

  /**
   * Single useEffect owns the entire RAF lifecycle.
   * It re-runs whenever `current`, `isHovered`, or `total` changes.
   *
   * On every run:
   *  1. Cancel any existing pending frame (prevents duplicate loops)
   *  2. If hovered → do nothing, loop stays cancelled
   *  3. If not hovered → start a fresh loop from current elapsedRef value
   *
   * This means:
   *  - Slide change   → current changes → effect re-runs → elapsedRef was
   *                     already reset in goTo/advanceSlide → loop starts at 0
   *  - Hover          → isHovered changes → effect re-runs → loop cancelled
   *  - Mouse leave    → isHovered changes → effect re-runs → loop resumes
   *                     from wherever elapsedRef is (pause is preserved)
   */
  useEffect(() => {
    if (total === 0) return;

    // Always cancel any previously scheduled frame first
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (isHovered) return; // paused — leave elapsedRef untouched

    // Resume (or start fresh) from current elapsedRef value
    const tick = (timestamp: number) => {
      // First frame after a start/resume: anchor lastTickRef so delta = 0
      if (lastTickRef.current === null) lastTickRef.current = timestamp;

      const delta = timestamp - lastTickRef.current;
      lastTickRef.current = timestamp;
      elapsedRef.current += delta;

      const pct = Math.min((elapsedRef.current / AUTOPLAY_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsedRef.current >= AUTOPLAY_DURATION) {
        // Advance slide — reset stopwatch then update current
        // setCurrent triggers a re-render → useEffect re-runs → fresh loop starts
        elapsedRef.current = 0;
        lastTickRef.current = null;
        setProgress(0);
        setCurrent((prev) => (prev + 1) % totalRef.current);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, isHovered, total]);

  // ── Render ──────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="w-full aspect-[21/9] rounded-2xl bg-[#0f0e1a] flex items-center justify-center text-white/40 text-sm">
        Failed to load featured content.
      </div>
    );
  }

  if (isLoading || total === 0) {
    return <SkeletonSlide />;
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((media, i) => (
          <Slide key={media._id} media={media} isActive={i === current} />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 right-6 flex items-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={[
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              i === current
                ? "w-6 bg-white"
                : "w-1.5 bg-white/30 hover:bg-white/60",
            ].join(" ")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600 to-red-400 z-10 transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}