import { apiClient } from './client';
import type { IMedia } from '../types/media';

// API to get trending media items by type (movies, web_series, tv)
export const getTrending = (type: string, limit = 20) =>
  apiClient.get<{ data: IMedia[] }>('/media/trending', {
    params: { type, limit },
  });

// API to get featured media items for the hero carousel
export const getFeatured = (limit = 10) =>
  apiClient.get<{ data: IMedia[] }>('/media/featured', {
    params: { limit },
  });

// API to get media item by ID
export const getMediaById = (id: string) =>
  apiClient.get<{ data: IMedia }>(`/media/${id}`);
