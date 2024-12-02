"use client";

import { useCallback, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ScrollArea } from "@/components/ui/scroll-area";
import usePlayerStore from "@/lib/store/usePlayerStore";
import { PlaylistItem } from "./PlaylistItem";
import { Track } from "@/types/audio";

interface PlaylistProps {
  initialTracks?: Track[];
}

export function Playlist({ initialTracks = [] }: PlaylistProps) {
  const { playlist, setPlaylist, currentTrack, setCurrentTrack } = usePlayerStore();

  useEffect(() => {
    if (initialTracks.length > 0 && playlist.length === 0) {
      setPlaylist(initialTracks);
    }
  }, [initialTracks, playlist.length, setPlaylist]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = playlist.findIndex((track) => track.id === active.id);
        const newIndex = playlist.findIndex((track) => track.id === over.id);

        const newPlaylist = [...playlist];
        const [movedItem] = newPlaylist.splice(oldIndex, 1);
        newPlaylist.splice(newIndex, 0, movedItem);

        setPlaylist(newPlaylist);
      }
    },
    [playlist, setPlaylist]
  );

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={playlist.map((track) => track.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <PlaylistItem
                key={track.id}
                track={track}
                index={index}
                isCurrentTrack={currentTrack?.id === track.id}
                onSelect={setCurrentTrack}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </ScrollArea>
  );
}