import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import LumoraLogo from './LumoraLogo';
import { COMPANY_FACTS, PRODUCT_CATEGORIES } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';
import { logQuickChannelLead } from '../lib/supabase';

export default function Footer() {
  const { openInquiry } = useInquiry();

  return (
    <footer className="bg-charcoal-950 border-t border-white/10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Lumora Smart Tech Home">
              <LumoraLogo showTagline />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_FACTS.positioning}. Founded in {COMPANY_FACTS.founded} by{' '}
              <span className="text-slate-200 font-medium">{COMPANY_FACTS.founder}</span>.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-900 border border-amber-gold/30 text-xs text-amber-gold font-medium">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Service Coverage: {COMPANY_FACTS.serviceArea} (Renovations & New Builds)</span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Smart Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-amber-gold transition-colors">
                  All Solutions Hub
                </Link>
              </li>
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to={cat.path} className="text-slate-400 hover:text-cyan-electric transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Nav & Homeowner Journeys */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/new-homes" className="text-slate-400 hover:text-white transition-colors">
                  For New Homes
                </Link>
              </li>
              <li>
                <Link to="/renovations" className="text-slate-400 hover:text-white transition-colors">
                  For Renovations
                </Link>
              </li>
              <li>
                <Link to="/our-process" className="text-slate-400 hover:text-white transition-colors">
                  Our 5-Step Process
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-white transition-colors">
                  Project Showcase
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Consultation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Connect With Us
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <a
                href={`tel:${COMPANY_FACTS.phoneRaw}`}
                onClick={() =>
                  logQuickChannelLead({
                    channel: 'phone_call',
                    sourceLabel: 'Footer — Phone Link',
                  })
                }
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-gold shrink-0" />
                <span>{COMPANY_FACTS.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${COMPANY_FACTS.emailDisplay}`}
                onClick={() =>
                  logQuickChannelLead({
                    channel: 'email',
                    sourceLabel: 'Footer — Email Link',
                  })
                }
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-electric shrink-0" />
                <span>{COMPANY_FACTS.emailDisplay}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => openInquiry({ sourceLabel: 'Footer Consultation CTA' })}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-gold/15 hover:bg-amber-gold text-amber-gold hover:text-charcoal-950 border border-amber-gold/40 font-display font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book a Free Consultation</span>
            </button>

            {/* Official Instagram Link (LinkedIn & YouTube removed as requested) */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_FACTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  logQuickChannelLead({
                    channel: 'instagram',
                    sourceLabel: 'Footer — Instagram Link',
                  })
                }
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-electric/40 text-xs text-slate-200 hover:text-white inline-flex items-center gap-1.5 transition-all"
              >
                <span>Instagram ({COMPANY_FACTS.instagramHandle})</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-electric" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {COMPANY_FACTS.name}. Founded {COMPANY_FACTS.founded}. All rights reserved.
          </p>
          <p className="text-slate-400">
            Wireless Smart-Home Automation • Installed & Supported {COMPANY_FACTS.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
