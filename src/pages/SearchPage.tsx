import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import MovieCard from '../components/MovieCard';
import { movies, tvShows, genres } from '../constants/mockData';

type ContentType = 'all' | 'movie' | 'tv';
type SortOption = 'relevance' | 'newest' | 'year' | 'rating' | 'popularity' | 'az';

interface SearchFilters {
  type: ContentType;
  genres: string[];
  yearRange: [number, number];
  rating: string[];
  quality: string[];
  sortBy: SortOption;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, addRecentSearch, recentSearches } = useAppStore();
  
  const [localQuery, setLocalQuery] = useState(searchQuery || searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    genres: [],
    yearRange: [1990, 2025],
    rating: [],
    quality: [],
    sortBy: 'relevance',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  // All content combined
  const allContent = [
    ...movies.map(m => ({ ...m, contentType: 'movie' as const })),
    ...tvShows.map(s => ({ ...s, contentType: 'tv' as const })),
  ];

  // Filter and sort content
  const filteredContent = useCallback(() => {
    let results = allContent;

    // Search query filter
    if (localQuery.trim()) {
      const query = localQuery.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.genre.some(g => g.toLowerCase().includes(query)) ||
        item.cast.some(c => c.toLowerCase().includes(query))
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      results = results.filter(item => item.contentType === filters.type);
    }

    // Genre filter
    if (filters.genres.length > 0) {
      results = results.filter(item =>
        item.genre.some(g => filters.genres.includes(g))
      );
    }

    // Year filter
    results = results.filter(item =>
      item.releaseYear >= filters.yearRange[0] &&
      item.releaseYear <= filters.yearRange[1]
    );

    // Rating filter
    if (filters.rating.length > 0) {
      results = results.filter(item =>
        filters.rating.includes(item.maturityRating)
      );
    }

    // Quality filter
    if (filters.quality.length > 0) {
      results = results.filter(item =>
        filters.quality.includes(item.quality)
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'newest':
        results = [...results].sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'year':
        results = [...results].sort((a, b) => a.releaseYear - b.releaseYear);
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'az':
        results = [...results].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popularity':
        results = [...results].sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
      default:
        // Relevance - keep as is
        break;
    }

    return results;
  }, [localQuery, filters]);

  const results = filteredContent();

  // Debounced search
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (localQuery.trim()) {
        addRecentSearch(localQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, addRecentSearch]);

  // Update URL params
  useEffect(() => {
    if (localQuery) {
      searchParams.set('q', localQuery);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  }, [localQuery, searchParams, setSearchParams]);

  const handleGenreToggle = (genre: string) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleRatingToggle = (rating: string) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating.includes(rating)
        ? prev.rating.filter(r => r !== rating)
        : [...prev.rating, rating],
    }));
  };

  const handleQualityToggle = (quality: string) => {
    setFilters(prev => ({
      ...prev,
      quality: prev.quality.includes(quality)
        ? prev.quality.filter(q => q !== quality)
        : [...prev.quality, quality],
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      genres: [],
      yearRange: [1990, 2025],
      rating: [],
      quality: [],
      sortBy: 'relevance',
    });
  };

  const hasActiveFilters = filters.type !== 'all' || filters.genres.length > 0 || filters.rating.length > 0 || filters.quality.length > 0;

  const maturityRatings = ['PG', 'PG-13', 'R', 'TV-14', 'TV-MA'];
  const qualityOptions = ['HD', 'FHD', '4K'];

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {localQuery ? `Results for "${localQuery}"` : 'Browse & Search'}
              </h1>
              <p className="text-gray-400">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search titles, genres, cast..."
                className="w-full px-5 py-3 pl-12 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                autoFocus
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {localQuery && (
                <button
                  onClick={() => setLocalQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Recent Searches */}
          {!localQuery && recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-400">Recent Searches:</span>
                <button
                  onClick={() => {}}
                  className="text-xs text-red-500 hover:text-red-400"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.slice(0, 5).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setLocalQuery(search)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm text-gray-300 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>

              {/* Content Type Filter */}
              <div className="flex bg-neutral-800 rounded-lg p-1">
                {(['all', 'movie', 'tv'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters(prev => ({ ...prev, type }))}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filters.type === type
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {type === 'all' ? 'All' : type === 'movie' ? 'Movies' : 'TV Shows'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest Added</option>
                <option value="year">Release Year</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
                <option value="az">A-Z</option>
              </select>

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
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0 space-y-6">
              {/* Genres */}
              <div>
                <h3 className="font-semibold mb-3">Genres</h3>
                <div className="space-y-2">
                  {genres.slice(0, 10).map((genre) => (
                    <label key={genre._id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.genres.includes(genre.name)}
                        onChange={() => handleGenreToggle(genre.name)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {genre.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Maturity Rating */}
              <div>
                <h3 className="font-semibold mb-3">Rating</h3>
                <div className="space-y-2">
                  {maturityRatings.map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.rating.includes(rating)}
                        onChange={() => handleRatingToggle(rating)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {rating}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div>
                <h3 className="font-semibold mb-3">Quality</h3>
                <div className="space-y-2">
                  {qualityOptions.map((quality) => (
                    <label key={quality} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.quality.includes(quality)}
                        onChange={() => handleQualityToggle(quality)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {quality}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div>
                <h3 className="font-semibold mb-3">Year Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.yearRange[0]}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearRange: [Number(e.target.value), prev.yearRange[1]] }))}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                    placeholder="From"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={filters.yearRange[1]}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearRange: [prev.yearRange[0], Number(e.target.value)] }))}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                    placeholder="To"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </aside>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[2/3] bg-neutral-800 rounded-lg mb-2" />
                    <div className="h-4 bg-neutral-800 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-neutral-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-4'}>
                {results.map((item) => (
                  <MovieCard
                    key={item._id}
                    movie={item}
                    variant={viewMode === 'grid' ? 'poster' : 'landscape'}
                    isNew={item.isNewRelease}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-2xl font-bold mb-3">No results found</h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  We couldn't find anything matching "{localQuery}". Try adjusting your search or filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setLocalQuery('')}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
                {/* Suggestions */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">You might also like</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {movies.slice(0, 4).map((movie) => (
                      <Link key={movie._id} to={`/movie/${movie._id}`} className="group">
                        <div className="aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 mb-2">
                          <img
                            src={movie.thumbnail}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-sm font-medium group-hover:text-red-400 transition-colors line-clamp-1">
                          {movie.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
