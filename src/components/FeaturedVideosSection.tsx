import React, { useState, useMemo } from 'react';
import { Play, Search, Eye, ThumbsUp, Clock, Filter, Sparkles, ExternalLink, RefreshCw, VolumeX, ShieldAlert, KeyRound } from 'lucide-react';
import { FEATURED_VIDEOS, VideoItem, CHANNEL_INFO } from '../data/channelData';
import { soundFX } from '../utils/audio';

interface FeaturedVideosProps {
  onPlayVideo: (video: VideoItem) => void;
}

export const FeaturedVideosSection: React.FC<FeaturedVideosProps> = ({ onPlayVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [autoplayMutedEnabled, setAutoplayMutedEnabled] = useState<boolean>(true);
  const [customVideoIdInput, setCustomVideoIdInput] = useState<string>('');
  const [customVideos, setCustomVideos] = useState<VideoItem[]>([]);
  const [showApiInputModal, setShowApiInputModal] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [apiStatusMessage, setApiStatusMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Creations', count: FEATURED_VIDEOS.length + customVideos.length },
    { id: 'sano-oil', label: '⛽ Sano Oil', count: FEATURED_VIDEOS.filter(v => v.category === 'sano-oil').length },
    { id: 'miniature', label: '🏰 Miniature Worlds', count: FEATURED_VIDEOS.filter(v => v.category === 'miniature').length },
    { id: 'flixbus', label: '🚌 FlixBus Journeys', count: FEATURED_VIDEOS.filter(v => v.category === 'flixbus').length },
    { id: 'asmr', label: '🏺 ASMR & Clay', count: FEATURED_VIDEOS.filter(v => v.category === 'asmr').length },
  ];

  const allVideos = useMemo(() => {
    return [...customVideos, ...FEATURED_VIDEOS];
  }, [customVideos]);

  const filteredVideos = useMemo(() => {
    return allVideos.filter((video) => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allVideos, selectedCategory, searchQuery]);

  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoIdInput.trim()) return;

    let videoId = customVideoIdInput.trim();
    // Parse youtube url if full url is pasted
    if (videoId.includes('youtube.com/watch?v=')) {
      videoId = videoId.split('v=')[1]?.split('&')[0] || videoId;
    } else if (videoId.includes('youtu.be/')) {
      videoId = videoId.split('youtu.be/')[1]?.split('?')[0] || videoId;
    }

    const newVideo: VideoItem = {
      id: `custom-${Date.now()}`,
      youtubeId: videoId,
      title: `Custom @Aivideo5677 Video (${videoId})`,
      category: 'miniature',
      categoryLabel: 'Custom Video',
      duration: '4K',
      views: 'Latest',
      likes: 'Top',
      uploadDate: 'Just now',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      description: `User loaded video from YouTube channel @Aivideo5677 (ID: ${videoId}).`,
      tags: ['AI Video', 'YouTube API', '@Aivideo5677']
    };

    setCustomVideos([newVideo, ...customVideos]);
    setCustomVideoIdInput('');
    soundFX.playChime(700, 'sine', 0.2);
  };

  const handleTestApiKey = () => {
    if (!apiKeyInput.trim()) {
      setApiStatusMessage('Please enter a valid YouTube Data API v3 key.');
      return;
    }
    setApiStatusMessage('Testing YouTube API key for @Aivideo5677...');
    // Real fetch against YouTube Data API v3
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=Aivideo5677&key=${apiKeyInput.trim()}&maxResults=5&type=video`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setApiStatusMessage(`API Error: ${data.error.message || 'Key invalid or quota reached'}.`);
        } else if (data.items && data.items.length > 0) {
          const apiFetchedVideos: VideoItem[] = data.items.map((item: any, idx: number) => ({
            id: `yt-api-${idx}-${Date.now()}`,
            youtubeId: item.id.videoId,
            title: item.snippet.title,
            category: 'sano-oil',
            categoryLabel: 'YouTube API Live',
            duration: '4K',
            views: 'Verified',
            likes: 'Trending',
            uploadDate: item.snippet.publishedAt ? new Date(item.snippet.publishedAt).toLocaleDateString() : 'Recent',
            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
            description: item.snippet.description || 'Live YouTube API release from @Aivideo5677',
            tags: ['YouTube API', '@Aivideo5677', 'Live Feed']
          }));
          setCustomVideos(prev => [...apiFetchedVideos, ...prev]);
          setApiStatusMessage(`Successfully loaded ${apiFetchedVideos.length} live videos from YouTube API!`);
        } else {
          setApiStatusMessage('YouTube API connected! No new videos returned for query.');
        }
      })
      .catch(err => {
        setApiStatusMessage(`Network error connecting to YouTube API: ${err.message}`);
      });
  };

  return (
    <section id="videos" className="relative py-24 bg-[#080811] border-t border-purple-900/30">
      {/* Background illumination */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cinematic Productions</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Featured Videos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Watch our viral miniature world sagas, Sano Oil chronicles, and tactile ASMR journeys. Hover for muted preview or click to open full 4K theater mode.
            </p>
          </div>

          {/* Autoplay & Channel Control Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                setAutoplayMutedEnabled(!autoplayMutedEnabled);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                autoplayMutedEnabled
                  ? 'bg-purple-950/60 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-950/30'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle muted preview on video hover"
            >
              <VolumeX className="w-4 h-4 text-purple-400" />
              <span>Auto-Play Muted: {autoplayMutedEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setShowApiInputModal(!showApiInputModal);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>YouTube API Config</span>
            </button>

            <a
              href={CHANNEL_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-all"
            >
              <span>Channel @Aivideo5677</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Optional YouTube API Settings Drawer */}
        {showApiInputModal && (
          <div className="mt-6 p-5 rounded-2xl bg-[#111124] border border-cyan-500/30 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  YouTube Data API v3 Live Sync for @Aivideo5677
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Connect your Google Cloud YouTube API Key to dynamically query and stream the newest uploads directly from YouTube.
                </p>
              </div>
              <button
                onClick={() => setShowApiInputModal(false)}
                className="text-xs text-slate-400 hover:text-white underline self-start sm:self-auto"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="password"
                placeholder="Paste YouTube Data API Key (AIzaSy...)"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-[#090914] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleTestApiKey}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                Sync with YouTube API
              </button>
            </div>

            {apiStatusMessage && (
              <div className="mt-3 text-xs p-2.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 font-mono">
                {apiStatusMessage}
              </div>
            )}

            {/* Quick Embed Custom Video Input */}
            <form onSubmit={handleAddCustomVideo} className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Or paste any YouTube video URL or Video ID to add to grid"
                value={customVideoIdInput}
                onChange={(e) => setCustomVideoIdInput(e.target.value)}
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-[#090914] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                + Add Video to Grid
              </button>
            </form>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="mt-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                    active
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400/40 shadow-lg shadow-purple-600/30'
                      : 'bg-[#101026] text-slate-400 border-white/5 hover:text-white hover:border-purple-500/20'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? 'bg-black/30 text-white' : 'bg-white/5 text-slate-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Sano Oil, FlixBus, rain, clay..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#101026] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => {
            const isHovered = hoveredVideoId === video.id && autoplayMutedEnabled;

            return (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                className="group relative rounded-2xl bg-[#0e0e1e] border border-white/5 hover:border-purple-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-2xl hover:shadow-purple-950/40 hover:-translate-y-1"
              >
                {/* Thumbnail / Autoplay Video Embed Area */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  {isHovered ? (
                    // Auto-play muted video preview
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.youtubeId}&modestbranding=1&playsinline=1`}
                      title={video.title}
                      className="w-full h-full border-0 pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      loading="lazy"
                    />
                  )}

                  {/* Top Badge: Category */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                      {video.categoryLabel}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[11px] font-mono text-white font-medium z-10">
                    {video.duration}
                  </div>

                  {/* Play Overlay Button */}
                  <button
                    onClick={() => {
                      soundFX.playChime(650, 'triangle', 0.2);
                      onPlayVideo(video);
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-purple-500/60 transform group-hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full bg-[#080811]/90 flex items-center justify-center pl-0.5">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Video Info Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onPlayVideo(video)}
                      className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {video.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        {video.views}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-cyan-400" />
                        {video.likes}
                      </span>
                    </div>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-purple-400 hover:text-white flex items-center gap-0.5 font-sans font-medium"
                      title="Open on YouTube"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredVideos.length === 0 && (
          <div className="mt-12 text-center p-12 rounded-3xl bg-[#0e0e1e] border border-white/5 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-purple-400 mx-auto mb-3 opacity-60" />
            <h4 className="text-base font-bold text-white">No creations match "{searchQuery}"</h4>
            <p className="text-xs text-slate-400 mt-1">
              Try searching for "Sano Oil", "clay", "FlixBus", or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
