import React, { useState } from 'react';
import { ArrowRight, Check, ChevronRight, Warehouse, Truck, RefreshCw, BarChart3, Globe, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, SATA_IMAGES } from '../data/sataContent';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenRfq: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenRfq }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [imageError, setImageError] = useState(false);

  return (
    <section id="services" className="py-20 sm:py-24 bg-white dark:bg-neutral-950 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            Integrated Value Chain Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
            Full-spectrum agricultural commodity services.
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            From rural farmgate aggregation to containerized international export, SATA Agro provides coordinated infrastructure, trade security, and operational execution for agribusiness stakeholders.
          </p>
        </motion.div>

        {/* Warehousing and Logistics Visual Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[360px]">
              {!imageError ? (
                <img
                  src={SATA_IMAGES.logistics}
                  alt="Modern grain silo storage complex and commercial logistics fleet"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8 text-neutral-400">
                  <span>SATA Agro Silos & Logistics Hub</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent hidden lg:block" />
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-neutral-900/95 lg:bg-neutral-900">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Logistics & Silo Infrastructure
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3">
                  Securing 35,000+ Metric Tons from Field to Factory
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  Our strategic warehouse terminal in Abuja and regional aggregation depots combine modern aeration, moisture checks, and reliable long-haul fleet partners to eliminate supply interruptions for industrial buyers.
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Climate-controlled aerated grain silos with zero moisture ingress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>GPS-monitored 30-ton haulage trucks with transit cargo insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dispatches directly into manufacturer bays across Nigeria</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  Near-Zero Post-Harvest Loss (&lt;0.5%)
                </span>
                <button
                  onClick={onOpenRfq}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Book Freight or Silo Space</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Master-Detail Service Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services List (Zone A) */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 px-2">
              Select Service Offering
            </h3>
            {SERVICES.map((s) => {
              const isActive = selectedService.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-600/60 dark:border-emerald-500/60 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {s.number}
                    </span>
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive
                            ? 'text-emerald-900 dark:text-emerald-300'
                            : 'text-neutral-900 dark:text-neutral-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                        }`}
                      >
                        {s.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                        {s.shortDescription}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform shrink-0 ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 translate-x-1'
                        : 'text-neutral-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Service Detailed Overview (Zone B) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-xs sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Service Specification {selectedService.number}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                SATA Agro & Allied Standard
              </span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              {selectedService.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            {/* Core Capabilities */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Key Operational Deliverables
              </h4>
              <ul className="space-y-2.5">
                {selectedService.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Metric highlight */}
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/70 dark:border-neutral-700/70 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                  Service Benchmark
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {selectedService.metrics}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Custom commercial arrangements available
              </span>
              <button
                onClick={onOpenRfq}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Inquire About This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
