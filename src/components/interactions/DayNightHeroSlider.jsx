import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sunset, Sparkles, Play, Pause } from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

/**
 * @Interaction1 — Day-to-Night Hero Slider
 * Uses the three exact pixel-aligned 16:9 (1024x576) luxury living room photographs:
 *  - Daylight (0%):   /assets/reference/hero-scene-daylight.jpg
 *  - Golden Dusk (50%): /assets/reference/hero-scene-dusk.jpg
 *  - Night Scene (100%): /assets/reference/hero-scene-night.jpg
 * Includes smooth animated transitions, realistic lighting/curtain micro-animations,
 * interactive drag/slider controls, and an optional live auto-cycle mode.
 */
export default function DayNightHeroSlider() {
  // timeProgress: 0 = Daylight, 50 = Golden Dusk, 100 = Night Scene
  const [timeProgress, setTimeProgress] = useState(50);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const trackRef = useRef(null);
  const animFrameRef = useRef(null);
  const currentValRef = useRef(50);

  useEffect(() => {
    currentValRef.current = timeProgress;
  }, [timeProgress]);

  // Smooth animated transition when clicking preset buttons
  const animateToValue = (targetVal) => {
    setIsAutoPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const startVal = currentValRef.current;
    const diff = targetVal - startVal;
    if (Math.abs(diff) < 0.5) {
      setTimeProgress(targetVal);
      return;
    }

    const duration = 650; // ms smooth transition
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const nextVal = Math.round(startVal + diff * eased);
      setTimeProgress(nextVal);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  // Optional continuous live day-dusk-night breathing cycle
  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    let rafId;
    let direction = 1;
    let exactVal = currentValRef.current;

    const tick = () => {
      exactVal += direction * 0.22;
      if (exactVal >= 100) {
        exactVal = 100;
        direction = -1;
      } else if (exactVal <= 0) {
        exactVal = 0;
        direction = 1;
      }
      setTimeProgress(Math.round(exactVal));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Layer opacities for seamless 3-stage cross-dissolve
  // Base layer is Daylight (always opacity 1 underneath)
  // Dusk layer fades in from 0 -> 50, stays 1 underneath Night layer from 50 -> 100
  const duskOpacity = timeProgress <= 50 ? timeProgress / 50 : 1;
  // Night layer fades in from 50 -> 100
  const nightOpacity = timeProgress > 50 ? (timeProgress - 50) / 50 : 0;

  // Derived realistic lighting & drapery metrics
  const daylightBeamOpacity = Math.max(0, 1 - timeProgress / 42);
  const duskCoveGlow = 1 - Math.min(1, Math.abs(timeProgress - 50) / 48);
  const nightLampGlow = Math.max(0, (timeProgress - 35) / 65);
  const drapesClosedPct = Math.min(100, Math.round((timeProgress / 60) * 100));

  const isDay = timeProgress < 28;
  const isDusk = timeProgress >= 28 && timeProgress <= 72;
  const isNight = timeProgress > 72;

  const updateFromPointer = (clientX) => {
    if (!trackRef.current) return;
    setIsAutoPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    setTimeProgress(pct);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    updateFromPointer(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    updateFromPointer(e.touches[0].clientX);
  };

  const getModeLabel = () => {
    if (isDay) return 'Morning • Curtains Open • Natural Sunlight';
    if (isDusk) return 'Evening • Sheer Drapes • Warm Cove Glow';
    return 'Night • Sanctuary Dimming & Accent Glow';
  };

  const getLightingSummary = () => {
    if (isDay) return `Cove 40% • Drapes ${drapesClosedPct}%`;
    if (isDusk) return `Cove 85% • Drapes ${drapesClosedPct}%`;
    return `Lamp & Console 30% • Drapes 100%`;
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-charcoal-900 shadow-[0_25px_80px_rgba(0,0,0,0.8)] select-none">
      {/* 16:9 Full-Frame Realistic Living Room Stage (1024x576 exact aspect ratio) */}
      <div
        ref={trackRef}
        onMouseDown={(e) => updateFromPointer(e.clientX)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        style={{ aspectRatio: '1024 / 576' }}
        className="relative w-full overflow-hidden cursor-ew-resize bg-charcoal-950"
      >
        {/* PHOTO LAYER 1 (0% — DAYLIGHT SCENE) */}
        <img
          src="/assets/reference/hero-scene-daylight.jpg"
          alt="Daylight scene: Luxury Indian living room with open curtains and natural sunlight"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* PHOTO LAYER 2 (50% — GOLDEN DUSK SCENE) */}
        <img
          src="/assets/reference/hero-scene-dusk.jpg"
          alt="Golden dusk scene: Sheer curtains drawn with warm sunset and ceiling cove lighting"
          draggable={false}
          style={{ opacity: duskOpacity }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none will-change-[opacity]"
        />

        {/* PHOTO LAYER 3 (100% — NIGHT SANCTUARY SCENE) */}
        <img
          src="/assets/reference/hero-scene-night.jpg"
          alt="Night scene: Cosy ambient floor lamp and media console under-glow"
          draggable={false}
          style={{ opacity: nightOpacity }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none will-change-[opacity]"
        />

        {/* REALISTIC LIVE ATMOSPHERIC ANIMATION OVERLAYS */}
        {/* 1. Daylight Sunbeam Shimmer through Open Balcony Doors */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
          style={{
            opacity: daylightBeamOpacity * 0.45,
            background:
              'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(254, 249, 195, 0.45) 0%, rgba(253, 224, 71, 0.12) 55%, transparent 80%)',
          }}
        />

        {/* 2. Golden Dusk Ceiling Cove Warmth Pulse */}
        <div
          className="pointer-events-none absolute inset-x-[12%] top-[2%] h-[22%] rounded-full blur-2xl mix-blend-screen animate-pulse"
          style={{
            opacity: duskCoveGlow * 0.45,
            background:
              'linear-gradient(90deg, rgba(245,158,11,0.55) 0%, rgba(253,230,138,0.65) 50%, rgba(245,158,11,0.55) 100%)',
            animationDuration: '4s',
          }}
        />

        {/* 3. Arc Floor Lamp Breathing Halo (Left of Sofa — prominent in Dusk & Night) */}
        <div
          className="pointer-events-none absolute left-[21%] top-[28%] w-[20%] h-[32%] rounded-full blur-2xl mix-blend-screen animate-pulse"
          style={{
            opacity: 0.15 + nightLampGlow * 0.65,
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.75) 0%, rgba(217, 119, 6, 0.3) 55%, transparent 75%)',
            animationDuration: '3.2s',
          }}
        />

        {/* 4. Floating TV Console Under-Glow & Vertical Backlight Shimmer (Right Wall) */}
        <div
          className="pointer-events-none absolute right-[3%] bottom-[12%] w-[28%] h-[18%] -skew-y-6 rounded-full blur-xl mix-blend-screen"
          style={{
            opacity: 0.1 + nightLampGlow * 0.6,
            background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.65), rgba(251, 191, 36, 0.8))',
          }}
        />

        {/* 5. Subtle Live Automation Hotspots on Real Room Appliances */}
        {/* Split AC Hotspot (Below AC unit on left wall) */}
        <div className="pointer-events-none absolute left-[4%] top-[24%] hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-950/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-electric shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-electric animate-ping" />
          <span>{isDay ? 'AC 23°C Cool' : isDusk ? 'AC 24°C Eco' : 'AC 24.5°C Sleep'}</span>
        </div>

        {/* Motorized Curtain Track Hotspot (Center Window Pelmet) */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[10%] hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-950/75 backdrop-blur-md border border-amber-gold/30 text-[10px] font-mono text-amber-200 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-gold animate-pulse" />
          <span>
            {isDay
              ? 'Motorized Track: Open (100% Sunlight)'
              : isDusk
              ? 'Motorized Sheer Track: Drawn'
              : 'Blackout & Sheer Drapes: Closed'}
          </span>
        </div>

        {/* Top Telemetry Overlay Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-100 shadow-lg max-w-full min-w-0">
            <Sparkles className="w-3 h-3 text-amber-gold shrink-0" />
            <span className="truncate">{getModeLabel()}</span>
          </div>

          <div className="hidden sm:block px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-cyan-tech/30 text-[10px] font-mono text-cyan-electric shadow-lg shrink-0">
            {getLightingSummary()}
          </div>
        </div>

        {/* Bottom Subtle Gradient Vignette for Readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-charcoal-950/65 to-transparent" />
      </div>

      {/* Interactive Slider & Preset Control Bar */}
      <div className="p-4 sm:p-5 bg-charcoal-950/95 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <InteractiveCueBadge text="Click presets or slide to try live scene" accent="amber" />
          <span className="hidden sm:inline text-[11px] font-mono text-slate-400">
            Interactive Morning → Evening → Night Preview
          </span>
        </div>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Smooth Scrubbing Range Bar */}
          <div className="flex items-center gap-3 flex-1">
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'Pause live scene transition' : 'Play live scene transition'}
              title={isAutoPlaying ? 'Pause live transition' : 'Auto-play Morning → Evening → Night transition'}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                isAutoPlaying
                  ? 'bg-amber-gold text-charcoal-950 border-amber-gold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-amber-gold border-white/15'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <Sun className={`w-5 h-5 shrink-0 transition-colors ${isDay ? 'text-amber-gold' : 'text-slate-500'}`} />
            <div className="flex-1 flex items-center py-2">
              <label htmlFor="hero-day-night-range" className="sr-only">
                Slide smoothly between Morning, Evening, and Night
              </label>
              <input
                id="hero-day-night-range"
                type="range"
                min={0}
                max={100}
                value={timeProgress}
                onChange={(e) => {
                  setIsAutoPlaying(false);
                  if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
                  setTimeProgress(Number(e.target.value));
                }}
                className="w-full lumora-range rounded-full h-3"
              />
            </div>
            <Moon className={`w-5 h-5 shrink-0 transition-colors ${isNight ? 'text-cyan-electric' : 'text-slate-500'}`} />
          </div>

          {/* Scene Preset Buttons */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 justify-between sm:justify-end">
            {[
              { label: 'Morning', val: 0, icon: Sun, active: isDay },
              { label: 'Evening', val: 50, icon: Sunset, active: isDusk },
              { label: 'Night', val: 100, icon: Moon, active: isNight },
            ].map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => animateToValue(preset.val)}
                  className={`min-h-[42px] px-2 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 border transition-all min-w-0 ${
                    preset.active
                      ? 'bg-amber-gold/20 border-amber-gold text-amber-gold shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
