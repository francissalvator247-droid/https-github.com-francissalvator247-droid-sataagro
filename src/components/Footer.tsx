import React, { useState } from 'react';
import { Sun, Moon, ArrowUp, Type } from 'lucide-react';
import { COMPANY_DETAILS, SATA_IMAGES } from '../data/sataContent';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  const { theme, toggleTheme, textSize, toggleTextSize } = useTheme();
  const [logoError, setLogoError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Brand & Summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <div className="h-12 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs flex items-center justify-center shrink-0">
                  <img
                    src={SATA_IMAGES.logo}
                    alt="SATA Agro & Allied Limited official logo"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                    className="h-full w-auto object-contain max-h-10"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                  SA
                </div>
              )}
              <span className="text-base font-bold text-neutral-900 dark:text-white">
                SATA Agro & Allied Limited
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              Agri-upstream enterprise specializing in grain sourcing, state-of-the-art rice processing, and commodity distribution across Nigeria and Africa since 2015.
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              Abuja Terminal: Say Plaza, 23 Ekukinam St, Utako
            </div>
          </div>

          {/* Value Chain Nav */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Commodities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#commodities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Parboiled Rice
                </a>
              </li>
              <li>
                <a href="#commodities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Cleaned Paddy Rice
                </a>
              </li>
              <li>
                <a href="#commodities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Industrial Maize
                </a>
              </li>
              <li>
                <a href="#commodities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Non-GMO Soybeans
                </a>
              </li>
              <li>
                <a href="#commodities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Malt Sorghum
                </a>
              </li>
              <li>
                <a href="#commodities" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Sesame Seeds
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Core Operations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#processing" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Optical Sortex Rice Milling
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Silo Storing & Warehousing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Commercial Bulk Distribution
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Cross-Border Commodity Export
                </a>
              </li>
              <li>
                <a href="#strategy" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  SATA 2030 Possibility 7
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct & Quick Action */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Commercial Desk
            </h4>
            <div className="text-xs space-y-1.5">
              <p>Email: <a href="mailto:contact@sataagro.com" className="hover:text-emerald-700 dark:hover:text-emerald-400 underline">contact@sataagro.com</a></p>
              <p>Phone: <a href="tel:+2348089532760" className="hover:text-emerald-700 dark:hover:text-emerald-400 font-mono">+234 808 953 2760</a></p>
              <p className="text-neutral-500">Mon–Fri: 8:00 AM – 5:00 PM WAT</p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenRfq}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-md transition-colors"
              >
                Request Commercial RFQ
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} SATA Agro & Allied Limited. All rights reserved.</span>
            <span>·</span>
            <span>Est. 2015 · Abuja, Nigeria</span>
            <span>·</span>
            <span className="font-semibold text-neutral-900 dark:text-white">Created by JCCTEC</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Typography accessibility scale */}
            <button
              onClick={toggleTextSize}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
              title="Toggle accessible larger typography"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{textSize === 'standard' ? 'Large Text' : 'Standard Text'}</span>
            </button>

            {/* Dark / Light toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </button>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dedicated Bottom Attribution Bar */}
        <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 text-center">
          <p className="text-xs font-semibold tracking-wide text-neutral-800 dark:text-neutral-200">
            Created by <span className="text-emerald-700 dark:text-emerald-400 font-bold">JCCTEC</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
