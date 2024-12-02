"use client";

import { RefObject } from 'react';
import { Slider } from '@/components/ui/slider';
import usePlayerStore from '@/lib/store/usePlayerStore';
import { formatTime } from '@/lib/utils';

interface ProgressBarProps {
  audioRef: RefObject<HTMLAudioElement>;
}

export function ProgressBar({ audioRef }: ProgressBarProps) {
  const { currentTime, duration, setCurrentTime } = usePlayerStore();

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const time = value[0];
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
      <span className="text-sm">{formatTime(currentTime)}</span>
      <Slider
        className="flex-1"
        value={[currentTime]}
        min={0}
        max={duration}
        step={0.1}
        onValueChange={handleSeek}
      />
      <span className="text-sm">{formatTime(duration)}</span>
    </div>
  );
}