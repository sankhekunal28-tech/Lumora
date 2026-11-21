import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MousePointerClick } from 'lucide-react';
import AnimatedCurtainPreview from './AnimatedCurtainStage';
import AnimatedClimatePreview from './AnimatedClimateStage';
import AnimatedSecurityPreview from './AnimatedSecurityStage';
import AnimatedSensorPreview from './AnimatedSensorStage';

/**
 * @Interaction12 — Magnetic Hover Product Cards
 * Category cards on the homepage & solutions hub that gently scale/tilt toward the cursor
 * with a soft accent-colour glow on desktop; falls back cleanly to a plain tap state on mobile/tablet.
 */
export default function MagneticProductCard({ category, index = 0 }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, active: false });

  const handleMouseMove = (e) => {
    // Only apply magnetic tilt on desktop pointer devices
    if (window.innerWidth < 1024 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    const glowX = Math.round((x / rect.width) * 100);
    const glowY = Math.round((y / rect.height) * 100);

    setTilt({ rotateX, rotateY, glowX, glowY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, active: false });
  };

  const isCyan = category.accent === 'cyan';

  return (
    <Link
      ref={cardRef}
      to={category.path}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active
          ? `perspective(900px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      }}
      className="group relative rounded-3xl bg-charcoal-900/90 border border-white/10 hover:border-amber-gold/50 overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-electric"
    >
      {/* Dynamic Cursor-Following Glow (Desktop) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(380px circle at ${tilt.glowX}% ${tilt.glowY}%, ${
            isCyan ? 'rgba(34, 211, 238, 0.16)' : 'rgba(245, 158, 11, 0.18)'
          }, transparent 75%)`,
        }}
      />

      {/* Top Image Banner (16:9 Full-Visibility Aspect Ratio) */}
      <div style={{ aspectRatio: '16 / 9' }} className="relative w-full overflow-hidden bg-charcoal-950">
        {category.id === 'curtain-motors' ? (
          <AnimatedCurtainPreview compactBadge />
        ) : category.id === 'climate-control' ? (
          <AnimatedClimatePreview compact />
        ) : category.id === 'security' ? (
          <AnimatedSecurityPreview compact />
        ) : category.id === 'sensors' ? (
          <AnimatedSensorPreview compact />
        ) : (
          <img
            src={category.image}
            alt={category.name}
            loading={index > 1 ? 'lazy' : 'eager'}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />

        <div className="absolute top-3.5 left-3.5 z-20">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border backdrop-blur-md ${
              isCyan
                ? 'bg-charcoal-950/85 text-cyan-electric border-cyan-tech/40'
                : 'bg-charcoal-950/85 text-amber-gold border-amber-gold/40'
            }`}
          >
            0{index + 1} • {category.shortTitle}
          </span>
        </div>

        <div className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-charcoal-950/85 border border-white/15 flex items-center justify-center text-white group-hover:bg-amber-gold group-hover:text-charcoal-950 transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-gold transition-colors">
            {category.name}
          </h3>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {category.tagline}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 text-slate-300 group-hover:text-white transition-colors">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isCyan ? 'bg-cyan-electric' : 'bg-amber-gold'
              }`}
            />
            <MousePointerClick
              className={`w-3.5 h-3.5 ${
                isCyan ? 'text-cyan-electric' : 'text-amber-gold'
              }`}
            />
            <span>Click to Try Live Demo</span>
          </span>
          <span className={isCyan ? 'text-cyan-electric' : 'text-amber-gold'}>
            View Solution →
          </span>
        </div>
      </div>
    </Link>
  );
}
