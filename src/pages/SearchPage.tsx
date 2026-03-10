import { useState } from 'react';
import { useMovieStore } from '../store';
import { MovieCard } from '../components';
import { useDebounce } from '../hooks';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { movies, searchQuery: globalSearchQuery } = useMovieStore();

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    movie.genre.some((g) => g.toLowerCase().includes(debouncedSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search</h1>
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery || globalSearchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows, genres..."
              className="w-full px-6 py-4 bg-dark-900 border border-dark-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors text-lg"
              autoFocus
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Results */}
        {filteredMovies.length > 0 ? (
          <div>
            <p className="text-gray-400 mb-6">
              Found {filteredMovies.length} result{filteredMovies.length !== 1 ? 's' : ''} for "{debouncedSearch || globalSearchQuery}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="w-20 h-20 mx-auto text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-400">
              Try searching for something else or browse our collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
