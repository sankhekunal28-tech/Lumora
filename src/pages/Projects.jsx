import React, { useState } from 'react';
import { Sparkles, MapPin, Filter, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import BeforeAfterSlider from '../components/interactions/BeforeAfterSlider';
import InteractiveCueBadge from '../components/interactions/InteractiveCueBadge';
import { SAMPLE_PROJECTS } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

const ROOM_FILTERS = ['All', 'Living Room', 'Bedroom', 'Entrance', 'Office', 'Whole Home'];
const PRODUCT_FILTERS = [
  'All Products',
  'Smart Keypads',
  'Smart Curtain Motors',
  'Climate Control',
  'Smart Security',
  'Smart Sensors',
];

export default function Projects() {
  const [selectedRoom, setSelectedRoom] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const { openInquiry } = useInquiry();

  const filteredProjects = SAMPLE_PROJECTS.filter((project) => {
    const matchesRoom = selectedRoom === 'All' || project.roomType === selectedRoom;
    const matchesProduct =
      selectedProduct === 'All Products' || project.productsUsed.includes(selectedProduct);
    return matchesRoom && matchesProduct;
  });

  return (
    <>
      <SEOHead
        title="Smart Home Projects & Case Studies | Lumora Smart Tech"
        description="Explore sample smart-home automation projects across Mumbai, Bengaluru, Pune, Hyderabad, and Goa by LUMORA SMART TECH."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PAN India Residential & Office Showcase</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Real Spaces, Transformed With Lumora
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Filter by room type or product category below, and compare a traditional plastic switchboard against a single sleek Lumora scene panel.
            </p>
          </div>
        </div>
      </section>

      {/* 1. BEFORE / AFTER RENOVATION SLIDER (@Interaction8) */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* 2. FILTERABLE PROJECT GALLERY (@SampleProjects) */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Controls */}
          <div className="p-5 sm:p-6 rounded-3xl bg-charcoal-900 border border-white/15 mb-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                <Filter className="w-4 h-4 text-amber-gold" />
                <span>Filter Case Studies by Room or Product</span>
              </div>
              <InteractiveCueBadge text="Click any filter tag to sort" accent="amber" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {ROOM_FILTERS.map((room) => (
                  <button
                    key={room}
                    type="button"
                    onClick={() => setSelectedRoom(room)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedRoom === room
                        ? 'bg-amber-gold text-charcoal-950 border-amber-gold'
                        : 'bg-charcoal-950 text-slate-300 border-white/10 hover:border-white/25'
                    }`}
                  >
                    {room}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {PRODUCT_FILTERS.map((prod) => (
                  <button
                    key={prod}
                    type="button"
                    onClick={() => setSelectedProduct(prod)}
                    className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedProduct === prod
                        ? 'bg-cyan-electric text-charcoal-950 border-cyan-electric'
                        : 'bg-charcoal-950/70 text-slate-300 border-white/10 hover:border-white/25'
                    }`}
                  >
                    {prod}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* [PLACEHOLDER — @SampleProjects gallery cards rendered below] */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 rounded-3xl bg-charcoal-900 border border-white/10 text-center space-y-4">
              <p className="text-slate-300 text-base">
                No sample projects match that exact filter combination yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedRoom('All');
                  setSelectedProduct('All Products');
                }}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-amber-gold text-charcoal-950 font-semibold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-charcoal-900 border border-white/15 overflow-hidden flex flex-col justify-between shadow-xl group"
                >
                  <div style={{ aspectRatio: '16 / 9' }} className="relative w-full overflow-hidden bg-charcoal-950">
                    <img
                      src={proj.image}
                      alt={`${proj.title} — ${proj.city}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-950/85 border border-white/15 text-xs font-semibold text-white">
                      <MapPin className="w-3.5 h-3.5 text-amber-gold" />
                      <span>
                        {proj.city} • {proj.property}
                      </span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-cyan-tech/20 border border-cyan-electric/40 text-[11px] font-medium text-cyan-electric">
                      {proj.journey}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-gold">
                        {proj.productsSummary}
                      </div>
                      <h2 className="text-xl font-display font-bold text-white mt-1">
                        {proj.title}
                      </h2>
                      <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openInquiry({
                          product: proj.productsUsed[0],
                          journey: proj.journey,
                          sourceLabel: `Projects Page — Similar to ${proj.title} (${proj.city})`,
                        })
                      }
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-amber-gold hover:text-charcoal-950 border border-white/10 text-xs font-display font-bold text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Plan a Similar Setup</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
