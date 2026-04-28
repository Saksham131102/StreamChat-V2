import { useState, useEffect } from 'react';
import { getTrending } from '../../api/media';
import type { IMedia } from '../../types/media';

interface UseTrendingReturn {
  data: IMedia[];
  isLoading: boolean;
  error: string | null;
}

// const MOCK_TRENDING_DATA: IMedia[] = [
//   // --- MOVIES ---
//   {
//     _id: 'm1', title: 'The Dark Knight', type: 'movie', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', genres: ['Action', 'Crime'],
//     language: 'en', release_date: '2008-07-18', created_at: '', trending_score: 98,
//     view_count: 5000, is_featured: false, cast: [], director: 'Christopher Nolan', search_tags: [],
//     media_assets: { poster: { public_id: '', url: '/mock_assets/robot.jpg' }, backdrop: { public_id: '', url: '/mock_assets/dragon.png' }, trailer: { public_id: '', url: '' } }
//   },
//   {
//     _id: 'm2', title: 'Inception', type: 'movie', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', genres: ['Sci-Fi', 'Action'],
//     language: 'en', release_date: '2010-07-16', created_at: '', trending_score: 95,
//     view_count: 4500, is_featured: false, cast: [], director: 'Christopher Nolan', search_tags: [],
//     media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '/mock_assets/dragon.png' }, trailer: { public_id: '', url: '' } }
//   },
//   {
//     _id: 'm3', title: 'Interstellar', type: 'movie', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', genres: ['Sci-Fi', 'Drama'],
//     language: 'en', release_date: '2014-11-07', created_at: '', trending_score: 97,
//     view_count: 4800, is_featured: false, cast: [], director: 'Christopher Nolan', search_tags: [],
//     media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '/mock_assets/dragon.png' }, trailer: { public_id: '', url: '' } }
//   },

//   // --- WEB SERIES ---
//   {
//     _id: 'w1', title: 'Breaking Bad', type: 'web_series', description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s financial future.', genres: ['Crime', 'Drama'],
//     language: 'en', release_date: '2008-01-20', created_at: '', trending_score: 99,
//     view_count: 10000, is_featured: true, cast: [], director: 'Vince Gilligan', search_tags: [],
//     total_seasons: 5,
//     media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
//   },
//   {
//     _id: 'w2', title: 'Stranger Things', type: 'web_series', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.', genres: ['Horror', 'Sci-Fi'],
//     language: 'en', release_date: '2016-07-15', created_at: '', trending_score: 92,
//     view_count: 8500, is_featured: false, cast: [], director: 'The Duffer Brothers', search_tags: [],
//     total_seasons: 4,
//     media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
//   },

//   // --- TV SHOWS ---
//   {
//     _id: 't1', title: 'Friends', type: 'tv', description: 'Follows the personal and professional lives of six twenty to thirty-something-year-olds living in Manhattan, New York City.', genres: ['Comedy', 'Romance'],
//     language: 'en', release_date: '1994-09-22', created_at: '', trending_score: 85,
//     view_count: 15000, is_featured: false, cast: [], director: 'David Crane', search_tags: [],
//     total_seasons: 10,
//     media_assets: { poster: { public_id: '', url: '' }, backdrop: { public_id: '', url: '' }, trailer: { public_id: '', url: '' } }
//   }
// ];

const MOCK_TRENDING_DATA: IMedia[] = [
  {
    _id: 'mock-1',
    title: 'The Batman',
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
      poster: { public_id: 'p1', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777301551/Poster_dx4xgl.jpg' },
      backdrop: { public_id: 'b1', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777301428/Backdrop_izbv85.jpg' },
      trailer: { public_id: 't1', url: '' }
    }
  },
  {
    _id: 'mock-2',
    title: 'F1: The Movie',
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
      poster: { public_id: 'p2', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777302420/Poster_iyqxkn.webp' },
      backdrop: { public_id: 'b2', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777302317/Backdrop_gyknqz.jpg' },
      trailer: { public_id: 't2', url: '' }
    }
  },
  {
    _id: 'mock-3',
    title: 'Project Hail Mary',
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
      poster: { public_id: 'p3', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777302748/Poster_pqhlkc.webp' },
      backdrop: { public_id: 'b3', url: 'https://res.cloudinary.com/dyaefxz5h/image/upload/v1777302748/Backdrop_qfh6zz.jpg' },
      trailer: { public_id: 't3', url: '' }
    },
    total_episodes: 10,
    
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
