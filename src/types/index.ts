export * from './userData';

export interface Movie {
  _id: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number; // in minutes
  rating: number;
  genre: string[];
  cast: string[];
  director: string;
  thumbnail: string;
  backdrop: string;
  videoUrl: string;
  quality: 'HD' | 'FHD' | '4K';
  isTrending?: boolean;
  isNewRelease?: boolean;
  maturityRating: string;
  language: string;
  subtitles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  duration: number;
  description?: string;
  thumbnail?: string;
  videoUrl: string;
  rating?: number;
  releaseDate?: Date;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
  description?: string;
  releaseYear?: number;
}

export interface TVShow {
  _id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  genre: string[];
  cast: string[];
  creator: string;
  thumbnail: string;
  backdrop: string;
  videoUrl: string;
  quality: 'HD' | 'FHD' | '4K';
  isTrending?: boolean;
  isNewRelease?: boolean;
  maturityRating: string;
  language: string;
  subtitles: string[];
  seasons: Season[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Genre {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
}

export interface ContinueWatching {
  movieId?: string;
  showId?: string;
  progress: number; // percentage watched
  lastWatched: Date;
  season?: number;
  episode?: number;
}

export interface UserPreferences {
  language: string;
  playbackQuality: 'auto' | '360p' | '480p' | '720p' | '1080p' | '4K';
  autoPlay: boolean;
  autoPlayNextEpisode: boolean;
  downloadQuality: 'low' | 'medium' | 'high';
  subtitles: {
    enabled: boolean;
    language: string;
    fontSize: 'small' | 'medium' | 'large';
    backgroundColor: string;
    textColor: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    newReleases: boolean;
    recommendations: boolean;
  };
}

export interface WatchlistItem {
  id: string;
  type: 'movie' | 'show';
  addedAt: Date;
}

export type VideoQuality = '360p' | '480p' | '720p' | '1080p' | '4K';

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  quality: VideoQuality;
  playbackRate: number;
  isBuffering: boolean;
  error: string | null;
}

export type ContentType = 'movie' | 'show';

export interface ContentItem {
  _id: string;
  type: ContentType;
  title: string;
  thumbnail: string;
  backdrop: string;
  rating: number;
  releaseYear: number;
  genre: string[];
  description: string;
  videoUrl: string;
  quality: 'HD' | 'FHD' | '4K';
  maturityRating: string;
}

export interface SearchState {
  query: string;
  results: ContentItem[];
  isLoading: boolean;
  recentSearches: string[];
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'new-release' | 'episode' | 'recommendation' | 'system';
  isRead: boolean;
  createdAt: Date;
  imageUrl?: string;
  actionUrl?: string;
}
