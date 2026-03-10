import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const handleWatchNow = () => {
    navigate(`/watch/${movie._id}`);
  };

  const handleAddToList = () => {
    // TODO: Add to watchlist logic
    console.log('Add to list:', movie._id);
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <span className="px-2 py-1 bg-accent-red rounded text-white font-semibold text-xs">
              {movie.quality}
            </span>
            <span className="flex items-center text-yellow-400">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {movie.rating.toFixed(1)}
            </span>
            <span>{movie.releaseYear}</span>
            <span>{movie.duration} min</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genre?.map((g) => (
              <span
                key={g}
                className="px-3 py-1 bg-dark-800/50 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-dark-700"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg line-clamp-3">
            {movie.description}
          </p>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="text-sm text-gray-400">
              <span className="text-gray-500">Cast: </span>
              {movie.cast.slice(0, 5).join(', ')}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleWatchNow}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-red rounded-lg font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity transform hover:scale-105 duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>
            <button
              onClick={handleAddToList}
              className="px-8 py-3 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-lg font-semibold text-white flex items-center gap-2 hover:bg-dark-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              My List
            </button>
            <button
              onClick={() => setIsTrailerPlaying(true)}
              className="px-8 py-3 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-lg font-semibold text-white flex items-center gap-2 hover:bg-dark-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isTrailerPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsTrailerPlaying(false)}
        >
          <div className="w-full max-w-4xl aspect-video bg-dark-900 rounded-lg overflow-hidden">
            {/* TODO: Embed trailer video */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Trailer Player Placeholder
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
