import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

interface HeroContent {
  id: string;
  type: 'movie' | 'show';
  title: string;
  logoImage?: string;
  backdropImage: string;
  trailerVideo?: string;
  synopsis: string;
  genres: string[];
  year: number;
  duration: string;
  rating: string;
  matchPercentage: number;
  isNew?: boolean;
  top10Rank?: number;
  quality: 'HD' | 'FHD' | '4K';
}

interface HeroBannerProps {
  movie?: any;
}

export default function HeroBanner({}: HeroBannerProps) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useAppStore();
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Multiple featured content for carousel
  const featuredContent: HeroContent[] = [
    {
      id: '1',
      type: 'movie',
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
      top10Rank: 1,
    },
    {
      id: '101',
      type: 'show',
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
      top10Rank: 2,
    },
    {
      id: '5',
      type: 'movie',
      title: 'Avengers: Endgame',
      backdropImage: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
      synopsis: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions.',
      genres: ['Action', 'Adventure', 'Drama'],
      year: 2019,
      duration: '3h 1m',
      rating: 'PG-13',
      matchPercentage: 97,
      quality: '4K',
      isNew: false,
      top10Rank: 3,
    },
  ];

  const currentContent = featuredContent[currentSlide];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [featuredContent.length]);

  // Handle video mute/unmute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlay = () => {
    navigate(`/watch/${currentContent.id}`);
  };

  const handleAddToList = () => {
    if (isInWatchlist(currentContent.id)) {
      removeFromWatchlist(currentContent.id);
    } else {
      addToWatchlist(currentContent.id, currentContent.type);
    }
  };

  const handleMoreInfo = () => {
    setShowInfo(true);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {/* Video Background (simulated with image for demo) */}
          <img
            src={currentContent.backdropImage}
            alt={currentContent.title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-transparent to-transparent" />
        </div>

        {/* Mute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-24 right-4 md:right-8 z-30 p-3 bg-neutral-800/50 backdrop-blur-sm rounded-full text-white hover:bg-neutral-700/70 transition-colors"
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Age Rating Badge */}
        <div className="absolute top-24 left-4 md:left-8 z-30">
          <div className="px-3 py-1.5 bg-neutral-800/80 backdrop-blur-sm border border-neutral-600 rounded text-sm font-semibold text-white">
            {currentContent.rating}
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            {/* Top 10 Badge */}
            {currentContent.top10Rank && (
              <div className="flex items-center gap-3">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700" 
                     style={{ textShadow: '0 0 30px rgba(229, 9, 20, 0.5)' }}>
                  TOP {currentContent.top10Rank}
                </div>
                <div className="text-sm text-gray-300">Today</div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
              {currentContent.title}
            </h1>

            {/* Meta Info Row */}
            <div className="flex items-center gap-4 text-sm md:text-base">
              {/* Match Percentage */}
              <span className="text-green-400 font-semibold">
                {currentContent.matchPercentage}% Match
              </span>
              <span className="text-gray-400">{currentContent.year}</span>
              <span className="px-2 py-0.5 border border-gray-500 rounded text-xs">{currentContent.rating}</span>
              <span className="text-gray-400">{currentContent.duration}</span>
              <span className="px-2 py-0.5 bg-neutral-700 rounded text-xs font-semibold">
                {currentContent.quality}
              </span>
            </div>

            {/* New Badge */}
            {currentContent.isNew && (
              <div className="inline-block">
                <span className="px-3 py-1 bg-red-600 rounded text-xs font-semibold text-white">
                  NEW EPISODE
                </span>
              </div>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {currentContent.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-neutral-800/60 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-neutral-700"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg line-clamp-3 leading-relaxed">
              {currentContent.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* Play Button */}
              <button
                onClick={handlePlay}
                className="px-8 py-3.5 bg-white text-neutral-950 rounded-lg font-bold text-lg flex items-center gap-3 hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>

              {/* Add to List Button */}
              <button
                onClick={handleAddToList}
                className={`px-8 py-3.5 rounded-lg font-bold text-lg flex items-center gap-3 transition-colors border-2 ${
                  isInWatchlist(currentContent.id)
                    ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                    : 'bg-neutral-800/60 border-gray-500 text-white hover:border-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {isInWatchlist(currentContent.id) ? 'Added' : 'My List'}
              </button>

              {/* More Info Button */}
              <button
                onClick={handleMoreInfo}
                className="px-8 py-3.5 bg-neutral-700/60 backdrop-blur-sm rounded-lg font-bold text-lg flex items-center gap-3 hover:bg-neutral-600/80 transition-colors border-2 border-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-neutral-800/50 backdrop-blur-sm rounded-full text-white hover:bg-neutral-700/70 transition-colors hidden md:block"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredContent.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-neutral-800/50 backdrop-blur-sm rounded-full text-white hover:bg-neutral-700/70 transition-colors hidden md:block"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-2 bg-red-600 rounded-full'
                  : 'w-2 h-2 bg-gray-500 rounded-full hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Info Modal */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-neutral-900 rounded-xl overflow-hidden shadow-2xl animate-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-neutral-800/80 rounded-full text-white hover:bg-neutral-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="relative h-64 md:h-96">
              <img
                src={currentContent.backdropImage}
                alt={currentContent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentContent.title}</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-400 font-semibold">{currentContent.matchPercentage}% Match</span>
                  <span>{currentContent.year}</span>
                  <span>{currentContent.duration}</span>
                  <span className="px-2 py-0.5 border border-gray-500 rounded">{currentContent.rating}</span>
                  <span className="px-2 py-0.5 bg-neutral-700 rounded font-semibold">{currentContent.quality}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-xl font-semibold">Synopsis</h3>
                  <p className="text-gray-300 leading-relaxed">{currentContent.synopsis}</p>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentContent.genres.map((genre) => (
                        <span key={genre} className="px-3 py-1 bg-neutral-800 rounded-full text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm">Type</span>
                    <p className="font-medium capitalize">{currentContent.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Rating</span>
                    <p className="font-medium">{currentContent.rating}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Quality</span>
                    <p className="font-medium">{currentContent.quality}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePlay}
                  className="flex-1 px-6 py-3 bg-white text-neutral-950 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play Now
                </button>
                <button
                  onClick={handleAddToList}
                  className="flex-1 px-6 py-3 bg-neutral-800 rounded-lg font-bold hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  My List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
