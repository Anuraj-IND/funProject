import { createContext, useContext, useState, useCallback } from 'react';
import { ADMIN_PASSWORD } from '../data/days';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [adminUnlock, setAdminUnlock] = useState(false);

  const tryUnlock = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      setAdminUnlock(true);
      return true;
    }
    return false;
  }, []);

  const lock = useCallback(() => setAdminUnlock(false), []);

  return (
    <AdminContext.Provider value={{ adminUnlock, tryUnlock, lock }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
