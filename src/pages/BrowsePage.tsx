import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movies, tvShows, categories, genres } from '../constants/mockData';
import MovieCard from '../components/MovieCard';

export default function BrowsePage() {
  const { category } = useParams<{ category?: string }>();
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'tv'>('all');

  const allContent = [
    ...movies.map(m => ({ ...m, contentType: 'movie' as const })),
    ...tvShows.map(s => ({ ...s, contentType: 'tv' as const })),
  ];

  // Filter by category
  const getCategoryContent = (categoryId: string) => {
    if (categoryId === 'trending') {
      return allContent.filter(c => c.isTrending);
    }
    if (categoryId === 'new-releases') {
      return allContent.filter(c => c.isNewRelease);
    }
    if (categoryId === 'top-rated') {
      return [...allContent].sort((a, b) => b.rating - a.rating);
    }
    // Genre-based
    const categoryConfig = categories.find(c => c.id === categoryId);
    if (categoryConfig) {
      return allContent.filter(c =>
        c.genre.some(g => g.toLowerCase() === categoryConfig.name.toLowerCase())
      );
    }
    return allContent;
  };

  // Filter by active tab
  const filterByType = (content: typeof allContent) => {
    if (activeTab === 'movies') {
      return content.filter(c => c.contentType === 'movie');
    }
    if (activeTab === 'tv') {
      return content.filter(c => c.contentType === 'tv');
    }
    return content;
  };

  const categoryContent = category ? getCategoryContent(category) : allContent;
  const filteredContent = filterByType(categoryContent);
  const categoryName = category ? categories.find(c => c.id === category)?.name || category : 'All Content';

  // Collections
  const collections = {
    awardWinners: allContent.filter(c => c.rating >= 8.5),
    trending: allContent.filter(c => c.isTrending),
    newReleases: allContent.filter(c => c.isNewRelease),
    classics: allContent.filter(c => c.releaseYear < 2000),
    fourK: allContent.filter(c => c.quality === '4K'),
  };

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

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-4 font-medium transition-colors relative ${
              activeTab === 'all' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            All
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`pb-3 px-4 font-medium transition-colors relative ${
              activeTab === 'movies' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Movies
            {activeTab === 'movies' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`pb-3 px-4 font-medium transition-colors relative ${
              activeTab === 'tv' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            TV Shows
            {activeTab === 'tv' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Collections Section */}
        {!category && activeTab === 'all' && (
          <>
            {/* Award Winners */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🏆 Award Winners</h2>
                <Link to="/browse/award-winners" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                  View All
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {collections.awardWinners.slice(0, 5).map((item) => (
                  <MovieCard key={item._id} movie={item} variant="poster" />
                ))}
              </div>
            </section>

            {/* Trending This Week */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🔥 Trending This Week</h2>
                <Link to="/browse/trending" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                  View All
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {collections.trending.slice(0, 5).map((item, index) => (
                  <MovieCard key={item._id} movie={item} variant="poster" showRank={index + 1} />
                ))}
              </div>
            </section>

            {/* New Releases */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🆕 New Releases</h2>
                <Link to="/browse/new-releases" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                  View All
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {collections.newReleases.slice(0, 5).map((item) => (
                  <MovieCard key={item._id} movie={item} variant="poster" isNew />
                ))}
              </div>
            </section>

            {/* 4K Ultra HD */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">📀 4K Ultra HD</h2>
                <Link to="/browse/4k" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                  View All
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {collections.fourK.slice(0, 5).map((item) => (
                  <MovieCard key={item._id} movie={item} variant="poster" />
                ))}
              </div>
            </section>

            {/* Classic Movies */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🎬 Classic Movies</h2>
                <Link to="/browse/classics" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                  View All
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {collections.classics.slice(0, 5).map((item) => (
                  <MovieCard key={item._id} movie={item} variant="poster" />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Genre Browse Grid */}
        {!category && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {genres.map((genre) => {
                const genreContent = allContent.filter(c =>
                  c.genre.some(g => g.toLowerCase() === genre.name.toLowerCase())
                );
                return (
                  <Link
                    key={genre._id}
                    to={`/browse/${genre.slug}`}
                    className="relative h-40 rounded-lg overflow-hidden group card-hover"
                  >
                    <img
                      src={genreContent[0]?.backdrop || allContent[0]?.backdrop}
                      alt={genre.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold">{genre.name}</h3>
                      <p className="text-xs text-gray-400">{genreContent.length} titles</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Category Content */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {category ? `${categoryName} Content` : 'All Content'}
            </h2>
          </div>
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredContent.map((item) => (
                <MovieCard
                  key={item._id}
                  movie={item}
                  variant="poster"
                  isNew={item.isNewRelease}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No content available</h3>
              <p className="text-gray-400">Check back later for new additions</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
