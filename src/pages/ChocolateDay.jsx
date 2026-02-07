import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './ChocolateDay.css';

const DAY = { name: 'Chocolate Day', date: 'Feb 9', emoji: '🍫' };

const INTRO = "Simran, you're sweeter than any chocolate. Every moment with you is a treat. Pick a chocolate—each one holds something sweet for you. 🍫💕";

const CHOCOLATES = [
  { emoji: '🍫', label: 'Dark chocolate', message: 'Like you—rich and unforgettable.' },
  { emoji: '🍬', label: 'Candy', message: 'You make life sugary sweet.' },
  { emoji: '🧁', label: 'Cupcake', message: 'My favourite treat is you.' },
  { emoji: '🍩', label: 'Donut', message: 'You’re the hole in one in my life.' },
  { emoji: '🍪', label: 'Cookie', message: 'You’re one in a cookie jar.' },
  { emoji: '🎂', label: 'Cake', message: 'Every day with you is a celebration.' },
  { emoji: '🍫', label: 'Truffle', message: 'Luxury, just like us.' },
  { emoji: '💝', label: 'Heart', message: 'You have my whole heart, Simran.' },
];

export default function ChocolateDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [hovered, setHovered] = useState(null);
  const [picked, setPicked] = useState(null);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  const handlePick = (i) => {
    setPicked(picked === i ? null : i);
  };

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="chocolate-day">
        <p className="chocolate-intro">{INTRO}</p>

        <div className="chocolate-box">
          <div className="chocolate-box-lid">🍫 Chocolate Day</div>
          <div className="chocolate-grid">
            {CHOCOLATES.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`chocolate-item ${hovered === i ? 'hovered' : ''} ${picked === i ? 'picked' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handlePick(i)}
              >
                <span className="chocolate-emoji">{item.emoji}</span>
                <span className="chocolate-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {picked !== null && (
          <div className="chocolate-reveal">
            <p className="chocolate-message-text">
              “{CHOCOLATES[picked].message}”
            </p>
            <p className="chocolate-footer">Pick another from the box! 💕</p>
          </div>
        )}
      </div>
    </DayPageLayout>
  );
}
