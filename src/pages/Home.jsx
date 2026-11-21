import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Smartphone,
  Grid,
  Mic,
  ShieldCheck,
  Building2,
  Hammer,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import DayNightHeroSlider from '../components/interactions/DayNightHeroSlider';
import MagneticProductCard from '../components/interactions/MagneticProductCard';
import AnimatedFullHomeCard from '../components/interactions/AnimatedFullHomeCard';
import SceneSwitchKeypadDemo from '../components/interactions/SceneSwitchKeypadDemo';
import LightTuningStage from '../components/interactions/LightTuningStage';
import {
  COMPANY_FACTS,
  CORE_TRUST_PILLARS,
  SAMPLE_TRUST_METRICS,
  PRODUCT_CATEGORIES,
  SAMPLE_TESTIMONIALS,
} from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

export default function Home() {
  const { openInquiry } = useInquiry();

  return (
    <>
      <SEOHead
        title="Lumora Smart Tech | Your Whole Home, Under Your Control"
        description="LUMORA SMART TECH — Wireless smart-home automation across PAN India. Control lighting, curtains, climate, security, and sensors via phone app, smart keypads, and voice assistants."
      />

      {/* 1. HERO SECTION with @Interaction1 (Day-to-Night Hero Slider) */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="pointer-events-none absolute top-12 left-1/4 w-96 h-96 rounded-full bg-amber-gold/10 blur-[130px]" />
        <div className="pointer-events-none absolute top-32 right-1/4 w-96 h-96 rounded-full bg-cyan-tech/10 blur-[130px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LUMORA SMART TECH • PAN INDIA</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                Your whole home,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-gold to-cyan-electric">
                  under your control
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {COMPANY_FACTS.positioning}. Designed for Indian luxury residences — whether you are renovating an existing home without rewiring or crafting new interiors from scratch.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openInquiry({ sourceLabel: 'Homepage Hero — Book a Free Consultation' })}
                  className="min-h-[52px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/solutions"
                  className="min-h-[52px] px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-display font-semibold text-base transition-colors flex items-center justify-center"
                >
                  Explore Solutions
                </Link>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-gold" />
                  Wireless, No Wall Breakage
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-electric" />
                  PAN India Installation
                </span>
              </div>
            </div>

            {/* Hero Interactive Day-to-Night Scene (@Interaction1) */}
            <div className="lg:col-span-7">
              <DayNightHeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP & @SampleTrustMetrics */}
      <section className="py-12 bg-charcoal-900/80 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Core Positioning Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.label}
                className="p-5 rounded-2xl bg-charcoal-950/80 border border-white/10 flex items-start gap-3.5"
              >
                <ShieldCheck className="w-5 h-5 text-amber-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-bold text-white text-base">{pillar.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{pillar.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* [PLACEHOLDER — @SampleTrustMetrics: replace with live company stats later] */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {SAMPLE_TRUST_METRICS.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-gold">
                  {item.metric}
                </div>
                <div className="text-xs text-slate-400 mt-1">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORY GRID (@Keypads, @CurtainMotors, @ClimateControl, @Security, @Sensors) with @Interaction12 */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                Complete Architectural Suite
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2 tracking-tight">
                Five Intelligent Systems. One Unified Home.
              </h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base max-w-md">
              Crafted to blend into luxury interiors while giving every family member effortless control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((category, idx) => (
              <MagneticProductCard key={category.id} category={category} index={idx} />
            ))}

            {/* 6th Card: Custom Whole-Home Package CTA with Dim-to-Bright Room & Text Highlight Animation */}
            <AnimatedFullHomeCard
              onOpenInquiry={openInquiry}
              sourceLabel="Homepage Product Grid — Custom Package"
            />
          </div>
        </div>
      </section>

      {/* 4. "THREE WAYS TO CONTROL YOUR HOME" (@PhoneApp / @SmartKeypads / @VoiceAssistant) */}
      <section className="py-20 bg-charcoal-900/70 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-electric">
              Effortless For Every Generation
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Three Ways to Control Your Home
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Whether you prefer tactile wall buttons, your smartphone from work, or simple voice commands, all three stay in instant harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'phone-app',
                title: 'Phone App',
                subtitle: 'Full Control From Anywhere',
                icon: Smartphone,
                accent: 'cyan',
                points: [
                  'Check if ACs or lights were left on after leaving home',
                  'Unlock the front door remotely for family or deliveries',
                  'Set sunrise/sunset schedules for curtains and geysers',
                ],
              },
              {
                id: 'smart-keypads',
                title: 'Smart Keypads',
                subtitle: 'Tactile Wall Panels in Every Room',
                icon: Grid,
                accent: 'amber',
                points: [
                  'Intuitive for elders, children, and visiting guests without needing a phone',
                  'Custom laser-etched scene buttons ("Good Morning", "Movie Night")',
                  'Fits existing Indian modular wall boxes with zero rewiring',
                ],
              },
              {
                id: 'voice-assistant',
                title: 'Voice Assistants',
                subtitle: 'Hands-Free Everyday Comfort',
                icon: Mic,
                accent: 'cyan',
                points: [
                  'Works seamlessly with Apple Siri, Google Assistant, and Amazon Alexa',
                  'Say "Turn on Guest Mode" or "Close the bedroom curtains"',
                  'Ideal when your hands are full in the kitchen or winding down in bed',
                ],
              },
            ].map((panel) => {
              const Icon = panel.icon;
              const isAmber = panel.accent === 'amber';
              return (
                <div
                  key={panel.id}
                  className="rounded-3xl bg-charcoal-950/90 border border-white/10 hover:border-white/25 p-7 flex flex-col justify-between transition-all shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                          isAmber
                            ? 'bg-amber-gold/15 border-amber-gold/40 text-amber-gold'
                            : 'bg-cyan-tech/15 border-cyan-electric/40 text-cyan-electric'
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        ALWAYS SYNCED
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white">{panel.title}</h3>
                    <div
                      className={`text-xs font-semibold uppercase tracking-wider mt-1 ${
                        isAmber ? 'text-amber-gold' : 'text-cyan-electric'
                      }`}
                    >
                      {panel.subtitle}
                    </div>

                    <ul className="mt-5 space-y-3 text-sm text-slate-300">
                      {panel.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isAmber ? 'text-amber-gold' : 'text-cyan-electric'
                            }`}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 pt-4 border-t border-white/10">
                    <Link
                      to="/how-it-works"
                      className="text-xs font-semibold text-white hover:text-amber-gold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>See how {panel.title} works</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FLAGSHIP INTERACTIVE DEMO SECTION (Scene-Switch Keypad Demo + Light-Tuning Hover Stage) */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                Interactive Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
                Test Drive a Lumora Scene Keypad Right Here
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Tap <strong className="text-white">Morning – Natural Daylight</strong>,{' '}
                <strong className="text-white">Evening – Warm Ambient Lighting</strong>,{' '}
                <strong className="text-white">TV Time – Family Entertainment</strong>, or{' '}
                <strong className="text-white">Exit – All Systems Off</strong> on the keypad below to see how one press orchestrates your entire living room in real time.
              </p>
            </div>

            <SceneSwitchKeypadDemo />
          </div>

          {/* @Interaction2 — Light-Tuning Stage */}
          <LightTuningStage />
        </div>
      </section>

      {/* 6. "BUILT FOR YOUR JOURNEY" SPLIT (@NewHomes vs @Renovations) */}
      <section className="py-20 md:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-electric">
              Tailored Installation Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Built for Your Home Journey
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Whether you already live in your home or are designing new interiors from bare shell, Lumora adapts to your timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* New Homes Card */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-gold/15 border border-amber-gold/40 text-amber-gold flex items-center justify-center">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="inline-block text-xs font-mono uppercase tracking-widest text-amber-gold">
                  PATHWAY 01 • INTERIORS FROM SCRATCH
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  For New Homes & Villas
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Collaborate with your architect or interior designer from day one to consolidate switchboards, hide curtain motor pelmets, and plan whole-home automation cleanly.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <Link
                  to="/new-homes"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-display font-bold text-sm inline-flex items-center gap-2 transition-colors"
                >
                  <span>Explore New-Build Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    openInquiry({
                      journey: 'New Build',
                      sourceLabel: 'Homepage — New Homes Split',
                    })
                  }
                  className="text-xs font-semibold text-slate-300 hover:text-amber-gold transition-colors"
                >
                  Book New-Home Consultation →
                </button>
              </div>
            </div>

            {/* Renovations Card */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-tech/15 border border-cyan-electric/40 text-cyan-electric flex items-center justify-center">
                  <Hammer className="w-7 h-7" />
                </div>
                <span className="inline-block text-xs font-mono uppercase tracking-widest text-cyan-electric">
                  PATHWAY 02 • ZERO-REWIRING RETROFIT
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  For Existing Home Renovations
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Upgrade your lived-in apartment without breaking walls, repainting, or pulling new cables — our wireless retrofit modules swap right into your existing switchboards.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <Link
                  to="/renovations"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-electric hover:bg-cyan-glow text-charcoal-950 font-display font-bold text-sm inline-flex items-center gap-2 transition-colors"
                >
                  <span>Explore Renovation Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    openInquiry({
                      journey: 'Renovation',
                      sourceLabel: 'Homepage — Renovations Split',
                    })
                  }
                  className="text-xs font-semibold text-slate-300 hover:text-cyan-electric transition-colors"
                >
                  Book Retrofit Assessment →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS STRIP (@SampleTestimonials — marked as placeholder in code comments) */}
      <section className="py-20 bg-charcoal-900/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                Homeowner Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
                Designed for Modern Indian Living
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-semibold text-amber-gold hover:text-amber-soft inline-flex items-center gap-1.5"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* [PLACEHOLDER — @SampleTestimonials rendered below; replace with verified client reviews] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-charcoal-950 border border-white/10 p-7 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <Quote className="w-8 h-8 text-amber-gold/50 mb-4" />
                  <p className="text-slate-200 text-base leading-relaxed italic">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-white text-sm">{item.name}</div>
                    <div className="text-xs text-slate-400">
                      {item.location} • {item.projectType}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-[11px] text-amber-gold font-medium">
                    Verified Home
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BAND */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-amber-gold/40 p-8 sm:p-12 text-center shadow-[0_20px_70px_rgba(0,0,0,0.7)] relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-gold/15 text-amber-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PAN India Consultation & Installation</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Ready to Put Your Whole Home Under Your Control?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Share your floor plan or property configuration and get a transparent room-by-room automation plan from Lumora Smart Tech.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => openInquiry({ sourceLabel: 'Homepage Final CTA Band — Get a Quote' })}
                  className="min-h-[52px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all inline-flex items-center gap-2"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/our-process"
                  className="min-h-[52px] px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-display font-semibold text-sm inline-flex items-center justify-center transition-colors"
                >
                  See Our 5-Step Process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
