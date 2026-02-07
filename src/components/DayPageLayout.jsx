import { Link } from 'react-router-dom';
import './DayPageLayout.css';

export default function DayPageLayout({ title, date, emoji, children }) {
  return (
    <div className="day-page-layout">
      <Link to="/" className="day-back">← Home</Link>
      <header className="day-page-header">
        <span className="day-page-emoji">{emoji}</span>
        <h1>{title}</h1>
        <p className="day-page-date">{date}</p>
      </header>
      <div className="day-page-body">
        {children}
      </div>
    </div>
  );
}
