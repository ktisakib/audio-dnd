"use client";

import Image from 'next/image';
import usePlayerStore from '@/lib/store/usePlayerStore';

export function TrackInfo() {
  const { currentTrack } = usePlayerStore();

  if (!currentTrack) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-muted rounded-md animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-md overflow-hidden">
        <Image
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold">{currentTrack.title}</h3>
        <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
      </div>
    </div>
  );
}