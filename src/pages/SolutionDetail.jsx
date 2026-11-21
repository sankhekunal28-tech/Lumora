import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQAccordion from '../components/FAQAccordion';
import SceneSwitchKeypadDemo from '../components/interactions/SceneSwitchKeypadDemo';
import CurtainMotorDemo from '../components/interactions/CurtainMotorDemo';
import AnimatedCurtainPreview from '../components/interactions/AnimatedCurtainStage';
import AnimatedClimatePreview from '../components/interactions/AnimatedClimateStage';
import AnimatedSecurityPreview from '../components/interactions/AnimatedSecurityStage';
import AnimatedSensorPreview from '../components/interactions/AnimatedSensorStage';
import LiveClimateDial from '../components/interactions/LiveClimateDial';
import BiometricUnlockDemo from '../components/interactions/BiometricUnlockDemo';
import PresenceSensorBathroomDemo from '../components/interactions/PresenceSensorBathroomDemo';
import InteractiveFloorPlan from '../components/interactions/InteractiveFloorPlan';
import { PRODUCT_CATEGORIES } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

export default function SolutionDetail() {
  const { slug } = useParams();
  const { openInquiry } = useInquiry();

  const product = PRODUCT_CATEGORIES.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/solutions" replace />;
  }

  const renderInteractiveSection = () => {
    switch (product.slug) {
      case 'keypads':
        return <SceneSwitchKeypadDemo />;
      case 'curtain-motors':
        return <CurtainMotorDemo />;
      case 'climate-control':
        return <LiveClimateDial />;
      case 'security':
        return <BiometricUnlockDemo />;
      case 'sensors':
        return (
          <div className="space-y-12">
            <PresenceSensorBathroomDemo />
            <InteractiveFloorPlan />
          </div>
        );
      default:
        return <SceneSwitchKeypadDemo />;
    }
  };

  return (
    <>
      <SEOHead
        title={`${product.name} India | Lumora Smart Tech`}
        description={`${product.name} by LUMORA SMART TECH — ${product.tagline} Installed across PAN India for renovations and new homes.`}
      />

      {/* 1. SUB-PAGE HERO */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-gold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Solutions</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lumora Solution • PAN India</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {product.heroSubtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openInquiry({
                      product: product.name,
                      sourceLabel: `${product.name} Sub-Page — Get a Quote for this`,
                    })
                  }
                  className="min-h-[52px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-base shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all inline-flex items-center gap-2"
                >
                  <span>Get a Quote for {product.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Hero Visual in Real Room (Full 16:9 Unobstructed Frame) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-charcoal-900 shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
                <div style={{ aspectRatio: '16 / 9' }} className="relative w-full overflow-hidden bg-charcoal-950">
                  {product.slug === 'curtain-motors' ? (
                    <AnimatedCurtainPreview />
                  ) : product.slug === 'climate-control' ? (
                    <AnimatedClimatePreview compact />
                  ) : product.slug === 'security' ? (
                    <AnimatedSecurityPreview compact />
                  ) : product.slug === 'sensors' ? (
                    <AnimatedSensorPreview compact />
                  ) : (
                    <img
                      src={product.image}
                      alt={`${product.name} installed in a luxury Indian interior`}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
                <div className="p-4 sm:px-6 sm:py-4 bg-charcoal-950/95 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-amber-gold">
                      ARCHITECTURAL GRADE • RETROFIT READY
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5">
                      {product.tagline}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE PRODUCT DEMO */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderInteractiveSection()}
        </div>
      </section>

      {/* 3. PLAIN-LANGUAGE FEATURE LIST & SIZE / MODULE OPTIONS */}
      <section className="py-16 md:py-24 bg-charcoal-900/70 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Key Features */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold">
                Designed for Everyday Living
              </span>
              <h2 className="text-3xl font-display font-bold text-white">
                Why Homeowners Choose Lumora {product.name}
              </h2>

              <ul className="space-y-4 pt-2">
                {product.features.map((feat) => (
                  <li
                    key={feat}
                    className="p-4 rounded-2xl bg-charcoal-950 border border-white/10 flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-gold shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm sm:text-base">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizes / Configurations & Technical Protocol Specs (Zigbee / Wi-Fi / Matter kept strictly to sub-pages) */}
            <div className="lg:col-span-5 space-y-6">
              {product.sizes && product.sizes.length > 0 && (
                <div className="p-6 rounded-3xl bg-charcoal-950 border border-white/15 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-electric">
                    <Layers className="w-4 h-4" />
                    <span>Available Configurations & Sizes</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {product.sizes.map((sz) => (
                      <div
                        key={sz}
                        className="px-4 py-3 rounded-xl bg-charcoal-900 border border-white/10 text-sm font-medium text-white flex items-center justify-between"
                      >
                        <span>{sz}</span>
                        <span className="text-[11px] font-mono text-amber-gold">Supported</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Protocol & Architecture Box (Sub-page exclusive) */}
              {product.technicalSpecs && (
                <div className="p-6 rounded-3xl bg-charcoal-950 border border-cyan-electric/30 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-electric">
                    <Cpu className="w-4 h-4" />
                    <span>Wireless Protocol & Engineering Specs</span>
                  </div>
                  <dl className="space-y-3 text-xs sm:text-sm">
                    {Object.entries(product.technicalSpecs).map(([key, value]) => (
                      <div key={key} className="pt-2 border-t border-white/10 first:border-0 first:pt-0">
                        <dt className="text-slate-400 uppercase font-mono text-[11px]">{key}</dt>
                        <dd className="text-white font-medium mt-0.5">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS EXPLAINER */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-electric">
              Seamless Integration
            </span>
            <h2 className="text-3xl font-display font-bold text-white mt-2">
              How {product.name} Work in Your Home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.howItWorksSteps.map((step, i) => (
              <div
                key={step.title}
                className="p-7 rounded-3xl bg-charcoal-900 border border-white/10 space-y-3"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-amber-gold/15 border border-amber-gold/30 text-amber-gold text-xs font-mono font-bold">
                  STEP 0{i + 1}
                </span>
                <h3 className="text-xl font-display font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Pre-filled Quote CTA Bar */}
          <div className="mt-12 p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-amber-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-gold">
                <ShieldCheck className="w-4 h-4" />
                <span>Pre-Filled Product Consultation</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Interested in {product.name} for Your Property?
              </h3>
              <p className="text-sm text-slate-300">
                Get room-by-room pricing for your apartment or villa across PAN India.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                openInquiry({
                  product: product.name,
                  sourceLabel: `${product.name} Bottom Banner — Get a Quote for this`,
                })
              }
              className="min-h-[50px] px-7 py-3 rounded-2xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-display font-bold text-sm sm:text-base shrink-0 inline-flex items-center gap-2 transition-colors"
            >
              <span>Get a Quote for this</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <FAQAccordion />
    </>
  );
}
