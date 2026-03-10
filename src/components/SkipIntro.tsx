import { useState, useEffect } from 'react';

interface SkipIntroProps {
  introStart: number;
  introEnd: number;
  currentTime: number;
  onSkip: () => void;
}

export default function SkipIntro({ introStart, introEnd, currentTime, onSkip }: SkipIntroProps) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button when video is in intro range (last 5 seconds of intro)
    const timeUntilEnd = introEnd - currentTime;
    setShowSkip(currentTime >= introStart && currentTime < introEnd && timeUntilEnd <= 10);
  }, [currentTime, introStart, introEnd]);

  if (!showSkip) return null;

  return (
    <button
      onClick={onSkip}
      className="absolute bottom-20 right-4 z-40 px-6 py-3 bg-white/90 hover:bg-white text-neutral-900 rounded-lg font-bold text-sm transition-all transform hover:scale-105 shadow-lg"
    >
      Skip Intro
    </button>
  );
}
