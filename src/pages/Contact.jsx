import React from 'react';
import { MessageCircle, MapPin, Phone, Mail, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { ProjectInquiryForm } from '../components/ProjectInquiry';
import FAQAccordion from '../components/FAQAccordion';
import { COMPANY_FACTS } from '../data/siteData';
import { logQuickChannelLead } from '../lib/supabase';

export default function Contact() {
  const whatsappUrl = `https://wa.me/${COMPANY_FACTS.whatsappNumber}?text=${encodeURIComponent(
    'Hello Lumora Smart Tech! I would like to book a consultation for my home automation project.'
  )}`;

  return (
    <>
      <SEOHead
        title="Contact & Book a Consultation | Lumora Smart Tech PAN India"
        description="Get a quote for wireless smart-home automation from LUMORA SMART TECH. Serving homeowners across PAN India for renovations and new builds."
      />

      <section className="pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Contact Info, WhatsApp Click-to-Chat & PAN India Coverage */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Consultation</span>
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                  Let’s Plan Your Smart Home
                </h1>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  Fill in your property configuration and product interests, or message us directly on WhatsApp for a quick response.
                </p>
              </div>

              {/* WhatsApp Click-to-Chat Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-charcoal-900 to-charcoal-900 border border-emerald-500/40 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-white">
                      Instant WhatsApp Chat
                    </h2>
                    <p className="text-xs text-slate-300">
                      Share your floor plan PDF or switchboard photos directly
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    logQuickChannelLead({
                      channel: 'whatsapp',
                      sourceLabel: 'Contact Page — Instant WhatsApp Chat Card',
                    })
                  }
                  className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-charcoal-950 font-display font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Us on WhatsApp</span>
                </a>
              </div>

              {/* "We install across India" Messaging Card (No fabricated office addresses) */}
              <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/15 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-gold/15 border border-amber-gold/40 text-amber-gold flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-gold">
                      SERVICE AREA: {COMPANY_FACTS.serviceArea}
                    </div>
                    <h2 className="text-xl font-display font-bold text-white">
                      We Install Across India
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Whether your residence is in a major metro or a growing tier-2 / holiday destination across India, our consultation and installation engineers coordinate directly with you or your interior team for end-to-end commissioning.
                </p>

                {/* Stylized India Coverage Graphic Badge */}
                <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-cyan-electric shrink-0" />
                    <span>PAN India Installation, Warranty & Remote Diagnostics</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-tech/15 text-cyan-electric text-[11px] font-mono font-semibold shrink-0">
                    IN • NATIONWIDE
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <a
                    href={`tel:${COMPANY_FACTS.phoneRaw}`}
                    onClick={() =>
                      logQuickChannelLead({
                        channel: 'phone_call',
                        sourceLabel: 'Contact Page — Phone Link',
                      })
                    }
                    className="flex items-center gap-2.5 hover:text-amber-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-gold shrink-0" />
                    <span>{COMPANY_FACTS.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_FACTS.emailDisplay}`}
                    onClick={() =>
                      logQuickChannelLead({
                        channel: 'email',
                        sourceLabel: 'Contact Page — Email Link',
                      })
                    }
                    className="flex items-center gap-2.5 hover:text-cyan-electric transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-electric shrink-0" />
                    <span>{COMPANY_FACTS.emailDisplay}</span>
                  </a>
                  <a
                    href={COMPANY_FACTS.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      logQuickChannelLead({
                        channel: 'instagram',
                        sourceLabel: 'Contact Page — Instagram Link',
                      })
                    }
                    className="flex items-center gap-2.5 text-cyan-electric hover:text-amber-gold transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                    <span>Instagram: {COMPANY_FACTS.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Main @ProjectInquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-6 sm:p-10 shadow-2xl">
                <div className="mb-6 pb-5 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-gold">
                    PROJECT INQUIRY & CONSULTATION BOOKING
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                    Tell Us About Your Property
                  </h2>
                </div>

                <ProjectInquiryForm sourceLabel="Contact Page Main Form" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </>
  );
}
