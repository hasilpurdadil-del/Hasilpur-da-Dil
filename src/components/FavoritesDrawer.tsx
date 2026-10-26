import React from 'react';
import { X, Heart, Download, Smartphone, Trash2 } from 'lucide-react';
import { WallpaperItem } from '../data/wallpapersData';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: WallpaperItem[];
  onRemoveFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onPreview: (wallpaper: WallpaperItem) => void;
  onQuickDownload: (wallpaper: WallpaperItem) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAllFavorites,
  onPreview,
  onQuickDownload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#0f0f1b] border-l border-white/10 h-full flex flex-col p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Your Saved Wallpapers</h2>
              <p className="text-[11px] text-slate-400" dir="rtl">
                آپ کے پسندیدہ وال پیپرز ({favorites.length})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                onClick={onClearAllFavorites}
                className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-all text-xs"
                title="Clear all favorites"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List of saved wallpapers */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {favorites.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-white">No favorites saved yet</p>
              <p className="text-xs text-slate-400 max-w-xs" dir="rtl">
                کسی بھی وال پیپر پر دل (❤️) کا آئیکن دبائیں تاکہ وہ یہاں محفوظ ہو سکے اور بعد میں باآسانی ڈاؤن لوڈ کیا جا سکے۔
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group"
              >
                {/* Thumbnail */}
                <div 
                  className="w-14 aspect-[9/16] rounded-xl overflow-hidden bg-black shrink-0 cursor-pointer"
                  onClick={() => onPreview(item)}
                >
                  <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => onPreview(item)}
                    className="text-xs font-semibold text-white truncate cursor-pointer hover:text-purple-400"
                  >
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-purple-400 truncate" dir="rtl">
                    {item.urduTitle}
                  </p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-slate-300">
                    {item.type.toUpperCase()}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onPreview(item)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"
                    title="Preview on phone"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onQuickDownload(item)}
                    className="p-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white"
                    title="Download 4K"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="p-2 rounded-xl hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    title="Remove from favorites"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        {favorites.length > 0 && (
          <div className="pt-3 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-400">
              {favorites.length} saved wallpapers in local device storage
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
