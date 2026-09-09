import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../../api/media';
import type { IMedia } from '../../types/media';
import { useAuthContext } from '../../contexts/authContext';

interface UseTrendingReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const useTrending = (type: string, limit = 20): UseTrendingReturn => {
  const { authUser } = useAuthContext();
  const query = useQuery({
    queryKey: ['trending', type, limit],
    queryFn: () => getTrending(type, limit),
    enabled: !!authUser, // Don't fire when user is logged out
    select: (res) => res.data.data,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? 'Failed to load trending content.' : null
  }
};

export default useTrending;
