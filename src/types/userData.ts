// User Data Types for Local Storage

export interface WatchProgress {
  contentId: string;
  contentType: 'movie' | 'episode';
  currentTime: number; // seconds
  duration: number; // seconds
  percentage: number; // 0-100
  lastWatched: string; // ISO date
  seasonNumber?: number;
  episodeNumber?: number;
  completed: boolean;
}

export interface WatchHistoryItem {
  contentId: string;
  contentType: 'movie' | 'show';
  watchedAt: string; // ISO date
  progress: number; // percentage watched
  completed: boolean;
  seasonNumber?: number;
  episodeNumber?: number;
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

export interface UserRatings {
  [contentId: string]: 'like' | 'dislike' | 'none';
}

export interface UserData {
  myList: string[]; // content IDs
  watchLater: string[]; // content IDs
  favorites: string[]; // content IDs
  continueWatching: WatchProgress[];
  watchHistory: WatchHistoryItem[];
  preferences: UserPreferences;
  searchHistory: string[];
  ratings: UserRatings;
  lastSync?: string; // ISO date
}

// Default preferences
export const defaultPreferences: UserPreferences = {
  language: 'en',
  playbackQuality: 'auto',
  autoPlay: true,
  autoPlayNextEpisode: true,
  downloadQuality: 'high',
  subtitles: {
    enabled: false,
    language: 'en',
    fontSize: 'medium',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  notifications: {
    email: true,
    push: true,
    newReleases: true,
    recommendations: true,
  },
};

// Default user data
export const defaultUserData: UserData = {
  myList: [],
  watchLater: [],
  favorites: [],
  continueWatching: [],
  watchHistory: [],
  preferences: defaultPreferences,
  searchHistory: [],
  ratings: {},
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_DATA: 'streamflix_user_data',
  VERSION: 'streamflix_version',
  LAST_UPDATE: 'streamflix_last_update',
} as const;

// Storage version for migrations
export const STORAGE_VERSION = '1.0.0';
