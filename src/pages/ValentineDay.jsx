import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './ValentineDay.css';

const DAY = { name: "Valentine's Day", date: 'Feb 14', emoji: '❤️' };

const INTRO = "Simran, the last note of the week. Open the envelope when you're ready. ❤️";

const LETTER = `Simran,

This week was made for you. Every rose, every promise, every hug—they're all for you.

You're the reason my days are brighter and my heart is full. Thank you for being you, and for choosing us.

Happy Valentine's Day. Today and every day, you're my forever.

With all my love. ❤️`;

const HEARTS = ['❤️', '💕', '💗', '💖', '💝', '❤️', '💕', '💗'];

export default function ValentineDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [opened, setOpened] = useState(false);
  const [exploded, setExploded] = useState(false);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="valentine-day">
        <p className="valentine-intro">{INTRO}</p>
        <div className={`valentine-envelope ${opened ? 'opened' : ''}`}>
          {!opened ? (
            <button type="button" className="valentine-open-btn" onClick={() => setOpened(true)}>
              <span className="valentine-envelope-emoji">💌</span>
              <span className="valentine-open-label">Open the envelope</span>
            </button>
          ) : (
            <div className="valentine-letter">
              <pre className="valentine-text">{LETTER}</pre>
            </div>
          )}
        </div>
        {opened && (
          <>
            <button
              type="button"
              className="valentine-explode"
              onClick={() => setExploded(true)}
            >
              {exploded ? '❤️ Always' : '💕 Send love'}
            </button>
            {exploded && (
              <div className="heart-explosion" aria-hidden="true">
                {HEARTS.map((h, i) => (
                  <span key={i} className="explode-heart" style={{ '--i': i }}>
                    {h}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DayPageLayout>
  );
}
