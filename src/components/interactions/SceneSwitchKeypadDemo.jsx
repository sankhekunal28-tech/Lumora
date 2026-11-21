import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Thermometer,
  Wind,
  Tv,
  PowerOff,
  Sun,
  Sunset,
  Moon,
  Sliders,
} from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

/**
 * Custom Precision SVG Icons Replicating the Exact Engraved Icons on the Lumora Keypad Reference Image
 */
export function KeypadFullSunIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <circle cx="14" cy="14" r="4.6" stroke="currentColor" strokeWidth="1.7" />
      {/* 8 radiating sun rays matching the upper-left scene button */}
      <line x1="14" y1="3.5" x2="14" y2="6.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="14" y1="21.4" x2="14" y2="24.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="3.5" y1="14" x2="6.6" y2="14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="21.4" y1="14" x2="24.5" y2="14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="6.5" y1="6.5" x2="8.7" y2="8.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="19.3" y1="19.3" x2="21.5" y2="21.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="21.5" y1="6.5" x2="19.3" y2="8.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="8.7" y1="19.3" x2="6.5" y2="21.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function KeypadSettingSunIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      {/* 5 upper rays */}
      <line x1="14" y1="5.2" x2="14" y2="8.0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="7.5" y1="7.8" x2="9.5" y2="9.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="20.5" y1="7.8" x2="18.5" y2="9.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="5.2" y1="13.5" x2="7.8" y2="13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="20.2" y1="13.5" x2="22.8" y2="13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      {/* Half sun arch above horizon */}
      <path
        d="M9.2 16.5 A4.8 4.8 0 0 1 18.8 16.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Double horizon lines matching the upper-right scene button */}
      <line x1="5.5" y1="16.8" x2="22.5" y2="16.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="7.8" y1="19.8" x2="20.2" y2="19.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function KeypadTvIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      {/* Rectangular TV screen */}
      <rect
        x="5.5"
        y="6.8"
        width="17"
        height="11.5"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      {/* TV neck & base stand matching the lower-left scene button */}
      <line x1="11.5" y1="18.5" x2="10.5" y2="21.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="16.5" y1="18.5" x2="17.5" y2="21.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8.5" y1="21.2" x2="19.5" y2="21.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function KeypadCrescentMoonIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      {/* Outlined crescent moon with tiny accent star matching the lower-right scene button */}
      <path
        d="M18.8 18.4 A6.8 6.8 0 0 1 11.8 7.2 A6.8 6.8 0 1 0 20.6 17.6 Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="9.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function KeypadCurtainCloseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Exact geometric bowtie / inward triangles icon from bottom-left of keypad */}
      <polygon points="5,6 11.5,12 5,18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="19,6 12.5,12 19,18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function KeypadCurtainOpenIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Exact geometric curtain track / arch icon from bottom-left-right of keypad */}
      <path
        d="M7 18 V6.5 H17 V18 M9 18 V8.5 H15 V18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Four Scene Configurations Matching the User's Exact Titles, Descriptions, and Reference Images
 */
const SCENES = {
  morning: {
    id: 'morning',
    shortName: 'Morning',
    title: 'Morning – Natural Daylight',
    subtitle: 'Curtains wide open • Bright natural sunlight • Fresh morning comfort',
    description:
      'Opens the motorized floor-to-ceiling curtains to welcome bright natural daylight and warm sunbeams into the living room while setting effortless morning comfort.',
    image: '/assets/reference/keypad-scene-morning.jpg',
    IconComponent: KeypadFullSunIcon,
    BadgeIcon: Sun,
    accent: 'amber',
    lightsPct: 75,
    curtainState: 'Open 100%',
    acState: 'ON • 24°C',
    fanState: 'Speed 2',
    tvState: 'OFF',
    occupancy: 'Ready for the Day',
    glowColor: 'rgba(251, 191, 36, 0.35)',
  },
  evening: {
    id: 'evening',
    shortName: 'Evening',
    title: 'Evening – Warm Ambient Lighting',
    subtitle: 'Warm cove & spotlight glow • Sheer drapes drawn • Cozy lounge ambience',
    description:
      'Draws the sheer curtains across the twilight window and gradually brings up warm golden ceiling cove lights, wall art spotlights, TV wall downlights, and under-console LEDs.',
    image: '/assets/reference/keypad-scene-evening.jpg',
    IconComponent: KeypadSettingSunIcon,
    BadgeIcon: Sunset,
    accent: 'amber',
    lightsPct: 100,
    curtainState: 'Sheers Closed',
    acState: 'ON • 23°C',
    fanState: 'Speed 2 (Warm LED)',
    tvState: 'Standby',
    occupancy: 'Cozy Evening Lounge',
    glowColor: 'rgba(245, 158, 11, 0.42)',
  },
  tv: {
    id: 'tv',
    shortName: 'TV Time',
    title: 'TV Time – Family Entertainment',
    subtitle: 'TV ON (Cinema Mode) • Family seated on sofa • Comfortably dimmed lighting • AC 22°C',
    description:
      'Switches on the television for family entertainment on the sofa, closes heavy drapes to eliminate window glare, dims architectural lighting to a comfortable 25%, and maintains 22°C AC comfort.',
    image: '/assets/reference/keypad-scene-tv.jpg',
    IconComponent: KeypadTvIcon,
    BadgeIcon: Tv,
    accent: 'cyan',
    lightsPct: 25,
    curtainState: 'Blackout Closed',
    acState: 'ON • 22°C (Active)',
    fanState: 'Silent (Speed 1)',
    tvState: 'ON • Netflix Cinema',
    occupancy: 'Family Seated on Sofa',
    glowColor: 'rgba(0, 210, 255, 0.38)',
  },
  exit: {
    id: 'exit',
    shortName: 'Exit',
    title: 'Exit – All Systems Off',
    subtitle: 'All lights OFF • TV & AC powered down • Unoccupied dark standby room',
    description:
      'Powers down all ceiling lights, wall spotlights, television, ceiling fans, and air conditioning in one touch — leaving an unoccupied, naturally dark, energy-saving room.',
    image: '/assets/reference/keypad-scene-exit.jpg',
    IconComponent: KeypadCrescentMoonIcon,
    BadgeIcon: Moon,
    accent: 'cyan',
    lightsPct: 0,
    curtainState: 'Closed (Privacy)',
    acState: 'OFF',
    fanState: 'OFF',
    tvState: 'OFF',
    occupancy: 'Unoccupied • All Off',
    glowColor: 'rgba(56, 189, 248, 0.25)',
  },
};

const SCENE_ORDER = ['morning', 'evening', 'tv', 'exit'];

/**
 * @Interaction2 — Redesigned Smart-Home Keypad & Real-Time Living Room Scene Simulator
 * Replicates the attached Lumora Smart Keypad reference image (`media_1794641692357_aa38aad4.jpg`)
 * with 1:1 proportions, flush dark-graphite modular plates, hairline seams, universal socket + USB-C,
 * and 4 independent scene buttons (`Morning`, `Evening`, `TV Time`, `Exit`) driving the exact
 * living room architecture across all 4 scenes.
 */
export default function SceneSwitchKeypadDemo() {
  const [activeSceneKey, setActiveSceneKey] = useState('morning');
  const [pressedButtonId, setPressedButtonId] = useState(null);
  const [brightnessAdjust, setBrightnessAdjust] = useState(0); // -20% to +20% fine adjustment via -/+ keys
  const [acTemp, setAcTemp] = useState(24);
  const [activeControlMode, setActiveControlMode] = useState('AC'); // 'AC' | 'FAN'
  const [socketSwitchOn, setSocketSwitchOn] = useState(true);

  const scene = SCENES[activeSceneKey];

  // Sync default AC temp and reset fine brightness offset when switching scenes
  useEffect(() => {
    setBrightnessAdjust(0);
    if (activeSceneKey === 'morning') setAcTemp(24);
    else if (activeSceneKey === 'evening') setAcTemp(23);
    else if (activeSceneKey === 'tv') setAcTemp(22);
  }, [activeSceneKey]);

  const triggerButtonFeedback = (btnId, callback) => {
    setPressedButtonId(btnId);
    if (callback) callback();
    setTimeout(() => {
      setPressedButtonId((prev) => (prev === btnId ? null : prev));
    }, 260);
  };

  const handleSceneSelect = (sceneId) => {
    triggerButtonFeedback(`scene-${sceneId}`, () => {
      setActiveSceneKey(sceneId);
    });
  };

  const handleMinusClick = () => {
    triggerButtonFeedback('btn-minus', () => {
      if (activeSceneKey !== 'exit') {
        setAcTemp((t) => Math.max(16, t - 1));
        setBrightnessAdjust((b) => Math.max(-18, b - 6));
      }
    });
  };

  const handlePlusClick = () => {
    triggerButtonFeedback('btn-plus', () => {
      if (activeSceneKey !== 'exit') {
        setAcTemp((t) => Math.min(30, t + 1));
        setBrightnessAdjust((b) => Math.min(18, b + 6));
      }
    });
  };

  // Effective room brightness multiplier based on fine -/+ adjustment
  const effectiveBrightness =
    activeSceneKey === 'exit'
      ? 1
      : Math.max(0.75, Math.min(1.25, 1 + brightnessAdjust / 100));

  const effectiveLightsPct =
    activeSceneKey === 'exit'
      ? 0
      : Math.max(5, Math.min(100, scene.lightsPct + brightnessAdjust));

  return (
    <div className="rounded-3xl bg-charcoal-900/90 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <style>{`
        @keyframes keypadSunbeamDrift {
          0%, 100% { opacity: 0.42; transform: translateX(0%) scale(1); }
          50% { opacity: 0.72; transform: translateX(1.5%) scale(1.03); }
        }
        @keyframes keypadEveningWarmPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.88; }
        }
        @keyframes keypadTvScreenFlicker {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          40% { opacity: 0.85; transform: scale(1.04); }
          75% { opacity: 0.65; transform: scale(0.98); }
        }
        @keyframes keypadAcCoolWave {
          0% { opacity: 0; transform: translateY(0) scaleX(0.85); }
          40% { opacity: 0.75; }
          100% { opacity: 0; transform: translateY(28px) scaleX(1.18); }
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ===================================================================== */}
        {/* LEFT COLUMN: EXACT 1:1 LUMORA SMART KEYPAD REPLICA + SCENE CARDS      */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 min-w-0 w-full flex flex-col items-center space-y-6">
          {/* 1:1 Architectural Hardware Replica of the Attached Keypad Reference Image */}
          <div className="w-full min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-300">
              <InteractiveCueBadge text="Click any keypad button to try" accent="amber" />
              <span className="text-slate-400">
                {activeSceneKey === 'exit' ? 'All Off' : `${activeControlMode}: ${acTemp}°C`}
              </span>
            </div>

            {/* Outer Matte Dark-Graphite Frame with Right Brushed-Metallic Trim Strip */}
            <div
              style={{ aspectRatio: '2.42 / 1' }}
              className="relative w-full rounded-[6px] bg-gradient-to-b from-[#34373E] via-[#272A30] to-[#1D2025] p-[5.5%] shadow-[0_24px_55px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-[#454952]/70 select-none overflow-hidden"
            >
              {/* Subtle top bevel light reflection matching the reference photo */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-white/10 via-white/30 to-white/20" />

              {/* Right-edge Brushed Silver/Champagne Vertical Trim Strip from reference photo */}
              <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-[6px] bg-gradient-to-b from-[#E2E8F0] via-[#94A3B8] to-[#64748B] shadow-[-2px_0_8px_rgba(0,0,0,0.6)]" />

              {/* Inner Flush Module Grid Separated by 1.5px Dark Hairline Seams (4 exact columns: 28% | 16% | 16% | 40%) */}
              <div
                style={{ gridTemplateColumns: '28fr 16fr 16fr 40fr' }}
                className="w-full h-full grid gap-[1.5px] bg-[#0B0D10] border border-[#090A0D] shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)]"
              >
                {/* --------------------------------------------------------------- */}
                {/* COLUMN 1 (Left 28%): 3 Stacked Horizontal Rows                  */}
                {/*   Row 1: AC | FAN                                               */}
                {/*   Row 2:  - | +                                                 */}
                {/*   Row 3: Curtain Close | Curtain Open                           */}
                {/* --------------------------------------------------------------- */}
                <div className="grid grid-rows-3 gap-[1.5px] bg-[#0B0D10]">
                  {/* Row 1: AC & FAN */}
                  <div className="grid grid-cols-2 bg-gradient-to-b from-[#2B2E35] to-[#23262C]">
                    <button
                      type="button"
                      onClick={() =>
                        triggerButtonFeedback('btn-ac', () => setActiveControlMode('AC'))
                      }
                      aria-label="Select AC Control"
                      className={`w-full h-full flex items-center justify-center font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.08em] transition-all duration-200 focus:outline-none ${
                        pressedButtonId === 'btn-ac' ? 'scale-95 bg-white/5' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        style={{
                          textShadow:
                            activeSceneKey !== 'exit' && activeControlMode === 'AC'
                              ? '0 0 10px rgba(186,230,253,0.95), 0 0 18px rgba(56,189,248,0.7)'
                              : '0 0 6px rgba(186,230,253,0.45)',
                        }}
                        className={
                          activeSceneKey !== 'exit' && activeControlMode === 'AC'
                            ? 'text-[#E0F2FE]'
                            : 'text-[#BAE6FD]/75'
                        }
                      >
                        AC
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        triggerButtonFeedback('btn-fan', () => setActiveControlMode('FAN'))
                      }
                      aria-label="Select Fan Control"
                      className={`w-full h-full flex items-center justify-center font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.08em] transition-all duration-200 focus:outline-none ${
                        pressedButtonId === 'btn-fan' ? 'scale-95 bg-white/5' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        style={{
                          textShadow:
                            activeSceneKey !== 'exit' && activeControlMode === 'FAN'
                              ? '0 0 10px rgba(186,230,253,0.95), 0 0 18px rgba(56,189,248,0.7)'
                              : '0 0 6px rgba(186,230,253,0.45)',
                        }}
                        className={
                          activeSceneKey !== 'exit' && activeControlMode === 'FAN'
                            ? 'text-[#E0F2FE]'
                            : 'text-[#BAE6FD]/75'
                        }
                      >
                        FAN
                      </span>
                    </button>
                  </div>

                  {/* Row 2: - & + */}
                  <div className="grid grid-cols-2 bg-gradient-to-b from-[#292C33] to-[#21242A]">
                    <button
                      type="button"
                      onClick={handleMinusClick}
                      aria-label="Decrease temperature or room brightness"
                      className={`w-full h-full flex items-center justify-center font-sans text-sm sm:text-base font-medium transition-all duration-150 focus:outline-none ${
                        pressedButtonId === 'btn-minus'
                          ? 'scale-90 text-white bg-white/10'
                          : 'text-[#E0F2FE]/85 hover:text-white hover:bg-white/[0.03]'
                      }`}
                      style={{ textShadow: '0 0 8px rgba(186,230,253,0.65)' }}
                    >
                      −
                    </button>

                    <button
                      type="button"
                      onClick={handlePlusClick}
                      aria-label="Increase temperature or room brightness"
                      className={`w-full h-full flex items-center justify-center font-sans text-sm sm:text-base font-medium transition-all duration-150 focus:outline-none ${
                        pressedButtonId === 'btn-plus'
                          ? 'scale-90 text-white bg-white/10'
                          : 'text-[#E0F2FE]/85 hover:text-white hover:bg-white/[0.03]'
                      }`}
                      style={{ textShadow: '0 0 8px rgba(186,230,253,0.65)' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Row 3: Curtain Close (Bowtie) & Curtain Open (Arch) */}
                  <div className="grid grid-cols-2 bg-gradient-to-b from-[#262930] to-[#1F2227]">
                    <button
                      type="button"
                      onClick={() =>
                        triggerButtonFeedback('btn-curtain-close', () => {
                          if (activeSceneKey === 'morning') setActiveSceneKey('evening');
                        })
                      }
                      title="Close Curtains"
                      aria-label="Close Curtains"
                      className={`w-full h-full flex items-center justify-center transition-all duration-200 focus:outline-none ${
                        pressedButtonId === 'btn-curtain-close'
                          ? 'scale-90 bg-white/10'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        style={{
                          filter:
                            activeSceneKey !== 'morning'
                              ? 'drop-shadow(0 0 6px rgba(186,230,253,0.85))'
                              : 'drop-shadow(0 0 4px rgba(186,230,253,0.4))',
                        }}
                        className={
                          activeSceneKey !== 'morning'
                            ? 'text-[#E0F2FE]'
                            : 'text-[#BAE6FD]/75'
                        }
                      >
                        <KeypadCurtainCloseIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        triggerButtonFeedback('btn-curtain-open', () => {
                          setActiveSceneKey('morning');
                        })
                      }
                      title="Open Curtains (Natural Daylight)"
                      aria-label="Open Curtains"
                      className={`w-full h-full flex items-center justify-center transition-all duration-200 focus:outline-none ${
                        pressedButtonId === 'btn-curtain-open'
                          ? 'scale-90 bg-white/10'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        style={{
                          filter:
                            activeSceneKey === 'morning'
                              ? 'drop-shadow(0 0 7px rgba(186,230,253,0.95))'
                              : 'drop-shadow(0 0 4px rgba(186,230,253,0.4))',
                        }}
                        className={
                          activeSceneKey === 'morning'
                            ? 'text-[#E0F2FE]'
                            : 'text-[#BAE6FD]/75'
                        }
                      >
                        <KeypadCurtainOpenIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* --------------------------------------------------------------- */}
                {/* COLUMN 2 (Center-Left 16%): Vertical Plate with 2 Independent   */}
                {/* Scene Buttons:                                                  */}
                {/*   Top: Morning (Full Sun Icon)                                  */}
                {/*   Bottom: TV Time (Television Icon)                             */}
                {/* --------------------------------------------------------------- */}
                <div className="flex flex-col justify-between bg-gradient-to-b from-[#2B2E36] via-[#25282F] to-[#1F2228] relative">
                  {/* Top Button: Morning (Full Sun Icon) */}
                  <button
                    type="button"
                    onClick={() => handleSceneSelect('morning')}
                    aria-pressed={activeSceneKey === 'morning'}
                    aria-label="Morning – Natural Daylight Scene"
                    title="Morning – Natural Daylight"
                    className={`relative flex-1 w-full flex items-center justify-center transition-all duration-200 focus:outline-none group ${
                      pressedButtonId === 'scene-morning' ? 'scale-95' : ''
                    } ${
                      activeSceneKey === 'morning'
                        ? 'bg-radial from-amber-gold/18 via-cyan-electric/10 to-transparent'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Active LED Halo behind engraved icon */}
                    {activeSceneKey === 'morning' && (
                      <span className="pointer-events-none absolute w-9 h-9 rounded-full bg-amber-gold/25 blur-md animate-pulse" />
                    )}
                    <span
                      style={{
                        filter:
                          activeSceneKey === 'morning'
                            ? 'drop-shadow(0 0 9px rgba(254,240,138,1)) drop-shadow(0 0 16px rgba(245,158,11,0.85))'
                            : 'drop-shadow(0 0 5px rgba(186,230,253,0.65))',
                      }}
                      className={`transition-all duration-300 ${
                        activeSceneKey === 'morning'
                          ? 'text-[#FEF08A] scale-110'
                          : 'text-[#D6EEFF]/85 group-hover:text-white'
                      }`}
                    >
                      <KeypadFullSunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </button>

                  {/* Bottom Button: TV Time (Television Icon) */}
                  <button
                    type="button"
                    onClick={() => handleSceneSelect('tv')}
                    aria-pressed={activeSceneKey === 'tv'}
                    aria-label="TV Time – Family Entertainment Scene"
                    title="TV Time – Family Entertainment"
                    className={`relative flex-1 w-full flex items-center justify-center transition-all duration-200 focus:outline-none group ${
                      pressedButtonId === 'scene-tv' ? 'scale-95' : ''
                    } ${
                      activeSceneKey === 'tv'
                        ? 'bg-radial from-cyan-electric/20 via-cyan-tech/10 to-transparent'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    {activeSceneKey === 'tv' && (
                      <span className="pointer-events-none absolute w-9 h-9 rounded-full bg-cyan-electric/30 blur-md animate-pulse" />
                    )}
                    <span
                      style={{
                        filter:
                          activeSceneKey === 'tv'
                            ? 'drop-shadow(0 0 9px rgba(224,242,254,1)) drop-shadow(0 0 16px rgba(0,210,255,0.9))'
                            : 'drop-shadow(0 0 5px rgba(186,230,253,0.65))',
                      }}
                      className={`transition-all duration-300 ${
                        activeSceneKey === 'tv'
                          ? 'text-[#E0F2FE] scale-110'
                          : 'text-[#D6EEFF]/85 group-hover:text-white'
                      }`}
                    >
                      <KeypadTvIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </button>
                </div>

                {/* --------------------------------------------------------------- */}
                {/* COLUMN 3 (Center-Right 16%): Vertical Plate with 2 Independent  */}
                {/* Scene Buttons:                                                  */}
                {/*   Top: Evening (Setting Sun Icon)                               */}
                {/*   Bottom: Exit (Crescent Moon Icon)                             */}
                {/* --------------------------------------------------------------- */}
                <div className="flex flex-col justify-between bg-gradient-to-b from-[#2B2E36] via-[#25282F] to-[#1F2228] relative">
                  {/* Top Button: Evening (Setting Sun Icon) */}
                  <button
                    type="button"
                    onClick={() => handleSceneSelect('evening')}
                    aria-pressed={activeSceneKey === 'evening'}
                    aria-label="Evening – Warm Ambient Lighting Scene"
                    title="Evening – Warm Ambient Lighting"
                    className={`relative flex-1 w-full flex items-center justify-center transition-all duration-200 focus:outline-none group ${
                      pressedButtonId === 'scene-evening' ? 'scale-95' : ''
                    } ${
                      activeSceneKey === 'evening'
                        ? 'bg-radial from-amber-gold/20 via-amber-500/10 to-transparent'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    {activeSceneKey === 'evening' && (
                      <span className="pointer-events-none absolute w-9 h-9 rounded-full bg-amber-gold/25 blur-md animate-pulse" />
                    )}
                    <span
                      style={{
                        filter:
                          activeSceneKey === 'evening'
                            ? 'drop-shadow(0 0 9px rgba(254,240,138,1)) drop-shadow(0 0 16px rgba(245,158,11,0.85))'
                            : 'drop-shadow(0 0 5px rgba(186,230,253,0.65))',
                      }}
                      className={`transition-all duration-300 ${
                        activeSceneKey === 'evening'
                          ? 'text-[#FEF08A] scale-110'
                          : 'text-[#D6EEFF]/85 group-hover:text-white'
                      }`}
                    >
                      <KeypadSettingSunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </button>

                  {/* Bottom Button: Exit (Crescent Moon Icon) */}
                  <button
                    type="button"
                    onClick={() => handleSceneSelect('exit')}
                    aria-pressed={activeSceneKey === 'exit'}
                    aria-label="Exit – All Systems Off Scene"
                    title="Exit – All Systems Off"
                    className={`relative flex-1 w-full flex items-center justify-center transition-all duration-200 focus:outline-none group ${
                      pressedButtonId === 'scene-exit' ? 'scale-95' : ''
                    } ${
                      activeSceneKey === 'exit'
                        ? 'bg-radial from-cyan-electric/20 via-sky-500/10 to-transparent'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    {activeSceneKey === 'exit' && (
                      <span className="pointer-events-none absolute w-9 h-9 rounded-full bg-cyan-electric/30 blur-md animate-pulse" />
                    )}
                    <span
                      style={{
                        filter:
                          activeSceneKey === 'exit'
                            ? 'drop-shadow(0 0 9px rgba(224,242,254,1)) drop-shadow(0 0 16px rgba(0,210,255,0.9))'
                            : 'drop-shadow(0 0 5px rgba(186,230,253,0.65))',
                      }}
                      className={`transition-all duration-300 ${
                        activeSceneKey === 'exit'
                          ? 'text-[#E0F2FE] scale-110'
                          : 'text-[#D6EEFF]/85 group-hover:text-white'
                      }`}
                    >
                      <KeypadCrescentMoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </button>
                </div>

                {/* --------------------------------------------------------------- */}
                {/* COLUMN 4 (Right 40%): Universal Socket + USB & Micro Switch     */}
                {/* Replicating the recessed square inner frame and 5-hole socket   */}
                {/* --------------------------------------------------------------- */}
                <div className="bg-gradient-to-b from-[#2A2D34] via-[#23262C] to-[#1D2026] p-[11%] flex items-center justify-center relative">
                  {/* Recessed Inner Square Socket Plate */}
                  <div className="relative w-full h-full rounded-[3px] bg-gradient-to-b from-[#25282F] to-[#1E2127] border border-[#121418] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.06)]">
                    {/* Top-Right USB Port + Slim Vertical Rocker Switch */}
                    <div className="absolute top-[11%] right-[10%] flex items-center gap-[5px]">
                      {/* Vertical USB Slot */}
                      <div
                        title="Fast-Charge USB Port"
                        className="w-[7px] h-[18px] sm:w-[8px] sm:h-[21px] rounded-[2px] bg-[#0B0C0F] border border-[#3A3E47] flex items-center justify-center shadow-inner"
                      >
                        <div className="w-[2.5px] h-[11px] bg-[#282C34] rounded-[1px]" />
                      </div>
                      {/* Slim Pill Vertical Socket Switch */}
                      <button
                        type="button"
                        onClick={() => setSocketSwitchOn((s) => !s)}
                        title="Toggle 16A Universal Socket Power"
                        aria-label="Toggle Universal Socket Switch"
                        className={`w-[8px] h-[21px] sm:w-[9px] sm:h-[24px] rounded-full border transition-all ${
                          socketSwitchOn
                            ? 'bg-gradient-to-b from-[#2E323B] to-[#1D2026] border-[#434854]'
                            : 'bg-gradient-to-t from-[#2E323B] to-[#181A1F] border-[#30343E]'
                        }`}
                      />
                    </div>

                    {/* Exact 5-Aperture Universal Shuttered Power Socket */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-[76%] h-[84%] ml-[4%] mt-[6%]"
                      aria-hidden="true"
                    >
                      {/* Top-Left & Top-Right Round/Curved Pin Apertures */}
                      <path
                        d="M24 24 C24 17, 35 17, 35 24 L35 30 L24 30 Z"
                        fill="#090A0D"
                        stroke="#353942"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M53 24 C53 17, 64 17, 64 24 L64 30 L53 30 Z"
                        fill="#090A0D"
                        stroke="#353942"
                        strokeWidth="1.2"
                      />

                      {/* Center Vertical Earth / Ground Keyhole Slot */}
                      <path
                        d="M40 38 C40 33, 48 33, 48 38 L48 47 C51 49, 51 56, 48 58 L48 63 L40 63 L40 58 C37 56, 37 49, 40 47 Z"
                        fill="#090A0D"
                        stroke="#353942"
                        strokeWidth="1.2"
                      />

                      {/* Bottom-Left & Bottom-Right Stepped Universal 16A Apertures */}
                      <polygon
                        points="16,74 34,74 34,82 28,82 28,86 21,86 21,82 16,82"
                        fill="#090A0D"
                        stroke="#353942"
                        strokeWidth="1.2"
                      />
                      <polygon
                        points="54,74 72,74 72,82 67,82 67,86 60,86 60,82 54,82"
                        fill="#090A0D"
                        stroke="#353942"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Independent Clickable Scene Cards with Required Titles & Descriptions */}
          <div
            className="w-full grid grid-cols-1 gap-2.5"
            role="group"
            aria-label="Smart Keypad Scene Selector"
          >
            {SCENE_ORDER.map((sceneKey) => {
              const item = SCENES[sceneKey];
              const Icon = item.IconComponent;
              const isSelected = activeSceneKey === item.id;
              const isAmber = item.accent === 'amber';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSceneSelect(item.id)}
                  aria-pressed={isSelected}
                  className={`w-full min-h-[62px] px-4 py-3 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-3 ${
                    isSelected
                      ? isAmber
                        ? 'bg-[#131C2E] border-amber-gold shadow-[0_0_28px_rgba(245,158,11,0.25)]'
                        : 'bg-[#0E1E36] border-cyan-electric shadow-[0_0_28px_rgba(0,210,255,0.25)]'
                      : 'bg-charcoal-950/80 border-white/10 hover:border-white/25 hover:bg-charcoal-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isSelected
                          ? isAmber
                            ? 'bg-amber-gold text-charcoal-950 shadow-[0_0_16px_rgba(245,158,11,0.6)]'
                            : 'bg-cyan-electric text-charcoal-950 shadow-[0_0_16px_rgba(0,210,255,0.6)]'
                          : 'bg-white/5 text-slate-300 border border-white/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-display font-bold text-sm sm:text-base text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Active LED Status Indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider hidden sm:inline ${
                        isSelected
                          ? isAmber
                            ? 'text-amber-gold font-bold'
                            : 'text-cyan-electric font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {isSelected ? 'ACTIVE' : 'CLICK TO TRY'}
                    </span>
                    <span
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isSelected
                          ? isAmber
                            ? 'bg-amber-gold shadow-[0_0_12px_#F59E0B] scale-110'
                            : 'bg-cyan-electric shadow-[0_0_12px_#00D2FF] scale-110'
                          : 'bg-slate-700'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: REAL-TIME LIVING ROOM SCENE STAGE (16:9 / 1024x576)     */}
        {/* ===================================================================== */}
        <div className="lg:col-span-7 min-w-0 w-full space-y-5">
          <div
            style={{
              aspectRatio: '16 / 9',
              boxShadow: `0 25px 70px rgba(0,0,0,0.85), 0 0 45px ${scene.glowColor}`,
            }}
            className="relative w-full rounded-3xl border border-white/15 overflow-hidden bg-charcoal-950 transition-shadow duration-700 select-none"
          >
            {/* Preloaded & Pixel-Aligned 4 Living Room Scene Layers (1024x576) */}
            {SCENE_ORDER.map((sceneKey) => {
              const item = SCENES[sceneKey];
              const isCurrent = activeSceneKey === sceneKey;
              return (
                <img
                  key={sceneKey}
                  src={item.image}
                  alt={item.title}
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    filter: isCurrent
                      ? `brightness(${effectiveBrightness.toFixed(2)})`
                      : 'brightness(0.85)',
                    transform: isCurrent ? 'scale(1)' : 'scale(1.015)',
                    transition:
                      'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), filter 500ms ease-out, transform 950ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center block pointer-events-none"
                  draggable={false}
                />
              );
            })}

            {/* --------------------------------------------------------------- */}
            {/* REAL-TIME SCENE ANIMATION OVERLAYS                              */}
            {/* --------------------------------------------------------------- */}

            {/* 1. MORNING – NATURAL DAYLIGHT: Warm Sunbeams Entering the Window */}
            <div
              style={{
                opacity: activeSceneKey === 'morning' ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            >
              {/* Diagonal Morning Sunbeam Rays streaming from window onto floor & right wall */}
              <div
                style={{
                  left: '24%',
                  top: '14%',
                  width: '74%',
                  height: '86%',
                  background:
                    'linear-gradient(125deg, rgba(254,249,195,0.26) 0%, rgba(253,224,71,0.14) 38%, rgba(251,191,36,0.08) 65%, transparent 88%)',
                  clipPath: 'polygon(0% 0%, 68% 0%, 100% 100%, 12% 100%)',
                  animation: 'keypadSunbeamDrift 5s ease-in-out infinite',
                  mixBlendMode: 'screen',
                }}
                className="absolute"
              />
            </div>

            {/* 2. EVENING – WARM AMBIENT LIGHTING: Cove, Wall Art & Under-Console Glow */}
            <div
              style={{
                opacity: activeSceneKey === 'evening' ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            >
              {/* Warm Ceiling Cove Halo */}
              <div
                style={{
                  left: '14%',
                  top: '0%',
                  width: '74%',
                  height: '22%',
                  background:
                    'radial-gradient(ellipse at center, rgba(251,191,36,0.34) 0%, rgba(245,158,11,0.12) 55%, transparent 80%)',
                  animation: 'keypadEveningWarmPulse 3.6s ease-in-out infinite',
                }}
                className="absolute"
              />
              {/* Under-Console Warm Strip Reflection (Bottom Right) */}
              <div
                style={{
                  right: '0%',
                  bottom: '8%',
                  width: '32%',
                  height: '22%',
                  background:
                    'radial-gradient(ellipse at center, rgba(245,158,11,0.36) 0%, transparent 75%)',
                  animation: 'keypadEveningWarmPulse 3.2s ease-in-out 0.8s infinite',
                }}
                className="absolute"
              />
            </div>

            {/* 3. TV TIME – FAMILY ENTERTAINMENT: Dynamic TV Screen Glow & Cassette AC Airflow */}
            <div
              style={{
                opacity: activeSceneKey === 'tv' ? 1 : 0,
                transition: 'opacity 750ms ease-out',
              }}
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            >
              {/* Dynamic Cinema Ambient Glow radiating from the Wall TV (Right Wall: x=85%, y=45%) */}
              <div
                style={{
                  right: '1%',
                  top: '26%',
                  width: '22%',
                  height: '38%',
                  background:
                    'radial-gradient(ellipse at center, rgba(239,68,68,0.28) 0%, rgba(56,189,248,0.14) 55%, transparent 80%)',
                  animation: 'keypadTvScreenFlicker 3.2s ease-in-out infinite',
                  mixBlendMode: 'screen',
                }}
                className="absolute"
              />

              {/* Ceiling Cassette AC Cool Airflow Waves (Top Center: x=50%, y=9%) */}
              <div
                style={{
                  left: '43%',
                  top: '10%',
                  width: '14%',
                  height: '14%',
                }}
                className="absolute flex flex-col items-center"
              >
                <div
                  style={{ animation: 'keypadAcCoolWave 2.6s ease-out infinite' }}
                  className="w-full h-3 rounded-full bg-gradient-to-b from-cyan-electric/35 to-transparent blur-[2px]"
                />
                <div
                  style={{ animation: 'keypadAcCoolWave 2.6s ease-out 1.3s infinite' }}
                  className="w-4/5 h-3 rounded-full bg-gradient-to-b from-sky-300/25 to-transparent blur-[2px]"
                />
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* TOP & BOTTOM LIVE TELEMETRY OVERLAY BARS                        */}
            {/* --------------------------------------------------------------- */}
            <div className="relative z-20 p-3.5 sm:p-5 h-full flex flex-col justify-between pointer-events-none">
              {/* Top Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold shadow-lg transition-colors duration-500 ${
                    activeSceneKey === 'exit'
                      ? 'bg-charcoal-950/90 border-slate-500/40 text-slate-200'
                      : scene.accent === 'amber'
                      ? 'bg-charcoal-950/90 border-amber-gold/55 text-amber-gold'
                      : 'bg-charcoal-950/90 border-cyan-electric/55 text-cyan-electric'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeSceneKey === 'exit'
                        ? 'bg-slate-400'
                        : scene.accent === 'amber'
                        ? 'bg-amber-gold animate-ping'
                        : 'bg-cyan-electric animate-ping'
                    }`}
                  />
                  <span>{scene.title}</span>
                </div>

                <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-charcoal-950/90 border border-white/15 text-[11px] font-mono text-slate-200 backdrop-blur-md">
                    Lights: {effectiveLightsPct}% • Curtains: {scene.curtainState}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-charcoal-950/90 border border-cyan-electric/35 text-[11px] font-mono text-cyan-electric backdrop-blur-md flex items-center gap-1">
                    <Thermometer className="w-3 h-3" />
                    <span>
                      {activeSceneKey === 'exit' ? 'AC: OFF' : `AC: ${acTemp}°C`}
                    </span>
                    <span>•</span>
                    <Wind className="w-3 h-3" />
                    <span>{scene.fanState}</span>
                  </span>
                </div>
              </div>

              {/* Bottom Scene Status Pill */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-charcoal-950/90 border border-white/15 backdrop-blur-md text-xs text-white font-medium shadow-lg">
                  {activeSceneKey === 'tv' ? (
                    <>
                      <Tv className="w-3.5 h-3.5 text-cyan-electric shrink-0" />
                      <span>TV ON (Netflix) • Family Seated on Sofa • Dimmed 25%</span>
                    </>
                  ) : activeSceneKey === 'exit' ? (
                    <>
                      <PowerOff className="w-3.5 h-3.5 text-cyan-electric shrink-0" />
                      <span>All Lights, TV & AC Switched OFF • Unoccupied Room</span>
                    </>
                  ) : activeSceneKey === 'evening' ? (
                    <>
                      <Sunset className="w-3.5 h-3.5 text-amber-gold shrink-0" />
                      <span>Warm Cove, Spotlight & Under-Console Lighting Active</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-gold shrink-0" />
                      <span>Natural Daylight Entering Room • Curtains Open 100%</span>
                    </>
                  )}
                </div>

                {brightnessAdjust !== 0 && activeSceneKey !== 'exit' && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-gold/20 border border-amber-gold/40 text-[11px] font-mono text-amber-200 backdrop-blur-md">
                    Keypad Dimmer Offset: {brightnessAdjust > 0 ? `+${brightnessAdjust}%` : `${brightnessAdjust}%`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Scene Details & System Telemetry Card Below Stage */}
          <div className="p-5 rounded-2xl bg-charcoal-950/90 border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-gold">
                  ACTIVE KEYPAD SCENE • ONE-TOUCH EXECUTION
                </div>
                <h4 className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
                  {scene.title}
                </h4>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-electric">
                <Sliders className="w-3.5 h-3.5" />
                <span>Status: {scene.occupancy}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {scene.description}
            </p>

            {/* 4-System Live Status Readout */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-charcoal-900/90 border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-400">Lighting</div>
                <div className="text-xs font-mono font-bold text-amber-gold mt-0.5">
                  {effectiveLightsPct}% {activeSceneKey === 'exit' ? '(All Off)' : 'Active'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-charcoal-900/90 border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-400">Curtains</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5">
                  {scene.curtainState}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-charcoal-900/90 border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-400">Television</div>
                <div
                  className={`text-xs font-mono font-bold mt-0.5 ${
                    activeSceneKey === 'tv' ? 'text-cyan-electric' : 'text-slate-400'
                  }`}
                >
                  {scene.tvState}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-charcoal-900/90 border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-400">Climate (AC / Fan)</div>
                <div
                  className={`text-xs font-mono font-bold mt-0.5 ${
                    activeSceneKey === 'exit' ? 'text-slate-400' : 'text-cyan-electric'
                  }`}
                >
                  {activeSceneKey === 'exit' ? 'OFF' : `${acTemp}°C • ${scene.fanState}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
