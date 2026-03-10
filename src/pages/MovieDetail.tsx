import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Mock movie data - In real app, fetch from API by id
  const movie = {
    _id: id || '1',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. Earth\'s future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind\'s survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before.',
    releaseYear: 2014,
    duration: 169,
    rating: 8.6,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    director: 'Christopher Nolan',
    thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHt40H07A5KWYJL.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '4K',
    isTrending: true,
    isNewRelease: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleWatchNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/watch/${movie._id}`);
  };

  const handleToggleWatchlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsInWatchlist(!isInWatchlist);
  };

  const similarMovies = [
    { _id: '2', title: 'The Dark Knight', thumbnail: movie.backdrop },
    { _id: '3', title: 'Inception', thumbnail: movie.backdrop },
    { _id: '4', title: 'The Matrix', thumbnail: movie.backdrop },
    { _id: '5', title: 'Avengers: Endgame', thumbnail: movie.backdrop },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Banner */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center text-yellow-400">
                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {movie.rating.toFixed(1)}
              </span>
              <span className="text-gray-300">{movie.releaseYear}</span>
              <span className="text-gray-300">{movie.duration} min</span>
              <span className="px-2 py-1 bg-primary-600 rounded text-xs font-semibold">{movie.quality}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-dark-800/80 backdrop-blur-sm rounded-full text-sm border border-dark-700"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleWatchNow}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-red rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity transform hover:scale-105 duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>
              <button
                onClick={handleToggleWatchlist}
                className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  isInWatchlist
                    ? 'bg-accent-red text-white'
                    : 'bg-dark-800/80 backdrop-blur-sm border border-dark-700 hover:bg-dark-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Synopsis */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </section>

            {/* Cast */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.cast.map((actor) => (
                  <div key={actor} className="text-center">
                    <div className="w-full aspect-square bg-dark-800 rounded-lg mb-2 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{actor}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-dark-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Movie Info</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Director</dt>
                  <dd className="text-white">{movie.director}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Release Year</dt>
                  <dd className="text-white">{movie.releaseYear}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="text-white">{movie.duration} minutes</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Quality</dt>
                  <dd className="text-primary-400">{movie.quality}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarMovies.map((m) => (
              <div
                key={m._id}
                className="group cursor-pointer"
                onClick={() => navigate(`/movie/${m._id}`)}
              >
                <div className="aspect-poster rounded-lg overflow-hidden bg-dark-800 mb-2">
                  <img
                    src={m.thumbnail}
                    alt={m.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary-400 transition-colors">
                  {m.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
