import React, { useState, useRef, useEffect } from 'react';
import { Gauge, VolumeX, Play, Pause, EyeOff, Sliders } from 'lucide-react';
import { RealisticCurtainRoom } from './AnimatedCurtainStage';
import InteractiveCueBadge from './InteractiveCueBadge';

/**
 * @Interaction4 — Curtain Motor Drag & Dual-Track Demo
 * Uses the three aligned 16:9 (1024x576) living room photographs to animate:
 *  1. Open Curtains
 *  2. Sheer Curtains Partially Open (e.g. 50% Open) or Fully Closed
 *  3. Both Sheer & Blackout Curtains Closed
 * Includes smooth animated transitions, dual sliders for custom percentage control,
 * and the required "Smoothly driving 65 kg" live caption.
 */
export default function CurtainMotorDemo() {
  // sheerOpenPct: 100 = Fully Open, 50 = 50% Open, 0 = Sheer Closed
  // blackoutOpenPct: 100 = Fully Open, 0 = Blackout Closed
  const [sheerOpenPct, setSheerOpenPct] = useState(50);
  const [blackoutOpenPct, setBlackoutOpenPct] = useState(100);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  const stageRef = useRef(null);
  const animRef = useRef(null);
  const currentRef = useRef({ sheer: 50, blackout: 100 });

  useEffect(() => {
    currentRef.current = { sheer: sheerOpenPct, blackout: blackoutOpenPct };
  }, [sheerOpenPct, blackoutOpenPct]);

  // Smoothly animate both tracks to any target open percentage
  const animateTracksTo = (targetSheerOpen, targetBlackoutOpen) => {
    setIsAutoCycling(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const startSheer = currentRef.current.sheer;
    const startBlackout = currentRef.current.blackout;
    const diffSheer = targetSheerOpen - startSheer;
    const diffBlackout = targetBlackoutOpen - startBlackout;

    const duration = 700;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      setSheerOpenPct(Math.round(startSheer + diffSheer * eased));
      setBlackoutOpenPct(Math.round(startBlackout + diffBlackout * eased));

      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
  };

  // Continuous automated transition cycle (Open -> Sheer 50% -> Sheer Closed -> Sheer + Blackout Closed)
  useEffect(() => {
    if (!isAutoCycling) return undefined;
    let rafId;
    const cycleMs = 11000;
    const start = performance.now();
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const tick = (now) => {
      const elapsed = (now - start) % cycleMs;

      if (elapsed < 1800) {
        // 1. Both Open (100% Open)
        setSheerOpenPct(100);
        setBlackoutOpenPct(100);
      } else if (elapsed < 3400) {
        // Glide Sheer to 50% Open
        const p = ease((elapsed - 1800) / 1600);
        setSheerOpenPct(Math.round(100 - p * 50));
        setBlackoutOpenPct(100);
      } else if (elapsed < 4800) {
        // Hold at 50% Sheer Open, then glide Sheer to 0% Open (Fully Closed)
        const p = ease(Math.max(0, (elapsed - 3900) / 900));
        setSheerOpenPct(Math.round(50 - p * 50));
        setBlackoutOpenPct(100);
      } else if (elapsed < 6400) {
        // Hold Sheer Closed (0% Open), Blackout Open (100% Open)
        setSheerOpenPct(0);
        setBlackoutOpenPct(100);
      } else if (elapsed < 8000) {
        // Glide Blackout from 100% Open -> 0% Open (Both Closed)
        const p = ease((elapsed - 6400) / 1600);
        setSheerOpenPct(0);
        setBlackoutOpenPct(Math.round(100 - p * 100));
      } else if (elapsed < 9500) {
        // Hold Both Closed
        setSheerOpenPct(0);
        setBlackoutOpenPct(0);
      } else {
        // Glide Both Back Open
        const p = ease((elapsed - 9500) / 1500);
        const openVal = Math.round(p * 100);
        setSheerOpenPct(openVal);
        setBlackoutOpenPct(openVal);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoCycling]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Dragging across the window stage scrubs through the full 2-track sequence
  const handleStageDrag = (clientX) => {
    if (!stageRef.current) return;
    setIsAutoCycling(false);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const rect = stageRef.current.getBoundingClientRect();
    const relX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    // 0.0 -> Both Open; 0.5 -> Sheer Closed; 1.0 -> Both Sheer & Blackout Closed
    if (relX <= 0.5) {
      const sheerClose = Math.round((relX / 0.5) * 100);
      setSheerOpenPct(100 - sheerClose);
      setBlackoutOpenPct(100);
    } else {
      const blackoutClose = Math.round(((relX - 0.5) / 0.5) * 100);
      setSheerOpenPct(0);
      setBlackoutOpenPct(100 - blackoutClose);
    }
  };

  const sheerClosedPct = 100 - sheerOpenPct;
  const blackoutClosedPct = 100 - blackoutOpenPct;

  const getCurrentStateDescription = () => {
    if (blackoutOpenPct === 0) {
      return 'Both Sheer & Blackout Closed (100% Privacy & Darkening)';
    }
    if (blackoutOpenPct < 100) {
      return `Sheer Closed • Blackout ${blackoutOpenPct}% Open`;
    }
    if (sheerOpenPct === 100) {
      return 'Curtains 100% Open (Unobstructed Skyline View)';
    }
    if (sheerOpenPct === 0) {
      return 'Sheer Curtains Closed • Blackout Open (Soft Filtered Daylight)';
    }
    return `Sheer Curtains ${sheerOpenPct}% Open • Precision Custom Position`;
  };

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl">
      {/* Header & Required Motor Strength Caption */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-gold">
              Interactive Dual-Track Curtain Simulator
            </span>
            <InteractiveCueBadge text="Drag stage or click presets to try" accent="amber" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            Invisible, Whisper-Silent Motors With Exact Percentage Control
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Concealed completely out of sight inside your false ceiling pelmet. Stop your sheer or blackout curtains at any exact opening — like <strong className="text-white">50% Sheer Open</strong> for balanced daylight, <strong className="text-white">100% Sheer Closed</strong> for daytime privacy, or <strong className="text-white">Both Closed</strong> for total sleep darkness.
          </p>
        </div>

        {/* Required live motor strength caption */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-gold/15 border border-amber-gold/40 text-amber-gold text-xs sm:text-sm font-semibold shrink-0 self-start lg:self-center">
          <Gauge className="w-4 h-4 shrink-0" />
          <span>Smoothly driving 65 kg • Invisible &amp; Silent (&lt; 30 dB)</span>
        </div>
      </div>

      {/* Interactive 16:9 Living Room Curtain Stage */}
      <div
        ref={stageRef}
        onMouseDown={(e) => handleStageDrag(e.clientX)}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleStageDrag(e.clientX);
        }}
        onTouchStart={(e) => {
          if (e.touches && e.touches[0]) handleStageDrag(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) handleStageDrag(e.touches[0].clientX);
        }}
        className="relative rounded-2xl overflow-hidden border-2 border-white/15 cursor-ew-resize shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        <RealisticCurtainRoom
          sheerClosedPct={sheerClosedPct}
          blackoutClosedPct={blackoutClosedPct}
          showBadge={false}
        />

        {/* Top Telemetry Bar inside Room Stage */}
        <div className="pointer-events-none absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg">
            <EyeOff className="w-3.5 h-3.5 text-amber-gold shrink-0" />
            <span>{getCurrentStateDescription()}</span>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-cyan-tech/30 text-[11px] font-mono text-cyan-electric flex items-center gap-2 shadow-lg">
            <VolumeX className="w-3.5 h-3.5 shrink-0" />
            <span>
              Sheer: {sheerOpenPct}% Open • Blackout: {blackoutOpenPct}% Open
            </span>
          </div>
        </div>

        {/* Bottom Required Live Strength Pill */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-amber-gold/40 text-xs font-mono text-amber-200 whitespace-nowrap shadow-lg">
          Smoothly driving 65 kg • Concealed Ceiling Track
        </div>
      </div>

      {/* Controls: One-Tap Scene Presets + Independent Sheer & Blackout Percentage Sliders */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: 4 Stage Preset Buttons + Auto-Play Toggle */}
        <div className="lg:col-span-7 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAutoCycling((prev) => !prev)}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
              isAutoCycling
                ? 'bg-cyan-tech/20 border-cyan-electric text-cyan-electric shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-300'
            }`}
          >
            {isAutoCycling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoCycling ? 'Pause Live Animation' : 'Play Live Animation'}</span>
          </button>

          {[
            {
              label: '1. Curtains Open (100%)',
              sheer: 100,
              blackout: 100,
              active: sheerOpenPct === 100 && blackoutOpenPct === 100,
            },
            {
              label: '2. Sheer 50% Open',
              sheer: 50,
              blackout: 100,
              active: sheerOpenPct === 50 && blackoutOpenPct === 100,
            },
            {
              label: '3. Sheer Closed',
              sheer: 0,
              blackout: 100,
              active: sheerOpenPct === 0 && blackoutOpenPct === 100,
            },
            {
              label: '4. Sheer + Blackout Closed',
              sheer: 0,
              blackout: 0,
              active: blackoutOpenPct === 0,
            },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => animateTracksTo(preset.sheer, preset.blackout)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                preset.active
                  ? 'bg-amber-gold text-charcoal-950 border-amber-gold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-charcoal-950 text-slate-200 border-white/10 hover:border-white/25'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Right: Independent Percentage Sliders for Sheer & Blackout */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-charcoal-950 border border-white/10 space-y-3.5">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-amber-gold" />
            <span>Custom Percentage Adjustment (0% – 100%)</span>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Sheer Curtain Opening</span>
              <span className="font-mono text-amber-gold font-bold">{sheerOpenPct}% Open</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sheerOpenPct}
              aria-label="Sheer curtain opening percentage"
              onChange={(e) => {
                setIsAutoCycling(false);
                if (animRef.current) cancelAnimationFrame(animRef.current);
                setSheerOpenPct(Number(e.target.value));
              }}
              className="w-full lumora-range bg-white/15 rounded-full h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Blackout Curtain Opening</span>
              <span className="font-mono text-cyan-electric font-bold">{blackoutOpenPct}% Open</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={blackoutOpenPct}
              aria-label="Blackout curtain opening percentage"
              onChange={(e) => {
                setIsAutoCycling(false);
                if (animRef.current) cancelAnimationFrame(animRef.current);
                const val = Number(e.target.value);
                setBlackoutOpenPct(val);
              }}
              className="w-full lumora-range bg-white/15 rounded-full h-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
