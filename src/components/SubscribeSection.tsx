import React, { useState } from 'react';
import { Youtube, Bell, Sparkles, Check, Copy, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CHANNEL_INFO } from '../data/channelData';
import { soundFX } from '../utils/audio';

export const SubscribeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(CHANNEL_INFO.youtubeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const perks = [
    { title: "Weekly 4K Sagas", desc: "Full-length Sano Oil & miniature world cinematic stories in 60FPS." },
    { title: "Oddly Satisfying ASMR", desc: "Pure high-fidelity tactile Foley for deep focus, sleep & stress relief." },
    { title: "100% Original AI Magic", desc: "Pioneering creative prompts, neural models & cinematic direction." },
    { title: "Community Voting", desc: "Suggest new miniature worlds, truck routes, and dioramas in comments." }
  ];

  return (
    <section id="subscribe" className="relative py-24 bg-[#080811] overflow-hidden">
      {/* Volumetric Neon Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-purple-700/20 via-red-600/20 to-blue-600/20 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-red-500/50 via-purple-500/50 to-cyan-500/50 shadow-2xl shadow-purple-950/60 overflow-hidden">
          <div className="relative rounded-[22px] bg-[#0c0c1e] p-8 sm:p-14 lg:p-16 overflow-hidden">
            {/* Background Cyber Grid */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Bell className="w-4 h-4 text-red-400 fill-red-400 animate-bounce" />
                <span>Join Over 350,000+ Fans</span>
              </div>

              {/* Headline */}
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Never Miss a New{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-fuchsia-300 to-cyan-400 neon-text-glow">
                  Miniature AI Universe
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Subscribe to <span className="text-white font-semibold">{CHANNEL_INFO.name} ({CHANNEL_INFO.handle})</span> on YouTube to enjoy satisfying Sano Oil petrol pump tales, FlixBus journeys, and ASMR clay crafting as soon as they premiere.
              </p>

              {/* BIG SUBSCRIBE BUTTON & CHANNEL LINK */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CHANNEL_INFO.subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playChime(850, 'triangle', 0.25)}
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-red-600/40 hover:shadow-red-500/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-red-400/30"
                >
                  <Youtube className="w-7 h-7 fill-white" />
                  <span>Subscribe on YouTube</span>
                  <ExternalLink className="w-5 h-5 text-red-200" />
                </a>

                {/* Copy Channel Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-slate-400" />
                      <span>Copy Channel URL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Channel URL display link */}
              <div className="mt-6 text-xs sm:text-sm text-slate-400 font-mono">
                Direct Link:{' '}
                <a
                  href={CHANNEL_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-semibold break-all"
                >
                  {CHANNEL_INFO.youtubeUrl}
                </a>
              </div>

              {/* Community Perks Grid */}
              <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {perks.map((perk, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>{perk.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
