import React, { useState } from 'react';
import { Thermometer, Wind, Sparkles, Minus, Plus, Power, Snowflake } from 'lucide-react';
import { RealisticClimateRoom } from './AnimatedClimateStage';
import InteractiveCueBadge from './InteractiveCueBadge';

/**
 * @Interaction10 — Live Climate Dial & Realistic Room AC + Ceiling Fan Simulator
 * Combines the circular thermostat dial and fan speed controls with the live animated
 * living room photograph (Split AC cool airflow + 3D rotating Ceiling Fan + Phone App sync).
 */
export default function LiveClimateDial() {
  const [acOn, setAcOn] = useState(true);
  const [temp, setTemp] = useState(22); // 16°C to 30°C
  const [fanOn, setFanOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(3); // 1 to 5

  const minTemp = 16;
  const maxTemp = 30;
  const ratio = (temp - minTemp) / (maxTemp - minTemp);

  const getWashGradient = () => {
    if (!acOn) {
      return 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.4), rgba(11, 13, 17, 0.98))';
    }
    if (temp <= 20) {
      return 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.28), rgba(11, 13, 17, 0.96))';
    }
    if (temp <= 24) {
      return 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.22), rgba(245, 158, 11, 0.12), rgba(11, 13, 17, 0.96))';
    }
    return 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.30), rgba(11, 13, 17, 0.96))';
  };

  const accentHex = !acOn ? '#64748B' : temp <= 23 ? '#22D3EE' : '#F59E0B';
  const strokeDashoffset = 565 - ratio * 420;

  return (
    <div
      className="rounded-3xl border border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500"
      style={{ background: getWashGradient() }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Live Animated Living Room (Split AC Airflow + Spinning Ceiling Fan + Phone UI) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[460px] rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            <RealisticClimateRoom
              acOn={acOn}
              acTemp={temp}
              fanOn={fanOn}
              fanSpeed={fanSpeed}
              onToggleAc={() => setAcOn((prev) => !prev)}
              onToggleFan={() => setFanOn((prev) => !prev)}
              onChangeTemp={(newT) => {
                setAcOn(true);
                setTemp(newT);
              }}
              onChangeFanSpeed={(spd) => {
                setFanOn(true);
                setFanSpeed(spd);
              }}
            />
          </div>
        </div>

        {/* Right Column: Interactive Circular Thermostat Dial & Fan Speed Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-tech/15 border border-cyan-electric/30 text-xs font-semibold uppercase tracking-wider text-cyan-electric">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive AC &amp; Ceiling Fan Simulator</span>
              </div>
              <InteractiveCueBadge text="Click phone or controls to try" accent="cyan" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
              Watch the Split AC &amp; Ceiling Fan Respond Live
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              Adjust the thermostat dial (<strong className="text-cyan-electric">16°C – 30°C</strong>) or change the <strong className="text-amber-gold">Ceiling Fan Speed (1 – 5)</strong> below — watch the indoor AC airflow mist, ceiling fan blade rotation, and smartphone screen update in real time.
            </p>
          </div>

          {/* Interactive Circular Thermostat Dial + Quick Power Toggles */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-charcoal-950/85 border border-white/10">
            {/* Circular Dial */}
            <div className="relative w-48 h-48 flex items-center justify-center select-none shrink-0">
              <svg viewBox="0 0 220 220" className="w-full h-full -rotate-135">
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="14"
                  strokeDasharray="420 565"
                  strokeLinecap="round"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  fill="none"
                  stroke={accentHex}
                  strokeWidth="14"
                  strokeDasharray="565"
                  strokeDashoffset={acOn ? strokeDashoffset : 565}
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />
              </svg>

              <div className="absolute inset-6 rounded-full bg-charcoal-900 border border-white/15 shadow-inner flex flex-col items-center justify-center text-center p-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                  AIR CONDITIONER
                </span>
                <div className="text-4xl font-display font-extrabold text-white tracking-tight my-0.5">
                  {acOn ? (
                    <>
                      {temp}°<span className="text-lg text-slate-400">C</span>
                    </>
                  ) : (
                    <span className="text-2xl text-slate-500">OFF</span>
                  )}
                </div>

                {/* Plus / Minus Step Buttons inside Dial */}
                <div className="mt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    aria-label="Decrease temperature"
                    onClick={() => {
                      setAcOn(true);
                      setTemp((t) => Math.max(minTemp, t - 1));
                    }}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Increase temperature"
                    onClick={() => {
                      setAcOn(true);
                      setTemp((t) => Math.min(maxTemp, t + 1));
                    }}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side of card: Range Slider & AC Power Toggle */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-display font-bold text-white">Split AC Control</div>
                  <div className="text-xs text-slate-400">
                    {acOn
                      ? temp <= 20
                        ? 'Turbo Arctic Cooling Active'
                        : temp <= 24
                        ? 'Optimal Comfort Airflow'
                        : 'Gentle Eco Cooling'
                      : 'AC Compressor Standby'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAcOn((prev) => !prev)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    acOn
                      ? 'bg-cyan-electric text-charcoal-950 border-cyan-electric shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                      : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{acOn ? 'AC ON' : 'AC OFF'}</span>
                </button>
              </div>

              <div>
                <label htmlFor="climate-temp-slider" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Slide Temperature ({temp}°C)
                </label>
                <input
                  id="climate-temp-slider"
                  type="range"
                  min={minTemp}
                  max={maxTemp}
                  value={temp}
                  onChange={(e) => {
                    setAcOn(true);
                    setTemp(Number(e.target.value));
                  }}
                  className="w-full lumora-range bg-gradient-to-r from-cyan-400 via-slate-400 to-amber-500 rounded-full h-2.5"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
                  <span>16°C (Turbo)</span>
                  <span>22°C (Ideal)</span>
                  <span>30°C (Eco)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ceiling Fan Speed Selector (1 to 5 + Power Toggle) */}
          <div className="p-5 rounded-2xl bg-charcoal-950/85 border border-white/10 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Wind className={`w-5 h-5 ${fanOn ? 'text-cyan-electric animate-pulse' : 'text-slate-500'}`} />
                <div>
                  <div className="text-sm font-display font-bold text-white">
                    Ceiling Fan Speed Control
                  </div>
                  <div className="text-xs text-slate-400">
                    {fanOn ? `Running at Speed ${fanSpeed} (Silent Step-less Drive)` : 'Ceiling Fan Stopped'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFanOn((prev) => !prev)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  fanOn
                    ? 'bg-amber-gold text-charcoal-950 border-amber-gold shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                    : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{fanOn ? 'FAN ON' : 'FAN OFF'}</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-1" role="group" aria-label="Ceiling Fan Speed">
              {[1, 2, 3, 4, 5].map((spd) => {
                const active = fanOn && fanSpeed === spd;
                return (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => {
                      setFanOn(true);
                      setFanSpeed(spd);
                    }}
                    className={`min-h-[44px] rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all ${
                      active
                        ? 'bg-cyan-electric text-charcoal-950 border-cyan-electric shadow-[0_0_15px_rgba(34,211,238,0.35)]'
                        : 'bg-charcoal-900 text-slate-300 border-white/10 hover:border-white/25'
                    }`}
                  >
                    Speed {spd}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
