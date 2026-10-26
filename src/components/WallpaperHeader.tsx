import React, { useState } from 'react';
import { Search, Heart, Sparkles, HelpCircle, Download, Smartphone, X, Layers, Flame } from 'lucide-react';

interface WallpaperHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypeFilter: 'all' | 'video' | '3d-interactive' | 'photo';
  onSelectTypeFilter: (type: 'all' | 'video' | '3d-interactive' | 'photo') => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenHowToGuide: () => void;
  onInstallPWA?: () => void;
  isInstallable?: boolean;
}

export const WallpaperHeader: React.FC<WallpaperHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedTypeFilter,
  onSelectTypeFilter,
  favoritesCount,
  onOpenFavorites,
  onOpenHowToGuide,
  onInstallPWA,
  isInstallable,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080811]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand Logo & Urdu Subtitle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-[2px] shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-[#0d0d18] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-heading">
                  NEON<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">WALL 3D</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  100+ HD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>HD, 4K & 3D لائیو ویڈیو وال پیپرز</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                <span className="text-emerald-400 text-[10px]">Free 4K Download</span>
              </p>
            </div>
          </div>

          {/* Mobile Favorites & Guide shortcuts */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200"
              aria-label="Favorites"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenHowToGuide}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400"
              aria-label="How to guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Search Bar */}
        <div className="relative w-full md:max-w-md">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 100+ wallpapers (4K, 3D Video, Cars, Anime, AMOLED)..."
              className="w-full bg-[#121222] border border-white/10 hover:border-purple-500/40 focus:border-purple-500 text-slate-100 placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2.5 outline-none transition-all focus:ring-2 focus:ring-purple-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Guide Button */}
          <button
            onClick={onOpenHowToGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>How to Apply (رہنمائی)</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 to-purple-500/10 hover:from-rose-500/20 hover:to-purple-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all shadow-sm"
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Favorites</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-mono">
              {favoritesCount}
            </span>
          </button>

          {/* Optional PWA Install Button */}
          {isInstallable && onInstallPWA && (
            <button
              onClick={onInstallPWA}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Filter Type Sub-bar */}
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/5 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: 'All 110+ Wallpapers', icon: '✨' },
          { id: 'video', label: '🎬 3D Live Video Loops (25)', icon: '🎬' },
          { id: '3d-interactive', label: '🌀 Interactive 3D WebGL (10)', icon: '🌀' },
          { id: 'photo', label: '🖼️ 4K Ultra HD Photos (75)', icon: '🖼️' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectTypeFilter(filter.id as any)}
            className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedTypeFilter === filter.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
