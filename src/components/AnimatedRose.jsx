import { useState } from 'react';
import './AnimatedRose.css';

// Add your own rose GIF: put a file at public/rose.gif (e.g. download from
// LottieFiles, Giphy, or gifs.cc and save as rose.gif). Or set a full URL:
const ROSE_GIF = '/rose.gif';

export default function AnimatedRose({ bloom = 1, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className={`animated-rose animated-rose-fallback ${className}`} aria-hidden="true">
        <span className="rose-emoji">🌹</span>
      </div>
    );
  }

  return (
    <div className={`animated-rose ${className} ${bloom >= 1 ? 'bloomed' : ''}`} aria-hidden="true">
      <img
        src={ROSE_GIF}
        alt=""
        className="rose-gif"
        onError={() => setImgFailed(true)}
      />
    </div>
  );
}
