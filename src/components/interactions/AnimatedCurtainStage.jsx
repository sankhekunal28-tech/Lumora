import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Renders the 16:9 (1024x576) luxury living room with physically accurate center-parting
 * horizontal curtain animations for both the Sheer layer and the Blackout layer.
 *
 * Window span in the 1024x576 photography:
 * Left curtain stack edge: ~21.5%
 * Right curtain stack edge: ~78.5%
 * Center meeting point: 50%
 *
 * @param {number} sheerClosedPct - 0 (fully open) to 100 (fully closed). 50 = 50% open / 50% closed.
 * @param {number} blackoutClosedPct - 0 (fully open) to 100 (fully closed).
 */
export function RealisticCurtainRoom({
  sheerClosedPct = 0,
  blackoutClosedPct = 0,
  showBadge = true,
  badgeText = '',
  className = '',
}) {
  // Map 0..100% closure to the physical window span [21.5% .. 50%] on left and [50% .. 78.5%] on right
  const leftStackEdge = 21.5;
  const rightStackEdge = 78.5;
  const halfSpan = (rightStackEdge - leftStackEdge) / 2; // 28.5%

  // Left panel right-most edge (from 0% to 50% of image width)
  const sheerLeftEdge =
    sheerClosedPct <= 0 ? 0 : leftStackEdge + (sheerClosedPct / 100) * halfSpan;
  // Right panel left-most edge (from 100% down to 50% of image width)
  const sheerRightEdge =
    sheerClosedPct <= 0 ? 100 : rightStackEdge - (sheerClosedPct / 100) * halfSpan;

  const blackoutLeftEdge =
    blackoutClosedPct <= 0 ? 0 : leftStackEdge + (blackoutClosedPct / 100) * halfSpan;
  const blackoutRightEdge =
    blackoutClosedPct <= 0 ? 100 : rightStackEdge - (blackoutClosedPct / 100) * halfSpan;

  return (
    <div
      style={{ aspectRatio: '16 / 9' }}
      className={`relative w-full overflow-hidden bg-charcoal-950 select-none ${className}`}
    >
      {/* BASE LAYER: Curtains 100% Open (City Dusk Skyline Visible) */}
      <img
        src="/assets/reference/curtain-open.jpg"
        alt="Luxury living room with motorized curtains open"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* LAYER 2A: SHEER CURTAIN — LEFT PANEL GLIDING TOWARD CENTER */}
      {sheerClosedPct > 0 && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            clipPath: `inset(0 ${100 - sheerLeftEdge}% 0 0)`,
          }}
        >
          <img
            src="/assets/reference/curtain-sheer-closed.jpg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* LAYER 2B: SHEER CURTAIN — RIGHT PANEL GLIDING TOWARD CENTER */}
      {sheerClosedPct > 0 && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            clipPath: `inset(0 0 0 ${sheerRightEdge}%)`,
          }}
        >
          <img
            src="/assets/reference/curtain-sheer-closed.jpg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Subtle Leading Hem Highlight when Sheer is partially open (e.g. 50%) */}
      {sheerClosedPct > 2 && sheerClosedPct < 98 && (
        <>
          <div
            className="pointer-events-none absolute top-[23%] bottom-[31%] w-[2px] bg-amber-100/40 shadow-[0_0_8px_rgba(255,255,255,0.35)]"
            style={{ left: `${sheerLeftEdge}%` }}
          />
          <div
            className="pointer-events-none absolute top-[23%] bottom-[31%] w-[2px] bg-amber-100/40 shadow-[0_0_8px_rgba(255,255,255,0.35)]"
            style={{ left: `${sheerRightEdge}%` }}
          />
        </>
      )}

      {/* LAYER 3A: BLACKOUT CURTAIN — LEFT PANEL GLIDING TOWARD CENTER */}
      {blackoutClosedPct > 0 && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            clipPath: `inset(0 ${100 - blackoutLeftEdge}% 0 0)`,
          }}
        >
          <img
            src="/assets/reference/curtain-blackout-closed.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* LAYER 3B: BLACKOUT CURTAIN — RIGHT PANEL GLIDING TOWARD CENTER */}
      {blackoutClosedPct > 0 && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            clipPath: `inset(0 0 0 ${blackoutRightEdge}%)`,
          }}
        >
          <img
            src="/assets/reference/curtain-blackout-closed.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Subtle Leading Hem Shadow when Blackout is in motion / partially open */}
      {blackoutClosedPct > 2 && blackoutClosedPct < 98 && (
        <>
          <div
            className="pointer-events-none absolute top-[23%] bottom-[31%] w-[3px] bg-black/50 shadow-[0_0_12px_rgba(0,0,0,0.8)]"
            style={{ left: `${blackoutLeftEdge}%` }}
          />
          <div
            className="pointer-events-none absolute top-[23%] bottom-[31%] w-[3px] bg-black/50 shadow-[0_0_12px_rgba(0,0,0,0.8)]"
            style={{ left: `${blackoutRightEdge}%` }}
          />
        </>
      )}

      {/* Optional Live Status Pill */}
      {showBadge && badgeText && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-amber-gold/40 text-[10px] sm:text-[11px] font-mono text-amber-200 flex items-center gap-1.5 whitespace-nowrap shadow-lg">
          <Sparkles className="w-3 h-3 text-amber-gold shrink-0" />
          <span>{badgeText}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Self-running animated preview used on the Smart Curtain Motors Card and Hero.
 * Smoothly loops through:
 *  1. Open Curtains (0s - 1.8s)
 *  2. Sheer Curtains Gliding to 50% Open (1.8s - 3.6s)
 *  3. Sheer Curtains Fully Closed (3.6s - 5.6s)
 *  4. Both Sheer + Blackout Curtains Gliding Closed (5.6s - 8.0s)
 *  5. Gliding Back Open (8.0s - 9.8s)
 */
export default function AnimatedCurtainPreview({ compactBadge = false }) {
  const [sheerPct, setSheerPct] = useState(0);
  const [blackoutPct, setBlackoutPct] = useState(0);
  const [stageLabel, setStageLabel] = useState('Curtains 100% Open');

  useEffect(() => {
    let rafId;
    const cycleDuration = 10000; // 10 seconds full loop
    const start = performance.now();

    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const tick = (now) => {
      const elapsed = (now - start) % cycleDuration;

      if (elapsed < 1500) {
        // Stage 1: Fully Open
        setSheerPct(0);
        setBlackoutPct(0);
        setStageLabel('1/4 • Curtains Open');
      } else if (elapsed < 3000) {
        // Glide Sheer from 0% -> 50%
        const t = easeInOut((elapsed - 1500) / 1500);
        setSheerPct(Math.round(t * 50));
        setBlackoutPct(0);
        setStageLabel('2/4 • Sheer 50% Open');
      } else if (elapsed < 4200) {
        // Hold at Sheer 50% Open briefly, then glide to 100%
        const t = easeInOut(Math.max(0, (elapsed - 3400) / 800));
        setSheerPct(Math.round(50 + t * 50));
        setBlackoutPct(0);
        setStageLabel(elapsed < 3500 ? '2/4 • Sheer 50% Open' : '3/4 • Sheer Curtains Closed');
      } else if (elapsed < 5600) {
        // Hold Sheer 100% Closed
        setSheerPct(100);
        setBlackoutPct(0);
        setStageLabel('3/4 • Sheer Curtains Closed');
      } else if (elapsed < 7200) {
        // Glide Blackout from 0% -> 100% over the closed Sheers
        const t = easeInOut((elapsed - 5600) / 1600);
        setSheerPct(100);
        setBlackoutPct(Math.round(t * 100));
        setStageLabel('4/4 • Sheer + Blackout Closed');
      } else if (elapsed < 8600) {
        // Hold Both Closed
        setSheerPct(100);
        setBlackoutPct(100);
        setStageLabel('4/4 • Sheer + Blackout Closed');
      } else {
        // Glide Both Back Open (100% -> 0%)
        const t = easeInOut((elapsed - 8600) / 1400);
        const rem = Math.round((1 - t) * 100);
        setSheerPct(rem);
        setBlackoutPct(rem);
        setStageLabel('Gliding Open • Silent Motor');
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <RealisticCurtainRoom
      sheerClosedPct={sheerPct}
      blackoutClosedPct={blackoutPct}
      showBadge
      badgeText={compactBadge ? stageLabel : `${stageLabel} • Invisible Silent Track`}
    />
  );
}
