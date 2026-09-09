import { useQuery } from "@tanstack/react-query";
import { getFeatured } from '../../api/media';
import type { IMedia } from '../../types/media';
import { useAuthContext } from '../../contexts/authContext';

interface UseFeaturedReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const useFeatured = (limit = 10): UseFeaturedReturn => {
  const { authUser } = useAuthContext();
  const query = useQuery({
    queryKey: ['featured', limit],
    queryFn: () => getFeatured(limit),
    enabled: !!authUser, // Don't fire when user is logged out
    select: (res) => res.data.data,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? 'Failed to load featured content.' : null
  }
};

export default useFeatured;
