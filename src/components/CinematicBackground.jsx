import React, { useEffect, useRef } from 'react';

/**
 * CinematicBackground
 * Full-viewport, scroll-reactive background system engineered from the official
 * LUMORA SMART TECH logo colour palette:
 *   - Deep Midnight Obsidian & Sapphire Base (#02050B -> #040C1A -> #071932)
 *   - Electric Neon Cyan & Azure Rim Gradients (#00D2FF, #0088FF, #38BDF8)
 *   - Metallic Platinum Silver Specular Highlights (#E2E8F0, #94A3B8)
 *   - Subtle Architectural Warmth Accents (#F59E0B)
 *
 * Dynamically shifts gradient coordinates, rotates logo-inspired orbital light rings,
 * and parallaxes luminous smart-home circuit nodes smoothly as the user scrolls.
 */
export default function CinematicBackground() {
  const containerRef = useRef(null);
  const orbPrimaryRef = useRef(null);
  const orbSecondaryRef = useRef(null);
  const orbWarmRef = useRef(null);
  const ringLeftRef = useRef(null);
  const ringRightRef = useRef(null);
  const gridLayerRef = useRef(null);
  const chevronWatermarkRef = useRef(null);
  const progressBeamRef = useRef(null);

  useEffect(() => {
    // Detect iOS / iPadOS / touch-mobile devices to prevent WebKit GPU memory exhaustion & scroll freezes
    const isTouchOrIOS =
      typeof window !== 'undefined' &&
      (window.matchMedia('(max-width: 1024px)').matches ||
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    let rafId = null;
    let currentScroll = window.scrollY || 0;
    let targetScroll = window.scrollY || 0;

    const updateScrollTransforms = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      // Lightweight path for iOS / Mobile / Tablet: only update the top progress bar (zero heavy GPU layer thrashing)
      if (isTouchOrIOS) {
        const progress = Math.min(1, Math.max(0, targetScroll / maxScroll));
        if (progressBeamRef.current) {
          progressBeamRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
        }
        rafId = null;
        return;
      }

      // Smooth interpolation for desktop cinematic inertia while scrolling
      currentScroll += (targetScroll - currentScroll) * 0.12;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));

      // 1. Primary Logo Cyan/Sapphire Aurora Orb — moves diagonally & shifts scale with scroll
      if (orbPrimaryRef.current) {
        const x = Math.sin(currentScroll * 0.0018) * 18;
        const y = (progress * 42) - 10;
        const rot = currentScroll * 0.045;
        orbPrimaryRef.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg)`;
      }

      // 2. Secondary Deep Electric Blue & Platinum Orb — counter-moves on scroll
      if (orbSecondaryRef.current) {
        const x = Math.cos(currentScroll * 0.0015) * -20;
        const y = 30 - progress * 48;
        const rot = -currentScroll * 0.035;
        orbSecondaryRef.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg)`;
      }

      // 3. Ambient Warm Interior Accent Orb — drifts gently across mid-screen
      if (orbWarmRef.current) {
        const x = Math.sin(currentScroll * 0.0012 + 1.4) * 24;
        const y = Math.cos(currentScroll * 0.001) * 16;
        orbWarmRef.current.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
      }

      // 4. Logo-Inspired Neon Cyan Orbital Ring (Top-Right -> scrolls & rotates)
      if (ringRightRef.current) {
        const yOffset = -currentScroll * 0.18;
        const rot = currentScroll * 0.08;
        ringRightRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rot}deg)`;
      }

      // 5. Logo-Inspired Neon Cyan Orbital Ring (Bottom-Left -> counter-scrolls & rotates)
      if (ringLeftRef.current) {
        const yOffset = currentScroll * 0.14;
        const rot = -currentScroll * 0.06;
        ringLeftRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rot}deg)`;
      }

      // 6. Subtle Architectural Perspective Grid & Circuit Nodes parallax
      if (gridLayerRef.current) {
        const gridY = -(currentScroll * 0.22) % 80;
        gridLayerRef.current.style.transform = `translate3d(0, ${gridY}px, 0)`;
      }

      // 7. Giant Metallic Chevron Watermark (Center background parallax)
      if (chevronWatermarkRef.current) {
        const chevY = (progress - 0.5) * -140;
        const chevScale = 1 + Math.sin(progress * Math.PI) * 0.08;
        chevronWatermarkRef.current.style.transform = `translate3d(-50%, calc(-50% + ${chevY}px), 0) scale(${chevScale.toFixed(3)})`;
      }

      // 8. Top Scroll Progress Cyan Laser Beam
      if (progressBeamRef.current) {
        progressBeamRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      if (Math.abs(targetScroll - currentScroll) > 0.4) {
        rafId = requestAnimationFrame(updateScrollTransforms);
      } else {
        rafId = null;
      }
    };

    const handleScroll = () => {
      targetScroll = window.scrollY || 0;
      if (!rafId) {
        rafId = requestAnimationFrame(updateScrollTransforms);
      }
    };

    // Initial position calculation
    updateScrollTransforms();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Top Scroll Progress Laser Line matching Logo's Neon Cyan Rim */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/5 overflow-hidden">
        <div
          ref={progressBeamRef}
          style={{
            transform: 'scaleX(0)',
            transformOrigin: '0% 50%',
            background:
              'linear-gradient(90deg, #0077FF 0%, #00D2FF 55%, #E0F2FE 85%, #F59E0B 100%)',
            boxShadow: '0 0 16px rgba(0, 210, 255, 0.9)',
          }}
          className="w-full h-full will-change-transform"
        />
      </div>

      {/* Fixed Full-Viewport Scroll-Reactive Gradient Stage */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 0%, #071936 0%, #040B18 48%, #02050C 100%)',
        }}
      >
        <style>{`
          @keyframes lumoraAuroraPulse {
            0%, 100% { opacity: 0.78; }
            50% { opacity: 1; }
          }
          @keyframes lumoraNodeTwinkle {
            0%, 100% { opacity: 0.25; transform: scale(0.85); }
            50% { opacity: 0.9; transform: scale(1.2); }
          }
        `}</style>

        {/* 1. Primary Logo-Matched Electric Cyan & Deep Sapphire Gradient Nebula (Desktop only — avoids iOS WebKit GPU crash) */}
        <div
          ref={orbPrimaryRef}
          className="hidden lg:block absolute -top-[18vh] left-[12vw] w-[78vw] h-[78vw] max-w-[920px] max-h-[920px] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(0, 210, 255, 0.24) 0%, rgba(0, 128, 255, 0.15) 36%, rgba(8, 36, 78, 0.08) 62%, transparent 76%)',
            filter: 'blur(55px)',
            animation: 'lumoraAuroraPulse 7s ease-in-out infinite',
          }}
        />

        {/* 2. Secondary Deep Sapphire & Metallic Silver Rim Nebula (Desktop only) */}
        <div
          ref={orbSecondaryRef}
          className="hidden lg:block absolute top-[28vh] right-[4vw] w-[72vw] h-[72vw] max-w-[860px] max-h-[860px] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 60% 50%, rgba(56, 189, 248, 0.20) 0%, rgba(14, 116, 214, 0.14) 38%, rgba(226, 232, 240, 0.05) 58%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />

        {/* 3. Subtle Warm Architectural Interior Glow (Desktop only) */}
        <div
          ref={orbWarmRef}
          className="hidden lg:block absolute top-[42vh] left-[28vw] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.10) 0%, rgba(0, 180, 255, 0.08) 45%, transparent 72%)',
            filter: 'blur(65px)',
          }}
        />

        {/* 4. Scrolling Architectural Cyber-Mesh Grid Layer (Desktop only) */}
        <div
          ref={gridLayerRef}
          className="hidden lg:block absolute -inset-[120px] opacity-30 will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage:
              'radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 90%)',
          }}
        />

        {/* 5. Logo-Inspired Giant Rotating Neon-Cyan Orbital Ring (Desktop only) */}
        <div
          ref={ringRightRef}
          className="hidden lg:block absolute -top-[180px] -right-[220px] w-[640px] h-[640px] sm:w-[780px] sm:h-[780px] rounded-full opacity-45 will-change-transform"
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <defs>
              <linearGradient id="bgLogoOrbit1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#00D2FF" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#0066FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.65" />
              </linearGradient>
            </defs>
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="url(#bgLogoOrbit1)"
              strokeWidth="2"
            />
            <circle
              cx="300"
              cy="300"
              r="242"
              fill="none"
              stroke="rgba(56, 189, 248, 0.18)"
              strokeWidth="1"
              strokeDasharray="8 14"
            />
            {/* Glowing orbital flare node */}
            <circle cx="491" cy="109" r="5" fill="#E0F2FE" />
            <circle cx="491" cy="109" r="14" fill="rgba(0, 210, 255, 0.35)" />
          </svg>
        </div>

        {/* 6. Logo-Inspired Counter-Rotating Neon-Cyan Orbital Ring (Desktop only) */}
        <div
          ref={ringLeftRef}
          className="hidden lg:block absolute -bottom-[240px] -left-[240px] w-[620px] h-[620px] sm:w-[760px] sm:h-[760px] rounded-full opacity-40 will-change-transform"
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <defs>
              <linearGradient id="bgLogoOrbit2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#0284C7" stopOpacity="0.12" />
                <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <circle
              cx="300"
              cy="300"
              r="265"
              fill="none"
              stroke="url(#bgLogoOrbit2)"
              strokeWidth="2"
            />
            <circle cx="112" cy="488" r="5" fill="#38BDF8" />
            <circle cx="112" cy="488" r="14" fill="rgba(0, 210, 255, 0.35)" />
          </svg>
        </div>

        {/* 7. Subtle Center Parallax Metallic Chevron Emblem Watermark (Desktop only) */}
        <div
          ref={chevronWatermarkRef}
          style={{ left: '50%', top: '52%' }}
          className="hidden lg:block absolute w-[460px] h-[460px] sm:w-[640px] sm:h-[640px] opacity-[0.045] will-change-transform"
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path
              d="M35 98 L100 50 L165 98 L165 135 L100 88 L35 135 Z"
              stroke="#38BDF8"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M52 128 L100 94 L148 128"
              stroke="#E2E8F0"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 8. Ambient Twinkling Smart-Home Mesh Nodes */}
        {[
          { left: '14%', top: '22%', delay: '0s' },
          { left: '84%', top: '18%', delay: '1.2s' },
          { left: '76%', top: '68%', delay: '2.1s' },
          { left: '22%', top: '74%', delay: '0.7s' },
          { left: '52%', top: '34%', delay: '1.7s' },
        ].map((node, i) => (
          <div
            key={i}
            style={{
              left: node.left,
              top: node.top,
              animation: `lumoraNodeTwinkle 4.5s ease-in-out ${node.delay} infinite`,
            }}
            className="absolute w-2 h-2 rounded-full bg-cyan-electric shadow-[0_0_14px_#00D2FF]"
          />
        ))}

        {/* Soft Vignette framing so typography & cards remain ultra-crisp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 55%, rgba(2, 5, 12, 0.55) 100%)',
          }}
        />
      </div>
    </>
  );
}
