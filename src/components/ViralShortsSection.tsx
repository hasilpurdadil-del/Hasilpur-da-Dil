import React, { useState } from 'react';
import { Flame, Play, Heart, Share2, ExternalLink, Sparkles, Youtube } from 'lucide-react';
import { VIRAL_SHORTS, ShortItem, CHANNEL_INFO } from '../data/channelData';
import { soundFX } from '../utils/audio';

interface ViralShortsSectionProps {
  onPlayShort: (short: ShortItem) => void;
}

export const ViralShortsSection: React.FC<ViralShortsSectionProps> = ({ onPlayShort }) => {
  const [likedShorts, setLikedShorts] = useState<Record<string, boolean>>({});
  const [hoveredShortId, setHoveredShortId] = useState<string | null>(null);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundFX.playChime(800, 'sine', 0.15);
    setLikedShorts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = (e: React.MouseEvent, short: ShortItem) => {
    e.stopPropagation();
    soundFX.playClick();
    if (navigator.share) {
      navigator.share({
        title: short.title,
        url: `https://www.youtube.com/shorts/${short.youtubeId}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`https://www.youtube.com/shorts/${short.youtubeId}`);
      alert(`Short link copied to clipboard!`);
    }
  };

  return (
    <section id="shorts" className="relative py-24 bg-[#0a0a16] border-t border-purple-900/30 overflow-hidden">
      {/* Background Neon Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-red-600/10 via-purple-600/15 to-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>Trending Vertical Loops</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Viral YouTube Shorts
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Hypnotic 60-second micro-stories, satisfying rain loops, and satisfying ASMR clay building with millions of views.
            </p>
          </div>

          <a
            href={CHANNEL_INFO.shortsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/20 transition-all self-start md:self-auto"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Open All Shorts on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Shorts Grid - 9:16 Ratio */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {VIRAL_SHORTS.map((short) => {
            const isLiked = likedShorts[short.id];
            const isHovered = hoveredShortId === short.id;

            return (
              <div
                key={short.id}
                onMouseEnter={() => setHoveredShortId(short.id)}
                onMouseLeave={() => setHoveredShortId(null)}
                onClick={() => {
                  soundFX.playChime(680, 'triangle', 0.2);
                  onPlayShort(short);
                }}
                className="group relative rounded-2xl bg-[#121224] border border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-red-950/40 hover:-translate-y-1.5 flex flex-col aspect-[9/16]"
              >
                {/* Background Image / Reel Art */}
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 group-hover:via-black/10 transition-colors" />

                {/* Top badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Short
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-slate-200 text-[10px] font-mono">
                    {short.duration}
                  </span>
                </div>

                {/* Right Interactive Floating Action Column (like native YouTube Shorts) */}
                <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3 z-20">
                  <button
                    onClick={(e) => toggleLike(e, short.id)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 transition-transform active:scale-125"
                    title="Like Short"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isLiked ? 'text-red-500 fill-red-500' : 'text-white'
                      }`}
                    />
                    <span className="text-[9px] font-bold text-center block mt-0.5">
                      {isLiked ? 'Liked' : short.likes}
                    </span>
                  </button>

                  <button
                    onClick={(e) => handleShare(e, short)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 transition-transform active:scale-125"
                    title="Share Short"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Center Hover Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center pl-0.5 shadow-xl shadow-red-600/50">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-2.5 left-2.5 right-12 z-10">
                  <div className="text-[10px] font-medium text-purple-300 uppercase tracking-wider mb-1 line-clamp-1">
                    {short.category}
                  </div>
                  <h3 className="font-heading font-bold text-xs text-white line-clamp-2 leading-snug drop-shadow-md">
                    {short.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
                    <Flame className="w-3 h-3 text-red-400 fill-red-400" />
                    <span>{short.views} views</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner with YouTube Shorts direct jump */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-red-950/30 via-[#141026] to-purple-950/30 border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Youtube className="w-6 h-6 fill-red-500" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Daily 60-Second Miniature Stories</h4>
              <p className="text-xs text-slate-400">
                New YouTube Shorts drop every morning. Subscribe to get them first in your feed!
              </p>
            </div>
          </div>
          <a
            href={CHANNEL_INFO.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all shrink-0"
          >
            Subscribe to Shorts
          </a>
        </div>
      </div>
    </section>
  );
};
