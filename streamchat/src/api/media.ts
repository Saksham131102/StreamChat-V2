import { apiClient } from './client';
import type { ITrendingResponse, IMedia } from '../types/media';

/**
 * Fetch trending media items by type.
 * Endpoint: GET /media/trending?type=movie&limit=20
 */
export const getTrending = (type: string, limit = 20) =>
  apiClient.get<ITrendingResponse>('/media/trending', {
    params: { type, limit },
  });

/**
 * Fetch featured media items for the hero carousel.
 * Endpoint: GET /media/featured?limit=10
 */
export const getFeatured = (limit = 10) =>
  apiClient.get<ITrendingResponse>('/media/featured', {
    params: { limit },
  });

/**
 * Fetch a single media item by ID.
 * Endpoint: GET /media/:id
 */
export const getMediaById = (id: string) =>
  apiClient.get<{ data: IMedia }>(`/media/${id}`);
