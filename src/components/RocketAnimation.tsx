import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Zap, BarChart2, Users, CheckCircle, Sparkles } from "lucide-react";
import React, { useState } from "react";

const W = 800;
const H = 800;
const CX = W / 2;
const CY = H / 2;

// Random-ish staggered appear frames for each icon
const ICON_CONFIG = [
  { Icon: Zap,         angle: 0,   orbitR: 230, label: "zap",      appearFrame: 18 },
  { Icon: Users,       angle: 60,  orbitR: 230, label: "users",    appearFrame: 35 },
  { Icon: Sparkles,    angle: 120, orbitR: 230, label: "sparkles", appearFrame: 8  },
  { Icon: CheckCircle, angle: 240, orbitR: 230, label: "check",    appearFrame: 48 },
  { Icon: BarChart2,   angle: 300, orbitR: 230, label: "chart",    appearFrame: 26 },
];

function toRad(deg: number) {
  return (deg - 90) * (Math.PI / 180);
}

// --- Glow dots on rings ---
function RingDots({ radius, count, frame, phaseOffset = 0 }: {
  radius: number; count: number; frame: number; phaseOffset?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const r = toRad((i / count) * 360);
        const opacity = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame * 0.08 + phaseOffset + i * 0.8));
        return (
          <circle
            key={i}
            cx={CX + radius * Math.cos(r)}
            cy={CY + radius * Math.sin(r)}
            r={4}
            fill="#7090ff"
            opacity={opacity}
          />
        );
      })}
    </>
  );
}

// --- Orbital rings with breathing pulse + ping ripple ---
function OrbitalRings({ frame }: { frame: number }) {
  const rot1 = (frame / 150) * 180;
  const rot2 = -(frame / 150) * 120;

  const pulse1 = 1 + 0.045 * Math.sin(frame * 0.07);
  const pulse2 = 1 + 0.035 * Math.sin(frame * 0.09 + 1.1);
  const glow1 = 0.28 + 0.22 * Math.sin(frame * 0.07);
  const glow2 = 0.22 + 0.18 * Math.sin(frame * 0.09 + 1.1);

  // Outward ping: repeats every 75 frames
  const ping1 = (frame % 75) / 75;
  const ping2 = ((frame + 38) % 75) / 75;

  return (
    <AbsoluteFill>
      {/* Outer ring - breathing */}
      <div style={{
        position: "absolute",
        top: CY - 230 * pulse1,
        left: CX - 230 * pulse1,
        width: 230 * 2 * pulse1,
        height: 230 * 2 * pulse1,
        borderRadius: "50%",
        border: `1.5px dashed rgba(80,120,255,${glow1})`,
        transform: `rotate(${rot1}deg)`,
        boxSizing: "border-box",
        boxShadow: `0 0 ${10 * glow1}px rgba(60,100,255,${glow1 * 0.4})`,
      }} />

      {/* Inner ring - breathing */}
      <div style={{
        position: "absolute",
        top: CY - 160 * pulse2,
        left: CX - 160 * pulse2,
        width: 160 * 2 * pulse2,
        height: 160 * 2 * pulse2,
        borderRadius: "50%",
        border: `1.5px dashed rgba(80,120,255,${glow2})`,
        transform: `rotate(${rot2}deg)`,
        boxSizing: "border-box",
        boxShadow: `0 0 ${7 * glow2}px rgba(60,100,255,${glow2 * 0.4})`,
      }} />

      {/* Ping ripple circles + dots */}
      <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0 }}>
        <circle cx={CX} cy={CY} r={230 * (1 + ping1 * 0.14)} fill="none"
          stroke={`rgba(80,130,255,${(1 - ping1) * 0.35})`} strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={160 * (1 + ping2 * 0.14)} fill="none"
          stroke={`rgba(80,130,255,${(1 - ping2) * 0.28})`} strokeWidth="1" />
        <RingDots radius={230} count={6} frame={frame} phaseOffset={0} />
        <RingDots radius={160} count={4} frame={frame} phaseOffset={2} />
      </svg>
    </AbsoluteFill>
  );
}

// --- Icon bubble: spring pop-up then gentle pulse ---
function IconBubble({ Icon, angle, orbitR, frame, index, fps, appearFrame }: {
  Icon: React.ElementType; angle: number; orbitR: number;
  frame: number; index: number; fps: number; appearFrame: number;
}) {
  const r = toRad(angle);
  const x = CX + orbitR * Math.cos(r);
  const y = CY + orbitR * Math.sin(r);

  const popScale = spring({
    frame: Math.max(0, frame - appearFrame),
    fps,
    config: { damping: 7, stiffness: 280, mass: 0.65 },
    from: 0,
    to: 1,
  });

  const hasPopped = frame > appearFrame + 15;
  const pulseMult = hasPopped ? 1 + 0.045 * Math.sin(frame * 0.07 + index * 1.2) : 1;
  const glowOpacity = hasPopped
    ? 0.3 + 0.22 * Math.sin(frame * 0.05 + index * 1.5)
    : 0.3 * popScale;

  const SIZE = 56;

  return (
    <div style={{
      position: "absolute",
      left: x - SIZE / 2,
      top: y - SIZE / 2,
      width: SIZE,
      height: SIZE,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #1e2a5e, #0d1230)",
      border: "1.5px solid rgba(100,130,255,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `scale(${popScale * pulseMult})`,
      boxShadow: `0 0 ${12 + 8 * glowOpacity}px rgba(80,120,255,${glowOpacity}), inset 0 1px 0 rgba(255,255,255,0.08)`,
    }}>
      <Icon size={22} color="#a0b4ff" strokeWidth={1.5} />
    </div>
  );
}

// --- Rocket SVG (no positioning, parent handles it) ---
function RocketSVG() {
  return (
    <svg viewBox="0 0 90 170" width={90} height={170}>
      <defs>
        <radialGradient id="rBodyGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#2a3260" />
          <stop offset="100%" stopColor="#0a0d1e" />
        </radialGradient>
        <radialGradient id="rNoseGrad" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#1e2860" />
          <stop offset="100%" stopColor="#060810" />
        </radialGradient>
        <radialGradient id="rWindowGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c0d4ff" />
          <stop offset="40%" stopColor="#6090e0" />
          <stop offset="100%" stopColor="#1030a0" />
        </radialGradient>
      </defs>
      <path d="M18 110 L2 148 L32 128 Z" fill="#10163a" />
      <path d="M72 110 L88 148 L58 128 Z" fill="#10163a" />
      <ellipse cx="45" cy="100" rx="28" ry="52" fill="url(#rBodyGrad)" />
      <path d="M45 10 C28 20, 17 50, 17 78 L73 78 C73 50, 62 20, 45 10 Z" fill="url(#rNoseGrad)" />
      <ellipse cx="38" cy="85" rx="6" ry="22" fill="rgba(255,255,255,0.06)" />
      <ellipse cx="39" cy="40" rx="4" ry="14" fill="rgba(255,255,255,0.07)" />
      <circle cx="45" cy="90" r="16" fill="#0a0f28" stroke="rgba(120,150,255,0.3)" strokeWidth="1.5" />
      <circle cx="45" cy="90" r="12" fill="url(#rWindowGrad)" />
      <ellipse cx="41" cy="86" rx="4" ry="5" fill="rgba(220,235,255,0.35)" />
      <rect x="35" y="148" width="20" height="8" rx="3" fill="#0d1230" />
    </svg>
  );
}

// --- Flame (anchored to rocket nozzle position) ---
function Flame({ nozzleY, frame, intensity }: { nozzleY: number; frame: number; intensity: number }) {
  const f1 = 0.85 + 0.15 * Math.sin(frame * 0.4);
  const f2 = 0.9 + 0.1 * Math.sin(frame * 0.6 + 1.2);
  const f3 = 0.92 + 0.08 * Math.sin(frame * 0.3 + 0.5);
  const base = nozzleY;

  return (
    <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="fCore" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="20%" stopColor="#a0c0ff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#3060ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0010a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fMid" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#6090ff" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#2040d0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000888" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fOuter" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#3050d0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000555" stopOpacity="0" />
        </radialGradient>
        <filter id="fBlur"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="fCBlur"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      <ellipse cx={CX} cy={base + 90 * intensity} rx={45 * f3 * intensity} ry={110 * intensity}
        fill="url(#fOuter)" filter="url(#fBlur)" />
      <ellipse cx={CX} cy={base + 60 * intensity} rx={28 * f2 * intensity} ry={80 * intensity}
        fill="url(#fMid)" filter="url(#fCBlur)" />
      <ellipse cx={CX} cy={base + 25 * intensity} rx={12 * f1 * intensity} ry={45 * intensity}
        fill="url(#fCore)" />
      <ellipse cx={CX} cy={base + 8} rx={5 * intensity} ry={14 * intensity}
        fill="rgba(255,255,255,0.9)" filter="url(#fCBlur)" />

      {[...Array(8)].map((_, i) => {
        const px = CX + (i - 3.5) * 6 * intensity + 3 * Math.sin(frame * 0.2 + i);
        const py = base + 80 * intensity + i * 15 + 10 * Math.sin(frame * 0.15 + i * 0.7);
        const op = (0.3 + 0.3 * Math.sin(frame * 0.2 + i * 1.3)) * f1;
        return <circle key={i} cx={px} cy={py} r={2 + Math.sin(i)} fill="#4070ff" opacity={op} filter="url(#fCBlur)" />;
      })}
    </svg>
  );
}

function CenterGlow({ frame }: { frame: number }) {
  const p = 0.85 + 0.15 * Math.sin(frame * 0.06);
  return (
    <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="cGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2040c0" stopOpacity={0.25 * p} />
          <stop offset="100%" stopColor="#0a1060" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={CX} cy={CY} rx={160 * p} ry={160 * p} fill="url(#cGlow)" />
    </svg>
  );
}

// --- Main composition ---
export const RocketAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [isHovered, setIsHovered] = useState(false);

  // Launch: spring from below screen to center
  const launchProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 75, mass: 1.2 },
    from: 0,
    to: 1,
  });

  const rocketStartY = H + 100;
  const rocketEndY = CY - 155;
  const launchedY = rocketStartY + (rocketEndY - rocketStartY) * launchProgress;

  // Gentle bob only after rocket has mostly settled
  const hoverBob = launchProgress > 0.92 ? 5 * Math.sin(frame * 0.06) : 0;
  const rocketTop = launchedY + hoverBob;

  // Hover effects
  const vibration = isHovered ? 2 * Math.sin(frame * 1.6) : 0;
  const flameIntensity = isHovered ? 1.7 : 1.0;

  // Nozzle Y = rocketTop + rocket height (170) - a few px to anchor flame
  const nozzleY = rocketTop + 155;

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 50% 60%, #0d1540 0%, #060a1e 50%, #020510 100%)",
      overflow: "hidden",
    }}>
      {/* Star field */}
      <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, opacity: 0.6 }}>
        {[...Array(60)].map((_, i) => {
          const sx = ((i * 137.5) % 1) * W;
          const sy = ((i * 97.3 + 23) % 1) * H;
          const baseOp = 0.2 + 0.6 * ((i * 0.618) % 1);
          const op = baseOp * (0.6 + 0.4 * Math.sin(frame * 0.04 + i * 0.5));
          return <circle key={i} cx={sx} cy={sy} r={1} fill="white" opacity={op} />;
        })}
      </svg>

      <CenterGlow frame={frame} />
      <OrbitalRings frame={frame} />

      {/* Flame behind rocket */}
      <Flame nozzleY={nozzleY} frame={frame} intensity={flameIntensity} />

      {/* Rocket with hover target */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          left: CX - 45 + vibration,
          top: rocketTop,
          width: 90,
          height: 170,
          cursor: "pointer",
        }}
      >
        <RocketSVG />
      </div>

      {/* Icon circles - staggered pop-up */}
      {ICON_CONFIG.map((cfg, i) => (
        <IconBubble
          key={cfg.label}
          Icon={cfg.Icon}
          angle={cfg.angle}
          orbitR={cfg.orbitR}
          frame={frame}
          index={i}
          fps={fps}
          appearFrame={cfg.appearFrame}
        />
      ))}
    </AbsoluteFill>
  );
};
