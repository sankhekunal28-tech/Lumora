import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import MagneticProductCard from '../components/interactions/MagneticProductCard';
import AnimatedFullHomeCard from '../components/interactions/AnimatedFullHomeCard';
import InteractiveFloorPlan from '../components/interactions/InteractiveFloorPlan';
import FAQAccordion from '../components/FAQAccordion';
import { PRODUCT_CATEGORIES } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

export default function SolutionsHub() {
  const { openInquiry } = useInquiry();

  return (
    <>
      <SEOHead
        title="Smart Home Solutions India | Lumora Smart Tech"
        description="Explore Lumora Smart Tech's five wireless product categories: Smart Keypads, Smart Curtain Motors, Climate Control, Smart Security, and Smart Sensors."
      />

      {/* Hub Hero */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lumora Product Ecosystem</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Five Core Categories. Engineered to Work as One.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Select any product category below to explore interactive demos, architectural finishes, wireless mesh specifications, and room-by-room use cases.
            </p>
          </div>
        </div>
      </section>

      {/* Five Category Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((category, idx) => (
              <MagneticProductCard key={category.id} category={category} index={idx} />
            ))}

            {/* Whole-Home Consultation Card with Dim-to-Bright Room & Text Highlight Animation */}
            <AnimatedFullHomeCard
              onOpenInquiry={openInquiry}
              sourceLabel="Solutions Hub — Full-Home Quote"
            />
          </div>
        </div>
      </section>

      {/* Interactive Floor Plan (@Interaction5) */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveFloorPlan />
        </div>
      </section>

      <FAQAccordion />
    </>
  );
}
