import React, { useState, useRef } from 'react';
import { Download, Heart, Eye, Play, Sparkles, Zap, Smartphone } from 'lucide-react';
import { WallpaperItem } from '../data/wallpapersData';

interface WallpaperCardProps {
  wallpaper: WallpaperItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPreview: (wallpaper: WallpaperItem) => void;
  onQuickDownload: (wallpaper: WallpaperItem) => void;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({
  wallpaper,
  isFavorite,
  onToggleFavorite,
  onPreview,
  onQuickDownload,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (wallpaper.type === 'video' && videoRef.current) {
      setIsVideoLoading(true);
      videoRef.current
        .play()
        .then(() => setIsVideoLoading(false))
        .catch(() => setIsVideoLoading(false));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (wallpaper.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#11111d] border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-1.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 9:16 Vertical Visual Container */}
      <div 
        className="relative aspect-[9/16] w-full overflow-hidden bg-black cursor-pointer"
        onClick={() => onPreview(wallpaper)}
      >
        {/* Poster Image */}
        <img
          src={wallpaper.thumbnailUrl}
          alt={wallpaper.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Video Loop Element (rendered only for video types, auto-plays on hover) */}
        {wallpaper.type === 'video' && wallpaper.videoUrl && (
          <video
            ref={videoRef}
            src={wallpaper.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* 3D Interactive WebGL Glow Overlay Badge */}
        {wallpaper.type === '3d-interactive' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          {wallpaper.type === 'video' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-pink-600/85 backdrop-blur-md text-[10px] font-bold text-white shadow-md border border-pink-400/30">
              <Play className="w-2.5 h-2.5 fill-white" />
              <span>3D LIVE VIDEO</span>
            </span>
          ) : wallpaper.type === '3d-interactive' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-cyan-600/85 backdrop-blur-md text-[10px] font-bold text-white shadow-md border border-cyan-400/30">
              <Zap className="w-2.5 h-2.5 fill-cyan-300" />
              <span>3D INTERACTIVE</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
              4K ULTRA
            </span>
          )}

          {/* Resolution Tag */}
          <span className="px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-md text-[9px] font-mono text-slate-300 border border-white/10">
            {wallpaper.category.toUpperCase()}
          </span>
        </div>

        {/* Favorite Heart Button (Top Right corner) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(wallpaper.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
              : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white border border-white/10'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Action Overlay: "Try on Phone" */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(wallpaper);
              }}
              className="flex-1 py-2 px-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/40 transition-all active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone Test (ٹیسٹ)</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickDownload(wallpaper);
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all active:scale-95"
              title="Quick Download 4K"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3 bg-[#0d0d16] flex flex-col justify-between flex-1 border-t border-white/5">
        <div>
          <h3 
            onClick={() => onPreview(wallpaper)}
            className="text-xs font-semibold text-slate-100 truncate hover:text-purple-400 cursor-pointer transition-colors"
          >
            {wallpaper.title}
          </h3>
          <p className="text-[11px] text-purple-400/90 font-medium truncate mt-0.5" dir="rtl">
            {wallpaper.urduTitle}
          </p>
        </div>

        {/* Downloads and Likes Count */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-white/5 font-mono">
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3 text-slate-400" />
            {wallpaper.downloads}
          </span>
          <span className="flex items-center gap-1 text-rose-400/90">
            <Heart className="w-3 h-3 fill-rose-500/80" />
            {wallpaper.likes}
          </span>
        </div>
      </div>
    </div>
  );
};
