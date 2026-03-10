import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { movies, tvShows, genres } from '../constants/mockData';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type SortOption = 'relevance' | 'newest' | 'year' | 'rating' | 'popularity' | 'az';
type RatingOption = 'all' | 'PG' | 'PG-13' | 'R' | 'TV-14' | 'TV-MA';

export default function BrowsePage() {
  const { category } = useParams<{ category?: string }>();
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<RatingOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const allContent = useMemo(() => {
    let content = [...movies, ...tvShows];

    // Filter by category
    if (category === 'movies') {
      content = content.filter(item => !('seasons' in item));
    } else if (category === 'tv-shows') {
      content = content.filter(item => 'seasons' in item);
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      content = content.filter(item =>
        item.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Filter by year
    if (selectedYear !== 'all') {
      const year = parseInt(selectedYear);
      content = content.filter(item => item.releaseYear === year);
    }

    // Filter by rating
    if (selectedRating !== 'all' && 'maturityRating' in content[0]) {
      content = content.filter(item =>
        'maturityRating' in item && item.maturityRating === selectedRating
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        content.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'year':
        content.sort((a, b) => a.releaseYear - b.releaseYear);
        break;
      case 'rating':
        content.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        content.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
      case 'az':
        content.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return content;
  }, [category, selectedGenre, selectedYear, selectedRating, sortBy]);

  const pageTitle = category === 'movies' ? 'Movies' : category === 'tv-shows' ? 'TV Shows' : 'Browse';

  const years = Array.from(new Set([...movies, ...tvShows].map(item => item.releaseYear)))
    .sort((a, b) => b - a);

  return (
    <>
      {/* Header - solid background */}
      <Navbar />

      {/* Main Content - pt-24 px-4% */}
      <div className="pt-24 px-4 md:px-[4%] min-h-screen bg-[#141414]">
        {/* Title - text-32px font-bold mb-6 */}
        <h1 className="text-[32px] font-bold mb-6 text-white">
          {pageTitle}
        </h1>

        {/* FilterBar */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* GenreDropdown */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2.5 bg-[#1f1f1f] border border-[#404040] rounded text-sm text-white focus:outline-none focus:border-[#E50914] cursor-pointer"
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>

          {/* YearDropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2.5 bg-[#1f1f1f] border border-[#404040] rounded text-sm text-white focus:outline-none focus:border-[#E50914] cursor-pointer"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* RatingDropdown */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value as RatingOption)}
            className="px-4 py-2.5 bg-[#1f1f1f] border border-[#404040] rounded text-sm text-white focus:outline-none focus:border-[#E50914] cursor-pointer"
          >
            <option value="all">All Ratings</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="TV-14">TV-14</option>
            <option value="TV-MA">TV-MA</option>
          </select>

          {/* SortDropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-[#1f1f1f] border border-[#404040] rounded text-sm text-white focus:outline-none focus:border-[#E50914] cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest Added</option>
            <option value="year">Release Year</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-[#b3b3b3] text-sm mb-6">
          {allContent.length} {allContent.length === 1 ? 'title' : 'titles'} found
        </p>

        {/* ContentGrid - columns={6|4|2} gap={24px|16px} */}
        {allContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {allContent.map((item) => (
              <MovieCard
                key={item._id}
                movie={item}
                variant="poster"
                isNew={item.isNewRelease}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <svg
              className="w-20 h-20 mx-auto text-[#404040] mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2 text-white">No content found</h2>
            <p className="text-[#b3b3b3] mb-6">
              Try adjusting your filters to find what you're looking for
            </p>
            <button
              onClick={() => {
                setSelectedGenre('all');
                setSelectedYear('all');
                setSelectedRating('all');
                setSortBy('relevance');
              }}
              className="px-6 py-3 bg-[#E50914] hover:bg-[#F40612] rounded font-semibold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* InfiniteScrollLoader Placeholder */}
        {allContent.length > 0 && (
          <div className="flex justify-center mt-12 mb-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-[#E50914] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-[#E50914] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-[#E50914] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
