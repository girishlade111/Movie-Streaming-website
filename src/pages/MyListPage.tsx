import { Link } from 'react-router-dom';
import { useWatchlist } from '../store/hooks';
import { MovieCard } from '../components';

export default function MyListPage() {
  const { items, removeFromWatchlist } = useWatchlist();

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
          <h1 className="text-4xl font-bold mb-2">My List</h1>
          <p className="text-gray-400">
            {items.length} title{items.length !== 1 ? 's' : ''} in your list
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((item) => (
            <div key={item._id} className="relative group">
              <MovieCard
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
              <button
                onClick={() => removeFromWatchlist(item._id)}
                className="absolute top-2 right-2 p-2 bg-red-600/90 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from list"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
