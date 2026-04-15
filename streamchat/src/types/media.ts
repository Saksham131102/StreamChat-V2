export interface IMediaAsset {
  public_id: string;
  url: string;
}

export interface IStreamAsset {
  public_id: string;
  hls_url: string;
  dash_url: string;
}

export interface ISeasonSummary {
  season_no: number;
  episode_count: number;
  year: number;
}

export interface IMedia {
  _id: string;
  title: string;
  type: 'movie' | 'web_series' | 'tv' | string;
  genres: string[];
  language: string;
  release_date: string;
  created_at: string;

  trending_score: number;
  view_count: number;
  is_featured: boolean;

  cast: string[];
  director: string;
  search_tags: string[];

  meta?: {
    duration_mins: number;
  };

  media_assets: {
    poster: IMediaAsset;
    backdrop: IMediaAsset;
    trailer: IMediaAsset;
    stream?: IStreamAsset; // movies only
  };

  // web_series / tv only
  seasons_summary?: ISeasonSummary[];
  total_seasons?: number;
  total_episodes?: number;
}

export interface IEpisode {
  _id: string;
  media_id: string;
  season_no: number;
  episode_no: number;
  title: string;
  description: string;
  duration_mins: number;
  air_date: string;
  media_assets: {
    thumbnail: IMediaAsset;
    stream: IStreamAsset;
  };
}

export interface ITrendingResponse {
  data: IMedia[];
}
