import { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './HugDay.css';

const DAY = { name: 'Hug Day', date: 'Feb 12', emoji: '🤗' };

const INTRO = "Simran, this is your personal hug station. Hold the heart for a big hug—or pick a hug type below. 🤗💕";

const HUG_TYPES = [
  { emoji: '🐻', label: 'Bear hug', message: 'The biggest, warmest squeeze—just for you.' },
  { emoji: '🌸', label: 'Gentle hug', message: 'Soft and safe. You’re always in my arms.' },
  { emoji: '💕', label: 'Love hug', message: 'Every second of this hug says I love you.' },
  { emoji: '🌟', label: 'Good morning', message: 'Starting the day right—with you close.' },
];

export default function HugDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [holding, setHolding] = useState(false);
  const [scale, setScale] = useState(1);
  const [picked, setPicked] = useState(null);
  const intervalRef = useRef(null);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  const handlePress = () => {
    setHolding(true);
    let s = 1;
    intervalRef.current = setInterval(() => {
      s = Math.min(s + 0.08, 2);
      setScale(s);
      if (s >= 2 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 100);
  };

  const handleRelease = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHolding(false);
    setScale(1);
  };

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="hug-day">
        <p className="hug-intro">{INTRO}</p>
        <div className="hug-station">
          <div className="hug-station-label">Hold for a hug 🤗</div>
          <div className="hug-zone">
            <button
              type="button"
              className="hug-button"
              onMouseDown={handlePress}
              onMouseLeave={handleRelease}
              onMouseUp={handleRelease}
              onTouchStart={handlePress}
              onTouchEnd={handleRelease}
              style={{ transform: `scale(${scale})` }}
            >
              <span className="hug-heart">{holding ? '🤗' : '❤️'}</span>
              <span className="hug-label">{holding ? 'Hugging you...' : 'Hold for a hug'}</span>
            </button>
          </div>
          <div className="hug-types">
            {HUG_TYPES.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`hug-type-item ${picked === i ? 'picked' : ''}`}
                onClick={() => setPicked(picked === i ? null : i)}
              >
                <span className="hug-type-emoji">{item.emoji}</span>
                <span className="hug-type-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        {picked !== null && (
          <div className="hug-reveal">
            <p className="hug-message">"{HUG_TYPES[picked].message}"</p>
          </div>
        )}
      </div>
    </DayPageLayout>
  );
}
