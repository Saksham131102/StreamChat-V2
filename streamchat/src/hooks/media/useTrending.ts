import { useState, useEffect } from 'react';
import { getTrending } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseTrendingReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const MOCK_TRENDING_DATA: IMedia[] = [
  // --- MOVIES ---
  {
    _id: 'm1', title: 'The Dark Knight', type: 'movie', genres: ['Action', 'Crime'],
    language: 'en', release_date: '2008-07-18', created_at: '', trending_score: 98,
    view_count: 5000, is_featured: false, cast: [], director: 'Christopher Nolan', search_tags: [],
    media_assets: { poster: { public_id: '', url: '/mock_assets/robot.jpg' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
  },
  {
    _id: 'm2', title: 'Inception', type: 'movie', genres: ['Sci-Fi', 'Action'],
    language: 'en', release_date: '2010-07-16', created_at: '', trending_score: 95,
    view_count: 4500, is_featured: false, cast: [], director: 'Christopher Nolan', search_tags: [],
    media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
  },
  {
    _id: 'm3', title: 'Interstellar', type: 'movie', genres: ['Sci-Fi', 'Drama'],
    language: 'en', release_date: '2014-11-07', created_at: '', trending_score: 97,
    view_count: 4800, is_featured: false, cast: [], director: 'Christopher Nolan', search_tags: [],
    media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
  },

  // --- WEB SERIES ---
  {
    _id: 'w1', title: 'Breaking Bad', type: 'web_series', genres: ['Crime', 'Drama'],
    language: 'en', release_date: '2008-01-20', created_at: '', trending_score: 99,
    view_count: 10000, is_featured: true, cast: [], director: 'Vince Gilligan', search_tags: [],
    total_seasons: 5,
    media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
  },
  {
    _id: 'w2', title: 'Stranger Things', type: 'web_series', genres: ['Horror', 'Sci-Fi'],
    language: 'en', release_date: '2016-07-15', created_at: '', trending_score: 92,
    view_count: 8500, is_featured: false, cast: [], director: 'The Duffer Brothers', search_tags: [],
    total_seasons: 4,
    media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
  },

  // --- TV SHOWS ---
  {
    _id: 't1', title: 'Friends', type: 'tv', genres: ['Comedy', 'Romance'],
    language: 'en', release_date: '1994-09-22', created_at: '', trending_score: 85,
    view_count: 15000, is_featured: false, cast: [], director: 'David Crane', search_tags: [],
    total_seasons: 10,
    media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
  }
];

const useTrending = (type: string, limit = 20): UseTrendingReturn => {
  // Filter mock data based on requested type
  const filteredData = MOCK_TRENDING_DATA
    .filter(item => item.type === type)
    .slice(0, limit);

  const [data, setData] = useState<IMedia[]>(filteredData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /*
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
    */
  }, [type, limit]);

  return { data, isLoading, error };
};

export default useTrending;
