interface NextEpisodeButtonProps {
  isVisible: boolean;
  countdown: number | null;
  onNext: () => void;
  onCancel: () => void;
  nextEpisodeTitle?: string;
}

export default function NextEpisodeButton({
  isVisible,
  countdown,
  onNext,
  onCancel,
  nextEpisodeTitle,
}: NextEpisodeButtonProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-xl p-6 shadow-2xl max-w-sm animate-slide-up">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold">Up Next</p>
          <p className="text-xs text-gray-400">{nextEpisodeTitle || 'Next Episode'}</p>
        </div>
      </div>

      {countdown !== null && countdown > 0 ? (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Starting soon</span>
            <span>{countdown}s</span>
          </div>
          <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-1000"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          onClick={onNext}
          className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors text-sm"
        >
          Play Now
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
