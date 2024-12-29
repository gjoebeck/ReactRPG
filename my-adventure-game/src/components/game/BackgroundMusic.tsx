import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  audioUrl: string;
  autoPlay?: boolean;
  loop?: boolean;
  initialVolume?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  audioUrl,
  autoPlay = true,
  loop = true,
  initialVolume = 0.5
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (autoPlay) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(error => console.error("Audio playback failed:", error));
        }
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-gray-800 p-2 rounded-lg shadow-lg">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop={loop}
      />
      <button
        onClick={togglePlay}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 accent-white"
      />
    </div>
  );
};

export default BackgroundMusic;