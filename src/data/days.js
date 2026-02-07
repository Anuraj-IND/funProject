/**
 * Valentine's Week days (fixed order).
 * Unlock logic uses Indian Standard Time (IST, UTC+5:30).
 */

export const VALENTINES_WEEK = [
  { id: 'rose', name: 'Rose Day', date: 'Feb 7', emoji: '🌹', path: '/rose' },
  { id: 'propose', name: 'Propose Day', date: 'Feb 8', emoji: '💍', path: '/propose' },
  { id: 'chocolate', name: 'Chocolate Day', date: 'Feb 9', emoji: '🍫', path: '/chocolate' },
  { id: 'teddy', name: 'Teddy Day', date: 'Feb 10', emoji: '🧸', path: '/teddy' },
  { id: 'promise', name: 'Promise Day', date: 'Feb 11', emoji: '🤝', path: '/promise' },
  { id: 'hug', name: 'Hug Day', date: 'Feb 12', emoji: '🤗', path: '/hug' },
  { id: 'kiss', name: 'Kiss Day', date: 'Feb 13', emoji: '💋', path: '/kiss' },
  { id: 'valentine', name: "Valentine's Day", date: 'Feb 14', emoji: '❤️', path: '/valentine' },
];

/** Year to use for date comparison (e.g. 2025 or current year). */
const YEAR = new Date().getFullYear();

/** Parse a day like "Feb 7" into a Date at midnight IST. */
function parseDayIST(dayStr) {
  const [monthStr, dayNum] = dayStr.split(' ');
  const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const month = monthMap[monthStr];
  const day = parseInt(dayNum, 10);
  return new Date(Date.UTC(YEAR, month, day, 0, 0, 0, 0) - 5.5 * 60 * 60 * 1000);
}

/** Indian Standard Time offset (UTC+5:30) in milliseconds. */
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Get start of “today” in IST (midnight IST for the current IST date). */
export function getTodayIST() {
  const now = new Date();
  const istMoment = new Date(now.getTime() + IST_OFFSET_MS);
  const y = istMoment.getUTCFullYear();
  const m = istMoment.getUTCMonth();
  const d = istMoment.getUTCDate();
  return new Date(Date.UTC(y, m, d, 0, 0, 0, 0) - IST_OFFSET_MS);
}

/**
 * Check if a day (e.g. "Feb 7") is unlocked.
 * Unlocks when the current date in IST is on or after that day.
 * @param {string} dateStr - e.g. "Feb 7"
 * @param {boolean} adminUnlock - if true, all days are unlocked
 */
export function isDayUnlocked(dateStr, adminUnlock = false) {
  if (adminUnlock) return true;
  const startOfTodayIST = getTodayIST();
  const dayDate = parseDayIST(dateStr);
  return startOfTodayIST >= dayDate;
}

/**
 * Get unlock status for all days.
 * @param {boolean} adminUnlock
 * @returns {Array<{ ...day, unlocked: boolean }>}
 */
export function getDaysWithUnlock(adminUnlock = false) {
  return VALENTINES_WEEK.map((day) => ({
    ...day,
    unlocked: isDayUnlocked(day.date, adminUnlock),
  }));
}

/** Admin password (hardcoded as requested). */
export const ADMIN_PASSWORD = 'simran2025';
