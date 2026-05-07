import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseTrendingReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const useTrending = (type: string, limit = 20): UseTrendingReturn => {
  const query = useQuery({
    queryKey: ['trending', type, limit],
    queryFn: () => getTrending(type, limit),
    select: (res) => res.data.data,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? 'Failed to load trending content.' : null
  }
};

export default useTrending;
