import React from 'react';
import { Sparkles, Heart, Smartphone, ShieldCheck, Download, Zap } from 'lucide-react';
import { CATEGORIES, CategoryId } from '../data/wallpapersData';

interface WallpaperFooterProps {
  onSelectCategory: (id: CategoryId) => void;
  onOpenHowToGuide: () => void;
}

export const WallpaperFooter: React.FC<WallpaperFooterProps> = ({
  onSelectCategory,
  onOpenHowToGuide,
}) => {
  return (
    <footer className="bg-[#06060e] border-t border-white/10 pt-12 pb-8 px-4 sm:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                NEON<span className="text-purple-400">WALL 3D</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              100+ Ultra High Definition 4K and 3D Live Video Wallpapers optimized for Android & iPhone AMOLED screens. Free instant download without ads, popups or sign-in requirements.
            </p>

            <p className="text-xs text-purple-400/90 font-medium leading-relaxed" dir="rtl">
              بہترین کوالٹی کے 100 سے زائد 4K، تھری ڈی ویڈیو اور انٹرایکٹو وال پیپرز۔ لاک اسکرین اور ہوم اسکرین کے لیے خاص طور پر تیار کردہ۔
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Downloads
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Zap className="w-3.5 h-3.5" /> 60FPS Video Loops
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-purple-400">
                <Smartphone className="w-3.5 h-3.5" /> Mobile Optimized
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Popular Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(1, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id as CategoryId);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Resources & Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Guides & Help
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenHowToGuide}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  📱 How to Set on Android (اینڈرائیڈ رہنمائی)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHowToGuide}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  🍎 How to Set on iPhone (آئی فون لاک اسکرین)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHowToGuide}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  🎬 How to Apply 3D Video Wallpapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('amoled');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  🖤 AMOLED Pure Dark Battery Saver
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 NeonWall 3D Studio • 100+ HD & 3D Video Wallpapers Collection.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for HD Wallpaper Lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
