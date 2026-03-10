import { create } from 'zustand';
import type { Movie } from '../types';

interface PlayerState {
  currentMovie: Movie | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  quality: string;
  playbackRate: number;
  showControls: boolean;
  
  // Actions
  setCurrentMovie: (movie: Movie | null) => void;
  play: () => void;
  pause: () => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setQuality: (quality: string) => void;
  setPlaybackRate: (rate: number) => void;
  toggleControls: () => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentMovie: null,
  isPlaying: false,
  progress: 0,
  volume: 1,
  isMuted: false,
  isFullscreen: false,
  quality: '1080p',
  playbackRate: 1,
  showControls: true,

  setCurrentMovie: (movie) => set({ currentMovie: movie, progress: 0 }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setProgress: (progress) => set({ progress }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  setQuality: (quality) => set({ quality }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
  reset: () => set({
    currentMovie: null,
    isPlaying: false,
    progress: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    quality: '1080p',
    playbackRate: 1,
    showControls: true,
  }),
}));
