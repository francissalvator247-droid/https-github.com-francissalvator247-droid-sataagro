import React, { useState, useRef } from 'react';
import { ArrowUpRight, Check, Info, MessageSquare, ChevronLeft, ChevronRight, Calculator, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { COMMODITIES, SATA_IMAGES } from '../data/sataContent';
import { Commodity } from '../types';

interface CommoditiesSectionProps {
  onOpenRfq: (commodityId?: string) => void;
  onOpenCheckout: (commodityId?: string) => void;
}

export const CommoditiesSection: React.FC<CommoditiesSectionProps> = ({ onOpenRfq, onOpenCheckout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCommodityModal, setActiveCommodityModal] = useState<Commodity | null>(null);
  const [imageError, setImageError] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Rice & Paddy', 'Feed & Coarse Grains', 'Oilseeds & Legumes'];

  const filteredCommodities = selectedCategory === 'All'
    ? COMMODITIES
    : COMMODITIES.filter((c) => c.category === selectedCategory);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="commodities" className="py-20 sm:py-24 bg-white dark:bg-neutral-950 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion Animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              Agricultural Commodities Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
              Standardized, laboratory-verified grain commodities.
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
              SATA Agro aggregates and processes premium grains with certified moisture thresholds, low aflatoxin levels, and high industrial yield. Select any commodity below to calculate pricing and send directly to our commercial WhatsApp desk.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800 self-start lg:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-hidden ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Visual Studio Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 grid grid-cols-1 lg:grid-cols-12 shadow-xs"
        >
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px]">
            {!imageError ? (
              <img
                src={SATA_IMAGES.commodities}
                alt="Agricultural grain commodities including parboiled rice, yellow maize, and soybeans"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-emerald-950 flex items-center justify-center p-8 text-neutral-300">
                <span>Grain Quality Inspection Center</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent lg:hidden" />
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                Quality Assurance & Testing
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                Zero Stones. Calibrated Moisture. Guaranteed Yield.
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                Every consignment is tested using calibrated digital moisture meters, density scales, and optical analysis. Certificate of Analysis (COA) and weighbridge tickets accompany each commercial dispatch.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Moisture control under 13% for mold and mycotoxin prevention</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Double optical sortexing eliminating foreign debris & chalky seeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Instant purchase calculations dispatched directly to WhatsApp</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                Min order: 15–30 MT
              </span>
              <button
                onClick={() => onOpenCheckout('parboiled-rice')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Calculate & Checkout on WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Commodities Showcase Header with Slider Controls (matching sataagro.com carousel) */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Grain Commodities Catalog
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Indicative market rates · Instant volume calculations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Scroll left"
              aria-label="Scroll commodities left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Scroll right"
              aria-label="Scroll commodities right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Commodity Cards Grid / Carousel */}
        <div
          ref={carouselRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 scroll-smooth"
        >
          {filteredCommodities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/90 dark:border-neutral-800/90 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Authentic Grain Photograph from sataagro.com */}
                {item.image && (
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-neutral-200 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-neutral-950/80 text-emerald-400 text-[11px] font-mono backdrop-blur-xs font-semibold">
                      ₦{(item.pricePerTonNgn / 1000).toLocaleString()}k / MT
                    </div>
                  </div>
                )}

                {/* Clean unboxed metadata with typographic separator */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                  <span className="italic">{item.scientificName}</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Spec Highlight */}
                <div className="mt-3 py-1.5 px-3 rounded-md bg-white dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                  {item.keySpec}
                </div>

                {/* Technical Specs list */}
                <div className="mt-3 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Benchmark Rate:</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                      ₦{item.pricePerTonNgn.toLocaleString()} / MT (${item.pricePerTonUsd})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Moisture Threshold:</span>
                    <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {item.moistureContent}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Minimum Order:</span>
                    <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {item.minimumOrder}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Checkout + Spec Sheet */}
              <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col gap-2">
                <button
                  onClick={() => onOpenCheckout(item.id)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Calculate & Buy on WhatsApp</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setActiveCommodityModal(item)}
                    className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>
                  <button
                    onClick={() => onOpenRfq(item.id)}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Request Proforma RFQ
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Commodity Full Spec Sheet Modal */}
      {activeCommodityModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-commodity-title"
        >
          <div className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {activeCommodityModal.category}
                </div>
                <h3 id="modal-commodity-title" className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                  {activeCommodityModal.name}
                </h3>
                <p className="text-xs text-neutral-500 italic mt-0.5">
                  {activeCommodityModal.scientificName} · Variety: {activeCommodityModal.variety}
                </p>
              </div>
              <button
                onClick={() => setActiveCommodityModal(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              {activeCommodityModal.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 mb-6 text-xs">
              <div>
                <span className="text-neutral-500 block mb-0.5">Benchmark Rate</span>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                  ₦{activeCommodityModal.pricePerTonNgn.toLocaleString()} / MT
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-0.5">Purity Standard</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
                  {activeCommodityModal.purityRate}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-0.5">Moisture Threshold</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
                  {activeCommodityModal.moistureContent}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-0.5">Minimum Order Volume</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
                  {activeCommodityModal.minimumOrder}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Available Packaging Options
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                {activeCommodityModal.packagingTypes.map((pkg, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    <span>{pkg}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setActiveCommodityModal(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = activeCommodityModal.id;
                  setActiveCommodityModal(null);
                  onOpenCheckout(id);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Calculate & Checkout on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
