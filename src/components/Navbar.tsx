import React, { useState, useEffect } from 'react';
import { Youtube, Sparkles, Volume2, VolumeX, Menu, X, ExternalLink, Film } from 'lucide-react';
import { CHANNEL_INFO } from '../data/channelData';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  onSoundToggle?: (isMuted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSoundToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (onSoundToggle) onSoundToggle(muted);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Featured Videos', href: '#videos' },
    { label: 'Viral Shorts', href: '#shorts' },
    { label: 'Channel Pillars', href: '#pillars' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080811]/90 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-lg shadow-purple-950/20'
          : 'bg-gradient-to-b from-[#080811]/90 via-[#080811]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Handle */}
          <a
            href="#home"
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-600 p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-300">
                <div className="w-full h-full bg-[#0d0d1a] rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#080811] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                  AI VIDEO STUDIO
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300">
                  AI 4K
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono tracking-wide flex items-center gap-1">
                <span className="text-red-400">●</span> {CHANNEL_INFO.handle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101026]/70 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundFX.playClick()}
                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isMuted ? 'Turn Sound FX On' : 'Mute Sound FX'}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-300 border border-white/10 transition-all"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
            </button>

            {/* Subscribe on YouTube CTA */}
            <a
              href={CHANNEL_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playChime(700, 'triangle', 0.2)}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 p-[1px] shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300"
            >
              <div className="px-3.5 py-2 sm:px-4 sm:py-2 bg-[#0e0e1c] rounded-[11px] group-hover:bg-opacity-80 transition-all flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Subscribe
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0f0f24] border border-purple-500/20 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    soundFX.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-purple-900/30 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-purple-400">→</span>
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href={CHANNEL_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Youtube className="w-4 h-4 fill-white" />
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
