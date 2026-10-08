import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedVideosSection } from './components/FeaturedVideosSection';
import { ViralShortsSection } from './components/ViralShortsSection';
import { SubscribeSection } from './components/SubscribeSection';
import { ContactSocialSection } from './components/ContactSocialSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { VideoItem, ShortItem } from './data/channelData';

export default function App() {
  const [activeModalItem, setActiveModalItem] = useState<VideoItem | ShortItem | null>(null);

  const handleOpenVideo = (video: VideoItem) => {
    setActiveModalItem(video);
  };

  const handleOpenShort = (short: ShortItem) => {
    setActiveModalItem(short);
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
  };

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onPlayVideo={handleOpenVideo} />

        {/* 2. About Channel */}
        <AboutSection />

        {/* 3. Featured Videos (with YouTube API sync, categories, auto-play muted preview) */}
        <FeaturedVideosSection onPlayVideo={handleOpenVideo} />

        {/* 4. Viral Shorts Section */}
        <ViralShortsSection onPlayShort={handleOpenShort} />

        {/* 5. Big Subscribe Section */}
        <SubscribeSection />

        {/* 6. Contact & Socials */}
        <ContactSocialSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video / Short Theater Mode Modal */}
      <VideoModal item={activeModalItem} onClose={handleCloseModal} />
    </div>
  );
}
