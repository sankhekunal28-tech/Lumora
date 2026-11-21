import React, { useState, useEffect } from 'react';
import { Wind, Snowflake, Power, Sparkles } from 'lucide-react';

/**
 * Renders the luxury living room climate control photograph (957x1024) with realistic
 * animated overlays showing:
 *  1. Split AC starting up: LED status readout on unit + animated cool airflow streamlines
 *     and mist particles blowing into the room.
 *  2. Ceiling Fan operating: 3D perspective-matched rotating fan blades on the ceiling +
 *     downward breeze rings, synchronized with the spinning fan icon on the phone screen.
 */
export function RealisticClimateRoom({
  acOn = true,
  acTemp = 22,
  fanOn = true,
  fanSpeed = 3, // 1 to 5
  statusText = '',
  compact = false,
  onToggleAc,
  onToggleFan,
  onChangeTemp,
  onChangeFanSpeed,
}) {
  // Calculate CSS spin duration from fanSpeed (1 = slowest 1.8s, 5 = fastest 0.38s)
  const spinDurationSeconds = fanOn && fanSpeed > 0 ? Math.max(0.35, 1.9 - fanSpeed * 0.3) : 0;
  // AC airflow intensity based on temperature (cooler = stronger cyan mist)
  const airflowIntensity = acOn ? Math.min(1, Math.max(0.35, (28 - acTemp) / 10)) : 0;

  return (
    <div
      style={{ aspectRatio: '957 / 1024' }}
      className="relative w-full h-full overflow-hidden bg-charcoal-950 select-none"
    >
      {/* Keyframes for realistic AC airflow waves, mist drift, and 3D ceiling fan rotation */}
      <style>{`
        @keyframes lumoraAcWave {
          0% {
            stroke-dashoffset: 160;
            opacity: 0;
          }
          25% {
            opacity: 0.9;
          }
          75% {
            opacity: 0.75;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
        @keyframes lumoraMistDrift {
          0% {
            transform: translate3d(0px, 0px, 0px) scale(0.92);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(18px, 12px, 0px) scale(1.06);
            opacity: 0.75;
          }
          100% {
            transform: translate3d(38px, 24px, 0px) scale(1.15);
            opacity: 0;
          }
        }
        @keyframes lumoraCeilingFanSpin {
          from {
            transform: rotateX(74deg) rotateY(-4deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(74deg) rotateY(-4deg) rotateZ(360deg);
          }
        }
        @keyframes lumoraPhoneFanSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes lumoraBreezePulse {
          0% {
            transform: translate(-50%, -50%) scale(0.75);
            opacity: 0.65;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.45);
            opacity: 0;
          }
        }
      `}</style>

      {/* BASE HIGH-RES ROOM + PHONE PHOTOGRAPH */}
      <img
        src="/assets/reference/climate-control-room.webp"
        alt="Lumora Smart Climate Control — Split AC and Ceiling Fan controlled via smartphone app"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* =====================================================================
          1. SPLIT AC ANIMATION (Upper-Left Wall: x=7%..26%, y=11%..24%)
         ===================================================================== */}
      {/* Glowing Digital Temperature Display on AC Unit Chassis */}
      <div
        className={`pointer-events-none absolute left-[21.5%] top-[18.2%] px-1.5 py-0.5 rounded bg-charcoal-950/80 border transition-all duration-500 ${
          acOn
            ? 'border-cyan-electric/70 opacity-100 shadow-[0_0_12px_#22D3EE]'
            : 'border-white/10 opacity-30'
        }`}
      >
        <span className="block text-[9px] sm:text-[10px] font-mono font-bold text-cyan-electric leading-none">
          {acOn ? `${acTemp}°C` : 'OFF'}
        </span>
      </div>

      {/* Animated Cool Mist Cloud & Streamlines Issuing from AC Louver */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: acOn ? airflowIntensity : 0 }}
      >
        {/* Soft Cool Mist Plume */}
        <div
          className="absolute left-[10%] top-[18%] w-[34%] h-[20%] rounded-full blur-xl mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(56, 189, 248, 0.65) 0%, rgba(34, 211, 238, 0.28) 50%, transparent 80%)',
            animation: acOn ? 'lumoraMistDrift 2.6s ease-out infinite' : 'none',
          }}
        />
        <div
          className="absolute left-[13%] top-[20%] w-[36%] h-[22%] rounded-full blur-2xl mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse at 25% 25%, rgba(186, 230, 253, 0.55) 0%, rgba(56, 189, 248, 0.22) 55%, transparent 80%)',
            animation: acOn ? 'lumoraMistDrift 2.6s ease-out 1.3s infinite' : 'none',
          }}
        />

        {/* Animated SVG Airflow Streamlines */}
        <svg viewBox="0 0 957 1024" className="w-full h-full mix-blend-screen">
          <defs>
            <linearGradient id="acStreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[
            { d: 'M 105 188 Q 210 250 375 295', delay: '0s', width: 3.5 },
            { d: 'M 135 202 Q 245 275 415 330', delay: '0.45s', width: 3 },
            { d: 'M 170 215 Q 275 295 445 365', delay: '0.9s', width: 2.5 },
            { d: 'M 200 226 Q 305 310 470 390', delay: '1.35s', width: 2.5 },
          ].map((stream, idx) => (
            <path
              key={idx}
              d={stream.d}
              fill="none"
              stroke="url(#acStreamGrad)"
              strokeWidth={stream.width}
              strokeLinecap="round"
              strokeDasharray="55 105"
              style={{
                animation: acOn ? `lumoraAcWave 1.8s linear ${stream.delay} infinite` : 'none',
              }}
            />
          ))}
        </svg>
      </div>

      {/* =====================================================================
          2. CEILING FAN ANIMATION (Top Center Ceiling: hub at x=56.6%, y=10.3%)
         ===================================================================== */}
      <div
        className="pointer-events-none absolute left-[36.5%] top-[2.2%] w-[40%] h-[16%] flex items-center justify-center"
        style={{
          perspective: '500px',
          opacity: fanOn && fanSpeed > 0 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* 3D Perspective-Tilted Spinning Blade Disc */}
        <div
          className="w-full aspect-square rounded-full relative flex items-center justify-center"
          style={{
            animation:
              fanOn && fanSpeed > 0
                ? `lumoraCeilingFanSpin ${spinDurationSeconds}s linear infinite`
                : 'none',
          }}
        >
          {/* 3 Swept Aerodynamic Motion-Blur Blades + Cool Air Swirl */}
          {[0, 120, 240].map((deg) => (
            <div
              key={deg}
              className="absolute inset-0 rounded-full"
              style={{
                transform: `rotate(${deg}deg)`,
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(45, 32, 22, 0.55) 18deg, rgba(56, 189, 248, 0.32) 34deg, transparent 55deg)',
              }}
            />
          ))}
          {/* Center Motor Hub Ring */}
          <div className="w-[14%] h-[14%] rounded-full bg-amber-950/90 border-2 border-cyan-electric/60 shadow-[0_0_15px_#22D3EE]" />
        </div>

        {/* Downward Cool Breeze Vortex Rings below Ceiling Fan */}
        <div
          className="absolute left-[54%] top-[68%] w-[48%] h-[28%] rounded-full border border-cyan-300/45 mix-blend-screen"
          style={{
            animation: fanOn ? 'lumoraBreezePulse 2.1s ease-out infinite' : 'none',
          }}
        />
        <div
          className="absolute left-[56%] top-[78%] w-[56%] h-[32%] rounded-full border border-sky-200/30 mix-blend-screen"
          style={{
            animation: fanOn ? 'lumoraBreezePulse 2.1s ease-out 1.05s infinite' : 'none',
          }}
        />
      </div>

      {/* =====================================================================
          3. LIVE PHONE SCREEN OVERLAYS (Synchronized App Readout & Spinning Fan Icon)
         ===================================================================== */}
      {/* Live AC Temperature Badge synced over Phone Screen Dial (x=73.8%, y=55.2%) */}
      <div
        className="pointer-events-none absolute left-[67.5%] top-[51.2%] w-[12.5%] h-[7.5%] rounded-xl flex items-center justify-center"
        style={{
          transform: 'rotate(-2.5deg)',
          background: 'radial-gradient(circle, rgba(16, 24, 39, 0.92) 60%, transparent 100%)',
        }}
      >
        <span
          className={`font-sans font-bold tracking-tight transition-colors ${
            compact ? 'text-xs sm:text-sm' : 'text-base sm:text-xl'
          } ${acOn ? 'text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]' : 'text-slate-500'}`}
        >
          {acOn ? `${acTemp}°C` : 'OFF'}
        </span>
      </div>

      {/* Live Spinning Fan Graphic synced over Phone Screen Fan Card (x=77.3%, y=79.5%) */}
      <div
        className="pointer-events-none absolute left-[71.5%] top-[73.6%] w-[11.5%] aspect-square rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(14, 21, 35, 0.95) 68%, transparent 100%)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[84%] h-[84%]"
          style={{
            animation:
              fanOn && fanSpeed > 0
                ? `lumoraPhoneFanSpin ${spinDurationSeconds * 1.15}s linear infinite`
                : 'none',
            opacity: fanOn && fanSpeed > 0 ? 1 : 0.35,
          }}
        >
          <defs>
            <linearGradient id="phoneBladeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          {[0, 90, 180, 270].map((angle) => (
            <path
              key={angle}
              d="M50 50 C42 26, 46 10, 56 10 C66 10, 66 28, 50 50 Z"
              fill="url(#phoneBladeGrad)"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="8" fill="#E0F2FE" />
        </svg>
      </div>

      {/* Interactive Hotspot Controls Directly on the Phone Screen (When callbacks provided) */}
      {onChangeTemp && (
        <>
          {/* Phone Screen '-' Button Hotspot */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChangeTemp(Math.max(16, acTemp - 1));
            }}
            aria-label="Decrease AC temperature on phone screen"
            className="absolute left-[63.5%] top-[58.2%] w-[5.5%] h-[4.5%] rounded-full bg-cyan-electric/10 hover:bg-cyan-electric/30 border border-cyan-electric/40 transition-colors"
            title="Decrease AC Temp (–)"
          />
          {/* Phone Screen '+' Button Hotspot */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChangeTemp(Math.min(30, acTemp + 1));
            }}
            aria-label="Increase AC temperature on phone screen"
            className="absolute left-[80.2%] top-[56.8%] w-[5.5%] h-[4.5%] rounded-full bg-cyan-electric/10 hover:bg-cyan-electric/30 border border-cyan-electric/40 transition-colors"
            title="Increase AC Temp (+)"
          />
        </>
      )}

      {onToggleFan && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFan();
          }}
          aria-label="Toggle ceiling fan power on phone screen"
          className="absolute left-[83.6%] top-[68.8%] w-[6%] h-[5%] rounded-full bg-cyan-electric/15 hover:bg-cyan-electric/35 border border-cyan-electric/50 transition-colors"
          title="Toggle Ceiling Fan Power"
        />
      )}

      {/* Live Telemetry Status Pill (Bottom-centered in compact card mode so AC & Ceiling Fan stay 100% unobstructed) */}
      <div
        className={`pointer-events-none absolute z-20 ${
          compact
            ? 'bottom-2.5 left-2.5 right-2.5 flex justify-start'
            : 'top-3 left-3 right-3 flex items-center justify-between gap-2'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-cyan-electric/40 text-[10px] sm:text-[11px] font-mono text-cyan-electric shadow-lg">
          <Snowflake
            className={`w-3 h-3 shrink-0 ${acOn ? 'animate-spin' : 'opacity-40'}`}
            style={{ animationDuration: '6s' }}
          />
          <span>
            {statusText ||
              `AC: ${acOn ? `${acTemp}°C Cooling` : 'Standby'} • Fan: ${
                fanOn ? `Speed ${fanSpeed}` : 'OFF'
              }`}
          </span>
        </div>

        {!compact && (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-amber-gold/40 text-[10px] font-mono text-amber-gold">
            <Wind className="w-3 h-3" />
            <span>Live App &amp; Wall Sync</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Self-running animated preview for the "03 • CLIMATE CONTROL" Card and Hero.
 * Smoothly demonstrates the AC and Ceiling Fan starting up and adjusting speeds realistically.
 */
export default function AnimatedClimatePreview({ compact = false }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Cycle every 2.8 seconds through realistic startup & operating states:
    // Phase 0: AC Starting (24°C) + Fan Starting (Speed 2)
    // Phase 1: Active Cooling (22°C) + Ceiling Fan Speed 3
    // Phase 2: Turbo Rapid Cool (19°C) + Ceiling Fan Speed 5
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const states = [
    {
      acOn: true,
      acTemp: 24,
      fanOn: true,
      fanSpeed: 2,
      label: 'AC Started (24°C) • Fan Speed 2',
    },
    {
      acOn: true,
      acTemp: 22,
      fanOn: true,
      fanSpeed: 3,
      label: 'Cooling Active (22°C) • Fan Speed 3',
    },
    {
      acOn: true,
      acTemp: 19,
      fanOn: true,
      fanSpeed: 5,
      label: 'Turbo Cool (19°C) • Fan Speed 5',
    },
  ];

  const current = states[phase];

  if (compact) {
    // Inside 16:9 product card: show ambient blurred backdrop + full unobstructed room & phone stage
    return (
      <div style={{ aspectRatio: '16 / 9' }} className="relative w-full overflow-hidden bg-charcoal-950">
        <img
          src="/assets/reference/climate-control-room.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-45 scale-110 pointer-events-none"
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="h-full aspect-[957/1024]">
            <RealisticClimateRoom
              acOn={current.acOn}
              acTemp={current.acTemp}
              fanOn={current.fanOn}
              fanSpeed={current.fanSpeed}
              statusText={current.label}
              compact
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <RealisticClimateRoom
      acOn={current.acOn}
      acTemp={current.acTemp}
      fanOn={current.fanOn}
      fanSpeed={current.fanSpeed}
      statusText={current.label}
    />
  );
}
