import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Activity,
  Sun,
  Moon,
  Play,
  Pause,
  CheckCircle2,
  Eye,
  HeartPulse,
  Clock,
  Sliders,
} from 'lucide-react';
import { AnimatedSensorStage } from './AnimatedSensorStage';
import InteractiveCueBadge from './InteractiveCueBadge';

const AMBIENCE_PRESETS = [
  {
    id: 'morning',
    name: 'Morning',
    tempLabel: '4000K Morning Daylight',
    coveLevel: '100%',
    mirrorLevel: '100%',
    vanityLevel: '85%',
    showerLevel: '100%',
    description:
      'Crisp, high-CRI vanity mirror illumination and full shower lighting paired with automatic morning geyser and exhaust readiness.',
  },
  {
    id: 'spa',
    name: 'Evening',
    tempLabel: '2700K Warm Spa Sanctuary',
    coveLevel: '100%',
    mirrorLevel: '100%',
    vanityLevel: '100%',
    showerLevel: '90%',
    description:
      'Turns on the warm perimeter ceiling cove, backlit round mirror, shower niche LED, and under-vanity marble glow as soon as you step inside.',
  },
  {
    id: 'night',
    name: 'Night',
    tempLabel: '2200K Low-Glare Night Glow',
    coveLevel: '15%',
    mirrorLevel: '25%',
    vanityLevel: '40%',
    showerLevel: '15%',
    description:
      'After 11:30 PM, entering the dark bathroom gently wakes only the soft under-vanity and mirror halo at dimmed levels so your eyes are never blinded.',
  },
];

/**
 * PresenceSensorBathroomDemo
 * Flagship interactive simulator for Smart Sensors (/solutions/sensors).
 * Demonstrates the ceiling Human Presence Sensor detecting a person entering a dark bathroom
 * and immediately turning on all architectural lights to prepare the desired bathroom ambience.
 */
export default function PresenceSensorBathroomDemo() {
  const [isOccupied, setIsOccupied] = useState(true);
  const [autoCycle, setAutoCycle] = useState(true);
  const [ambienceId, setAmbienceId] = useState('spa');
  const [durationSeconds, setDurationSeconds] = useState(137); // 00:02:17 matching the HUD

  const activePreset =
    AMBIENCE_PRESETS.find((p) => p.id === ambienceId) || AMBIENCE_PRESETS[0];

  // Auto-transition between Dark Bathroom and Person Enters -> Lights ON
  useEffect(() => {
    if (!autoCycle) return undefined;
    const timer = setInterval(() => {
      setIsOccupied((prev) => !prev);
    }, 3800);
    return () => clearInterval(timer);
  }, [autoCycle]);

  // Increment presence duration counter while occupied
  useEffect(() => {
    if (!isOccupied) return undefined;
    const ticker = setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(ticker);
  }, [isOccupied]);

  const handleSetState = (occupiedState) => {
    setAutoCycle(false);
    setIsOccupied(occupiedState);
    if (occupiedState) {
      setDurationSeconds(137);
    }
  };

  const mins = String(Math.floor(durationSeconds / 60)).padStart(2, '0');
  const secs = String(durationSeconds % 60).padStart(2, '0');

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.75)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-electric">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Human Presence & Bathroom Ambience Simulator</span>
            </div>
            <InteractiveCueBadge text="Click states or ambience below to try" accent="cyan" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
            Step Inside: From Dark Bathroom to Your Desired Ambience Instantly
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Watch how Lumora’s ceiling-mounted <strong>Human Presence Sensor</strong> keeps the bathroom dark when empty, and the moment you step in, detects actual human presence (down to heartbeat & breathing micro-motion) to switch on every light and prepare the bathroom to your exact desired ambience.
          </p>
        </div>

        {/* Auto-Transition Toggle Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setAutoCycle((prev) => !prev)}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border inline-flex items-center gap-2 transition-all ${
              autoCycle
                ? 'bg-cyan-electric/15 text-cyan-electric border-cyan-electric/40 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {autoCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{autoCycle ? 'Auto-Transition Playing' : 'Resume Auto-Transition'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left = Live Bathroom Visual Stage (895:1024), Right = Controls & Sensor Telemetry */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Full Uncropped 895x1024 Animated Bathroom Stage */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-white/15 bg-charcoal-950 shadow-2xl">
            <AnimatedSensorStage
              isOccupied={isOccupied}
              ambienceMode={ambienceId}
              durationSeconds={durationSeconds}
              showBadges
            />
          </div>

          {/* Quick Step-In / Step-Out State Switcher Pills Below Image */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSetState(false)}
              className={`min-h-[48px] px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                !isOccupied
                  ? 'bg-cyan-electric text-charcoal-950 border-cyan-electric shadow-[0_0_25px_rgba(34,211,238,0.35)]'
                  : 'bg-charcoal-950 text-slate-300 border-white/10 hover:border-white/25'
              }`}
            >
              <Moon className="w-4 h-4 shrink-0" />
              <span>1. Bathroom in Dark (Empty)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetState(true)}
              className={`min-h-[48px] px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isOccupied
                  ? 'bg-amber-gold text-charcoal-950 border-amber-gold shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                  : 'bg-charcoal-950 text-slate-300 border-white/10 hover:border-white/25'
              }`}
            >
              <Sun className="w-4 h-4 shrink-0" />
              <span>2. Person Enters (Lights ON)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Presence Telemetry, Desired Ambience Selector & Zone Readiness */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Live Ceiling Presence Sensor Telemetry Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-950 border border-cyan-electric/30 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-electric">
                <Eye className="w-4 h-4" />
                <span>Ceiling Presence Sensor Telemetry</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase ${
                  isOccupied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border border-white/10'
                }`}
              >
                {isOccupied ? 'Human Presence ✓' : 'No Occupancy'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-charcoal-900 border border-white/10">
                <div className="text-[11px] font-mono uppercase text-slate-400">Detection Mode</div>
                <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-electric shrink-0" />
                  <span>{isOccupied ? 'Active Lock-On' : 'Radar Standby'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-900 border border-white/10">
                <div className="text-[11px] font-mono uppercase text-slate-400">Micro-Vitals / Heartbeat</div>
                <div className="text-sm font-bold text-cyan-electric mt-1 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-cyan-electric shrink-0" />
                  <span>{isOccupied ? '72 bpm Detected' : '— Waiting'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-charcoal-900 border border-white/10">
                <div className="text-[11px] font-mono uppercase text-slate-400">Presence Duration</div>
                <div className="text-sm font-mono font-bold text-amber-gold mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-gold shrink-0" />
                  <span>{isOccupied ? `00:${mins}:${secs}` : '00:00:00'}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike basic PIR motion sensors that wave you into darkness if you stand still, Lumora’s ceiling <strong>Human Presence Sensor</strong> senses breathing and heartbeat micro-motion — keeping your bathroom ambience lit the entire time you are inside.
            </p>
          </div>

          {/* 2. Desired Bathroom Ambience Selector */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-950 border border-white/10 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-gold">
                <Sliders className="w-4 h-4" />
                <span>Choose Your Desired Bathroom Ambience</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{activePreset.tempLabel}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {AMBIENCE_PRESETS.map((preset) => {
                const selected = preset.id === ambienceId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setAmbienceId(preset.id);
                      setIsOccupied(true);
                      setAutoCycle(false);
                    }}
                    className={`min-h-[48px] p-3 rounded-xl border text-left transition-all ${
                      selected
                        ? 'bg-amber-gold/15 border-amber-gold text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-charcoal-900 border-white/10 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{preset.name}</div>
                    <div className="text-[11px] font-mono text-amber-gold mt-0.5">
                      {preset.tempLabel}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activePreset.description}
            </p>

            {/* Lighting Circuit Breakdown when Bathroom is Ready */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { label: 'Ceiling Cove', value: isOccupied ? activePreset.coveLevel : '0% OFF' },
                { label: 'Vanity Mirror', value: isOccupied ? activePreset.mirrorLevel : '0% OFF' },
                { label: 'Under-Vanity', value: isOccupied ? activePreset.vanityLevel : '0% OFF' },
                { label: 'Shower Niche', value: isOccupied ? activePreset.showerLevel : '0% OFF' },
              ].map((zone) => (
                <div
                  key={zone.label}
                  className="p-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-center"
                >
                  <div className="text-[10px] font-mono uppercase text-slate-400">{zone.label}</div>
                  <div
                    className={`text-xs font-mono font-bold mt-1 ${
                      isOccupied ? 'text-amber-gold' : 'text-slate-500'
                    }`}
                  >
                    {zone.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. How the Bathroom Gets Ready Automatically */}
          <div className="p-5 rounded-2xl bg-charcoal-950 border border-white/10 space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              What Happens the Instant You Walk In
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-gold shrink-0 mt-0.5" />
                <span>Warm cove, mirror & vanity lights fade up smoothly in under 150ms</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-electric shrink-0 mt-0.5" />
                <span>Detects true human presence even behind glass shower partitions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-gold shrink-0 mt-0.5" />
                <span>Adapts brightness automatically to morning, evening, or midnight hours</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-electric shrink-0 mt-0.5" />
                <span>Turns off all lights & exhaust automatically after you leave the bathroom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
