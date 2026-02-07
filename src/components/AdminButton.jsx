import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './AdminButton.css';

export default function AdminButton() {
  const { adminUnlock, tryUnlock, lock } = useAdmin();
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    if (adminUnlock) {
      lock();
      return;
    }
    setShowPrompt(true);
    setPassword('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tryUnlock(password)) {
      setShowPrompt(false);
      setPassword('');
      setError('');
    } else {
      setError('Wrong password. Try again.');
    }
  };

  return (
    <>
      <button
        type="button"
        className="admin-button"
        onClick={handleOpen}
        title={adminUnlock ? 'Lock preview' : 'Admin / Preview'}
        aria-label={adminUnlock ? 'Lock preview' : 'Admin preview'}
      >
        {adminUnlock ? '🔓 Preview On' : '🔒 Admin'}
      </button>

      {showPrompt && (
        <div className="admin-overlay" onClick={() => setShowPrompt(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Admin / Preview</h3>
            <p>Enter password to unlock all days:</p>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                autoComplete="off"
              />
              {error && <p className="admin-error">{error}</p>}
              <div className="admin-actions">
                <button type="button" onClick={() => setShowPrompt(false)}>Cancel</button>
                <button type="submit">Unlock All</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
