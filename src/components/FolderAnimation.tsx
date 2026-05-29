import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { FileText, Image } from "lucide-react";
import React, { useState } from "react";

const W = 800;
const H = 800;
const CX = W / 2;
const CARD_W = 200;
const CARD_H = 275;

// --- Folder geometry ---
const FL = 148;                // folder left
const FR = 652;                // folder right
const FB = 718;                // folder bottom
const FY = 452;                // folder opening (top of main body) — cards hidden below this
const TAB_TOP = 415;           // top of folder tab
const TAB_R = 298;             // right edge of tab (~30% of folder width)

// baseY  = resting position (less visible, lower in folder)
// hoverY = baseY - HOVER_LIFT (more visible on hover, matches previous settled look)
const HOVER_LIFT = 30;
// START_Y: deep enough inside folder that rotation doesn't leak above FY at frame 0
// Worst case: 14° rotation lifts corner by ~CARD_W/2 * sin(14°) ≈ 24px, so FY+40 is safe
const START_Y = FY + 40;

const CARDS = [
  { id: "designer", cx: 272, baseY: 288, rotate: -14, zIndex: 2, delay: 0,  bob: 0.4,  title: "Designer Brief"  },
  { id: "sprint",   cx: 524, baseY: 295, rotate:  12, zIndex: 3, delay: 6,  bob: 1.8,  title: "Sprint Plan"     },
  { id: "social",   cx: 398, baseY: 280, rotate:   2, zIndex: 4, delay: 11, bob: 1.1,  title: "Social Media"    },
  { id: "product",  cx: 464, baseY: 270, rotate:   8, zIndex: 5, delay: 16, bob: 0.75, title: "Product Launch"  },
  { id: "brand",    cx: 336, baseY: 260, rotate:  -9, zIndex: 6, delay: 21, bob: 0.1,  title: "Brand Campaign", showImage: true },
];

// --- Skeleton lines ---
function SkeletonLines({ widths }: { widths: number[] }) {
  return (
    <>
      {widths.map((w, i) => (
        <div key={i} style={{
          height: 6, borderRadius: 3,
          background: "rgba(80,100,200,0.22)",
          width: `${w}%`, marginBottom: 7,
        }} />
      ))}
    </>
  );
}

// --- Card content ---
function BriefContent({ title, showImage }: { title: string; showImage?: boolean }) {
  return (
    <div style={{ padding: "18px 16px", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
        <FileText size={13} color="#6878d0" strokeWidth={1.8} />
        <span style={{ color: "#6878cc", fontSize: 11.5, fontFamily: "system-ui, sans-serif" }}>
          Client Brief
        </span>
      </div>
      <div style={{
        color: "#ccd6ff", fontSize: 18, fontWeight: 700,
        fontFamily: "system-ui, sans-serif",
        marginBottom: 16, lineHeight: 1.2,
      }}>
        {title}
      </div>
      <SkeletonLines widths={[100, 86, 72, 90]} />
      <div style={{ color: "#7080bb", fontSize: 11, fontFamily: "system-ui, sans-serif", marginTop: 14, marginBottom: 9 }}>
        Objective
      </div>
      <SkeletonLines widths={[96, 80, 60]} />
      {showImage && (
        <div style={{
          marginTop: 14, height: 55, borderRadius: 8,
          background: "rgba(10,15,50,0.7)",
          border: "1px solid rgba(60,80,180,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Image size={22} color="#1a2880" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

// --- Document card: pure slide-up, no fade ---
function DocumentCard({ config, frame, fps }: { config: typeof CARDS[0]; frame: number; fps: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const relFrame = Math.max(0, frame - config.delay);

  // Pure position slide: starts at START_Y (safely inside folder, rotation-proof),
  // springs to baseY (resting). No opacity — stagger works because cards stay
  // hidden behind front face (zIndex < 9) until their top rises above FY.
  const slideOffset = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.0 },
    from: START_Y - config.baseY, // places card at START_Y at relFrame=0
    to: 0,
  });

  // Gentle float once fully settled
  const settled = slideOffset < 2;
  const bob = settled ? 4 * Math.sin(frame * 0.05 + config.bob) : 0;

  // Hover: lift HOVER_LIFT px to show more card — z stays below front face (9)
  const hoverLift = isHovered ? -HOVER_LIFT : 0;
  const finalTop = config.baseY + slideOffset + bob + hoverLift;

  const glowBase = 0.2 + 0.1 * Math.sin(frame * 0.06 + config.bob);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        left: config.cx - CARD_W / 2,
        top: finalTop,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 14,
        background: "linear-gradient(165deg, #141c62 0%, #0d1448 55%, #08103c 100%)",
        border: `1.5px solid rgba(${isHovered ? "130,160,255" : "80,110,255"},${isHovered ? 0.5 : glowBase * 0.6})`,
        boxShadow: `
          0 0 ${isHovered ? 30 : 12}px rgba(60,100,255,${isHovered ? 0.38 : glowBase * 0.28}),
          0 ${isHovered ? 14 : 4}px ${isHovered ? 30 : 14}px rgba(0,0,12,0.5),
          inset 0 1px 0 rgba(255,255,255,0.07)
        `,
        zIndex: config.zIndex, // always below front face (z=9) → stays inside folder
        cursor: "pointer",
        transform: `rotate(${config.rotate}deg)`,
        overflow: "hidden",
      }}
    >
      <BriefContent title={config.title} showImage={(config as any).showImage} />
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "45%",
        borderRadius: "14px 14px 0 0",
        background: "linear-gradient(180deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// --- Folder back wall (behind cards) ---
function FolderBack({ frame }: { frame: number }) {
  const glow = 0.3 + 0.15 * Math.sin(frame * 0.05);
  return (
    <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none" }}>
      <defs>
        <linearGradient id="fbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#131d6e" />
          <stop offset="100%" stopColor="#0a1258" />
        </linearGradient>
      </defs>
      {/* Back wall — taller than front, shows folder depth above opening */}
      <rect
        x={FL + 6} y={FY - 42}
        width={FR - FL - 12}
        height={FB - FY + 42}
        rx={20}
        fill="url(#fbGrad)"
        stroke={`rgba(65,95,225,${glow * 0.4})`}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// --- Folder front face: classic folder shape with tab ---
function FolderFront({ frame }: { frame: number }) {
  const glow = 0.45 + 0.22 * Math.sin(frame * 0.05);
  const iconPulse = 0.88 + 0.12 * Math.sin(frame * 0.07);
  const fh = FB - FY;
  const iconCY = FY + fh * 0.47;

  // Classic folder path (tab top-left + main body)
  // Clockwise from tab top-left corner:
  const path = [
    `M ${FL + 14} ${TAB_TOP}`,                                          // tab top, after corner
    `Q ${FL} ${TAB_TOP}, ${FL} ${TAB_TOP + 14}`,                        // tab top-left corner
    `L ${FL} ${FB - 22}`,                                               // left side (tab + body share edge)
    `Q ${FL} ${FB}, ${FL + 22} ${FB}`,                                  // bottom-left corner
    `L ${FR - 22} ${FB}`,                                               // bottom edge
    `Q ${FR} ${FB}, ${FR} ${FB - 22}`,                                  // bottom-right corner
    `L ${FR} ${FY + 22}`,                                               // right side going up
    `Q ${FR} ${FY}, ${FR - 22} ${FY}`,                                  // top-right corner of main body
    `L ${TAB_R + 20} ${FY}`,                                            // main body top → tab junction
    `C ${TAB_R + 4} ${FY}, ${TAB_R - 2} ${TAB_TOP + 24}, ${TAB_R - 10} ${TAB_TOP + 10}`, // shoulder curve
    `Q ${TAB_R - 20} ${TAB_TOP}, ${TAB_R - 34} ${TAB_TOP}`,            // tab top-right corner
    `L ${FL + 14} ${TAB_TOP}`,                                          // tab top back to start
    `Z`,
  ].join(" ");

  return (
    <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, zIndex: 9, pointerEvents: "none" }}>
      <defs>
        <linearGradient id="ffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e2ea6" />
          <stop offset="100%" stopColor="#101878" />
        </linearGradient>
        <radialGradient id="ffHaloGrad" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#3050e0" stopOpacity={glow * 0.6} />
          <stop offset="100%" stopColor="#0a1280" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="iconBtn" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#3355ff" />
          <stop offset="100%" stopColor="#1020cc" />
        </radialGradient>
        <filter id="ffHalo">
          <feGaussianBlur stdDeviation="18" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter id="softG">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
      </defs>

      {/* Glow halo behind folder */}
      <path
        d={path}
        fill="none"
        stroke={`rgba(70,110,255,${glow * 0.45})`}
        strokeWidth="22"
        filter="url(#ffHalo)"
      />

      {/* Folder body */}
      <path
        d={path}
        fill="url(#ffGrad)"
        stroke={`rgba(115,152,255,${glow * 0.7})`}
        strokeWidth="1.5"
      />

      {/* Inner edge highlight on main body top */}
      <line
        x1={TAB_R + 20} y1={FY + 1}
        x2={FR - 24} y2={FY + 1}
        stroke={`rgba(190,215,255,${glow * 0.25})`}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Icon button */}
      <circle
        cx={CX} cy={iconCY}
        r={38 * iconPulse}
        fill="url(#iconBtn)"
        stroke={`rgba(160,190,255,${0.42 + 0.18 * iconPulse})`}
        strokeWidth="1.5"
        filter="url(#softG)"
      />

      {/* Folder icon */}
      <g transform={`translate(${CX},${iconCY})`}>
        <path
          d="M -14 -10 L -5 -10 L -2 -14 L 14 -14 L 14 10 L -14 10 Z"
          fill="none"
          stroke="rgba(195,218,255,0.92)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// --- Background glow ---
function AmbientGlow({ frame }: { frame: number }) {
  const p = 0.7 + 0.3 * Math.sin(frame * 0.045);
  return (
    <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="ambG" cx="50%" cy="80%" r="55%">
          <stop offset="0%" stopColor="#1535c0" stopOpacity={0.22 * p} />
          <stop offset="100%" stopColor="#050a50" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={CX} cy={600} rx={300} ry={200} fill="url(#ambG)" />
    </svg>
  );
}

// --- Main ---
export const FolderAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: "#000000",
      overflow: "hidden",
    }}>
      {/* Stars */}
      <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, opacity: 0.5 }}>
        {[...Array(45)].map((_, i) => {
          const sx = ((i * 137.5) % 1) * W;
          const sy = ((i * 97.3 + 23) % 1) * (H * 0.5);
          const op = (0.15 + 0.45 * ((i * 0.618) % 1)) * (0.5 + 0.5 * Math.sin(frame * 0.04 + i * 0.6));
          return <circle key={i} cx={sx} cy={sy} r={1} fill="white" opacity={op} />;
        })}
      </svg>

      <AmbientGlow frame={frame} />
      <FolderBack frame={frame} />

      {/* Clip container: prevents card bottoms from leaking below the folder body */}
      <div style={{ position: "absolute", top: 0, left: 0, width: W, height: FB, overflow: "hidden" }}>
        {CARDS.map((cfg) => (
          <DocumentCard key={cfg.id} config={cfg} frame={frame} fps={fps} />
        ))}
      </div>

      <FolderFront frame={frame} />
    </AbsoluteFill>
  );
};
