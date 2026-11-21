import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SAMPLE_FAQ } from '../data/siteData';
import InteractiveCueBadge from './interactions/InteractiveCueBadge';

/**
 * Accessible FAQ Accordion Component using @SampleFAQ placeholder entries.
 */
export default function FAQAccordion({
  items = SAMPLE_FAQ,
  title = 'Frequently Asked Questions',
  subtitle = 'Clear answers on wireless installation, retrofitting, and PAN-India support.',
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="py-16 md:py-24 bg-charcoal-900/60 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/25 text-amber-gold text-xs font-medium tracking-wider uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Questions</span>
            </div>
            <InteractiveCueBadge text="Click any question to expand" accent="amber" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* [PLACEHOLDER — @SampleFAQ rendered below] */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${item.id || idx}`;
            const btnId = `faq-btn-${item.id || idx}`;

            return (
              <div
                key={item.id || idx}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-charcoal-850 border-amber-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
                    : 'bg-charcoal-900/90 border-white/10 hover:border-white/20'
                }`}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    className="w-full min-h-[56px] px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-electric rounded-2xl"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-white">
                      {item.question}
                    </span>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-amber-gold text-charcoal-950 rotate-180'
                          : 'bg-white/5 text-slate-300'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
