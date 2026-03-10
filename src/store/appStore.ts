import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie, TVShow, ContinueWatching, WatchlistItem, UserPreferences } from '../types';
import { movies, tvShows, continueWatching as initialContinueWatching, defaultPreferences } from '../constants/mockData';

interface AppState {
  // Search
  searchQuery: string;
  recentSearches: string[];
  
  // Watchlist
  watchlist: WatchlistItem[];
  
  // Continue Watching
  continueWatching: ContinueWatching[];
  
  // User Preferences
  preferences: UserPreferences;
  
  // UI State
  isSidebarOpen: boolean;
  isLoading: boolean;
  
  // Actions - Search
  setSearchQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  
  // Actions - Watchlist
  addToWatchlist: (id: string, type: 'movie' | 'show') => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  
  // Actions - Continue Watching
  addToContinueWatching: (item: ContinueWatching) => void;
  removeFromContinueWatching: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  
  // Actions - Preferences
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  
  // Actions - UI
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  
  // Getters
  getWatchlistItems: () => (Movie | TVShow)[];
  getContinueWatchingItems: () => (Movie | TVShow)[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      searchQuery: '',
      recentSearches: [],
      watchlist: [],
      continueWatching: initialContinueWatching,
      preferences: defaultPreferences,
      isSidebarOpen: false,
      isLoading: false,

      // Search Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      addRecentSearch: (query) => {
        const { recentSearches } = get();
        const newSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
        set({ recentSearches: newSearches });
      },
      
      clearRecentSearches: () => set({ recentSearches: [] }),

      // Watchlist Actions
      addToWatchlist: (id, type) => {
        const { watchlist } = get();
        if (!watchlist.some(item => item.id === id)) {
          set({ watchlist: [...watchlist, { id, type, addedAt: new Date() }] });
        }
      },
      
      removeFromWatchlist: (id) => {
        const { watchlist } = get();
        set({ watchlist: watchlist.filter(item => item.id !== id) });
      },
      
      isInWatchlist: (id) => {
        const { watchlist } = get();
        return watchlist.some(item => item.id === id);
      },

      // Continue Watching Actions
      addToContinueWatching: (item) => {
        const { continueWatching } = get();
        const existingIndex = continueWatching.findIndex(
          i => (i.movieId === item.movieId || i.showId === item.showId)
        );
        
        if (existingIndex > -1) {
          const updated = [...continueWatching];
          updated[existingIndex] = { ...item, lastWatched: new Date() };
          set({ continueWatching: updated });
        } else {
          set({ continueWatching: [item, ...continueWatching] });
        }
      },
      
      removeFromContinueWatching: (id) => {
        const { continueWatching } = get();
        set({ 
          continueWatching: continueWatching.filter(
            item => item.movieId !== id && item.showId !== id
          ) 
        });
      },
      
      updateProgress: (id, progress) => {
        const { continueWatching } = get();
        const updated = continueWatching.map(item => {
          if (item.movieId === id || item.showId === id) {
            return { ...item, progress, lastWatched: new Date() };
          }
          return item;
        });
        set({ continueWatching: updated });
      },

      // Preferences Actions
      updatePreferences: (prefs) => {
        const { preferences } = get();
        set({ 
          preferences: { ...preferences, ...prefs } 
        });
      },
      
      resetPreferences: () => set({ preferences: defaultPreferences }),

      // UI Actions
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setLoading: (loading) => set({ isLoading: loading }),

      // Getters
      getWatchlistItems: () => {
        const { watchlist } = get();
        const allContent = [...movies, ...tvShows];
        return watchlist
          .map(item => allContent.find(c => c._id === item.id))
          .filter((item): item is Movie | TVShow => item !== undefined);
      },
      
      getContinueWatchingItems: () => {
        const { continueWatching } = get();
        const allContent = [...movies, ...tvShows];
        return continueWatching
          .map(item => allContent.find(c => c._id === item.movieId || c._id === item.showId))
          .filter((item): item is Movie | TVShow => item !== undefined);
      },
    }),
    {
      name: 'streamflix-storage',
      partialize: (state) => ({
        watchlist: state.watchlist,
        continueWatching: state.continueWatching,
        preferences: state.preferences,
        recentSearches: state.recentSearches,
      }),
    }
  )
);
