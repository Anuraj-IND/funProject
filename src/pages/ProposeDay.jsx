import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isDayUnlocked } from '../data/days';
import LockedDayView from '../components/LockedDayView';
import DayPageLayout from '../components/DayPageLayout';
import './ProposeDay.css';

const DAY = { name: 'Propose Day', date: 'Feb 8', emoji: '💍' };

const INTRO = "Simran, today I'm asking the most important question. Open the box when you're ready. 💍";

export default function ProposeDay() {
  const { adminUnlock } = useAdmin();
  const unlocked = isDayUnlocked(DAY.date, adminUnlock);
  const [opened, setOpened] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [response, setResponse] = useState(null);

  if (!unlocked) {
    return <LockedDayView dayName={DAY.name} date={DAY.date} emoji={DAY.emoji} />;
  }

  const handleOpen = () => setOpened(true);
  const handleYes = () => { setResponse('yes'); setAnswered(true); };
  const handleAlways = () => { setResponse('always'); setAnswered(true); };

  return (
    <DayPageLayout title={DAY.name} date={DAY.date} emoji={DAY.emoji}>
      <div className="propose-day">
        <p className="propose-intro">{INTRO}</p>
        <div className={`propose-ring-box ${opened ? 'opened' : ''}`}>
          {!opened ? (
            <button type="button" className="propose-open-btn" onClick={handleOpen}>
              <span className="propose-box-emoji">💍</span>
              <span className="propose-open-label">Open the box</span>
            </button>
          ) : !answered ? (
            <div className="propose-card">
              <p className="propose-question">Simran, will you be mine?</p>
              <p className="propose-sub">Today and every day after.</p>
              <div className="propose-buttons">
                <button type="button" className="propose-btn yes" onClick={handleYes}>
                  Yes 💕
                </button>
                <button type="button" className="propose-btn always" onClick={handleAlways}>
                  Always 🌹
                </button>
              </div>
            </div>
          ) : (
            <div className="propose-response">
              <span className="propose-heart">💍</span>
              <p>
                {response === 'yes'
                  ? "You said Yes! My heart is full. I promise to love you with everything I have, Simran. 💕"
                  : "Always. That's the only word I needed. I'll choose you, always, Simran. 🌹"}
              </p>
            </div>
          )}
        </div>
      </div>
    </DayPageLayout>
  );
}
