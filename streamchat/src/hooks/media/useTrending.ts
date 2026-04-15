import { useState, useEffect } from 'react';
import { getTrending } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseTrendingReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const useTrending = (type: string, limit = 20): UseTrendingReturn => {
  const [data, setData] = useState<IMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getTrending(type, limit)
      .then((res) => {
        if (!cancelled) setData(res.data.data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load trending content.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [type, limit]);

  return { data, isLoading, error };
};

export default useTrending;
