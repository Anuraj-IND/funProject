import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './TeddyDay.css';

const DAY = { name: 'Teddy Day', date: 'Feb 10', emoji: '🧸' };

const INTRO = "Simran, pick a teddy—each one has a hug and a message just for you. 🧸💕";

const TEDDIES = [
  { emoji: '🧸', label: 'Bear', message: "I'm here to hug you whenever you need. You're my comfort, Simran." },
  { emoji: '🐻', label: 'Panda', message: "You're as precious to me as this panda. Always in my arms." },
  { emoji: '🧸', label: 'Teddy', message: "Squeeze me anytime. I'll never let go of you." },
  { emoji: '🐰', label: 'Bunny', message: "Soft hugs for the softest person I know. That's you." },
  { emoji: '🦊', label: 'Fox', message: "Clever and cute—just like you. Here's a hug!" },
  { emoji: '🐻', label: 'Cub', message: "My little cub. You make every day warm and safe." },
];

export default function TeddyDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [picked, setPicked] = useState(null);
  const [hugging, setHugging] = useState(false);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  const handlePick = (i) => {
    setPicked(i);
    setHugging(true);
    setTimeout(() => setHugging(false), 600);
  };

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="teddy-day">
        <p className="teddy-intro">{INTRO}</p>
        <div className="teddy-shelf">
          <div className="teddy-shelf-label">Pick a teddy 🧸</div>
          <div className="teddy-grid">
            {TEDDIES.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`teddy-item ${picked === i ? 'picked' : ''} ${hugging && picked === i ? 'hugging' : ''}`}
                onClick={() => handlePick(i)}
              >
                <span className="teddy-emoji">{item.emoji}</span>
                <span className="teddy-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        {picked !== null && (
          <div className="teddy-reveal">
            <p className="teddy-message">"{TEDDIES[picked].message}"</p>
            <p className="teddy-footer">Pick another teddy for more hugs! 🤗</p>
          </div>
        )}
      </div>
    </DayPageLayout>
  );
}
