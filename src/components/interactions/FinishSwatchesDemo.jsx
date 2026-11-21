import React, { useState } from 'react';
import { Palette, Check, Sun, Tv } from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

const DEFAULT_FINISHES = [
  {
    id: 'matte-black',
    name: 'Matte Black',
    hex: '#181A1F',
    panelBg: 'linear-gradient(145deg, #272B33 0%, #16181E 100%)',
    moduleBg: '#1F232A',
    border: '#64748B',
    textColor: '#F8FAFC',
    ledColor: '#E0F2FE',
    description:
      'Stealth anodized graphite finish with a brushed metallic side trim — pairs effortlessly with warm marble walls, fluted wood, and modern Indian living rooms.',
  },
  {
    id: 'brushed-steel',
    name: 'Brushed Steel',
    hex: '#646B78',
    panelBg: 'linear-gradient(145deg, #7B8494 0%, #4A515E 100%)',
    moduleBg: '#5A6270',
    border: '#CBD5E1',
    textColor: '#FFFFFF',
    ledColor: '#38BDF8',
    description:
      'Cool architectural satin metal with fine linear brushing — suited for modern concrete, grey marble, and glass interiors.',
  },
  {
    id: 'warm-brass',
    name: 'Warm Brass',
    hex: '#9A7432',
    panelBg: 'linear-gradient(145deg, #B88B3E 0%, #6E501E 100%)',
    moduleBg: '#856228',
    border: '#FDE68A',
    textColor: '#FEF3C7',
    ledColor: '#FEF08A',
    description:
      'Hand-finished champagne gold PVD coating — crafted for warm Indian luxury residences, travertine stone, and teakwood panelling.',
  },
  {
    id: 'white',
    name: 'Architectural White',
    hex: '#E2E8F0',
    panelBg: 'linear-gradient(145deg, #F8FAFC 0%, #CBD5E1 100%)',
    moduleBg: '#E2E8F0',
    border: '#94A3B8',
    textColor: '#0F172A',
    ledColor: '#0284C7',
    description:
      'Pure matte alabaster finish that blends cleanly into gallery-white walls and minimalist bedrooms.',
  },
];

/**
 * @Interaction6 — Finish/Material Swatches
 * Used on @Keypads and @Security pages: clickable swatches (Matte Black / Brushed Steel / Warm Brass / White)
 * that reskin the product showcase immediately.
 */
export default function FinishSwatchesDemo({ productType = 'keypad' }) {
  const [selectedFinish, setSelectedFinish] = useState(DEFAULT_FINISHES[0]);

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-5 sm:p-8 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Live Reskinned Hardware Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-5 sm:p-8 rounded-2xl bg-charcoal-950 border border-white/10 relative overflow-hidden">
          {/* Warm Marble Room Backdrop */}
          <img
            src="/assets/reference/keypad-hero-wide.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px] pointer-events-none"
          />

          <div className="relative z-10 text-xs font-mono uppercase tracking-widest text-amber-gold mb-5">
            FINISH PREVIEW: {selectedFinish.name.toUpperCase()}
          </div>

          {productType === 'security' ? (
            /* Smart Biometric Door Lock Body Preview */
            <div
              className="relative z-10 w-44 sm:w-48 h-80 rounded-[32px] p-4 border-2 shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col justify-between items-center"
              style={{
                background: selectedFinish.panelBg,
                borderColor: selectedFinish.border,
                color: selectedFinish.textColor,
              }}
            >
              <div className="w-full rounded-2xl bg-black/85 py-3 px-4 flex items-center justify-between border border-white/10">
                <span className="w-3 h-3 rounded-full bg-cyan-electric/80 animate-pulse" />
                <span className="w-5 h-5 rounded-full bg-charcoal-800 border border-slate-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-gold/80" />
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center font-mono text-xs font-bold opacity-85">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((k) => (
                  <span key={k} className="w-8 h-7 rounded bg-black/20 flex items-center justify-center">
                    {k}
                  </span>
                ))}
              </div>

              <div
                className="w-14 h-14 rounded-full bg-black/80 border-2 flex items-center justify-center"
                style={{ borderColor: selectedFinish.ledColor }}
              >
                <div className="w-7 h-7 rounded-full border border-dashed border-cyan-electric" />
              </div>
            </div>
          ) : (
            /* Multi-Module Horizontal Smart Keypad + Universal Socket Preview (matching keypad-hero-wide.jpg) */
            <div
              className="relative z-10 w-full max-w-md rounded-xl p-2.5 sm:p-3 border-r-4 border shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300"
              style={{
                background: selectedFinish.panelBg,
                borderColor: selectedFinish.border,
                color: selectedFinish.textColor,
              }}
            >
              <div className="grid grid-cols-12 gap-1">
                {/* Left Module: AC / FAN, - / +, Curtain Close / Open */}
                <div className="col-span-4 grid grid-rows-3 gap-1">
                  <div
                    className="grid grid-cols-2 items-center text-center py-3 px-1 rounded-sm border border-black/20 text-[11px] font-sans font-semibold tracking-wider"
                    style={{ backgroundColor: selectedFinish.moduleBg, color: selectedFinish.ledColor }}
                  >
                    <span>AC</span>
                    <span>FAN</span>
                  </div>
                  <div
                    className="grid grid-cols-2 items-center text-center py-3 px-1 rounded-sm border border-black/20 text-sm font-mono font-bold"
                    style={{ backgroundColor: selectedFinish.moduleBg, color: selectedFinish.ledColor }}
                  >
                    <span>–</span>
                    <span>+</span>
                  </div>
                  <div
                    className="grid grid-cols-2 items-center text-center py-3 px-1 rounded-sm border border-black/20 text-xs font-mono"
                    style={{ backgroundColor: selectedFinish.moduleBg, color: selectedFinish.ledColor }}
                  >
                    <span>⋈</span>
                    <span>∏</span>
                  </div>
                </div>

                {/* Center Module: Two Tall Scene Rocker Paddles */}
                <div className="col-span-4 grid grid-cols-2 gap-1">
                  <div
                    className="rounded-sm border border-black/20 py-4 flex flex-col items-center justify-between"
                    style={{ backgroundColor: selectedFinish.moduleBg, color: selectedFinish.ledColor }}
                  >
                    <Sun className="w-4 h-4" />
                    <Tv className="w-4 h-4" />
                  </div>
                  <div
                    className="rounded-sm border border-black/20 py-4 flex flex-col items-center justify-between text-xs"
                    style={{ backgroundColor: selectedFinish.moduleBg, color: selectedFinish.ledColor }}
                  >
                    <span>🌅</span>
                    <span>🌙</span>
                  </div>
                </div>

                {/* Right Module: Integrated Universal Socket + USB-C */}
                <div
                  className="col-span-4 rounded-sm border border-black/20 p-2.5 flex flex-col justify-between items-center"
                  style={{ backgroundColor: selectedFinish.moduleBg }}
                >
                  <div className="w-full flex justify-end gap-1.5 pr-1">
                    <span className="w-1.5 h-3.5 rounded-sm bg-black/80 border border-white/20" />
                    <span className="w-2.5 h-4 rounded-sm bg-black/50 border border-white/20" />
                  </div>
                  <div className="w-11 h-11 rounded-md border border-black/25 flex flex-col items-center justify-center gap-1.5 py-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-black/85" />
                    <div className="flex gap-2.5">
                      <span className="w-2 h-2 rounded-sm bg-black/85" />
                      <span className="w-2 h-2 rounded-sm bg-black/85" />
                    </div>
                  </div>
                  <span className="text-[9px] font-mono opacity-75 tracking-wider">UNIVERSAL + USB</span>
                </div>
              </div>
            </div>
          )}

          <div className="relative z-10 mt-5 text-[11px] font-mono text-slate-400 text-center">
            AC & Fan Control • Curtain Triggers • Scene Rockers • Universal Socket + USB-C
          </div>
        </div>

        {/* Right: Clickable Swatch Selector */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              <span>Architectural Finishes</span>
            </div>
            <InteractiveCueBadge text="Click any swatch to try" accent="amber" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Crafted to Match Your Interior Palette
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {selectedFinish.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2" role="group" aria-label="Material Finish Swatches">
            {DEFAULT_FINISHES.map((swatch) => {
              const isSelected = selectedFinish.id === swatch.id;
              return (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => setSelectedFinish(swatch)}
                  aria-pressed={isSelected}
                  className={`min-h-[56px] p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-charcoal-800 border-amber-gold shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-charcoal-950/70 border-white/10 hover:border-white/25'
                  }`}
                >
                  <span
                    className="w-8 h-8 rounded-full border-2 shrink-0 flex items-center justify-center"
                    style={{
                      backgroundColor: swatch.hex,
                      borderColor: swatch.border,
                    }}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 ${
                          swatch.id === 'white' ? 'text-charcoal-950' : 'text-white'
                        }`}
                      />
                    )}
                  </span>
                  <div>
                    <div className="text-sm font-display font-bold text-white">{swatch.name}</div>
                    <div className={`text-[11px] ${isSelected ? 'text-amber-gold font-semibold' : 'text-cyan-electric/90'}`}>
                      {isSelected ? 'Selected Finish' : 'Click here to try →'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
