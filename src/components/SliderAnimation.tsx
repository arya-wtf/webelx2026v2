import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ChevronsLeftRight } from "lucide-react";
import React from "react";

const W = 800;
const H = 800;

// Panel container dimensions (centered in 800x800 canvas)
const PW = 760;  // panel width
const PH = 500;  // panel height
const PX = (W - PW) / 2; // 20
const PY = (H - PH) / 2; // 150

// --- Syntax highlighting color tokens ---
const C = {
  keyword:    "#c792ea",
  tag:        "#f07178",
  attr:       "#ffcb6b",
  string:     "#c3e88d",
  comment:    "#546e7a",
  fn:         "#82aaff",
  var:        "#eeffff",
  punct:      "#89ddff",
  num:        "#f78c6c",
  plain:      "#d4d4d4",
  type:       "#ffcb6b",
};

type Token = { text: string; color: string };

function tok(text: string, color: string): Token {
  return { text, color };
}

// JSX React component lines - array of token arrays
const CODE_LINES: Token[][] = [
  [tok("import", C.keyword), tok(" React ", C.plain), tok("from", C.keyword), tok(" 'react'", C.string), tok(";", C.punct)],
  [tok("import", C.keyword), tok(" { useState } ", C.plain), tok("from", C.keyword), tok(" 'react'", C.string), tok(";", C.punct)],
  [],
  [tok("interface", C.keyword), tok(" HeroProps ", C.plain), tok("{", C.punct)],
  [tok("  title", C.attr), tok(": ", C.punct), tok("string", C.type), tok(";", C.punct)],
  [tok("  subtitle", C.attr), tok(": ", C.punct), tok("string", C.type), tok(";", C.punct)],
  [tok("  ctaLabel", C.attr), tok(": ", C.punct), tok("string", C.type), tok(";", C.punct)],
  [tok("}", C.punct)],
  [],
  [tok("export ", C.keyword), tok("const ", C.keyword), tok("HeroSection", C.fn), tok(": React.FC", C.type), tok("<", C.punct), tok("HeroProps", C.type), tok(">", C.punct), tok(" = ({", C.punct)],
  [tok("  title", C.attr), tok(", subtitle, ctaLabel", C.plain), tok(",", C.punct)],
  [tok("}) ", C.punct), tok("=> {", C.punct)],
  [tok("  const ", C.keyword), tok("[hovered, setHovered] = useState", C.fn), tok("(", C.punct), tok("false", C.num), tok(");", C.punct)],
  [],
  [tok("  return ", C.keyword), tok("(", C.punct)],
  [tok("    <", C.tag), tok("section", C.fn), tok(" className", C.attr), tok("=", C.punct), tok('"hero-wrapper"', C.string), tok(">", C.tag)],
  [tok("      <", C.tag), tok("div", C.fn), tok(" className", C.attr), tok("=", C.punct), tok('"container"', C.string), tok(">", C.tag)],
  [tok("        <", C.tag), tok("h1", C.fn), tok(" className", C.attr), tok("=", C.punct), tok('"hero-title"', C.string), tok(">", C.tag)],
  [tok("          {title}", C.plain)],
  [tok("        </", C.tag), tok("h1", C.fn), tok(">", C.tag)],
  [tok("        <", C.tag), tok("p", C.fn), tok(" className", C.attr), tok("=", C.punct), tok('"hero-sub"', C.string), tok(">", C.tag), tok("{subtitle}", C.plain), tok("</", C.tag), tok("p", C.fn), tok(">", C.tag)],
  [tok("        <", C.tag), tok("button", C.fn)],
  [tok("          onMouseEnter", C.attr), tok("={() => ", C.plain), tok("setHovered", C.fn), tok("(", C.punct), tok("true", C.num), tok(")}", C.punct)],
  [tok("          onMouseLeave", C.attr), tok("={() => ", C.plain), tok("setHovered", C.fn), tok("(", C.punct), tok("false", C.num), tok(")}", C.punct)],
  [tok("          className", C.attr), tok("={hovered ? ", C.plain), tok('"btn-active"', C.string), tok(" : ", C.plain), tok('"btn"', C.string), tok("}", C.punct)],
  [tok("        >", C.tag)],
  [tok("          {ctaLabel}", C.plain)],
  [tok("        </", C.tag), tok("button", C.fn), tok(">", C.tag)],
  [tok("      </", C.tag), tok("div", C.fn), tok(">", C.tag)],
  [tok("    </", C.tag), tok("section", C.fn), tok(">", C.tag)],
  [tok("  );", C.punct)],
  [tok("};", C.punct)],
];

// --- VSCode Panel (right side) ---
// clipLeft: pixels hidden from the left edge → panel content visible on the RIGHT
function VSCodePanel({ frame, clipLeft }: { frame: number; clipLeft: number }) {
  // Animated active line: scrolls through lines over time
  const totalLines = CODE_LINES.length;
  const activeLine = Math.floor((frame / 180) * (totalLines - 6)) + 3;
  // Scroll offset so active line stays visible
  const scrollOffset = Math.max(0, activeLine - 12) * 19;

  // Blinking cursor
  const cursorVisible = Math.floor(frame / 18) % 2 === 0;

  return (
    <div style={{
      position: "absolute",
      left: 0, top: 0,
      width: PW, height: PH,
      clipPath: `inset(0 0 0 ${clipLeft}px)`,
      background: "#1e1e2e",
      borderRadius: 12,
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Title bar */}
      <div style={{
        height: 32, background: "#181825",
        display: "flex", alignItems: "center",
        padding: "0 12px", gap: 6,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Traffic lights */}
        {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
        <div style={{ flex: 1 }} />
        {/* File tabs */}
        {["HeroSection.tsx", "index.ts"].map((name, i) => (
          <div key={i} style={{
            padding: "0 12px", height: 32, display: "flex", alignItems: "center",
            background: i === 0 ? "#1e1e2e" : "transparent",
            borderTop: i === 0 ? "1px solid #7c6af7" : "none",
            color: i === 0 ? "#e0e0e0" : "#666",
            fontSize: 11, fontFamily: "system-ui, sans-serif",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{ color: i === 0 ? "#a3be8c" : "#666", marginRight: 5, fontSize: 10 }}>⬡</span>
            {name}
          </div>
        ))}
        <div style={{ flex: 1 }} />
      </div>

      {/* Editor body — offset right so code is visible in right half of screen */}
      <div style={{ display: "flex", height: PH - 32, paddingLeft: 210 }}>
        {/* Activity bar */}
        <div style={{
          width: 30, background: "#181825",
          display: "flex", flexDirection: "column",
          alignItems: "center", paddingTop: 8, gap: 14,
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}>
          {["◫","⊞","⚙","⊕"].map((icon, i) => (
            <div key={i} style={{ color: i === 0 ? "#7c6af7" : "#444", fontSize: 14 }}>{icon}</div>
          ))}
        </div>

        {/* Line numbers */}
        <div style={{
          width: 34, padding: "8px 0", textAlign: "right",
          fontFamily: "'Menlo', 'Monaco', monospace", fontSize: 12,
          color: "#4a4a6a", lineHeight: "19px",
          userSelect: "none", overflow: "hidden",
          transform: `translateY(${-scrollOffset}px)`,
        }}>
          {CODE_LINES.map((_, i) => (
            <div key={i} style={{
              paddingRight: 8,
              color: i === activeLine ? "#7c7caa" : "#3a3a5a",
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code area */}
        <div style={{
          flex: 1, padding: "8px 0", overflow: "hidden", position: "relative",
        }}>
          <div style={{ transform: `translateY(${-scrollOffset}px)` }}>
            {CODE_LINES.map((tokens, lineIdx) => {
              const isActive = lineIdx === activeLine;
              return (
                <div key={lineIdx} style={{
                  height: 19, lineHeight: "19px", paddingLeft: 8,
                  background: isActive ? "rgba(124,106,247,0.12)" : "transparent",
                  display: "flex", alignItems: "center",
                  fontFamily: "'Menlo', 'Monaco', monospace", fontSize: 12,
                  whiteSpace: "nowrap",
                }}>
                  {tokens.map((t, ti) => (
                    <span key={ti} style={{ color: t.color }}>{t.text}</span>
                  ))}
                  {/* Blinking cursor on active line (at end) */}
                  {isActive && cursorVisible && (
                    <span style={{
                      display: "inline-block", width: 2, height: 14,
                      background: "#a0a0ff", marginLeft: 1, verticalAlign: "middle",
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 18, background: "#7c6af7",
        display: "flex", alignItems: "center", padding: "0 10px",
        gap: 12,
      }}>
        {["⎇ main","TypeScript 5.4","Ln 1, Col 1","UTF-8"].map((t, i) => (
          <span key={i} style={{ color: "rgba(255,255,255,0.85)", fontSize: 9.5, fontFamily: "system-ui, sans-serif" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// --- Ease helpers ---
function eio(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

// --- Figma Panel (left side) ---
// clipRight: pixels hidden from the right edge → panel content visible on the LEFT
function FigmaPanel({ frame, clipRight }: { frame: number; clipRight: number }) {
  // Artboard dimensions (canvas coords)
  const ABW = 340, ABH = 380;
  const ABX = 110, ABY = 28;

  // ── Draw + resize animation ──────────────────────────────────────────────
  // Phase timing (over 180 frame loop)
  //  0 → 30  : cursor idles near hero, moves to draw start
  // 30 → 90  : cursor drags to draw a new rectangle
  // 90 → 120 : cursor lifts, moves to bottom-right resize handle
  //120 → 165 : cursor drags to resize the shape
  //165 → 180 : shape stays selected, cursor rests

  const IDLE   = { x: ABX + 170, y: ABY + 130 }; // near hero
  const FROM   = { x: ABX + 30,  y: ABY + 308 }; // draw start (below cards)
  const TO     = { x: ABX + 195, y: ABY + 355 }; // draw end
  const RESIZE = { x: ABX + 255, y: ABY + 374 }; // resize corner target

  let cx = IDLE.x, cy = IDLE.y;
  let rectX = 0, rectY = 0, rectW = 0, rectH = 0;
  let showRect = false;
  let showHandles = false;

  if (frame < 30) {
    // Move cursor from idle to draw start
    const t = eio(frame / 30);
    cx = lerpN(IDLE.x, FROM.x, t);
    cy = lerpN(IDLE.y, FROM.y, t);
  } else if (frame < 90) {
    // Drag to draw rectangle
    const t = eio((frame - 30) / 60);
    cx = lerpN(FROM.x, TO.x, t);
    cy = lerpN(FROM.y, TO.y, t);
    rectX = FROM.x - ABX; rectY = FROM.y - ABY;
    rectW = cx - FROM.x;  rectH = cy - FROM.y;
    showRect = true;
  } else if (frame < 120) {
    // Lift and move cursor to resize handle (bottom-right corner)
    const t = eio((frame - 90) / 30);
    cx = lerpN(TO.x, TO.x + 2, t); // slight jiggle to corner
    cy = lerpN(TO.y, TO.y + 2, t);
    rectX = FROM.x - ABX; rectY = FROM.y - ABY;
    rectW = TO.x - FROM.x; rectH = TO.y - FROM.y;
    showRect = true; showHandles = true;
  } else if (frame < 165) {
    // Drag resize corner
    const t = eio((frame - 120) / 45);
    cx = lerpN(TO.x, RESIZE.x, t);
    cy = lerpN(TO.y, RESIZE.y, t);
    rectX = FROM.x - ABX; rectY = FROM.y - ABY;
    rectW = cx - FROM.x;  rectH = cy - FROM.y;
    showRect = true; showHandles = true;
  } else {
    // Hold selected state
    cx = RESIZE.x; cy = RESIZE.y;
    rectX = FROM.x - ABX; rectY = FROM.y - ABY;
    rectW = RESIZE.x - FROM.x; rectH = RESIZE.y - FROM.y;
    showRect = true; showHandles = true;
  }

  // Which layer is "selected" in layers panel
  const layerSelected = frame >= 30 ? "New Shape" : "";
  const cursorVisible = Math.floor(frame / 10) % 5 !== 4; // brief disappear

  return (
    <div style={{
      position: "absolute",
      left: 0, top: 0,
      width: PW, height: PH,
      clipPath: `inset(0 ${clipRight}px 0 0)`,
      background: "#1a1a2e",
      borderRadius: 12,
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Figma title bar */}
      <div style={{
        height: 36, background: "#111120",
        display: "flex", alignItems: "center", gap: 8,
        padding: "0 12px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
        <div style={{ flex: 1 }} />
        {/* Figma icon placeholder */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["▲","□","○","✦"].map((icon, i) => (
            <div key={i} style={{
              color: i === 1 ? "#a855f7" : "#666", fontSize: 14,
              background: i === 1 ? "rgba(168,85,247,0.15)" : "transparent",
              borderRadius: 4, padding: "2px 6px",
            }}>{icon}</div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{
          background: "#7c3aed", borderRadius: 6,
          padding: "3px 10px", color: "white",
          fontSize: 11, fontFamily: "system-ui, sans-serif",
        }}>Share</div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", height: PH - 36 }}>
        {/* Left toolbar */}
        <div style={{
          width: 38, background: "#111120",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex", flexDirection: "column",
          alignItems: "center", paddingTop: 10, gap: 10,
        }}>
          {["⊹","□","○","✎","T","—"].map((icon, i) => (
            <div key={i} style={{
              color: i === 1 ? "#a855f7" : "#444",
              fontSize: 16, cursor: "pointer",
              background: i === 1 ? "rgba(168,85,247,0.15)" : "transparent",
              borderRadius: 4, padding: 3, width: 26, height: 26,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{icon}</div>
          ))}
        </div>

        {/* Canvas area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Dot grid */}
          <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(100,100,180,0.18)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* Artboard */}
          <div style={{
            position: "absolute",
            left: ABX, top: ABY,
            width: ABW, height: ABH,
            background: "#f9f9ff",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}>
            {/* Navbar */}
            <div style={{
              height: 52, background: "#0f172a",
              display: "flex", alignItems: "center", padding: "0 16px", gap: 12,
            }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: "#6d28d9" }} />
              <div style={{ color: "white", fontSize: 11, fontWeight: 700, fontFamily: "system-ui" }}>Acme</div>
              <div style={{ flex: 1 }} />
              {["Features","Pricing","Docs"].map((t, i) => (
                <div key={i} style={{ color: "#94a3b8", fontSize: 9.5, fontFamily: "system-ui" }}>{t}</div>
              ))}
              <div style={{
                background: "#6d28d9", borderRadius: 4,
                padding: "4px 10px", color: "white",
                fontSize: 9, fontFamily: "system-ui",
              }}>Get Started</div>
            </div>

            {/* Hero */}
            <div style={{ padding: "18px 20px 12px" }}>
              <div style={{
                fontSize: 17, fontWeight: 800, color: "#0f172a",
                fontFamily: "system-ui", lineHeight: 1.2, marginBottom: 6,
              }}>Build faster<br/>with components</div>
              <div style={{ fontSize: 9.5, color: "#64748b", fontFamily: "system-ui", marginBottom: 12, lineHeight: 1.5 }}>
                Production-ready UI blocks for<br/>modern web applications.
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{
                  background: "#6d28d9", borderRadius: 5, padding: "6px 14px",
                  color: "white", fontSize: 9, fontFamily: "system-ui", fontWeight: 600,
                }}>Start free</div>
                <div style={{
                  border: "1px solid #d1d5db", borderRadius: 5, padding: "6px 14px",
                  color: "#374151", fontSize: 9, fontFamily: "system-ui",
                }}>View docs →</div>
              </div>
            </div>

            {/* Cards row */}
            <div style={{ padding: "0 20px", display: "flex", gap: 10 }}>
              {[
                { label: "Components", num: "240+", color: "#6d28d9" },
                { label: "Templates",  num: "40+",  color: "#0891b2" },
                { label: "Themes",     num: "12",   color: "#059669" },
              ].map((card, i) => (
                <div key={i} style={{
                  flex: 1, background: "white",
                  border: "1px solid #e5e7eb", borderRadius: 6,
                  padding: "10px 8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: card.color, marginBottom: 5 }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", fontFamily: "system-ui" }}>{card.num}</div>
                  <div style={{ fontSize: 8.5, color: "#6b7280", fontFamily: "system-ui" }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom strip */}
            <div style={{ padding: "12px 20px 0" }}>
              <div style={{ height: 8, borderRadius: 4, background: "#e5e7eb", marginBottom: 5 }} />
              <div style={{ height: 8, borderRadius: 4, background: "#f1f5f9", width: "70%" }} />
            </div>
          </div>

          {/* Artboard label */}
          <div style={{
            position: "absolute",
            left: ABX, top: ABY - 16,
            color: "#6060aa", fontSize: 10,
            fontFamily: "system-ui, sans-serif",
          }}>Landing Page</div>

          {/* Drawn shape (rectangle being added) */}
          {showRect && rectW > 0 && rectH > 0 && (
            <div style={{
              position: "absolute",
              left: ABX + rectX,
              top: ABY + rectY,
              width: rectW,
              height: rectH,
              background: "rgba(109,40,217,0.13)",
              border: `1.5px solid ${showHandles ? "#a855f7" : "#7c3aed"}`,
              borderRadius: 2,
              pointerEvents: "none",
            }}>
              {/* Corner + edge handles (shown after drawing) */}
              {showHandles && [[0,0],[1,0],[0,1],[1,1]].map(([hx,hy], i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: hx === 0 ? -3 : "calc(100% - 3px)",
                  top:  hy === 0 ? -3 : "calc(100% - 3px)",
                  width: 6, height: 6,
                  background: "white", border: "1.5px solid #a855f7",
                  borderRadius: 1,
                }} />
              ))}
            </div>
          )}

          {/* Cursor */}
          {cursorVisible && (
            <div style={{
              position: "absolute",
              left: cx - 4,
              top:  cy - 3,
              width: 14, height: 18,
              pointerEvents: "none",
              zIndex: 10,
            }}>
              {/* Crosshair cursor when drawing, arrow otherwise */}
              {frame >= 30 && frame < 90 ? (
                <svg viewBox="0 0 14 14" width={14} height={14}>
                  <line x1="7" y1="1" x2="7" y2="13" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5"/>
                  <line x1="1" y1="7" x2="13" y2="7" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5"/>
                  <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="0.8"/>
                  <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="0.8"/>
                </svg>
              ) : (
                <svg viewBox="0 0 12 16" width={12} height={16}>
                  <path d="M0 0 L0 12 L3.5 8.5 L6.5 14 L8 13.5 L5 8 L9 8 Z"
                    fill="white" stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" />
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Right panel: Layers */}
        <div style={{
          width: 80, background: "#111120",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          padding: "8px 0", overflow: "hidden",
        }}>
          <div style={{ color: "#555", fontSize: 10, fontFamily: "system-ui", padding: "0 10px 8px" }}>Layers</div>
          {[
            { indent: 0, label: "Landing Page", icon: "⊞" },
            { indent: 1, label: "Navbar",        icon: "□" },
            { indent: 1, label: "Hero",          icon: "□" },
            { indent: 2, label: "Headline",      icon: "T" },
            { indent: 2, label: "CTA",           icon: "□" },
            { indent: 1, label: "Cards",         icon: "□" },
            { indent: 2, label: "Card 1",        icon: "□" },
            { indent: 2, label: "Card 2",        icon: "□" },
            { indent: 2, label: "Card 3",        icon: "□" },
            { indent: 1, label: "New Shape",     icon: "□" },
          ].map((layer, i) => {
            const isSelected = layer.label === layerSelected;
            const isNew = layer.label === "New Shape";
            // New Shape layer only appears once drawing starts
            if (isNew && frame < 35) return null;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center",
                height: 20, paddingLeft: 6 + layer.indent * 8,
                background: isSelected ? "rgba(168,85,247,0.2)" : "transparent",
                gap: 4,
              }}>
                <span style={{ color: isNew ? "#a855f7" : "#444", fontSize: 9 }}>{layer.icon}</span>
                <span style={{
                  color: isSelected ? "#c084fc" : isNew ? "#9060dd" : "#555",
                  fontSize: 9, fontFamily: "system-ui",
                  whiteSpace: "nowrap", overflow: "hidden",
                  textOverflow: "ellipsis", maxWidth: 52,
                }}>{layer.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Divider line + handle (purely visual, auto-animated) ---
function DividerHandle({ x, frame }: { x: number; frame: number }) {
  const glow = 0.5 + 0.5 * Math.sin(frame * 0.08);
  const lineOpacity = 0.55 + 0.25 * glow;
  const glowSpread = 8 + 6 * glow;
  const glowOpacity = 0.35 + 0.2 * glow;

  return (
    <>
      {/* Glow line */}
      <div style={{
        position: "absolute",
        left: PX + x - 1,
        top: PY,
        width: 2,
        height: PH,
        background: `rgba(168,120,255,${lineOpacity})`,
        boxShadow: `0 0 ${glowSpread}px rgba(140,80,255,${glowOpacity})`,
        pointerEvents: "none",
        borderRadius: 1,
      }} />

      {/* Handle circle */}
      <div style={{
        position: "absolute",
        left: PX + x - 18,
        top: PY + PH / 2 - 18,
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #3b2a7a, #1a1040)",
        border: `1.5px solid rgba(168,120,255,${0.5 + 0.3 * glow})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `
          0 0 ${glowSpread}px rgba(140,80,255,${glowOpacity}),
          inset 0 1px 0 rgba(255,255,255,0.08)
        `,
        pointerEvents: "none",
        zIndex: 20,
      }}>
        <ChevronsLeftRight size={16} color="#9070cc" strokeWidth={1.8} />
      </div>
    </>
  );
}

// --- Main ---
export const SliderAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  // Auto-slide: center (0.5) → right (0.82) → center (0.5) over 180 frames
  // Using cosine so it eases naturally at both ends
  const divPos = 0.5 + 0.32 * (1 - Math.cos(frame * Math.PI / 90)) / 2;
  //   frame  0 → 0.5   (center)
  //   frame 90 → 0.82  (right, showing mostly design)
  //   frame 180 → 0.5  (center again, seamless loop)

  const divX = divPos * PW;
  const figmaClipRight = PW - divX;
  const vscodeClipLeft = divX;

  // Entrance: panels slide up and fade in over first 15 frames
  const entranceProgress = Math.min(frame / 15, 1);
  const entranceY = (1 - entranceProgress) * 24;

  // Ambient glow pulse
  const ambientGlow = 0.15 + 0.08 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden" }}>
      {/* Stars */}
      <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, opacity: 0.4 }}>
        {[...Array(40)].map((_, i) => {
          const sx = ((i * 137.5) % 1) * W;
          const sy = ((i * 97.3 + 23) % 1) * H;
          const op = (0.1 + 0.4 * ((i * 0.618) % 1)) * (0.5 + 0.5 * Math.sin(frame * 0.04 + i * 0.6));
          return <circle key={i} cx={sx} cy={sy} r={1} fill="white" opacity={op} />;
        })}
      </svg>

      {/* Ambient glow */}
      <svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <defs>
          <radialGradient id="sliderAmb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5020c0" stopOpacity={ambientGlow} />
            <stop offset="100%" stopColor="#050510" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={W / 2} cy={H / 2} rx={360} ry={260} fill="url(#sliderAmb)" />
      </svg>

      {/* Panel container */}
      <div style={{
        position: "absolute",
        left: PX,
        top: PY + entranceY,
        width: PW,
        height: PH,
        borderRadius: 12,
        overflow: "hidden",
        opacity: entranceProgress,
        boxShadow: `
          0 0 60px rgba(100,60,220,${0.25 + ambientGlow}),
          0 24px 80px rgba(0,0,0,0.7)
        `,
      }}>
        {/* Figma panel (left side) */}
        <FigmaPanel frame={frame} clipRight={figmaClipRight} />

        {/* VSCode panel (right side) */}
        <VSCodePanel frame={frame} clipLeft={vscodeClipLeft} />
      </div>

      {/* Divider (outside clip container so glow isn't clipped) */}
      <div style={{ position: "absolute", top: PY + entranceY, left: 0, opacity: entranceProgress }}>
        <DividerHandle x={divX} frame={frame} />
      </div>

      {/* Corner label badges */}
      <div style={{
        position: "absolute",
        left: PX + 10, top: PY + 10,
        padding: "3px 8px",
        background: "rgba(20,10,50,0.75)",
        border: "1px solid rgba(168,85,247,0.4)",
        borderRadius: 4,
        color: "#c084fc",
        fontSize: 10,
        fontFamily: "system-ui, sans-serif",
        opacity: entranceProgress,
        pointerEvents: "none",
      }}>
        Design
      </div>
      <div style={{
        position: "absolute",
        right: PX + 10, top: PY + 10,
        padding: "3px 8px",
        background: "rgba(20,10,50,0.75)",
        border: "1px solid rgba(124,106,247,0.4)",
        borderRadius: 4,
        color: "#a78bfa",
        fontSize: 10,
        fontFamily: "system-ui, sans-serif",
        opacity: entranceProgress,
        pointerEvents: "none",
      }}>
        Code
      </div>
    </AbsoluteFill>
  );
};
