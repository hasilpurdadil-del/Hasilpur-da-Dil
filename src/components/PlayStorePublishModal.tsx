import React, { useState } from 'react';
import { 
  Smartphone, Download, CheckCircle2, Copy, Check, ExternalLink, 
  HelpCircle, X, Sparkles, ShieldCheck, Play, ArrowRight, 
  Layers, PackageCheck, Flame, Globe
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { soundFX } from '../utils/audio';

interface PlayStorePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStorePublishModal: React.FC<PlayStorePublishModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'install' | 'publish'>('install');

  if (!isOpen) return null;

  const appUrl = window.location.origin;
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(appUrl)}`;

  const storeListing = {
    title: "Rana Brothers MODs - BUSSID 3D",
    shortDesc: "Watch & Download Pakistani HMC Pak Dumper MOD, truck horns & 3D simulator.",
    fullDesc: `🇵🇰 Rana Brothers Official BUSSID MOD & Gaming Center

Download authentic Pakistani Bus Simulator Indonesia (BUSSID) mods, truck art liveries, and sound effects:
• HMC Pak Dumper MOD by SAD LOVER (High tipping animation & heavy sound)
• Bedford Rocket Pak Truck MOD with Chamak Patti Art
• Hino 500 Heavy 22-Wheeler Pak Trailer
• Authentic Pakistani Truck Pressure Horns & Siren Soundboard
• Playable 3D BUSSID & FlixBus Simulator in Pakistan GT Road & Sano Oil maps
• Step-by-step ZArchiver installation guide for Android

Subscribe to @Aivideo5677 for weekly new Pakistani truck mods and 4K AI videos!`,
    packageId: "com.ranabrothers.bussidmods"
  };

  const handleCopy = (text: string, fieldName: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleNativeInstall = async () => {
    soundFX.playChime(750, 'sine', 0.3);
    const success = await install();
    if (success) {
      soundFX.playChime(880, 'sine', 0.4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0e0e1c] border border-red-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-red-950/60 text-slate-100 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-emerald-600 p-[1.5px] shadow-lg shadow-red-600/30 flex-shrink-0">
              <div className="w-full h-full bg-[#0a0a14] rounded-[14px] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                <span>Play Store & Android App Hub</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Rana Brothers Android App
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="mt-5 grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('install');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'install'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>📲 Phone Par Install Karein</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('publish');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'publish'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>🏪 Play Store Par Publish Guide</span>
          </button>
        </div>

        {/* TAB 1: INSTALL DIRECTLY ON PHONE */}
        {activeTab === 'install' && (
          <div className="mt-6 space-y-5 animate-in fade-in duration-200">
            {/* Status Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/50 via-[#161226] to-[#0d1a16] border border-red-500/20">
              <h3 className="font-bold text-base sm:text-lg text-white mb-1">
                Install as Native Android App
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Yeh app PWA (Progressive Web App) standard ke tahat Play Store app jese apke mobile me install ho jati hai, offline chalti hai aur full screen view deti hai!
              </p>

              {/* Install Button */}
              <div className="mt-4">
                {isInstalled ? (
                  <div className="w-full py-3.5 px-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>App already installed on your device!</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={handleNativeInstall}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-base shadow-xl shadow-emerald-500/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" />
                    <span>Abhi Install Karein (1-Click)</span>
                  </button>
                ) : isIOS ? (
                  <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
                    <div className="font-bold mb-1">iPhone / Safari Instructions:</div>
                    1. Safari browser me neechay <strong>Share (تیغہ)</strong> icon dabayein.<br />
                    2. Scroll karke <strong>Add to Home Screen</strong> select karein.
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block">Android Chrome me install karne ka asan tarika:</span>
                      Chrome browser ke upar right side <strong>3 dots (⋮)</strong> dabayein aur <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> par click karein.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* App Features List */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Fast Offline Caching</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Full Screen 3D Game</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Direct Mediafire Links</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Pakistani Truck Horns</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE PLAY STORE PUBLISHING GUIDE */}
        {activeTab === 'publish' && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-200">
            {/* Guide Intro */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs sm:text-sm text-amber-200">
              <div className="font-bold text-amber-300 flex items-center gap-2 mb-1 text-sm sm:text-base">
                <HelpCircle className="w-4 h-4" />
                Google Play Store par publish karne ka official tarika:
              </div>
              Google kisi bhi PWA website ko <strong>TWA (Trusted Web Activity)</strong> ke zariye direct <strong>Android App (.aab file)</strong> bana kar Play Store par publish karne ki ijazat deta hai!
            </div>

            {/* Step-by-Step Cards */}
            <div className="space-y-3">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-bold text-sm text-white">
                    PWABuilder se Google Play (.aab) File Banayein
                  </h4>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  PWABuilder Google aur Microsoft ka official free tool hai jo apke is app ka Play Store package (.aab / APK) bana deta hai:
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>🚀 Open PWABuilder (1-Click Package)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(appUrl, 'appUrl')}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5"
                  >
                    {copiedField === 'appUrl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'appUrl' ? 'URL Copied!' : 'Copy App URL'}</span>
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h4 className="font-bold text-sm text-white">
                    Google Play Console Account Kholein
                  </h4>
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  Google Play Console (<code className="text-amber-300">play.google.com/console</code>) par apna developer account banayein ($25 one-time registration Google ki requirement hoti hai).
                </p>
                <a
                  href="https://play.google.com/console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-semibold"
                >
                  <span>Go to Google Play Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-bold text-sm text-white">
                    App Details Copy Karein (Play Store Listing)
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Google Play Console me mangi jane wali information copy-paste karein:
                </p>

                <div className="space-y-2 text-xs">
                  {/* Package ID */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0a14] border border-white/10">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Package Name:</span>
                      <span className="font-mono text-emerald-300 font-semibold">{storeListing.packageId}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(storeListing.packageId, 'pkg')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      {copiedField === 'pkg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* App Title */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0a14] border border-white/10">
                    <div>
                      <span className="text-slate-400 block text-[10px]">App Title:</span>
                      <span className="text-white font-semibold">{storeListing.title}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(storeListing.title, 'title')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Short Description */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0a14] border border-white/10">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Short Description (80 chars):</span>
                      <span className="text-white truncate max-w-xs sm:max-w-md block">{storeListing.shortDesc}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(storeListing.shortDesc, 'shortDesc')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex-shrink-0"
                    >
                      {copiedField === 'shortDesc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Full Description */}
                  <div className="p-2.5 rounded-lg bg-[#0a0a14] border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 text-[10px]">Full Description:</span>
                      <button
                        onClick={() => handleCopy(storeListing.fullDesc, 'fullDesc')}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 flex items-center gap-1"
                      >
                        {copiedField === 'fullDesc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'fullDesc' ? 'Copied' : 'Copy Description'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-3 whitespace-pre-line font-mono">
                      {storeListing.fullDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PWA & TWA Compliant (Play Store Ready)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
