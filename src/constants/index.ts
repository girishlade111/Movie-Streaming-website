export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || 'https://image.tmdb.org/t/p';

export const VIDEO_PLAYER_CONFIG = {
  controls: {
    playLarge: true,
    play: true,
    restart: true,
    rewind: true,
    fastForward: true,
    progress: true,
    currentTime: true,
    mute: true,
    volume: true,
    captions: true,
    settings: true,
    pip: true,
    airplay: true,
    fullscreen: true,
  },
  settings: ['quality', 'speed', 'loop'],
  speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    quality: '720p',
    ads: true,
    downloads: false,
  },
  BASIC: {
    name: 'Basic',
    price: 9.99,
    quality: '1080p',
    ads: false,
    downloads: true,
  },
  PREMIUM: {
    name: 'Premium',
    price: 19.99,
    quality: '4K',
    ads: false,
    downloads: true,
  },
};

export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Western',
];

export const MOVIE_CATEGORIES = {
  TRENDING: 'trending',
  NEW_RELEASE: 'new-release',
  TOP_RATED: 'top-rated',
  ACTION: 'action',
  COMEDY: 'comedy',
  DRAMA: 'drama',
  SCI_FI: 'sci-fi',
};
