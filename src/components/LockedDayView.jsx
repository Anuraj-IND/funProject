import { Link } from 'react-router-dom';
import './LockedDayView.css';

export default function LockedDayView({ dayName, date, emoji }) {
  return (
    <div className="locked-day-view">
      <div className="locked-day-card">
        <span className="locked-emoji">{emoji}</span>
        <h2>{dayName}</h2>
        <p className="locked-date">{date}</p>
        <div className="locked-badge">
          <span className="lock-icon">🔒</span> Coming Soon
        </div>
        <p className="locked-message">This day is not unlocked yet. Come back when it&apos;s time!</p>
        <Link to="/" className="locked-back">← Back to Home</Link>
      </div>
    </div>
  );
}
