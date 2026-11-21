# LUMORA SMART TECH — Official Website & Supabase CRM Backend

**Your whole home, under your control.**  
Wireless smart-home automation and architectural integration across PAN India — via phone app, smart keypads, and voice assistants.

---

## 1. Tech Stack
- **Frontend**: React 18, Vite 5, Tailwind CSS 3.4, React Router v6, Framer Motion, Lucide React
- **Backend & CRM**: Supabase Postgres 17 (`https://lqlqutmtszsfzalelkur.supabase.co`, Project ID: `lqlqutmtszsfzalelkur`)

---

## 2. Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm

### Install & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server on http://127.0.0.1:5173
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 3. Project Structure
```text
├── public/
│   └── assets/reference/           # 26 official product & luxury interior visuals
├── src/
│   ├── components/
│   │   ├── interactions/           # 18 interactive product & room simulators
│   │   ├── CinematicBackground.jsx
│   │   ├── FAQAccordion.jsx
│   │   ├── Footer.jsx
│   │   ├── LumoraLogo.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectInquiry.jsx      # Global modal + inline consultation form wired to Supabase
│   │   └── SEOHead.jsx
│   ├── context/
│   │   └── InquiryContext.jsx      # Global modal state & product/journey pre-filling
│   ├── data/
│   │   └── siteData.js             # Central brand facts, 5 product offerings, case studies, FAQs
│   ├── lib/
│   │   └── supabase.js             # Supabase RPC & quick-channel telemetry client
│   ├── pages/
│   │   ├── About.jsx               # Founder story (Kunal Sankhe) & company pillars
│   │   ├── Contact.jsx             # Direct consultation form, WhatsApp card & PAN India coverage
│   │   ├── Home.jsx                # Flagship landing page
│   │   ├── HowItWorks.jsx          # 3-pillar control switcher & connectivity thread diagram
│   │   ├── JourneyPage.jsx         # /new-homes and /renovations dedicated pathways
│   │   ├── OurProcess.jsx          # 5-step service delivery timeline
│   │   ├── Projects.jsx            # Filterable case studies & Before/After switchboard slider
│   │   ├── SolutionDetail.jsx      # Dynamic sub-pages for all 5 product categories
│   │   └── SolutionsHub.jsx        # Product ecosystem overview & Interactive Floor Plan
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── migrations/
│       └── 20261121180000_lumora_smart_tech_crm_backend.sql
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 4. Supabase Backend Architecture
All website inquiries and direct channel clicks are persisted and segregated in Supabase (`supabase/migrations/20261121180000_lumora_smart_tech_crm_backend.sql`):
- `public.customers`: Deduplicated client directory by normalized phone number.
- `public.customer_properties`: Property configurations (`1 BHK`–`4 BHK`, `Villa`, `Independent House`, `Office or Commercial Space`) and installation pathway (`PATHWAY_01_NEW_BUILD_ARCHITECTURAL` vs `PATHWAY_02_WIRELESS_RETROFIT`).
- `public.consultation_inquiries`: Inquiry headers with generated `LUM-YYYYMMDD-XXXXX` reference codes, `business_segment`, `priority_tier`, and `pipeline_stage`.
- `public.inquiry_product_items`: Normalized product line items linked to `public.product_catalog`.
- `public.inquiry_activity_logs`: Timestamped audit log for each inquiry.
- `public.quick_channel_leads`: Direct WhatsApp, SMS, Phone, Email, and Instagram click telemetry.
- **Executive Views**: `public.v_business_inquiries_pipeline`, `public.v_business_segment_summary`, `public.v_product_demand_analytics`.
