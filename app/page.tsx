import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Playlist } from '@/components/audio/Playlist';
import usePlayerStore from '@/lib/store/usePlayerStore';

const demoTracks = [
  {
    id: '1',
    title: 'Demo Track 1',
    artist: 'Artist 1',
    album: 'Album 1',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 213,
  },
  {
    id: '2',
    title: 'Demo Track 2',
    artist: 'Artist 2',
    album: 'Album 2',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 198,
  },
  {
    id: '3',
    title: 'Demo Track 3',
    artist: 'Artist 3',
    album: 'Album 3',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 245,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Audio Player</h1>
        <div className="mb-24">
          <Playlist initialTracks={demoTracks} />
        </div>
        <AudioPlayer />
      </div>
    </main>
  );
}