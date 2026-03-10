import { useAppStore } from './appStore';

export const useWatchlist = () => {
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, getWatchlistItems } = useAppStore();
  
  return {
    watchlist,
    items: getWatchlistItems(),
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
};

export const useContinueWatching = () => {
  const { continueWatching, addToContinueWatching, removeFromContinueWatching, updateProgress, getContinueWatchingItems } = useAppStore();
  
  return {
    continueWatching,
    items: getContinueWatchingItems(),
    addToContinueWatching,
    removeFromContinueWatching,
    updateProgress,
  };
};

export const useSearch = () => {
  const { searchQuery, setSearchQuery, recentSearches, addRecentSearch, clearRecentSearches } = useAppStore();
  
  return {
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  };
};

export const usePreferences = () => {
  const { preferences, updatePreferences, resetPreferences } = useAppStore();
  
  return {
    preferences,
    updatePreferences,
    resetPreferences,
  };
};
