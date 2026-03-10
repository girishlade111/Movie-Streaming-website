import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

interface HeroContent {
  id: string;
  title: string;
  backdropImage: string;
  logoImage?: string;
  synopsis: string;
  genres: string[];
  year: number;
  duration: string;
  rating: string;
  matchPercentage: number;
  quality: 'HD' | 'FHD' | '4K';
  isNew?: boolean;
  isTop10?: boolean;
  top10Rank?: number;
}

export default function HeroBanner() {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const featuredContent: HeroContent[] = [
    {
      id: '1',
      title: 'Interstellar',
      backdropImage: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
      synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. Earth\'s future has been riddled by disasters, famines, and droughts.',
      genres: ['Adventure', 'Drama', 'Sci-Fi'],
      year: 2014,
      duration: '2h 49m',
      rating: 'PG-13',
      matchPercentage: 98,
      quality: '4K',
      isNew: false,
    },
    {
      id: '101',
      title: 'Stranger Things',
      backdropImage: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64COcfe.jpg',
      synopsis: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
      genres: ['Drama', 'Fantasy', 'Horror'],
      year: 2016,
      duration: '4 Seasons',
      rating: 'TV-14',
      matchPercentage: 95,
      quality: '4K',
      isNew: true,
      isTop10: true,
      top10Rank: 2,
    },
    {
      id: '5',
      title: 'Avengers: Endgame',
      backdropImage: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
      synopsis: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
      genres: ['Action', 'Adventure', 'Drama'],
      year: 2019,
      duration: '3h 1m',
      rating: 'PG-13',
      matchPercentage: 97,
      quality: '4K',
      isNew: false,
    },
  ];

  const currentContent = featuredContent[currentSlide];

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
      }, 8000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, featuredContent.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handlePlay = () => {
    navigate(`/watch/${currentContent.id}`);
  };

  const handleAddToList = () => {
    if (isInWatchlist(currentContent.id)) {
      removeFromWatchlist(currentContent.id);
    } else {
      addToWatchlist(currentContent.id, 'movie');
    }
  };

  return (
    // Hero Section - 80vh (min 600px, max 900px)
    <section className="relative w-full" style={{ height: '80vh', minHeight: '600px', maxHeight: '900px' }}>
      {/* Background Layer - Full cover with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={currentContent.backdropImage}
          alt={currentContent.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Gradient overlay: linear-gradient(to top, bg-primary 0%, transparent 60%, rgba(0,0,0,0.4) 100%) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #141414 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        {/* Additional bottom gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #141414 10%, transparent 100%)',
          }}
        />
      </div>

      {/* Content Container - Position: absolute, bottom: 120px, left: 4% */}
      <div
        className="absolute bottom-[120px] left-[4%] z-10"
        style={{ maxWidth: '600px' }}
      >
        {/* Top Badge (optional) */}
        {currentContent.isNew && (
          <div className="inline-block bg-[#E50914] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wide mb-4">
            New Release
          </div>
        )}
        {currentContent.isTop10 && currentContent.top10Rank && (
          <div className="flex items-center gap-3 mb-4">
            <div
              className="text-6xl font-black"
              style={{
                color: '#ffffff',
                WebkitTextStroke: '2px #181818',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {currentContent.top10Rank}
            </div>
            <span className="text-lg font-medium text-[#e5e5e5]">Today</span>
          </div>
        )}

        {/* Title - font-size 48px-64px, font-weight 700, line-height 1.1 */}
        <h1
          className="font-bold mb-4"
          style={{
            fontSize: 'clamp(48px, 5vw, 64px)',
            lineHeight: 1.1,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {currentContent.title}
        </h1>

        {/* Metadata Row - Flex, gap 12px, align-items center */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          {/* Match % */}
          <span className="font-semibold" style={{ color: '#46d369' }}>
            {currentContent.matchPercentage}% Match
          </span>
          <span className="text-[#e5e5e5]">{currentContent.year}</span>
          {/* Rating badge - border 1px, padding 2px 6px */}
          <span className="border border-[#e5e5e5] px-2 py-0.5 text-xs">
            {currentContent.rating}
          </span>
          <span className="text-[#e5e5e5]">{currentContent.duration}</span>
          {/* Quality badge */}
          <span className="bg-[#737373] text-white px-2 py-0.5 text-xs font-semibold rounded">
            {currentContent.quality}
          </span>
        </div>

        {/* Genres */}
        <div className="flex gap-2 mb-4">
          {currentContent.genres.map((genre) => (
            <span
              key={genre}
              className="text-xs text-[#e5e5e5] bg-[#1f1f1f]/80 px-3 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Synopsis - font-size 16px-18px, line-height 1.5, max 3 lines */}
        <p
          className="text-[#e5e5e5] mb-6"
          style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {currentContent.synopsis}
        </p>

        {/* Button Group - Flex, gap 12px */}
        <div className="flex gap-3">
          {/* Primary Button (Play) - bg-white, text-black, padding 12px 28px */}
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 bg-white text-black px-7 py-3 rounded font-semibold text-lg hover:bg-opacity-90 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>

          {/* Secondary Button (My List) - bg-overlay-light, text-white */}
          <button
            onClick={handleAddToList}
            className={`flex items-center gap-2 px-7 py-3 rounded font-semibold text-lg border transition-colors duration-200 ${
              isInWatchlist(currentContent.id)
                ? 'bg-[#E50914] text-white border-[#E50914]'
                : 'bg-[#2a2a2a]/80 text-white border-[#e5e5e5] hover:bg-[#2a2a2a]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {isInWatchlist(currentContent.id) ? 'Added' : 'My List'}
          </button>

          {/* Tertiary Button (Info) - 48px circle */}
          <button
            className="w-12 h-12 rounded-full bg-[#2a2a2a]/80 text-white flex items-center justify-center hover:bg-[#2a2a2a] transition-colors duration-200"
            aria-label="More info"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Indicators - Position: absolute, bottom: 32px, right: 4% */}
      <div className="absolute bottom-8 right-[4%] flex gap-2 z-10">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white/30 hover:scale-125'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
