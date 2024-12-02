"use client";

import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from 'lucide-react';
import usePlayerStore from '@/lib/store/usePlayerStore';

interface PlayerControlsProps {
  audioRef: RefObject<HTMLAudioElement>;
}

export function PlayerControls({ audioRef }: PlayerControlsProps) {
  const {
    isPlaying,
    togglePlay,
    nextTrack,
    previousTrack,
    isShuffled,
    toggleShuffle,
    repeatMode,
    setRepeatMode,
  } = usePlayerStore();

  const handleRepeatClick = () => {
    const modes: ('none' | 'all' | 'one')[] = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleShuffle()}
        className={isShuffled ? 'text-primary' : ''}
      >
        <Shuffle className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" onClick={previousTrack}>
        <SkipBack className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>

      <Button variant="ghost" size="icon" onClick={nextTrack}>
        <SkipForward className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleRepeatClick}
        className={repeatMode !== 'none' ? 'text-primary' : ''}
      >
        <Repeat className="h-5 w-5" />
      </Button>
    </div>
  );
}