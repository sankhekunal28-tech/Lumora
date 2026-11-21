import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Sunset,
  Tv,
  ShieldCheck,
  Wind,
  Blinds,
  Sparkles,
  Play,
  Pause,
  Lock,
  Unlock,
  CheckCircle2,
  Sliders,
  Radio,
} from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

const STORY_CHAPTERS = [
  {
    id: 0,
    time: '07:00 AM • DAWN',
    shortTime: '07:00 AM',
    phase: 'Morning Wake-Up',
    title: 'Morning Curtains Glide Open',
    description:
      'As sunrise arrives, whisper-silent concealed curtain motors (< 30 dB) part your bedroom and living drapes automatically while warm cove lights fade in gently and the geyser warms up.',
    icon: Sun,
    accent: 'amber',
    badge: 'Chapter 01 • Sunrise Routine',
    mainImage: '/assets/reference/curtain-open.jpg',
    pipImage: '/assets/reference/keypad-scene-morning.jpg',
    pipLabel: 'Morning – Natural Daylight Scene',
    sunPos: { cx: 130, cy: 52, isMoon: false },
    defaultCurtain: 100, // 100% open
    defaultLight: 85,
    defaultTemp: 24,
    defaultLocked: true,
    devicesTriggered: [
      { label: 'Dual Curtain Motor', state: 'Gliding to 100% Open' },
      { label: 'Bedroom & Living Cove', state: 'Soft Dawn Fade • 85%' },
      { label: 'Morning Geyser Relay', state: 'Auto-Scheduled ON' },
    ],
  },
  {
    id: 1,
    time: '02:00 PM • AFTERNOON',
    shortTime: '02:00 PM',
    phase: 'Solar & Climate Balance',
    title: '50% Sheer Daylight & Smart Cooling',
    description:
      'During peak afternoon sun, Lumora automatically draws the translucent sheer curtains to 50% to block harsh UV glare while maintaining a breezy 22.5°C AC and silent ceiling fan profile.',
    icon: Wind,
    accent: 'cyan',
    badge: 'Chapter 02 • Solar & Climate Sync',
    mainImage: '/assets/reference/curtain-sheer-closed.jpg',
    pipImage: '/assets/reference/climate-control-room.webp',
    pipLabel: '360° Climate Pod • AC + Ceiling Fan',
    sunPos: { cx: 320, cy: 22, isMoon: false },
    defaultCurtain: 50, // 50% sheer filter
    defaultLight: 60,
    defaultTemp: 22,
    defaultLocked: true,
    devicesTriggered: [
      { label: 'Sheer Curtain Track', state: 'Set to 50% Daylight Filter' },
      { label: 'Split AC & Ceiling Fan', state: '22°C Cool • Fan Speed 3' },
      { label: 'Ambient Lux Sensor', state: 'Daylight Harvesting Active' },
    ],
  },
  {
    id: 2,
    time: '06:30 PM • EVENING',
    shortTime: '06:30 PM',
    phase: 'Golden Hour Sanctuary',
    title: 'Living Room Lights, Climate & Bathroom Presence',
    description:
      'Before you walk through the door, the living room pre-cools to 23°C, architectural wall keypads glow with your 2700K Evening scene, and stepping into the dark bathroom turns on all vanity lights automatically.',
    icon: Sunset,
    accent: 'amber',
    badge: 'Chapter 03 • Evening Sanctuary',
    mainImage: '/assets/reference/keypad-scene-evening.jpg',
    pipImage: '/assets/reference/sensor-bathroom-active.jpg',
    pipLabel: 'Bathroom Presence Sensor • Instant ON',
    sunPos: { cx: 470, cy: 38, isMoon: false },
    defaultCurtain: 50,
    defaultLight: 90,
    defaultTemp: 23,
    defaultLocked: false,
    devicesTriggered: [
      { label: '8-Module Wall Keypad', state: 'Evening Warm • 2700K' },
      { label: 'Bathroom Presence Radar', state: 'Occupied (72 bpm) → Lights ON' },
      { label: 'Living Lounge Split AC', state: 'Pre-Cooled to 23°C' },
    ],
  },
  {
    id: 3,
    time: '09:00 PM • CINEMA TIME',
    shortTime: '09:00 PM',
    phase: 'Family Entertainment',
    title: 'One-Tap TV Time & Full Blackout Privacy',
    description:
      'Pressing the TV Time button on the keypad switches on the television, draws both sheer and blackout drapes closed for zero screen glare, and dims overhead cove lighting to a cozy 20% bias glow.',
    icon: Tv,
    accent: 'cyan',
    badge: 'Chapter 04 • Family Cinema Mode',
    mainImage: '/assets/reference/keypad-scene-tv.jpg',
    pipImage: '/assets/reference/curtain-blackout-closed.webp',
    pipLabel: 'Sheer + Blackout Drapes 100% Closed',
    sunPos: { cx: 560, cy: 48, isMoon: true },
    defaultCurtain: 0, // 0% open (blackout closed)
    defaultLight: 25,
    defaultTemp: 23,
    defaultLocked: true,
    devicesTriggered: [
      { label: 'TV & Media Console', state: 'Powered ON • Cinema Profile' },
      { label: 'Dual Drapery Tracks', state: 'Sheer + Blackout Closed' },
      { label: 'Architectural Cove', state: 'Dimmed to 25% Bias Glow' },
    ],
  },
  {
    id: 4,
    time: '11:30 PM • NIGHT',
    shortTime: '11:30 PM',
    phase: 'Perimeter Armed & Sleep',
    title: 'Whole-Home Security Arms Itself',
    description:
      'One tap on your bedside keypad or voice command locks the 7-way biometric entrance door, powers down all idle lights and TV, sets the bedroom sleep curve to 24°C, and arms night pathway sensors.',
    icon: ShieldCheck,
    accent: 'cyan',
    badge: 'Chapter 05 • Night Lockdown',
    mainImage: '/assets/reference/keypad-scene-exit.jpg',
    pipImage: '/assets/reference/smart-security-lock.webp',
    pipLabel: '7-Way Biometric Lock • Armed & Logged',
    sunPos: { cx: 635, cy: 58, isMoon: true },
    defaultCurtain: 0,
    defaultLight: 10,
    defaultTemp: 24,
    defaultLocked: true,
    devicesTriggered: [
      { label: '7-Way Biometric Smart Lock', state: 'Locked & Armed • Dual Batt 98%' },
      { label: 'Living Lights, TV & AC', state: 'All Systems Off (0W Standby)' },
      { label: 'Master Bedroom Climate', state: 'Silent 24°C Sleep Curve' },
    ],
  },
];

/**
 * @Interaction9 — Regenerated Interactive 24-Hour Smart-Home Story & Live Room Simulator
 */
export default function ScrollHouseStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [curtainOpenPct, setCurtainOpenPct] = useState(STORY_CHAPTERS[0].defaultCurtain);
  const [lightLevelPct, setLightLevelPct] = useState(STORY_CHAPTERS[0].defaultLight);
  const [acTemp, setAcTemp] = useState(STORY_CHAPTERS[0].defaultTemp);
  const [doorLocked, setDoorLocked] = useState(STORY_CHAPTERS[0].defaultLocked);
  const [pipExpanded, setPipExpanded] = useState(false);

  const stepRefs = useRef([]);
  const currentChapter = STORY_CHAPTERS[activeStep] || STORY_CHAPTERS[0];

  // Sync interactive playground sliders when chapter changes
  useEffect(() => {
    const ch = STORY_CHAPTERS[activeStep] || STORY_CHAPTERS[0];
    setCurtainOpenPct(ch.defaultCurtain);
    setLightLevelPct(ch.defaultLight);
    setAcTemp(ch.defaultTemp);
    setDoorLocked(ch.defaultLocked);
    setPipExpanded(false);
  }, [activeStep]);

  // Auto-play 24-hour story loop
  useEffect(() => {
    if (!autoPlay) return undefined;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STORY_CHAPTERS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const handleSelectChapter = (index) => {
    setAutoPlay(false);
    setActiveStep(index);
  };

  const cycleCurtain = () => {
    setAutoPlay(false);
    setCurtainOpenPct((prev) => (prev === 100 ? 50 : prev === 50 ? 0 : 100));
  };

  const cycleLight = () => {
    setAutoPlay(false);
    setLightLevelPct((prev) => (prev >= 80 ? 45 : prev >= 40 ? 15 : 90));
  };

  const cycleTemp = () => {
    setAutoPlay(false);
    setAcTemp((prev) => (prev <= 20 ? 24 : prev - 1));
  };

  const toggleLock = () => {
    setAutoPlay(false);
    setDoorLocked((prev) => !prev);
  };

  // Visual curtain panel width for each side (0% open => 50% width each side; 100% open => 6% valence each side)
  const sideCurtainWidthPct = Math.max(5, ((100 - curtainOpenPct) / 2) * 0.92);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-charcoal-950 via-[#040B17] to-charcoal-950 border-y border-cyan-electric/15 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute top-16 left-1/4 w-96 h-96 rounded-full bg-amber-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-16 right-1/4 w-96 h-96 rounded-full bg-cyan-electric/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header + Auto-Play Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>A Day in a Lumora Home • 24-Hour Live Simulation</span>
              </div>
              <InteractiveCueBadge text="Click any chapter or live room control to play" accent="cyan" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Your Home Wakes Up, Adapts, and Protects You Automatically
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience a full 24-hour cycle in an automated Lumora residence — or take manual control of the curtains, lighting, climate, and biometric lock inside the live stage below.
            </p>
          </div>

          {/* Auto-Play Simulation Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              className={`min-h-[46px] px-4 py-2.5 rounded-2xl border font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all ${
                autoPlay
                  ? 'bg-cyan-electric/15 border-cyan-electric/50 text-cyan-200 shadow-[0_0_25px_rgba(0,210,255,0.2)]'
                  : 'bg-white/5 border-white/15 text-slate-300 hover:border-white/30'
              }`}
            >
              {autoPlay ? (
                <>
                  <Pause className="w-4 h-4 text-cyan-electric" />
                  <span>24h Auto-Play: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-amber-gold" />
                  <span>Resume 24h Auto-Play</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive 24-Hour Time-of-Day Scrubber Bar */}
        <div className="mb-8 p-2 sm:p-3 rounded-2xl bg-[#040B16]/90 border border-white/10 backdrop-blur-md">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STORY_CHAPTERS.map((ch, idx) => {
              const Icon = ch.icon;
              const isSelected = activeStep === idx;
              const isAmber = ch.accent === 'amber';

              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className={`relative p-3 rounded-xl border text-left transition-all overflow-hidden group ${
                    isSelected
                      ? isAmber
                        ? 'bg-gradient-to-br from-amber-gold/20 via-[#0B172A] to-charcoal-950 border-amber-gold shadow-[0_0_25px_rgba(245,158,11,0.22)]'
                        : 'bg-gradient-to-br from-cyan-electric/20 via-[#08182E] to-charcoal-950 border-cyan-electric shadow-[0_0_25px_rgba(0,210,255,0.22)]'
                      : 'bg-charcoal-900/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        isSelected
                          ? isAmber
                            ? 'text-amber-gold'
                            : 'text-cyan-electric'
                          : 'text-slate-400'
                      }`}
                    >
                      {ch.shortTime}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected
                          ? isAmber
                            ? 'text-amber-gold'
                            : 'text-cyan-electric'
                          : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                  </div>
                  <div className="text-xs font-display font-bold text-white truncate mt-1">
                    {ch.phase}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Grid: Left Live Multi-Layered Room Stage + Right Chapter Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (7 Cols): Sticky Live Room & Celestial Horizon Simulator */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 rounded-3xl bg-[#040B16] border border-cyan-electric/30 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
            {/* 1. Top Celestial Sun/Moon Horizon Arc Header */}
            <div className="relative px-5 pt-4 pb-3 bg-gradient-to-r from-[#02060D] via-[#07162C] to-[#02060D] border-b border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-gold animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-gold">
                    {currentChapter.time}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-mono text-cyan-electric">
                    {currentChapter.badge}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                  Astro Clock Synced • IST
                </span>
              </div>

              {/* Animated Celestial Horizon Arc SVG */}
              <svg
                viewBox="0 0 760 74"
                className="w-full h-14 mt-1 select-none overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="skyArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Horizon Base Line */}
                <line
                  x1="40"
                  y1="64"
                  x2="720"
                  y2="64"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />

                {/* Dashed Celestial Trajectory Arc */}
                <path
                  d="M 60 64 Q 380 -18 700 64"
                  fill="none"
                  stroke="url(#skyArcGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Chapter Marker Dots Along the Arc */}
                {STORY_CHAPTERS.map((ch, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <g
                      key={ch.id}
                      onClick={() => handleSelectChapter(idx)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={ch.sunPos.cx}
                        cy={ch.sunPos.cy}
                        r={isActive ? '12' : '5'}
                        fill={
                          isActive
                            ? ch.sunPos.isMoon
                              ? '#00D2FF'
                              : '#F59E0B'
                            : '#1E293B'
                        }
                        stroke={ch.sunPos.isMoon ? '#00D2FF' : '#F59E0B'}
                        strokeWidth="2"
                      />
                      {isActive && (
                        <circle
                          cx={ch.sunPos.cx}
                          cy={ch.sunPos.cy}
                          r="20"
                          fill="none"
                          stroke={ch.sunPos.isMoon ? '#00D2FF' : '#F59E0B'}
                          strokeWidth="1.5"
                          opacity="0.6"
                        >
                          <animate
                            attributeName="r"
                            values="13;24;13"
                            dur="2.2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.7;0.1;0.7"
                            dur="2.2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      <text
                        x={ch.sunPos.cx}
                        y="72"
                        textAnchor="middle"
                        fill={isActive ? '#FFFFFF' : '#64748B'}
                        fontSize="9.5"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {ch.shortTime}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 2. Multi-Layered Photographic Room Stage with Interactive Curtain & Lighting Overlays */}
            <div className="relative h-[320px] sm:h-[400px] bg-[#02060D] overflow-hidden select-none">
              {/* Cross-Fading High-Resolution Room Photography for Each Chapter */}
              {STORY_CHAPTERS.map((ch, idx) => (
                <img
                  key={ch.id}
                  src={ch.mainImage}
                  alt={ch.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                    activeStep === idx
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                  style={{
                    filter: `brightness(${0.45 + (lightLevelPct / 100) * 0.7}) saturate(${
                      0.85 + (lightLevelPct / 100) * 0.35
                    })`,
                  }}
                />
              ))}

              {/* Interactive Ambient Lighting Glow Overlay */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: (lightLevelPct / 100) * 0.55,
                  background:
                    currentChapter.accent === 'amber'
                      ? 'radial-gradient(circle at 50% 25%, rgba(245, 158, 11, 0.42), transparent 72%)'
                      : 'radial-gradient(circle at 50% 25%, rgba(0, 210, 255, 0.35), transparent 72%)',
                }}
              />

              {/* Interactive Animated Left & Right Motorized Curtain Panels (Responds to Curtain Toggle!) */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-[#090D16]/90 via-[#111827]/75 to-transparent border-r border-amber-gold/30 transition-all duration-700"
                style={{ width: `${sideCurtainWidthPct}%` }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l from-[#090D16]/90 via-[#111827]/75 to-transparent border-l border-amber-gold/30 transition-all duration-700"
                style={{ width: `${sideCurtainWidthPct}%` }}
              />

              {/* Top Pelmet Track Indicator */}
              <div className="pointer-events-none absolute top-3 left-4 right-4 flex items-center justify-between gap-2 z-20">
                <span className="px-3 py-1 rounded-full bg-[#02060D]/85 backdrop-blur-md border border-white/15 text-[11px] font-mono text-amber-gold inline-flex items-center gap-1.5">
                  <Blinds className="w-3.5 h-3.5" />
                  <span>
                    Curtains:{' '}
                    {curtainOpenPct === 100
                      ? '100% Open'
                      : curtainOpenPct === 50
                      ? '50% Sheer Filter'
                      : 'Blackout Closed'}
                  </span>
                </span>

                <span
                  className={`px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-mono inline-flex items-center gap-1.5 ${
                    doorLocked
                      ? 'bg-emerald-950/85 border-emerald-400/40 text-emerald-300'
                      : 'bg-amber-950/85 border-amber-400/40 text-amber-300'
                  }`}
                >
                  {doorLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{doorLocked ? '7-Way Smart Lock: Armed' : 'Main Door: Unlocked'}</span>
                </span>
              </div>

              {/* Secondary Picture-in-Picture (PIP) Hardware / Zone View (Click to Expand) */}
              <button
                type="button"
                onClick={() => setPipExpanded((prev) => !prev)}
                className={`absolute bottom-4 right-4 z-20 rounded-2xl overflow-hidden border-2 border-cyan-electric/60 bg-[#02060D] shadow-[0_15px_40px_rgba(0,0,0,0.85)] transition-all duration-500 text-left group ${
                  pipExpanded ? 'w-64 sm:w-80 h-44 sm:h-52' : 'w-40 sm:w-52 h-28 sm:h-32'
                }`}
              >
                <img
                  src={currentChapter.pipImage}
                  alt={currentChapter.pipLabel}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#02060D]/85 border border-cyan-electric/40 text-[9px] font-mono uppercase tracking-wider text-cyan-electric">
                  {pipExpanded ? 'Click to Minimize' : 'Click to Zoom PIP'}
                </div>
                <div className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-display font-bold text-white truncate">
                  {currentChapter.pipLabel}
                </div>
              </button>

              {/* Bottom Left Active Scene Headline Inside Stage */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-48 sm:right-60 z-10">
                <div className="p-3.5 rounded-2xl bg-[#02060D]/85 backdrop-blur-md border border-white/15">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-electric">
                    {currentChapter.phase}
                  </div>
                  <div className="text-sm sm:text-lg font-display font-bold text-white leading-snug mt-0.5">
                    {currentChapter.title}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Interactive Live Hardware Override Dock (Play with Curtains, Lights, AC, and Lock!) */}
            <div className="p-4 sm:p-5 bg-[#030914] border-t border-white/10">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 inline-flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-electric" />
                  <span>Interactive Room Playground — Click Any Control Below to Override Scene</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Curtain Override Button */}
                <button
                  type="button"
                  onClick={cycleCurtain}
                  className="p-3 rounded-xl bg-charcoal-900/90 hover:bg-[#091931] border border-white/10 hover:border-amber-gold/50 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Curtain Track</span>
                    <Blinds className="w-4 h-4 text-amber-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1">
                    {curtainOpenPct === 100
                      ? '100% Open'
                      : curtainOpenPct === 50
                      ? '50% Sheer'
                      : '0% Blackout'}
                  </div>
                  <div className="text-[10px] text-amber-gold/80 mt-0.5">Tap to glide</div>
                </button>

                {/* Lighting Dimmer Override Button */}
                <button
                  type="button"
                  onClick={cycleLight}
                  className="p-3 rounded-xl bg-charcoal-900/90 hover:bg-[#091931] border border-white/10 hover:border-amber-gold/50 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Cove Dimmer</span>
                    <Sun className="w-4 h-4 text-amber-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1">
                    {lightLevelPct}% Warmth
                  </div>
                  <div className="text-[10px] text-amber-gold/80 mt-0.5">Tap to dim</div>
                </button>

                {/* Climate AC Override Button */}
                <button
                  type="button"
                  onClick={cycleTemp}
                  className="p-3 rounded-xl bg-charcoal-900/90 hover:bg-[#091931] border border-white/10 hover:border-cyan-electric/50 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>AC &amp; Fan Pod</span>
                    <Wind className="w-4 h-4 text-cyan-electric group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1">
                    {acTemp}.0°C Cool
                  </div>
                  <div className="text-[10px] text-cyan-electric/80 mt-0.5">Tap to adjust °C</div>
                </button>

                {/* Smart Lock Override Button */}
                <button
                  type="button"
                  onClick={toggleLock}
                  className="p-3 rounded-xl bg-charcoal-900/90 hover:bg-[#091931] border border-white/10 hover:border-emerald-400/50 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Biometric Lock</span>
                    {doorLocked ? (
                      <Lock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Unlock className="w-4 h-4 text-amber-gold" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1">
                    {doorLocked ? 'Armed & Locked' : 'Unlocked'}
                  </div>
                  <div className="text-[10px] text-emerald-300/80 mt-0.5">Tap to toggle</div>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 Cols): Interactive Chapter Cards with Thumbnails & Triggered Hardware */}
          <div className="lg:col-span-5 space-y-4">
            {STORY_CHAPTERS.map((step, index) => {
              const Icon = step.icon;
              const isCurrent = activeStep === index;
              const isAmber = step.accent === 'amber';

              return (
                <div
                  key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  onClick={() => handleSelectChapter(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelectChapter(index);
                  }}
                  className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isCurrent
                      ? isAmber
                        ? 'bg-[#081326] border-amber-gold shadow-[0_15px_45px_rgba(245,158,11,0.2)]'
                        : 'bg-[#07162C] border-cyan-electric shadow-[0_15px_45px_rgba(0,210,255,0.2)]'
                      : 'bg-charcoal-900/60 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Chapter Room Thumbnail Preview */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/15 shrink-0 relative bg-[#02060D]">
                      <img
                        src={step.mainImage}
                        alt={step.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-1 left-1.5 text-[9px] font-mono font-bold text-white">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Chapter Header & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isAmber ? 'text-amber-gold' : 'text-cyan-electric'
                          }`}
                        >
                          {step.time}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? isAmber
                                ? 'bg-amber-gold text-charcoal-950'
                                : 'bg-cyan-electric text-charcoal-950'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-display font-bold text-white mt-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Hardware Triggered Chips (Expanded on Active Chapter) */}
                  {isCurrent && (
                    <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {step.devicesTriggered.map((dev) => (
                        <div
                          key={dev.label}
                          className="px-3 py-2 rounded-xl bg-[#030914] border border-white/10"
                        >
                          <div className="flex items-center gap-1.5 text-[11px] font-display font-bold text-white">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-electric shrink-0" />
                            <span className="truncate">{dev.label}</span>
                          </div>
                          <div className="text-[10px] font-mono text-amber-gold mt-0.5 truncate">
                            {dev.state}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
