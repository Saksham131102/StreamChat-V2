import useTrending from '../../hooks/media/useTrending';
import MediaCard from '../MediaCard/MediaCard';
import type { IMedia } from '../../types/media';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import MediaDetailDialog from '../MediaDetailDialog/MediaDetailDialog';

interface TrendingRowProps {
  title: string;
  type: string;
  limit?: number;
  onCardClick?: (media: IMedia) => void;
}

/** Skeleton card shown while loading */
const SkeletonCard = () => (
  <div className="flex-shrink-0 w-40 sm:w-44 md:w-48 h-64 rounded-xl bg-neutral-800 animate-pulse" />
);

const TrendingRow = ({ title, type, limit = 20, onCardClick }: TrendingRowProps) => {
  const { data, isLoading, error } = useTrending(type, limit);

  return (
    <section className="w-full">
      {/* Section heading */}
      <h2 className="text-white text-xl font-bold mb-4 px-1 tracking-tight">
        {title}
      </h2>

      {/* Error state */}
      {error && !isLoading && (
        <p className="text-neutral-500 text-sm px-1">{error}</p>
      )}

      {/* Scrollable row */}
      <div
        className="flex gap-4 overflow-x-auto pb-3
                   scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : data.map((media) => (
              <Dialog>
                <DialogTrigger>
                  <MediaCard
                    key={media._id}
                    media={media}
                    onClick={onCardClick}
                  /> 
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[85vh] p-0 bg-[#0a0a0a] text-white ring-1 ring-white/10 overflow-hidden border-none shadow-2xl">
                  <MediaDetailDialog media={media} />
                </DialogContent>
              </Dialog>
            ))}

        {/* Empty state */}
        {!isLoading && !error && data.length === 0 && (
          <p className="text-neutral-600 text-sm px-1 py-8">
            Nothing trending right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default TrendingRow;
