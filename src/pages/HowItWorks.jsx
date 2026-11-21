import React, { useState } from 'react';
import {
  Smartphone,
  Grid,
  Mic,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sun,
  Wind,
  Lock,
  Blinds,
  Tv,
  Power,
  Activity,
  RotateCcw,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LumoraLogo from '../components/LumoraLogo';
import ConnectivityThreadDemo from '../components/interactions/ConnectivityThreadDemo';
import InteractiveCueBadge from '../components/interactions/InteractiveCueBadge';
import { useInquiry } from '../context/InquiryContext';

const CONTROL_PILLARS = [
  {
    id: 'phone',
    name: 'Phone App',
    badge: 'CONTROL PILLAR 01 • MOBILE APP',
    headline: 'Your Entire Residence in Your Pocket',
    icon: Smartphone,
    accent: 'cyan',
    sceneImage: '/assets/reference/keypad-scene-evening.jpg',
    sceneCaption: 'Live Remote Telemetry • iOS & Android',
    uiOverlayTitle: 'Lumora iOS & Android Dashboard',
    uiSubtitle: 'Real-Time Room Telemetry & Remote Scene Orchestration',
    uiItems: [
      {
        id: 'cove-lights',
        label: 'Living Room Cove Lights',
        zone: 'Living Lounge • Circuit 01',
        protocol: 'App Dimmer • 2700K Warm',
        state: 'ON • 80% Warm',
        altState: 'Dimmed • 25% Lounge',
        icon: Sun,
        statusColor: 'amber',
      },
      {
        id: 'master-ac',
        label: 'Master Suite Split AC',
        zone: 'Master Bedroom • Climate Pod',
        protocol: 'Geo-Pre-Cool • Auto Fan',
        state: 'Cooling • 22°C',
        altState: 'Eco Night Curve • 24°C',
        icon: Wind,
        statusColor: 'cyan',
      },
      {
        id: 'main-lock',
        label: 'Main Entrance Biometric Lock',
        zone: 'Foyer • 7-Way Smart Mortise',
        protocol: 'Dual Battery (98%) • Video Active',
        state: 'Locked & Armed',
        altState: 'Remote Verified • Log #412',
        icon: Lock,
        statusColor: 'emerald',
      },
      {
        id: 'drapes',
        label: 'Sheer + Blackout Drapes',
        zone: 'Living Window • Dual Pelmet',
        protocol: 'Astro Sunset Schedule',
        state: 'Closed (Night Schedule)',
        altState: 'Sheer 50% Open • Daylight',
        icon: Blinds,
        statusColor: 'amber',
      },
    ],
    points: [
      'Real-time status of every light, fan, AC, curtain, and door lock from anywhere in the world',
      'Create custom schedules aligned with Indian sunrise/sunset times',
      'Receive instant alerts if a door is unlocked or a safety sensor triggers',
    ],
  },
  {
    id: 'keypad',
    name: 'Smart Keypads',
    badge: 'CONTROL PILLAR 02 • IN-WALL MULTI-FUNCTION PANELS',
    headline: 'Tactile Wall Control for AC, Fan, Curtains, Scenes & Power',
    icon: Grid,
    accent: 'amber',
    sceneImage: '/assets/reference/keypad-hero-wide.jpg',
    sceneCaption: 'Flush Matte Architectural Wall Panel',
    uiOverlayTitle: 'Integrated Scene, Climate & Universal Socket Panel',
    uiSubtitle: '8-Module Flush Glass & Anodised Metal Wall Bus',
    uiItems: [
      {
        id: 'climate-curtain-mod',
        label: 'Climate & Curtain Module',
        zone: 'Left 3-Row Tactile Bank',
        protocol: 'Step-less (– / +) & Dual Track',
        state: 'AC 24°C • Fan Spd 2 • Drapes',
        altState: 'AC 22°C • Fan Spd 4 • Open 50%',
        icon: Wind,
        statusColor: 'cyan',
      },
      {
        id: 'morning-rocker',
        label: 'Morning – Natural Daylight',
        zone: 'Scene Button 01 • Full Sun Icon',
        protocol: 'Single-Press Multi-Circuit',
        state: 'Curtains 100% + Daylight ON',
        altState: 'Scene Standby • Ready',
        icon: Sun,
        statusColor: 'amber',
      },
      {
        id: 'tv-rocker',
        label: 'TV Time – Family Entertainment',
        zone: 'Scene Button 03 • TV Icon',
        protocol: 'AV Power + Cove Dimming',
        state: 'TV ON • Cove 25% • Drapes Drawn',
        altState: 'Cinema Mode • Bias Glow 15%',
        icon: Tv,
        statusColor: 'cyan',
      },
      {
        id: 'exit-socket',
        label: 'Exit – All Systems Off + Socket',
        zone: 'Crescent Moon + 16A USB-C Outlet',
        protocol: 'Master Kill Switch + PD Fast Charge',
        state: 'All Off • 16A + USB-C Active',
        altState: 'Away Armed • Standby 0W',
        icon: Power,
        statusColor: 'emerald',
      },
    ],
    points: [
      'Consolidates AC, fan speed, curtain triggers, lighting scenes, and a universal power + USB-C outlet into one flush frame',
      'Backlit laser-etched icons make it effortless for parents, children, and guests without needing a phone',
      'Retrofits directly into standard Indian modular wall boxes with zero rewiring',
    ],
  },
  {
    id: 'voice',
    name: 'Voice Assistants',
    badge: 'CONTROL PILLAR 03 • HANDS-FREE VOICE',
    headline: 'Just Speak Naturally to Set the Scene',
    icon: Mic,
    accent: 'cyan',
    sceneImage: '/assets/reference/keypad-scene-morning.jpg',
    sceneCaption: 'Apple Home (Siri) • Google Home • Amazon Alexa',
    uiOverlayTitle: 'Siri • Google Home • Amazon Alexa',
    uiSubtitle: 'Zero-Latency Natural Voice Routine Matrix',
    uiItems: [
      {
        id: 'voice-guest',
        label: '“Hey Siri, turn on Guest Mode”',
        zone: 'Apple HomeKit Bridge • Living & Dining',
        protocol: 'Multi-Room Scene Trigger',
        state: 'Living Lights 85% + AC 23°C ON',
        altState: 'Chandelier Warm + Music Active',
        icon: Sparkles,
        statusColor: 'amber',
      },
      {
        id: 'voice-curtain',
        label: '“Alexa, set sheer curtains to 50%”',
        zone: 'Amazon Echo • Master Suite Pelmet',
        protocol: 'Whisper-Silent Brushless Motor',
        state: 'Sheer Track Gliding to 50%',
        altState: 'Both Sheer & Blackout Closed',
        icon: Blinds,
        statusColor: 'cyan',
      },
      {
        id: 'voice-night',
        label: '“Hey Google, Good Night”',
        zone: 'Google Home • Whole Residence',
        protocol: 'Perimeter Lock + Climate Curve',
        state: 'All Lights Off + Main Door Locked',
        altState: 'Night Sensor Path 15% Armed',
        icon: Lock,
        statusColor: 'emerald',
      },
    ],
    points: [
      'Works natively with Apple Home (Siri), Google Home, and Amazon Alexa speakers',
      'Trigger multi-device routines with a single phrase while cooking or relaxing in bed',
      'All voice commands stay synchronized with your wall keypads and phone app',
    ],
  },
];

export default function HowItWorks() {
  const [activePillar, setActivePillar] = useState(CONTROL_PILLARS[0]);
  const [toggledRows, setToggledRows] = useState({});
  const { openInquiry } = useInquiry();

  const toggleRowState = (rowId) => {
    setToggledRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const resetPillarRows = () => {
    setToggledRows({});
  };

  const hasToggledInActive = activePillar.uiItems.some((item) => toggledRows[item.id]);

  return (
    <>
      <SEOHead
        title="How Wireless Smart Home Automation Works | Lumora Smart Tech"
        description="Discover how Lumora Smart Tech combines Phone App, Smart Keypads, and Voice Assistants over a wireless no-rewiring architecture across PAN India."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple Outside • Intelligent Inside</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              How Lumora Smart Tech Works
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Wireless automation and integration giving the homeowner complete control of their home — via phone app, smart keypads, and voice assistants.
            </p>
          </div>
        </div>
      </section>

      {/* 1. THREE-PILLAR INTERACTIVE EXPLAINER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-electric">
                Interactive Control Switcher
              </span>
              <InteractiveCueBadge text="Click any pillar below to try" accent="cyan" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2">
              Click Each Pillar to See That Control Method in Action
            </h2>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8" role="tablist">
            {CONTROL_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activePillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePillar(pillar)}
                  className={`min-h-[64px] p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'bg-charcoal-900 border-amber-gold shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                      : 'bg-charcoal-900/50 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-gold text-charcoal-950' : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-base font-display font-bold text-white">{pillar.name}</div>
                    <div className="text-xs text-slate-400">Tap to inspect view</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Swappable Active Pillar Stage */}
          <div className="rounded-3xl bg-charcoal-900/95 border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Pillar Copy & Key Benefits */}
              <div className="lg:col-span-5 space-y-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-xs font-mono uppercase tracking-widest text-amber-gold">
                  {activePillar.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  {activePillar.headline}
                </h3>

                <ul className="space-y-3.5 pt-2">
                  {activePillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm sm:text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-amber-gold shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Uncropped Official Brand Assurance Card */}
                <div className="pt-3">
                  <div className="p-4 rounded-2xl bg-[#030914]/90 border border-cyan-electric/25 flex items-center justify-between gap-4">
                    <LumoraLogo showTagline />
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Mesh Synced
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 font-mono">
                        AES-128 Encrypted • &lt;15ms
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Redesigned Architectural Control Table & Uncropped Brand Header */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-cyan-electric/30 bg-[#040B16] shadow-[0_20px_60px_rgba(0,0,0,0.75)]">
                  {/* Top Visual & Uncropped Official Logo Header Banner */}
                  <div className="relative p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-[#02060D] via-[#07162C] to-[#02060D] overflow-hidden">
                    {/* Subtle Room Scene Preview Backdrop (Right Side Only, No Cropped Text) */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30">
                      <img
                        src={activePillar.sceneImage}
                        alt={activePillar.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#040B16] via-[#040B16]/70 to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                      {/* Full Uncropped Official Circular Lumora Emblem + Dashboard Title */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#02060D] border border-cyan-electric/60 p-1 shadow-[0_0_25px_rgba(0,210,255,0.35)] shrink-0 flex items-center justify-center">
                          <img
                            src="/assets/reference/lumora-logo.jpg"
                            alt="LUMORA SMART TECH Official Logo"
                            className="w-full h-full object-contain object-center rounded-xl"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-electric font-semibold">
                              {activePillar.uiOverlayTitle}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-display font-bold text-white mt-0.5">
                            {activePillar.uiSubtitle}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {activePillar.sceneCaption}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Prompt Pill */}
                      <div className="flex items-center gap-2">
                        <InteractiveCueBadge text="Click any row to toggle state" accent="amber" />
                      </div>
                    </div>
                  </div>

                  {/* Structured Multi-Column Control Table */}
                  <div className="p-4 sm:p-5">
                    {/* Desktop/Tablet Column Headers */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-3.5 pb-2.5 mb-2.5 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                      <div className="col-span-7">Zone / Connected Module &amp; Protocol</div>
                      <div className="col-span-5 text-right">Live Status (Tap Row to Toggle)</div>
                    </div>

                    {/* Interactive Table Rows */}
                    <div className="space-y-2.5" role="table" aria-label={activePillar.uiOverlayTitle}>
                      {activePillar.uiItems.map((row, index) => {
                        const RowIcon = row.icon;
                        const isToggled = Boolean(toggledRows[row.id]);
                        const currentStatus = isToggled ? row.altState : row.state;

                        const badgeStyles =
                          isToggled
                            ? 'bg-cyan-electric/15 border-cyan-electric/50 text-cyan-200 shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                            : row.statusColor === 'emerald'
                            ? 'bg-emerald-500/12 border-emerald-400/35 text-emerald-300'
                            : row.statusColor === 'cyan'
                            ? 'bg-cyan-electric/12 border-cyan-electric/35 text-cyan-300'
                            : 'bg-amber-gold/12 border-amber-gold/35 text-amber-300';

                        const dotStyles =
                          isToggled
                            ? 'bg-cyan-electric'
                            : row.statusColor === 'emerald'
                            ? 'bg-emerald-400'
                            : row.statusColor === 'cyan'
                            ? 'bg-cyan-electric'
                            : 'bg-amber-gold';

                        return (
                          <button
                            key={row.id}
                            type="button"
                            onClick={() => toggleRowState(row.id)}
                            className={`w-full text-left rounded-xl p-3.5 border transition-all grid grid-cols-1 sm:grid-cols-12 gap-3 items-center group ${
                              isToggled
                                ? 'bg-[#091931] border-cyan-electric/45 shadow-[0_0_20px_rgba(0,210,255,0.12)]'
                                : 'bg-charcoal-900/90 hover:bg-[#081529] border-white/10 hover:border-cyan-electric/30'
                            }`}
                          >
                            {/* Col 1: Device Icon + Full Uncropped Label + Room Zone & Protocol */}
                            <div className="sm:col-span-7 flex items-start sm:items-center gap-3.5 min-w-0">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                  isToggled
                                    ? 'bg-cyan-electric text-charcoal-950 border-cyan-200'
                                    : 'bg-white/[0.04] text-cyan-electric border-white/10 group-hover:border-cyan-electric/40'
                                }`}
                              >
                                <RowIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-electric">
                                    0{index + 1}
                                  </span>
                                  <span className="text-sm font-display font-bold text-white leading-snug">
                                    {row.label}
                                  </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
                                  <span>{row.zone}</span>
                                  <span className="text-slate-600">•</span>
                                  <span className="font-mono text-slate-300">{row.protocol}</span>
                                </div>
                              </div>
                            </div>

                            {/* Col 2: Crisp Single-Line Live Status Pill */}
                            <div className="sm:col-span-5 flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/5">
                              <span className="sm:hidden text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                Live Status:
                              </span>
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-medium whitespace-nowrap transition-all ${badgeStyles}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${dotStyles}`}
                                />
                                <span>{currentStatus}</span>
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Table Footer Telemetry Bar */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-cyan-electric" />
                        <span>
                          {activePillar.uiItems.length} Active Endpoints • Instant 3-Way Sync (App ⇄ Keypad ⇄ Voice)
                        </span>
                      </div>

                      {hasToggledInActive ? (
                        <button
                          type="button"
                          onClick={resetPillarRows}
                          className="inline-flex items-center gap-1 text-cyan-electric hover:text-amber-gold transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset States</span>
                        </button>
                      ) : (
                        <span className="text-amber-gold/90">Tap any row to simulate live toggle</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTEGRATION DIAGRAM WITH CONNECTIVITY THREAD ANIMATION (@Interaction11) */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ConnectivityThreadDemo />

          <div className="text-center">
            <button
              type="button"
              onClick={() => openInquiry({ sourceLabel: 'How It Works Page — Book Consultation' })}
              className="min-h-[52px] px-8 py-3.5 rounded-2xl bg-amber-gold hover:bg-amber-soft text-charcoal-950 font-display font-bold text-base inline-flex items-center gap-2 transition-colors"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
