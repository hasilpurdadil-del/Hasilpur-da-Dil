import React, { useState } from 'react';
import { Fuel, Boxes, Bus, Sparkles, Cpu, Layers, Volume2, Video, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CHANNEL_INFO, CHANNEL_PILLARS } from '../data/channelData';
import { soundFX } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState(CHANNEL_PILLARS[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fuel':
        return <Fuel className="w-5 h-5 text-amber-400" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-cyan-400" />;
      case 'Bus':
        return <Bus className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-pink-400" />;
    }
  };

  const selectedPillar = CHANNEL_PILLARS.find((p) => p.id === activePillar) || CHANNEL_PILLARS[0];

  return (
    <section id="about" className="relative py-24 bg-[#080811]/90 border-t border-purple-950/40">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Behind The Studio</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            About Our Channel
          </h2>

          <p className="mt-4 text-base sm:text-lg text-purple-200 font-medium leading-relaxed">
            "{CHANNEL_INFO.aboutSummary}"
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Welcome to <span className="text-white font-semibold">{CHANNEL_INFO.handle}</span>, where high-end generative neural synthesis meets artisan miniature dioramas and spatial ASMR craft.
          </p>
        </div>

        {/* 4 Core Pillars Selector Cards */}
        <div id="pillars" className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNEL_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillar;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  soundFX.playClick();
                  setActivePillar(pillar.id);
                }}
                className={`text-left p-5 rounded-2xl transition-all duration-300 relative border group ${
                  isActive
                    ? 'bg-[#14142f] border-purple-500 shadow-xl shadow-purple-950/60 ring-1 ring-purple-400/40 scale-[1.02]'
                    : 'bg-[#0e0e1f]/70 border-white/5 hover:border-purple-500/30 hover:bg-[#111126]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${isActive ? 'bg-purple-900/40 border-purple-400/40' : ''}`}>
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 uppercase tracking-wider">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-400 group-hover:text-cyan-300 transition-colors">
                  <span>Explore Universe</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Featured Deep Dive Card */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-purple-900/20 via-[#0e0e22] to-blue-900/20 border border-purple-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Preview Side */}
            <div className="lg:col-span-5 relative group">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/10 shadow-xl">
                <img
                  src={selectedPillar.image}
                  alt={selectedPillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-purple-300">
                  AI Cinema • 4K 60FPS
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                  Signature AI Video Studio Production
                </div>
              </div>
            </div>

            {/* Details Side */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
                  {selectedPillar.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Channel Saga #{selectedPillar.id.toUpperCase()}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                {selectedPillar.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedPillar.description}
              </p>

              {/* Highlights Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {selectedPillar.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA link to YouTube */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={CHANNEL_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/30"
                >
                  <Video className="w-4 h-4" />
                  <span>Watch This Series on YouTube</span>
                </a>
                <a
                  href="#videos"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <span>Browse in Library below</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AI Creative Architecture Banner */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0d0d1c] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">100% Original Neural Renders</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Every frame is crafted using proprietary prompting workflows, custom multi-pass upscaling, and bespoke cinematic lighting.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1c] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400 shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Binaural ASMR Foley</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Satisfying rain trickles, crisp clay shaping, miniature engine rumbles, and fuel clicks mastered for tingling sensory immersion.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1c] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Viral Storytelling Dynamics</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pioneering miniature lore like Sano Oil and FlixBus cross-country odysseys watched and loved by millions of enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
