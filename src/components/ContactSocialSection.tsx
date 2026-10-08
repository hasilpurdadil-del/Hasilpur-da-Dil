import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Youtube, Instagram, MessageSquare, ChevronDown, ChevronUp, Copy, Check, ExternalLink } from 'lucide-react';
import { CHANNEL_INFO, CREATOR_FAQS } from '../data/channelData';
import { soundFX } from '../utils/audio';

export const ContactSocialSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Brand Collaboration / Sponsorship',
    message: ''
  });

  const handleCopyEmail = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(CHANNEL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playChime(600, 'sine', 0.2);
    setFormSubmitted(true);
  };

  const socialLinks = [
    {
      name: "YouTube Channel",
      handle: "@Aivideo5677",
      url: CHANNEL_INFO.youtubeUrl,
      icon: <Youtube className="w-5 h-5 text-red-500 fill-red-500" />,
      tag: "350K+ Subscribers",
      color: "hover:border-red-500/50 hover:bg-red-950/20"
    },
    {
      name: "Instagram",
      handle: "@aivideostudio.official",
      url: CHANNEL_INFO.instagramUrl,
      icon: <Instagram className="w-5 h-5 text-pink-400" />,
      tag: "Daily Stills & Stories",
      color: "hover:border-pink-500/50 hover:bg-pink-950/20"
    },
    {
      name: "TikTok",
      handle: "@aivideo5677",
      url: CHANNEL_INFO.tiktokUrl,
      icon: (
        <svg className="w-5 h-5 text-cyan-400 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.7a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49v-7a8.21 8.21 0 0 0 4.91 1.63V6.89a4.86 4.86 0 0 1-1-.2z" />
        </svg>
      ),
      tag: "Viral Miniature Loops",
      color: "hover:border-cyan-500/50 hover:bg-cyan-950/20"
    },
    {
      name: "Direct Email",
      handle: CHANNEL_INFO.email,
      url: `mailto:${CHANNEL_INFO.email}`,
      icon: <Mail className="w-5 h-5 text-purple-400" />,
      tag: "Business & Inquiries",
      color: "hover:border-purple-500/50 hover:bg-purple-950/20"
    }
  ];

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a16] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Contact & Socials
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Got an idea for a Sano Oil expansion, brand placement, or bespoke miniature diorama? Connect with our creative director directly.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className={`p-5 rounded-2xl bg-[#0f0f22] border border-white/5 transition-all duration-300 flex flex-col justify-between group ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {item.name}
                </h4>
                <div className="text-xs font-mono text-slate-300 mt-1 break-all">
                  {item.handle}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-purple-400">
                {item.tag}
              </div>
            </a>
          ))}
        </div>

        {/* Two-Column Grid: Contact Form + FAQ Accordion */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0d0d1f] border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  We reply to all inquiries within 24–48 hours.
                </p>
              </div>

              {/* Quick Copy Email pill */}
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-purple-300 flex items-center gap-1.5"
                title="Copy email to clipboard"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center animate-in fade-in">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-bold text-base text-white">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Thank you for reaching out. We will get back to you at <span className="text-cyan-300 font-mono">{formData.email}</span> shortly.
                </p>
                <p className="text-[11px] text-slate-400 mt-2 font-mono">
                  Direct contact: {CHANNEL_INFO.email}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080814] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Brand Collaboration / Sponsorship">Brand Collaboration / Sponsorship</option>
                    <option value="Custom Miniature Diorama Request">Custom Miniature Diorama Request</option>
                    <option value="Sano Oil Licensing & Art">Sano Oil Licensing & Art</option>
                    <option value="FlixBus Journey Feature">FlixBus Journey Feature</option>
                    <option value="Press / Media Interview">Press / Media Interview</option>
                    <option value="General Question / Fan Note">General Question / Fan Note</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project, idea, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Ai Video Studio</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion Side */}
          <div className="lg:col-span-6 space-y-3">
            <div className="mb-4">
              <h3 className="font-heading font-bold text-xl text-white">
                Channel & Production FAQ
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Frequently asked questions regarding our AI synthesis, models, and community.
              </p>
            </div>

            {CREATOR_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#0e0e20] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      setOpenFaqIndex(isOpen ? null : index);
                    }}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
