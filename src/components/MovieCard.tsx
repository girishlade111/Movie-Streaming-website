import { useState } from 'react';
import { Link } from 'react-router-dom';

interface MediaItem {
  _id: string;
  title: string;
  thumbnail?: string;
  backdrop?: string;
  videoUrl?: string;
  rating: number;
  genre: string[];
  description?: string;
  quality?: 'HD' | 'FHD' | '4K';
  isNewRelease?: boolean;
  maturityRating?: string;
  releaseYear?: number;
  duration?: number;
  seasons?: any[];
  cast?: string[];
  director?: string;
  language?: string;
  subtitles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface MovieCardProps {
  movie: MediaItem;
  variant?: 'poster' | 'standard' | 'landscape' | 'small';
  showRank?: number;
  showProgress?: number;
  isNew?: boolean;
  onHover?: () => void;
}

export default function MovieCard({ 
  movie, 
  variant = 'poster', 
  showRank, 
  showProgress = 0,
  isNew = false,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatio = {
    poster: 'aspect-[2/3]',
    standard: 'aspect-[16/9]',
    landscape: 'aspect-[16/9]',
    small: 'aspect-[2/3]',
  }[variant];

  const cardWidth = {
    poster: 'w-full',
    standard: 'w-full',
    landscape: 'w-full',
    small: 'w-32 md:w-40',
  }[variant];

  const isShow = 'seasons' in movie;

  return (
    <Link
      to={isShow ? `/show/${movie._id}` : `/movie/${movie._id}`}
      className={`group relative block rounded-lg overflow-hidden bg-neutral-800 ${cardWidth} transition-all duration-300 card-hover`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rank Badge (Top 10) */}
      {showRank && (
        <div className="absolute top-0 left-0 z-20">
          <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-600"
               style={{ 
                 textShadow: '0 0 20px rgba(234, 179, 8, 0.5), -2px 2px 4px rgba(0,0,0,0.8)',
                 WebkitTextStroke: '1px rgba(0,0,0,0.5)'
               }}>
            {showRank}
          </div>
        </div>
      )}

      {/* Thumbnail Container */}
      <div className={`relative ${aspectRatio} overflow-hidden`}>
        <img
          src={'thumbnail' in movie ? movie.thumbnail : ('backdrop' in movie ? movie.backdrop : movie.videoUrl)}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Top Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {/* Quality Badge */}
          {movie.quality && (
            <div className="px-2 py-0.5 bg-neutral-950/80 backdrop-blur-sm rounded text-xs font-bold text-white border border-neutral-700">
              {movie.quality}
            </div>
          )}
          
          {/* New Badge */}
          {isNew && (
            <div className="px-2 py-0.5 bg-red-600 rounded text-xs font-bold text-white">
              NEW
            </div>
          )}
        </div>

        {/* Rating Badge (Top Left) */}
        {movie.rating && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-600/90 backdrop-blur-sm rounded text-xs font-bold text-white flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {movie.rating.toFixed(1)}
          </div>
        )}

        {/* Maturity Rating */}
        {'maturityRating' in movie && movie.maturityRating && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-neutral-950/80 backdrop-blur-sm border border-neutral-600 rounded text-xs font-semibold text-white">
            {movie.maturityRating}
          </div>
        )}

        {/* Hover Actions */}
        <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="p-3 bg-white rounded-full text-neutral-900 hover:scale-110 transition-transform shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button className="p-3 bg-neutral-800/90 backdrop-blur-sm rounded-full text-white hover:scale-110 transition-transform border border-neutral-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-3 bg-neutral-800/90 backdrop-blur-sm rounded-full text-white hover:scale-110 transition-transform border border-neutral-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>
        </div>

        {/* Progress Bar (Continue Watching) */}
        {showProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${showProgress}%` }}
            />
          </div>
        )}

        {/* Season Count for TV Shows */}
        {isShow && movie.seasons && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-neutral-950/80 backdrop-blur-sm rounded text-xs font-semibold text-white">
            {movie.seasons.length} Season{movie.seasons.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Card Info (shown on hover for larger variants) */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${
        isHovered && variant !== 'small' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1 mb-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span className="text-green-400 font-semibold">{movie.rating.toFixed(0)}% Match</span>
          {'releaseYear' in movie && <span>{movie.releaseYear}</span>}
          {'duration' in movie && movie.duration && <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>}
        </div>

        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
          {'description' in movie ? movie.description : ''}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genre.slice(0, 3).map((g) => (
            <span key={g} className="text-xs px-2 py-0.5 bg-neutral-700/80 rounded text-gray-300">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Default Title (when not hovered) */}
      {!isHovered && variant === 'small' && (
        <div className="p-2">
          <h3 className="font-semibold text-white text-xs md:text-sm text-center line-clamp-2">
            {movie.title}
          </h3>
        </div>
      )}
    </Link>
  );
}
