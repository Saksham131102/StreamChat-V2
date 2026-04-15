import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import useFeatured from '../../hooks/media/useFeatured';

/** Skeleton shown while featured data is loading */
const CarouselSkeleton = () => (
  <div className="rounded-2xl h-[700px] w-full bg-neutral-800 animate-pulse" />
);

const Carousel = () => {
  const { data, isLoading, error } = useFeatured(10);

  if (isLoading) return <CarouselSkeleton />;

  if (error) {
    return (
      <div className="rounded-2xl h-[700px] w-full bg-neutral-900 flex items-center justify-center">
        <p className="text-neutral-500 text-sm">{error}</p>
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <Swiper
      navigation={true}
      pagination={{ dynamicBullets: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={data.length > 1}
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper rounded-2xl h-[700px] overflow-hidden"
    >
      {data.map((media) => {
        const backdrop = media.media_assets?.backdrop?.url;
        const poster   = media.media_assets?.poster?.url;
        const year     = media.release_date
          ? new Date(media.release_date).getFullYear()
          : null;

        return (
          <SwiperSlide key={media._id}>
            {/* Background image */}
            <img
              src={backdrop || poster || ''}
              alt={media.title}
              className="w-full h-full object-cover block"
              loading="lazy"
            />

            {/* Bottom gradient overlay with title info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-14 left-8 right-8 pointer-events-none">
              {/* Genre pills */}
              {media.genres?.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {media.genres.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-white/80 border border-white/20 backdrop-blur-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
                {media.title}
              </h2>

              {/* Meta row */}
              <div className="flex items-center gap-3 mt-2 text-neutral-300 text-sm">
                {year && <span>{year}</span>}
                {media.meta?.duration_mins && (
                  <span>{media.meta.duration_mins} min</span>
                )}
                {media.total_seasons && (
                  <span>{media.total_seasons} Season{media.total_seasons > 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;