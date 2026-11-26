/**
 * LUMORA SMART TECH — Central Site Data & Sample Content
 *
 * NOTE FOR DEVELOPERS:
 * All placeholder numbers, testimonials, case studies, FAQ entries, and founder story copy
 * are marked with [PLACEHOLDER] comments below so they can be easily searched and replaced
 * with live CMS or backend data before launch.
 */

export const COMPANY_FACTS = {
  name: 'LUMORA SMART TECH',
  shortName: 'Lumora Smart Tech',
  founder: 'Kunal Sankhe',
  founderPhoto: '/assets/reference/founder-kunal-sankhe.jpg',
  founded: 2025,
  serviceArea: 'PAN India',
  positioning:
    'Wireless automation and integration giving the homeowner complete control of their home — via phone app, smart keypads, and voice assistants',
  headline: 'Your whole home, under your control',
  whatsappNumber: '917900169238',
  phoneRaw: '+917900169238',
  phoneDisplay: '+91 79001 69238',
  emailDisplay: 'lumora.smarttech@gmail.com',
  instagramUrl: 'https://www.instagram.com/lumora.smarttech?obrf=a3NocHc0dHl0cmY3',
  instagramHandle: '@lumora.smarttech',
};

// [PLACEHOLDER — @SampleTrustMetrics: replace with verified live company metrics when ready]
export const SAMPLE_TRUST_METRICS = [
  {
    id: 'homes',
    metric: '50+ Projects Automated',
    value: '50+',
    label: 'Projects Automated',
    detail: 'Retrofits & new luxury interiors',
    isPlaceholder: false,
  },
  {
    id: 'cities',
    metric: '3 Indian Cities Served',
    value: '3',
    label: 'Indian Cities Served',
    detail: 'PAN India installation & support',
    isPlaceholder: false,
  },
  {
    id: 'rating',
    metric: '4.8 / 5 Average Client Rating',
    value: '4.8 / 5',
    label: 'Average Client Rating',
    detail: 'Across residential handovers',
    isPlaceholder: false,
  },
];

export const CORE_TRUST_PILLARS = [
  { label: 'Founded 2025', sub: 'Modern Indian smart-home engineering' },
  { label: 'PAN India Service', sub: 'Consultation & installation nationwide' },
  { label: 'Wireless, No Rewiring', sub: 'Zero wall breakage for existing homes' },
  { label: 'Phone + Keypad + Voice Control', sub: 'Three seamless ways to command every room' },
];

// Product offerings — @Offerings
// Note: Protocol details (Zigbee 3.0 / Wi-Fi / Matter / Thread) are intentionally kept inside
// technicalSpecs for @Solutions sub-pages only, never shown on the Homepage.
export const PRODUCT_CATEGORIES = [
  {
    id: 'keypads',
    slug: 'keypads',
    name: 'Smart Keypads',
    shortTitle: 'Keypads',
    path: '/solutions/keypads',
    tagline: 'All-in-one modular scene, climate, curtain, and universal power panels that replace cluttered switchboards.',
    heroSubtitle:
      'Flush matte architectural keypads combining AC & Fan control, curtain triggers, backlit lighting scenes, and a universal fast-charge socket in one seamless frame — zero rewiring required.',
    image: '/assets/reference/keypad-hero-wide.jpg',
    secondaryImage: '/assets/reference/keypad-modular-panel.jpg',
    accent: 'amber',
    interactionId: 'Interaction3_and_6',
    features: [
      'Dedicated backlit tactile controls for AC, Ceiling Fan, and step-less (– / +) dimming & speed adjustment',
      'Integrated motorized curtain open/close triggers alongside four independent scene buttons: Morning – Natural Daylight, Evening – Warm Ambient Lighting, TV Time – Family Entertainment, and Exit – All Systems Off',
      'Built-in Universal Multi-Pin Power Outlet with integrated USB Type-C & USB-A fast charging in the same flush frame',
      'Laser-etched backlit icons with adaptive night-time glow so you never fumble in the dark',
      'Retrofits directly into standard Indian modular wall boxes without breaking walls — available in Matte Black, Brushed Steel, Warm Brass, and Architectural White',
    ],
    howItWorksSteps: [
      {
        title: 'Direct Modular Retrofit',
        description: 'Your existing cluttered plastic switchboard is replaced with a single flush Lumora multi-module frame in under 30 minutes per room.',
      },
      {
        title: 'Unified Appliance + Scene Control',
        description: 'Control your room AC, fan speed, sheer/blackout curtains, overhead lights, and whole-room moods from one intuitive wall panel.',
      },
      {
        title: 'Always In Sync',
        description: 'Press a button on the keypad, tap the Lumora mobile app, or use voice commands — backlit icons update instantaneously across all interfaces.',
      },
    ],
    // Shown ONLY on /solutions/keypads sub-page
    technicalSpecs: {
      protocols: 'Zigbee 3.0 Mesh & Matter-ready Bridge compatibility',
      power: '110–240V AC, 50Hz (Neutral & Non-Neutral variants + 16A Universal Socket & USB-C PD)',
      encryption: 'AES-128 local mesh communication — works even if home internet drops',
    },
    finishes: [
      { id: 'matte-black', name: 'Matte Black', hex: '#181A1F', border: '#333842', text: 'Stealth graphite anodised finish with brushed metal edge trim' },
      { id: 'brushed-steel', name: 'Brushed Steel', hex: '#646B78', border: '#94A3B8', text: 'Cool industrial satin metallic' },
      { id: 'warm-brass', name: 'Warm Brass', hex: '#9A7432', border: '#E5A93C', text: 'Champagne gold PVD coating' },
      { id: 'white', name: 'Architectural White', hex: '#E2E8F0', border: '#FFFFFF', text: 'Soft matte alabaster finish' },
    ],
    sizes: [
      '2-Module Scene & Dimmer Keypad',
      '4-Module Climate (AC/Fan) + Curtain + Scene Panel',
      '6-Module Grand Multi-Function Panel',
      '8-Module Integrated Scene + Climate + Universal Socket & USB-C Panel',
    ],
    catalogueItems: [
      {
        id: 'cat-keypad-8module-graphite',
        name: '8-Module Scene, Climate, Curtain & USB-C Keypad',
        badge: 'Flagship Wall Panel',
        image: '/assets/catalogue/keypad-8module-graphite.jpg',
        intro: 'Replaces an entire wall of cluttered switches with one flush architectural graphite panel — uniting AC, fan speed, curtain control, lighting scenes, and a universal fast-charge USB-C socket.',
        highlights: [
          'Dedicated AC, Fan, step-less (– / +) & dual curtain open/close triggers',
          'Four laser-etched backlit scene keys (Morning, Evening, TV Time, Night)',
          'Integrated Universal Multi-Pin Power Outlet with USB Type-C fast charging',
          'Direct wireless retrofit into standard Indian modular wall boxes',
        ],
      },
      {
        id: 'cat-keypad-4button-black',
        name: '2-Module 4-Button Backlit Scene Keypad',
        badge: 'Compact Matte Black',
        image: '/assets/catalogue/keypad-4button-black.jpg',
        intro: 'Minimalist matte-black architectural wall control crafted for bedside tables, foyers, and study rooms — delivering crisp backlit icons for everyday lighting, fan, and night routines.',
        highlights: [
          'Soft laser-etched backlit icons clearly legible in total darkness',
          'Tactile matte-black flush frame that elevates modern interior walls',
          'Programmable for individual circuits or multi-device room scenes',
          'Zero-rewiring retrofit compatible with local Zigbee 3.0 mesh',
        ],
      },
      {
        id: 'cat-rotary-gateway-keypad',
        name: 'Rotary Display Keypad with Built-In Zigbee & BLE Gateway',
        badge: 'Dial + Integrated Gateway',
        image: '/assets/catalogue/rotary-gateway-keypad.jpg',
        intro: 'Precision tactile rotary control meets whole-room intelligence — combining six backlit physical switches, a central circular digital percentage dial, and an integrated Zigbee & BLE gateway in one flush wall unit.',
        highlights: [
          'Central rotary digital dial for smooth 0–100% dimming, curtain, or climate control',
          'Six physical tactile switches with subtle status indicator LEDs',
          'Built-in Zigbee & BLE Gateway eliminates the need for a separate visible hub in that zone',
          'Anodised matte-black multi-module architectural wall plate',
        ],
      },
      {
        id: 'cat-smart-rotary-knob',
        name: 'Wireless Smart Rotary Scene Knob',
        badge: 'Tabletop & Bedside Dial',
        image: '/assets/catalogue/smart-rotary-knob.jpg',
        intro: 'A sculptural anodised gunmetal wireless controller designed to sit effortlessly on your bedside table, coffee table, or executive desk — rotate to dim lights or adjust curtains, tap to switch scenes.',
        highlights: [
          'Weighted ergonomic angled tabletop form in brushed gunmetal finish',
          'Smooth rotary dial for stepless lighting dimming and scene cycling',
          'Completely wire-free placement anywhere in the living room or master suite',
          'Stays instantaneously synced with wall keypads, phone app, and voice control',
        ],
      },
      {
        id: 'cat-touch-panel-compact',
        name: 'Compact In-Wall Smart Touch Panel + 4 Physical Switches',
        badge: 'Touchscreen + Tactile',
        image: '/assets/catalogue/touch-panel-compact.jpg',
        intro: 'The best of both worlds for family spaces — a vibrant in-wall touchscreen for Home, Scene, Dimmer, Curtain, and AC control paired seamlessly beside four illuminated tactile switches.',
        highlights: [
          'Visual room-by-room scene selection, dimming, curtain & AC dashboard on the wall',
          'Four dedicated physical push switches right alongside the glass display',
          'Intuitive for elders, children, and visiting guests without reaching for a phone',
          'Flush matte-black architectural bezel designed for living rooms and master suites',
        ],
      },
      {
        id: 'cat-touch-panel-flagship',
        name: 'Flagship Widescreen Smart Home Control Panel',
        badge: 'Whole-Home Command Center',
        image: '/assets/catalogue/touch-panel-flagship.jpg',
        intro: 'Your entire residence orchestrated from one panoramic architectural wall screen — uniting live room lighting, shades, climate telemetry, local music playback, voice assistant integration, and an acoustic speaker grille.',
        highlights: [
          'Panoramic high-resolution wall display showing whole-home active devices & weather',
          'One-touch All On / All Off lighting, shade, climate, and local music controls',
          'Integrated fluted architectural speaker grille with built-in voice assistant support',
          'Ideal central command screen for grand foyers, living lounges, and villas',
        ],
      },
      {
        id: 'cat-wired-gateway-hub',
        name: 'Lumora Wired LAN & USB-C Smart Home Gateway Hub',
        badge: 'Central Mesh Brain',
        image: '/assets/catalogue/wired-gateway-hub.jpg',
        intro: 'The quiet, ultra-reliable backbone of your Lumora home — a sleek matte-black central gateway with wired Ethernet (LAN) and USB-C power that keeps every keypad, curtain, sensor, and lock responding instantaneously.',
        highlights: [
          'Dedicated Wired LAN port for rock-solid network stability and ultra-low latency',
          'Modern USB Type-C power input with recessed hardware reset button',
          'AES-128 encrypted local mesh keeps scenes and switches working even if broadband drops',
          'Bridges your Zigbee 3.0 devices seamlessly with phone app and voice assistants',
        ],
      },
    ],
  },
  {
    id: 'curtain-motors',
    slug: 'curtain-motors',
    name: 'Smart Curtain Motors',
    shortTitle: 'Curtain Motors',
    path: '/solutions/curtain-motors',
    tagline:
      'Invisible, whisper-silent motorized tracks with exact percentage control over sheer and blackout drapes — from 50% sheer daylight to full blackout privacy.',
    heroSubtitle:
      'Concealed completely out of sight inside your ceiling pelmet. Effortlessly set your sheer curtains to 50% open for soft natural light, draw only the sheers closed for daytime privacy, or close both sheer and blackout layers with a single tap.',
    image: '/assets/reference/curtain-open.jpg',
    secondaryImage: '/assets/reference/curtain-sheer-closed.jpg',
    thirdImage: '/assets/reference/curtain-blackout-closed.webp',
    accent: 'amber',
    interactionId: 'Interaction4',
    features: [
      'Invisible & whisper-silent engineering: the compact brushless DC motor (< 30 dB) hides completely behind the curtain pleats inside your pelmet while smoothly driving up to 65 kg of fabric',
      'Custom percentage positioning (0% to 100%): adjust your curtains exactly how you like — for example, set sheer curtains to 50% open for balanced afternoon light, or 100% closed for full privacy',
      'Independent Dual-Track Control: operate translucent sheer curtains and heavy blackout drapes separately or together from your wall keypad, phone app, or voice assistant',
      'Touch-motion start: gently tug the curtain fabric by hand and the concealed motor takes over automatically',
      'Sunrise & sunset schedules that adapt to local Indian daylight hours, with manual override during power cuts',
    ],
    howItWorksSteps: [
      {
        title: 'Concealed Ceiling Pelmet Tracks',
        description:
          'We custom-fabricate dual aluminium tracks for your sheer and blackout layers that recess neatly inside false ceilings so the motor and hardware remain completely invisible.',
      },
      {
        title: 'Precision Percentage & Layer Control',
        description:
          'Use the Lumora app, wall keypad, or voice command to stop either curtain at any exact position — such as 50% sheer open during the day, sheer closed at dusk, or both sheer and blackout closed at night.',
      },
      {
        title: 'Whisper-Silent Scene Sync',
        description:
          'Link your drapery tracks to "Good Morning" or "Movie Night" scenes so curtains glide silently in harmony with your room lighting and climate.',
      },
    ],
    technicalSpecs: {
      protocols: 'Zigbee 3.0 & Wi-Fi Dual-Mode with Matter Bridge support',
      torque: '1.8 Nm to 2.5 Nm high-torque whisper drive (< 30 dB silent acoustic rating)',
      loadCapacity: 'Smoothly drives up to 65 kg across spans up to 8 metres with 1% position accuracy',
    },
    finishes: [],
    sizes: [
      'Single Concealed Track (Sheer or Blackout)',
      'Dual Concealed Track (Independent Sheer + Blackout Combo)',
      'Roller & Roman Blind Tubular Motor',
    ],
    catalogueItems: [
      {
        id: 'cat-curtain-motor-drive',
        name: 'Lumora Whisper-Silent Architectural Curtain Motor',
        badge: 'Concealed Pelmet Drive',
        image: '/assets/catalogue/curtain-motor-drive.jpg',
        intro: 'Precision-engineered in a clean satin-white and brushed-aluminium chassis that disappears completely behind your curtain pleats — delivering effortless, whisper-silent glide for sheer and blackout drapes.',
        highlights: [
          'Whisper-quiet brushless drive (< 30 dB) built for serene bedrooms and lounges',
          'Smoothly drives up to 65 kg across spans up to 8 metres with 1% exact positioning',
          'Touch-motion start: gently tug the curtain by hand and the motor takes over',
          'Manual override during power cuts + sunrise/sunset scene automation',
        ],
      },
    ],
  },
  {
    id: 'climate-control',
    slug: 'climate-control',
    name: 'Climate Control',
    shortTitle: 'Climate Control',
    path: '/solutions/climate-control',
    tagline: 'Intelligent AC, ceiling fan, and indoor climate regulation that keeps every room effortless.',
    heroSubtitle: 'Pre-cool your bedroom before you reach home, adjust ceiling fan speeds from 1 to 5 silently, and maintain ideal comfort all night without energy waste.',
    image: '/assets/reference/climate-control-room.webp',
    accent: 'cyan',
    interactionId: 'Interaction10',
    features: [
      'Works with existing split, cassette, and ducted air conditioners across India',
      'Silent step-less ceiling fan speed control integrated right into wall keypads',
      'Smart night curves that gently raise AC temperature by 1–2°C in early morning hours',
      'Geo-fencing & presence integration to turn off cooling in empty rooms automatically',
      'Unified dashboard showing real-time temperature and humidity in every room',
    ],
    howItWorksSteps: [
      {
        title: '360° Smart IR & Duct Integration',
        description: 'Our compact climate controller bridges your existing AC units and ceiling fans into the Lumora network without replacing your appliances.',
      },
      {
        title: 'Two-Way Temperature Feedback',
        description: 'On-board precision temperature and humidity sensors monitor actual room comfort, not just the AC unit setpoint.',
      },
      {
        title: 'Automated Energy Savings',
        description: 'Link with window sensors and motion sensors so cooling pauses automatically when balcony doors are left open.',
      },
    ],
    technicalSpecs: {
      protocols: 'Zigbee 3.0 + 38kHz Omnidirectional IR Blaster + Matter Bridge support',
      compatibility: 'Compatible with 99% of Split, Inverter, and VRV/VRF AC brands in India',
      sensors: 'Built-in ±0.2°C digital temperature & ±2% RH humidity sensor',
    },
    finishes: [],
    sizes: ['Tabletop / Ceiling 360° Climate Pod', 'In-Wall Thermostat + Fan Controller', 'VRV/VRF Ducted Gateway Module'],
    catalogueItems: [
      {
        id: 'cat-ir-climate-pod',
        name: 'Lumora 360° Smart IR Climate & Appliance Pod',
        badge: 'Universal Room Climate',
        image: '/assets/catalogue/ir-climate-pod.jpg',
        intro: 'A sculpted glossy-obsidian pebble crafted to sit discreetly on a console or side table — wirelessly uniting your existing split ACs and IR appliances into the Lumora app, wall keypads, and voice routines.',
        highlights: [
          '360° omnidirectional 38kHz IR coverage for effortless whole-room AC control',
          'Compatible with 99% of Split and Inverter AC brands across India — zero appliance replacement',
          'Pre-cool bedrooms before arrival and automate energy-saving smart night curves',
          'Minimalist gloss-black & matte-charcoal finish with subtle status indicator',
        ],
      },
    ],
  },
  {
    id: 'security',
    slug: 'security',
    name: 'Smart Security',
    shortTitle: 'Security',
    path: '/solutions/security',
    tagline:
      '7-way biometric smart lock with Dual Battery extended life, Face & Palm recognition, live mobile video feed replacing video door phones, and complete activity logs.',
    heroSubtitle:
      'Unlock your main door in 7 effortless ways — 3D Face Recognition, Contactless Palm Recognition, Biometric Fingerprint, RF Card, Touch PIN, Mobile App, and Physical Key — with a built-in HD screen and live smartphone video stream that replaces separate video door phones completely.',
    image: '/assets/reference/smart-security-lock.webp',
    accent: 'cyan',
    interactionId: 'Interaction7_and_6',
    features: [
      '7 ways to unlock the door: 3D Face Recognition, Contactless Palm Recognition, Semiconductor Biometric Fingerprint, RF Card Unlock, Touch PIN / Guest OTP, Mobile App Operation, and Physical Mechanical Key',
      'Live Video Feed on mobile phones & built-in indoor HD display — completely replaces traditional video door phones so you can see and verify visitors from anywhere',
      'Dual Battery architecture for extended battery life: twin high-capacity lithium packs ensure months of uninterrupted operation with low-battery alerts',
      'Comprehensive Operation Logs: keeps a real-time timestamped history of every unlock method, user entry, and doorstep alert right in your mobile app',
      'Automatic "Welcome Home" & "Away" scene triggers — unlocking the main door switches on foyer lights, while locking up can arm indoor sensors automatically',
    ],
    howItWorksSteps: [
      {
        title: 'Precision Main Door Fitment',
        description:
          'Our technicians install the sculpted pull-push smart mortise lock and Dual Battery pack cleanly onto your main entrance door with zero exposed wiring.',
      },
      {
        title: 'Live Video Doorbell & Mobile Unlock',
        description:
          'When a visitor rings the bell on the lock keypad, the indoor HD colour screen lights up AND a live video feed streams to your phone — letting you verify and unlock remotely without needing a separate video door phone.',
      },
      {
        title: 'Real-Time Operation Logs & Scene Sync',
        description:
          'Every entry via Face, Palm, Fingerprint, RF Card, PIN, App, or Key is logged with timestamps on your phone while triggering your home’s arrival or away scenes.',
      },
    ],
    technicalSpecs: {
      protocols: 'Wi-Fi Direct (Live Video Stream) + Zigbee 3.0 Scene Trigger',
      recognitionSpeed: '< 0.4s 3D Structured-Light Face ID, IR Palm Vein Scan & 360° Semiconductor Fingerprint',
      power: 'Dual Rechargeable Lithium Battery System for extended multi-month life + USB-C emergency jumpstart & Physical Key override',
    },
    finishes: [
      { id: 'matte-black', name: 'Matte Black', hex: '#181A1F', border: '#333842', text: 'Armoured obsidian finish' },
      { id: 'brushed-steel', name: 'Brushed Steel', hex: '#646B78', border: '#94A3B8', text: 'Titanium satin finish' },
      { id: 'warm-brass', name: 'Warm Brass', hex: '#9A7432', border: '#E5A93C', text: 'Royal bronze & gold trim' },
      { id: 'white', name: 'Architectural White', hex: '#E2E8F0', border: '#FFFFFF', text: 'Ceramic pearl edition' },
    ],
    sizes: [
      '7-in-1 Flagship Video Smart Lock (Face + Palm + Fingerprint + Dual Battery)',
      'Pull-Push Biometric Mortise Lock with Indoor HD Display',
      'Slim Architectural Frame Biometric Lock',
    ],
    catalogueItems: [
      {
        id: 'cat-smart-security-lock',
        name: '7-in-1 Flagship Biometric Video Smart Lock',
        badge: '7-Way Access + Live Video',
        image: '/assets/reference/smart-security-lock.webp',
        intro: 'Replaces traditional video door phones and mechanical locks in one sculptural entrance centerpiece — unlocking in 7 effortless ways with Dual Battery longevity and live smartphone video verification.',
        highlights: [
          '3D Face ID, Contactless Palm Scan, Fingerprint, RF Card, PIN/OTP, App & Physical Key',
          'Built-in indoor HD colour screen + live mobile video feed for doorstep verification',
          'Dual rechargeable lithium battery architecture with real-time entry history logs',
          'Triggers automatic Welcome Home foyer lights and Away security scenes',
        ],
      },
    ],
  },
  {
    id: 'sensors',
    slug: 'sensors',
    name: 'Smart Sensors',
    shortTitle: 'Sensors',
    path: '/solutions/sensors',
    tagline:
      'Ceiling human presence sensors that detect actual human presence — turning on all lights from total darkness to get your bathroom and rooms ready to your desired ambience.',
    heroSubtitle:
      'Step into a dark bathroom and watch it come alive automatically: our ceiling-mounted Human Presence Sensor detects actual human presence (down to breathing and heartbeat micro-motion) to switch on warm cove, mirror, and vanity lights to your exact desired ambience.',
    image: '/assets/reference/sensor-bathroom-active.jpg',
    accent: 'cyan',
    interactionId: 'Interaction5',
    features: [
      'True Human Presence Detection: ceiling-mounted mmWave radar senses actual human occupancy, breathing, and heartbeat micro-motion (72 bpm) so lights never turn off while you are still inside',
      'Instant Dark-to-Ambience Bathroom Readiness: keeps the bathroom in complete standby darkness when empty and switches on ceiling cove, backlit mirror, shower niche, and under-vanity lights the moment you walk in',
      'Customisable Ambience Presets by Time of Day: enjoy a 100% Warm Spa Sanctuary glow in the evening, crisp 4000K daylight mirror lighting in the morning, or a soft 15% low-glare amber path after midnight',
      'Continuous Presence Tracking & Auto-Off: tracks exact presence duration and turns off all bathroom lights and exhaust fans automatically after you step out',
      'Complete Home Safety Suite: pair ceiling presence sensors with micro door/window contact sensors, ambient lux detectors, and kitchen gas / bathroom water-leak sensors',
    ],
    howItWorksSteps: [
      {
        title: 'Flush Ceiling Presence Placement',
        description:
          'Mounted cleanly in your bathroom or room ceiling, the compact sensor continuously scans a wide 3D detection cone with zero cameras—preserving 100% privacy.',
      },
      {
        title: 'Instant Entry Lock-On (< 150ms)',
        description:
          'As soon as you step into the dark bathroom, the sensor detects your presence and triggers all architectural lighting circuits—cove, vanity mirror, and shower niche—to your chosen ambience.',
      },
      {
        title: 'Micro-Motion Hold & Smart Exit Shutdown',
        description:
          'By sensing subtle breathing and heartbeat micro-motion even through glass shower partitions, lights stay on reliably while you are inside and power down automatically once the room is empty.',
      },
    ],
    technicalSpecs: {
      protocols: '24GHz / 60GHz mmWave Human Presence Radar + Zigbee 3.0 Mesh & Matter support',
      detectionCapability: 'Detects walking entry, stationary posture, breathing & heartbeat micro-motion + built-in digital Lux meter',
      range: '120° ceiling projection cone covering up to 8 metres (works through glass shower partitions)',
    },
    finishes: [],
    sizes: [
      'Ceiling-Mounted Human Presence & Micro-Vitals Sensor (Bathroom & Suite Edition)',
      'Flush False-Ceiling 24GHz mmWave Presence Sensor',
      'Micro Door/Window Contact & Ambient Lux Sensor',
      'Kitchen Gas & Bathroom Water Overflow Safety Sensor',
    ],
    catalogueItems: [
      {
        id: 'cat-ceiling-presence-sensor',
        name: 'Flush False-Ceiling Human Presence Sensor',
        badge: 'Recessed mmWave Radar',
        image: '/assets/catalogue/ceiling-presence-sensor.jpg',
        intro: 'Designed to recess seamlessly into gypsum or false ceilings with spring-clip mounting — sensing genuine human occupancy (even stationary breathing behind glass shower partitions) with zero cameras and 100% privacy.',
        highlights: [
          'Flush matte-white architectural faceplate blends invisibly into modern ceilings',
          'Detects walking entry, stationary posture, and breathing micro-motion (< 150ms lock-on)',
          '120° ceiling projection cone covering up to 8 metres with built-in ambient Lux sensing',
          'Automatically illuminates bathrooms & suites on entry and shuts off when vacant',
        ],
      },
      {
        id: 'cat-wall-motion-sensor',
        name: 'Articulated Wall-Mounted Smart Motion Sensor',
        badge: 'Corridor & Security PIR',
        image: '/assets/catalogue/wall-motion-sensor.jpg',
        intro: 'A compact, adjustable wall-mount motion detector with a swivel bracket for hallways, staircases, foyers, and perimeter zones — triggering automated pathway lighting and away-mode security alerts.',
        highlights: [
          'Adjustable swivel wall bracket for precise corridor, staircase, or entry aiming',
          'Instant trigger for low-glare night pathway lighting and automated foyer welcomes',
          'Pairs with Away scenes to send real-time smartphone alerts on unexpected movement',
          'Clean matte-white housing designed for effortless wireless installation',
        ],
      },
    ],
  },
];

// [PLACEHOLDER — @SampleTestimonials: clearly marked placeholder client quotes]
export const SAMPLE_TESTIMONIALS = [
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    location: 'Pune',
    projectType: '3 BHK Renovation',
    quote: 'Switching every light and curtain from one app has changed how we live at home.',
    isPlaceholder: true,
  },
  {
    id: 'ananya-rahul-kapoor',
    name: 'Ananya & Rahul Kapoor',
    location: 'Mumbai',
    projectType: 'Villa / New Build',
    quote: "Lumora's keypads look as premium as our interiors, and installation left no visible wiring.",
    isPlaceholder: false,
  },
  {
    id: 'meera-iyer',
    name: 'Meera Iyer',
    location: 'Mumbai',
    projectType: '2 BHK Renovation',
    quote: 'The voice control and curtain automation were easy to use from day one.',
    isPlaceholder: true,
  },
];

// [PLACEHOLDER — @SampleProjects: gallery / case-study entries]
export const SAMPLE_PROJECTS = [
  {
    id: 'proj-mumbai-living',
    title: 'Living Room Automation',
    city: 'Mumbai',
    property: '3 BHK',
    journey: 'Renovation',
    roomType: 'Living Room',
    productsUsed: ['Smart Keypads', 'Smart Curtain Motors'],
    productsSummary: 'Smart Keypads + Curtain Motors',
    image: '/assets/reference/hero-evening-living.jpg',
    description:
      'Retrofitted an existing 3 BHK apartment with matte black scene keypads and whisper-quiet dual curtain tracks overlooking the skyline — completed with zero wall rewiring.',
    isPlaceholder: true,
  },
  {
    id: 'proj-bengaluru-bedroom',
    title: 'Master Suite & Bathroom Presence',
    city: 'Bengaluru',
    property: 'Villa',
    journey: 'New Build',
    roomType: 'Bedroom',
    productsUsed: ['Climate Control', 'Smart Sensors'],
    productsSummary: 'Climate Control + Human Presence Sensors',
    image: '/assets/reference/sensor-bathroom-active.jpg',
    description:
      'Ceiling-mounted human presence sensors detect the moment someone steps into the dark bathroom and automatically turn on all warm cove, mirror, and vanity lights to the desired spa ambience.',
    isPlaceholder: true,
  },
  {
    id: 'proj-pune-security',
    title: 'Main Entrance Security',
    city: 'Pune',
    property: '2 BHK',
    journey: 'Renovation',
    roomType: 'Entrance',
    productsUsed: ['Smart Security'],
    productsSummary: 'Smart Security (face + fingerprint lock)',
    image: '/assets/reference/smart-security-lock.webp',
    description:
      'Upgraded the main residential entrance with a 7-way biometric smart lock featuring Dual Battery life, 3D Face & Palm recognition, live mobile video feed (replacing a separate video door phone), and full entry logs.',
    isPlaceholder: true,
  },
  {
    id: 'proj-hyderabad-office',
    title: 'Home Office Setup',
    city: 'Hyderabad',
    property: 'Office Space',
    journey: 'Renovation',
    roomType: 'Office',
    productsUsed: ['Smart Keypads', 'Smart Sensors'],
    productsSummary: 'Smart Keypads + Sensors',
    image: '/assets/reference/keypad-hero-wide.jpg',
    description:
      'Created a distraction-free workspace with an integrated Lumora AC, Fan, Curtain & Scene keypad alongside USB-C desktop power and presence sensors.',
    isPlaceholder: true,
  },
  {
    id: 'proj-goa-villa',
    title: 'Whole-Home Automation',
    city: 'Goa',
    property: 'Villa',
    journey: 'New Build',
    roomType: 'Whole Home',
    productsUsed: ['Smart Keypads', 'Smart Curtain Motors', 'Climate Control', 'Smart Security', 'Smart Sensors'],
    productsSummary: 'Full product suite',
    image: '/assets/reference/curtain-open.jpg',
    description:
      'Complete architectural integration across living, dining, bedrooms, and perimeter security with invisible dual-track curtain automation and remote app management.',
    isPlaceholder: true,
  },
];

// [PLACEHOLDER — @SampleFAQ: clearly marked placeholder FAQ entries]
export const SAMPLE_FAQ = [
  {
    id: 'faq-1',
    question: 'Do I need to break walls or redo wiring for Lumora automation?',
    answer: 'No — our systems are wireless and designed to retrofit into existing homes without rewiring.',
  },
  {
    id: 'faq-2',
    question: 'Can I control everything from one app?',
    answer: 'Yes — the phone app, smart keypads and voice assistants all control the same system.',
  },
  {
    id: 'faq-3',
    question: 'Do you install outside major metro cities?',
    answer: 'Yes, we offer installation and support PAN India.',
  },
  {
    id: 'faq-4',
    question: "What's different about a new-build vs. renovation installation?",
    answer:
      'New-build lets us plan wiring points during construction; renovation uses wireless retrofit kits — both are fully supported.',
  },
  {
    id: 'faq-5',
    question: 'Is there a warranty on the hardware?',
    answer:
      'Yes, Lumora products come with a standard manufacturer warranty — your consultant will confirm specifics for your product.',
  },
];

// [PLACEHOLDER — @SampleFounderStory]
export const SAMPLE_FOUNDER_STORY =
  'Lumora Smart Tech was founded in 2025 by Kunal Sankhe on a simple belief: a smart home shouldn’t feel complicated.';

export const OUR_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation',
    summary: 'Understanding your lifestyle, floor plan, and whether you are renovating or building from scratch.',
    details: 'We walk through how your family uses each room, which routines matter most, and share transparent package estimates.',
  },
  {
    step: '02',
    title: 'Home Assessment',
    summary: 'Evaluating your existing switchboards, curtain pelmets, Wi-Fi coverage, and electrical points.',
    details: 'For renovations, we inspect your existing modular boxes. For new builds, we coordinate directly with your interior designer or electrical contractor.',
  },
  {
    step: '03',
    title: 'Custom Design',
    summary: 'Selecting keypad finishes, scene engravings, sensor placements, and motor sizing room by room.',
    details: 'You approve the exact finishes (Matte Black, Brushed Steel, Warm Brass, or White) and personalized scene names before installation begins.',
  },
  {
    step: '04',
    title: 'Installation',
    summary: 'Clean, wireless setup by trained technicians with zero wall damage or messy cabling.',
    details: 'Every keypad, curtain motor, climate pod, and sensor is installed, paired to the local gateway, and rigorously load-tested.',
  },
  {
    step: '05',
    title: 'Handover & Support',
    summary: 'Setting up phones and voice assistants for every family member, backed by PAN-India support.',
    details: 'We walk everyone in the home through the app, wall keypads, and voice commands, and remain a message away for scene tweaks.',
  },
];
