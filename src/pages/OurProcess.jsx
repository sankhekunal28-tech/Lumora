import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQAccordion from '../components/FAQAccordion';
import { OUR_PROCESS_STEPS } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

export default function OurProcess() {
  const { openInquiry } = useInquiry();

  return (
    <>
      <SEOHead
        title="Our 5-Step Smart Home Installation Process | Lumora Smart Tech"
        description="From Consultation and Home Assessment to Custom Design, Installation, and PAN-India Handover & Support — see how Lumora Smart Tech delivers."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>End-to-End White-Glove Delivery</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Five Clear Steps From Consultation to Handover
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We handle every technical detail so your transition to an automated home is predictable, clean, and effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Five-Step Timeline */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {OUR_PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="rounded-3xl bg-charcoal-900 border border-white/15 p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 shadow-xl relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-gold/15 border border-amber-gold/40 text-amber-gold font-display font-extrabold text-2xl flex items-center justify-center shrink-0">
                  {item.step}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-electric">
                    <span>STAGE {item.step} OF 05</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white">{item.title}</h2>
                  <p className="text-slate-200 font-medium text-sm sm:text-base">{item.summary}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.details}</p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-gold" />
                    <span>Step {idx + 1}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => openInquiry({ sourceLabel: 'Our Process Page — Start Step 1 Consultation' })}
              className="min-h-[52px] px-8 py-3.5 rounded-2xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-display font-bold text-base inline-flex items-center gap-2 transition-colors"
            >
              <span>Start Step 01: Book Your Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </>
  );
}
