import React from 'react';
import { Smartphone, Download } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  className?: string;
  variant?: 'nav' | 'hero' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  onOpenModal, 
  className = '',
  variant = 'nav'
}) => {
  const handleClick = () => {
    soundFX.playClick();
    onOpenModal();
  };

  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        className={`group inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${className}`}
      >
        <Smartphone className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform" />
        <span>Install App / Play Store</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 hover:from-emerald-900/90 hover:to-teal-900/90 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs sm:text-sm font-semibold shadow-md transition-all ${className}`}
      title="Install on Mobile / Google Play Store Guide"
    >
      <Smartphone className="w-4 h-4 text-emerald-400" />
      <span>Install App</span>
    </button>
  );
};
