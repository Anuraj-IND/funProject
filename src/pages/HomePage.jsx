import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { getDaysWithUnlock } from '../data/days';
import AnimatedRose from '../components/AnimatedRose';
import './HomePage.css';

const NICKNAME = 'Simran';

export default function HomePage() {
  const { adminUnlock } = useAdmin();
  const days = getDaysWithUnlock(adminUnlock);

  return (
    <div className="home-page page-enter-active">
      <header className="home-header">
        <h1>For {NICKNAME} ❤️</h1>
        <p className="tagline">A week made just for you</p>
        <div className="home-rose">
          <AnimatedRose bloom={1} className="compact" />
        </div>
      </header>

      <section className="days-grid">
        {days.map((day) => (
          <DayCard key={day.id} day={day} />
        ))}
      </section>

      <footer className="home-footer">
        <p>With love, always.</p>
      </footer>
    </div>
  );
}

function DayCard({ day }) {
  const { name, date, emoji, path, unlocked } = day;

  const content = (
    <div className={`day-card ${unlocked ? 'unlocked' : 'locked'}`}>
      <span className="day-emoji">{emoji}</span>
      <h3 className="day-name">{name}</h3>
      <p className="day-date">{date}</p>
      {unlocked ? (
        <span className="day-cta">Open →</span>
      ) : (
        <span className="day-locked">
          <span className="lock-icon">🔒</span> Coming Soon
        </span>
      )}
    </div>
  );

  if (unlocked) {
    return (
      <Link to={path} className="day-card-link">
        {content}
      </Link>
    );
  }

  return (
    <div className="day-card-wrapper locked-wrapper">
      {content}
    </div>
  );
}
