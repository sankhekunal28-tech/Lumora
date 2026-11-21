import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Radio,
  Grid,
  Smartphone,
  Sparkles,
  Wifi,
  ShieldCheck,
  Zap,
  Activity,
} from 'lucide-react';
import InteractiveCueBadge from './InteractiveCueBadge';

const NODES = [
  {
    id: 'gateway',
    code: 'NODE 01 • CORE HUB',
    name: 'Lumora Mesh Gateway',
    role: 'Local Intelligence & Offline Engine',
    icon: Cpu,
    accent: 'amber',
    latency: '< 12 ms local mesh',
    protocol: 'Zigbee 3.0 + Matter Bridge + AES-128',
    image: '/assets/reference/full-home-integration.jpg',
    liveAction: 'Broadcasting Scene Sync Across 5 Rooms',
    metrics: [
      { label: 'Local Uptime', value: '99.99% (No Internet Needed)' },
      { label: 'Encryption', value: 'AES-128 Hardware Key' },
      { label: 'Range', value: 'Self-Healing Multi-Floor Mesh' },
    ],
    description:
      'Sits discreetly beside your home router and executes every keypad scene, presence sensor trigger, and curtain schedule locally — so your home responds instantaneously even if your ISP internet drops.',
  },
  {
    id: 'sensors',
    code: 'NODE 02 • PERCEPTION',
    name: '60GHz Presence & Safety Sensors',
    role: 'Human Vitals, Lux & Perimeter Nodes',
    icon: Radio,
    accent: 'cyan',
    latency: '< 150 ms wake trigger',
    protocol: 'mmWave Radar + Micro-Motion Lock',
    image: '/assets/reference/sensor-bathroom-active.jpg',
    liveAction: 'Bathroom Presence Locked (72 bpm) → Cove ON',
    metrics: [
      { label: 'Detection', value: 'Walking, Posture & Breathing' },
      { label: 'Privacy', value: '100% Camera-Free Radar' },
      { label: 'Lux Sync', value: 'Real-Time Daylight Harvesting' },
    ],
    description:
      'Ceiling-mounted human presence sensors detect the exact moment you enter a dark bathroom or hallway, whispering encrypted triggers to the Gateway to illuminate warm architectural lighting.',
  },
  {
    id: 'keypad',
    code: 'NODE 03 • TACTILE WALL',
    name: '8-Module Scene & Climate Keypads',
    role: 'In-Wall Scene, AC, Fan, Curtain & Socket',
    icon: Grid,
    accent: 'amber',
    latency: 'Zero-lag physical press',
    protocol: 'Direct Indian Modular Box Retrofit',
    image: '/assets/reference/keypad-hero-wide.jpg',
    liveAction: 'Evening Scene Pressed → Dimming + Curtains 50%',
    metrics: [
      { label: 'Scenes', value: 'Morning, Evening, TV Time, Exit' },
      { label: 'Appliances', value: 'AC, Fan (–/+), Dual Curtains' },
      { label: 'Power', value: '16A Universal + USB-C Fast PD' },
    ],
    description:
      'Replaces cluttered plastic switchboards with zero wall breakage. Pressing any backlit laser-etched scene button orchestrates lights, curtains, AC, and updates the mobile app simultaneously.',
  },
  {
    id: 'app',
    code: 'NODE 04 • OMNI-CONTROL',
    name: 'Lumora App & Voice Assistants',
    role: 'iOS, Android, Siri, Google Home & Alexa',
    icon: Smartphone,
    accent: 'cyan',
    latency: 'Real-time 3-way sync',
    protocol: 'Cloud Telemetry + Local Voice Bridge',
    image: '/assets/reference/keypad-scene-tv.jpg',
    liveAction: 'Remote Command Verified → All Locks Armed',
    metrics: [
      { label: 'Voice', value: 'Apple Siri • Alexa • Google' },
      { label: 'Security', value: 'Live Doorbell Video + Logs' },
      { label: 'Schedules', value: 'Indian Sunrise / Sunset Sync' },
    ],
    description:
      'Monitor and command every room from your sofa or from across the world. Unlock your 7-way biometric main door on live video, adjust sheer curtains to 50%, or speak naturally to set the mood.',
  },
];

/**
 * @Interaction11 — Upgraded Animated Wireless Mesh & Signal Topology
 */
export default function ConnectivityThreadDemo() {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);
  const [autoCycle, setAutoCycle] = useState(true);
  const [packetBurst, setPacketBurst] = useState(false);

  useEffect(() => {
    if (!autoCycle) return undefined;
    const timer = setInterval(() => {
      setSelectedNode((prev) => {
        const idx = NODES.findIndex((n) => n.id === prev.id);
        return NODES[(idx + 1) % NODES.length];
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [autoCycle]);

  const handleSelectNode = (node) => {
    setAutoCycle(false);
    setSelectedNode(node);
    setPacketBurst(true);
    setTimeout(() => setPacketBurst(false), 800);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#06101F] via-charcoal-900 to-[#040B16] border border-cyan-electric/25 p-5 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full bg-cyan-electric/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-gold/10 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-tech/15 border border-cyan-electric/30 text-cyan-electric text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Encrypted Wireless Mesh Topology</span>
          </div>
          <InteractiveCueBadge text="Click any node below to inspect live telemetry" accent="cyan" />
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Gateway ↔ Sensors ↔ Keypads ↔ App
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          Watch how encrypted wireless packets travel across your home in under 15 milliseconds — with zero new control cables.
        </p>
      </div>

      {/* Animated SVG Signal Highway (Desktop) */}
      <div className="relative z-10 py-2">
        <svg
          viewBox="0 0 1000 110"
          className="hidden lg:block w-full h-28 pointer-events-none select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="meshHighwayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="33%" stopColor="#00D2FF" />
              <stop offset="66%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
            <filter id="meshGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Upper & Lower Encrypted Bus Tracks */}
          <path
            d="M 125 55 C 250 20, 250 90, 375 55 C 500 20, 500 90, 625 55 C 750 20, 750 90, 875 55"
            fill="none"
            stroke="rgba(0, 210, 255, 0.16)"
            strokeWidth="2"
          />
          <line x1="125" y1="55" x2="875" y2="55" stroke="#1E293B" strokeWidth="4" />

          {/* Animated Dashed Signal Beam */}
          <line
            x1="125"
            y1="55"
            x2="875"
            y2="55"
            stroke="url(#meshHighwayGrad)"
            strokeWidth="3.5"
            strokeDasharray="16 10"
            filter="url(#meshGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="260"
              to="0"
              dur={packetBurst ? '1.2s' : '3.2s'}
              repeatCount="indefinite"
            />
          </line>

          {/* Forward & Return Traveling Data Packets */}
          <circle r="5" fill="#00D2FF" filter="url(#meshGlow)">
            <animate attributeName="cx" values="125;875;125" dur="4.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="55;55;55" dur="4.2s" repeatCount="indefinite" />
          </circle>
          <circle r="4.5" fill="#F59E0B" filter="url(#meshGlow)">
            <animate attributeName="cx" values="875;125;875" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="55;55;55" dur="3.6s" repeatCount="indefinite" />
          </circle>

          {/* Four Node Anchor Hubs */}
          {[125, 375, 625, 875].map((cx, i) => {
            const isSelected = selectedNode.id === NODES[i].id;
            const color = i % 2 === 0 ? '#F59E0B' : '#00D2FF';
            return (
              <g key={cx}>
                {isSelected && (
                  <circle cx={cx} cy="55" r="24" fill="none" stroke={color} strokeWidth="2">
                    <animate attributeName="r" values="14;28;14" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={cx} cy="55" r={isSelected ? '12' : '8'} fill="#02060D" stroke={color} strokeWidth="3" />
                <circle cx={cx} cy="55" r="4" fill={color} />
              </g>
            );
          })}
        </svg>

        {/* Four Interactive Node Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode.id === node.id;
            const isCyan = node.accent === 'cyan';

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => handleSelectNode(node)}
                aria-pressed={isSelected}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? isCyan
                      ? 'bg-[#07182E] border-cyan-electric shadow-[0_0_30px_rgba(0,210,255,0.25)] -translate-y-1'
                      : 'bg-[#17130A] border-amber-gold shadow-[0_0_30px_rgba(245,158,11,0.25)] -translate-y-1'
                    : 'bg-charcoal-950/75 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? isCyan
                          ? 'bg-cyan-electric text-charcoal-950 shadow-[0_0_15px_rgba(0,210,255,0.5)]'
                          : 'bg-amber-gold text-charcoal-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                        : 'bg-white/5 text-slate-300 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                    {node.code}
                  </span>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-display font-bold text-white">
                    {node.name}
                  </div>
                  <div
                    className={`text-xs font-medium mt-0.5 ${
                      isCyan ? 'text-cyan-electric' : 'text-amber-gold'
                    }`}
                  >
                    {node.role}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{node.latency}</span>
                    <span className={isSelected ? 'text-emerald-400' : 'text-slate-500'}>
                      {isSelected ? '● INSPECTING' : 'Tap to view'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep-Dive Visual & Telemetry Stage */}
      <div className="relative z-10 mt-6 rounded-2xl bg-[#030914] border border-cyan-electric/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        {/* Left Visual Preview of Active Node */}
        <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] bg-[#02060D] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          <img
            src={selectedNode.image}
            alt={selectedNode.name}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-[#030914]/35 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#02060D]/90 backdrop-blur-md border border-cyan-electric/35 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Activity className="w-4 h-4 text-cyan-electric shrink-0 animate-pulse" />
              <span className="text-xs font-mono text-white truncate">
                {selectedNode.liveAction}
              </span>
            </div>
          </div>
        </div>

        {/* Right Detailed Telemetry & Specs */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-gold">
                ACTIVE MESH TELEMETRY • {selectedNode.code}
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-electric/10 border border-cyan-electric/35 text-xs font-mono text-cyan-electric">
                {selectedNode.protocol}
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
              {selectedNode.name}
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {selectedNode.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {selectedNode.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-charcoal-900/90 border border-white/10"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-display font-bold text-white mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
