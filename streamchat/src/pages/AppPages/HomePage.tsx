import Carousel from "../../components/Carousel/Carousel";
import TrendingRow from "../../components/TrendingRow/TrendingRow";

const HomePage = () => {
  return (
    <div className="px-4 py-6 min-h-screen bg-black space-y-10">
      <Carousel />
      <TrendingRow title="🔥 Trending Movies"      type="movie"      limit={20} />
      <TrendingRow title="📺 Trending Web Series"  type="web_series" limit={20} />
      <TrendingRow title="🎙️ Trending TV Shows"    type="tv"         limit={20} />
    </div>
  );
};

export default HomePage;
