"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Track } from "@/types/audio";
import { GripVertical } from "lucide-react";

interface PlaylistItemProps {
  track: Track;
  index: number;
  isCurrentTrack: boolean;
  onSelect: (track: Track) => void;
}

export function PlaylistItem({ track, index, isCurrentTrack, onSelect }: PlaylistItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-2 rounded-md cursor-pointer hover:bg-accent ${
        isCurrentTrack ? "bg-accent" : ""
      } ${isDragging ? "shadow-lg" : ""}`}
      onClick={() => onSelect(track)}
    >
      <div className="flex items-center gap-2">
        <button
          className="touch-none p-1 opacity-60 hover:opacity-100"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">{index + 1}</span>
        <div>
          <p className="font-medium">{track.title}</p>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
        </div>
      </div>
    </div>
  );
}