import type { UserData, WatchProgress, UserPreferences, UserRatings, WatchHistoryItem } from '../types/userData';
import { defaultUserData, STORAGE_KEYS } from '../types/userData';

/**
 * Local Storage Manager for User Data
 * Provides a centralized way to manage all user-specific data
 */

// Get user data from localStorage
export function getUserData(): UserData {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!data) {
      return defaultUserData;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading user data from localStorage:', error);
    return defaultUserData;
  }
}

// Save user data to localStorage
export function saveUserData(data: UserData): void {
  try {
    const updatedData = {
      ...data,
      lastSync: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving user data to localStorage:', error);
  }
}

// Get specific field from user data
export function getUserDataField<K extends keyof UserData>(field: K): UserData[K] {
  const data = getUserData();
  return data[field];
}

// Update specific field in user data
export function updateUserDataField<K extends keyof UserData>(
  field: K,
  value: UserData[K]
): void {
  const data = getUserData();
  data[field] = value;
  saveUserData(data);
}

// Merge partial data into user data
export function mergeUserData(partialData: Partial<UserData>): void {
  const data = getUserData();
  const updatedData = { ...data, ...partialData };
  saveUserData(updatedData);
}

// Clear all user data
export function clearUserData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}

// Reset user data to defaults
export function resetUserData(): void {
  saveUserData(defaultUserData);
}

// ============ My List Management ============

export function addToMyList(contentId: string): void {
  const myList = getUserDataField('myList');
  if (!myList.includes(contentId)) {
    updateUserDataField('myList', [...myList, contentId]);
  }
}

export function removeFromMyList(contentId: string): void {
  const myList = getUserDataField('myList');
  updateUserDataField('myList', myList.filter(id => id !== contentId));
}

export function isInMyList(contentId: string): boolean {
  const myList = getUserDataField('myList');
  return myList.includes(contentId);
}

// ============ Watch Later Management ============

export function addToWatchLater(contentId: string): void {
  const watchLater = getUserDataField('watchLater');
  if (!watchLater.includes(contentId)) {
    updateUserDataField('watchLater', [...watchLater, contentId]);
  }
}

export function removeFromWatchLater(contentId: string): void {
  const watchLater = getUserDataField('watchLater');
  updateUserDataField('watchLater', watchLater.filter(id => id !== contentId));
}

export function isInWatchLater(contentId: string): boolean {
  const watchLater = getUserDataField('watchLater');
  return watchLater.includes(contentId);
}

// ============ Favorites Management ============

export function addToFavorites(contentId: string): void {
  const favorites = getUserDataField('favorites');
  if (!favorites.includes(contentId)) {
    updateUserDataField('favorites', [...favorites, contentId]);
  }
}

export function removeFromFavorites(contentId: string): void {
  const favorites = getUserDataField('favorites');
  updateUserDataField('favorites', favorites.filter(id => id !== contentId));
}

export function isInFavorites(contentId: string): boolean {
  const favorites = getUserDataField('favorites');
  return favorites.includes(contentId);
}

// ============ Continue Watching Management ============

export function updateContinueWatching(progress: WatchProgress): void {
  const continueWatching = getUserDataField('continueWatching');
  const existingIndex = continueWatching.findIndex(
    item => item.contentId === progress.contentId
  );

  if (existingIndex > -1) {
    // Update existing
    const updated = [...continueWatching];
    updated[existingIndex] = { ...progress, lastWatched: new Date().toISOString() };
    updateUserDataField('continueWatching', updated);
  } else {
    // Add new
    updateUserDataField('continueWatching', [progress, ...continueWatching]);
  }
}

export function removeFromContinueWatching(contentId: string): void {
  const continueWatching = getUserDataField('continueWatching');
  updateUserDataField(
    'continueWatching',
    continueWatching.filter(item => item.contentId !== contentId)
  );
}

export function getContinueWatching(): WatchProgress[] {
  return getUserDataField('continueWatching');
}

export function clearContinueWatching(): void {
  updateUserDataField('continueWatching', []);
}

// ============ Watch History Management ============

export function addToWatchHistory(historyItem: WatchHistoryItem): void {
  const watchHistory = getUserDataField('watchHistory');
  updateUserDataField('watchHistory', [historyItem, ...watchHistory]);
}

export function getWatchHistory(): WatchHistoryItem[] {
  return getUserDataField('watchHistory');
}

export function clearWatchHistory(): void {
  updateUserDataField('watchHistory', []);
}

// ============ Search History Management ============

export function addToSearchHistory(query: string): void {
  const searchHistory = getUserDataField('searchHistory');
  // Add to beginning, remove duplicates, limit to 10
  const updated = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
  updateUserDataField('searchHistory', updated);
}

export function getSearchHistory(): string[] {
  return getUserDataField('searchHistory');
}

export function clearSearchHistory(): void {
  updateUserDataField('searchHistory', []);
}

// ============ Ratings Management ============

export function setRating(contentId: string, rating: 'like' | 'dislike'): void {
  const ratings = getUserDataField('ratings');
  updateUserDataField('ratings', { ...ratings, [contentId]: rating });
}

export function getRating(contentId: string): 'like' | 'dislike' | 'none' | undefined {
  const ratings = getUserDataField('ratings');
  return ratings[contentId];
}

export function removeRating(contentId: string): void {
  const ratings = getUserDataField('ratings');
  const updated = { ...ratings };
  delete updated[contentId];
  updateUserDataField('ratings', updated);
}

export function getAllRatings(): UserRatings {
  return getUserDataField('ratings');
}

// ============ Preferences Management ============

export function getPreferences(): UserPreferences {
  return getUserDataField('preferences');
}

export function updatePreferences(prefs: Partial<UserPreferences>): void {
  const currentPrefs = getPreferences();
  updateUserDataField('preferences', { ...currentPrefs, ...prefs });
}

export function resetPreferences(): void {
  updateUserDataField('preferences', defaultUserData.preferences);
}

// ============ Export/Import Data ============

export function exportUserData(): string {
  const data = getUserData();
  return JSON.stringify(data, null, 2);
}

export function importUserData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as UserData;
    saveUserData(data);
    return true;
  } catch (error) {
    console.error('Error importing user data:', error);
    return false;
  }
}

// ============ Storage Stats ============

export function getStorageStats(): {
  myListCount: number;
  watchLaterCount: number;
  favoritesCount: number;
  continueWatchingCount: number;
  watchHistoryCount: number;
  searchHistoryCount: number;
  ratingsCount: number;
} {
  const data = getUserData();
  return {
    myListCount: data.myList.length,
    watchLaterCount: data.watchLater.length,
    favoritesCount: data.favorites.length,
    continueWatchingCount: data.continueWatching.length,
    watchHistoryCount: data.watchHistory.length,
    searchHistoryCount: data.searchHistory.length,
    ratingsCount: Object.keys(data.ratings).length,
  };
}
