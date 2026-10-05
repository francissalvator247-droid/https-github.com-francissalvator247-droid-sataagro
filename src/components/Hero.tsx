import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, ShoppingCart, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS, PROOF_METRICS, SATA_IMAGES, HERO_SLIDES } from '../data/sataContent';

interface HeroProps {
  onOpenRfq: () => void;
  onOpenCheckout: (commodityId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfq, onOpenCheckout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 text-white min-h-[620px] sm:min-h-[700px] flex flex-col justify-center"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-roledescription="carousel"
      aria-label="SATA Agro Agricultural Slideshow"
    >
      {/* Background Slideshow with Smooth Crossfade and Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.headline}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered measured contrast scrims for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/85 to-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-24 w-full">
        <div className="max-w-3xl">
          {/* Animated Brand Kicker Badge */}
          <motion.div
            key={`kicker-${currentSlide}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-5 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md"
          >
            <div className="h-6 w-auto bg-white/95 rounded px-1.5 py-0.5 flex items-center justify-center">
              <img
                src={SATA_IMAGES.logo}
                alt="SATA Logo"
                referrerPolicy="no-referrer"
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {activeSlide.kicker}
            </span>
          </motion.div>

          {/* Main Headline with balanced wrapping */}
          <motion.h1
            key={`headline-${currentSlide}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]"
          >
            {activeSlide.headline}
          </motion.h1>

          {/* Value Proposition Description */}
          <motion.p
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl"
          >
            {activeSlide.subtitle}
          </motion.p>

          {/* Primary Action Zone - WhatsApp Checkout & RFQ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => onOpenCheckout()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all focus-visible:outline-hidden"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Checkout via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenRfq}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors focus-visible:outline-hidden"
            >
              <span>Request Commercial Quote</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>99.8% Stone-Free Milled Rice</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Calculations Sent to WhatsApp (+234 808 953 2760)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified Weighbridge & Moisture COA</span>
            </div>
          </div>
        </div>

        {/* Slideshow Navigation Controls & Dots */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-neutral-800/80">
          {/* Slide Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? 'w-8 h-2 bg-emerald-500'
                    : 'w-2 h-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Play / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Previous slide"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Next slide"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Proof Metrics Strip - Tabular Numerals and Clean Typography */}
        <div className="mt-8 pt-6 border-t border-neutral-800/50 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {PROOF_METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-mono tabular-nums">
                {metric.value}
              </span>
              <span className="text-sm font-semibold text-neutral-200 mt-1">
                {metric.label}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5 leading-snug">
                {metric.note}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
