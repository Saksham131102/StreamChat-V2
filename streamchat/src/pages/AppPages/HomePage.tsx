import FeaturedCarousel from "@/components/FeaturedCarousel/FeaturedCarousel";
import TrendingRow from "../../components/TrendingRow/TrendingRow";

const HomePage = () => {
  return (
    <div className="py-3 min-h-screen bg-black space-y-10">
      <FeaturedCarousel />
      <TrendingRow title="Trending Movies"      type="movie"      limit={20} />
      <TrendingRow title="Trending Web Series"  type="web_series" limit={20} />
      <TrendingRow title="Trending TV Shows"    type="tv"         limit={20} />
    </div>
  );
};

export default HomePage;
