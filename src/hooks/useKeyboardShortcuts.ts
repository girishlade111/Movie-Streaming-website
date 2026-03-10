import { useEffect } from 'react';
import { usePlayerStore } from '../store';

export function useKeyboardShortcuts() {
  const { play, pause, isPlaying, toggleMute, setVolume, volume } = usePlayerStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          isPlaying ? pause() : play();
          break;
        case 'm':
          toggleMute();
          break;
        case 'arrowup':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'arrowdown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'f':
          // Fullscreen toggle handled by video player
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [play, pause, isPlaying, toggleMute, setVolume, volume]);
}
