import React, { useState } from 'react';
import { Check, ShieldCheck, Flame, Eye, Layers, PackageCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SATA_IMAGES } from '../data/sataContent';

interface ProcessingSectionProps {
  onOpenRfq: () => void;
}

export const ProcessingSection: React.FC<ProcessingSectionProps> = ({ onOpenRfq }) => {
  const [imageError, setImageError] = useState(false);

  const processingSteps = [
    {
      step: '01',
      title: 'Cooperative Aggregation & Moisture Pre-screening',
      desc: 'Paddy grain from our farming networks in Kaduna, Benue, Nasarawa, and Niger state is screened on arrival for moisture, bulk density, and purity.',
    },
    {
      step: '02',
      title: 'Hydrothermal Parboiling & Controlled Drying',
      desc: 'Paddy is soaked and pressurized under steam to gelatinize starches, driving nutrients into the grain core before slow, low-stress cross-flow drying.',
    },
    {
      step: '03',
      title: 'Multi-stage De-stoning & De-husking',
      desc: 'Dual-deck vibrating gravity de-stoners remove gravel, mud balls, and metal residues with 99.8% physical separation efficiency.',
    },
    {
      step: '04',
      title: 'High-Definition Optical Sortexing',
      desc: 'High-speed CCD cameras and chromatic sensors inspect every single kernel at 12,000 grains per second, pneumatically ejecting discolored or chalky seeds.',
    },
    {
      step: '05',
      title: 'Double Polishing & Dust Extraction',
      desc: 'Rice is polished with mist cooling to produce brilliant, translucent whole grains with negligible surface friction and zero bran residue.',
    },
    {
      step: '06',
      title: 'Automated Weighed Packaging',
      desc: 'Precision volumetric bagging into tamper-evident 25kg and 50kg food-grade laminated polypropylene sacks, sealed for airtight commercial transport.',
    },
  ];

  return (
    <section id="processing" className="py-20 sm:py-24 bg-neutral-100/50 dark:bg-neutral-900/40 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              Flagship Industrial Capability
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
              Modern rice processing and precision optical sortexing.
            </h2>
            <p className="mt-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Rice milling is SATA Agro’s core industrial strength. We eliminate the chronic defects that historically affected local grain—specifically small stones, broken chalky fragments, and uneven cooking times—delivering consistent restaurant-grade parboiled and white rice.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                  99.8%
                </span>
                <span className="block text-xs font-semibold text-neutral-900 dark:text-white mt-1">
                  Stone-Free Purity
                </span>
                <span className="block text-[11px] text-neutral-500 mt-0.5">
                  Dual gravity de-stoning
                </span>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                  &lt; 5%
                </span>
                <span className="block text-xs font-semibold text-neutral-900 dark:text-white mt-1">
                  Broken Grain Limit
                </span>
                <span className="block text-[11px] text-neutral-500 mt-0.5">
                  High whole-grain recovery
                </span>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 col-span-2 sm:col-span-1">
                <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                  12.5%
                </span>
                <span className="block text-xs font-semibold text-neutral-900 dark:text-white mt-1">
                  Optimum Moisture
                </span>
                <span className="block text-[11px] text-neutral-500 mt-0.5">
                  Shelf-stable long storage
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md bg-neutral-900">
              {!imageError ? (
                <img
                  src={SATA_IMAGES.facility}
                  alt="SATA Agro industrial rice milling and sorting facility in Nigeria"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-80 object-cover object-center"
                />
              ) : (
                <div className="w-full h-80 bg-neutral-900 flex items-center justify-center text-neutral-400">
                  <span>SATA Agro Precision Rice Processing Plant</span>
                </div>
              )}
              <div className="p-6 bg-white dark:bg-neutral-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality Standard Certificate</span>
                </div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  Commercial & Hospitality Milling Contracts
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                  We supply custom contract milling, private-label branding, and wholesale institutional supplies for supermarkets, hotels, and corporate procurement schemes.
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                  <span className="text-xs text-neutral-500 font-mono">
                    Abuja Milling Terminal
                  </span>
                  <button
                    onClick={onOpenRfq}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Inquire Capacity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 6-Step Processing Flow */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              End-to-End Milling & Sorting Architecture
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Standard operating procedures safeguarding grain integrity from harvest reception to bagged delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processingSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                    Phase {s.step}
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
