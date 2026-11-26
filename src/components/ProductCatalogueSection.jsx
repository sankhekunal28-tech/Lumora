import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

/**
 * ProductCatalogueSection
 * Renders Lumora's hardware catalogue in the exact existing dark-charcoal, amber-gold & cyan-electric
 * design language. Can be used either:
 *   - On `/solutions` (showing all categories with filter tabs)
 *   - On `/solutions/:slug` (passing `categorySlug` to display only that category's hardware lineup)
 */
export default function ProductCatalogueSection({ categorySlug = null }) {
  const { openInquiry } = useInquiry();
  const [activeFilter, setActiveFilter] = useState(categorySlug || 'all');

  const allItems = PRODUCT_CATEGORIES.flatMap((cat) =>
    (cat.catalogueItems || []).map((item) => ({
      ...item,
      categoryId: cat.id,
      categorySlug: cat.slug,
      categoryName: cat.name,
      categoryPath: cat.path,
      accent: cat.accent,
    }))
  );

  const visibleItems = categorySlug
    ? allItems.filter((item) => item.categorySlug === categorySlug)
    : activeFilter === 'all'
    ? allItems
    : allItems.filter((item) => item.categorySlug === activeFilter);

  if (visibleItems.length === 0) return null;

  const isSingleCategory = Boolean(categorySlug);
  const currentCat = isSingleCategory
    ? PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug)
    : null;

  return (
    <section className="py-16 md:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>
                {isSingleCategory
                  ? `${currentCat?.name} Hardware Lineup`
                  : 'Complete Lumora Product Catalogue'}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {isSingleCategory
                ? `Explore Our ${currentCat?.name} Range`
                : 'Architectural Hardware Crafted for Every Room'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isSingleCategory
                ? `Discover the exact hardware units engineered for ${currentCat?.name} — seamlessly integrated into your Lumora wireless mesh with zero rewiring.`
                : 'Browse every smart keypad, touch control panel, rotary dimmer, curtain drive, climate pod, biometric lock, presence sensor, and gateway in the Lumora ecosystem.'}
            </p>
          </div>

          {!isSingleCategory && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  activeFilter === 'all'
                    ? 'bg-amber-gold text-charcoal-950 border-amber-gold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-charcoal-900 text-slate-300 border-white/10 hover:border-white/25'
                }`}
              >
                All Hardware ({allItems.length})
              </button>
              {PRODUCT_CATEGORIES.map((cat) => {
                const count = (cat.catalogueItems || []).length;
                if (!count) return null;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setActiveFilter(cat.slug)}
                    className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      activeFilter === cat.slug
                        ? 'bg-cyan-electric text-charcoal-950 border-cyan-electric'
                        : 'bg-charcoal-900 text-slate-300 border-white/10 hover:border-white/25'
                    }`}
                  >
                    {cat.shortTitle} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Responsive Product Cards Grid */}
        <div
          className={`grid grid-cols-1 ${
            visibleItems.length === 1
              ? 'max-w-3xl mx-auto'
              : visibleItems.length === 2
              ? 'md:grid-cols-2'
              : 'md:grid-cols-2 lg:grid-cols-3'
          } gap-6`}
        >
          {visibleItems.map((item) => {
            const isCyan = item.accent === 'cyan';
            return (
              <article
                key={item.id}
                className="group rounded-3xl bg-charcoal-900/95 border border-white/10 hover:border-amber-gold/45 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Clean 16:10 Hardware Photography Frame */}
                  <div
                    style={{ aspectRatio: '16 / 10' }}
                    className="relative w-full overflow-hidden bg-charcoal-950 border-b border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />

                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md border ${
                          isCyan
                            ? 'bg-charcoal-950/85 text-cyan-electric border-cyan-electric/40'
                            : 'bg-charcoal-950/85 text-amber-gold border-amber-gold/40'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {!isSingleCategory && (
                      <Link
                        to={item.categoryPath}
                        className="absolute bottom-3 left-3.5 px-2.5 py-1 rounded-lg bg-charcoal-950/85 border border-white/15 text-[11px] font-mono text-slate-200 hover:text-amber-gold transition-colors"
                      >
                        {item.categoryName}
                      </Link>
                    )}
                  </div>

                  {/* Product Info & Highlights */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-gold transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                        {item.intro}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-white/10">
                      {item.highlights.map((hl) => (
                        <li key={hl} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isCyan ? 'text-cyan-electric' : 'text-amber-gold'
                            }`}
                          />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Quote Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      openInquiry({
                        product: item.categoryName,
                        sourceLabel: `Product Catalogue — ${item.name}`,
                      })
                    }
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-amber-gold hover:text-charcoal-950 border border-white/15 hover:border-amber-gold text-xs sm:text-sm font-display font-bold text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Request Quote for This Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
