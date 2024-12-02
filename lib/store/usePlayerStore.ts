import { create } from 'zustand';
import { Track } from '@/types/audio';

interface PlayerState {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'all' | 'one';
  setCurrentTrack: (track: Track) => void;
  setPlaylist: (playlist: Track[]) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: 'none' | 'all' | 'one') => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  playlist: [],
  isPlaying: false,
  volume: 1,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  isShuffled: false,
  repeatMode: 'none',

  setCurrentTrack: (track) => set({ currentTrack: track }),
  setPlaylist: (playlist) => set({ playlist }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  setRepeatMode: (mode) => set({ repeatMode: mode }),

  nextTrack: () => {
    const { currentTrack, playlist, isShuffled, repeatMode } = get();
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((track) => track.id === currentTrack.id);
    let nextIndex = currentIndex + 1;

    if (nextIndex >= playlist.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    }

    set({ currentTrack: playlist[nextIndex] });
  },

  previousTrack: () => {
    const { currentTrack, playlist } = get();
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((track) => track.id === currentTrack.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;

    set({ currentTrack: playlist[previousIndex] });
  },
}));

export default usePlayerStore;