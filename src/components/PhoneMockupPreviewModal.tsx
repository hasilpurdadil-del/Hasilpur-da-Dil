import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Download, Heart, Smartphone, Sliders, Eye, Share2, 
  Sparkles, Check, HelpCircle, Volume2, VolumeX, Layers, 
  Rotate3d, Compass, Sun, Moon, ArrowDown
} from 'lucide-react';
import { WallpaperItem } from '../data/wallpapersData';
import { ThreeInteractiveWallpaper } from './ThreeInteractiveWallpaper';

interface PhoneMockupPreviewModalProps {
  wallpaper: WallpaperItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenHowToGuide: () => void;
}

export const PhoneMockupPreviewModal: React.FC<PhoneMockupPreviewModalProps> = ({
  wallpaper,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenHowToGuide,
}) => {
  const [screenMode, setScreenMode] = useState<'lock' | 'home'>('lock');
  const [phoneStyle, setPhoneStyle] = useState<'iphone' | 'galaxy'>('iphone');
  const [is3DParallaxEnabled, setIs3DParallaxEnabled] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isAdjusting, setIsAdjusting] = useState<boolean>(false);

  // Filter adjustments
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [blur, setBlur] = useState<number>(0);

  // Parallax rotation state
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Real-time time
  const [currentTime, setCurrentTime] = useState<string>('09:41');
  const [currentDate, setCurrentDate] = useState<string>('Monday, October 20');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Parallax calculation on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DParallaxEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24; // tilt degrees
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Device orientation tilt for mobile devices
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!is3DParallaxEnabled || e.gamma === null || e.beta === null) return;
      const x = Math.min(Math.max(e.gamma / 2, -15), 15);
      const y = Math.min(Math.max((e.beta - 45) / 2, -15), 15);
      setTilt({ x: -y, y: x });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [is3DParallaxEnabled]);

  if (!wallpaper) return null;

  const handleDownload = (resolution: '4k' | '1080p' | 'video') => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    if (resolution === 'video' && wallpaper.videoUrl) {
      link.href = wallpaper.videoUrl;
      link.download = `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}-live-wallpaper.mp4`;
    } else {
      link.href = resolution === '4k' ? wallpaper.hdUrl : wallpaper.thumbnailUrl;
      link.download = `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}-${resolution}-wallpaper.jpg`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${wallpaper.title} - 4K Wallpaper`,
          text: `Check out this incredible HD 3D wallpaper: ${wallpaper.title}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // CSS filter string
  const filterStyle = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-[#0c0c17] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all shadow-lg"
          aria-label="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT / CENTER: Realistic 3D Phone Mockup Viewer */}
        <div 
          className="flex-1 bg-gradient-to-b from-[#10101e] to-[#070710] p-6 flex flex-col items-center justify-center relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Subtle Ambient Glow behind Phone */}
          <div 
            className="absolute w-72 h-96 rounded-full blur-3xl opacity-35 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: wallpaper.dominantColor }}
          />

          {/* Screen Mode Toggle Bar */}
          <div className="z-10 mb-4 flex items-center gap-2 bg-black/50 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-lg">
            <button
              onClick={() => setScreenMode('lock')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                screenMode === 'lock' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Lock Screen (لاک اسکرین)</span>
            </button>
            <button
              onClick={() => setScreenMode('home')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                screenMode === 'home' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Home Screen (ایپس کے ساتھ)</span>
            </button>
          </div>

          {/* 3D Tilted Phone Frame */}
          <div 
            className="relative transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Outer Smartphone Chassis */}
            <div className={`relative w-[280px] sm:w-[310px] h-[580px] sm:h-[630px] rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[5px] transition-all ${
              phoneStyle === 'iphone' ? 'border-[#33354a] bg-[#1a1b26]' : 'border-[#222436] bg-[#0f111a]'
            }`}>
              
              {/* Inner Bezel Screen Area */}
              <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black select-none shadow-inner">
                
                {/* 1. ACTUAL WALLPAPER LAYER (Photo, 3D Video, or Interactive WebGL) */}
                <div 
                  className="absolute inset-0 w-full h-full object-cover transition-all"
                  style={{ filter: filterStyle }}
                >
                  {wallpaper.type === '3d-interactive' ? (
                    <ThreeInteractiveWallpaper 
                      shaderType={wallpaper.threeShader} 
                      className="w-full h-full"
                      isInteractive={is3DParallaxEnabled}
                    />
                  ) : wallpaper.type === 'video' && wallpaper.videoUrl ? (
                    <video
                      ref={videoRef}
                      src={wallpaper.videoUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={wallpaper.hdUrl}
                      alt={wallpaper.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  )}
                </div>

                {/* Subtle Phone Glass Reflection Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Dynamic Island / Camera Punch Hole */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20">
                  {phoneStyle === 'iphone' ? (
                    <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2 shadow-md">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#181824]" />
                      <div className="w-2 h-2 rounded-full bg-[#0a0a14] ring-1 ring-white/10" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-white/20 shadow-sm" />
                  )}
                </div>

                {/* Status Bar (Clock, 5G, Battery) */}
                <div className="absolute top-3 inset-x-5 flex justify-between items-center text-[11px] font-semibold text-white/90 z-10 drop-shadow-md">
                  <span>{currentTime}</span>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span>5G</span>
                    <div className="w-4 h-2 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                      <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* OVERLAY 1: LOCK SCREEN MODE */}
                {screenMode === 'lock' && (
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pt-16 pb-7 pointer-events-none z-10 text-white">
                    {/* Big Digital Clock & Date */}
                    <div className="text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                      <p className="text-xs font-medium text-white/80 tracking-wide uppercase">{currentDate}</p>
                      <h1 className="text-6xl font-light tracking-tight font-display mt-0.5">{currentTime}</h1>
                      
                      {/* Notification card preview */}
                      <div className="mt-8 mx-auto max-w-[240px] bg-black/45 backdrop-blur-md p-2.5 rounded-2xl border border-white/15 text-left flex items-center gap-2.5 shadow-xl">
                        <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-white truncate">Wallpaper Studio 4K</p>
                          <p className="text-[10px] text-white/70 truncate">{wallpaper.title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Lock screen buttons (Flashlight & Camera) */}
                    <div className="flex justify-between items-center px-2">
                      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-lg">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div className="w-24 h-1 bg-white/60 rounded-full shadow-md" />
                      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-lg">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* OVERLAY 2: HOME SCREEN MODE (App Icons Grid) */}
                {screenMode === 'home' && (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pt-14 pb-5 pointer-events-none z-10">
                    {/* Apps Grid */}
                    <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
                      {[
                        { name: 'WhatsApp', icon: '💬', bg: 'bg-emerald-500' },
                        { name: 'YouTube', icon: '▶️', bg: 'bg-red-500' },
                        { name: 'Instagram', icon: '📸', bg: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600' },
                        { name: 'TikTok', icon: '🎵', bg: 'bg-black border border-white/20' },
                        { name: 'Camera', icon: '📷', bg: 'bg-slate-700' },
                        { name: 'Photos', icon: '🖼️', bg: 'bg-white' },
                        { name: 'Settings', icon: '⚙️', bg: 'bg-slate-600' },
                        { name: 'Maps', icon: '🗺️', bg: 'bg-blue-500' },
                        { name: 'Chrome', icon: '🌐', bg: 'bg-amber-400' },
                        { name: 'Spotify', icon: '🎧', bg: 'bg-green-600' },
                        { name: 'Telegram', icon: '✈️', bg: 'bg-sky-500' },
                        { name: 'Gallery', icon: '🌟', bg: 'bg-purple-600' },
                      ].map((app, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className={`w-11 h-11 rounded-2xl ${app.bg} flex items-center justify-center text-lg shadow-lg border border-white/10`}>
                            {app.icon}
                          </div>
                          <span className="text-[9px] text-white/90 font-medium mt-1 truncate max-w-[50px] drop-shadow-md">
                            {app.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Dock Bar */}
                    <div className="bg-white/20 backdrop-blur-xl p-2 rounded-[28px] border border-white/20 flex justify-around items-center shadow-2xl mx-1">
                      {[
                        { icon: '📞', bg: 'bg-emerald-500' },
                        { icon: '💬', bg: 'bg-blue-500' },
                        { icon: '🌐', bg: 'bg-cyan-500' },
                        { icon: '🎵', bg: 'bg-red-500' },
                      ].map((dock, idx) => (
                        <div key={idx} className={`w-10 h-10 rounded-2xl ${dock.bg} flex items-center justify-center text-base shadow-md border border-white/10`}>
                          {dock.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* iPhone Home Indicator Line */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>

          {/* Interactive Tilt & Sound Controls Under Phone */}
          <div className="z-10 mt-4 flex items-center gap-3">
            <button
              onClick={() => setIs3DParallaxEnabled(!is3DParallaxEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                is3DParallaxEnabled 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                  : 'bg-black/40 text-slate-400 border-white/10'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>3D Parallax Tilt: {is3DParallaxEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {wallpaper.type === 'video' && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-xl bg-black/40 hover:bg-black/70 text-slate-300 border border-white/10 text-xs flex items-center gap-1"
                title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-purple-400" />}
                <span className="text-[11px]">{isMuted ? 'Muted' : 'Sound ON'}</span>
              </button>
            )}

            <button
              onClick={() => setPhoneStyle(phoneStyle === 'iphone' ? 'galaxy' : 'iphone')}
              className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/70 text-slate-300 border border-white/10 text-xs"
            >
              Frame: {phoneStyle === 'iphone' ? 'iPhone' : 'Galaxy S24'}
            </button>
          </div>
        </div>

        {/* RIGHT: Wallpaper Details, Adjust Studio, and Download Actions */}
        <div className="w-full lg:w-96 p-6 flex flex-col justify-between bg-[#0e0e1a] border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
          <div>
            {/* Header badges */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {wallpaper.type === 'video' ? '🎬 3D Live Video' : wallpaper.type === '3d-interactive' ? '🌀 WebGL 3D' : '🖼️ 4K Ultra HD'}
                </span>
                <span className="px-2 py-1 rounded-lg text-[11px] font-mono bg-white/5 text-slate-300 border border-white/10">
                  {wallpaper.resolution}
                </span>
              </div>

              {/* Favorite & Share Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onToggleFavorite(wallpaper.id)}
                  className={`p-2 rounded-xl transition-all border ${
                    isFavorite
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-sm shadow-rose-500/30'
                      : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
                  aria-label="Share wallpaper"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Titles (English & Urdu) */}
            <h2 className="text-xl font-bold text-white tracking-tight">{wallpaper.title}</h2>
            <p className="text-base text-purple-400 font-semibold mt-0.5 font-display" dir="rtl">
              {wallpaper.urduTitle}
            </p>

            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              {wallpaper.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {wallpaper.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[10px] font-mono border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Downloads</p>
                <p className="text-sm font-bold text-white font-mono mt-0.5">{wallpaper.downloads}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Rating & Likes</p>
                <p className="text-sm font-bold text-rose-400 font-mono mt-0.5">❤️ {wallpaper.likes}</p>
              </div>
            </div>

            {/* WALLPAPER FILTER & ADJUST STUDIO ACCORDION */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsAdjusting(!isAdjusting)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white py-1"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  Customize Wallpaper Look (برائٹنس و فلٹرز)
                </span>
                <span className="text-[11px] text-purple-400">{isAdjusting ? 'Hide ▲' : 'Adjust ▼'}</span>
              </button>

              {isAdjusting && (
                <div className="mt-3 space-y-3 p-3 rounded-xl bg-black/40 border border-white/10 animate-fade-in text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Brightness</span>
                      <span>{brightness}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="150" 
                      value={brightness} 
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Contrast</span>
                      <span>{contrast}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="150" 
                      value={contrast} 
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Blur (For App Readability)</span>
                      <span>{blur}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="8" 
                      value={blur} 
                      onChange={(e) => setBlur(Number(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer" 
                    />
                  </div>

                  <button
                    onClick={() => {
                      setBrightness(100);
                      setContrast(100);
                      setSaturation(100);
                      setBlur(0);
                    }}
                    className="w-full text-center text-[10px] text-slate-400 hover:text-white pt-1"
                  >
                    Reset Adjustments
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* DOWNLOAD & HOW-TO GUIDE ACTIONS */}
          <div className="mt-6 space-y-2.5">
            {downloadSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-1.5 animate-bounce">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>وال پیپر ڈاؤن لوڈ ہو رہا ہے! Starting HD Download...</span>
              </div>
            )}

            {wallpaper.type === 'video' ? (
              <button
                onClick={() => handleDownload('video')}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Live Video Wallpaper (.MP4)</span>
              </button>
            ) : (
              <button
                onClick={() => handleDownload('4k')}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download 4K Ultra HD (2160 × 3840)</span>
              </button>
            )}

            <button
              onClick={() => handleDownload('1080p')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Full HD 1080p Download (ہلکا سائز)</span>
            </button>

            {/* How to set as wallpaper guide button */}
            <button
              onClick={onOpenHowToGuide}
              className="w-full py-2 text-center text-xs text-purple-400 hover:text-purple-300 flex items-center justify-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>فون پر وال پیپر کیسے لگائیں؟ How to Set as Wallpaper Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
