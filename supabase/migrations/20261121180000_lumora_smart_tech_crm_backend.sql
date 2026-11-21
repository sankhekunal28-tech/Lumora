-- =============================================================================
-- LUMORA SMART TECH — Complete Supabase Backend & Segregated CRM Migration
-- Project: Lumora Smart Tech (ref: lqlqutmtszsfzalelkur)
-- =============================================================================

-- 1. Enable useful extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Reference / Catalog Tables
-- 2a. Product Catalog (Lumora's 5 Core Smart Home Systems)
CREATE TABLE IF NOT EXISTS public.product_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text UNIQUE NOT NULL,
  short_title text NOT NULL,
  category_code text UNIQUE NOT NULL,
  tagline text NOT NULL,
  hero_subtitle text,
  accent_color text DEFAULT 'amber',
  protocols text,
  available_finishes jsonb DEFAULT '[]'::jsonb,
  available_sizes jsonb DEFAULT '[]'::jsonb,
  base_estimate_inr numeric(12, 2),
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2b. Service Pipeline Stages (Lumora's 5-Step Process + Lead Intake)
CREATE TABLE IF NOT EXISTS public.service_pipeline_stages (
  stage_code text PRIMARY KEY,
  step_number integer UNIQUE NOT NULL,
  stage_name text NOT NULL,
  summary text NOT NULL,
  sla_hours integer DEFAULT 24,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Segregated Business CRM & Inquiry Tables
-- 3a. Customers (Deduplicated Client Directory)
CREATE TABLE IF NOT EXISTS public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone_raw text NOT NULL,
  phone_normalized text UNIQUE NOT NULL,
  email text,
  primary_city_locality text NOT NULL,
  preferred_contact_time text DEFAULT 'Anytime',
  customer_tier text NOT NULL DEFAULT 'prospect' CHECK (customer_tier IN ('prospect', 'active_client', 'vip', 'architect_partner')),
  first_source_label text,
  total_inquiries_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3b. Customer Properties (Residential / Commercial Sites)
CREATE TABLE IF NOT EXISTS public.customer_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  city_locality text NOT NULL,
  property_config text NOT NULL CHECK (property_config IN (
    '1 BHK',
    '2 BHK',
    '3 BHK',
    '4 BHK',
    'Villa',
    'Independent House',
    'Office or Commercial Space'
  )),
  journey_type text NOT NULL CHECK (journey_type IN ('New Build', 'Renovation')),
  installation_pathway text GENERATED ALWAYS AS (
    CASE
      WHEN journey_type = 'New Build' THEN 'PATHWAY_01_NEW_BUILD_ARCHITECTURAL'
      ELSE 'PATHWAY_02_WIRELESS_RETROFIT'
    END
  ) STORED,
  estimated_rooms integer,
  property_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3c. Consultation Inquiries (Main Lead & Deal Header)
CREATE TABLE IF NOT EXISTS public.consultation_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  property_id uuid NOT NULL REFERENCES public.customer_properties(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  city_address text NOT NULL,
  property_config text NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('New Build', 'Renovation')),
  preferred_contact_time text DEFAULT 'Anytime',
  project_notes text,
  product_interests text[] NOT NULL DEFAULT '{}'::text[],
  is_full_home_suite boolean NOT NULL DEFAULT false,
  business_segment text NOT NULL CHECK (business_segment IN (
    'NEW_BUILD_LUXURY_VILLA',
    'NEW_BUILD_RESIDENTIAL_APARTMENT',
    'RETROFIT_RENOVATION_RESIDENTIAL',
    'COMMERCIAL_OFFICE_AUTOMATION'
  )),
  priority_tier text NOT NULL DEFAULT 'STANDARD' CHECK (priority_tier IN ('HIGH_PRIORITY_VIP', 'PRIORITY', 'STANDARD')),
  pipeline_stage text NOT NULL DEFAULT '01_CONSULTATION' REFERENCES public.service_pipeline_stages(stage_code),
  inquiry_status text NOT NULL DEFAULT 'new' CHECK (inquiry_status IN (
    'new',
    'contacted',
    'assessment_scheduled',
    'quote_sent',
    'won',
    'lost'
  )),
  source_label text NOT NULL DEFAULT 'Website Direct',
  source_page_path text,
  preferred_channel text NOT NULL DEFAULT 'web_and_whatsapp',
  whatsapp_dispatched boolean NOT NULL DEFAULT true,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3d. Inquiry Product Items (Normalized Line-Item Segregation per Product Category)
CREATE TABLE IF NOT EXISTS public.inquiry_product_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid NOT NULL REFERENCES public.consultation_inquiries(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.product_catalog(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_slug text,
  recommended_installation_mode text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (inquiry_id, product_name)
);

-- 3e. Inquiry Activity Logs (Audit & Timeline History)
CREATE TABLE IF NOT EXISTS public.inquiry_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid NOT NULL REFERENCES public.consultation_inquiries(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  channel text NOT NULL DEFAULT 'website',
  summary text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3f. Quick Channel Leads (Direct WhatsApp / Phone / SMS / Email / Instagram Clicks)
CREATE TABLE IF NOT EXISTS public.quick_channel_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'phone_call', 'sms', 'email', 'instagram')),
  source_label text NOT NULL,
  page_path text,
  prefilled_product text,
  prefilled_journey text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_customers_phone_normalized ON public.customers(phone_normalized);
CREATE INDEX IF NOT EXISTS idx_customers_city ON public.customers(primary_city_locality);
CREATE INDEX IF NOT EXISTS idx_customer_properties_customer_id ON public.customer_properties(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_properties_journey ON public.customer_properties(journey_type, property_config);
CREATE INDEX IF NOT EXISTS idx_inquiries_customer_id ON public.consultation_inquiries(customer_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON public.consultation_inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_segment_status ON public.consultation_inquiries(business_segment, inquiry_status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_pipeline_stage ON public.consultation_inquiries(pipeline_stage);
CREATE INDEX IF NOT EXISTS idx_inquiry_items_inquiry_id ON public.inquiry_product_items(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_inquiry_items_product_id ON public.inquiry_product_items(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiry_logs_inquiry_id ON public.inquiry_activity_logs(inquiry_id, created_at DESC);

-- 5. Seed Pipeline Stages & Product Catalog
INSERT INTO public.service_pipeline_stages (stage_code, step_number, stage_name, summary, sla_hours)
VALUES
  ('01_CONSULTATION', 1, 'Consultation', 'Understanding lifestyle, floor plan, and whether renovating or building from scratch.', 12),
  ('02_HOME_ASSESSMENT', 2, 'Home Assessment', 'Evaluating existing switchboards, curtain pelmets, Wi-Fi coverage, and electrical points.', 48),
  ('03_CUSTOM_DESIGN', 3, 'Custom Design', 'Selecting keypad finishes, scene engravings, sensor placements, and motor sizing room by room.', 72),
  ('04_INSTALLATION', 4, 'Installation', 'Clean, wireless setup by trained technicians with zero wall damage or messy cabling.', 96),
  ('05_HANDOVER_SUPPORT', 5, 'Handover & Support', 'Setting up phones and voice assistants for every family member, backed by PAN-India support.', 24)
ON CONFLICT (stage_code) DO UPDATE SET
  stage_name = EXCLUDED.stage_name,
  summary = EXCLUDED.summary,
  sla_hours = EXCLUDED.sla_hours;

INSERT INTO public.product_catalog (
  slug, name, short_title, category_code, tagline, hero_subtitle, accent_color, protocols, available_finishes, available_sizes, sort_order
)
VALUES
  (
    'keypads',
    'Smart Keypads',
    'Keypads',
    'CAT_01_KEYPADS',
    'All-in-one modular scene, climate, curtain, and universal power panels that replace cluttered switchboards.',
    'Flush matte architectural keypads combining AC & Fan control, curtain triggers, backlit lighting scenes, and a universal fast-charge socket in one seamless frame — zero rewiring required.',
    'amber',
    'Zigbee 3.0 Mesh & Matter-ready Bridge compatibility',
    '["Matte Black", "Brushed Steel", "Warm Brass", "Architectural White"]'::jsonb,
    '["2-Module Scene & Dimmer Keypad", "4-Module Climate (AC/Fan) + Curtain + Scene Panel", "6-Module Grand Multi-Function Panel", "8-Module Integrated Scene + Climate + Universal Socket & USB-C Panel"]'::jsonb,
    1
  ),
  (
    'curtain-motors',
    'Smart Curtain Motors',
    'Curtain Motors',
    'CAT_02_CURTAINS',
    'Invisible, whisper-silent motorized tracks with exact percentage control over sheer and blackout drapes — from 50% sheer daylight to full blackout privacy.',
    'Concealed completely out of sight inside your ceiling pelmet. Effortlessly set your sheer curtains to 50% open for soft natural light, draw only the sheers closed for daytime privacy, or close both sheer and blackout layers with a single tap.',
    'amber',
    'Zigbee 3.0 & Wi-Fi Dual-Mode with Matter Bridge support',
    '[]'::jsonb,
    '["Single Concealed Track (Sheer or Blackout)", "Dual Concealed Track (Independent Sheer + Blackout Combo)", "Roller & Roman Blind Tubular Motor"]'::jsonb,
    2
  ),
  (
    'climate-control',
    'Climate Control',
    'Climate Control',
    'CAT_03_CLIMATE',
    'Intelligent AC, ceiling fan, and indoor climate regulation that keeps every room effortless.',
    'Pre-cool your bedroom before you reach home, adjust ceiling fan speeds from 1 to 5 silently, and maintain ideal comfort all night without energy waste.',
    'cyan',
    'Zigbee 3.0 + 38kHz Omnidirectional IR Blaster + Matter Bridge support',
    '[]'::jsonb,
    '["Tabletop / Ceiling 360° Climate Pod", "In-Wall Thermostat + Fan Controller", "VRV/VRF Ducted Gateway Module"]'::jsonb,
    3
  ),
  (
    'security',
    'Smart Security',
    'Security',
    'CAT_04_SECURITY',
    '7-way biometric smart lock with Dual Battery extended life, Face & Palm recognition, live mobile video feed replacing video door phones, and complete activity logs.',
    'Unlock your main door in 7 effortless ways — 3D Face Recognition, Contactless Palm Recognition, Biometric Fingerprint, RF Card, Touch PIN, Mobile App, and Physical Key — with a built-in HD screen and live smartphone video stream.',
    'cyan',
    'Wi-Fi Direct (Live Video Stream) + Zigbee 3.0 Scene Trigger',
    '["Matte Black", "Brushed Steel", "Warm Brass", "Architectural White"]'::jsonb,
    '["7-in-1 Flagship Video Smart Lock (Face + Palm + Fingerprint + Dual Battery)", "Pull-Push Biometric Mortise Lock with Indoor HD Display", "Slim Architectural Frame Biometric Lock"]'::jsonb,
    4
  ),
  (
    'sensors',
    'Smart Sensors',
    'Sensors',
    'CAT_05_SENSORS',
    'Ceiling human presence sensors that detect actual human presence — turning on all lights from total darkness to get your bathroom and rooms ready to your desired ambience.',
    'Step into a dark bathroom and watch it come alive automatically: our ceiling-mounted Human Presence Sensor detects actual human presence (down to breathing and heartbeat micro-motion) to switch on warm cove, mirror, and vanity lights.',
    'cyan',
    '24GHz / 60GHz mmWave Human Presence Radar + Zigbee 3.0 Mesh & Matter support',
    '[]'::jsonb,
    '["Ceiling-Mounted Human Presence & Micro-Vitals Sensor (Bathroom & Suite Edition)", "Flush False-Ceiling 24GHz mmWave Presence Sensor", "Micro Door/Window Contact & Ambient Lux Sensor", "Kitchen Gas & Bathroom Water Overflow Safety Sensor"]'::jsonb,
    5
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  hero_subtitle = EXCLUDED.hero_subtitle,
  protocols = EXCLUDED.protocols,
  available_finishes = EXCLUDED.available_finishes,
  available_sizes = EXCLUDED.available_sizes,
  updated_at = now();

-- 6. Row-Level Security (RLS)
ALTER TABLE public.product_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quick_channel_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active product catalog"
  ON public.product_catalog FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can view service pipeline stages"
  ON public.service_pipeline_stages FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public can log quick channel leads"
  ON public.quick_channel_leads FOR INSERT TO anon, authenticated
  WITH CHECK (channel IN ('whatsapp', 'phone_call', 'sms', 'email', 'instagram'));

CREATE POLICY "Admins can read customers"
  ON public.customers FOR SELECT TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

CREATE POLICY "Admins can read customer properties"
  ON public.customer_properties FOR SELECT TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

CREATE POLICY "Admins can read consultation inquiries"
  ON public.consultation_inquiries FOR SELECT TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

CREATE POLICY "Admins can update consultation inquiries"
  ON public.consultation_inquiries FOR UPDATE TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin')
  WITH CHECK (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

CREATE POLICY "Admins can read inquiry product items"
  ON public.inquiry_product_items FOR SELECT TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

CREATE POLICY "Admins can read inquiry activity logs"
  ON public.inquiry_activity_logs FOR SELECT TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

CREATE POLICY "Admins can read quick channel leads"
  ON public.quick_channel_leads FOR SELECT TO authenticated
  USING (COALESCE(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') = 'admin');

-- 7. Transactional Lead Intake & Segregation RPC
CREATE SCHEMA IF NOT EXISTS lumora_internal;

CREATE OR REPLACE FUNCTION lumora_internal.process_consultation_inquiry(
  p_customer_name text,
  p_phone text,
  p_email text,
  p_city_address text,
  p_property_config text,
  p_property_type text,
  p_product_interest text[],
  p_preferred_contact_time text,
  p_message text,
  p_source_label text,
  p_source_page_path text,
  p_metadata jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_clean_name text;
  v_clean_phone text;
  v_digits_phone text;
  v_clean_email text;
  v_clean_city text;
  v_clean_config text;
  v_clean_type text;
  v_clean_time text;
  v_clean_message text;
  v_clean_source text;
  v_products text[];
  v_is_full_home boolean := false;
  v_business_segment text;
  v_priority_tier text;
  v_estimated_rooms integer;
  v_customer_id uuid;
  v_property_id uuid;
  v_inquiry_id uuid;
  v_ref_code text;
  v_product_item text;
  v_prod_record record;
  v_install_mode text;
BEGIN
  v_clean_name := btrim(COALESCE(p_customer_name, ''));
  v_clean_phone := btrim(COALESCE(p_phone, ''));
  v_digits_phone := regexp_replace(v_clean_phone, '\D', '', 'g');
  v_clean_email := NULLIF(btrim(COALESCE(p_email, '')), '');
  v_clean_city := btrim(COALESCE(p_city_address, ''));
  v_clean_config := btrim(COALESCE(p_property_config, ''));
  v_clean_type := btrim(COALESCE(p_property_type, ''));
  v_clean_time := COALESCE(NULLIF(btrim(COALESCE(p_preferred_contact_time, '')), ''), 'Anytime');
  v_clean_message := NULLIF(btrim(COALESCE(p_message, '')), '');
  v_clean_source := COALESCE(NULLIF(btrim(COALESCE(p_source_label, '')), ''), 'Website Direct');
  v_products := COALESCE(p_product_interest, '{}'::text[]);

  IF v_clean_name = '' THEN
    RAISE EXCEPTION 'Customer name is required';
  END IF;

  IF length(v_digits_phone) < 10 OR length(v_digits_phone) > 15 THEN
    RAISE EXCEPTION 'Valid 10-to-15 digit phone number is required';
  END IF;

  IF length(v_digits_phone) = 10 THEN
    v_digits_phone := '91' || v_digits_phone;
  END IF;

  IF v_clean_city = '' THEN
    RAISE EXCEPTION 'City or locality is required';
  END IF;

  IF v_clean_config NOT IN (
    '1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Independent House', 'Office or Commercial Space'
  ) THEN
    RAISE EXCEPTION 'Invalid property configuration: %', v_clean_config;
  END IF;

  IF v_clean_type NOT IN ('New Build', 'Renovation') THEN
    RAISE EXCEPTION 'Invalid property type: %', v_clean_type;
  END IF;

  v_estimated_rooms := CASE v_clean_config
    WHEN '1 BHK' THEN 3
    WHEN '2 BHK' THEN 4
    WHEN '3 BHK' THEN 5
    WHEN '4 BHK' THEN 7
    WHEN 'Villa' THEN 10
    WHEN 'Independent House' THEN 8
    WHEN 'Office or Commercial Space' THEN 6
    ELSE 4
  END;

  IF COALESCE(array_length(v_products, 1), 0) >= 3 THEN
    v_is_full_home := true;
  END IF;

  IF v_clean_config = 'Office or Commercial Space' THEN
    v_business_segment := 'COMMERCIAL_OFFICE_AUTOMATION';
  ELSIF v_clean_type = 'New Build' AND v_clean_config IN ('Villa', 'Independent House', '4 BHK') THEN
    v_business_segment := 'NEW_BUILD_LUXURY_VILLA';
  ELSIF v_clean_type = 'New Build' THEN
    v_business_segment := 'NEW_BUILD_RESIDENTIAL_APARTMENT';
  ELSE
    v_business_segment := 'RETROFIT_RENOVATION_RESIDENTIAL';
  END IF;

  IF v_clean_config IN ('Villa', 'Independent House', '4 BHK') OR v_is_full_home THEN
    v_priority_tier := 'HIGH_PRIORITY_VIP';
  ELSIF v_clean_config IN ('3 BHK', 'Office or Commercial Space') OR COALESCE(array_length(v_products, 1), 0) >= 2 THEN
    v_priority_tier := 'PRIORITY';
  ELSE
    v_priority_tier := 'STANDARD';
  END IF;

  INSERT INTO public.customers (
    full_name, phone_raw, phone_normalized, email, primary_city_locality,
    preferred_contact_time, customer_tier, first_source_label, total_inquiries_count
  )
  VALUES (
    v_clean_name, v_clean_phone, v_digits_phone, v_clean_email, v_clean_city,
    v_clean_time, CASE WHEN v_priority_tier = 'HIGH_PRIORITY_VIP' THEN 'vip' ELSE 'prospect' END,
    v_clean_source, 1
  )
  ON CONFLICT (phone_normalized) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone_raw = EXCLUDED.phone_raw,
    email = COALESCE(EXCLUDED.email, public.customers.email),
    primary_city_locality = EXCLUDED.primary_city_locality,
    preferred_contact_time = EXCLUDED.preferred_contact_time,
    customer_tier = CASE
      WHEN public.customers.customer_tier = 'vip' OR EXCLUDED.customer_tier = 'vip' THEN 'vip'
      ELSE public.customers.customer_tier
    END,
    total_inquiries_count = public.customers.total_inquiries_count + 1,
    updated_at = now()
  RETURNING id INTO v_customer_id;

  SELECT id INTO v_property_id
  FROM public.customer_properties
  WHERE customer_id = v_customer_id
    AND lower(city_locality) = lower(v_clean_city)
    AND property_config = v_clean_config
    AND journey_type = v_clean_type
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_property_id IS NULL THEN
    INSERT INTO public.customer_properties (
      customer_id, city_locality, property_config, journey_type, estimated_rooms, property_notes
    )
    VALUES (
      v_customer_id, v_clean_city, v_clean_config, v_clean_type, v_estimated_rooms, v_clean_message
    )
    RETURNING id INTO v_property_id;
  ELSE
    UPDATE public.customer_properties
    SET property_notes = COALESCE(v_clean_message, property_notes), updated_at = now()
    WHERE id = v_property_id;
  END IF;

  v_ref_code := 'LUM-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 5));

  INSERT INTO public.consultation_inquiries (
    reference_code, customer_id, property_id, customer_name, phone, email, city_address,
    property_config, property_type, preferred_contact_time, project_notes, product_interests,
    is_full_home_suite, business_segment, priority_tier, pipeline_stage, inquiry_status,
    source_label, source_page_path, preferred_channel, whatsapp_dispatched, metadata
  )
  VALUES (
    v_ref_code, v_customer_id, v_property_id, v_clean_name, v_clean_phone, v_clean_email, v_clean_city,
    v_clean_config, v_clean_type, v_clean_time, v_clean_message, v_products,
    v_is_full_home, v_business_segment, v_priority_tier, '01_CONSULTATION', 'new',
    v_clean_source, COALESCE(p_source_page_path, '/'), 'web_and_whatsapp', true, COALESCE(p_metadata, '{}'::jsonb)
  )
  RETURNING id INTO v_inquiry_id;

  v_install_mode := CASE
    WHEN v_clean_type = 'New Build' THEN 'CONCEALED_NEW_BUILD_FITOUT'
    ELSE 'WIRELESS_MODULAR_RETROFIT'
  END;

  IF COALESCE(array_length(v_products, 1), 0) > 0 THEN
    FOREACH v_product_item IN ARRAY v_products LOOP
      SELECT id, slug INTO v_prod_record
      FROM public.product_catalog
      WHERE lower(name) = lower(btrim(v_product_item))
         OR lower(short_title) = lower(btrim(v_product_item))
         OR lower(slug) = lower(btrim(v_product_item))
      LIMIT 1;

      INSERT INTO public.inquiry_product_items (
        inquiry_id, product_id, product_name, product_slug, recommended_installation_mode
      )
      VALUES (
        v_inquiry_id, v_prod_record.id, btrim(v_product_item), v_prod_record.slug, v_install_mode
      )
      ON CONFLICT (inquiry_id, product_name) DO NOTHING;
    END LOOP;
  ELSE
    INSERT INTO public.inquiry_product_items (
      inquiry_id, product_id, product_name, product_slug, recommended_installation_mode
    )
    VALUES (
      v_inquiry_id, NULL, 'Full Smart-Home Consultation', 'full-consultation', v_install_mode
    )
    ON CONFLICT (inquiry_id, product_name) DO NOTHING;
  END IF;

  INSERT INTO public.inquiry_activity_logs (
    inquiry_id, event_type, channel, summary, payload
  )
  VALUES (
    v_inquiry_id,
    'INQUIRY_SUBMITTED',
    'website',
    format(
      'New %s inquiry (%s) submitted by %s from %s via %s [Segment: %s | Priority: %s]',
      v_clean_type, v_clean_config, v_clean_name, v_clean_city, v_clean_source, v_business_segment, v_priority_tier
    ),
    jsonb_build_object(
      'reference_code', v_ref_code,
      'business_segment', v_business_segment,
      'priority_tier', v_priority_tier,
      'products', v_products,
      'source_label', v_clean_source,
      'source_page_path', COALESCE(p_source_page_path, '/')
    )
  );

  RETURN jsonb_build_object(
    'inquiry_id', v_inquiry_id,
    'reference_code', v_ref_code,
    'customer_id', v_customer_id,
    'property_id', v_property_id,
    'business_segment', v_business_segment,
    'priority_tier', v_priority_tier,
    'pipeline_stage', '01_CONSULTATION',
    'submitted_at', now()
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_consultation_inquiry(
  p_customer_name text,
  p_phone text,
  p_email text DEFAULT NULL,
  p_city_address text DEFAULT '',
  p_property_config text DEFAULT '',
  p_property_type text DEFAULT '',
  p_product_interest text[] DEFAULT '{}'::text[],
  p_preferred_contact_time text DEFAULT 'Anytime',
  p_message text DEFAULT NULL,
  p_source_label text DEFAULT 'Website Direct',
  p_source_page_path text DEFAULT '/',
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS jsonb
LANGUAGE sql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
  SELECT lumora_internal.process_consultation_inquiry(
    p_customer_name, p_phone, p_email, p_city_address, p_property_config, p_property_type,
    p_product_interest, p_preferred_contact_time, p_message, p_source_label, p_source_page_path, p_metadata
  );
$$;

-- 8. Business Reporting Views (Security Invoker)
CREATE OR REPLACE VIEW public.v_business_inquiries_pipeline
WITH (security_invoker = true) AS
SELECT
  ci.id AS inquiry_id,
  ci.reference_code,
  ci.submitted_at,
  ci.business_segment,
  ci.priority_tier,
  ci.pipeline_stage,
  sps.stage_name AS pipeline_stage_name,
  sps.step_number AS pipeline_step_number,
  sps.sla_hours AS stage_sla_hours,
  ci.inquiry_status,
  c.id AS customer_id,
  c.full_name AS customer_name,
  c.phone_raw AS customer_phone,
  c.phone_normalized,
  c.email AS customer_email,
  c.customer_tier,
  c.total_inquiries_count AS customer_repeat_inquiries,
  cp.id AS property_id,
  cp.city_locality,
  cp.property_config,
  cp.journey_type,
  cp.installation_pathway,
  cp.estimated_rooms,
  ci.product_interests,
  COALESCE(array_length(ci.product_interests, 1), 0) AS products_selected_count,
  ci.is_full_home_suite,
  ci.preferred_contact_time,
  ci.project_notes,
  ci.source_label,
  ci.source_page_path
FROM public.consultation_inquiries ci
JOIN public.customers c ON c.id = ci.customer_id
JOIN public.customer_properties cp ON cp.id = ci.property_id
LEFT JOIN public.service_pipeline_stages sps ON sps.stage_code = ci.pipeline_stage;

CREATE OR REPLACE VIEW public.v_business_segment_summary
WITH (security_invoker = true) AS
SELECT
  ci.business_segment,
  ci.property_type AS journey_type,
  COUNT(*) AS total_inquiries,
  COUNT(*) FILTER (WHERE ci.priority_tier = 'HIGH_PRIORITY_VIP') AS vip_inquiries,
  COUNT(*) FILTER (WHERE ci.is_full_home_suite = true) AS full_home_suite_inquiries,
  COUNT(*) FILTER (WHERE ci.inquiry_status = 'new') AS new_unassigned_leads,
  COUNT(DISTINCT ci.customer_id) AS unique_customers,
  MAX(ci.submitted_at) AS latest_inquiry_at
FROM public.consultation_inquiries ci
GROUP BY ci.business_segment, ci.property_type;

CREATE OR REPLACE VIEW public.v_product_demand_analytics
WITH (security_invoker = true) AS
SELECT
  pc.category_code,
  pc.name AS product_name,
  pc.slug AS product_slug,
  COUNT(ipi.id) AS total_inquiries_count,
  COUNT(ipi.id) FILTER (WHERE ci.property_type = 'New Build') AS new_build_requests,
  COUNT(ipi.id) FILTER (WHERE ci.property_type = 'Renovation') AS renovation_retrofit_requests,
  COUNT(ipi.id) FILTER (WHERE ci.priority_tier = 'HIGH_PRIORITY_VIP') AS vip_tier_requests
FROM public.product_catalog pc
LEFT JOIN public.inquiry_product_items ipi ON ipi.product_id = pc.id
LEFT JOIN public.consultation_inquiries ci ON ci.id = ipi.inquiry_id
GROUP BY pc.category_code, pc.name, pc.slug, pc.sort_order
ORDER BY pc.sort_order ASC;
