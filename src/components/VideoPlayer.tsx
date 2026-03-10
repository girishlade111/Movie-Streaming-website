import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { usePlayerStore } from '../store';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  onReady?: (player: any) => void;
}

export default function VideoPlayer({ src, poster, autoPlay = false, onReady }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const { play, pause, isPlaying, setProgress, setVolume, isMuted, volume } = usePlayerStore();

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Video.js
    playerRef.current = videojs(videoRef.current, {
      controls: false, // We'll use custom controls
      autoplay: autoPlay,
      preload: 'auto',
      poster,
      sources: [{ src, type: 'application/x-mpegURL' }], // HLS support
      fluid: true,
      aspectRatio: '16:9',
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
        },
      },
    });

    const player = playerRef.current;

    // Event listeners
    player.on('play', () => play());
    player.on('pause', () => pause());
    player.on('timeupdate', () => {
      const progress = (player.currentTime() / player.duration()) * 100;
      setProgress(progress || 0);
    });
    player.on('volumechange', () => {
      setVolume(player.muted() ? 0 : player.volume());
    });
    player.on('ready', () => {
      onReady?.(player);
    });

    // Sync store state to player
    if (isPlaying && player.paused()) {
      player.play().catch(console.error);
    } else if (!isPlaying && !player.paused()) {
      player.pause();
    }

    player.muted(isMuted);
    player.volume(volume);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster, autoPlay, onReady, play, pause, setProgress, setVolume, isPlaying, isMuted, volume]);

  return (
    <div className="relative w-full">
      <div
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        data-setup='{}'
      />
      
      {/* Custom Controls Overlay - You can customize this further */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
        {/* Add custom controls here if needed */}
      </div>
    </div>
  );
}
