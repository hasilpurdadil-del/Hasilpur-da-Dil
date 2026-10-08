export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: 'sano-oil' | 'miniature' | 'flixbus' | 'asmr';
  categoryLabel: string;
  duration: string;
  views: string;
  likes: string;
  uploadDate: string;
  thumbnail: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface ShortItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  views: string;
  likes: string;
  thumbnail: string;
  duration: string;
}

export const CHANNEL_INFO = {
  name: "Ai Video Studio",
  handle: "@Aivideo5677",
  youtubeUrl: "https://www.youtube.com/@Aivideo5677",
  subscribeUrl: "https://www.youtube.com/@Aivideo5677?sub_confirmation=1",
  shortsUrl: "https://www.youtube.com/@Aivideo5677/shorts",
  email: "hasilpurdadil@gmail.com",
  instagramUrl: "https://www.instagram.com/",
  tiktokUrl: "https://www.tiktok.com/@aivideo5677",
  tagline: "Miniature World, Sano Oil & Satisfying ASMR Creations",
  heroHeading: "Welcome to AI VIDEO STUDIO",
  heroSubheading: "Miniature World, Sano Oil & Satisfying ASMR Creations",
  aboutSummary: "We create viral AI miniature diorama videos, Sano Oil petrol pump stories, satisfying clay building, FlixBus journeys. 100% original AI content.",
  copyright: "Copyright 2026 Ai Video Studio | All videos from https://www.youtube.com/@Aivideo5677",
  stats: [
    { label: "Community Subscribers", value: "350K+", change: "+14.2K this month" },
    { label: "Total Channel Views", value: "28.5M+", change: "Viral Trending" },
    { label: "Original AI Productions", value: "190+", change: "Weekly 4K Uploads" },
    { label: "CGI & AI Fidelity", value: "4K 60FPS", change: "Spatial ASMR Audio" }
  ]
};

export const CHANNEL_PILLARS = [
  {
    id: "sano-oil",
    title: "Sano Oil Petrol Pump Stories",
    icon: "Fuel",
    tag: "Viral Universe",
    color: "from-amber-500/20 via-purple-600/20 to-blue-600/20",
    borderColor: "hover:border-amber-500/50",
    gradientText: "from-amber-400 to-purple-400",
    description: "Immerse yourself in the nostalgic yet futuristic Sano Oil universe. Rainy midnight gas station dioramas, illuminated neon pumps, vintage oil tankers, and cozy roadside stories rendered with hyper-realistic cinematic lighting.",
    highlights: ["Atmospheric Rain & Neon Reflections", "Classic Sano Oil Dioramas", "Miniature Tankers & Pump Mechanics", "Cozy Lo-Fi Midnight Vibes"],
    image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "miniature",
    title: "Miniature World Dioramas",
    icon: "Boxes",
    tag: "Microscopic Art",
    color: "from-cyan-500/20 via-blue-600/20 to-purple-600/20",
    borderColor: "hover:border-cyan-500/50",
    gradientText: "from-cyan-400 to-blue-400",
    description: "Intricate tilt-shift miniature universes where microscopic architectural wonders come alive. From tiny Japanese cobblestone streets to micro cyber cities, every scene feels physically handcrafted and touchable.",
    highlights: ["Shallow Depth of Field Tilt-Shift", "Intricate Architectural Textures", "Pocket-Sized Living Ecosystems", "Micro Lighting & Tiny Crowds"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "flixbus",
    title: "FlixBus Epic Journeys",
    icon: "Bus",
    tag: "Cinematic Road",
    color: "from-emerald-500/20 via-teal-600/20 to-blue-600/20",
    borderColor: "hover:border-emerald-500/50",
    gradientText: "from-emerald-400 to-cyan-400",
    description: "Hop aboard the iconic green FlixBus miniature coaches embarking on thrilling cross-country adventures. Winding through snow-covered alpine switchbacks, neon-drenched night expressways, and sunset coastal highways.",
    highlights: ["Iconic Green Coach Fleet", "Alpine Snowy Switchback Roads", "Interior Passenger Cabin Details", "Dynamic Weather & Sunset Horizons"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "asmr",
    title: "Satisfying Clay & ASMR Sculpting",
    icon: "Sparkles",
    tag: "Sensory ASMR",
    color: "from-purple-500/20 via-pink-600/20 to-indigo-600/20",
    borderColor: "hover:border-pink-500/50",
    gradientText: "from-pink-400 to-purple-400",
    description: "Deeply calming, tactile clay building and micro sculpting videos engineered for peak brain tingles. Experience microscopic brick laying, smooth clay smoothing, soft slicing, and crystal-clear audio Foley.",
    highlights: ["Hyper-Tactile Clay Modeling", "Spatial ASMR Audio Design", "Micro Brick Laying & Cementing", "Stress-Relief Oddly Satisfying"],
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
  }
];

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    youtubeId: "dQw4w9WgXcQ", // Fallback embed ID, channel link leads to @Aivideo5677
    title: "Sano Oil Station in Heavy Rain | Miniature Midnight ASMR Diorama",
    category: "sano-oil",
    categoryLabel: "Sano Oil Story",
    duration: "12:44",
    views: "1.4M",
    likes: "89K",
    uploadDate: "3 days ago",
    thumbnail: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=800&q=80",
    description: "Experience the calming ambiance of the vintage Sano Oil petrol pump on a rainy stormy night. Detailed miniature pumps, puddles reflecting neon violet signs, and soothing rain ASMR.",
    tags: ["Sano Oil", "Miniature Diorama", "Rain ASMR", "AI Video", "Cozy Night"],
    isFeatured: true
  },
  {
    id: "vid-2",
    youtubeId: "kJQP7kiw5Fk",
    title: "Miniature World: Building a Tiny Mountain Village with Clay & Resin",
    category: "miniature",
    categoryLabel: "Miniature World",
    duration: "15:20",
    views: "980K",
    likes: "64K",
    uploadDate: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    description: "Crafting an ultra-detailed miniature alpine village from scratch using AI simulated clay sculpting, flowing resin rivers, and microscopic timber cabins.",
    tags: ["Miniature Village", "Clay Craft", "ASMR Building", "AI Art"],
    isFeatured: true
  },
  {
    id: "vid-3",
    youtubeId: "fJ9rUzIMcZQ",
    title: "FlixBus Night Express Across the Snowy Alpine Pass | 4K Cinematic",
    category: "flixbus",
    categoryLabel: "FlixBus Journey",
    duration: "18:05",
    views: "2.1M",
    likes: "135K",
    uploadDate: "2 weeks ago",
    thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    description: "Follow the iconic green FlixBus through treacherous blizzard conditions on mountain hairpin bends. Hyper-realistic snow physics and cozy warm interior passenger windows.",
    tags: ["FlixBus", "Snow Drive", "Cinematic Journey", "Miniature Bus"],
    isFeatured: true
  },
  {
    id: "vid-4",
    youtubeId: "9bZkp7q19f0",
    title: "Satisfying Clay Brick Laying & Miniature House Construction ASMR",
    category: "asmr",
    categoryLabel: "Satisfying ASMR",
    duration: "11:12",
    views: "1.7M",
    likes: "112K",
    uploadDate: "3 weeks ago",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    description: "Extremely crisp ASMR audio as 1:50 scale miniature clay bricks are placed one by one with tiny trowels and authentic mortar mix.",
    tags: ["Clay Building", "Satisfying", "ASMR Sounds", "Tiny Bricks"]
  },
  {
    id: "vid-5",
    youtubeId: "3tmd-ClpJxA",
    title: "Sano Oil Tanker Delivery to Remote Desert Pump | AI Cinematic Story",
    category: "sano-oil",
    categoryLabel: "Sano Oil Story",
    duration: "14:38",
    views: "820K",
    likes: "58K",
    uploadDate: "1 month ago",
    thumbnail: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80",
    description: "A heavy chrome Sano Oil tanker rolls into the neon-lit dust bowl station at twilight. Cinematic lens flares, mechanical diesel hum, and retro cyberpunk aesthetics.",
    tags: ["Sano Oil", "Tanker Truck", "Cyberpunk Gas Station", "AI Story"]
  },
  {
    id: "vid-6",
    youtubeId: "kXYiU_JCYtU",
    title: "Miniature Tokyo Cyberpunk Alley: Ramen Shop & Rain Reflections",
    category: "miniature",
    categoryLabel: "Miniature World",
    duration: "16:45",
    views: "1.9M",
    likes: "148K",
    uploadDate: "1 month ago",
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    description: "Tiny paper lanterns, steaming miniature ramen bowls, and neon purple glow reflecting off soaked cobblestones in this intricate AI diorama.",
    tags: ["Tokyo Diorama", "Miniature City", "Cyberpunk", "Tilt Shift"]
  },
  {
    id: "vid-7",
    youtubeId: "L_LUpnjgPso",
    title: "FlixBus Sunset Coastal Voyage: Ocean Cliffs & Coastal Highway",
    category: "flixbus",
    categoryLabel: "FlixBus Journey",
    duration: "13:19",
    views: "640K",
    likes: "42K",
    uploadDate: "1 month ago",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Golden hour journey along dramatic ocean cliffs. Sea mist on the windshield and smooth highway sounds as the green coach cruises into the twilight.",
    tags: ["FlixBus", "Sunset Coast", "Relaxing Drive", "Miniature Coach"]
  },
  {
    id: "vid-8",
    youtubeId: "uelHwf8o7_U",
    title: "Smooth Clay Sculpting & Miniature Pottery Wheel | Mind Melting ASMR",
    category: "asmr",
    categoryLabel: "Satisfying ASMR",
    duration: "10:50",
    views: "1.1M",
    likes: "79K",
    uploadDate: "2 months ago",
    thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    description: "Watch a fingertip-sized pottery wheel shape ultra-fine clay vases with calming water droplets and silky-smooth textures.",
    tags: ["Clay ASMR", "Mini Pottery", "Oddly Satisfying", "Stress Relief"]
  }
];

export const VIRAL_SHORTS: ShortItem[] = [
  {
    id: "short-1",
    youtubeId: "dQw4w9WgXcQ",
    title: "Sano Oil neon sign flickering at 3 AM in the rain 🌧️⛽",
    category: "Sano Oil",
    views: "3.4M",
    likes: "290K",
    duration: "0:52",
    thumbnail: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=600&h=1000&q=80"
  },
  {
    id: "short-2",
    youtubeId: "kJQP7kiw5Fk",
    title: "Microscopic clay bricks fitting together seamlessly 🧱✨",
    category: "Satisfying Clay",
    views: "5.1M",
    likes: "480K",
    duration: "0:45",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&h=1000&q=80"
  },
  {
    id: "short-3",
    youtubeId: "fJ9rUzIMcZQ",
    title: "FlixBus drifting smoothly across icy mountain road ❄️🚌",
    category: "FlixBus",
    views: "2.8M",
    likes: "215K",
    duration: "0:58",
    thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&h=1000&q=80"
  },
  {
    id: "short-4",
    youtubeId: "9bZkp7q19f0",
    title: "Miniature Tokyo rain puddle reflection with tiny umbrella ☔",
    category: "Miniature World",
    views: "4.2M",
    likes: "370K",
    duration: "0:39",
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&h=1000&q=80"
  },
  {
    id: "short-5",
    youtubeId: "3tmd-ClpJxA",
    title: "Sano Oil retro gas pump trigger click sound test 🎧🔊",
    category: "Sano Oil ASMR",
    views: "1.9M",
    likes: "160K",
    duration: "0:30",
    thumbnail: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=600&h=1000&q=80"
  },
  {
    id: "short-6",
    youtubeId: "kXYiU_JCYtU",
    title: "Miniature resin lake pouring with tiny swimming fish 🐟💧",
    category: "ASMR Craft",
    views: "6.7M",
    likes: "610K",
    duration: "0:59",
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&h=1000&q=80"
  }
];

export const CREATOR_FAQS = [
  {
    question: "What software and AI tools power the videos on @Aivideo5677?",
    answer: "Our pipeline integrates cutting-edge generative video engines (Midjourney v6 for architectural styling, Runway Gen-3 Alpha & Luma Dream Machine for fluid motion synthesis, Sora-prompted cameras), followed by custom 3D neural depth maps and custom spatial audio Foley recorded for ASMR."
  },
  {
    question: "What is the story behind 'Sano Oil'?",
    answer: "Sano Oil is our signature world-building saga — an evocative retro-futuristic gasoline and service company set along rainy midnight highways. It has become a viral fan favorite for its moody ambiance, neon purple and amber aesthetics, and nostalgic solace."
  },
  {
    question: "Are all miniature diorama videos 100% original AI creations?",
    answer: "Yes! Every single diorama, vehicle, and clay simulation is 100% originally prompted, rendered, and post-processed by Ai Video Studio. No reuploads, pure creative craftsmanship."
  },
  {
    question: "How often do you upload new videos and Shorts on YouTube?",
    answer: "We publish 2 to 3 high-production 4K cinematic long-form videos every week, alongside daily viral YouTube Shorts featuring satisfying ASMR loops and miniature moments."
  },
  {
    question: "Can brands sponsor or collaborate on custom miniature AI videos?",
    answer: "Yes! We collaborate with brands seeking viral CGI miniature showcases, custom vehicle journeys, and commercial ASMR storytelling. Reach out via hasilpurdadil@gmail.com."
  }
];
