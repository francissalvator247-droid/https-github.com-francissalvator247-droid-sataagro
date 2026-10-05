import React, { useState } from 'react';
import { LEADERSHIP } from '../data/sataContent';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const LeadershipSection: React.FC = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setFailedImages((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <section id="leadership" className="py-20 sm:py-24 bg-white dark:bg-neutral-950 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            Executive Leadership Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
            Led by experienced agribusiness and supply chain practitioners.
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Our management team unites decades of combined expertise in commodity trading, mechanical milling, rural aggregation logistics, and structured financial contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader, idx) => {
            const hasFailed = failedImages[leader.name];
            return (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Admin Photo extracted from sataagro.com matching reference site */}
                  <div className="w-full h-72 sm:h-80 relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    {leader.image && !hasFailed ? (
                      <img
                        src={leader.image}
                        alt={`${leader.name} - ${leader.role} at SATA Agro & Allied Limited`}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(leader.name)}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-800 dark:bg-emerald-700 text-white flex items-center justify-center font-bold text-4xl shadow-inner">
                        {leader.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="inline-block px-2.5 py-1 rounded bg-neutral-950/80 text-emerald-400 text-xs font-semibold backdrop-blur-xs">
                        {leader.role}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {leader.name}
                    </h3>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 mb-4">
                      {leader.division}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Core Competencies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {leader.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

