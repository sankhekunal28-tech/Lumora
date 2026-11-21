import React, { useState, useEffect } from 'react';
import { ShieldCheck, BatteryCharging, Video, ScanFace, Hand, Fingerprint } from 'lucide-react';

/**
 * Renders the flagship Lumora Smart Lock photograph (751x1024) with realistic live
 * animated overlays aligned to the hardware:
 *  - Dual Battery pack (left): glowing cyan charge pulse
 *  - Interior HD Screen & Mobile Stream (center): live video door phone indicator
 *  - Top Optical Array & Hand (upper-right): animated 3D Face & Palm Recognition scan beam
 *  - Biometric Fingerprint Sensor (center-right): glowing emerald/cyan biometric ring
 */
export function RealisticSecurityLock({
  activeMode = 'palm', // 'face' | 'palm' | 'fingerprint' | 'rfid' | 'pin' | 'app' | 'key'
  scanState = 'unlocked', // 'locked' | 'scanning' | 'unlocked'
  statusText = '',
  compact = false,
}) {
  return (
    <div
      style={{ aspectRatio: '751 / 1024' }}
      className="relative w-full h-full overflow-hidden bg-charcoal-950 select-none"
    >
      <style>{`
        @keyframes lumoraPalmBeam {
          0%, 100% {
            opacity: 0.35;
            transform: scaleX(0.96);
          }
          50% {
            opacity: 0.95;
            transform: scaleX(1.04);
          }
        }
        @keyframes lumoraScanLine {
          0% {
            top: 15%;
            opacity: 0;
          }
          20% {
            opacity: 0.95;
          }
          80% {
            opacity: 0.95;
          }
          100% {
            top: 34%;
            opacity: 0;
          }
        }
        @keyframes lumoraBatteryPulse {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.85;
          }
        }
      `}</style>

      {/* BASE HIGH-RES SMART LOCK PHOTOGRAPH */}
      <img
        src="/assets/reference/smart-security-lock.webp"
        alt="Lumora 7-in-1 Biometric Smart Lock with Dual Battery, Palm & Face Recognition, and Live Video Door Phone"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* 1. DUAL BATTERY SYSTEM GLOW (Left Exploded Module: x=15%..23%, y=29%..48%) */}
      <div
        className="pointer-events-none absolute left-[15.2%] top-[29.5%] w-[7.5%] h-[18.5%] rounded-lg mix-blend-screen"
        style={{
          background:
            'linear-gradient(180deg, rgba(56, 189, 248, 0.75) 0%, rgba(34, 211, 238, 0.35) 60%, rgba(56, 189, 248, 0.65) 100%)',
          boxShadow: '0 0 22px rgba(34, 211, 238, 0.65)',
          animation: 'lumoraBatteryPulse 2.6s ease-in-out infinite',
        }}
      />
      {!compact && (
        <div className="pointer-events-none absolute left-[8%] top-[23.5%] px-2 py-0.5 rounded-md bg-charcoal-950/85 border border-cyan-electric/40 text-[9px] font-mono text-cyan-electric flex items-center gap-1 shadow-lg">
          <BatteryCharging className="w-3 h-3 shrink-0" />
          <span>DUAL BATTERY</span>
        </div>
      )}

      {/* 2. BUILT-IN HD VIDEO SCREEN & MOBILE LIVE FEED INDICATOR (Center Lock: x=33%..43%, y=27%..42%) */}
      <div className="pointer-events-none absolute left-[33.2%] top-[27.2%] w-[9.6%] h-[15.2%] rounded-sm border border-cyan-electric/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
        <div className="absolute top-1 left-1 px-1 py-0.2 rounded bg-black/75 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[7px] font-mono text-white font-bold">LIVE</span>
        </div>
      </div>

      {/* 3. CONTACTLESS PALM & 3D FACE OPTICAL SCAN BEAM (Upper Right: x=57%..88%, y=14%..33%) */}
      <div
        className="pointer-events-none absolute left-[57.5%] top-[14.5%] w-[31%] h-[19%] mix-blend-screen origin-left"
        style={{
          background:
            'radial-gradient(ellipse at 10% 50%, rgba(56, 189, 248, 0.85) 0%, rgba(34, 211, 238, 0.35) 55%, transparent 80%)',
          animation: 'lumoraPalmBeam 2.2s ease-in-out infinite',
        }}
      />
      {/* Vertical Laser Scan Line Sweeping Across Hand */}
      {(activeMode === 'palm' || activeMode === 'face' || scanState === 'scanning') && (
        <div
          className="pointer-events-none absolute left-[67%] w-[22%] h-[2px] bg-cyan-electric shadow-[0_0_12px_#22D3EE] mix-blend-screen"
          style={{
            animation: 'lumoraScanLine 1.8s linear infinite',
          }}
        />
      )}

      {/* 4. SEMICONDUCTOR BIOMETRIC FINGERPRINT RING PULSE (Center Right Handle: x=58.3%, y=51.0%) */}
      <div
        className="pointer-events-none absolute left-[58.1%] top-[50.9%] w-[4.2%] aspect-square rounded-full border-2 border-emerald-400 shadow-[0_0_16px_#10B981] animate-pulse"
      />

      {/* Status Pill Overlay */}
      <div
        className={`pointer-events-none absolute z-20 ${
          compact
            ? 'bottom-2.5 left-2.5 right-2.5 flex justify-start'
            : 'bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-950/90 backdrop-blur-md border border-cyan-electric/45 text-[10px] sm:text-[11px] font-mono text-cyan-electric shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-gold shrink-0" />
          <span>
            {statusText || '7-Way Unlock • Dual Battery • Live Video Feed'}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Self-running animated preview for the "04 • SECURITY" Card and Hero.
 */
export default function AnimatedSecurityPreview({ compact = false }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const cycle = [
    { mode: 'palm', text: '1/7 • Palm & 3D Face Recognition' },
    { mode: 'fingerprint', text: '2/7 • Biometric Fingerprint & RF Card' },
    { mode: 'app', text: 'Live Mobile Video • Replaces Door Phone' },
    { mode: 'battery', text: 'Dual Battery System • Activity Logs' },
  ];

  const current = cycle[step];

  if (compact) {
    return (
      <div style={{ aspectRatio: '16 / 9' }} className="relative w-full overflow-hidden bg-charcoal-950">
        <img
          src="/assets/reference/smart-security-lock.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-45 scale-110 pointer-events-none"
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="h-full aspect-[751/1024]">
            <RealisticSecurityLock
              activeMode={current.mode}
              statusText={current.text}
              compact
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <RealisticSecurityLock
      activeMode={current.mode}
      statusText={current.text}
    />
  );
}
