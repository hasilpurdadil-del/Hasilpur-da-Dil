import React, { useState } from 'react';
import { Youtube, Play, Sparkles, Copy, Check, ArrowRight, ShieldCheck, Flame, Eye } from 'lucide-react';
import { CHANNEL_INFO, FEATURED_VIDEOS, VideoItem } from '../data/channelData';
import { soundFX } from '../utils/audio';

interface HeroSectionProps {
  onPlayVideo: (video: VideoItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlayVideo }) => {
  const [copied, setCopied] = useState(false);
  const heroVideo = FEATURED_VIDEOS[0];

  const handleCopyHandle = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(CHANNEL_INFO.handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Neon Lights and Atmospheric Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/25 rounded-full blur-[130px] animate-pulse-glow" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Cyber Grid Subtle Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none -z-10 mask-radial" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill: Channel Handle & Verified Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 border border-purple-500/30 backdrop-blur-md mb-6 shadow-lg shadow-purple-900/20">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
              Official YouTube Channel
            </span>
            <span className="text-slate-500">•</span>
            <button
              onClick={handleCopyHandle}
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
              title="Click to copy channel handle"
            >
              <span>{CHANNEL_INFO.handle}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
            </button>
            {copied && (
              <span className="text-[10px] text-emerald-400 font-medium">Copied!</span>
            )}
          </div>

          {/* Big Main Heading */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white">
            Welcome to{' '}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 neon-text-glow">
              AI VIDEO STUDIO
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-2xl md:text-3xl font-medium text-slate-300 tracking-wide max-w-3xl mx-auto leading-relaxed">
            Miniature World, Sano Oil & Satisfying ASMR Creations
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Step into a breathtaking realm of 100% original AI cinematic storytelling. From rainy midnight Sano Oil petrol pump tales to microscopic tilt-shift universes.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Main Primary Button: Subscribe on YouTube */}
            <a
              href={CHANNEL_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playChime(750, 'sine', 0.25)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-red-600/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Youtube className="w-6 h-6 fill-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 tracking-wide">Subscribe on YouTube</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Button: Explore Videos */}
            <a
              href="#videos"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base border border-purple-500/30 hover:border-purple-400/60 backdrop-blur-md transition-all duration-300"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Explore Latest Videos</span>
            </a>
          </div>

          {/* Feature Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/30 border border-purple-500/20">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>100% Original AI Content</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/30 border border-blue-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ultra 4K & 60FPS CGI</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-950/30 border border-pink-500/20">
              <Flame className="w-4 h-4 text-pink-400" />
              <span>Viral Trending Stories</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Showcase Player Banner */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative group rounded-3xl p-1 bg-gradient-to-r from-purple-500/40 via-fuchsia-500/30 to-blue-500/40 shadow-2xl shadow-purple-950/50">
            <div className="relative overflow-hidden rounded-[22px] bg-[#0c0c1b] aspect-video sm:aspect-[21/9] flex items-center justify-center">
              {/* Background Thumbnail Art */}
              <img
                src={heroVideo.thumbnail}
                alt={heroVideo.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700 filter brightness-90"
              />

              {/* Ambient Vignette & Neon Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-[#080811]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080811]/80 via-transparent to-[#080811]/80" />

              {/* Top Banner Tag */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-600/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Featured Release
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-medium text-xs">
                  Sano Oil Saga
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <button
                onClick={() => {
                  soundFX.playChime(600, 'triangle', 0.2);
                  onPlayVideo(heroVideo);
                }}
                className="relative z-10 group/btn flex flex-col items-center gap-3 focus:outline-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-cyan-500 p-1 shadow-2xl shadow-purple-500/50 group-hover/btn:scale-110 group-hover/btn:shadow-purple-500/80 transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-[#080811]/80 backdrop-blur-md flex items-center justify-center pl-1 group-hover/btn:bg-[#080811]/40 transition-colors">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 group-hover/btn:border-purple-400 transition-colors">
                  Watch In 4K Theater
                </span>
              </button>

              {/* Bottom Info Bar inside Hero Box */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10">
                <div className="max-w-xl">
                  <h3 className="text-base sm:text-xl font-bold text-white line-clamp-1 drop-shadow-md">
                    {heroVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-1 drop-shadow">
                    Miniature petrol pump in rain • Ambient night ASMR • High fidelity lighting
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    {heroVideo.views} views
                  </span>
                  <span className="bg-purple-900/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-purple-500/30 text-purple-200">
                    {heroVideo.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Channel Stats Grid */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHANNEL_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-[#121226]/80 to-[#0a0a16]/80 border border-purple-500/15 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-cyan-300 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-purple-400/80 mt-1 font-mono">
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
