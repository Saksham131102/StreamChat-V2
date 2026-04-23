import { useState, useEffect } from 'react';
// import { getFeatured } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseFeaturedReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

const MOCK_DATA: IMedia[] = [
  {
    _id: 'mock-1',
    title: 'Neon Odyssey',
    type: 'movie',
    genres: ['Cyberpunk', 'Action', 'Sci-Fi'],
    language: 'en',
    release_date: '2024-12-25',
    created_at: new Date().toISOString(),
    trending_score: 95,
    view_count: 1000000,
    is_featured: true,
    cast: ['Hero One', 'Hero Two'],
    director: 'Visionary Director',
    search_tags: ['neon', 'future', 'cyberpunk'],
    description: 'In a rain-soaked metropolis of the year 2099, a rogue synthetic agent discovers a secret that could break the foundations of the digital world.',
    meta: { duration_mins: 142 },
    media_assets: {
      poster: { public_id: 'p1', url: '' }, // Assumes dragon.png is moved to public/
      backdrop: { public_id: 'b1', url: '/mock_assets/dragon.png' },
      trailer: { public_id: 't1', url: '' }
    }
  },
  {
    _id: 'mock-2',
    title: 'The Dragon\'s Reign',
    type: 'movie',
    genres: ['Fantasy', 'Adventure'],
    language: 'en',
    release_date: '2024-06-12',
    created_at: new Date().toISOString(),
    trending_score: 88,
    view_count: 500000,
    is_featured: true,
    cast: ['Warrior King', 'Mage'],
    director: 'Legendary Storyteller',
    search_tags: ['dragon', 'castle', 'magic'],
    description: 'An ancient evil wakes from its thousand-year slumber. Now, a fallen prince must unite the warring kingdoms to face the shadow of the wing.',
    meta: { duration_mins: 165 },
    media_assets: {
      poster: { public_id: 'p2', url: '' },
      backdrop: { public_id: 'b2', url: '/mock_assets/dragon.png' },
      trailer: { public_id: 't2', url: '' }
    }
  },
  {
    _id: 'mock-3',
    title: 'Starship Frontline',
    type: 'web_series',
    genres: ['Sci-Fi', 'War', 'Drama'],
    language: 'en',
    release_date: '2024-08-01',
    created_at: new Date().toISOString(),
    trending_score: 92,
    view_count: 800000,
    is_featured: true,
    cast: ['Captain', 'Pilot'],
    director: 'Space Maestro',
    search_tags: ['space', 'battle', 'ships'],
    description: 'When the outer colonies go dark, the crew of the BFS Aegis is sent on a suicide mission to the edge of the galaxy.',
    total_seasons: 3,
    media_assets: {
      poster: { public_id: 'p3', url: '' },
      backdrop: { public_id: 'b3', url: '/mock_assets/dragon.png' },
      trailer: { public_id: 't3', url: '' }
    }
  }
];

const useFeatured = (limit = 10): UseFeaturedReturn => {
  const [data, setData] = useState<IMedia[]>(MOCK_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /* 
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
    */
  }, [limit]);

  return { data, isLoading, error };
};

export default useFeatured;
