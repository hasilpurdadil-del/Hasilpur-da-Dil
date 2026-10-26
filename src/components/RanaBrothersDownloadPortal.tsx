import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Youtube, Play, Pause, CheckCircle2, AlertCircle, 
  Lock, Unlock, Sparkles, Volume2, Truck, ShieldCheck, 
  FileArchive, HelpCircle, ExternalLink, FastForward, RotateCcw,
  Share2, Check, Flame, ChevronRight
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ModItem {
  id: string;
  name: string;
  subName: string;
  author: string;
  fileSize: string;
  downloadUrl: string;
  youtubeEmbedUrl: string;
  videoTitle: string;
  thumbnail: string;
  badge: string;
  version: string;
  features: string[];
}

const MOD_ITEMS: ModItem[] = [
  {
    id: 'hmc-pak-dumper',
    name: 'HMC Pak Dumper MOD',
    subName: 'Heavy Pakistani Hydraulic Dumper by SAD LOVER',
    author: 'SAD LOVER & Rana Brothers',
    fileSize: '38.4 MB',
    downloadUrl: 'https://www.mediafire.com/file/hcjhul5v8a1x9d6/HMC_Pak_Dumper_MOD_by_SAD_LOVER.zip/file',
    youtubeEmbedUrl: 'https://www.youtube.com/embed?listType=user&list=Aivideo5677&enablejsapi=1',
    videoTitle: 'HMC Pak Dumper MOD Full Review & Gameplay | Aivideo5677',
    thumbnail: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
    badge: '🔥 OFFICIAL FEATURED MOD',
    version: 'v3.7 - v4.1.2 Support',
    features: [
      'Realistic Pakistani Chamak Patti Truck Art & Stickers',
      'Hydraulic Dumper Bed Animation (Up & Down)',
      'Authentic Heavy Pakistani Diesel Engine Sound',
      'Pakistani Pressure Horn & Reverse Alarm',
      'High Clearance Suspension for Off-Road Maps'
    ]
  },
  {
    id: 'bedford-rocket',
    name: 'Bedford Rocket Pak Truck MOD',
    subName: 'Crown Taj Truck Art with Multitone Horns',
    author: 'Rana Brothers Team',
    fileSize: '42.1 MB',
    downloadUrl: 'https://www.mediafire.com/file/hcjhul5v8a1x9d6/HMC_Pak_Dumper_MOD_by_SAD_LOVER.zip/file',
    youtubeEmbedUrl: 'https://www.youtube.com/embed?listType=user&list=Aivideo5677&enablejsapi=1',
    videoTitle: 'Pakistani Bedford Rocket Truck Heavy Load Test | Aivideo5677',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    badge: '👑 TRUCK ART SPECIAL',
    version: 'v3.8+ Support',
    features: [
      'Traditional Taj Roof & Wooden Body Crafting',
      'Dholki Exhaust Sound & Turbo Whistle',
      'Night LED Neon Decoration & Chamak Plates',
      'Heavy Hay / Cotton Load Animated Variants'
    ]
  },
  {
    id: 'hino-500-pak',
    name: 'Hino 500 22-Wheeler Pak Trailer',
    subName: 'Long Chassis Heavy Cargo Carrier',
    author: 'SAD LOVER & Rana Brothers',
    fileSize: '48.9 MB',
    downloadUrl: 'https://www.mediafire.com/file/hcjhul5v8a1x9d6/HMC_Pak_Dumper_MOD_by_SAD_LOVER.zip/file',
    youtubeEmbedUrl: 'https://www.youtube.com/embed?listType=user&list=Aivideo5677&enablejsapi=1',
    videoTitle: 'Hino 500 Pak Heavy 22-Wheeler Mountain Hill Climb',
    thumbnail: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ HEAVY CARGO',
    version: 'v4.0 Support',
    features: [
      'Dual Rear Axle Lift Animation',
      'Chrome Pakistani Bullbar & Side Steps',
      'Overload Container & Flatbed Options',
      'Air Brake Hiss & Jake Brake Rumble'
    ]
  }
];

export const RanaBrothersDownloadPortal: React.FC = () => {
  const [activeMod, setActiveMod] = useState<ModItem>(MOD_ITEMS[0]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [unlockedCelebrated, setUnlockedCelebrated] = useState<boolean>(false);
  const [hornPlaying, setHornPlaying] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown effect (60 seconds)
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            handleUnlockAchieved();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  const handleUnlockAchieved = () => {
    soundFX.playChime(880, 'sine', 0.4);
    setUnlockedCelebrated(true);
  };

  const handleFastUnlock = () => {
    soundFX.playChime(660, 'triangle', 0.2);
    setTimeLeft(0);
    handleUnlockAchieved();
  };

  const handleResetTimer = () => {
    soundFX.playClick();
    setTimeLeft(60);
    setIsTimerRunning(true);
    setUnlockedCelebrated(false);
  };

  const handleCopyShareLink = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Pakistani Truck Horn Synthesizer FX
  const playCustomHorn = (type: 'air' | 'pressure' | 'reverse' | 'melody') => {
    setHornPlaying(type);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'pressure') {
        // High pressure Pakistani truck double blast
        [440, 554, 659].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.3);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.6);
        });
      } else if (type === 'melody') {
        // Multi-tone Pak truck melody
        const notes = [392, 440, 523, 587, 659];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          const startTime = now + idx * 0.12;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.2);
        });
      } else if (type === 'reverse') {
        // Classic Pak Dumper reverse warning beep
        for (let i = 0; i < 3; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const t = now + i * 0.25;
          osc.frequency.setValueAtTime(980, t);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.16);
        }
      } else {
        // Deep Air Horn
        [180, 240, 320].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.8);
        });
      }

      setTimeout(() => setHornPlaying(null), 700);
    } catch {
      setHornPlaying(null);
    }
  };

  const isUnlocked = timeLeft <= 0;
  const progressPercent = Math.max(0, Math.min(100, Math.round(((60 - timeLeft) / 60) * 100)));

  return (
    <section id="download-portal" className="relative py-16 md:py-24 bg-[#0a0a14] border-y border-red-500/20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold tracking-wider uppercase mb-3 shadow-lg shadow-red-950/30">
            <span className="text-base">🇵🇰</span>
            <span>Rana Brothers Official BUSSID MOD Center</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-mono">100% Free Mediafire Link</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span>🇵🇰 Rana Brothers MODs</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Watch & Download official Pakistani Trucks, Dumpers, and soundpacks for Bus Simulator Indonesia.
          </p>

          {/* Quick MOD Selector Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {MOD_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  setActiveMod(item);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeMod.id === item.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>{item.name}</span>
                {activeMod.id === item.id && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: VIDEO PURI DEKHO & COUNTDOWN LOCK */}
        {/* ======================================================== */}
        <div className="rounded-3xl p-1 bg-gradient-to-b from-red-600/60 via-red-900/30 to-purple-900/40 shadow-2xl shadow-red-950/40 mb-8">
          <div className="bg-[#12121f] rounded-[22px] p-5 sm:p-7 border border-red-500/30">
            
            {/* Step 1 Title & Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-extrabold text-xs">
                    STEP 1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-400 m-0">
                    Video Puri Dekho 👇
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Aivideo5677 - 1 minute dekho to download khulega (Watch 60 seconds to unlock file)
                </p>
              </div>

              {/* Status Tag */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                {isUnlocked ? (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    DOWNLOAD UNLOCKED!
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-red-950 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                    LOCKED ({timeLeft}s Remaining)
                  </span>
                )}
              </div>
            </div>

            {/* Video Player Box */}
            <div className="mt-5 relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-2 border-red-500/30 shadow-inner group">
              <iframe
                id="myVideo"
                src={activeMod.youtubeEmbedUrl}
                title={activeMod.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              />

              {/* Top Video Overlay Banner */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-white tracking-wide">
                  Channel: @Aivideo5677
                </span>
                <span className="text-[11px] text-slate-400">| {activeMod.name}</span>
              </div>
            </div>

            {/* Countdown Bar & Timer Display */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#0b0b14] border border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    isUnlocked 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                  }`}>
                    {isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </div>

                  <div>
                    <div id="timer" className={`font-bold text-sm sm:text-base ${
                      isUnlocked ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {isUnlocked
                        ? "✅ Video pura ho gaya! Ab download kar sakte ho"
                        : `⏳ ${timeLeft} second baad download khulega... Video band mat karo`}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {isUnlocked ? 'Mediafire link is ready!' : 'Keep video playing on screen'}
                    </div>
                  </div>
                </div>

                {/* Quick controls / Fast-Forward toggle for convenience */}
                <div className="flex items-center gap-2">
                  {!isUnlocked ? (
                    <button
                      onClick={handleFastUnlock}
                      title="Fast-forward timer (Skip 60s for testing)"
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <FastForward className="w-3.5 h-3.5 text-amber-400" />
                      <span>⚡ Turbo Unlock (Skip)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResetTimer}
                      title="Test countdown again"
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3 h-3 text-slate-400" />
                      <span>Lock Again</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/50'
                        : 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-1.5">
                  <span>Progress: {progressPercent}%</span>
                  <span>{isUnlocked ? 'Unlocked' : `${timeLeft}s left`}</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* STEP 2: DOWNLOAD BUTTON (MEDIAFIRE LINK) */}
            {/* ======================================================== */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  STEP 2
                </span>
                <span className="text-sm font-semibold text-slate-200">
                  Mediafire Direct Download
                </span>
              </div>

              {isUnlocked ? (
                <a
                  id="downloadBtn"
                  href={activeMod.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playChime(700, 'triangle', 0.25)}
                  className="group relative flex items-center justify-center gap-3 w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 text-black font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  <Download className="w-6 h-6 text-black group-hover:translate-y-0.5 transition-transform" />
                  <span className="tracking-wide">
                    ⬇️ Ab Download Karo (Mediafire) – {activeMod.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-black/70 group-hover:text-black" />
                </a>
              ) : (
                <div
                  id="downloadBtn"
                  className="relative flex items-center justify-center gap-3 w-full py-4 sm:py-5 px-6 rounded-2xl bg-slate-800/80 text-slate-400 font-bold text-sm sm:text-base border border-white/5 cursor-not-allowed select-none transition-all"
                  title="Video puri dekho countdown complete hone tak"
                >
                  <Lock className="w-5 h-5 text-red-400 animate-pulse" />
                  <span>🔒 Download Lock Hai (Video Dekho ⏳ {timeLeft}s)</span>
                </div>
              )}

              {/* Mod File Specifications Box */}
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">File Name:</span>
                  <span className="font-mono text-white font-semibold truncate block" title="HMC_Pak_Dumper_MOD_by_SAD_LOVER.zip">
                    HMC_Pak_Dumper...zip
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">File Size:</span>
                  <span className="font-semibold text-emerald-400">{activeMod.fileSize}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Creator / Credit:</span>
                  <span className="font-semibold text-slate-200">{activeMod.author}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Game / Version:</span>
                  <span className="font-semibold text-cyan-300">BUSSID v3.7+</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 3: SUBSCRIBE KARO CARD */}
        {/* ======================================================== */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-red-950/70 via-[#181024] to-[#121226] border border-red-500/30 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase mb-2">
                <span>STEP 3</span>
                <span>•</span>
                <span>Support Rana Brothers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Subscribe Karo ❤️
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                Aivideo5677 YouTube Channel ko subscribe karo taake new Pakistani truck MODs aur Sano Oil videos sabse pehle milen!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="https://www.youtube.com/@Aivideo5677?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundFX.playChime(750, 'sine', 0.25);
                  setHasSubscribed(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#ff0000] hover:bg-red-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/40 hover:scale-105 transition-all"
              >
                <Youtube className="w-5 h-5 fill-white" />
                <span>🔔 Aivideo5677 ko Subscribe Karo</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <button
                onClick={handleCopyShareLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs sm:text-sm font-semibold transition-all"
                title="Share download page"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Page'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PAKISTANI TRUCK PRESSURE HORN SOUNDBOARD */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#101022] border border-amber-500/20 mb-12 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📯</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Pakistani Truck Pressure Horn Soundboard
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Test authentic Pakistani truck horns & sirens before installing into BUSSID
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 self-start sm:self-auto">
              Audio Synthesizer Engine
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => playCustomHorn('pressure')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hornPlaying === 'pressure'
                  ? 'bg-amber-500/30 border-amber-400 shadow-lg scale-95'
                  : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-amber-950/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] text-amber-300 font-mono">Sound 1</span>
              </div>
              <div className="mt-2 font-bold text-xs text-white">Pak Pressure Blast</div>
              <span className="text-[10px] text-slate-400">High pitch air horn</span>
            </button>

            <button
              onClick={() => playCustomHorn('melody')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hornPlaying === 'melody'
                  ? 'bg-purple-500/30 border-purple-400 shadow-lg scale-95'
                  : 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-purple-950/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] text-purple-300 font-mono">Sound 2</span>
              </div>
              <div className="mt-2 font-bold text-xs text-white">Multitone Melody Horn</div>
              <span className="text-[10px] text-slate-400">Pakistani Highway tune</span>
            </button>

            <button
              onClick={() => playCustomHorn('reverse')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hornPlaying === 'reverse'
                  ? 'bg-emerald-500/30 border-emerald-400 shadow-lg scale-95'
                  : 'bg-white/5 border-white/10 hover:border-emerald-400/50 hover:bg-emerald-950/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] text-emerald-300 font-mono">Sound 3</span>
              </div>
              <div className="mt-2 font-bold text-xs text-white">Dumper Reverse Alarm</div>
              <span className="text-[10px] text-slate-400">Hydraulic backup beep</span>
            </button>

            <button
              onClick={() => playCustomHorn('air')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hornPlaying === 'air'
                  ? 'bg-cyan-500/30 border-cyan-400 shadow-lg scale-95'
                  : 'bg-white/5 border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] text-cyan-300 font-mono">Sound 4</span>
              </div>
              <div className="mt-2 font-bold text-xs text-white">Deep Sano Air Horn</div>
              <span className="text-[10px] text-slate-400">Midnight heavy rumble</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* HOW TO INSTALL IN BUSSID (STEP BY STEP GUIDE) */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#14142b] to-[#0c0c1b] border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">
              BUSSID Me MOD Kaise Install Karein? (Guide)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Download Zip</h4>
              <p className="text-xs text-slate-400">
                Upar diye gaye Mediafire button se zip file apne phone me download karein.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-amber-600/30 text-amber-400 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Extract File</h4>
              <p className="text-xs text-slate-400">
                Play Store se <b>ZArchiver</b> download karein aur zip ko extract karein. Isme <code className="text-cyan-300">.bussidmod</code> file milegi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Move to BUSSID/Mods</h4>
              <p className="text-xs text-slate-400">
                File ko copy karein aur path: <code className="text-emerald-300">Internal Storage &gt; BUSSID &gt; Mods</code> folder me paste karein.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Open Game & Drive</h4>
              <p className="text-xs text-slate-400">
                Bus Simulator Indonesia open karein &gt; <b>Garage</b> me jao &gt; HMC Pak Dumper select karke maze karein!
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Virus-Free, Verified Direct Mediafire Link • Safe for all Android devices</span>
            </div>
            <a
              href="#game"
              className="text-cyan-300 hover:text-white flex items-center gap-1 font-semibold"
            >
              <span>Play 3D Simulator Online Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
