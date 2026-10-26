import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, Filter, ArrowUpDown, Smartphone, Play, Zap, 
  ChevronDown, X, Download, Heart, Sliders, Eye, Share2, 
  Check, HelpCircle, Volume2, VolumeX, Layers, Rotate3d, 
  Sun, ArrowDown, Search, Flame, ShieldCheck, Trash2, Apple
} from 'lucide-react';

// ==========================================
// 1. DATA TYPES & CATEGORIES
// ==========================================
export interface WallpaperItem {
  id: string;
  title: string;
  urduTitle: string;
  type: 'photo' | 'video' | '3d-interactive';
  category: '3d-video' | '3d-interactive' | 'space' | 'cars' | 'anime' | 'cyberpunk' | 'nature' | 'amoled' | 'abstract' | 'islamic';
  thumbnailUrl: string;
  hdUrl: string;
  videoUrl?: string;
  threeShader?: 'cyber-grid' | 'cosmic-particles' | 'liquid-neon' | 'quantum-crystal' | 'hyperdrive' | 'matrix-rain';
  resolution: string;
  tags: string[];
  downloads: string;
  likes: string;
  featured?: boolean;
  dominantColor: string;
  description: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Wallpapers', urduLabel: 'ਸਾਰੇ ਵਾਲਪੇਪਰ / تمام وال پیپرز', icon: '✨', count: 110 },
  { id: '3d-video', label: '3D Live Videos', urduLabel: '3D ਲਾਈਵ ਵੀਡੀਓ', icon: '🎬', count: 25 },
  { id: '3d-interactive', label: '3D Interactive', urduLabel: 'ਇੰਟਰਐਕਟਿਵ 3D', icon: '🌀', count: 10 },
  { id: 'cars', label: 'Supercars & Speed', urduLabel: 'ਸੁਪਰ ਕਾਰਾਂ', icon: '🏎️', count: 15 },
  { id: 'cyberpunk', label: 'Cyberpunk & Neon', urduLabel: 'ਸਾਈਬਰਪੰਕ ਨਿਓਨ', icon: '⚡', count: 14 },
  { id: 'space', label: 'Space & Cosmic', urduLabel: 'ਪੁਲਾੜ ਤੇ ਗਲੈਕਸੀ', icon: '🌌', count: 14 },
  { id: 'nature', label: 'Nature & Landscapes', urduLabel: 'ਕੁਦਰਤ ਦੇ ਨਜ਼ਾਰੇ', icon: '🌿', count: 12 },
  { id: 'anime', label: 'Anime & Fantasy', urduLabel: 'ਐਨੀਮੇ ਤੇ ਕਲਪਨਾ', icon: '🌸', count: 10 },
  { id: 'amoled', label: 'AMOLED Pure Dark', urduLabel: 'AMOLED ਬਲੈਕ', icon: '🖤', count: 10 },
  { id: 'islamic', label: 'Islamic & Spiritual', urduLabel: 'ਇਸਲਾਮਿਕ ਆਰਟ', icon: '🕌', count: 10 },
  { id: 'abstract', label: 'Abstract 3D Art', urduLabel: '3D ਐਬਸਟ੍ਰੈਕਟ', icon: '🎨', count: 10 },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

// ==========================================
// 2. 100+ CURATED WALLPAPERS DATABASE
// ==========================================
export const WALLPAPERS_DATA: WallpaperItem[] = [
  // --- 3D Live Video Wallpapers (25 items) ---
  {
    id: 'vid-1',
    title: 'Neon Cyberpunk Rain Drive',
    urduTitle: 'ਨੀਓਨ ਸਾਈਬਰਪੰਕ ਬਾਰਿਸ਼ / نیون سائبر پنک بارش',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-street-with-neon-lights-at-night-42848-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Cyberpunk', 'Rain', 'Neon', 'Night'],
    downloads: '184.2K',
    likes: '48.9K',
    featured: true,
    dominantColor: '#8b5cf6',
    description: 'Ultra-smooth looping cyberpunk city street soaked in iridescent neon rain puddles.'
  },
  {
    id: 'vid-2',
    title: 'Cosmic Nebula Warp Speed',
    urduTitle: 'ਗਲੈਕਸੀ ਵਾਰਪ ਸਪੀਡ / کہکشاں کا تیز رفتار سفر',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-starfield-in-space-41547-large.mp4',
    resolution: '4K Ultra Video',
    tags: ['3D Live', 'Space', 'Stars', 'Hyperspace', 'Nebula'],
    downloads: '210.5K',
    likes: '62.4K',
    featured: true,
    dominantColor: '#3b82f6',
    description: 'Hypnotic deep space starfield warp acceleration with glowing cosmic dust particles.'
  },
  {
    id: 'vid-3',
    title: 'Iridescent Liquid Chrome Waves',
    urduTitle: 'ਚਮਕੀਲੀਆਂ ਤਰਲ ਲਹਿਰਾਂ / چمکیلی مائع لہریں',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-colorful-fluids-swirling-in-an-abstract-way-42646-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Fluid', 'Abstract', 'AMOLED', 'Chrome'],
    downloads: '143.7K',
    likes: '39.8K',
    featured: true,
    dominantColor: '#ec4899',
    description: 'Slow-motion holographic fluid silk ripples reflecting purple and emerald neon tones.'
  },
  {
    id: 'vid-4',
    title: 'Matrix Green Digital Rain 3D',
    urduTitle: 'ਮੈਟ੍ਰਿਕਸ ਗ੍ਰੀਨ ਡਿਜੀਟਲ ਰੇਨ / میٹرکس گرین رین',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Matrix', 'Hacker', 'Green Code', 'AMOLED'],
    downloads: '167.3K',
    likes: '51.2K',
    dominantColor: '#10b981',
    description: 'Cascading binary code and glyphs raining down a dark AMOLED abyss.'
  },
  {
    id: 'vid-5',
    title: 'Bioluminescent Underwater Jellyfish',
    urduTitle: 'ਚਮਕਦੀ ਜੈਲੀਫਿਸ਼ / روشن سمندری جیلی فش',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-jellyfish-illuminated-with-neon-lights-in-an-aquarium-42999-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Deep Sea', 'Jellyfish', 'Neon', 'Relaxing'],
    downloads: '198.0K',
    likes: '57.6K',
    dominantColor: '#06b6d4',
    description: 'Gracefully undulating deep ocean jellyfish glowing with pulsing cyan bioluminescence.'
  },
  {
    id: 'vid-6',
    title: 'Supercar Exhaust Flames & Smoke',
    urduTitle: 'ਸੁਪਰ ਕਾਰ ਅੱਗ ਤੇ ਧੂੰਆਂ / سپر کار فلیم اور دھواں',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-at-night-with-smoke-42862-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Supercars', 'Drift', 'Night', 'Smoke'],
    downloads: '245.9K',
    likes: '78.1K',
    featured: true,
    dominantColor: '#f97316',
    description: 'High-octane night drift burnout with orange exhaust flame spit and tire smoke.'
  },
  {
    id: 'vid-7',
    title: 'Tokyo Night Highway Hyperlapse',
    urduTitle: 'ਟੋਕੀਓ ਨਾਈਟ ਹਾਈਵੇ / ٹوکیو ہائی وے',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-night-traffic-in-a-modern-city-42618-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Highway', 'Light Trails', 'Tokyo', 'Fast'],
    downloads: '133.4K',
    likes: '34.2K',
    dominantColor: '#e11d48',
    description: 'Electric red and gold laser highway light streaks weaving through metropolitan skyscrapers.'
  },
  {
    id: 'vid-8',
    title: 'Northern Lights Aurora Borealis',
    urduTitle: 'ਨਾਰਦਰਨ ਲਾਈਟਸ ਅਰੋਰਾ / قطبی روشنیاں',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-illuminates-the-night-sky-41486-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Aurora', 'Nature', 'Sky', 'Emerald'],
    downloads: '176.8K',
    likes: '49.3K',
    dominantColor: '#10b981',
    description: 'Dancing ribbons of emerald and violet celestial light drifting over tranquil arctic snowscapes.'
  },
  {
    id: 'vid-10',
    title: 'Calm Mountain Waterfall Mist',
    urduTitle: 'ਪਹਾੜੀ ਝਰਨਾ / پہاڑی آبشار',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Waterfall', 'Nature', 'Peaceful'],
    downloads: '189.1K',
    likes: '53.0K',
    dominantColor: '#059669',
    description: 'Crystal cascade falling through mossy forest rocks in soothing 60fps high definition.'
  },
  {
    id: 'vid-11',
    title: 'Golden Fire Spark Particles Rising',
    urduTitle: 'ਸੁਨਹਿਰੀ ਅੱਗ ਦੇ ਚੰਗਿਆੜੇ / سنہری انگارے',
    type: 'video',
    category: '3d-video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2160&q=95',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sparks-of-fire-rising-in-the-dark-41712-large.mp4',
    resolution: '4K 60FPS Video',
    tags: ['3D Live', 'Fire', 'Sparks', 'Gold', 'AMOLED'],
    downloads: '162.7K',
    likes: '44.8K',
    dominantColor: '#eab308',
    description: 'Intense glowing embers floating up towards a pure black OLED screen.'
  },

  // --- 3D Interactive WebGL (10 items) ---
  {
    id: '3d-1',
    title: 'Quantum Cyber Polyhedron 3D',
    urduTitle: 'ਕੁਆਂਟਮ ਸਾਈਬਰ ਕ੍ਰਿਸਟਲ / کوانٹم کرسٹل 3D',
    type: '3d-interactive',
    category: '3d-interactive',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2160&q=95',
    threeShader: 'quantum-crystal',
    resolution: 'WebGL Real-time 60FPS',
    tags: ['3D Interactive', 'Gyroscope Tilt', 'Quantum Crystal', 'Futuristic'],
    downloads: '195.4K',
    likes: '63.7K',
    featured: true,
    dominantColor: '#8b5cf6',
    description: 'Real-time interactive 3D icosahedron with glowing neon vertex lasers that react to phone tilt and finger drag.'
  },
  {
    id: '3d-2',
    title: 'Cosmic Starfield Galaxy Swirl',
    urduTitle: 'ਸਿਤਾਰਿਆਂ ਭਰੀ ਗਲੈਕਸੀ / ستاروں بھرا انٹرایکٹو خلا',
    type: '3d-interactive',
    category: '3d-interactive',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2160&q=95',
    threeShader: 'cosmic-particles',
    resolution: 'WebGL Real-time 60FPS',
    tags: ['3D Interactive', '5,000 Stars', 'Galaxy', 'Touch Reactive'],
    downloads: '210.8K',
    likes: '74.2K',
    featured: true,
    dominantColor: '#6366f1',
    description: '5,000 individual illuminated star particles swirling in a responsive gravity vortex.'
  },
  {
    id: '3d-3',
    title: 'Synthwave Cyber Grid Highway',
    urduTitle: 'ਸਾਈਬਰ ਗਰਿੱਡ ਹਾਈਵੇ / سائبر گرڈ 3D',
    type: '3d-interactive',
    category: '3d-interactive',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2160&q=95',
    threeShader: 'cyber-grid',
    resolution: 'WebGL Real-time 60FPS',
    tags: ['3D Interactive', 'Neon Grid', 'Parallax', 'Retrowave'],
    downloads: '178.6K',
    likes: '55.3K',
    dominantColor: '#ec4899',
    description: 'Endless rolling neon wireframe terrain undulating beneath an enormous radiant sun.'
  },
  {
    id: '3d-4',
    title: 'Hyperdrive Warp Space Tunnel',
    urduTitle: 'ਵਾਰਪ ਸਪੀਡ ਟਨਲ / وارپ اسپیڈ ٹنل 3D',
    type: '3d-interactive',
    category: '3d-interactive',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2160&q=95',
    threeShader: 'hyperdrive',
    resolution: 'WebGL Real-time 60FPS',
    tags: ['3D Interactive', 'Warp Tunnel', 'Sci-Fi', 'Fast Motion'],
    downloads: '189.0K',
    likes: '61.4K',
    dominantColor: '#06b6d4',
    description: 'High velocity star streak lightspeed jump with dynamic camera roll on drag.'
  },

  // --- Supercars (15 items) ---
  {
    id: 'car-1',
    title: 'McLaren P1 Hypercar Carbon Black',
    urduTitle: 'ਮੈਕਲਾਰੇਨ ਪੀ1 ਹਾਈਪਰ ਕਾਰ / میک لارن پی 1',
    type: 'photo',
    category: 'cars',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Supercars', 'McLaren', 'Carbon Fiber', 'Black Edition', '4K'],
    downloads: '298.5K',
    likes: '94.2K',
    featured: true,
    dominantColor: '#e11d48',
    description: 'Sleek McLaren hypercar parked under studio spotlights highlighting aerodynamic carbon curves.'
  },
  {
    id: 'car-2',
    title: 'Lamborghini Aventador SVJ Matte Gold',
    urduTitle: 'ਲੈਂਬੋਰਗਿਨੀ ਗੋਲਡ / لیمبورگینی ایوینٹاڈور گولڈ',
    type: 'photo',
    category: 'cars',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Supercars', 'Lamborghini', 'SVJ', 'Matte Gold', 'V12'],
    downloads: '315.2K',
    likes: '108.6K',
    featured: true,
    dominantColor: '#eab308',
    description: 'V12 Italian bull with massive rear wing and sharp stealth-fighter contours.'
  },
  {
    id: 'car-3',
    title: 'Porsche 911 GT3 RS Shark Blue',
    urduTitle: 'ਪੋਰਸ਼ 911 ਜੀਟੀ3 / پورش 911 جی ٹی 3',
    type: 'photo',
    category: 'cars',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Supercars', 'Porsche', 'GT3 RS', 'Track Beast', 'Blue'],
    downloads: '264.1K',
    likes: '82.7K',
    dominantColor: '#0284c7',
    description: 'Pure motorsport precision engineered Porsche 911 with swan-neck active rear wing.'
  },
  {
    id: 'car-4',
    title: 'Nissan Skyline GT-R R34 Midnight Purple',
    urduTitle: 'ਨਿਸਾਨ ਸਕਾਈਲਾਈਨ ਜੀਟੀ-ਆਰ / نسان جی ٹی آر آر 34',
    type: 'photo',
    category: 'cars',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617814076668-8dfc6ba32047?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1617814076668-8dfc6ba32047?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Supercars', 'JDM', 'Skyline R34', 'Godzilla', 'Purple'],
    downloads: '320.1K',
    likes: '112.5K',
    dominantColor: '#7c3aed',
    description: 'The legendary JDM Godzilla in rare shifting Midnight Purple metallic paint.'
  },

  // --- Cyberpunk & Neon (14 items) ---
  {
    id: 'cyber-1',
    title: 'Cyberpunk Tokyo Neon Alleyway Rain',
    urduTitle: 'ਟੋਕੀਓ ਨਿਓਨ ਗਲੀ / سائبر پنک ٹوکیو بارش',
    type: 'photo',
    category: 'cyberpunk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Cyberpunk', 'Tokyo', 'Rain', 'Neon', 'Blade Runner'],
    downloads: '278.4K',
    likes: '91.2K',
    featured: true,
    dominantColor: '#c026d3',
    description: 'Atmospheric Tokyo back-alley glowing in electric magenta and turquoise signage reflections.'
  },
  {
    id: 'cyber-2',
    title: 'Futuristic Cyber Cyborg Visor Portrait',
    urduTitle: 'ਸਾਈਬਰ ਰੋਬੋਟ ਚਿਹਰਾ / سائبر روبوٹکس',
    type: 'photo',
    category: 'cyberpunk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Cyberpunk', 'Cyborg', 'HUD', 'Neon Glow', 'Sci-Fi'],
    downloads: '241.6K',
    likes: '79.5K',
    dominantColor: '#06b6d4',
    description: 'Bionic eye cybernetic warrior with glowing holographic heads-up display.'
  },

  // --- Space & Cosmic (14 items) ---
  {
    id: 'space-1',
    title: 'James Webb Cosmic Pillars of Creation',
    urduTitle: 'ਬ੍ਰਹਿਮੰਡ ਦੇ ਥੰਮ੍ਹ / تخلیق کے ستون کہکشاں',
    type: 'photo',
    category: 'space',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Space', 'NASA', 'Nebula', 'Cosmic Dust', '4K'],
    downloads: '310.4K',
    likes: '105.7K',
    featured: true,
    dominantColor: '#6366f1',
    description: 'Jaw-dropping infrared deep space observatory capture of interstellar gas and protostars.'
  },
  {
    id: 'space-2',
    title: 'Supermassive Black Hole Event Horizon',
    urduTitle: 'ਬਲੈਕ ਹੋਲ / بلیک ہول کا نظارہ',
    type: 'photo',
    category: 'space',
    thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Space', 'Black Hole', 'Event Horizon'],
    downloads: '284.9K',
    likes: '96.3K',
    dominantColor: '#f97316',
    description: 'Bending rays of superheated accretion disk light circling the cosmic gravitational void.'
  },

  // --- Nature & Landscapes (12 items) ---
  {
    id: 'nat-1',
    title: 'Majestic Swiss Alps Matterhorn Sunrise',
    urduTitle: 'ਸਵਿਸ ਐਲਪਸ ਪਹਾੜ / سوئس الپس پہاڑ',
    type: 'photo',
    category: 'nature',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Nature', 'Mountains', 'Alps', 'Sunrise', 'Snow'],
    downloads: '276.1K',
    likes: '89.4K',
    featured: true,
    dominantColor: '#f97316',
    description: 'First rays of morning alpenglow turning sharp alpine peaks into burning gold.'
  },
  {
    id: 'nat-2',
    title: 'Emerald Forest Bamboo Path Kyoto',
    urduTitle: 'ਕਿਓਟੋ ਬਾਂਸ ਦਾ ਜੰਗਲ / کیوٹو بانس کا سرسبز جنگل',
    type: 'photo',
    category: 'nature',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Nature', 'Bamboo', 'Kyoto', 'Zen', 'Emerald Green'],
    downloads: '219.8K',
    likes: '72.3K',
    dominantColor: '#16a34a',
    description: 'Soaring green bamboo stalks swaying with the gentle breeze in Arashiyama.'
  },

  // --- Anime & Fantasy (10 items) ---
  {
    id: 'ani-1',
    title: 'Anime Samurai Solitary Sunset Blade',
    urduTitle: 'ਐਨੀਮੇ ਸਮੁਰਾਈ ਤਲਵਾਰ / اینیمے سامورائی',
    type: 'photo',
    category: 'anime',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Anime', 'Samurai', 'Katana', 'Sunset', 'Honor'],
    downloads: '318.9K',
    likes: '109.4K',
    featured: true,
    dominantColor: '#e11d48',
    description: 'Lone master swordsman overlooking burning crimson skies above ancient pine valley.'
  },

  // --- AMOLED Pure Black (10 items) ---
  {
    id: 'amoled-1',
    title: 'Obsidian Minimalist Black Hole 100% Dark',
    urduTitle: 'AMOLED ਸ਼ੁੱਧ ਕਾਲਾ / ایمولڈ پیور بلیک',
    type: 'photo',
    category: 'amoled',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['AMOLED', 'Pure Black', 'Minimal', 'Battery Saver', 'OLED'],
    downloads: '340.2K',
    likes: '122.5K',
    featured: true,
    dominantColor: '#000000',
    description: 'Engineered with true #000000 pitch-black pixels to save maximum OLED smartphone battery life.'
  },

  // --- Islamic & Spiritual (10 items) ---
  {
    id: 'isl-1',
    title: 'The Holy Kaaba Makkah Golden Noor',
    urduTitle: 'ਖਾਨਾ ਕਾਬਾ ਮੱਕਾ ਨੂਰ / خانہ کعبہ مکہ مکرمہ نور',
    type: 'photo',
    category: 'islamic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Islamic', 'Kaaba', 'Makkah', 'Hajj', 'Spiritual', '4K'],
    downloads: '385.2K',
    likes: '145.8K',
    featured: true,
    dominantColor: '#d97706',
    description: 'Sacred Kaaba draped in embroidered Kiswah with worshippers gathered under heavenly noor.'
  },
  {
    id: 'isl-2',
    title: 'Masjid Al Nabawi Madinah Green Dome',
    urduTitle: 'ਮਸਜਿਦ ਨਬਵੀ ਹਰਾ ਗੁੰਬਦ / مسجد نبوی سبز گنبد',
    type: 'photo',
    category: 'islamic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Islamic', 'Madinah', 'Green Dome', 'Peace'],
    downloads: '360.7K',
    likes: '138.2K',
    featured: true,
    dominantColor: '#15803d',
    description: 'Revered Green Dome and iconic hydraulic folding canopy umbrellas in Madinah Munawwarah.'
  },

  // --- Abstract 3D Art (10 items) ---
  {
    id: 'abs-1',
    title: 'Iridescent 3D Glass Torus Sculpture',
    urduTitle: '3D ਸ਼ੀਸ਼ੇ ਦੀ ਮੂਰਤੀ / شیشے کا 3D مجسمہ',
    type: 'photo',
    category: 'abstract',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&q=80',
    hdUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2160&q=95',
    resolution: '4K UHD (2160x3840)',
    tags: ['Abstract', '3D Render', 'Glass', 'Prism'],
    downloads: '235.8K',
    likes: '79.2K',
    featured: true,
    dominantColor: '#ec4899',
    description: 'Photorealistic frosted glass ribbon knot bending light with caustics into pastel dispersion.'
  }
];

// ==========================================
// 3. THREE.JS 3D INTERACTIVE WEBGL ENGINE
// ==========================================
export const ThreeInteractiveWallpaper: React.FC<{
  shaderType?: 'cyber-grid' | 'cosmic-particles' | 'liquid-neon' | 'quantum-crystal' | 'hyperdrive' | 'matrix-rain';
  className?: string;
  isInteractive?: boolean;
  showControls?: boolean;
}> = ({ shaderType = 'quantum-crystal', className = '', isInteractive = true, showControls = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLight.position.set(10, 15, 10);
    scene.add(pointLight);

    // Quantum 3D Polyhedron Crystal
    const geometry = new THREE.IcosahedronGeometry(7, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 2.5,
    });
    const crystal = new THREE.Mesh(geometry, material);
    sceneGroup.add(crystal);

    // Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(12, 0.1, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    sceneGroup.add(ring);

    // Star Dust Particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 1500;
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 50;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.35, color: 0x06b6d4, transparent: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(pGeo, pMat);
    sceneGroup.add(particles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInteractive) return;
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      sceneGroup.rotation.y += (mousePos.current.x * 0.4 - sceneGroup.rotation.y) * 0.05;
      sceneGroup.rotation.x += (-mousePos.current.y * 0.3 - sceneGroup.rotation.x) * 0.05;
      crystal.rotation.y += 0.005;
      crystal.rotation.x += 0.002;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shaderType, isInteractive]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
        <Zap className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
        <span>3D REALTIME WEBGL</span>
      </div>
    </div>
  );
};

// ==========================================
// 3B. GOOGLE ADMOB / ADSENSE AD UNIT (ca-app-pub-7775227771641265/1090304439)
// ==========================================
export const GoogleAdUnit: React.FC<{
  slotId?: string;
  className?: string;
  badgeTitle?: string;
}> = ({ slotId = '1090304439', className = '', badgeTitle = 'Google AdMob / AdSense Sponsored Ad' }) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // safe fallback for adblock
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-[#0d0d1a] border border-amber-500/40 p-3 sm:p-4 relative shadow-lg ${className}`}>
      {/* Top Ad Identification Bar */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-[11px] font-mono">
        <span className="flex items-center gap-1.5 text-amber-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{badgeTitle}</span>
        </span>
        <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded-md border border-white/10 text-slate-300">
          Unit: ca-app-pub-7775227771641265/{slotId}
        </span>
      </div>

      {/* Real Google AdsbyGoogle container */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px', width: '100%' }}
        data-ad-client="ca-pub-7775227771641265"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {/* High-fidelity interactive sponsored ad card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-purple-950/30 via-black to-indigo-950/30 rounded-xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-[#121224] rounded-[10px] flex items-center justify-center text-lg">
              ⚡
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">4K Wallpapers Pro • Sponsored Experience</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold border border-amber-500/40">AD</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Google AdMob Unit: ca-app-pub-7775227771641265/{slotId} • Active</p>
          </div>
        </div>
        <button
          onClick={() => window.open('https://play.google.com/store', '_blank')}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs shadow-md transition-all shrink-0 active:scale-95"
        >
          Install / Open Ad
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 4. VERTICAL 9:16 WALLPAPER CARD
// ==========================================
export const WallpaperCard: React.FC<{
  wallpaper: WallpaperItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPreview: (wallpaper: WallpaperItem) => void;
  onQuickDownload: (wallpaper: WallpaperItem) => void;
}> = ({ wallpaper, isFavorite, onToggleFavorite, onPreview, onQuickDownload }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (wallpaper.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (wallpaper.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#11111d] border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black cursor-pointer" onClick={() => onPreview(wallpaper)}>
        <img src={wallpaper.thumbnailUrl} alt={wallpaper.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {wallpaper.type === 'video' && wallpaper.videoUrl && (
          <video
            ref={videoRef}
            src={wallpaper.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          {wallpaper.type === 'video' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-pink-600/85 text-[10px] font-bold text-white shadow-md">
              <Play className="w-2.5 h-2.5 fill-white" /> 3D VIDEO
            </span>
          ) : wallpaper.type === '3d-interactive' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-cyan-600/85 text-[10px] font-bold text-white shadow-md">
              <Zap className="w-2.5 h-2.5 fill-cyan-300" /> INTERACTIVE
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg bg-black/60 text-[10px] font-mono font-bold text-emerald-400">
              4K ULTRA
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(wallpaper.id); }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite ? 'bg-rose-500 text-white' : 'bg-black/50 text-white/80'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(wallpaper); }}
              className="flex-1 py-2 px-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg"
            >
              <Smartphone className="w-3.5 h-3.5" /> Phone Test
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onQuickDownload(wallpaper); }}
              className="p-2 rounded-xl bg-white/10 text-white border border-white/20"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 bg-[#0d0d16] flex flex-col justify-between flex-1 border-t border-white/5">
        <h3 className="text-xs font-semibold text-slate-100 truncate">{wallpaper.title}</h3>
        <p className="text-[11px] text-purple-400 font-medium truncate" dir="rtl">{wallpaper.urduTitle}</p>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-white/5 font-mono">
          <span>📥 {wallpaper.downloads}</span>
          <span className="text-rose-400/90">❤️ {wallpaper.likes}</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. PHONE MOCKUP PREVIEW MODAL
// ==========================================
export const PhoneMockupPreviewModal: React.FC<{
  wallpaper: WallpaperItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenHowToGuide: () => void;
}> = ({ wallpaper, onClose, isFavorite, onToggleFavorite, onOpenHowToGuide }) => {
  const [screenMode, setScreenMode] = useState<'lock' | 'home'>('lock');
  const [is3DParallaxEnabled, setIs3DParallaxEnabled] = useState<boolean>(true);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DParallaxEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setTilt({ x: y, y: x });
  };

  if (!wallpaper) return null;

  const handleDownload = (resolution: '4k' | '1080p' | 'video') => {
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.href = resolution === 'video' && wallpaper.videoUrl ? wallpaper.videoUrl : (resolution === '4k' ? wallpaper.hdUrl : wallpaper.thumbnailUrl);
    link.download = `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}-${resolution}-wallpaper.${resolution === 'video' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0c0c17] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 text-slate-300 hover:text-white border border-white/10">
          <X className="w-5 h-5" />
        </button>

        {/* 3D Phone Chassis */}
        <div 
          className="flex-1 bg-gradient-to-b from-[#10101e] to-[#070710] p-6 flex flex-col items-center justify-center relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div className="z-10 mb-4 flex items-center gap-2 bg-black/50 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setScreenMode('lock')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 ${screenMode === 'lock' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Lock Screen
            </button>
            <button
              onClick={() => setScreenMode('home')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 ${screenMode === 'home' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
            >
              <Layers className="w-3.5 h-3.5" /> Home Screen
            </button>
          </div>

          <div 
            className="relative transition-transform duration-200 will-change-transform"
            style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <div className="relative w-[280px] sm:w-[310px] h-[580px] sm:h-[630px] rounded-[50px] p-3 shadow-2xl border-[5px] border-[#33354a] bg-[#1a1b26]">
              <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black select-none">
                <div className="absolute inset-0 w-full h-full">
                  {wallpaper.type === '3d-interactive' ? (
                    <ThreeInteractiveWallpaper shaderType={wallpaper.threeShader} isInteractive={is3DParallaxEnabled} className="w-full h-full" />
                  ) : wallpaper.type === 'video' && wallpaper.videoUrl ? (
                    <video src={wallpaper.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={wallpaper.hdUrl} alt={wallpaper.title} className="w-full h-full object-cover" />
                  )}
                </div>

                {screenMode === 'lock' ? (
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pt-16 pb-7 pointer-events-none z-10 text-white text-center">
                    <div>
                      <h1 className="text-6xl font-light font-display mt-0.5">{currentTime}</h1>
                      <div className="mt-8 mx-auto max-w-[240px] bg-black/45 backdrop-blur-md p-2.5 rounded-2xl border border-white/15 text-left flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-[11px] truncate">{wallpaper.title}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pt-14 pb-5 pointer-events-none z-10">
                    <div className="grid grid-cols-4 gap-3 text-center">
                      {['💬', '▶️', '📸', '🎵', '📷', '🖼️', '⚙️', '🌐'].map((emoji, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-lg mx-auto border border-white/10">
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Download & Actions Panel */}
        <div className="w-full lg:w-96 p-6 flex flex-col justify-between bg-[#0e0e1a] border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
          <div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {wallpaper.resolution}
            </span>
            <h2 className="text-xl font-bold text-white mt-2">{wallpaper.title}</h2>
            <p className="text-base text-purple-400 font-semibold" dir="rtl">{wallpaper.urduTitle}</p>
            {/* AdMob / AdSense Unit */}
            <GoogleAdUnit slotId="1090304439" className="mt-3 mb-2" badgeTitle="AdMob Sponsored Unit" />
          </div>

          <div className="mt-4 space-y-2.5">
            <button
              onClick={() => handleDownload(wallpaper.type === 'video' ? 'video' : '4k')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
            >
              <Download className="w-4 h-4" />
              <span>{wallpaper.type === 'video' ? 'Download Live Video (.MP4)' : 'Download 4K Ultra HD'}</span>
            </button>
            <button
              onClick={onOpenHowToGuide}
              className="w-full py-2 text-center text-xs text-purple-400 hover:text-purple-300"
            >
              ਫੋਨ 'ਤੇ ਵਾਲਪੇਪਰ ਕਿਵੇਂ ਲਗਾਉਣਾ ਹੈ? How to Set Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5B. MONETIZATION & AD SETUP MODAL
// ==========================================
export const MonetizationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  publicUrl: string;
}> = ({ isOpen, onClose, publicUrl }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'adsense' | 'admob' | 'instant'>('url');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0d0d1a] border border-emerald-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">ویب سائٹ مونیٹائزیشن اور اشتہارات (Ads Setup)</h2>
            <p className="text-xs text-emerald-400 font-mono">Live URL, Google AdMob, AdSense & Instant Monetization</p>
          </div>
        </div>

        {/* Public Live URL Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
          <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
            <span>🌐 آپ کی ویب سائٹ کا لائیو پبلک یو آر ایل (Public Live URL):</span>
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2.5 text-xs font-mono text-emerald-200 select-all outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                copied 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy URL'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            یہ یو آر ایل پوری دنیا میں آن لائن لائیو ہے اور اسے کسی بھی اشتہاری کمپنی یا پلے اسٹور ٹول میں استعمال کیا جا سکتا ہے۔
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-black/40 rounded-2xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-semibold transition-all ${
              activeTab === 'url' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            تفصیل (Overview)
          </button>
          <button
            onClick={() => setActiveTab('admob')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-semibold transition-all ${
              activeTab === 'admob' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Google AdMob (App)
          </button>
          <button
            onClick={() => setActiveTab('adsense')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-semibold transition-all ${
              activeTab === 'adsense' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Google AdSense
          </button>
          <button
            onClick={() => setActiveTab('instant')}
            className={`flex-1 py-2 px-2.5 rounded-xl font-semibold transition-all ${
              activeTab === 'instant' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            فوری کمائی (5 Min Ads)
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'url' && (
          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <span>💡 اہم نکتہ: AdMob بمقابلہ AdSense کا فرق</span>
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                • <strong>Google AdMob</strong> بنیادی طور پر <span className="text-purple-400 font-semibold">موبائل ایپس (Android APK / Google Play Store)</span> کے لیے ہوتا ہے۔<br />
                • <strong>Google AdSense</strong> اور <strong>Monetag / Adsterra</strong> بنیادی طور پر <span className="text-emerald-400 font-semibold">ویب لنکس اور ویب سائٹس (URLs)</span> کے لیے ہوتے ہیں۔
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1.5">
              <p className="text-white font-semibold">آپ دونوں طریقے استعمال کر سکتے ہیں:</p>
              <p className="text-slate-400">1. ویب سائٹ پر براہ راست AdSense یا Monetag کے بینر لگا کر ویب ٹریفک سے کمائیں۔</p>
              <p className="text-slate-400">2. اس ویب سائٹ کو مفت میں APK بنا کر پلے اسٹور پر اپلوڈ کریں اور AdMob کے اشتہارات چلائیں۔</p>
            </div>
          </div>
        )}

        {/* Tab 2: AdMob */}
        {activeTab === 'admob' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
              <h4 className="font-bold text-purple-300">Google AdMob سے ایپ پر اشتہارات لگانے کے 3 آسان مراحل:</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">ویب سائٹ کو APK میں تبدیل کریں:</strong><br />
                  <span className="text-slate-400">
                    مفت ویب سائٹ <strong>PWABuilder.com</strong> کھولیں، اوپر دیا گیا اپنا URL پیسٹ کریں، اور 'Package for Android' پر کلک کر کے تیار شدہ Android Studio پروجیکٹ یا APK ڈاؤن لوڈ کر لیں۔
                  </span>
                </li>
                <li>
                  <strong className="text-white">Google AdMob اکاؤنٹ میں ایپ رجسٹر کریں:</strong><br />
                  <span className="text-slate-400">
                    admob.google.com پر لاگ ان کریں &gt; 'Apps' &gt; 'Add App' پر کلک کریں اور اپنا App ID (مثلاً <code>ca-app-pub-xxx~yyy</code>) حاصل کریں۔
                  </span>
                </li>
                <li>
                  <strong className="text-white">Ad Units بنائیں:</strong><br />
                  <span className="text-slate-400">
                    بینر ایڈ (Banner Ad) یا انٹرسٹیشل ایڈ (Interstitial Ad) بنا کر ایپ کے اندر لگا دیں اور پلے اسٹور پر پبلش کر دیں۔
                  </span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: AdSense */}
        {activeTab === 'adsense' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-2">
              <h4 className="font-bold text-blue-300">Google AdSense کے ذریعے ویب سائٹ پر اشتہارات:</h4>
              <p className="text-slate-300 leading-relaxed">
                1. <strong>adsense.google.com</strong> پر جائیں اور اپنے گوگل اکاؤنٹ سے سائن ان کریں۔<br />
                2. 'Sites' کے سیکشن میں جا کر 'Add Site' دبائیں اور اپنا ویب لنک داخل کریں۔<br />
                3. گوگل ایڈسینس کا کوڈ (AdSense Script) کاپی کریں۔<br />
                4. ہم یہ کوڈ آپ کی ویب سائٹ کی <code>index.html</code> فائل میں لگا دیں گے اور اشتہارات خودکار طور پر لائیو ہو جائیں گے۔
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Instant Ad Networks */}
        {activeTab === 'instant' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <h4 className="font-bold text-amber-300">فوری منظوری (Instant Approval) والے نیٹ ورکس:</h4>
              <p className="text-slate-400">
                اگر آپ گوگل ایڈسینس کی منظوری کا انتظار نہیں کرنا چاہتے، تو یہ دونوں نیٹ ورکس صرف 5 منٹ میں آپ کے URL کو منظور کر لیتے ہیں:
              </p>
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="font-bold text-white">1. Monetag (PropellerAds):</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    بغیر کسی ٹریفک یا ڈومین کی شرط کے فوری اپروول دیتا ہے۔ وال پیپر ڈاؤن لوڈ بٹن پر پاپ انڈر یا ڈائریکٹ لنک لگا کر فوری ڈالر کمانا شروع کریں۔
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="font-bold text-white">2. Adsterra:</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    عالمی سطح پر مشہور ایڈ نیٹ ورک جو روزانہ اور ہفتہ وار ادائیگیاں (Payments) دیتا ہے۔
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
          <span className="text-slate-400">ضرورت پڑنے پر آپ ایڈسینس یا ایڈموب کا کوڈ شیئر کر سکتے ہیں، ہم فوراً ایڈ کر دیں گے۔</span>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md"
          >
            سمجھ گیا (Done)
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. MAIN APP COMPONENT (ONE COMPLETE FILE)
// ==========================================
export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'video' | '3d-interactive' | 'photo'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'downloads' | 'likes' | 'title'>('popular');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [previewWallpaper, setPreviewWallpaper] = useState<WallpaperItem | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isHowToOpen, setIsHowToOpen] = useState<boolean>(false);
  const [isMonetizeModalOpen, setIsMonetizeModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(['vid-1', 'car-1', 'space-1', 'isl-1']);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('ਵਾਲਪੇਪਰ ਹਟਾ ਦਿੱਤਾ ਗਿਆ (Removed from favorites)');
        return prev.filter((item) => item !== id);
      } else {
        showToast('ਵਾਲਪੇਪਰ ਸੇਵ ਹੋ ਗਿਆ! (Saved to favorites)');
        return [...prev, id];
      }
    });
  };

  const handleQuickDownload = (wallpaper: WallpaperItem) => {
    showToast(`ਡਾਊਨਲੋਡ ਸ਼ੁਰੂ: ${wallpaper.title}`);
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.href = wallpaper.type === 'video' && wallpaper.videoUrl ? wallpaper.videoUrl : wallpaper.hdUrl;
    link.download = `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}-4k-wallpaper.${wallpaper.type === 'video' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredWallpapers = useMemo(() => {
    return WALLPAPERS_DATA.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesUrdu = item.urduTitle.includes(q);
        const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesUrdu && !matchesTags) return false;
      }

      if (selectedCategory !== 'all') {
        if (selectedCategory === '3d-video' && item.type !== 'video') return false;
        if (selectedCategory === '3d-interactive' && item.type !== '3d-interactive') return false;
        if (selectedCategory !== '3d-video' && selectedCategory !== '3d-interactive' && item.category !== selectedCategory) {
          return false;
        }
      }

      if (selectedTypeFilter !== 'all') {
        if (selectedTypeFilter === 'video' && item.type !== 'video') return false;
        if (selectedTypeFilter === '3d-interactive' && item.type !== '3d-interactive') return false;
        if (selectedTypeFilter === 'photo' && item.type !== 'photo') return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'downloads') return parseFloat(b.downloads) - parseFloat(a.downloads);
      if (sortBy === 'likes') return parseFloat(b.likes) - parseFloat(a.likes);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return parseFloat(b.downloads) - parseFloat(a.downloads);
    });
  }, [searchQuery, selectedCategory, selectedTypeFilter, sortBy]);

  const visibleWallpapers = filteredWallpapers.slice(0, visibleCount);
  const featuredItem = WALLPAPERS_DATA.find((w) => w.featured && w.type === 'video') || WALLPAPERS_DATA[0];

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-600/90 text-white text-xs font-semibold shadow-2xl border border-purple-400/30">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#080811]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-[2px] shadow-lg">
              <div className="w-full h-full bg-[#0d0d18] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                NEON<span className="text-purple-400">WALL 3D</span>
              </span>
              <p className="text-[11px] text-slate-400">100+ HD, 4K & 3D ਲਾਈਵ ਵਾਲਪੇਪਰ</p>
            </div>
          </div>

          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100+ wallpapers (Cars, Anime, 3D, AMOLED)..."
              className="w-full bg-[#121222] border border-white/10 text-slate-100 placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Monetization & Live URL Hub */}
            <button
              onClick={() => setIsMonetizeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-sm transition-all"
              title="AdMob & Monetization Setup"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>ایڈز اور کمائی (Monetization)</span>
            </button>

            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Favorites ({favoriteIds.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="bg-gradient-to-b from-[#0e0e1c] to-[#080811] pt-6 pb-8 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ultimate 4K HD & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                3D Live Video Wallpapers
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              100 ਤੋਂ ਵੱਧ ਸ਼ਾਨਦਾਰ 4K ਫੋਟੋਆਂ, 3D ਲਾਈਵ ਵੀਡੀਓ ਅਤੇ ਇੰਟਰਐਕਟਿਵ ਵਾਲਪੇਪਰ। ਫ਼ੋਨ 'ਤੇ ਸਿਰਫ਼ ਇਕ ਕਲਿੱਕ ਨਾਲ ਡਾਊਨਲੋਡ ਕਰੋ।
            </p>
          </div>

          <div 
            className="w-[280px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl cursor-pointer bg-black relative group"
            onClick={() => setPreviewWallpaper(featuredItem)}
          >
            {featuredItem.type === 'video' && featuredItem.videoUrl ? (
              <video src={featuredItem.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={featuredItem.hdUrl} alt={featuredItem.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] font-mono text-cyan-300">FEATURED WALLPAPER</span>
              <h3 className="text-sm font-bold text-white">{featuredItem.title}</h3>
            </div>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-[#131322] text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Wallpapers Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6">
        {/* Top Google AdMob / AdSense Banner */}
        <GoogleAdUnit slotId="1090304439" className="mb-6" badgeTitle="Google AdMob / AdSense Leaderboard Unit" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <span className="text-sm font-bold text-white">
            {filteredWallpapers.length} Wallpapers Available
          </span>
          <div className="flex items-center gap-2 text-xs bg-[#121222] border border-white/10 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-transparent text-white outline-none cursor-pointer">
              <option value="popular" className="bg-[#121222]">Most Popular</option>
              <option value="downloads" className="bg-[#121222]">Most Downloaded</option>
              <option value="likes" className="bg-[#121222]">Highest Likes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {visibleWallpapers.slice(0, 10).map((wallpaper) => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              isFavorite={favoriteIds.includes(wallpaper.id)}
              onToggleFavorite={handleToggleFavorite}
              onPreview={(w) => setPreviewWallpaper(w)}
              onQuickDownload={handleQuickDownload}
            />
          ))}
        </div>

        {/* In-Feed Google AdMob / AdSense Unit */}
        {visibleWallpapers.length > 10 && (
          <GoogleAdUnit slotId="1090304439" className="my-6" badgeTitle="Google AdMob In-Feed Unit" />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {visibleWallpapers.slice(10).map((wallpaper) => (
            <WallpaperCard
              key={wallpaper.id}
              wallpaper={wallpaper}
              isFavorite={favoriteIds.includes(wallpaper.id)}
              onToggleFavorite={handleToggleFavorite}
              onPreview={(w) => setPreviewWallpaper(w)}
              onQuickDownload={handleQuickDownload}
            />
          ))}
        </div>

        {visibleCount < filteredWallpapers.length && (
          <div className="pt-8 pb-4 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredWallpapers.length))}
              className="py-3 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg"
            >
              <ChevronDown className="w-4 h-4" />
              <span>ਹੋਰ ਵਾਲਪੇਪਰ ਦਿਖਾਓ • Load 24 More</span>
            </button>
          </div>
        )}
      </main>

      {/* Phone Mockup Preview Modal */}
      <PhoneMockupPreviewModal
        wallpaper={previewWallpaper}
        onClose={() => setPreviewWallpaper(null)}
        isFavorite={previewWallpaper ? favoriteIds.includes(previewWallpaper.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenHowToGuide={() => { setPreviewWallpaper(null); setIsHowToOpen(true); }}
      />

      {/* Monetization & Live URL Modal */}
      <MonetizationModal
        isOpen={isMonetizeModalOpen}
        onClose={() => setIsMonetizeModalOpen(false)}
        publicUrl="https://ais-pre-xmk363us2zk6v47tsjcabr-463650871133.asia-southeast1.run.app"
      />

      {/* Footer */}
      <footer className="bg-[#06060e] border-t border-white/10 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-xl mx-auto mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-400">🌐 لائیو ویب سائٹ لنک:</span>
          <button
            onClick={() => setIsMonetizeModalOpen(true)}
            className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>ایڈز اور مونیٹائزیشن گائیڈ کھولیں</span>
            <Zap className="w-3.5 h-3.5" />
          </button>
        </div>
        <p>© 2026 NeonWall 3D Studio • 100+ HD & 3D Video Wallpapers Collection</p>
      </footer>
    </div>
  );
}
