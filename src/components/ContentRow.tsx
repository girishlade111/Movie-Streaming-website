import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import type { Movie, TVShow } from '../types';

interface ContentRowProps {
  title: string;
  movies: (Movie | TVShow)[];
  variant?: 'poster' | 'landscape';
  showRank?: boolean;
  seeAllLink?: string;
}

export default function ContentRow({
  title,
  movies,
  variant = 'poster',
  showRank = false,
  seeAllLink,
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

  if (movies.length === 0) return null;

  return (
    // Row Structure - margin-bottom: 48px
    <section
      className="relative mb-12 group/row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4 px-4 md:px-12">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          {title}
        </h2>
        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-sm text-[#e5e5e5] hover:text-white transition-colors duration-200 flex items-center gap-1 group"
          >
            See All
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 md:w-20 h-full flex items-center justify-center bg-[#141414]/70 hover:bg-[#141414]/90 hover:scale-105 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
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
              />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 md:w-20 h-full flex items-center justify-center bg-[#141414]/70 hover:bg-[#141414]/90 hover:scale-105 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
