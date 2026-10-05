import React from 'react';
import { Target, Compass, Award, Users, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS, CORE_VALUES } from '../data/sataContent';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-neutral-100/60 dark:bg-neutral-900/50 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            Company Foundation · Established 2015
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
            Building resilient agro-commodity value chains from Nigeria to Africa.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Founded in 2015 and headquartered in Abuja, SATA Agro & Allied Limited operates as an agri-upstream enterprise. We bridge the gap between primary grain production and large-scale commercial consumption through dependable aggregation, technological processing, and transparent trade practices.
          </p>
        </motion.div>

        {/* Mission & Vision Bento Pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                Our Mission
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                {COMPANY_DETAILS.mission}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              Sustainable trade practices · Reliable household & commercial food solutions
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                Our Shared Vision
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                {COMPANY_DETAILS.vision}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              Transforming upstream agriculture · Food sovereignty & nutrition security
            </div>
          </motion.div>
        </div>

        {/* The 3C Core Values */}
        <div>
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              The 3C Operating Values
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Guiding our relationships with farmers, corporate buyers, logistics crews, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-sm">
                    {idx === 0 ? <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : idx === 1 ? <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                      {val.title}
                    </h4>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      {val.shortSummary}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
