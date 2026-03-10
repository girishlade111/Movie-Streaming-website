import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import type { Movie, TVShow } from '../types';

interface ContentRowProps {
  title: string;
  movies: (Movie | TVShow)[];
  variant?: 'poster' | 'standard' | 'landscape' | 'small';
  showRank?: boolean;
  showProgress?: boolean;
  progressData?: Record<string, number>;
  seeAllLink?: string;
  description?: string;
}

export default function ContentRow({ 
  title, 
  movies, 
  variant = 'poster',
  showRank = false,
  showProgress = false,
  progressData = {},
  seeAllLink,
  description,
}: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 50);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 50);
    }
  };

  // Auto-scroll pause on hover
  useEffect(() => {
    if (isHovered && rowRef.current) {
      rowRef.current.style.scrollBehavior = 'auto';
    } else if (rowRef.current) {
      rowRef.current.style.scrollBehavior = 'smooth';
    }
  }, [isHovered]);

  if (movies.length === 0) return null;

  return (
    <section 
      className="relative py-4 group/row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
          >
            See All
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-0 bottom-0 z-30 w-12 bg-gradient-to-r from-neutral-950 to-transparent flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } hover:from-neutral-950/90`}
            aria-label="Scroll left"
          >
            <div className="p-2 bg-neutral-800/80 backdrop-blur-sm rounded-full text-white hover:bg-neutral-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
          }}
        >
          {movies.map((movie, index) => (
            <div 
              key={movie._id} 
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <MovieCard
                movie={movie}
                variant={variant}
                showRank={showRank ? index + 1 : undefined}
                showProgress={showProgress ? (progressData[movie._id] || 0) : undefined}
                isNew={movie.isNewRelease}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-0 bottom-0 z-30 w-12 bg-gradient-to-l from-neutral-950 to-transparent flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } hover:from-neutral-950/90`}
            aria-label="Scroll right"
          >
            <div className="p-2 bg-neutral-800/80 backdrop-blur-sm rounded-full text-white hover:bg-neutral-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
