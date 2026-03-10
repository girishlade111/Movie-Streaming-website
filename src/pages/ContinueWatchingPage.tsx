import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';

type SortOption = 'recent' | 'progress';

export default function ContinueWatchingPage() {
  const { continueWatching, removeFromContinueWatching, updateProgress } = useAppStore();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const items = useAppStore((state) => state.getContinueWatchingItems());

  // Sort items
  const sortedItems = [...continueWatching].sort((a, b) => {
    if (sortBy === 'progress') {
      return b.progress - a.progress;
    }
    // Recent (default)
    return new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime();
  });

  const handleRemove = (id: string) => {
    removeFromContinueWatching(id);
  };

  const handleClearAll = () => {
    continueWatching.forEach((item) => {
      if (item.movieId) removeFromContinueWatching(item.movieId);
      if (item.showId) removeFromContinueWatching(item.showId);
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Continue Watching</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Pick up where you left off. Your viewing history will appear here.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Watching
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
              <h1 className="text-4xl font-bold mb-2">Continue Watching</h1>
              <p className="text-gray-400">
                {items.length} title{items.length !== 1 ? 's' : ''} in progress
              </p>
            </div>

            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium transition-colors text-red-400"
            >
              Clear All
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3 mt-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
            >
              <option value="recent">Most Recent</option>
              <option value="progress">Progress</option>
            </select>
          </div>
        </div>

        {/* Continue Watching List */}
        <div className="space-y-4">
          {sortedItems.map((item) => {
            const contentItem = items.find((c) => c._id === item.movieId || c._id === item.showId);
            if (!contentItem) return null;

            return (
              <div
                key={item.movieId || item.showId}
                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <Link
                    to={`/watch/${item.movieId || item.showId}`}
                    className="md:w-64 lg:w-80 flex-shrink-0 relative aspect-video"
                  >
                    <img
                      src={contentItem.backdrop}
                      alt={contentItem.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-neutral-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700">
                      <div
                        className="h-full bg-red-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </Link>

                  {/* Content Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{contentItem.title}</h3>
                        {item.season && item.episode && (
                          <p className="text-sm text-gray-400">
                            Season {item.season}, Episode {item.episode}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(item.movieId || item.showId || '')}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove from continue watching"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>{Math.round(item.progress)}% watched</span>
                      <span>•</span>
                      <span>Watched {formatTimeAgo(item.lastWatched)}</span>
                    </div>

                    {/* Progress Bar (Large) */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(item.progress)}%</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        to={`/watch/${item.movieId || item.showId}`}
                        className="flex-1 px-4 py-2.5 bg-white text-neutral-950 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        {item.progress > 90 ? 'Restart' : 'Resume'}
                      </Link>
                      <button
                        onClick={() => updateProgress(item.movieId || item.showId || '', 0)}
                        className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold transition-colors"
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
