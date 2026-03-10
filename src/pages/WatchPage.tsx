import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePlayerStore, useAuthStore } from '../store';
import VideoPlayer from '../components/VideoPlayer';

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reset } = usePlayerStore();
  const { isAuthenticated } = useAuthStore();
  const [showInfo, setShowInfo] = useState(false);

  // Mock movie data - In real app, fetch from API
  const movie = {
    _id: id || '1',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    releaseYear: 2014,
    duration: 169,
    rating: 8.6,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHt40H07A5KWYJL.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '4K' as const,
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleBack = () => {
    reset();
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-50 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Video Player */}
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <VideoPlayer
            src={movie.videoUrl}
            poster={movie.backdrop}
            autoPlay={true}
          />
        </div>
      </div>

      {/* Movie Info Toggle */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Info Panel */}
      {showInfo && (
        <div className="fixed bottom-20 right-4 z-40 w-80 bg-dark-900/95 backdrop-blur-md rounded-lg p-4 shadow-xl">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.duration} min</span>
            <span>•</span>
            <span className="text-primary-400">{movie.quality}</span>
          </div>
          <p className="text-gray-300 text-sm mb-3">{movie.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.map((g) => (
              <span key={g} className="text-xs px-2 py-1 bg-dark-800 rounded text-gray-300">
                {g}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-gray-500">Director: </span>
            {movie.director}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            <span className="text-gray-500">Cast: </span>
            {movie.cast.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
