import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MovieCard } from '../components';
import { movies, tvShows, categories, genres } from '../constants/mockData';

export default function BrowsePage() {
  const { category } = useParams<{ category?: string }>();
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [contentType, setContentType] = useState<'all' | 'movie' | 'show'>('all');

  // Filter content based on category and filters
  const getAllContent = () => {
    let content = [...movies, ...tvShows.map(show => ({ ...show, type: 'show' as const }))];
    
    // Filter by category
    if (category) {
      const categoryConfig = categories.find(c => c.id === category);
      
      if (categoryConfig?.type === 'genre') {
        const genreName = categoryConfig.name;
        content = content.filter(item => 
          item.genre.some(g => g.toLowerCase() === genreName.toLowerCase())
        );
      } else if (category === 'trending') {
        content = content.filter(item => item.isTrending);
      } else if (category === 'new-releases') {
        content = content.filter(item => item.isNewRelease);
      } else if (category === 'top-rated') {
        content = content.sort((a, b) => b.rating - a.rating);
      }
    }
    
    // Filter by content type
    if (contentType === 'movie') {
      content = content.filter(item => !('seasons' in item));
    } else if (contentType === 'show') {
      content = content.filter(item => 'seasons' in item);
    }
    
    // Filter by genre
    if (selectedGenre !== 'all') {
      content = content.filter(item => 
        item.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }
    
    return content;
  };

  const filteredContent = getAllContent();
  const categoryName = category ? categories.find(c => c.id === category)?.name || category : 'All Content';

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-gray-400">
            {filteredContent.length} titles available
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Content Type Filter */}
          <div className="flex bg-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setContentType('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                contentType === 'all' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setContentType('movie')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                contentType === 'movie' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setContentType('show')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                contentType === 'show' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              TV Shows
            </button>
          </div>

          {/* Genre Filter */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Categories Quick Links */}
        {!category && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/browse/${cat.id}`}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm text-gray-300 hover:text-white transition-colors border border-neutral-700"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredContent.map((item) => (
              <MovieCard
                key={item._id}
                movie={{
                  _id: item._id,
                  title: item.title,
                  description: item.description,
                  releaseYear: item.releaseYear,
                  duration: 'duration' in item ? item.duration : 0,
                  rating: item.rating,
                  genre: item.genre,
                  cast: item.cast,
                  director: 'director' in item ? item.director : 'creator' in item ? item.creator : '',
                  thumbnail: item.thumbnail,
                  backdrop: item.backdrop,
                  videoUrl: item.videoUrl,
                  quality: item.quality,
                  maturityRating: item.maturityRating,
                  language: item.language,
                  subtitles: item.subtitles,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="w-20 h-20 mx-auto text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No content found</h2>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
