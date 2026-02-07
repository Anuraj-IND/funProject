import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './PromiseDay.css';

const DAY = { name: 'Promise Day', date: 'Feb 11', emoji: '🤝' };

const INTRO = "Simran, this is my promise to you—sealed with love. Tap each line to mark it. 🤝";

const PROMISES = [
  "I'll always be there for you.",
  "I'll choose you, every single day.",
  "I'll listen when you need to talk.",
  "I'll celebrate your wins and hold you through the tough days.",
  "I'll keep choosing us.",
  "I'll never take you for granted.",
];

export default function PromiseDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [checked, setChecked] = useState({});

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  const allChecked = PROMISES.every((_, i) => checked[i]);

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="promise-day">
        <p className="promise-intro">{INTRO}</p>
        <div className="promise-scroll">
          <div className="promise-scroll-seal">🤝</div>
          <div className="promise-scroll-title">My Promises to Simran</div>
          <ul className="promise-list">
            {PROMISES.map((text, i) => (
              <li
                key={i}
                className={`promise-item ${checked[i] ? 'checked' : ''}`}
                onClick={() => toggle(i)}
              >
                <span className="promise-check">{checked[i] ? '✓' : '○'}</span>
                <span className="promise-text">{text}</span>
              </li>
            ))}
          </ul>
          {allChecked && (
            <p className="promise-signed">— With love, always</p>
          )}
        </div>
        {allChecked && (
          <p className="promise-done">I mean every word, Simran. Always. 💕</p>
        )}
      </div>
    </DayPageLayout>
  );
}
