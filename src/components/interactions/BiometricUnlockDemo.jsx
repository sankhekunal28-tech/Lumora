import React, { useState } from 'react';
import {
  Fingerprint,
  ScanFace,
  Hand,
  CreditCard,
  Smartphone,
  KeyRound,
  Hash,
  Video,
  BatteryCharging,
  History,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { RealisticSecurityLock } from './AnimatedSecurityStage';
import InteractiveCueBadge from './InteractiveCueBadge';

const UNLOCK_METHODS = [
  {
    id: 'palm',
    label: '1. Palm Recognition',
    shortName: 'Palm Vein Scan',
    icon: Hand,
    detail: 'Contactless IR palm vein recognition — wave your hand in front of the optical sensor to unlock effortlessly.',
  },
  {
    id: 'face',
    label: '2. 3D Face Recognition',
    shortName: '3D Face ID',
    icon: ScanFace,
    detail: 'Dual-IR structured light 3D facial recognition verifies you in under 0.4s, even in dark corridors.',
  },
  {
    id: 'fingerprint',
    label: '3. Biometric Fingerprint',
    shortName: 'Fingerprint Sensor',
    icon: Fingerprint,
    detail: '360° semiconductor fingerprint sensor built directly into the ergonomic pull-push grip.',
  },
  {
    id: 'rfid',
    label: '4. RF Card Unlock',
    shortName: 'Encrypted RF Card',
    icon: CreditCard,
    detail: 'Tap an encrypted contactless RF keycard — convenient for elders, children, or daily staff.',
  },
  {
    id: 'app',
    label: '5. Mobile App & Live Video',
    shortName: 'App + Live Video',
    icon: Smartphone,
    detail: 'View a live HD video feed of your doorstep on your phone — completely replacing traditional video door phones — and unlock remotely.',
  },
  {
    id: 'pin',
    label: '6. Touch PIN / Guest OTP',
    shortName: 'Touch PIN / OTP',
    icon: Hash,
    detail: 'Anti-peep illuminated touch keypad with time-limited OTP passcodes for guests and deliveries.',
  },
  {
    id: 'key',
    label: '7. Physical Key',
    shortName: 'Mechanical Key',
    icon: KeyRound,
    detail: 'High-security concealed mechanical cylinder key for emergency manual override at any time.',
  },
];

const INITIAL_LOGS = [
  { time: '19:42', method: 'Palm Recognition', user: 'Homeowner Verified', note: 'Door Unlocked + Foyer Lights ON' },
  { time: '16:15', method: 'Mobile App (Live Video)', user: 'Remote Unlock', note: 'Visitor Verified on Live Video Feed' },
  { time: '09:10', method: 'Biometric Fingerprint', user: 'Family Member', note: 'Morning Entry Logged' },
];

/**
 * @Interaction7 — 7-Way Smart Lock, Dual Battery & Live Video Door Phone Simulator
 */
export default function BiometricUnlockDemo() {
  const [status, setStatus] = useState('unlocked'); // 'locked' | 'scanning' | 'unlocked'
  const [activeMethod, setActiveMethod] = useState(UNLOCK_METHODS[0]);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  const triggerUnlock = (methodObj) => {
    setActiveMethod(methodObj);
    setStatus('scanning');
    setTimeout(() => {
      setStatus('unlocked');
      const now = new Date();
      const timeStr = now.toTimeString().slice(0, 5);
      setLogs((prev) => [
        {
          time: timeStr,
          method: methodObj.shortName,
          user: 'Interactive Test',
          note: 'Verified & Logged to Mobile App',
        },
        ...prev.slice(0, 3),
      ]);
    }, 380);
  };

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Full-Frame 751x1024 Smart Lock Photograph with Live Overlays */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[400px] rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            <RealisticSecurityLock
              activeMode={activeMethod.id}
              scanState={status}
              statusText={
                status === 'scanning'
                  ? `Scanning ${activeMethod.shortName}...`
                  : status === 'unlocked'
                  ? `${activeMethod.shortName} Verified • Unlocked`
                  : 'Mortise Locked • Tap Any Method'
              }
            />
          </div>
        </div>

        {/* Right Column: 7 Ways to Unlock, Dual Battery, Live Video Feed & Operation Logs */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-electric">
                7-in-1 Flagship Smart Lock + Built-In Video Door Phone
              </span>
              <InteractiveCueBadge text="Click any unlock method to try" accent="cyan" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              7 Ways to Unlock • Dual Battery • Live Mobile Video &amp; Logs
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Test any of the <strong className="text-white">7 unlock methods</strong> below. The built-in HD camera streams <strong className="text-cyan-electric">live video directly to your phone and the interior lock screen</strong> — replacing standalone video door phones completely — while the <strong className="text-amber-gold">Dual Battery system</strong> delivers extended multi-month power.
            </p>
          </div>

          {/* 7 Unlock Method Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="7 Ways to Unlock the Door">
            {UNLOCK_METHODS.map((m) => {
              const Icon = m.icon;
              const isSelected = activeMethod.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onMouseEnter={() => triggerUnlock(m)}
                  onClick={() => triggerUnlock(m)}
                  aria-pressed={isSelected}
                  className={`min-h-[48px] p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-cyan-tech/20 border-cyan-electric text-white shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                      : 'bg-charcoal-950/80 border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-cyan-electric' : 'text-amber-gold'
                    }`}
                  />
                  <span className="text-xs font-display font-bold leading-tight">{m.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setStatus('locked')}
              className="min-h-[48px] p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Relock Door</span>
            </button>
          </div>

          {/* Active Method Detail Banner */}
          <div className="p-4 rounded-2xl bg-charcoal-950 border border-cyan-electric/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-electric shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-electric">
                ACTIVE MODE: {activeMethod.label.toUpperCase()}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">{activeMethod.detail}</p>
            </div>
          </div>

          {/* Dual Battery + Live Video Door Phone Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-charcoal-950/90 border border-white/10 flex items-start gap-3">
              <BatteryCharging className="w-5 h-5 text-amber-gold shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-display font-bold text-white">
                  Dual Battery Extended Life
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Twin high-capacity rechargeable lithium cells ensure uninterrupted operation and longer life between charges.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal-950/90 border border-white/10 flex items-start gap-3">
              <Video className="w-5 h-5 text-cyan-electric shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-display font-bold text-white">
                  Replaces Video Door Phones
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Built-in indoor colour screen + live HD video streaming to mobile phones let you see and verify visitors from anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Live Operation & Access Log Feed */}
          <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-amber-gold">
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Real-Time Operation &amp; Entry Logs</span>
              </span>
              <span className="text-slate-400">Synced to App</span>
            </div>

            <div className="space-y-1.5">
              {logs.map((entry, idx) => (
                <div
                  key={`${entry.time}-${idx}`}
                  className="px-3 py-2 rounded-xl bg-charcoal-900 border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-electric">{entry.time}</span>
                    <span className="font-semibold text-white">{entry.method}</span>
                  </div>
                  <span className="text-slate-400">{entry.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
