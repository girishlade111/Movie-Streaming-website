import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie, TVShow } from '../types';

interface MovieCardProps {
  movie: Movie | TVShow;
  variant?: 'poster' | 'landscape';
  showRank?: number;
  isNew?: boolean;
}

export default function MovieCard({ movie, variant = 'poster', showRank, isNew }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatio = variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video';
  const cardWidth = variant === 'poster' 
    ? 'w-[calc(16%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(16%-1rem)]'
    : 'w-[calc(25%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(16%-1rem)]';

  return (
    <Link
      to={`/watch/${movie._id}`}
      className={`relative ${cardWidth} ${aspectRatio} rounded-md overflow-hidden bg-[#181818] group/card`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Netflix-style card hover animation
        // At rest: scale 1, z-index 1, box-shadow none
        // On hover (400ms delay): scale 1.4, z-index 20, box-shadow 0 8px 30px rgba(0,0,0,0.8)
        transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), z-index 0ms 300ms, box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isHovered ? 'scale(1.4)' : 'scale(1)',
        zIndex: isHovered ? 20 : 1,
        boxShadow: isHovered ? '0 8px 30px rgba(0,0,0,0.8)' : 'none',
      }}
    >
      <img
        src={'thumbnail' in movie ? movie.thumbnail : ('backdrop' in movie ? (movie as any).backdrop : (movie as any).videoUrl)}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {(movie.isNewRelease || isNew) && (
        <div className="absolute top-2 left-2 bg-[#E50914] text-white px-2 py-1 rounded text-[10px] font-bold uppercase">
          New
        </div>
      )}

      {showRank && (
        <div
          className="absolute top-0 left-0 text-5xl md:text-6xl font-black"
          style={{
            color: '#ffffff',
            WebkitTextStroke: '2px #181818',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {showRank}
        </div>
      )}

      {'quality' in movie && movie.quality && (
        <div className="absolute bottom-2 right-2 bg-[#737373] text-white px-2 py-0.5 text-xs font-semibold rounded">
          {movie.quality}
        </div>
      )}

      <div
        className="hidden md:block absolute bottom-0 left-0 right-0 bg-[#181818] p-3 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        {/* Button row: 32px circles, gap 8px */}
        <div className="flex gap-2 mb-3">
          {/* Play button - circle, accent-primary */}
          <button
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-200 ease hover:scale-105 active:scale-95 active:duration-100"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          {/* Add to List - circle */}
          <button
            className="w-8 h-8 rounded-full bg-[#2a2a2a] text-white flex items-center justify-center transition-transform duration-200 ease hover:scale-105 active:scale-95 active:duration-100 border border-[#404040]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          {/* Like - circle */}
          <button
            className="w-8 h-8 rounded-full bg-[#2a2a2a] text-white flex items-center justify-center transition-transform duration-200 ease hover:scale-105 active:scale-95 active:duration-100 border border-[#404040]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>
          {/* More - chevron down */}
          <button
            className="w-8 h-8 rounded-full bg-[#2a2a2a] text-white flex items-center justify-center transition-transform duration-200 ease hover:scale-105 active:scale-95 active:duration-100 border border-[#404040] ml-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs mb-2">
          <span className="font-semibold" style={{ color: '#46d369' }}>
            {movie.rating * 10}% Match
          </span>
          {'duration' in movie && (
            <span className="text-[#e5e5e5]">
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </span>
          )}
          {'maturityRating' in movie && (
            <span className="border border-[#e5e5e5] px-1.5 py-0.5 text-[10px]">
              {movie.maturityRating}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#e5e5e5]">
          {movie.genre.slice(0, 3).map((genre, index, arr) => (
            <>
              <span key={genre}>{genre}</span>
              {index < arr.length - 1 && (
                <span className="text-[#737373]">•</span>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="md:hidden absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#141414] to-transparent">
        <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
      </div>
    </Link>
  );
}
