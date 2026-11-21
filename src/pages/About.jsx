import React from 'react';
import { ShieldCheck, Sparkles, MapPin, Users, ArrowRight, Gem } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LumoraLogo from '../components/LumoraLogo';
import { COMPANY_FACTS, SAMPLE_FOUNDER_STORY, SAMPLE_TRUST_METRICS } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

export default function About() {
  const { openInquiry } = useInquiry();

  return (
    <>
      <SEOHead
        title="About Us | Lumora Smart Tech — Founded 2025"
        description="Meet Kunal Sankhe (Founder) of LUMORA SMART TECH. Bringing reliable, architectural smart-home automation PAN India."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-electric/10 border border-cyan-electric/35 text-cyan-electric text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Founded {COMPANY_FACTS.founded} • {COMPANY_FACTS.serviceArea}</span>
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Where Architectural Luxury Meets Effortless Home Control
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {COMPANY_FACTS.positioning}.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <LumoraLogo variant="emblem" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section using @SampleFounderStory */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founding Story Card */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-electric">
                Our Founding Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Built on a Simple Belief
              </h2>

              {/* [PLACEHOLDER — @SampleFounderStory: exact copy from specification, do not invent extra biographical facts] */}
              <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-900 border border-amber-gold/30 text-slate-100 text-lg sm:text-xl font-serif italic leading-relaxed shadow-xl">
                “{SAMPLE_FOUNDER_STORY}”
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                At {COMPANY_FACTS.name}, every system is engineered around the homeowner — whether you are planning a renovation of a lived-in apartment or designing a new residence from scratch.
              </p>
            </div>

            {/* Right: Founder Portrait Card (Kunal Sankhe) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-[#071428] via-charcoal-900 to-[#040B16] border border-amber-gold/35 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] group">
                <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-charcoal-950">
                  <img
                    src={COMPANY_FACTS.founderPhoto}
                    alt={`${COMPANY_FACTS.founder} — Founder of ${COMPANY_FACTS.name}`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-[#040B16]/25 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#02060D]/85 backdrop-blur-md border border-amber-gold/45 text-[11px] font-mono uppercase tracking-widest text-amber-gold">
                      Founder • Est. {COMPANY_FACTS.founded}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-2 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric">
                    Founder &amp; Visionary
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {COMPANY_FACTS.founder}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {COMPANY_FACTS.name} • {COMPANY_FACTS.serviceArea}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Core Values: Reliability, Aesthetics, PAN-India Accessibility */}
      <section className="py-20 bg-charcoal-900/70 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
              Mission & Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Three Principles That Guide Every Installation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Uncompromising Reliability',
                icon: ShieldCheck,
                accent: 'amber',
                description:
                  'Smart homes must work every single time you press a switch. Our wireless systems respond instantaneously and retain full wall-switch control at all times.',
              },
              {
                title: 'Interior-Studio Aesthetics',
                icon: Gem,
                accent: 'cyan',
                description:
                  'We replace cluttered plastic switchboards with matte black, brushed steel, warm brass, and alabaster glass keypads that elevate your interior architecture.',
              },
              {
                title: 'PAN-India Accessibility',
                icon: MapPin,
                accent: 'amber',
                description:
                  'World-class home automation shouldn’t be limited to a few pin codes. We consult, install, and support homeowners across PAN India.',
              },
            ].map((val) => {
              const Icon = val.icon;
              const isAmber = val.accent === 'amber';
              return (
                <div
                  key={val.title}
                  className="rounded-3xl bg-charcoal-950 border border-white/10 p-7 space-y-4 shadow-xl"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                      isAmber
                        ? 'bg-amber-gold/15 border-amber-gold/40 text-amber-gold'
                        : 'bg-cyan-tech/15 border-cyan-electric/40 text-cyan-electric'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">{val.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>

          {/* [PLACEHOLDER — @SampleTrustMetrics] */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {SAMPLE_TRUST_METRICS.map((m) => (
              <div key={m.id} className="p-6 rounded-2xl bg-charcoal-950/80 border border-white/10">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-gold">
                  {m.metric}
                </div>
                <div className="text-xs text-slate-400 mt-1">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Users className="w-10 h-10 text-amber-gold mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-white">
            Plan Your Home With Lumora Smart Tech
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Speak with our team to design a wireless automation package tailored to your apartment or villa.
          </p>
          <button
            type="button"
            onClick={() => openInquiry({ sourceLabel: 'About Page Consultation CTA' })}
            className="mt-6 min-h-[50px] px-7 py-3.5 rounded-2xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-display font-bold text-sm sm:text-base inline-flex items-center gap-2 transition-colors"
          >
            <span>Book a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </>
  );
}
