import React from 'react';
import { STRATEGIC_GOALS_2030 } from '../data/sataContent';
import { TrendingUp, Users, Leaf, Globe2, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const StrategySection: React.FC = () => {
  return (
    <section id="strategy" className="py-20 sm:py-24 bg-neutral-100/60 dark:bg-neutral-900/50 border-b border-neutral-200/80 dark:border-neutral-800/80">
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
            Strategic Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
            SATA 2030: "Possibility 7" Strategic Milestones.
          </h2>
          <p className="mt-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Our multi-year agenda is anchored on seven transformation milestones designed to modernize commodity aggregation, elevate smallholder prosperity, eliminate post-harvest waste, and expand regional agricultural trade.
          </p>
        </motion.div>

        {/* The 7 Goals Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRATEGIC_GOALS_2030.map((goal, index) => {
            const isMarquee = index === 0;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`p-6 sm:p-8 rounded-2xl border transition-all flex flex-col justify-between ${
                  isMarquee
                    ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-emerald-900 via-emerald-950 to-neutral-950 text-white border-emerald-800 shadow-md'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isMarquee
                          ? 'bg-emerald-700/80 text-emerald-100'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      Milestone {goal.milestone}
                    </span>
                    <span
                      className={`text-sm font-bold font-mono tabular-nums ${
                        isMarquee ? 'text-emerald-400' : 'text-emerald-700 dark:text-emerald-400'
                      }`}
                    >
                      {goal.targetMetric}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isMarquee ? 'text-white' : 'text-neutral-900 dark:text-white'
                    }`}
                  >
                    {goal.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed ${
                      isMarquee ? 'text-emerald-100/90' : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {goal.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t text-xs font-medium flex items-center justify-between ${
                    isMarquee
                      ? 'border-emerald-800/80 text-emerald-300'
                      : 'border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  <span>Possibility 7 Architecture</span>
                  <span>Horizon 2030</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
