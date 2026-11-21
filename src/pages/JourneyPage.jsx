import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, Building2, Hammer } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import BeforeAfterSlider from '../components/interactions/BeforeAfterSlider';
import { SAMPLE_PROJECTS } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

const JOURNEY_CONTENT = {
  'new-homes': {
    journeyType: 'New Build',
    seoTitle: 'Smart Home Automation for New Homes & Villas | Lumora Smart Tech',
    seoDesc:
      'Planning interiors from scratch? Partner with Lumora Smart Tech to integrate Smart Keypads, Curtain Motors, Climate Control, Security, and Sensors seamlessly across PAN India.',
    badge: 'FOR NEW HOMES & BARE-SHELL INTERIORS',
    headline: 'Design Intelligence Into Your New Home From Day One',
    subtitle:
      'When you are doing interiors from scratch, we coordinate directly with your architect, interior designer, and electrical team to eliminate switchboard clutter and conceal curtain tracks inside false ceilings.',
    heroImage: '/assets/reference/curtain-open.jpg',
    icon: Building2,
    accent: 'amber',
    highlights: [
      'Consolidate 8–12 module plastic switchboards into a single sleek 4-module Lumora Keypad',
      'Plan concealed power points inside false ceiling pelmets for motorized curtain tracks',
      'Flush-mount 24GHz human presence sensors so ceilings stay architecturally clean',
      'Future-proof wireless mesh across multi-storey villas and large apartments',
    ],
    timeline: [
      {
        step: 'Stage 01',
        title: 'Floor-Plan & Electrical Marking',
        detail: 'Share your CAD or layout drawings. We mark optimal keypad heights, curtain motor points, and sensor zones.',
      },
      {
        step: 'Stage 02',
        title: 'Finish & Material Selection',
        detail: 'Match Matte Black, Brushed Steel, Warm Brass, or White panels with your designer’s veneer and stone moodboard.',
      },
      {
        step: 'Stage 03',
        title: 'Final Fit-Out & Scene Programming',
        detail: 'Once painting and false ceilings finish, our technicians mount the hardware and program custom scenes for your family.',
      },
    ],
  },
  renovations: {
    journeyType: 'Renovation',
    seoTitle: 'Wireless Retrofit Home Automation for Renovations | Lumora Smart Tech',
    seoDesc:
      'Upgrade your existing home without breaking walls or rewiring. Lumora Smart Tech retrofits wireless Smart Keypads, Curtain Motors, and Security across PAN India.',
    badge: 'FOR EXISTING HOMES & RENOVATIONS',
    headline: 'Upgrade Your Existing Home — Zero Wall Breakage, Zero Rewiring',
    subtitle:
      'Living in your home already or planning a quick refresh? Lumora’s wireless modules drop directly into your existing Indian modular switchboards in a matter of hours, with no dust or chiselling.',
    heroImage: '/assets/reference/keypad-hero-wide.jpg',
    icon: Hammer,
    accent: 'cyan',
    highlights: [
      'Direct drop-in replacement for existing modular switchboards — combines AC, Fan, Curtains, Scenes & Universal Socket in one frame',
      'Convert existing split ACs and ceiling fans into smart climate zones wirelessly',
      'Upgrade your existing wooden main door with a 3D Face + Fingerprint smart mortise lock',
      'Start with 1–2 rooms (like Living Room + Master Bedroom) and expand anytime',
    ],
    timeline: [
      {
        step: 'Stage 01',
        title: 'Switchboard & Room Assessment',
        detail: 'We review your current switchboard sizes, curtain rods/pelmets, and AC units to map a 100% wireless upgrade.',
      },
      {
        step: 'Stage 02',
        title: 'Dust-Free Same-Day Retrofit',
        detail: 'Our technicians swap your old plastic plates for Lumora Smart Keypads using your existing in-wall wires.',
      },
      {
        step: 'Stage 03',
        title: 'App & Voice Handover',
        detail: 'Your phone app, wall keypads, and voice assistants go live immediately with zero disruption to your routine.',
      },
    ],
  },
};

export default function JourneyPage({ variant = 'new-homes' }) {
  const data = JOURNEY_CONTENT[variant] || JOURNEY_CONTENT['new-homes'];
  const { openInquiry } = useInquiry();
  const Icon = data.icon;

  // Filter @SampleProjects matching this journey (or show relevant ones)
  const relevantProjects = SAMPLE_PROJECTS.filter(
    (p) => p.journey.toLowerCase() === data.journeyType.toLowerCase()
  );

  return (
    <>
      <SEOHead title={data.seoTitle} description={data.seoDesc} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
                <Icon className="w-3.5 h-3.5" />
                <span>{data.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                {data.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {data.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openInquiry({
                      journey: data.journeyType,
                      sourceLabel: `${data.journeyType} Journey Page Hero CTA`,
                    })
                  }
                  className="min-h-[52px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-base shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all inline-flex items-center gap-2"
                >
                  <span>Book a {data.journeyType} Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to={variant === 'new-homes' ? '/renovations' : '/new-homes'}
                  className="min-h-[52px] px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-semibold text-white inline-flex items-center justify-center transition-colors"
                >
                  {variant === 'new-homes' ? 'Looking to Renovate Instead?' : 'Building a New Home Instead?'}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                style={{ aspectRatio: '16 / 9' }}
                className="rounded-3xl overflow-hidden border border-white/15 bg-charcoal-900 shadow-2xl w-full relative"
              >
                <img
                  src={data.heroImage}
                  alt={data.headline}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Process Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                Why It Works Better
              </span>
              <h2 className="text-3xl font-display font-bold text-white">
                Tailored for {data.journeyType} Projects
              </h2>
              <div className="space-y-3 pt-2">
                {data.highlights.map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-gold shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Stage Journey Timeline */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-electric">
                Step-By-Step Execution
              </span>
              <h2 className="text-3xl font-display font-bold text-white">
                How We Deliver Your {data.journeyType}
              </h2>
              <div className="space-y-4 pt-2">
                {data.timeline.map((t) => (
                  <div
                    key={t.step}
                    className="p-6 rounded-3xl bg-charcoal-900 border border-white/15 space-y-2"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-electric">
                      {t.step}
                    </span>
                    <h3 className="text-lg font-display font-bold text-white">{t.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{t.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Before/After Switchboard Slider */}
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Case Studies from @SampleProjects */}
      <section className="py-20 bg-charcoal-900/70 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                Sample Installations
              </span>
              <h2 className="text-3xl font-display font-bold text-white mt-2">
                {data.journeyType} Case Studies
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-semibold text-amber-gold hover:text-amber-soft inline-flex items-center gap-1.5"
            >
              <span>View Full Project Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* [PLACEHOLDER — @SampleProjects filtered for this journey] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relevantProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl bg-charcoal-950 border border-white/10 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-charcoal-950/85 border border-white/15 text-[11px] font-semibold text-amber-gold">
                    {proj.city} • {proj.property}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-cyan-electric font-medium mt-1">
                      {proj.productsSummary}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pre-filled CTA */}
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() =>
                openInquiry({
                  journey: data.journeyType,
                  sourceLabel: `${data.journeyType} Bottom CTA`,
                })
              }
              className="min-h-[52px] px-8 py-3.5 rounded-2xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-display font-bold text-base inline-flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get a Quote for My {data.journeyType}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
