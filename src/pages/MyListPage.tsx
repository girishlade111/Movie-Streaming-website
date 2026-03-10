import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { useToast } from '../store/toastStore';
import MovieCard from '../components/MovieCard';
import Toast from '../components/Toast';
import { useToastStore } from '../store/toastStore';

type SortOption = 'recent' | 'title' | 'year' | 'dateAdded';
type ListType = 'my-list' | 'watch-later' | 'favorites';

export default function MyListPage() {
  const { removeFromWatchlist, addToWatchlist } = useAppStore();
  const { success } = useToast();
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [activeList, setActiveList] = useState<ListType>('my-list');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get items from watchlist
  const items = useAppStore((state) => state.getWatchlistItems());

  // Sort items
  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'year':
        return b.releaseYear - a.releaseYear;
      case 'dateAdded':
        return 0; // Would need dateAdded field in watchlist
      case 'recent':
      default:
        return 0;
    }
  });

  const handleRemove = (id: string, title: string) => {
    removeFromWatchlist(id);
    success(`Removed "${title}" from My List`);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/my-list`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      success('List link copied to clipboard!');
    } catch {
      // Fallback for browsers without clipboard API
      window.prompt('Copy this link:', shareUrl);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-600 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">My List is Empty</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Start adding movies and TV shows to your list to keep track of what you want to watch.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">My List</h1>
              <p className="text-gray-400">
                {items.length} title{items.length !== 1 ? 's' : ''} in your list
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* List Tabs */}
          <div className="flex items-center gap-4 mt-6 border-b border-neutral-800">
            {(['my-list', 'watch-later', 'favorites'] as ListType[]).map((list) => (
              <button
                key={list}
                onClick={() => setActiveList(list)}
                className={`pb-3 px-4 font-medium transition-colors relative capitalize ${
                  activeList === list ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {list.replace('-', ' ')}
                {activeList === list && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="recent">Recently Added</option>
                <option value="title">Title (A-Z)</option>
                <option value="year">Release Year</option>
                <option value="dateAdded">Date Added</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-4'}>
          {sortedItems.map((item) => (
            <div key={item._id} className="relative group">
              <MovieCard
                movie={item}
                variant={viewMode === 'grid' ? 'poster' : 'landscape'}
                isNew={item.isNewRelease}
              />
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id, item.title)}
                className="absolute top-2 right-2 p-2 bg-red-600/90 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="Remove from list"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Quick Actions */}
              <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/watch/${item._id}`}
                  className="flex-1 px-3 py-2 bg-white/90 hover:bg-white rounded-lg text-neutral-900 text-xs font-bold text-center transition-colors"
                >
                  Play
                </Link>
                <button
                  onClick={() => {
                    addToWatchlist(item._id, 'show' in item ? 'show' : 'movie');
                    success('Added to Watch Later');
                  }}
                  className="px-3 py-2 bg-neutral-800/90 hover:bg-neutral-700 rounded-lg text-white transition-colors"
                  title="Add to Watch Later"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    addToWatchlist(item._id, 'show' in item ? 'show' : 'movie');
                    success('Added to Favorites');
                  }}
                  className="px-3 py-2 bg-neutral-800/90 hover:bg-neutral-700 rounded-lg text-white transition-colors"
                  title="Add to Favorites"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center gap-2 p-4 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
