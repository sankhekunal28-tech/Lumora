import React from 'react';

/**
 * LUMORA SMART TECH — Official Brand Logo Component
 * Uses the official circular emblem (`/assets/reference/lumora-logo.jpg`)
 * featuring the 3D brushed-silver chevron roof mark, neon-cyan orbital ring,
 * metallic LUMORA wordmark with the cyan inner-triangle 'A', and smart-home circuit icon.
 */
export default function LumoraLogo({
  className = '',
  showTagline = false,
  variant = 'lockup', // 'lockup' | 'emblem'
}) {
  if (variant === 'emblem') {
    return (
      <div className={`relative inline-flex items-center justify-center select-none group ${className}`}>
        {/* Outer Neon-Cyan Orbital Glow */}
        <div
          className="pointer-events-none absolute -inset-2 rounded-full opacity-75 group-hover:opacity-100 blur-md transition-opacity duration-500"
          style={{
            background:
              'conic-gradient(from 45deg, rgba(0,210,255,0.65), rgba(0,119,255,0.15), rgba(224,242,254,0.7), rgba(0,119,255,0.15), rgba(0,210,255,0.65))',
          }}
        />
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-cyan-electric/70 bg-[#02060D] p-1 shadow-[0_0_45px_rgba(0,210,255,0.4)]">
          <img
            src="/assets/reference/lumora-logo.jpg"
            alt="LUMORA SMART TECH Official Logo"
            className="w-full h-full object-contain object-center rounded-full"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3.5 select-none group min-w-0 ${className}`}>
      {/* Official Circular Lumora Emblem with Glowing Cyan Orbital Ring */}
      <div
        className={`relative ${
          showTagline ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-10 h-10 sm:w-13 sm:h-13'
        } rounded-full overflow-hidden bg-[#02060D] p-0.5 border border-cyan-electric/65 shadow-[0_0_20px_rgba(0,210,255,0.38)] group-hover:shadow-[0_0_28px_rgba(0,210,255,0.68)] group-hover:border-cyan-200 transition-all duration-300 shrink-0`}
      >
        <img
          src="/assets/reference/lumora-logo.jpg"
          alt="LUMORA SMART TECH Official Emblem"
          className="w-full h-full object-contain object-center rounded-full transition-transform duration-500"
          draggable={false}
        />
      </div>

      {/* Metallic Wordmark Matching Logo Typography & Cyan-Core 'A' */}
      <div className="flex flex-col leading-none min-w-0">
        <div className="flex items-baseline font-display font-extrabold tracking-[0.15em] sm:tracking-[0.22em] text-sm sm:text-lg">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 48%, #94A3B8 100%)',
              filter: 'drop-shadow(0 0 10px rgba(0, 210, 255, 0.25))',
            }}
          >
            LUMOR
          </span>
          {/* Custom 'A' with metallic outer frame and glowing cyan inner triangle matching the logo */}
          <span className="relative inline-flex items-center justify-center ml-[1px]">
            <svg
              viewBox="0 0 22 20"
              className="w-[15px] h-[14px] sm:w-[17px] sm:h-[16px] overflow-visible"
              aria-label="A"
            >
              <defs>
                <linearGradient id="lumoraWordmarkSilver" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>
              {/* Outer Metallic Silver Chevron of 'A' */}
              <path
                d="M11 1.5 L20.5 19 H16.2 L11 8.8 L5.8 19 H1.5 L11 1.5 Z"
                fill="url(#lumoraWordmarkSilver)"
              />
              {/* Glowing Cyan Inner Delta Triangle of 'A' */}
              <path
                d="M11 11.8 L14.8 18.8 L11 17.2 L7.2 18.8 Z"
                fill="#00D2FF"
                style={{ filter: 'drop-shadow(0 0 5px #00D2FF)' }}
              />
            </svg>
          </span>
        </div>

        {/* — S M A R T   T E C H — Subtitle with Cyan Circuit Lines */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-3 sm:w-4 h-[1px] bg-gradient-to-r from-transparent to-cyan-electric" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-slate-200 font-semibold uppercase">
            Smart Tech
          </span>
          <span className="w-3 sm:w-4 h-[1px] bg-gradient-to-l from-transparent to-cyan-electric" />
        </div>

        {showTagline && (
          <span className="text-[10px] text-cyan-electric/90 tracking-[0.24em] mt-1 font-mono">
            PAN INDIA AUTOMATION
          </span>
        )}
      </div>
    </div>
  );
}
