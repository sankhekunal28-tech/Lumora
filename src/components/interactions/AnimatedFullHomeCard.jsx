import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Sun, MousePointerClick } from 'lucide-react';

/**
 * AnimatedFullHomeCard
 * Renders the "Full-Home Integration / Combine Any or All Five Categories" card
 * featuring `/assets/reference/full-home-integration.jpg` (1024x576, 16:9) with:
 *   1. Continuous smooth Dim-to-Bright animation lighting up the luxury living room
 *   2. Synchronized highlight & golden shimmer over the image text:
 *      "Your search for the perfect Home Automation Company ends here!"
 *   3. Updated description: "Start with a single living room keypad and curtain track,
 *      or automate your apartment or villa — our wireless mesh scales effortlessly."
 */
export default function AnimatedFullHomeCard({ onOpenInquiry, sourceLabel = 'Solutions Hub — Full-Home Quote' }) {
  const [isBright, setIsBright] = useState(true);

  // Automatically cycle between Dim Room (15%) and Bright Room + Highlighted Text (100%)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBright((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group relative rounded-3xl bg-charcoal-900/95 border border-cyan-electric/35 hover:border-amber-gold/60 overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between shadow-xl">
      <style>{`
        @keyframes fullHomeTextSweep {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          25% { opacity: 0.95; }
          75% { opacity: 0.95; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        @keyframes fullHomeLampPulse {
          0%, 100% { opacity: 0.65; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>

      {/* Top 16:9 Image Stage with Dim-to-Bright Room Lighting & Text Highlight Animation */}
      <div
        style={{ aspectRatio: '16 / 9' }}
        onClick={() => setIsBright((prev) => !prev)}
        className="relative w-full overflow-hidden bg-charcoal-950 cursor-pointer select-none"
        title="Click to toggle Dim-to-Bright room lighting animation"
      >
        {/* LAYER 1: DIMMED ROOM STATE (15% Low Evening Dim) */}
        <img
          src="/assets/reference/full-home-integration.jpg"
          alt="Luxury automated living room — Your search for the perfect Home Automation Company ends here"
          style={{
            filter: 'brightness(0.26) contrast(1.1) saturate(0.65)',
          }}
          className="w-full h-full object-cover object-center block"
          draggable={false}
        />

        {/* LAYER 2: BRIGHT ILLUMINATED ROOM STATE (100% Warm Architectural Brightness) */}
        <img
          src="/assets/reference/full-home-integration.jpg"
          alt=""
          aria-hidden="true"
          style={{
            opacity: isBright ? 1 : 0,
            filter: 'brightness(1.12) contrast(1.05) saturate(1.12)',
            transition: 'opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="absolute inset-0 w-full h-full object-cover object-center block"
          draggable={false}
        />

        {/* LAYER 3: ARCHITECTURAL LIGHT FIXTURE BLOOMS (Cove, Sconces, Floor Lamp, Table Lamp) */}
        <div
          style={{
            opacity: isBright ? 1 : 0,
            transition: 'opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          {/* Ceiling Cove Warm Wash */}
          <div
            style={{
              left: '6%',
              top: '0%',
              width: '88%',
              height: '20%',
              background:
                'radial-gradient(ellipse at center, rgba(251,191,36,0.34) 0%, rgba(245,158,11,0.12) 55%, transparent 80%)',
              animation: 'fullHomeLampPulse 3.2s ease-in-out infinite',
            }}
            className="absolute"
          />

          {/* Left Wall Art Sconces & Crystal Table Lamp Glow */}
          <div
            style={{
              left: '11%',
              top: '12%',
              width: '20%',
              height: '58%',
              background:
                'radial-gradient(ellipse at center, rgba(245,158,11,0.32) 0%, transparent 72%)',
              animation: 'fullHomeLampPulse 3.6s ease-in-out 0.4s infinite',
            }}
            className="absolute"
          />

          {/* Right Curved Floor Lamp Cone Glow */}
          <div
            style={{
              left: '70%',
              top: '28%',
              width: '24%',
              height: '38%',
              background:
                'radial-gradient(ellipse at center, rgba(254,240,138,0.38) 0%, rgba(245,158,11,0.18) 50%, transparent 75%)',
              animation: 'fullHomeLampPulse 3s ease-in-out 0.8s infinite',
            }}
            className="absolute"
          />

          {/* Far Right Display Shelving Glow */}
          <div
            style={{
              right: '0%',
              top: '14%',
              width: '10%',
              height: '65%',
              background:
                'radial-gradient(ellipse at center, rgba(245,158,11,0.35) 0%, transparent 75%)',
            }}
            className="absolute"
          />
        </div>

        {/* LAYER 4: CENTER TEXT HIGHLIGHT & SHIMMER ("Your search for the perfect Home Automation Company ends here!") */}
        <div
          style={{
            left: '13%',
            top: '26%',
            width: '76%',
            height: '29%',
            opacity: isBright ? 1 : 0,
            transition: 'opacity 1100ms ease-out 250ms',
          }}
          className="pointer-events-none absolute z-20 overflow-hidden rounded-2xl"
        >
          {/* Warm Golden Spotlight Behind the Text in the Image */}
          <div
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(254,249,195,0.28) 0%, rgba(245,158,11,0.16) 48%, transparent 78%)',
              mixBlendMode: 'screen',
            }}
            className="absolute inset-0"
          />

          {/* Sweeping Specular Light Highlight Bar Across the Image Text */}
          {isBright && (
            <div
              style={{
                width: '45%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 45%, rgba(251,191,36,0.55) 55%, transparent 100%)',
                mixBlendMode: 'overlay',
                animation: 'fullHomeTextSweep 2.8s ease-in-out infinite',
              }}
              className="absolute top-0 left-0"
            />
          )}

          {/* Subtle Glowing Accent Underline Highlighting the Text */}
          <div
            style={{
              left: '28%',
              bottom: '4%',
              width: '44%',
              height: '2px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.95) 50%, transparent 100%)',
              boxShadow: '0 0 14px rgba(245,158,11,0.9)',
            }}
            className="absolute rounded-full"
          />
        </div>

        {/* Top-Left Badge inside Image Frame */}
        <div className="absolute top-3.5 left-3.5 z-30">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-charcoal-950/85 text-cyan-electric border border-cyan-electric/40 backdrop-blur-md">
            FULL-HOME INTEGRATION
          </span>
        </div>

        {/* Top-Right Subtle Click Prompt Pill */}
        <div className="absolute top-3.5 right-3.5 z-30">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-charcoal-950/85 text-amber-gold border border-amber-gold/40 backdrop-blur-md inline-flex items-center gap-1">
            <MousePointerClick className="w-3 h-3 animate-bounce" style={{ animationDuration: '2.2s' }} />
            <span>Click to Dim / Brighten</span>
          </span>
        </div>

        {/* Bottom-Center Live Dim-to-Bright Status Pill */}
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap">
          <div
            className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all duration-500 ${
              isBright
                ? 'bg-charcoal-950/90 border-amber-gold/55 text-amber-gold'
                : 'bg-charcoal-950/90 border-white/20 text-slate-300'
            }`}
          >
            <Sun
              className={`w-3 h-3 ${
                isBright ? 'text-amber-gold animate-spin' : 'text-slate-400'
              }`}
              style={{ animationDuration: '8s' }}
            />
            <span>
              {isBright
                ? 'Scene Bright 100% • Ambience Highlighted'
                : 'Scene Dimmed 15% • Warming Up...'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-electric mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-gold" />
            <span>Complete Home Package</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-amber-gold transition-colors">
            Combine Any or All Five Categories
          </h3>
          <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
            Start with a single living room keypad and curtain track, or automate your apartment or villa — our wireless mesh scales effortlessly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenInquiry({ sourceLabel })}
          className="mt-5 w-full min-h-[48px] px-5 py-3 rounded-xl bg-cyan-electric hover:bg-cyan-glow text-charcoal-950 font-display font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
        >
          <span>Get a Custom Package Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
