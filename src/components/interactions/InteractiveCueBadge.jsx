import React from 'react';
import { MousePointerClick } from 'lucide-react';

/**
 * InteractiveCueBadge
 * Minimal, luxury interactive intimation pill that subtly prompts the user
 * to click, tap, or drag interactive controls across the website.
 */
export default function InteractiveCueBadge({
  text = 'Click here to try',
  accent = 'cyan', // 'cyan' | 'amber'
  className = '',
}) {
  const isAmber = accent === 'amber';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase border backdrop-blur-md select-none max-w-full transition-all duration-300 ${
        isAmber
          ? 'bg-amber-gold/15 border-amber-gold/50 text-amber-gold shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          : 'bg-cyan-electric/15 border-cyan-electric/50 text-cyan-electric shadow-[0_0_15px_rgba(0,210,255,0.2)]'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isAmber ? 'bg-amber-gold' : 'bg-cyan-electric'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isAmber ? 'bg-amber-gold' : 'bg-cyan-electric'
          }`}
        />
      </span>
      <MousePointerClick className="w-3.5 h-3.5 shrink-0 animate-bounce" style={{ animationDuration: '2.2s' }} />
      <span className="truncate">{text}</span>
    </span>
  );
}
