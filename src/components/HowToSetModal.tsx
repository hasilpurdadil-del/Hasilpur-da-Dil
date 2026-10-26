import React, { useState } from 'react';
import { X, Smartphone, HelpCircle, CheckCircle2, Apple, Play } from 'lucide-react';

interface HowToSetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToSetModal: React.FC<HowToSetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'video'>('android');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0f0f1c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">How to Apply Wallpaper</h2>
            <p className="text-xs text-purple-400 font-medium" dir="rtl">
              موبائل پر وال پیپر اور 3D ویڈیو وال پیپر لگانے کا طریقہ
            </p>
          </div>
        </div>

        {/* Device Switcher Tabs */}
        <div className="flex items-center gap-2 mb-6 p-1 bg-black/40 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'android' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📱 Android (اینڈرائیڈ)</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'ios' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone (آئی فون)</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'video' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>3D Live Video Guide</span>
          </button>
        </div>

        {/* Content based on Active Tab */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-white">وال پیپر ڈاؤن لوڈ کریں (Download 4K Wallpaper)</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      اپنی پسند کا وال پیپر منتخب کریں اور <strong className="text-white">Download 4K Ultra HD</strong> بٹن دبائیں۔ فوٹو آپ کے فون کی گیلری / ڈاؤن لوڈ فولڈر میں محفوظ ہو جائے گی۔
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-white">گیلری کھولیں اور سیٹ کریں (Set from Gallery)</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Gallery ایپ میں ڈاؤن لوڈ کی گئی تصویر کھولیں، تین نقطوں والے مینو (⋮) پر کلک کریں اور <strong className="text-white">"Set as wallpaper"</strong> منتخب کریں۔
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-white">Home Screen یا Lock Screen منتخب کریں</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      آپ لاک اسکرین، ہوم اسکرین، یا دونوں اسکرینوں پر بیک وقت لاگو کر سکتے ہیں۔
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-white">تصویر کو فوٹوز میں محفوظ کریں (Save to Photos)</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      وال پیپر ڈاؤن لوڈ کرنے کے بعد شیئر بٹن دبا کر <strong className="text-white">"Save Image"</strong> پر کلک کریں۔
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-white">iOS Lock Screen کسٹمائز کریں</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      اپنے آئی فون کی لاک اسکرین پر انگلی دبا کر رکھیں (Long Press)، پھر <strong className="text-white">Customize</strong> یا نیا وال پیپر شامل کرنے کے لیے <strong className="text-white">+</strong> دبائیں۔
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-white">Depth Effect آن کریں (iOS 16+)</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      آئی فون خود بخود تصویر کے موضوع کو پہچان کر 3D ڈیپتھ ایفیکٹ کلاک کے اوپر یا پیچھے بنا دیتا ہے۔
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 space-y-2">
                <h4 className="font-bold text-pink-300 flex items-center gap-1.5">
                  <Play className="w-4 h-4 fill-pink-400" />
                  <span>3D Live Video Wallpaper کیسے لگائیں؟</span>
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  ہماری ایپ میں تمام 3D لائیو ویڈیوز اصلی 60FPS ہائی ڈیفینیشن MP4 فارمیٹ میں ہیں۔ اینڈرائیڈ اور آئی فون پر لائیو وال پیپر لگانے کا طریقہ انتہائی آسان ہے:
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <p className="font-semibold text-white text-xs">سام سنگ (Samsung Galaxy):</p>
                <p className="text-slate-400 text-xs mt-1">
                  گیلری میں ویڈیو کھولیں &gt; تھری ڈاٹس (⋮) &gt; <strong className="text-white">"Set as wallpaper" &gt; Lock screen</strong> منتخب کریں۔ سام سنگ فونز 15 سیکنڈ تک کی ویڈیوز براہ راست بغیر کسی ایپ کے لائیو وال پیپر کے طور پر سپورٹ کرتے ہیں۔
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <p className="font-semibold text-white text-xs">شیاومی / اوپو / ویوو (Xiaomi, Oppo, Vivo):</p>
                <p className="text-slate-400 text-xs mt-1">
                  Themes ایپ یا گیلری میں ویڈیو کو بطور <strong className="text-white">Live Wallpaper</strong> سیٹ کرنے کا آپشن فیکٹری ڈیفالٹ کے طور پر موجود ہوتا ہے۔
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <p className="font-semibold text-white text-xs">دیگر فونز کے لیے:</p>
                <p className="text-slate-400 text-xs mt-1">
                  گوگل پلے اسٹور سے مفت "Video Live Wallpaper" یا "TurnLive" استعمال کر کے کسی بھی ویڈیو کو ہمیشہ چلنے والے لائیو بیک گراؤنڈ میں تبدیل کر سکتے ہیں۔
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Done Button */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            سمجھ آگیا (Got It)
          </button>
        </div>
      </div>
    </div>
  );
};
