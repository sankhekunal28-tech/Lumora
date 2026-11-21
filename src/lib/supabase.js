/**
 * LUMORA SMART TECH — Supabase Backend & Segregated CRM Client
 *
 * Project: Lumora Smart Tech (ref: lqlqutmtszsfzalelkur)
 * Persists consultation inquiries across:
 *   1. public.customers (Deduplicated client directory by phone_normalized)
 *   2. public.customer_properties (Property profile + installation pathway)
 *   3. public.consultation_inquiries (Lead header with business_segment & priority_tier)
 *   4. public.inquiry_product_items (Normalized line-items per requested product category)
 *   5. public.inquiry_activity_logs (Audit & omnichannel timeline log)
 */

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://lqlqutmtszsfzalelkur.supabase.co';

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_rqYXHK2qTefsmZp1AFtmVg_PRrg08zD';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}

/**
 * Calls the transactional `public.submit_consultation_inquiry` RPC function
 * to capture and segregate the customer, property, inquiry header, product line items,
 * and activity log in one atomic transaction.
 */
export async function submitConsultationInquiryToSupabase(payload) {
  const rpcBody = {
    p_customer_name: payload.customerName?.trim() || '',
    p_phone: payload.phone?.trim() || '',
    p_email: payload.email?.trim() || null,
    p_city_address: payload.cityAddress?.trim() || '',
    p_property_config: payload.propertyConfig || '',
    p_property_type: payload.propertyType || '',
    p_product_interest: Array.isArray(payload.productInterest) ? payload.productInterest : [],
    p_preferred_contact_time: payload.preferredContactTime || 'Anytime',
    p_message: payload.message?.trim() || null,
    p_source_label: payload.sourceLabel || 'Website Direct',
    p_source_page_path:
      typeof window !== 'undefined' ? window.location.pathname : '/',
    p_metadata: {
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'web',
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      viewport:
        typeof window !== 'undefined'
          ? `${window.innerWidth}x${window.innerHeight}`
          : null,
      client_timestamp: payload.submittedAt || new Date().toISOString(),
    },
  };

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/submit_consultation_inquiry`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(rpcBody),
    }
  );

  if (!response.ok) {
    let errorDetail = `Supabase error (${response.status})`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.details || errorDetail;
    } catch {
      // Ignore JSON parse error
    }
    throw new Error(errorDetail);
  }

  return await response.json();
}

/**
 * Logs direct quick-action channel clicks (e.g. "Chat With Us on WhatsApp", Phone Call, SMS)
 * into `public.quick_channel_leads` for omnichannel attribution.
 */
export async function logQuickChannelLead({
  channel = 'whatsapp',
  sourceLabel = 'Website Quick Action',
  prefilledProduct = null,
  prefilledJourney = null,
  metadata = {},
}) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/quick_channel_leads`, {
      method: 'POST',
      keepalive: true,
      headers: {
        ...getHeaders(),
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        channel,
        source_label: sourceLabel,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
        prefilled_product: prefilledProduct,
        prefilled_journey: prefilledJourney,
        metadata,
      }),
    });
  } catch {
    // Non-blocking telemetry
  }
}
