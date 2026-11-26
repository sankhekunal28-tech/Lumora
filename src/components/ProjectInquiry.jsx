import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Send,
  ShieldCheck,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { COMPANY_FACTS } from '../data/siteData';
import {
  submitConsultationInquiryToSupabase,
  logQuickChannelLead,
} from '../lib/supabase';

const PROPERTY_CONFIG_OPTIONS = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  'Villa',
  'Independent House',
  'Office or Commercial Space',
];

const PROPERTY_TYPE_OPTIONS = ['New Build', 'Renovation'];

const PRODUCT_INTEREST_OPTIONS = [
  'Smart Keypads',
  'Smart Curtain Motors',
  'Climate Control',
  'Smart Security',
  'Smart Sensors',
  'Not Sure Yet',
];

const CONTACT_TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening'];
const EMPTY_PRODUCTS = [];

/**
 * @ProjectInquiry — Shared Booking & Consultation Form Component
 *
 * NOTE FOR DEVELOPERS:
 * This form currently submits to a mock/placeholder handler (`handleMockSubmit`)
 * and logs/stores the validated payload locally. It is structured to be wired directly
 * to a real backend API endpoint, CRM webhook (HubSpot / Zoho / LeadSquared), or form
 * service (Formspree / Web3Forms / custom Express/Next API) later.
 */
export function ProjectInquiryForm({
  initialProducts = EMPTY_PRODUCTS,
  initialPropertyType = '',
  sourceLabel = '',
  onSuccessClose,
  compact = false,
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    cityAddress: '',
    propertyConfig: '',
    propertyType: initialPropertyType || '',
    productInterest: Array.isArray(initialProducts) ? [...initialProducts] : [],
    preferredContactTime: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState(null);

  const productsKey = Array.isArray(initialProducts) ? initialProducts.join('|') : '';

  // Sync pre-filled values when opened from a specific Solutions or Journey page
  useEffect(() => {
    if (!initialPropertyType && !productsKey) return;
    setFormData((prev) => ({
      ...prev,
      propertyType: initialPropertyType || prev.propertyType,
      productInterest: productsKey
        ? Array.from(new Set(productsKey.split('|').filter(Boolean)))
        : prev.productInterest,
    }));
  }, [productsKey, initialPropertyType]);

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    }

    // Basic Indian & international phone number validation (at least 10 digits)
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.cityAddress.trim()) {
      newErrors.cityAddress = 'Please enter your city or locality.';
    }

    if (!formData.propertyConfig) {
      newErrors.propertyConfig = 'Please select your property configuration.';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please choose New Build or Renovation.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductToggle = (product) => {
    setFormData((prev) => {
      const exists = prev.productInterest.includes(product);
      if (exists) {
        return {
          ...prev,
          productInterest: prev.productInterest.filter((p) => p !== product),
        };
      }
      return {
        ...prev,
        productInterest: [...prev.productInterest, product],
      };
    });
  };

  const buildInquiryMessageText = (data, refCode) => {
    const lines = [
      '*New Smart-Home Consultation Inquiry — LUMORA SMART TECH*',
      refCode ? `• *Reference ID:* ${refCode}` : null,
      `• *Name:* ${data.customerName}`,
      `• *Phone:* ${data.phone}`,
      data.email ? `• *Email:* ${data.email}` : null,
      `• *City / Locality:* ${data.cityAddress}`,
      `• *Property:* ${data.propertyConfig} (${data.propertyType})`,
      data.productInterest?.length
        ? `• *Products Interested:* ${data.productInterest.join(', ')}`
        : '• *Products Interested:* Full Consultation',
      data.preferredContactTime
        ? `• *Preferred Contact Time:* ${data.preferredContactTime}`
        : null,
      data.message ? `• *Notes:* ${data.message}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: '' }));

    const payload = {
      ...formData,
      sourceLabel: sourceLabel || window.location.pathname,
      submittedAt: new Date().toISOString(),
    };

    try {
      const dbResult = await submitConsultationInquiryToSupabase(payload);
      const refCode = dbResult?.reference_code || null;

      const messageText = buildInquiryMessageText(payload, refCode);
      const whatsappHref = `https://wa.me/${COMPANY_FACTS.whatsappNumber}?text=${encodeURIComponent(
        messageText
      )}`;
      const smsHref = `sms:${COMPANY_FACTS.phoneRaw}?body=${encodeURIComponent(
        messageText.replace(/\*/g, '')
      )}`;

      setIsSubmitting(false);
      setSubmittedPayload({
        ...payload,
        dbResult,
        referenceCode: refCode,
        businessSegment: dbResult?.business_segment || null,
        priorityTier: dbResult?.priority_tier || null,
        whatsappHref,
        smsHref,
      });
    } catch (err) {
      setIsSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        submit:
          err?.message ||
          'We could not save your inquiry right now. Please try again or reach us directly on WhatsApp.',
      }));
    }
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      cityAddress: '',
      propertyConfig: '',
      propertyType: '',
      productInterest: [],
      preferredContactTime: '',
      message: '',
    });
    setErrors({});
  };

  if (submittedPayload) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl bg-charcoal-900 border border-amber-gold/40 p-6 sm:p-8 text-center shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-amber-gold/15 border border-amber-gold/40 text-amber-gold flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-display font-bold text-white">
          Consultation Request Saved
        </h3>
        {submittedPayload.referenceCode && (
          <div className="mt-2 inline-flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-gold/15 border border-amber-gold/40 text-amber-gold font-mono text-xs font-bold tracking-wider">
              REF: {submittedPayload.referenceCode}
            </span>
            {submittedPayload.businessSegment && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-slate-300 font-mono text-[11px]">
                {submittedPayload.businessSegment.replace(/_/g, ' ')}
              </span>
            )}
          </div>
        )}
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
          Thank you, <span className="text-white font-semibold">{submittedPayload.customerName}</span>. Your details are securely logged in our consultation system and our team will reach out to you on{' '}
          <span className="text-amber-gold font-medium">{submittedPayload.phone}</span> regarding your{' '}
          <span className="text-white font-medium">
            {submittedPayload.propertyConfig} ({submittedPayload.propertyType})
          </span>{' '}
          in <span className="text-white font-medium">{submittedPayload.cityAddress}</span>.
        </p>

        {submittedPayload.productInterest.length > 0 && (
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2">
            {submittedPayload.productInterest.map((prod) => (
              <span
                key={prod}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-tech/15 text-cyan-electric border border-cyan-tech/30"
              >
                {prod}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={submittedPayload.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              logQuickChannelLead({
                channel: 'whatsapp',
                sourceLabel: `Confirmation Screen WhatsApp (${submittedPayload.referenceCode || 'Inquiry'})`,
                prefilledJourney: submittedPayload.propertyType,
                metadata: { reference_code: submittedPayload.referenceCode },
              })
            }
            className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-charcoal-950 font-display font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp ({COMPANY_FACTS.phoneDisplay})</span>
          </a>

          <a
            href={submittedPayload.smsHref}
            onClick={() =>
              logQuickChannelLead({
                channel: 'sms',
                sourceLabel: `Confirmation Screen SMS (${submittedPayload.referenceCode || 'Inquiry'})`,
                prefilledJourney: submittedPayload.propertyType,
                metadata: { reference_code: submittedPayload.referenceCode },
              })
            }
            className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl bg-cyan-electric/15 hover:bg-cyan-electric/25 border border-cyan-electric/40 text-cyan-200 font-display font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send via SMS</span>
          </a>

          <a
            href={`tel:${COMPANY_FACTS.phoneRaw}`}
            onClick={() =>
              logQuickChannelLead({
                channel: 'phone_call',
                sourceLabel: `Confirmation Screen Call (${submittedPayload.referenceCode || 'Inquiry'})`,
                prefilledJourney: submittedPayload.propertyType,
                metadata: { reference_code: submittedPayload.referenceCode },
              })
            }
            className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-display font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-gold" />
            <span>Call {COMPANY_FACTS.phoneDisplay}</span>
          </a>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
          >
            Submit Another Inquiry
          </button>
          {onSuccessClose && (
            <button
              type="button"
              onClick={onSuccessClose}
              className="min-h-[40px] px-5 py-2 rounded-xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-semibold text-xs transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {sourceLabel && (
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-gold/10 border border-amber-gold/25 text-amber-gold text-xs font-medium">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Pre-configured for: {sourceLabel}</span>
        </div>
      )}

      {/* Row 1: Customer Name & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Customer Name <span className="text-amber-gold">*</span>
          </label>
          <input
            id="inq-name"
            name="customerName"
            type="text"
            required
            placeholder="e.g. Aarav Sharma"
            value={formData.customerName}
            onChange={(e) => {
              setFormData({ ...formData, customerName: e.target.value });
              if (errors.customerName) setErrors({ ...errors, customerName: '' });
            }}
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-charcoal-950/90 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric ${
              errors.customerName ? 'border-red-400' : 'border-white/15'
            }`}
          />
          {errors.customerName && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.customerName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inq-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Phone Number <span className="text-amber-gold">*</span>
          </label>
          <input
            id="inq-phone"
            name="phone"
            type="tel"
            required
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-charcoal-950/90 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric ${
              errors.phone ? 'border-red-400' : 'border-white/15'
            }`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Address / City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Email <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            id="inq-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-charcoal-950/90 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric ${
              errors.email ? 'border-red-400' : 'border-white/15'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inq-city" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Address / City <span className="text-amber-gold">*</span>
          </label>
          <input
            id="inq-city"
            name="cityAddress"
            type="text"
            required
            placeholder="e.g. Bandra West, Mumbai"
            value={formData.cityAddress}
            onChange={(e) => {
              setFormData({ ...formData, cityAddress: e.target.value });
              if (errors.cityAddress) setErrors({ ...errors, cityAddress: '' });
            }}
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-charcoal-950/90 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric ${
              errors.cityAddress ? 'border-red-400' : 'border-white/15'
            }`}
          />
          {errors.cityAddress && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.cityAddress}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Property Configuration (dropdown) & Preferred Contact Time (dropdown) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-config" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Property Configuration <span className="text-amber-gold">*</span>
          </label>
          <select
            id="inq-config"
            name="propertyConfig"
            required
            value={formData.propertyConfig}
            onChange={(e) => {
              setFormData({ ...formData, propertyConfig: e.target.value });
              if (errors.propertyConfig) setErrors({ ...errors, propertyConfig: '' });
            }}
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-charcoal-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric ${
              errors.propertyConfig ? 'border-red-400' : 'border-white/15'
            }`}
          >
            <option value="">Select Configuration</option>
            {PROPERTY_CONFIG_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.propertyConfig && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.propertyConfig}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inq-time" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Preferred Contact Time <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <select
            id="inq-time"
            name="preferredContactTime"
            value={formData.preferredContactTime}
            onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-charcoal-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric"
          >
            <option value="">Anytime</option>
            {CONTACT_TIME_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Property Type (radio, required) */}
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Property Type <span className="text-amber-gold">*</span>
        </span>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Property Type">
          {PROPERTY_TYPE_OPTIONS.map((typeOption) => {
            const isSelected = formData.propertyType === typeOption;
            return (
              <label
                key={typeOption}
                className={`min-h-[46px] px-4 py-2.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                  isSelected
                    ? 'bg-amber-gold/15 border-amber-gold text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'bg-charcoal-950/80 border-white/15 text-slate-300 hover:border-white/30'
                }`}
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={typeOption}
                  checked={isSelected}
                  onChange={() => {
                    setFormData({ ...formData, propertyType: typeOption });
                    if (errors.propertyType) setErrors({ ...errors, propertyType: '' });
                  }}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-amber-gold' : 'border-slate-500'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-gold" />}
                </span>
                <span className="text-sm font-medium">{typeOption}</span>
              </label>
            );
          })}
        </div>
        {errors.propertyType && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.propertyType}
          </p>
        )}
      </div>

      {/* Row 5: Product Interest (multi-select, optional) */}
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          Product Interest <span className="text-slate-500 font-normal">(Multi-select, Optional)</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PRODUCT_INTEREST_OPTIONS.map((product) => {
            const active = formData.productInterest.includes(product);
            return (
              <button
                key={product}
                type="button"
                aria-pressed={active}
                onClick={() => handleProductToggle(product)}
                className={`min-h-[44px] px-3 py-2 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                  active
                    ? 'bg-cyan-tech/15 border-cyan-electric text-white shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                    : 'bg-charcoal-950/70 border-white/10 text-slate-300 hover:border-white/25'
                }`}
              >
                <span className="leading-tight">{product}</span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    active ? 'bg-cyan-electric border-cyan-electric text-charcoal-950' : 'border-slate-600'
                  }`}
                >
                  {active && '✓'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 6: Message (textarea, optional) */}
      <div>
        <label htmlFor="inq-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          Message / Project Notes <span className="text-slate-500 font-normal">(Optional)</span>
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={compact ? 2 : 3}
          placeholder="Tell us about your timeline, current stage of interiors, or any specific rooms you want to automate..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-charcoal-950/90 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-electric"
        />
      </div>

      {errors.submit && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-500/10 border border-red-400/40 text-red-300 text-xs sm:text-sm flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errors.submit}</span>
        </div>
      )}

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-gold shrink-0" />
          <span>PAN India consultation • Zero obligation estimate</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[48px] px-7 py-3 rounded-xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Saving Inquiry...' : 'Request Free Consultation'}</span>
        </button>
      </div>
    </form>
  );
}

/**
 * Global Modal Wrapper for @ProjectInquiry
 */
export default function ProjectInquiryModal() {
  const { isOpen, prefill, closeInquiry } = useInquiry();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeInquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeInquiry]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-inquiry-title"
    >
      <div
        className="fixed inset-0"
        onClick={closeInquiry}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-charcoal-900 border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden my-4 sm:my-auto max-h-[88dvh] sm:max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-5 bg-charcoal-950/80 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-gold">
              LUMORA SMART TECH • PAN INDIA
            </span>
            <h2 id="modal-inquiry-title" className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
              Book Your Smart-Home Consultation
            </h2>
          </div>
          <button
            type="button"
            onClick={closeInquiry}
            aria-label="Close inquiry modal"
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto">
          <ProjectInquiryForm
            initialProducts={prefill.productInterest}
            initialPropertyType={prefill.propertyType}
            sourceLabel={prefill.sourceLabel}
            onSuccessClose={closeInquiry}
            compact
          />
        </div>
      </div>
    </div>
  );
}
