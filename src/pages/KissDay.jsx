import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './KissDay.css';

const DAY = { name: 'Kiss Day', date: 'Feb 13', emoji: '💋' };

const INTRO = "Simran, every kiss is a little promise. Tap a lip to read a note—or tap anywhere for hearts. 💋";

const KISS_NOTES = [
  { emoji: '💋', label: 'Forehead', message: 'For the way you think. I love your mind.' },
  { emoji: '💋', label: 'Cheek', message: 'For the smile that lights up my world.' },
  { emoji: '💋', label: 'Nose', message: 'For every silly, perfect moment with you.' },
  { emoji: '💋', label: 'Lips', message: 'For forever. This one never ends.' },
];

export default function KissDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [hearts, setHearts] = useState([]);
  const [picked, setPicked] = useState(null);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  const addHeart = (e) => {
    const touch = e.changedTouches?.[0] ?? e.touches?.[0];
    const x = (e.clientX ?? touch?.clientX) ?? 0;
    const y = (e.clientY ?? touch?.clientY) ?? 0;
    if (x && y) setHearts((prev) => [...prev.slice(-8), { id: Date.now(), x, y }]);
  };

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="kiss-day" onClick={addHeart} onTouchStart={addHeart}>
        <p className="kiss-intro">{INTRO}</p>
        <div className="kiss-card" onClick={(e) => e.stopPropagation()}>
          <div className="kiss-card-label">A kiss for every place 💕</div>
          <div className="kiss-grid">
            {KISS_NOTES.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`kiss-item ${picked === i ? 'picked' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPicked(picked === i ? null : i); }}
              >
                <span className="kiss-item-emoji">{item.emoji}</span>
                <span className="kiss-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="kiss-tap">Tap anywhere for more hearts 💕</p>
        {hearts.map((h) => (
          <span key={h.id} className="kiss-heart" style={{ left: h.x, top: h.y }}>
            💕
          </span>
        ))}
        {picked !== null && (
          <div className="kiss-reveal" onClick={(e) => e.stopPropagation()}>
            <p className="kiss-message">"{KISS_NOTES[picked].message}"</p>
          </div>
        )}
      </div>
    </DayPageLayout>
  );
}
