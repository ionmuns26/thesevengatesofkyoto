const LOCKOUT_KEY = 'sevengates_lockouts';
const LOCKOUT_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

function loadLockouts() {
  try {
    const saved = localStorage.getItem(LOCKOUT_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveLockouts(data) {
  localStorage.setItem(LOCKOUT_KEY, JSON.stringify(data));
}

export function setGateLockout(gateIndex) {
  const lockouts = loadLockouts();
  lockouts[gateIndex] = Date.now();
  saveLockouts(lockouts);
}

export function getGateLockoutRemaining(gateIndex) {
  const lockouts = loadLockouts();
  const ts = lockouts[gateIndex];
  if (!ts) return 0;
  const remaining = LOCKOUT_DURATION - (Date.now() - ts);
  return remaining > 0 ? remaining : 0;
}

export function formatLockoutTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}