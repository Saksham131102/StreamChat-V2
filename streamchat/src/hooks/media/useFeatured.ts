import { useState, useEffect } from 'react';
import { getFeatured } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseFeaturedReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const useFeatured = (limit = 10): UseFeaturedReturn => {
  const [data, setData] = useState<IMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getFeatured(limit)
      .then((res) => {
        if (!cancelled) setData(res.data.data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load featured content.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { data, isLoading, error };
};

export default useFeatured;
