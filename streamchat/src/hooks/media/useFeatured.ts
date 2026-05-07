import { useQuery } from "@tanstack/react-query";
import { getFeatured } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseFeaturedReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const useFeatured = (limit = 10): UseFeaturedReturn => {
  const query = useQuery({
    queryKey: ['featured', limit],
    queryFn: () => getFeatured(limit),
    select: (res) => res.data.data,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? 'Failed to load featured content.' : null
  }
};

export default useFeatured;
