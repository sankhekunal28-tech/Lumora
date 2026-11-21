import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Activity, Sun, Moon } from 'lucide-react';

/**
 * AnimatedSensorStage
 * Renders the luxury marble bathroom with a ceiling-mounted Human Presence Sensor.
 * Animates the real-time transition from:
 *   1. Bathroom in Dark (Unoccupied Standby — `sensor-bathroom-dark.jpg`)
 *   2. Person Enters & Ceiling Sensor Detects Human Presence (mmWave radar beam sweeps down)
 *   3. Bathroom Ready (All warm cove, mirror, shower niche & vanity lights turn on — `sensor-bathroom-active.jpg`)
 */
export function AnimatedSensorStage({
  isOccupied = true,
  isDetecting = false,
  ambienceMode = 'spa', // 'spa' | 'morning' | 'night'
  compact = false,
  showBadges = true,
  durationSeconds = 137,
}) {
  // Format MM:SS:FF or HH:MM:SS for live presence counter
  const mins = String(Math.floor(durationSeconds / 60)).padStart(2, '0');
  const secs = String(durationSeconds % 60).padStart(2, '0');

  // Ambience colour tint overlays for customising the bathroom mood once lights are on
  const ambienceFilterStyle =
    !isOccupied
      ? 'brightness(0.95)'
      : ambienceMode === 'morning'
      ? 'brightness(1.08) saturate(0.92) hue-rotate(-8deg)'
      : ambienceMode === 'night'
      ? 'brightness(0.62) contrast(1.08) saturate(1.15)'
      : 'brightness(1.03) saturate(1.05)';

  return (
    <div
      style={compact ? undefined : { aspectRatio: '895 / 1024' }}
      className={`relative w-full overflow-hidden select-none bg-charcoal-950 ${
        compact ? 'h-full flex items-center justify-center' : ''
      }`}
    >
      <style>{`
        @keyframes sensorRadarConePulse {
          0%, 100% { opacity: 0.45; transform: scaleX(0.98); }
          50% { opacity: 0.85; transform: scaleX(1.03); }
        }
        @keyframes sensorRadarSweepLine {
          0% { top: 6%; opacity: 0; transform: translateX(-50%) scaleX(0.18); }
          15% { opacity: 0.95; }
          85% { opacity: 0.85; }
          100% { top: 90%; opacity: 0; transform: translateX(-50%) scaleX(1.05); }
        }
        @keyframes sensorFloorRipple {
          0% { transform: translate(-50%, -50%) scale(0.72); opacity: 0.85; }
          70% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.35; }
          100% { transform: translate(-50%, -50%) scale(1.22); opacity: 0; }
        }
        @keyframes sensorCoveWarmGlow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.72; }
        }
        @keyframes sensorStandbyBlink {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes sensorHudPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(34, 211, 238, 0.25); }
          50% { box-shadow: 0 0 32px rgba(34, 211, 238, 0.55); }
        }
      `}</style>

      {/* Ambient Blurred Backdrop for 16:9 Card/Hero Containers — Cross-fades Dark <-> Lit */}
      {compact && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/assets/reference/sensor-bathroom-dark.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110 opacity-65"
          />
          <img
            src="/assets/reference/sensor-bathroom-active.jpg"
            alt=""
            aria-hidden="true"
            style={{
              opacity: isOccupied ? 0.65 : 0,
              transition: 'opacity 950ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110"
          />
        </div>
      )}

      {/* Exact 895:1024 Coordinate Stage so Dark & Active Bathroom Images Align 1:1 Without Cropping */}
      <div
        style={compact ? { aspectRatio: '895 / 1024' } : undefined}
        className={
          compact
            ? 'relative z-10 h-full w-auto max-w-full overflow-hidden shadow-[0_0_45px_rgba(0,0,0,0.85)]'
            : 'relative w-full h-full'
        }
      >
        {/* LAYER 1: DARK BATHROOM BASE IMAGE (Unoccupied State) */}
        <img
          src="/assets/reference/sensor-bathroom-dark.jpg"
          alt="Luxury marble bathroom in darkness before human presence is detected"
          className="w-full h-full object-cover object-center block"
          draggable={false}
        />

        {/* LAYER 2: ACTIVE BATHROOM IMAGE (Person Enters + Radar Cone + All Lights On) */}
        <img
          src="/assets/reference/sensor-bathroom-active.jpg"
          alt="Lumora ceiling presence sensor detecting human presence and turning on all bathroom ambience lights"
          style={{
            opacity: isOccupied ? 1 : 0,
            filter: ambienceFilterStyle,
            transition:
              'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms ease-out',
          }}
          className="
            absolute inset-0 w-full h-full object-cover object-center block
          "
          draggable={false}
        />

        {/* ===================================================================== */}
        {/* LAYER 3: LIVE ANIMATED SENSOR & LIGHTING OVERLAYS                     */}
        {/* ===================================================================== */}

        {/* 3A. Ceiling Presence Sensor Puck Indicator (Top Center: x=50%, y=4.8%) */}
        <div
          style={{
            left: '50%',
            top: '4.8%',
            transform: 'translate(-50%, -50%)',
          }}
          className="pointer-events-none absolute z-20 flex items-center justify-center"
        >
          {/* Standby Radar Ring when room is dark */}
          {!isOccupied && (
            <>
              <span
                style={{ animation: 'sensorStandbyBlink 2.2s ease-in-out infinite' }}
                className="w-3 h-3 rounded-full bg-cyan-electric/80 shadow-[0_0_14px_rgba(34,211,238,0.95)]"
              />
              <span className="absolute w-10 h-5 rounded-full border border-cyan-electric/40 animate-ping" />
            </>
          )}

          {/* Active Ceiling Sensor Ring ripples when occupied */}
          {isOccupied && (
            <>
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-electric shadow-[0_0_18px_#22D3EE]" />
              <span
                style={{ animation: 'sensorFloorRipple 2.4s ease-out infinite' }}
                className="absolute w-20 h-8 rounded-full border border-cyan-electric/60"
              />
              <span
                style={{ animation: 'sensorFloorRipple 2.4s ease-out 1.2s infinite' }}
                className="absolute w-28 h-11 rounded-full border border-cyan-electric/40"
              />
            </>
          )}
        </div>

        {/* 3B. Animated Downward mmWave Radar Scan Sweep & Cone Shimmer */}
        <div
          style={{
            opacity: isOccupied || isDetecting ? 1 : 0,
            transition: 'opacity 500ms ease-out',
          }}
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        >
          {/* Conical Radar Shimmer matching the sensor beam */}
          <div
            style={{
              left: '21%',
              top: '5.2%',
              width: '46%',
              height: '85%',
              clipPath: 'polygon(63% 0%, 100% 100%, 0% 100%)',
              background:
                'linear-gradient(180deg, rgba(34,211,238,0.32) 0%, rgba(34,211,238,0.10) 55%, rgba(34,211,238,0.22) 100%)',
              animation: 'sensorRadarConePulse 3s ease-in-out infinite',
            }}
            className="absolute"
          />

          {/* Travelling Horizontal Radar Scan Arc sweeping from ceiling sensor to floor */}
          <div
            style={{
              left: '44%',
              width: '38%',
              height: '3%',
              borderRadius: '9999px',
              background:
                'radial-gradient(ellipse at center, rgba(165,243,252,0.85) 0%, rgba(34,211,238,0.45) 50%, transparent 80%)',
              boxShadow: '0 0 20px rgba(34,211,238,0.75)',
              animation: 'sensorRadarSweepLine 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
            className="absolute"
          />
        </div>

        {/* 3C. Animated Floor Target Rings around Person on Bath Mat (x=42.5%, y=90.2%) */}
        <div
          style={{
            left: '42.5%',
            top: '90.2%',
            width: '42%',
            height: '9%',
            opacity: isOccupied ? 1 : 0,
            transition: 'opacity 700ms ease-out 200ms',
          }}
          className="pointer-events-none absolute z-10"
        >
          <div
            style={{ animation: 'sensorFloorRipple 2.8s ease-out infinite' }}
            className="absolute left-1/2 top-1/2 w-full h-full rounded-full border-2 border-cyan-electric/70 shadow-[0_0_22px_rgba(34,211,238,0.6)]"
          />
          <div
            style={{ animation: 'sensorFloorRipple 2.8s ease-out 1.4s infinite' }}
            className="absolute left-1/2 top-1/2 w-4/5 h-4/5 rounded-full border border-cyan-300/60"
          />
        </div>

        {/* 3D. Warm Architectural Lighting Bloom (Ceiling Cove, Vanity Mirror, Under-Cabinet) */}
        <div
          style={{
            opacity: isOccupied ? (ambienceMode === 'night' ? 0.35 : 0.85) : 0,
            transition: 'opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          {/* Warm Ceiling Cove Glow */}
          <div
            style={{
              left: '12%',
              top: '0%',
              width: '76%',
              height: '16%',
              background:
                ambienceMode === 'morning'
                  ? 'radial-gradient(ellipse at center, rgba(254,249,195,0.28) 0%, transparent 75%)'
                  : 'radial-gradient(ellipse at center, rgba(245,158,11,0.28) 0%, transparent 75%)',
              animation: 'sensorCoveWarmGlow 3.6s ease-in-out infinite',
            }}
            className="absolute"
          />

          {/* Backlit Round Mirror Halo (Right Wall) */}
          <div
            style={{
              right: '-4%',
              top: '20%',
              width: '16%',
              height: '35%',
              background:
                'radial-gradient(ellipse at center, rgba(251,191,36,0.34) 0%, transparent 70%)',
              animation: 'sensorCoveWarmGlow 3.2s ease-in-out 0.6s infinite',
            }}
            className="absolute"
          />

          {/* Under-Vanity & Floor Marble Warm Reflection */}
          <div
            style={{
              right: '0%',
              bottom: '6%',
              width: '38%',
              height: '28%',
              background:
                'radial-gradient(ellipse at center, rgba(245,158,11,0.30) 0%, transparent 75%)',
              animation: 'sensorCoveWarmGlow 4s ease-in-out 1.1s infinite',
            }}
            className="absolute"
          />
        </div>

        {/* 3E. Live HUD Telemetry Pulse Overlay (Matches the HUD box at right: x=65%..96%, y=14%..39%) */}
        {isOccupied && (
          <div
            style={{
              left: '65.2%',
              top: '14.1%',
              width: '30.6%',
              height: '25.0%',
              animation: 'sensorHudPulse 3s ease-in-out infinite',
            }}
            className="pointer-events-none absolute z-20 rounded-xl border border-cyan-electric/45"
          >
            {/* Live pulsing dot over the green checkmark */}
            <span
              style={{ right: '6.5%', top: '12.5%' }}
              className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"
            />
            {/* Live ticking overlay for Presence Duration if not compact */}
            {!compact && (
              <div
                style={{ left: '53%', bottom: '5.5%' }}
                className="absolute px-1.5 py-0.5 rounded bg-charcoal-950/90 text-[10px] sm:text-xs font-mono font-bold text-cyan-electric tracking-wider"
              >
                00:{mins}:{secs}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* LAYER 4: STATUS BADGES (TOP & BOTTOM)                                 */}
        {/* ===================================================================== */}
        {showBadges && !compact && (
          <>
            {/* Top-Left Live Sensor State Pill */}
            <div className="pointer-events-none absolute top-3.5 left-3.5 z-30 flex flex-wrap items-center gap-2">
              <div
                className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors duration-500 ${
                  isOccupied
                    ? 'bg-charcoal-950/90 border-amber-gold/50 text-amber-gold'
                    : 'bg-charcoal-950/90 border-cyan-electric/40 text-cyan-electric'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOccupied ? 'bg-amber-gold animate-ping' : 'bg-cyan-electric animate-pulse'
                  }`}
                />
                <span>
                  {isOccupied
                    ? 'PRESENCE DETECTED • BATHROOM AMBIENCE READY'
                    : 'BATHROOM IN DARK • RADAR STANDBY'}
                </span>
              </div>
            </div>

            {/* Bottom Live Lighting & Sensor Readout Bar */}
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-charcoal-950/90 border border-white/15 backdrop-blur-md text-[11px] font-mono">
              <div className="flex items-center gap-2 text-slate-200">
                {isOccupied ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-gold shrink-0" />
                    <span>
                      Lights: <strong className="text-amber-gold">ON (Cove + Mirror + Vanity)</strong>
                    </span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Lights: <strong className="text-slate-400">0% OFF (Waiting for Entry)</strong>
                    </span>
                  </>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-cyan-electric">
                <Activity className="w-3.5 h-3.5" />
                <span>{isOccupied ? 'Heartbeat & Micro-Motion Locked (72 bpm)' : '24GHz mmWave Scanning'}</span>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Compact Badge for Homepage & Solutions Hub Card / Sub-page Hero */}
      {compact && (
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap">
          <div
            className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all duration-500 ${
              isOccupied
                ? 'bg-charcoal-950/90 border-amber-gold/50 text-amber-gold'
                : 'bg-charcoal-950/90 border-cyan-electric/45 text-cyan-electric'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOccupied ? 'bg-amber-gold animate-pulse' : 'bg-cyan-electric'
              }`}
            />
            <span>
              {isOccupied
                ? 'Presence Detected • All Lights ON'
                : 'Bathroom Dark • Waiting for Entry'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * AnimatedSensorPreview
 * Self-running animated preview used on the Homepage card, Solutions Hub card, and Smart Sensors Hero.
 * Automatically transitions between:
 *   - Dark Bathroom (Unoccupied Standby)
 *   - Person Enters -> Sensor Detects -> All Bathroom Lights Turn On for Desired Ambience
 */
export default function AnimatedSensorPreview({ compact = false }) {
  const [isOccupied, setIsOccupied] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOccupied((prev) => !prev);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return <AnimatedSensorStage isOccupied={isOccupied} compact={compact} showBadges={!compact} />;
}
