import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Grid,
  Blinds,
  Wind,
  Lock,
  Radio,
  Sun,
  Play,
  Pause,
  Zap,
  Activity,
  Wifi,
} from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

const ROOMS = [
  {
    id: 'living',
    code: 'ZONE 01',
    name: 'Living & Dining Lounge',
    shortName: 'Living Lounge',
    area: '480 sq.ft.',
    x: 24,
    y: 24,
    w: 336,
    h: 266,
    labelX: 42,
    labelY: 54,
    accent: '#F59E0B',
    accentSecondary: '#00D2FF',
    image: '/assets/reference/keypad-scene-evening.jpg',
    imageContain: false,
    sceneTitle: 'Evening – Warm Ambient Lounge',
    altSceneTitle: 'Morning – Natural Daylight (Sheer 50%)',
    telemetry: { temp: '23.0°C', lux: '320 lx • 2700K', power: '142W Active' },
    gatewayPath: 'M 470 96 L 360 96 L 210 155',
    nodes: [
      {
        id: 'liv-kpd',
        code: 'KPD',
        label: '8-Module Scene & Climate Keypad',
        sub: 'Flush Matte Black • AC, Fan, Curtain & 4 Scenes',
        status: 'Scene: Evening Warm',
        altStatus: 'Scene: Daylight 100%',
        nx: 342,
        ny: 145,
        icon: Grid,
      },
      {
        id: 'liv-mtr',
        code: 'MTR',
        label: 'Whisper-Silent Dual Curtain Motor',
        sub: 'Concealed Pelmet • Sheer + Blackout (<30dB)',
        status: 'Sheer 50% • Blackout Open',
        altStatus: 'Both Layers 100% Drawn',
        nx: 270,
        ny: 102,
        icon: Blinds,
      },
      {
        id: 'liv-cove',
        code: 'LUX',
        label: 'Tunable Architectural Cove & Chandelier',
        sub: 'Step-less 1%–100% Warm-to-Cool Dimming',
        status: 'ON • 80% Warm (2700K)',
        altStatus: 'Cinema Glow • 20% Amber',
        nx: 135,
        ny: 195,
        icon: Sun,
      },
    ],
    automationRule:
      'Pressing "Evening" on the living room keypad dims cove lighting to 80% warm gold, sets the split AC to 23°C, and glides sheer curtains to 50% automatically.',
  },
  {
    id: 'entrance',
    code: 'ZONE 02',
    name: 'Main Entrance & Foyer',
    shortName: 'Main Entrance',
    area: '145 sq.ft.',
    x: 374,
    y: 24,
    w: 192,
    h: 126,
    labelX: 390,
    labelY: 52,
    accent: '#00D2FF',
    accentSecondary: '#F59E0B',
    image: '/assets/reference/smart-security-lock.webp',
    imageContain: true,
    sceneTitle: 'Biometric Armed & Live Video Doorbell',
    altSceneTitle: 'Welcome Home Foyer Arrival Scene',
    telemetry: { temp: '24.5°C', lux: '180 lx • Foyer', power: 'Dual Batt 98%' },
    gatewayPath: 'M 470 96 L 420 55',
    nodes: [
      {
        id: 'ent-lock',
        code: 'LCK',
        label: '7-Way Biometric Video Smart Lock',
        sub: '3D Face, Palm, Fingerprint, RF, PIN, App & Key',
        status: 'Locked • Video Ready',
        altStatus: 'Face Verified • Log #418',
        nx: 405,
        ny: 112,
        icon: Lock,
      },
      {
        id: 'ent-hub',
        code: 'HUB',
        label: 'Lumora Encrypted Mesh Gateway',
        sub: 'AES-128 Local Processing • Offline Ready',
        status: '15 Nodes Synced (11ms)',
        altStatus: 'Broadcasting Scene Sync',
        nx: 470,
        ny: 112,
        icon: Wifi,
      },
      {
        id: 'ent-foyer',
        code: 'SNS',
        label: 'Foyer Welcome Chandelier & Door Sensor',
        sub: 'Instant Entry Trigger + Mobile Push Log',
        status: 'Armed • Auto-Welcome',
        altStatus: 'Foyer Warm Glow 100%',
        nx: 535,
        ny: 112,
        icon: Sparkles,
      },
    ],
    automationRule:
      'Unlocking the main door via 3D Face or Palm recognition disarms perimeter alerts, logs the entry timestamp on your phone, and switches on welcoming foyer lights.',
  },
  {
    id: 'bathroom',
    code: 'ZONE 03',
    name: 'Spa En-Suite Bathroom',
    shortName: 'Spa Bathroom',
    area: '150 sq.ft.',
    x: 374,
    y: 164,
    w: 192,
    h: 126,
    labelX: 390,
    labelY: 192,
    accent: '#00D2FF',
    accentSecondary: '#F59E0B',
    image: '/assets/reference/sensor-bathroom-active.jpg',
    imageContain: false,
    sceneTitle: 'Presence Detected – Warm Spa Ambience',
    altSceneTitle: 'Zero Occupancy – Standby Darkness (0W)',
    telemetry: { temp: '25.0°C', lux: '260 lx • Vanity', power: 'mmWave 60GHz' },
    gatewayPath: 'M 470 96 L 470 232',
    nodes: [
      {
        id: 'bath-radar',
        code: 'RDR',
        label: 'Ceiling Human Presence Radar Sensor',
        sub: 'Detects Entry, Posture, Breathing & Heartbeat',
        status: 'Occupied • 72 bpm Lock',
        altStatus: 'Standby • Scanning Cone',
        nx: 470,
        ny: 232,
        icon: Radio,
      },
      {
        id: 'bath-vanity',
        code: 'VNT',
        label: 'Backlit Vanity Mirror & Niche Circuits',
        sub: 'Zero-Glare Warm Spa & Night Path Lighting',
        status: 'ON • 100% Spa Warmth',
        altStatus: 'Night Path • 15% Amber',
        nx: 405,
        ny: 258,
        icon: Sun,
      },
      {
        id: 'bath-exhaust',
        code: 'CLM',
        label: 'Humidity-Linked Exhaust & Geyser Relay',
        sub: 'Auto-Trigger on Shower Steam > 70% RH',
        status: 'Auto-Ventilation Ready',
        altStatus: 'Morning Geyser Scheduled',
        nx: 536,
        ny: 258,
        icon: Wind,
      },
    ],
    automationRule:
      'Stepping into the dark bathroom triggers the ceiling presence sensor in <150ms, illuminating cove, mirror, and shower lights to your desired ambience without touching a switch.',
  },
  {
    id: 'bedroom',
    code: 'ZONE 04',
    name: 'Master Suite',
    shortName: 'Master Suite',
    area: '360 sq.ft.',
    x: 580,
    y: 24,
    w: 236,
    h: 266,
    labelX: 598,
    labelY: 54,
    accent: '#F59E0B',
    accentSecondary: '#00D2FF',
    image: '/assets/reference/climate-control-room.webp',
    imageContain: false,
    sceneTitle: 'Sleep Curve • 22°C AC + Fan Speed 2',
    altSceneTitle: '7:00 AM Sunrise Drapery Wake-Up',
    telemetry: { temp: '22.0°C', lux: '15 lx • Sleep', power: 'Eco Night Curve' },
    gatewayPath: 'M 470 96 L 580 96 L 698 155',
    nodes: [
      {
        id: 'bed-climate',
        code: 'CLM',
        label: '360° Smart AC & Silent Ceiling Fan Pod',
        sub: 'Two-Way Temp/Humidity Feedback + Sleep Curve',
        status: 'AC 22°C • Fan Speed 2',
        altStatus: 'Pre-Cool 20°C • Fan Spd 4',
        nx: 698,
        ny: 165,
        icon: Wind,
      },
      {
        id: 'bed-curtain',
        code: 'MTR',
        label: 'Master Blackout + Sheer Drapery Track',
        sub: '7:00 AM Sunrise Parting Schedule',
        status: '100% Blackout Privacy',
        altStatus: 'Sunrise Open • 75%',
        nx: 775,
        ny: 105,
        icon: Blinds,
      },
      {
        id: 'bed-keypad',
        code: 'KPD',
        label: 'Bedside Master "Good Night" Keypad',
        sub: 'Turns Off Whole Home + Locks Main Door',
        status: 'Bedside Night Glow',
        altStatus: 'All-Home Off Triggered',
        nx: 615,
        ny: 225,
        icon: Grid,
      },
    ],
    automationRule:
      'Maintains a whisper-quiet 22°C–24°C sleep curve with synchronized ceiling fan airflow overnight, then gently parts the blackout curtains at 7:00 AM.',
  },
  {
    id: 'study',
    code: 'ZONE 05',
    name: 'Home Office & Media Study',
    shortName: 'Home Office / Study',
    area: '310 sq.ft.',
    x: 24,
    y: 304,
    w: 792,
    h: 168,
    labelX: 42,
    labelY: 334,
    accent: '#00D2FF',
    accentSecondary: '#F59E0B',
    image: '/assets/reference/keypad-hero-wide.jpg',
    imageContain: false,
    sceneTitle: 'Focus Workspace & Media Studio Mode',
    altSceneTitle: 'Auto-Standby (Unoccupied Energy Saver)',
    telemetry: { temp: '23.5°C', lux: '450 lx • 4000K', power: 'USB-C PD 65W' },
    gatewayPath: 'M 470 96 L 470 304 L 380 390',
    nodes: [
      {
        id: 'std-kpd',
        code: 'KPD',
        label: 'Integrated Scene Keypad + 16A USB-C Socket',
        sub: 'Desk-Height Modular Frame • Fast Charge + Scene Control',
        status: 'Focus Scene + USB-C Ready',
        altStatus: 'Media Dimming • 30%',
        nx: 185,
        ny: 395,
        icon: Grid,
      },
      {
        id: 'std-sns',
        code: 'RDR',
        label: 'Flush Ceiling Presence & Ambient Lux Sensor',
        sub: 'Maintains 450 lx Constant Task Daylight on Desk',
        status: 'Desk Occupied • Active',
        altStatus: 'Auto-Off in 10 mins',
        nx: 465,
        ny: 388,
        icon: Radio,
      },
      {
        id: 'std-av',
        code: 'CLM',
        label: 'Study Split AC & Acoustic Blind Controller',
        sub: 'Zero-Noise Fan Profile During Video Calls',
        status: 'Silent Cool • 23.5°C',
        altStatus: 'Eco Standby • Blinds 50%',
        nx: 715,
        ny: 390,
        icon: Wind,
      },
    ],
    automationRule:
      'Presence detection keeps 4000K task lighting and whisper-quiet cooling active while you work at your desk, and powers down automatically 10 minutes after you step out.',
  },
];

/**
 * @Interaction5 — Interactive Architectural Blueprint & Digital Twin
 * Features a detailed CAD floor plan with furniture geometry, animated wireless mesh
 * signal packets from the central Lumora Gateway, interactive hardware node pins,
 * auto-tour mode, and a live room visual & scene simulator.
 */
export default function InteractiveFloorPlan() {
  const [activeRoomId, setActiveRoomId] = useState(ROOMS[0].id);
  const [autoTour, setAutoTour] = useState(true);
  const [toggledNodes, setToggledNodes] = useState({});
  const [sceneAltMode, setSceneAltMode] = useState({});
  const [pulseWave, setPulseWave] = useState(false);

  const activeRoom = ROOMS.find((r) => r.id === activeRoomId) || ROOMS[0];
  const isAltScene = Boolean(sceneAltMode[activeRoom.id]);

  // Smooth auto-tour across the 5 architectural zones
  useEffect(() => {
    if (!autoTour) return undefined;
    const interval = setInterval(() => {
      setActiveRoomId((prev) => {
        const idx = ROOMS.findIndex((r) => r.id === prev);
        return ROOMS[(idx + 1) % ROOMS.length].id;
      });
    }, 4800);
    return () => clearInterval(interval);
  }, [autoTour]);

  const handleSelectRoom = (roomId) => {
    setAutoTour(false);
    setActiveRoomId(roomId);
    setPulseWave(true);
    setTimeout(() => setPulseWave(false), 900);
  };

  const handleToggleNode = (nodeId) => {
    setAutoTour(false);
    setToggledNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleTriggerRoomScene = () => {
    setAutoTour(false);
    setSceneAltMode((prev) => ({
      ...prev,
      [activeRoom.id]: !prev[activeRoom.id],
    }));
    setPulseWave(true);
    setTimeout(() => setPulseWave(false), 900);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#06101F] via-charcoal-900 to-[#040B16] border border-cyan-electric/25 p-5 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Subtle Ambient Corner Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-electric/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-gold/10 blur-[110px]" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-electric/10 border border-cyan-electric/30 text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-electric">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Architectural Digital Twin</span>
            </span>
            <InteractiveCueBadge text="Click any room or node pin to inspect" accent="amber" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2 tracking-tight">
            Tap or Hover Any Room to Inspect Its Automation Nodes
          </h3>
        </div>

        {/* Live Tour & Scene Trigger Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setAutoTour((prev) => !prev)}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 transition-all ${
              autoTour
                ? 'bg-cyan-electric/15 border-cyan-electric/50 text-cyan-200 shadow-[0_0_20px_rgba(0,210,255,0.2)]'
                : 'bg-white/5 border-white/15 text-slate-300 hover:border-white/30'
            }`}
          >
            {autoTour ? <Pause className="w-3.5 h-3.5 text-cyan-electric" /> : <Play className="w-3.5 h-3.5" />}
            <span>{autoTour ? 'Auto-Scan: ON' : 'Resume Auto-Scan'}</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerRoomScene}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-xs inline-flex items-center gap-1.5 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Scene in {activeRoom.shortName}</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left CAD Floor Plan + Right Live Visual & Hardware Telemetry */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* LEFT COLUMN (7 Cols): Detailed Architectural CAD Blueprint SVG */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#030812] border border-cyan-electric/25 p-3 sm:p-5 shadow-inner relative overflow-hidden">
          {/* Top Blueprint Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-white/10 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-electric animate-ping" />
              <span className="text-cyan-200 font-semibold">LUMORA CAD BLUEPRINT v2.5</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline">SCALE 1:50 • ZERO-REWIRING MESH</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-amber-gold">
                <span className="w-2 h-2 rounded-full bg-amber-gold" /> Scene / Lighting
              </span>
              <span className="inline-flex items-center gap-1 text-cyan-electric">
                <span className="w-2 h-2 rounded-full bg-cyan-electric" /> Climate / Radar
              </span>
            </div>
          </div>

          {/* Interactive SVG Blueprint */}
          <div className="relative w-full overflow-hidden rounded-xl bg-[#02060D] border border-white/10">
            <svg
              viewBox="0 0 840 496"
              className="w-full h-auto select-none block"
              role="img"
              aria-label="Interactive architectural floor plan of a Lumora automated residence"
            >
              <defs>
                {/* Fine CAD Grid */}
                <pattern id="cadSubGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(0, 210, 255, 0.04)"
                    strokeWidth="0.75"
                  />
                </pattern>
                <pattern id="cadMajorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#cadSubGrid)" />
                  <path
                    d="M 100 0 L 0 0 0 100"
                    fill="none"
                    stroke="rgba(0, 210, 255, 0.09)"
                    strokeWidth="1"
                  />
                </pattern>

                {/* Amber Room Ambient Glow */}
                <radialGradient id="amberRoomGlow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(245, 158, 11, 0.28)" />
                  <stop offset="65%" stopColor="rgba(245, 158, 11, 0.08)" />
                  <stop offset="100%" stopColor="rgba(245, 158, 11, 0.0)" />
                </radialGradient>

                {/* Cyan Room Ambient Glow */}
                <radialGradient id="cyanRoomGlow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(0, 210, 255, 0.26)" />
                  <stop offset="65%" stopColor="rgba(0, 210, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(0, 210, 255, 0.0)" />
                </radialGradient>

                {/* Mesh Signal Thread Gradient */}
                <linearGradient id="meshSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D2FF" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#00D2FF" />
                </linearGradient>
              </defs>

              {/* Blueprint Background Grid */}
              <rect width="840" height="496" fill="url(#cadMajorGrid)" />

              {/* Outer Residence Architectural Perimeter Frame */}
              <rect
                x="16"
                y="16"
                width="808"
                height="464"
                rx="14"
                fill="none"
                stroke="rgba(0, 210, 255, 0.28)"
                strokeWidth="2"
              />

              {/* ================= ARCHITECTURAL ROOM ZONES ================= */}
              {ROOMS.map((room) => {
                const isSelected = activeRoom.id === room.id;
                const isAmber = room.accent === '#F59E0B';

                return (
                  <g
                    key={room.id}
                    onClick={() => handleSelectRoom(room.id)}
                    onMouseEnter={() => {
                      setAutoTour(false);
                      setActiveRoomId(room.id);
                    }}
                    className="cursor-pointer"
                  >
                    {/* Base Room Floor Fill */}
                    <rect
                      x={room.x}
                      y={room.y}
                      width={room.w}
                      height={room.h}
                      rx="10"
                      fill={isSelected ? '#081528' : '#050C18'}
                      stroke={isSelected ? room.accent : 'rgba(148, 163, 184, 0.25)'}
                      strokeWidth={isSelected ? '2.5' : '1.25'}
                    />

                    {/* Active Room Lighting Aura */}
                    {isSelected && (
                      <rect
                        x={room.x + 2}
                        y={room.y + 2}
                        width={room.w - 4}
                        height={room.h - 4}
                        rx="8"
                        fill={isAmber ? 'url(#amberRoomGlow)' : 'url(#cyanRoomGlow)'}
                      />
                    )}

                    {/* Interior Architectural Furniture CAD Silhouettes per Room */}
                    {room.id === 'living' && (
                      <g stroke={isSelected ? 'rgba(245,158,11,0.45)' : 'rgba(148,163,184,0.18)'} fill="none" strokeWidth="1.2">
                        {/* Motorized Top Window Drapery Pelmet */}
                        <rect x="60" y="28" width="250" height="8" rx="3" fill="rgba(0,210,255,0.12)" />
                        <line x1="70" y1="32" x2="300" y2="32" strokeDasharray="6 4" />
                        {/* L-Shaped Sectional Sofa */}
                        <rect x="52" y="95" width="135" height="44" rx="6" fill="rgba(255,255,255,0.02)" />
                        <rect x="52" y="95" width="42" height="110" rx="6" fill="rgba(255,255,255,0.02)" />
                        {/* Coffee Table */}
                        <rect x="110" y="152" width="66" height="36" rx="6" fill="rgba(245,158,11,0.05)" />
                        {/* Dining Table + 6 Chairs */}
                        <rect x="225" y="110" width="96" height="58" rx="8" fill="rgba(255,255,255,0.02)" />
                        <circle cx="248" cy="102" r="5" />
                        <circle cx="273" cy="102" r="5" />
                        <circle cx="298" cy="102" r="5" />
                        <circle cx="248" cy="176" r="5" />
                        <circle cx="273" cy="176" r="5" />
                        <circle cx="298" cy="176" r="5" />
                        {/* TV Media Wall at bottom of Living Lounge */}
                        <rect x="95" y="274" width="160" height="10" rx="3" fill="rgba(0,210,255,0.15)" />
                        {/* Doorway Swing Arc into Foyer */}
                        <path d="M 360 210 A 32 32 0 0 0 328 242" strokeDasharray="3 3" />
                      </g>
                    )}

                    {room.id === 'entrance' && (
                      <g stroke={isSelected ? 'rgba(0,210,255,0.45)' : 'rgba(148,163,184,0.18)'} fill="none" strokeWidth="1.2">
                        {/* Main Armoured Door + Swing Arc */}
                        <rect x="435" y="22" width="68" height="6" rx="2" fill="rgba(0,210,255,0.3)" />
                        <path d="M 435 28 A 48 48 0 0 0 483 76" strokeDasharray="4 3" />
                        {/* Biometric Scan Cone */}
                        <polygon
                          points="468,36 442,74 494,74"
                          fill="rgba(0,210,255,0.08)"
                          stroke="rgba(0,210,255,0.25)"
                        />
                        {/* Foyer Console Table */}
                        <rect x="518" y="65" width="38" height="70" rx="5" fill="rgba(255,255,255,0.02)" />
                      </g>
                    )}

                    {room.id === 'bathroom' && (
                      <g stroke={isSelected ? 'rgba(0,210,255,0.45)' : 'rgba(148,163,184,0.18)'} fill="none" strokeWidth="1.2">
                        {/* Glass Shower Enclosure */}
                        <rect x="386" y="218" width="68" height="62" rx="6" fill="rgba(0,210,255,0.04)" />
                        <line x1="386" y1="218" x2="454" y2="280" strokeDasharray="3 3" />
                        {/* Freestanding Spa Tub */}
                        <rect x="488" y="224" width="66" height="48" rx="20" fill="rgba(255,255,255,0.03)" />
                        {/* Radar Presence Concentric Rings */}
                        <circle
                          cx="470"
                          cy="232"
                          r={isSelected ? '36' : '24'}
                          stroke="rgba(0,210,255,0.3)"
                          strokeDasharray="4 4"
                        />
                      </g>
                    )}

                    {room.id === 'bedroom' && (
                      <g stroke={isSelected ? 'rgba(245,158,11,0.45)' : 'rgba(148,163,184,0.18)'} fill="none" strokeWidth="1.2">
                        {/* Motorized Balcony Curtain Pelmet */}
                        <rect x="615" y="28" width="170" height="8" rx="3" fill="rgba(245,158,11,0.18)" />
                        {/* King Bed + Pillows + Nightstands */}
                        <rect x="636" y="96" width="126" height="110" rx="8" fill="rgba(255,255,255,0.02)" />
                        <rect x="648" y="104" width="44" height="22" rx="4" />
                        <rect x="706" y="104" width="44" height="22" rx="4" />
                        <rect x="602" y="102" width="26" height="26" rx="4" />
                        <rect x="770" y="102" width="26" height="26" rx="4" />
                        {/* Wardrobe Wall */}
                        <rect x="610" y="264" width="180" height="18" rx="3" fill="rgba(255,255,255,0.02)" />
                      </g>
                    )}

                    {room.id === 'study' && (
                      <g stroke={isSelected ? 'rgba(0,210,255,0.45)' : 'rgba(148,163,184,0.18)'} fill="none" strokeWidth="1.2">
                        {/* Executive Workstation Desk & Chair */}
                        <rect x="130" y="366" width="120" height="52" rx="6" fill="rgba(255,255,255,0.02)" />
                        <circle cx="190" cy="434" r="14" />
                        {/* Media Lounge Sofa in Study */}
                        <rect x="395" y="365" width="150" height="50" rx="8" fill="rgba(255,255,255,0.02)" />
                        {/* Bookshelf & Acoustic Wall */}
                        <rect x="625" y="350" width="160" height="75" rx="8" fill="rgba(0,210,255,0.03)" />
                      </g>
                    )}

                    {/* Room Header Badge & Non-Overlapping Title */}
                    <g>
                      <rect
                        x={room.labelX - 6}
                        y={room.labelY - 18}
                        width={room.w - 24}
                        height="44"
                        rx="6"
                        fill="rgba(2, 6, 13, 0.82)"
                        stroke={isSelected ? room.accent : 'rgba(255,255,255,0.08)'}
                        strokeWidth="1"
                      />
                      <text
                        x={room.labelX + 4}
                        y={room.labelY - 2}
                        fill={isSelected ? '#FFFFFF' : '#CBD5E1'}
                        fontSize="12.5"
                        fontWeight="700"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {room.shortName}
                      </text>
                      <text
                        x={room.labelX + 4}
                        y={room.labelY + 16}
                        fill={isSelected ? room.accent : '#64748B'}
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {room.code} • {room.area} • {room.nodes.length} Nodes
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* ================= ANIMATED MESH THREADS FROM CENTRAL GATEWAY ================= */}
              {ROOMS.map((room) => {
                const isSelected = activeRoom.id === room.id;
                return (
                  <g key={`mesh-${room.id}`} className="pointer-events-none">
                    {/* Base Mesh Line */}
                    <path
                      d={room.gatewayPath}
                      fill="none"
                      stroke={isSelected ? room.accent : 'rgba(0, 210, 255, 0.18)'}
                      strokeWidth={isSelected ? '2.2' : '1.2'}
                      strokeDasharray="6 6"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="120"
                        to="0"
                        dur={isSelected ? '2.2s' : '5s'}
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Traveling Signal Packet on Selected Room Path */}
                    {isSelected && (
                      <circle r="4.5" fill={room.accent}>
                        <animateMotion
                          path={room.gatewayPath}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ================= INTERACTIVE HARDWARE NODE PINS ================= */}
              {ROOMS.map((room) => {
                const isRoomSelected = activeRoom.id === room.id;
                return room.nodes.map((node) => {
                  const isNodeToggled = Boolean(toggledNodes[node.id]);
                  const pinColor = isNodeToggled
                    ? '#34D399'
                    : isRoomSelected
                    ? room.accent
                    : '#38BDF8';

                  return (
                    <g
                      key={node.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRoom(room.id);
                        handleToggleNode(node.id);
                      }}
                      className="cursor-pointer"
                    >
                      {/* Pulsing Outer Halo on Active Room Nodes */}
                      {(isRoomSelected || pulseWave) && (
                        <circle
                          cx={node.nx}
                          cy={node.ny}
                          r="18"
                          fill="none"
                          stroke={pinColor}
                          strokeWidth="1.5"
                          opacity="0.55"
                        >
                          <animate
                            attributeName="r"
                            values="11;21;11"
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.7;0.1;0.7"
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Node Pin Badge */}
                      <circle
                        cx={node.nx}
                        cy={node.ny}
                        r={isRoomSelected ? '12' : '9'}
                        fill="#02060D"
                        stroke={pinColor}
                        strokeWidth={isRoomSelected ? '2.2' : '1.5'}
                      />
                      <text
                        x={node.nx}
                        y={node.ny + 3}
                        textAnchor="middle"
                        fill={pinColor}
                        fontSize={isRoomSelected ? '7.5' : '6.5'}
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {node.code}
                      </text>
                    </g>
                  );
                });
              })}
            </svg>
          </div>

          {/* Touch-Friendly Room Selector Tabs Below Blueprint */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ROOMS.map((room) => {
              const isSelected = activeRoom.id === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleSelectRoom(room.id)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-gold/20 via-[#0B192E] to-cyan-electric/20 border-amber-gold text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-cyan-electric/35 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-electric">
                    {room.code}
                  </span>
                  <span className="text-xs font-display font-bold truncate mt-0.5">
                    {room.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Live Room Photography Stage & Interactive Node Controls */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#040B16] border border-cyan-electric/30 overflow-hidden shadow-2xl">
          {/* Top Live Visual Room Preview Stage */}
          <div className="relative h-56 sm:h-64 bg-[#02060D] overflow-hidden border-b border-white/10">
            <img
              src={activeRoom.image}
              alt={activeRoom.name}
              className={`w-full h-full ${
                activeRoom.imageContain ? 'object-contain p-2' : 'object-cover'
              } object-center transition-all duration-700 ${
                isAltScene ? 'brightness-110 saturate-125 scale-[1.03]' : 'brightness-95 scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-[#040B16]/45 to-transparent" />

            {/* Simulated Scene Aura Overlay */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                isAltScene ? 'opacity-40' : 'opacity-15'
              }`}
              style={{
                background:
                  activeRoom.accent === '#F59E0B'
                    ? 'radial-gradient(circle at 50% 35%, rgba(245,158,11,0.45), transparent 70%)'
                    : 'radial-gradient(circle at 50% 35%, rgba(0,210,255,0.45), transparent 70%)',
              }}
            />

            {/* Top Floating Zone & Telemetry Pills */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#02060D]/90 backdrop-blur-md border border-cyan-electric/40 text-[11px] font-mono uppercase tracking-wider text-cyan-electric">
                {activeRoom.code} • {activeRoom.area}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#02060D]/90 backdrop-blur-md border border-white/15 text-[11px] font-mono text-amber-gold">
                  {activeRoom.telemetry.temp}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#02060D]/90 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-200">
                  {activeRoom.telemetry.lux}
                </span>
              </div>
            </div>

            {/* Bottom Room Title & Active Scene Readout inside Image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-gold">
                    {isAltScene ? activeRoom.altSceneTitle : activeRoom.sceneTitle}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-0.5">
                  {activeRoom.name}
                </h4>
              </div>
            </div>
          </div>

          {/* Room Automation Logic & Interactive Hardware Nodes */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
              {activeRoom.automationRule}
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <span>Installed Lumora Nodes ({activeRoom.nodes.length})</span>
                <span className="text-cyan-electric">Click any node to test</span>
              </div>

              <div className="space-y-2.5">
                {activeRoom.nodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isToggled = Boolean(toggledNodes[node.id]);
                  const statusText = isToggled || isAltScene ? node.altStatus : node.status;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => handleToggleNode(node.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                        isToggled
                          ? 'bg-[#091B34] border-cyan-electric/50 shadow-[0_0_20px_rgba(0,210,255,0.15)]'
                          : 'bg-charcoal-900/90 hover:bg-[#081528] border-white/10 hover:border-cyan-electric/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                            isToggled
                              ? 'bg-cyan-electric text-charcoal-950 border-cyan-200'
                              : 'bg-white/5 text-cyan-electric border-white/10 group-hover:border-cyan-electric/40'
                          }`}
                        >
                          <NodeIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-amber-gold">
                              {node.code}
                            </span>
                            <span className="text-xs sm:text-sm font-display font-bold text-white truncate">
                              {node.label}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">
                            {node.sub}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] whitespace-nowrap shrink-0 transition-all ${
                          isToggled || isAltScene
                            ? 'bg-cyan-electric/15 border-cyan-electric/45 text-cyan-200'
                            : 'bg-amber-gold/12 border-amber-gold/35 text-amber-300'
                        }`}
                      >
                        {statusText}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
