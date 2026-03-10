import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { useAppStore } from '../store';
import { movies, tvShows } from '../constants/mockData';
import MovieCard from '../components/MovieCard';

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, addToContinueWatching } = useAppStore();
  
  const [currentEpisode, setCurrentEpisode] = useState({ season: 1, episode: 1 });
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [nextEpisodeCountdown, setNextEpisodeCountdown] = useState<number | null>(null);

  // Find content - for demo, using first TV show
  const content = tvShows[0]; // Stranger Things
  const isShow = true;

  // Mock current content data
  const currentContent = {
    _id: id || '101',
    title: content?.title || 'Stranger Things',
    description: content?.description || '',
    backdrop: content?.backdrop || '',
    thumbnail: content?.thumbnail || '',
    rating: content?.rating || 8.7,
    releaseYear: content?.releaseYear || 2016,
    maturityRating: content?.maturityRating || 'TV-14',
    quality: content?.quality || '4K',
    genre: content?.genre || ['Drama', 'Fantasy', 'Horror'],
    cast: content?.cast || [],
    creator: 'creator' in content ? content.creator : '',
    seasons: content?.seasons || [],
  };

  // Get current episode data
  const season = currentContent.seasons?.find(s => s.seasonNumber === selectedSeason);
  const episode = season?.episodes.find(e => e.episodeNumber === currentEpisode.episode);

  // Get similar content
  const similarContent = movies
    .filter(m => m.genre.some(g => currentContent.genre.includes(g)))
    .slice(0, 10);

  // Auto-play next episode countdown
  useEffect(() => {
    if (nextEpisodeCountdown !== null && nextEpisodeCountdown > 0) {
      const timer = setTimeout(() => {
        setNextEpisodeCountdown(nextEpisodeCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (nextEpisodeCountdown === 0) {
      // Play next episode
      handleNextEpisode();
    }
  }, [nextEpisodeCountdown]);

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    if (currentContent._id) {
      const progress = (currentTime / duration) * 100;
      addToContinueWatching({
        showId: currentContent._id,
        progress,
        lastWatched: new Date(),
        season: selectedSeason,
        episode: currentEpisode.episode,
      });
    }
  };

  const handleEnded = () => {
    // Show next episode countdown
    if (isShow && season && currentEpisode.episode < season.episodes.length) {
      setNextEpisodeCountdown(5);
    }
  };

  const handleNextEpisode = () => {
    if (season && currentEpisode.episode < season.episodes.length) {
      setCurrentEpisode(prev => ({ ...prev, episode: prev.episode + 1 }));
      setNextEpisodeCountdown(null);
    }
  };

  const toggleWatchlist = () => {
    if (isInWatchlist(currentContent._id)) {
      removeFromWatchlist(currentContent._id);
    } else {
      addToWatchlist(currentContent._id, isShow ? 'show' : 'movie');
    }
  };

  const handleSeasonChange = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    setCurrentEpisode({ season: seasonNumber, episode: 1 });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Video Player */}
      <div className="sticky top-0 z-50 bg-black">
        <VideoPlayer
          src={episode?.videoUrl || currentContent.backdrop}
          poster={currentContent.backdrop}
          title={`${currentContent.title} - S${selectedSeason}E${currentEpisode.episode}`}
          autoPlay={true}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          episodeId={episode ? `${currentContent._id}-s${selectedSeason}e${currentEpisode.episode}` : currentContent._id}
          showId={currentContent._id}
        />
      </div>

      {/* Content Info Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Title and Actions */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Title Row */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {currentContent.title}
                </h1>
                {isShow && (
                  <p className="text-gray-400">
                    Season {selectedSeason}, Episode {currentEpisode.episode}: {episode?.title || 'Episode'}
                  </p>
                )}
              </div>
            </div>

            {/* Meta Row */}
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <span className="text-green-400 font-semibold">{currentContent.rating * 10}% Match</span>
              <span className="text-gray-400">{currentContent.releaseYear}</span>
              <span className="px-2 py-0.5 border border-gray-500 rounded text-xs">{currentContent.maturityRating}</span>
              <span className="text-gray-400">{episode ? formatDuration(episode.duration) : '2h 30m'}</span>
              <span className="px-2 py-0.5 bg-neutral-700 rounded text-xs font-semibold">{currentContent.quality}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={toggleWatchlist}
                className={`px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  isInWatchlist(currentContent._id)
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-white hover:bg-neutral-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {isInWatchlist(currentContent._id) ? 'Added' : 'My List'}
              </button>
              <button className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Rate
              </button>
              <button className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className={`text-gray-300 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {currentContent.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-red-500 hover:text-red-400 text-sm mt-2 font-semibold"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentContent.genre.map((genre) => (
                <Link
                  key={genre}
                  to={`/browse/${genre.toLowerCase()}`}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm text-gray-300 transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>

            {/* Cast */}
            {currentContent.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Cast</h3>
                <div className="flex flex-wrap gap-4">
                  {currentContent.cast.slice(0, 6).map((actor) => (
                    <div key={actor} className="text-center">
                      <div className="w-16 h-16 bg-neutral-800 rounded-full mb-2 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-300">{actor}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Creator */}
            {currentContent.creator && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Creator</h3>
                <p className="text-gray-300">{currentContent.creator}</p>
              </div>
            )}
          </div>

          {/* Episode List (for TV Shows) */}
          {isShow && currentContent.seasons && currentContent.seasons.length > 0 && (
            <div className="lg:w-96">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Episodes</h2>
                  <select
                    value={selectedSeason}
                    onChange={(e) => handleSeasonChange(Number(e.target.value))}
                    className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    {currentContent.seasons.map((s) => (
                      <option key={s.seasonNumber} value={s.seasonNumber}>
                        Season {s.seasonNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                  {season?.episodes.map((ep) => (
                    <div
                      key={ep.episodeNumber}
                      onClick={() => setCurrentEpisode({ season: selectedSeason, episode: ep.episodeNumber })}
                      className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        currentEpisode.episode === ep.episodeNumber
                          ? 'bg-neutral-800 border border-red-600'
                          : 'bg-neutral-900 hover:bg-neutral-800'
                      }`}
                    >
                      <div className="relative w-32 flex-shrink-0 aspect-video rounded overflow-hidden bg-neutral-700">
                        <img
                          src={currentContent.backdrop}
                          alt={ep.title}
                          className="w-full h-full object-cover"
                        />
                        {currentEpisode.episode === ep.episodeNumber && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {ep.episodeNumber}. {ep.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDuration(ep.duration)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {ep.description || 'No description available'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Episode Countdown */}
        {nextEpisodeCountdown !== null && (
          <div className="fixed bottom-8 right-8 z-50 bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow-2xl">
            <p className="text-white font-semibold mb-2">Next Episode Starting In</p>
            <p className="text-4xl font-bold text-red-500 text-center mb-4">{nextEpisodeCountdown}</p>
            <div className="flex gap-3">
              <button
                onClick={handleNextEpisode}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                Play Now
              </button>
              <button
                onClick={() => setNextEpisodeCountdown(null)}
                className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* More Like This */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {similarContent.map((movie) => (
              <MovieCard key={movie._id} movie={movie} variant="poster" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
