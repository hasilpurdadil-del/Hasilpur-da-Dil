import React, { useEffect, useState } from 'react';
import { X, Youtube, Share2, Check, ExternalLink, Eye, ThumbsUp, Sparkles, Maximize2 } from 'lucide-react';
import { VideoItem, ShortItem, CHANNEL_INFO } from '../data/channelData';
import { soundFX } from '../utils/audio';

interface VideoModalProps {
  item: VideoItem | ShortItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isShort = !('duration' in item && item.duration.includes(':'));
  const youtubeUrl = isShort
    ? `https://www.youtube.com/shorts/${item.youtubeId}`
    : `https://www.youtube.com/watch?v=${item.youtubeId}`;

  const handleShare = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(youtubeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-[#0e0e1e] border border-purple-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0a0a16] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-heading font-bold text-xs sm:text-sm text-white tracking-wide">
              {CHANNEL_INFO.name} • Theater Mode
            </span>
            <span className="text-xs text-purple-400 font-mono hidden sm:inline">
              ({CHANNEL_INFO.handle})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy video link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 fill-white" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Embed Container */}
        <div className="relative bg-black flex-shrink-0">
          <div className={isShort ? "aspect-[9/16] max-h-[60vh] mx-auto" : "aspect-video w-full"}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
              title={item.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video Metadata / Information Footer */}
        <div className="p-5 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#0c0c1b] to-[#080814]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/40 text-[11px] font-bold text-purple-300 uppercase">
                  {('categoryLabel' in item && item.categoryLabel) || item.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {item.views} Views • {item.likes} Likes
                </span>
              </div>

              <h2 className="font-heading font-bold text-base sm:text-xl text-white">
                {item.title}
              </h2>

              {'description' in item && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {(item as VideoItem).description}
                </p>
              )}

              {'tags' in item && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(item as VideoItem).tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Subscribe Pill in modal */}
            <div className="shrink-0 pt-2 sm:pt-0">
              <a
                href={CHANNEL_INFO.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Subscribe ({CHANNEL_INFO.handle})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
