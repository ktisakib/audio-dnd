"use client";

import { useEffect, useRef } from 'react';
import usePlayerStore from '@/lib/store/usePlayerStore';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { ProgressBar } from './ProgressBar';
import { TrackInfo } from './TrackInfo';
import { cn } from '@/lib/utils';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    setCurrentTime,
    setDuration,
    togglePlay,
    nextTrack,
  } = usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = isPlaying ? audio.play() : Promise.resolve();

    playPromise
      .then(() => {
        if (!isPlaying) {
          audio.pause();
        }
      })
      .catch((error) => {
        console.error('Playback error:', error);
      });

    return () => {
      audio.pause();
    };
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <audio
            ref={audioRef}
            src={currentTrack?.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
          
          <div className="w-full md:w-1/3">
            <TrackInfo />
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center gap-2">
            <PlayerControls audioRef={audioRef} />
            <ProgressBar audioRef={audioRef} />
          </div>

          <div className="w-full md:w-1/3 flex justify-end">
            <VolumeControl />
          </div>
        </div>
      </div>
    </div>
  );
}