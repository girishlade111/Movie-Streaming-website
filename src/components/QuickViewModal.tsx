import { useState } from 'react';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  content: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ content, isOpen, onClose }: QuickViewModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !content) return null;

  const isShow = 'seasons' in content;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 rounded-xl overflow-hidden shadow-2xl animate-scale max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Section */}
        <div className="relative h-64 md:h-96">
          <img
            src={'backdrop' in content ? content.backdrop : ('thumbnail' in content ? content.thumbnail : content.videoUrl)}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-red-600/90 hover:bg-red-600 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Content Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{content.title}</h2>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span className="text-green-400 font-semibold">{content.rating * 10}% Match</span>
              {'releaseYear' in content && <span>{content.releaseYear}</span>}
              {'duration' in content && (
                <span>{Math.floor(content.duration / 60)}h {content.duration % 60}m</span>
              )}
              {'maturityRating' in content && (
                <span className="px-2 py-0.5 border border-gray-500 rounded">{content.maturityRating}</span>
              )}
              {'quality' in content && (
                <span className="px-2 py-0.5 bg-neutral-700 rounded font-semibold">{content.quality}</span>
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Synopsis */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{content.description}</p>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {content.genre.map((g: string) => (
                    <Link
                      key={g}
                      to={`/browse/${g.toLowerCase()}`}
                      className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-sm text-gray-300 transition-colors"
                      onClick={onClose}
                    >
                      {g}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cast */}
              {'cast' in content && content.cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {content.cast.slice(0, 6).map((actor: string) => (
                      <div key={actor} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-300">{actor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm">Type</span>
                <p className="font-medium capitalize">{isShow ? 'TV Show' : 'Movie'}</p>
              </div>
              {isShow && 'seasons' in content && (
                <div>
                  <span className="text-gray-400 text-sm">Seasons</span>
                  <p className="font-medium">{content.seasons.length}</p>
                </div>
              )}
              {'creator' in content && (
                <div>
                  <span className="text-gray-400 text-sm">Creator</span>
                  <p className="font-medium">{content.creator}</p>
                </div>
              )}
              {'director' in content && (
                <div>
                  <span className="text-gray-400 text-sm">Director</span>
                  <p className="font-medium">{content.director}</p>
                </div>
              )}
              {'language' in content && (
                <div>
                  <span className="text-gray-400 text-sm">Language</span>
                  <p className="font-medium">{content.language}</p>
                </div>
              )}
              {'subtitles' in content && (
                <div>
                  <span className="text-gray-400 text-sm">Subtitles</span>
                  <p className="font-medium">{content.subtitles.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-neutral-800">
            <Link
              to={`/watch/${content._id}`}
              className="flex-1 px-6 py-3 bg-white text-neutral-950 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <button className="flex-1 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              My List
            </button>
            <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
