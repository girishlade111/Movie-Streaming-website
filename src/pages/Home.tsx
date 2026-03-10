import { Link } from 'react-router-dom';
import { HeroBanner, ContentRow } from '../components';
import { useAppStore } from '../store';
import { movies, tvShows, categories } from '../constants/mockData';

export default function Home() {
  const { getContinueWatchingItems } = useAppStore();

  const allContent = [...movies, ...tvShows];
  const featuredMovie = movies[0];
  const trendingContent = allContent.filter(m => m.isTrending);
  const newReleases = allContent.filter(m => m.isNewRelease);
  const topRated = [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const actionMovies = allContent.filter(m => m.genre.includes('Action'));
  const sciFiContent = allContent.filter(m => m.genre.includes('Sci-Fi'));
  const continueWatchingItems = getContinueWatchingItems();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      {/* Content Sections */}
      <div className="space-y-8 -mt-32 relative z-10 pb-8">
        {/* Continue Watching */}
        {continueWatchingItems.length > 0 && (
          <section>
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Continue Watching</h2>
              <Link to="/my-list" className="text-sm text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>
            <ContentRow 
              title="" 
              movies={continueWatchingItems.map(item => ({
                _id: item._id,
                title: item.title,
                thumbnail: item.thumbnail,
                backdrop: item.backdrop,
                videoUrl: item.videoUrl,
              }))} 
              variant="landscape"
              showProgress
            />
          </section>
        )}

        <ContentRow title="Trending Now" movies={trendingContent} />
        <ContentRow title="New Releases" movies={newReleases} />
        <ContentRow title="Top Rated" movies={topRated} />
        <ContentRow title="Action & Adventure" movies={actionMovies} />
        <ContentRow title="Sci-Fi & Fantasy" movies={sciFiContent} />

        {/* Categories Section */}
        <section className="px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                to={`/browse/${category.id}`}
                className="relative h-32 rounded-lg overflow-hidden group card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-neutral-900 flex items-center justify-center">
                  <span className="text-lg font-semibold">{category.name}</span>
                </div>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* TV Shows Section */}
        <section className="px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Popular TV Shows</h2>
            <Link to="/browse/tv-shows" className="text-sm text-gray-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tvShows.slice(0, 5).map((show) => (
              <Link
                key={show._id}
                to={`/show/${show._id}`}
                className="group relative block rounded-lg overflow-hidden bg-neutral-800 transition-all duration-300 hover:scale-105 hover:z-10"
              >
                <div className="relative aspect-poster overflow-hidden">
                  <img
                    src={show.thumbnail}
                    alt={show.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-neutral-950/80 backdrop-blur-sm rounded text-xs font-semibold">
                    {show.seasons.length} Season{show.seasons.length !== 1 ? 's' : ''}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-600/90 backdrop-blur-sm rounded text-xs font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {show.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold truncate group-hover:text-red-500 transition-colors">
                    {show.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{show.releaseYear}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
