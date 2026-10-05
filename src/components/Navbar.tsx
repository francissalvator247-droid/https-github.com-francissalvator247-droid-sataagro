import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, TextQuote, Type } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SATA_IMAGES } from '../data/sataContent';

interface NavbarProps {
  onOpenRfq: (commodityId?: string) => void;
  onOpenCheckout?: (commodityId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq, onOpenCheckout }) => {
  const { theme, toggleTheme, textSize, toggleTextSize } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Commodities', href: '#commodities' },
    { name: 'Rice Processing', href: '#processing' },
    { name: 'Services', href: '#services' },
    { name: 'SATA 2030', href: '#strategy' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs'
          : 'bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200/50 dark:border-neutral-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark with official SATA logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-hidden"
            aria-label="SATA Agro & Allied Limited Home"
          >
            {!logoError ? (
              <div className="h-11 sm:h-12 w-auto px-2 py-1 rounded-lg bg-white/95 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs flex items-center justify-center shrink-0">
                <img
                  src={SATA_IMAGES.logo}
                  alt="SATA Agro & Allied Limited official logo"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="h-full w-auto object-contain max-h-9 sm:max-h-10"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-md bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
                SA
              </div>
            )}
            <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-neutral-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors whitespace-nowrap">
              SATA Agro & Allied
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors focus-visible:outline-hidden focus-visible:text-emerald-700 dark:focus-visible:text-emerald-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions + theme & typography controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Typography accessibility toggle */}
            <button
              onClick={toggleTextSize}
              className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors focus-visible:outline-hidden"
              title={textSize === 'standard' ? 'Switch to accessible larger typography' : 'Switch to standard typography'}
              aria-label={textSize === 'standard' ? 'Switch to accessible larger typography' : 'Switch to standard typography'}
            >
              <Type className={`w-4 h-4 ${textSize === 'accessible-large' ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
            </button>

            {/* Dark/Light theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors focus-visible:outline-hidden"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Primary Action Buttons */}
            {onOpenCheckout && (
              <button
                onClick={() => onOpenCheckout()}
                className="hidden lg:inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 rounded-lg hover:bg-emerald-200/80 dark:hover:bg-emerald-900/60 transition-colors whitespace-nowrap shadow-xs focus-visible:outline-hidden"
              >
                <span>WhatsApp Order</span>
              </button>
            )}

            <button
              onClick={() => onOpenRfq()}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 dark:bg-emerald-600 rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors whitespace-nowrap shadow-xs focus-visible:outline-hidden"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 focus-visible:outline-hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/98 dark:bg-neutral-950/98 px-4 pt-3 pb-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-200/60 dark:border-neutral-800/60">
            <div className="h-10 px-2 py-0.5 rounded-lg bg-white/95 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-center">
              <img
                src={SATA_IMAGES.logo}
                alt="SATA Agro & Allied Limited"
                referrerPolicy="no-referrer"
                className="h-full w-auto object-contain max-h-8"
              />
            </div>
            <span className="font-bold text-sm text-neutral-900 dark:text-white">
              SATA Agro & Allied
            </span>
          </div>

          <nav className="flex flex-col space-y-2 text-base font-medium text-neutral-800 dark:text-neutral-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2.5">
            {onOpenCheckout && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                <span>Checkout via WhatsApp</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-emerald-700 dark:bg-emerald-600 rounded-lg hover:bg-emerald-800"
            >
              <span>Request Commercial Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
