import { useState, useRef } from 'react';
import './MusicToggle.css';

// Optional: set a URL to your own romantic background music (e.g. from a free royalty-free source).
const MUSIC_URL = ''; // e.g. 'https://example.com/romantic-music.mp3'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!MUSIC_URL) {
      setPlaying(false);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play().catch(() => setPlaying(false));
    }
    setPlaying(!playing);
  };

  if (!MUSIC_URL) return null;

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <button
        type="button"
        className={`music-toggle ${playing ? 'playing' : ''}`}
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
      >
        {playing ? '🔊' : '🔇'}
      </button>
    </>
  );
}
