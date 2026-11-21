import React, { useState, useRef } from 'react';
import { MoveHorizontal, Sparkles, CheckCircle2 } from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

/**
 * @Interaction8 — Before/After Renovation Slider
 * Pixel-aligned drag-to-reveal comparison using the exact matching 9:16 room photography:
 * - BEFORE: "/assets/reference/switchboard-before.jpg" (Traditional plastic switchboard)
 * - AFTER:  "/assets/reference/keypad-modular-panel.jpg" (Sleek Lumora Smart Keypad panel)
 * Both images share the exact 9:16 (576x1024) frame and remain 100% visible with zero cropping.
 */
export default function BeforeAfterSlider() {
  const [splitPct, setSplitPct] = useState(50);
  const containerRef = useRef(null);

  const updateFromClientX = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    setSplitPct(pct);
  };

  const handleMouseDown = (e) => {
    updateFromClientX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    updateFromClientX(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    updateFromClientX(e.touches[0].clientX);
  };

  return (
    <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Copy, Controls & Retrofit Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-xs font-semibold uppercase tracking-widest text-amber-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Rewiring Retrofit Comparison</span>
              </span>
              <InteractiveCueBadge text="Drag divider or click buttons to compare" accent="amber" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mt-4 leading-tight">
              From Cluttered Plastic Switchboards to One Sleek Lumora Panel
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Drag the vertical slider across the wall below to see how an ageing plastic switchboard transforms into a flush Lumora Smart Keypad & Universal Socket panel — installed on the exact same wall box with zero wall breakage.
            </p>
          </div>

          {/* Retrofit Key Points */}
          <ul className="space-y-3 text-sm text-slate-200">
            {[
              'Fits your existing modular wall box — no chiselling, dust, or repainting',
              'Consolidates Light, Fan, Curtain, Scene & Universal Power into one flush frame',
              'Backlit laser-etched icons remain easy to read day and night',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-gold shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Accessible Range Slider + Quick Preset Buttons */}
          <div className="p-5 rounded-2xl bg-charcoal-950/90 border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
              <span className="text-slate-300">
                Before: Old Switchboard ({splitPct}%)
              </span>
              <span className="text-amber-gold font-semibold">
                After: Lumora Keypad ({100 - splitPct}%)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={splitPct}
                aria-label="Horizontal comparison slider between traditional switchboard and Lumora keypad"
                onChange={(e) => setSplitPct(Number(e.target.value))}
                className="w-full lumora-range bg-white/15 rounded-full h-2"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setSplitPct(92)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  splitPct > 75
                    ? 'bg-white/15 text-white border-white/40'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
              >
                View Before (Old Switchboard)
              </button>
              <button
                type="button"
                onClick={() => setSplitPct(50)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  splitPct >= 40 && splitPct <= 60
                    ? 'bg-cyan-tech/20 text-cyan-electric border-cyan-electric/50'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
              >
                50 / 50 Split
              </button>
              <button
                type="button"
                onClick={() => setSplitPct(8)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  splitPct < 25
                    ? 'bg-amber-gold text-charcoal-950 border-amber-gold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-amber-gold/15 hover:bg-amber-gold/25 border-amber-gold/40 text-amber-gold'
                }`}
              >
                View After (Lumora Upgrade)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Exact 9:16 (576x1024) Full-Image Pixel-Aligned Comparison Stage */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            style={{ aspectRatio: '576 / 1024' }}
            className="relative w-full max-w-[360px] sm:max-w-[420px] rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)] select-none cursor-ew-resize bg-charcoal-950"
          >
            {/* LAYER 1 (BASE — 100% FULL FRAME): AFTER — Sleek Lumora Smart Keypad Panel */}
            <img
              src="/assets/reference/keypad-modular-panel.jpg"
              alt="After: Sleek Lumora Smart Keypad Panel on warm stone wall"
              draggable={false}
              className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
            />

            {/* LAYER 2 (CLIPPED — 100% FULL FRAME OVERLAY): BEFORE — Traditional Plastic Switchboard */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              style={{ clipPath: `inset(0 ${100 - splitPct}% 0 0)` }}
            >
              <img
                src="/assets/reference/switchboard-before.jpg"
                alt="Before: Traditional plastic switchboard on the same stone wall"
                draggable={false}
                className="w-full h-full object-fill"
              />
            </div>

            {/* Top Corner Badges (Before on Left, After on Right) */}
            <div
              className="absolute top-3.5 left-3.5 z-10 px-3 py-1.5 rounded-lg bg-charcoal-950/85 backdrop-blur-md border border-white/20 text-[11px] font-display font-bold uppercase tracking-wider text-slate-200 pointer-events-none transition-opacity duration-200"
              style={{ opacity: splitPct > 14 ? 1 : 0 }}
            >
              Before: Old Switchboard
            </div>
            <div
              className="absolute top-3.5 right-3.5 z-10 px-3 py-1.5 rounded-lg bg-charcoal-950/85 backdrop-blur-md border border-amber-gold/50 text-[11px] font-display font-bold uppercase tracking-wider text-amber-gold pointer-events-none transition-opacity duration-200"
              style={{ opacity: splitPct < 86 ? 1 : 0 }}
            >
              After: Lumora Keypad
            </div>

            {/* Vertical Divider Line & Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-gold shadow-[0_0_20px_#F59E0B] pointer-events-none z-20"
              style={{ left: `${splitPct}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-amber-gold text-charcoal-950 border-4 border-charcoal-950 shadow-[0_0_25px_rgba(245,158,11,0.8)] flex items-center justify-center">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
