export enum ContentType {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES'
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string; // Base64
  backgroundImage: string; // Base64
  streamUrl: string;
  downloadUrl: string;
  year: string;
  country: string;
  duration: string;
  quality: string;
  views: number;
  addedAt: number;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  coverImage: string; // Base64
  backgroundImage: string; // Base64
  category: string;
  year: string;
  seasonsCount: number;
  addedAt: number;
}

export interface Episode {
  id: string;
  seriesId: string;
  episodeNumber: number;
  title?: string;
  streamUrl: string;
  image?: string;
  addedAt: number;
}

export interface DashboardStats {
  totalMovies: number;
  totalSeries: number;
  totalEpisodes: number;
  totalViews: number;
}