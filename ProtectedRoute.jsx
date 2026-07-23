import React, { useEffect, useRef, useState, useCallback } from "react";

const GAME_WIDTH = 420;
const GAME_HEIGHT = 240;
const PLAYER_X = 60;
const PLAYER_SIZE = 28;
const LANES = [50, 115, 180];
const OBSTACLE_SPEED_BASE = 4.5;
const WIN_DURATION = 18000;
const BULLET_SPEED = 9;
const BULLET_W = 14;
const BULLET_H = 5;

// Dragon boss position (right side)
const DRAGON_X = GAME_WIDTH - 60;
const DRAGON_Y = GAME_HEIGHT / 2 - 30;
const DRAGON_W = 56;
const DRAGON_H = 60;

let obstacleId = 0;
let bulletId = 0;

export default function RunnerGame({ onComplete, onFail }) {
  const [lane, setLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [won, setWon] = useState(false);
  const [dragonHp, setDragonHp] = useState(20);
  const [dragonHit, setDragonHit] = useState(false);

  const laneRef = useRef(1);
  const obstaclesRef = useRef([]);
  const bulletsRef = useRef([]);
  const deadRef = useRef(false);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const spawnRef = useRef(null);
  const dragonHpRef = useRef(20);
  const wonRef = useRef(false);

  // Spawn a zombie child from the dragon
  const spawnObstacle = useCallback(() => {
    if (deadRef.current || wonRef.current) return;
    const elapsed = Date.now() - startTimeRef.current;
    const difficulty = Math.min(1, elapsed / 10000);
    // Sometimes spawn 2 at once
    const count = Math.random() < difficulty * 0.5 ? 2 : 1;
    const usedLanes = new Set();
    for (let i = 0; i < count; i++) {
      let newLane;
      do { newLane = Math.floor(Math.random() * 3); } while (usedLanes.has(newLane));
      usedLanes.add(newLane);
      const speed = OBSTACLE_SPEED_BASE + difficulty * 3 + Math.random() * 1.5;
      obstaclesRef.current = [
        ...obstaclesRef.current,
        { id: obstacleId++, x: GAME_WIDTH + 20, lane: newLane, speed },
      ];
    }
  }, []);

  const fireBullet = useCallback(() => {
    if (deadRef.current || wonRef.current || !startTimeRef.current) return;
    bulletsRef.current = [
      ...bulletsRef.current,
      { id: bulletId++, x: PLAYER_X + PLAYER_SIZE / 2, y: LANES[laneRef.current] },
    ];
  }, []);

  const checkPlayerCollision = useCallback((obs) => {
    const playerY = LANES[laneRef.current];
    const obsY = LANES[obs.lane];
    const dx = Math.abs(PLAYER_X - obs.x);
    const dy = Math.abs(playerY - obsY);
    return dx < PLAYER_SIZE - 4 && dy < PLAYER_SIZE - 4;
  }, []);

  const checkBulletHitObstacle = (bullet, obs) => {
    const obsY = LANES[obs.lane];
    return (
      bullet.x + BULLET_W > obs.x - PLAYER_SIZE / 2 &&
      bullet.x < obs.x + PLAYER_SIZE / 2 &&
      Math.abs(bullet.y - obsY) < PLAYER_SIZE - 4
    );
  };

  const checkBulletHitDragon = (bullet) => {
    return (
      bullet.x + BULLET_W > DRAGON_X &&
      bullet.x < DRAGON_X + DRAGON_W &&
      bullet.y > DRAGON_Y &&
      bullet.y < DRAGON_Y + DRAGON_H
    );
  };

  const tick = useCallback(() => {
    if (deadRef.current || wonRef.current) return;
    const now = Date.now();
    const el = now - startTimeRef.current;
    setElapsed(el);

    // Move obstacles
    obstaclesRef.current = obstaclesRef.current
      .map((o) => ({ ...o, x: o.x - o.speed }))
      .filter((o) => o.x > -40);

    // Move bullets
    bulletsRef.current = bulletsRef.current
      .map((b) => ({ ...b, x: b.x + BULLET_SPEED }))
      .filter((b) => b.x < GAME_WIDTH + 20);

    // Bullet vs obstacle collision
    const killedObstacleIds = new Set();
    const killedBulletIds = new Set();
    for (const bullet of bulletsRef.current) {
      for (const obs of obstaclesRef.current) {
        if (!killedObstacleIds.has(obs.id) && !killedBulletIds.has(bullet.id) && checkBulletHitObstacle(bullet, obs)) {
          killedObstacleIds.add(obs.id);
          killedBulletIds.add(bullet.id);
        }
      }
    }
    // Bullet vs dragon collision
    for (const bullet of bulletsRef.current) {
      if (!killedBulletIds.has(bullet.id) && checkBulletHitDragon(bullet)) {
        killedBulletIds.add(bullet.id);
        dragonHpRef.current = Math.max(0, dragonHpRef.current - 1);
        setDragonHp(dragonHpRef.current);
        setDragonHit(true);
        setTimeout(() => setDragonHit(false), 150);
        if (dragonHpRef.current <= 0) {
          wonRef.current = true;
          setWon(true);
          setRunning(false);
          clearInterval(spawnRef.current);
          setTimeout(() => onComplete(), 800);
          return;
        }
      }
    }

    if (killedObstacleIds.size > 0) {
      obstaclesRef.current = obstaclesRef.current.filter(o => !killedObstacleIds.has(o.id));
    }
    if (killedBulletIds.size > 0) {
      bulletsRef.current = bulletsRef.current.filter(b => !killedBulletIds.has(b.id));
    }

    // Player collision
    for (const o of obstaclesRef.current) {
      if (checkPlayerCollision(o)) {
        deadRef.current = true;
        setDead(true);
        setRunning(false);
        clearInterval(spawnRef.current);
        cancelAnimationFrame(rafRef.current);
        return;
      }
    }

    // Win by time (fallback)
    if (el >= WIN_DURATION && dragonHpRef.current > 0) {
      // Dragon still up after time, keep going but slow spawn
    }

    setObstacles([...obstaclesRef.current]);
    setBullets([...bulletsRef.current]);
    rafRef.current = requestAnimationFrame(tick);
  }, [checkPlayerCollision, onComplete]);

  const startGame = () => {
    laneRef.current = 1;
    obstaclesRef.current = [];
    bulletsRef.current = [];
    deadRef.current = false;
    wonRef.current = false;
    dragonHpRef.current = 20;
    setLane(1);
    setObstacles([]);
    setBullets([]);
    setDead(false);
    setWon(false);
    setElapsed(0);
    setDragonHp(20);
    setDragonHit(false);
    setRunning(true);
    startTimeRef.current = Date.now();
    spawnRef.current = setInterval(spawnObstacle, 900);
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnRef.current);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const handleKey = (e) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        laneRef.current = Math.max(0, laneRef.current - 1);
        setLane(laneRef.current);
      }
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        laneRef.current = Math.min(2, laneRef.current + 1);
        setLane(laneRef.current);
      }
      if (e.key === " ") {
        e.preventDefault();
        fireBullet();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running, fireBullet]);

  const progress = Math.min(((20 - dragonHpRef.current) / 20) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Game canvas */}
      <div
        className="relative border border-border/60 rounded-lg overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, maxWidth: "100%", background: "linear-gradient(180deg, #0a0a14 0%, #120a0a 100%)" }}
      >
        {/* Lane lines */}
        {LANES.map((y, i) => (
          <div key={i} className="absolute left-0 right-0 h-px bg-primary/10" style={{ top: y + PLAYER_SIZE / 2 + 6 }} />
        ))}

        {/* Dragon boss (right side) */}
        <div
          className="absolute transition-all"
          style={{
            left: DRAGON_X,
            top: DRAGON_Y,
            width: DRAGON_W,
            height: DRAGON_H,
            filter: dragonHit ? "brightness(3) drop-shadow(0 0 8px red)" : "drop-shadow(0 0 6px rgba(255,60,0,0.6))",
          }}
        >
          <DragonSVG hp={dragonHpRef.current} />
        </div>

        {/* Dragon HP bar */}
        {running && (
          <div className="absolute top-2 right-2 w-24 h-2 bg-muted rounded-full border border-border/30">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(dragonHpRef.current / 20) * 100}%`,
                background: dragonHpRef.current > 10 ? "#c0392b" : dragonHpRef.current > 5 ? "#e67e22" : "#f1c40f",
              }}
            />
          </div>
        )}
        {running && (
          <div className="absolute top-2 right-2 -translate-y-0">
            <span className="absolute -top-4 right-0 text-[9px] font-display text-destructive/70 tracking-widest uppercase">Dragon HP</span>
          </div>
        )}

        {/* Player — samurai */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: PLAYER_X - PLAYER_SIZE / 2,
            top: LANES[lane] - PLAYER_SIZE / 2,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            transition: "top 0.07s ease-out",
          }}
        >
          <SamuraiSVG />
        </div>

        {/* Bullets */}
        {bullets.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: b.x,
              top: b.y - BULLET_H / 2,
              width: BULLET_W,
              height: BULLET_H,
              background: "linear-gradient(90deg, hsl(var(--secondary)), #fff8)",
              boxShadow: "0 0 6px hsl(var(--secondary))",
            }}
          />
        ))}

        {/* Zombie children obstacles */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute flex items-center justify-center"
            style={{
              left: o.x - PLAYER_SIZE / 2,
              top: LANES[o.lane] - PLAYER_SIZE / 2,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
            }}
          >
            <ZombieChildSVG />
          </div>
        ))}

        {/* Overlays */}
        {!running && !dead && !won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/75 backdrop-blur-sm gap-3">
            <p className="font-display text-destructive tracking-widest text-sm uppercase">The Dragon Awakens</p>
            <p className="text-muted-foreground text-xs text-center px-4">Dodge zombie children • <span className="text-secondary">SPACE</span> to shoot • Kill the Dragon</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-primary text-primary-foreground font-display tracking-widest text-xs uppercase rounded hover:bg-primary/80 transition-colors"
            >
              Begin
            </button>
            <p className="text-muted-foreground text-[10px]">Arrow keys / W S to dodge</p>
          </div>
        )}
        {dead && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-3">
            <p className="font-display text-destructive tracking-widest text-sm uppercase">Devoured by the Horde</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-primary text-primary-foreground font-display tracking-widest text-xs uppercase rounded hover:bg-primary/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-2">
            <p className="font-display text-secondary tracking-widest text-sm uppercase">The Dragon Falls</p>
          </div>
        )}
      </div>

      {/* Mobile controls */}
      {running && (
        <div className="flex gap-3 md:hidden">
          <button
            onTouchStart={() => { laneRef.current = Math.max(0, laneRef.current - 1); setLane(laneRef.current); }}
            className="px-5 py-3 bg-card border border-border rounded text-foreground font-display text-xs uppercase tracking-wider"
          >▲ Up</button>
          <button
            onTouchStart={fireBullet}
            className="px-5 py-3 bg-secondary/20 border border-secondary/40 rounded text-secondary font-display text-xs uppercase tracking-wider"
          >Fire</button>
          <button
            onTouchStart={() => { laneRef.current = Math.min(2, laneRef.current + 1); setLane(laneRef.current); }}
            className="px-5 py-3 bg-card border border-border rounded text-foreground font-display text-xs uppercase tracking-wider"
          >▼ Down</button>
        </div>
      )}
    </div>
  );
}

function SamuraiSVG() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28">
      <rect x="10" y="10" width="8" height="10" rx="1" fill="hsl(var(--primary))" />
      <circle cx="14" cy="7" r="4" fill="hsl(var(--foreground)/0.9)" />
      <path d="M10 7 Q14 2 18 7" fill="hsl(var(--primary))" />
      <rect x="18" y="11" width="9" height="2" rx="1" fill="hsl(var(--secondary))" />
      <rect x="26" y="9.5" width="2" height="5" rx="0.5" fill="hsl(var(--secondary)/0.5)" />
      <rect x="10" y="20" width="3" height="6" rx="1" fill="hsl(var(--primary)/0.8)" />
      <rect x="15" y="20" width="3" height="6" rx="1" fill="hsl(var(--primary)/0.8)" />
    </svg>
  );
}

function ZombieChildSVG() {
  return (
    <svg viewBox="0 0 24 28" width="24" height="28">
      {/* Body */}
      <rect x="8" y="11" width="8" height="9" rx="1" fill="#3d7a3d" />
      {/* Head */}
      <circle cx="12" cy="7" r="4" fill="#5aad5a" />
      {/* Zombie eyes */}
      <circle cx="10" cy="6.5" r="1" fill="#ff2222" />
      <circle cx="14" cy="6.5" r="1" fill="#ff2222" />
      {/* Mouth */}
      <path d="M9.5 9 Q12 10.5 14.5 9" stroke="#ff2222" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Outstretched arms */}
      <line x1="8" y1="14" x2="3" y2="13" stroke="#3d7a3d" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="14" x2="21" y2="13" stroke="#3d7a3d" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <rect x="8" y="20" width="3" height="7" rx="1" fill="#2e5a2e" />
      <rect x="13" y="20" width="3" height="7" rx="1" fill="#2e5a2e" />
      {/* Drool */}
      <line x1="12" y1="10" x2="12" y2="11.5" stroke="#ff2222" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

function DragonSVG({ hp }) {
  const rage = hp < 10;
  return (
    <svg viewBox="0 0 56 72" width="56" height="72" fill="none">
      {/* Body */}
      <ellipse cx="28" cy="44" rx="16" ry="20" fill={rage ? "#8b0000" : "#6b0000"} />
      {/* Wings */}
      <path d="M12 36 L0 20 L14 32" fill={rage ? "#a00" : "#7a0000"} opacity="0.9" />
      <path d="M44 36 L56 20 L42 32" fill={rage ? "#a00" : "#7a0000"} opacity="0.9" />
      {/* Neck */}
      <rect x="22" y="18" width="12" height="18" rx="6" fill={rage ? "#8b0000" : "#6b0000"} />
      {/* Head */}
      <ellipse cx="28" cy="16" rx="11" ry="10" fill={rage ? "#a00" : "#7a0000"} />
      {/* Eyes */}
      <circle cx="23" cy="13" r="3" fill="#ff0" />
      <circle cx="33" cy="13" r="3" fill="#ff0" />
      <circle cx="23" cy="13" r="1.5" fill="#000" />
      <circle cx="33" cy="13" r="1.5" fill="#000" />
      {/* Nostrils / fire breath */}
      <circle cx="25" cy="19" r="1.2" fill="#ff4400" />
      <circle cx="31" cy="19" r="1.2" fill="#ff4400" />
      {/* Fire blasts from mouth */}
      {rage && (
        <>
          <ellipse cx="16" cy="22" rx="7" ry="3" fill="#ff6600" opacity="0.8" />
          <ellipse cx="10" cy="22" rx="5" ry="2" fill="#ff9900" opacity="0.6" />
        </>
      )}
      {/* Tail */}
      <path d="M28 64 Q20 72 14 68 Q22 66 24 64" fill={rage ? "#8b0000" : "#6b0000"} />
      {/* Spikes */}
      {[0, 1, 2, 3].map(i => (
        <polygon key={i} points={`${24 + i * 3},${26 + i * 4} ${26 + i * 3},${22 + i * 4} ${28 + i * 3},${26 + i * 4}`} fill="#ff4400" opacity="0.8" />
      ))}
      {/* HP indicator glow */}
      {rage && <ellipse cx="28" cy="44" rx="18" ry="22" fill="none" stroke="#ff2200" strokeWidth="2" opacity="0.4" />}
    </svg>
  );
}