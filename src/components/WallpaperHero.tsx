import React from 'react';
import { Sparkles, Play, Download, Smartphone, Zap, Flame, ShieldCheck, Heart } from 'lucide-react';
import { WallpaperItem, CATEGORIES, CategoryId } from '../data/wallpapersData';

interface WallpaperHeroProps {
  featuredWallpaper: WallpaperItem;
  onPreview: (wallpaper: WallpaperItem) => void;
  onQuickDownload: (wallpaper: WallpaperItem) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const WallpaperHero: React.FC<WallpaperHeroProps> = ({
  featuredWallpaper,
  onPreview,
  onQuickDownload,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e0e1c] via-[#090913] to-[#080811] pt-6 pb-8 px-4 sm:px-8 border-b border-white/5">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Hero Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
          
          {/* Left Text & Call to Actions */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>100+ وال پیپرز کا شاندار خزانہ • 4K & 3D Live Video</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Ultimate 4K HD & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                3D Live Video Wallpapers
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed" dir="auto">
              موبائل فونز کے لیے 100 سے زائد شاندار اور دلکش 4K فوٹوز، 3D لائیو ویڈیو لوپس اور انٹرایکٹو وال پیپرز۔ اینڈرائیڈ اور آئی فون پر ایک کلک سے ڈاؤن لوڈ اور سیٹ کریں۔
            </p>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>110+ Curated HD Wallpapers</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Play className="w-4 h-4 text-pink-400" />
                <span>25+ 60FPS Live 3D Videos</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Interactive WebGL 3D Gyroscope</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free 4K Ultra HD • Zero Watermarks</span>
              </div>
            </div>
          </div>

          {/* Right: Featured Wallpaper of the Day Hero Showcase */}
          <div className="w-full sm:w-auto shrink-0 flex justify-center">
            <div 
              className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-[0_20px_50px_rgba(168,85,247,0.25)] group cursor-pointer bg-black"
              onClick={() => onPreview(featuredWallpaper)}
            >
              {/* Media Poster or Video */}
              {featuredWallpaper.type === 'video' && featuredWallpaper.videoUrl ? (
                <video
                  src={featuredWallpaper.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img
                  src={featuredWallpaper.hdUrl}
                  alt={featuredWallpaper.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 p-4 flex flex-col justify-between">
                {/* Top Spotlight Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>WALLPAPER OF THE DAY</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/60 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                    {featuredWallpaper.resolution}
                  </span>
                </div>

                {/* Bottom Card Details */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight drop-shadow-md">
                      {featuredWallpaper.title}
                    </h3>
                    <p className="text-xs text-purple-300 font-semibold" dir="rtl">
                      {featuredWallpaper.urduTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview(featuredWallpaper);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/40 transition-transform active:scale-95"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Phone Preview (ٹیسٹ)</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickDownload(featuredWallpaper);
                      }}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md active:scale-95 transition-all"
                      title="Quick Download 4K"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Carousel */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>Categories (کیٹیگریز)</span>
              <span className="text-xs text-purple-400 font-normal">Select to filter</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Showing: {selectedCategory.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as CategoryId)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105 ring-2 ring-purple-400/50'
                    : 'bg-[#131322] hover:bg-[#1a1a2e] text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
