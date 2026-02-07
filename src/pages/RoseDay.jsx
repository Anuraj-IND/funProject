import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import AnimatedRose from '../components/AnimatedRose';
import './RoseDay.css';

const DAY = { name: 'Rose Day', date: 'Feb 7', emoji: '🌹' };

const INTRO = "Simran, a bouquet just for you. Tap the rose to watch it bloom—and read what's written from the heart. 🌹";

const MAIN_MESSAGE = "Every rose I give you is a promise: I'll choose you, again and again. You're the most beautiful bloom in my life, Simran. 🌹";

export default function RoseDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [revealed, setRevealed] = useState(false);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="rose-day">
        <p className="rose-intro">{INTRO}</p>
        <div className="rose-bouquet-box">
          <div className="rose-bouquet-lid">For Simran 💕</div>
          <div className="rose-reveal-area" onClick={() => setRevealed(true)}>
            <AnimatedRose bloom={revealed ? 1 : 0} />
            {!revealed ? (
              <p className="rose-tap-hint">Tap the rose to open it</p>
            ) : (
              <p className="rose-message">{MAIN_MESSAGE}</p>
            )}
          </div>
        </div>
      </div>
    </DayPageLayout>
  );
}
