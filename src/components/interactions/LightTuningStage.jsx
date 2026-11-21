import React, { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

const LIGHT_MODES = [
  {
    id: 'morning',
    name: 'Morning',
    kelvin: '6000K Crisp Morning Daylight',
    useCase: 'Morning focus, study & kitchen clarity',
    glowColor: 'rgba(186, 230, 253, 0.36)',
    bulbColor: '#E0F2FE',
    ringColor: '#38BDF8',
    badgeClass: 'bg-sky-400/15 text-sky-300 border-sky-400/40',
  },
  {
    id: 'evening',
    name: 'Evening',
    kelvin: '2700K Warm Evening Amber',
    useCase: 'Evening relaxation, dining & lounge ambience',
    glowColor: 'rgba(245, 158, 11, 0.38)',
    bulbColor: '#FDE68A',
    ringColor: '#F59E0B',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  },
  {
    id: 'night',
    name: 'Night',
    kelvin: '2200K Soft Night Sanctuary',
    useCase: 'Cozy night wind-down & low-glare bedroom comfort',
    glowColor: 'rgba(56, 189, 248, 0.30)',
    bulbColor: '#BAE6FD',
    ringColor: '#00D2FF',
    badgeClass: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/40',
  },
];

/**
 * @Interaction2 — Light-Tuning Hover / Tap Demo
 * Dark stage with 3 bulb icons (Daylight / Warm White / Cool White).
 * Hovering (or tapping on mobile/tablet) a bulb floods the surrounding stage with that exact light tone.
 */
export default function LightTuningStage() {
  const [activeTone, setActiveTone] = useState(LIGHT_MODES[1]); // default Warm White

  return (
    <div
      className="relative rounded-3xl border border-white/15 bg-charcoal-950 p-6 sm:p-10 overflow-hidden transition-all duration-500"
      style={{
        boxShadow: `inset 0 0 120px ${activeTone.glowColor}`,
      }}
    >
      {/* Dynamic Flood Stage Overlay */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[340px] rounded-full blur-3xl transition-all duration-500"
        style={{ background: activeTone.glowColor }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-gold" />
            <span>Interactive Tunable Lighting Stage</span>
          </div>
          <InteractiveCueBadge text="Click here to try" accent="amber" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Set the Exact Mood of Every Room
        </h3>
        <p className="mt-2 text-slate-300 text-sm sm:text-base">
          Hover or tap a luminaire below to flood the stage with tunable white lighting.
        </p>

        {/* Three Interactive Bulb Fixtures */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LIGHT_MODES.map((mode) => {
            const isSelected = activeTone.id === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onMouseEnter={() => setActiveTone(mode)}
                onFocus={() => setActiveTone(mode)}
                onClick={() => setActiveTone(mode)}
                aria-pressed={isSelected}
                className={`group relative min-h-[140px] p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-charcoal-900/90 border-white/40 scale-[1.02] shadow-2xl'
                    : 'bg-charcoal-900/50 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isSelected ? mode.bulbColor : 'rgba(255,255,255,0.06)',
                      boxShadow: isSelected ? `0 0 30px ${mode.ringColor}` : 'none',
                    }}
                  >
                    <Lightbulb
                      className={`w-6 h-6 transition-colors ${
                        isSelected ? 'text-charcoal-950' : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${mode.badgeClass}`}
                  >
                    {isSelected ? 'Active Stage' : 'Click here to try'}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-base font-display font-bold text-white">{mode.name}</div>
                  <div className="text-xs font-medium text-amber-gold/90 mt-0.5">{mode.kelvin}</div>
                  <div className="text-xs text-slate-300 mt-1">{mode.useCase}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
