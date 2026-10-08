import React from 'react';
import { Youtube, Film, ArrowUp, Heart, Shield, Sparkles } from 'lucide-react';
import { CHANNEL_INFO } from '../data/channelData';
import { soundFX } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seoTags = [
    "AI video",
    "miniature video",
    "Sano Oil",
    "petrol pump stories",
    "clay building",
    "FlixBus journeys",
    "ASMR diorama",
    "tilt shift AI",
    "4K AI cinema",
    "@Aivideo5677"
  ];

  return (
    <footer className="relative bg-[#06060e] border-t border-purple-950/60 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-600 p-[1.5px] shadow-lg shadow-purple-500/25">
                <div className="w-full h-full bg-[#0d0d1a] rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white tracking-wider block">
                  AI VIDEO STUDIO
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {CHANNEL_INFO.handle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              We craft viral AI miniature diorama videos, Sano Oil petrol pump stories, satisfying clay building, and FlixBus journeys. 100% original AI cinematic content.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CHANNEL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
              </a>
              <span className="text-xs text-slate-500 font-mono">
                Subscribe on YouTube: <a href={CHANNEL_INFO.youtubeUrl} className="text-purple-400 hover:underline">{CHANNEL_INFO.handle}</a>
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Sagas & Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-purple-300 transition-colors">⛽ Sano Oil Petrol Pump Universe</a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-300 transition-colors">🏰 Miniature World Dioramas</a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-300 transition-colors">🚌 FlixBus Epic Journeys</a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-300 transition-colors">🏺 Satisfying Clay & ASMR Sculpting</a>
              </li>
              <li>
                <a href="#shorts" className="hover:text-purple-300 transition-colors">🔥 Viral YouTube Shorts</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Channel Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={CHANNEL_INFO.subscribeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                  ▶ Subscribe on YouTube
                </a>
              </li>
              <li>
                <a href={CHANNEL_INFO.shortsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                  ⚡ Watch YouTube Shorts
                </a>
              </li>
              <li>
                <a href={`mailto:${CHANNEL_INFO.email}`} className="hover:text-purple-300 transition-colors">
                  ✉ Business: {CHANNEL_INFO.email}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-300 transition-colors">
                  💬 Production FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mid Tier: SEO Keywords Cloud Bar */}
        <div className="py-6 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              SEO Topics:
            </span>
            {seoTags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 hover:text-white hover:border-purple-500/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Tier: Exact Required Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Exact User Required Copyright Line */}
          <div className="text-center sm:text-left text-slate-400 font-mono">
            {CHANNEL_INFO.copyright}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-[11px]">
              Built with AI Futuristic CineEngine
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-xs font-medium">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
