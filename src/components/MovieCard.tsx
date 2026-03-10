import { Link } from 'react-router-dom';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  variant?: 'poster' | 'landscape';
}

export default function MovieCard({ movie, variant = 'poster' }: MovieCardProps) {
  const aspectRatio = variant === 'poster' ? 'aspect-poster' : 'aspect-backdrop';

  return (
    <Link
      to={`/movie/${movie._id}`}
      className="group relative block rounded-lg overflow-hidden bg-dark-800 transition-all duration-300 hover:scale-105 hover:z-10"
    >
      {/* Thumbnail */}
      <div className={`relative ${aspectRatio} overflow-hidden`}>
        <img
          src={variant === 'poster' ? movie.thumbnail : movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-dark-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Quality Badge */}
        {movie.quality && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-dark-950/80 backdrop-blur-sm rounded text-xs font-semibold text-white">
            {movie.quality}
          </div>
        )}

        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-accent-red/90 backdrop-blur-sm rounded text-xs font-semibold text-white flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {movie.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-white truncate group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
          <span>{movie.releaseYear}</span>
          <span>{movie.duration} min</span>
        </div>
        {movie.genre && movie.genre.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genre.slice(0, 2).map((g) => (
              <span key={g} className="text-xs px-2 py-0.5 bg-dark-700 rounded text-gray-300">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
