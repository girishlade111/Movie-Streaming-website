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
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  avatar?: string;
  watchlist: string[];
  watchHistory: WatchHistory[];
  subscription?: Subscription;
  createdAt: Date;
}

export interface WatchHistory {
  movieId: string;
  progress: number; // percentage watched
  lastWatched: Date;
}

export interface Subscription {
  plan: 'free' | 'basic' | 'premium';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface Genre {
  _id: string;
  name: string;
  slug: string;
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
}
