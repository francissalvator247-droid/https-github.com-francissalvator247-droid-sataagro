/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CommoditiesSection } from './components/CommoditiesSection';
import { ProcessingSection } from './components/ProcessingSection';
import { ServicesSection } from './components/ServicesSection';
import { StrategySection } from './components/StrategySection';
import { LeadershipSection } from './components/LeadershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { PurchaseCheckoutModal } from './components/PurchaseCheckoutModal';
import { MessageSquare, Calculator } from 'lucide-react';

function MainApp() {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [selectedCommodityId, setSelectedCommodityId] = useState<string | undefined>(undefined);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedCheckoutCommodityId, setSelectedCheckoutCommodityId] = useState<string | undefined>(undefined);

  const handleOpenRfq = (commodityId?: string) => {
    setSelectedCommodityId(commodityId);
    setRfqOpen(true);
  };

  const handleCloseRfq = () => {
    setRfqOpen(false);
  };

  const handleOpenCheckout = (commodityId?: string) => {
    setSelectedCheckoutCommodityId(commodityId);
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-200 relative">
      <Navbar onOpenRfq={handleOpenRfq} onOpenCheckout={handleOpenCheckout} />

      <main className="flex-1">
        <Hero onOpenRfq={() => handleOpenRfq()} onOpenCheckout={handleOpenCheckout} />
        <AboutSection />
        <CommoditiesSection onOpenRfq={handleOpenRfq} onOpenCheckout={handleOpenCheckout} />
        <ProcessingSection onOpenRfq={() => handleOpenRfq('parboiled-rice')} />
        <ServicesSection onOpenRfq={() => handleOpenRfq()} />
        <StrategySection />
        <LeadershipSection />
        <ContactSection />
      </main>

      <Footer onOpenRfq={() => handleOpenRfq()} />

      {/* Floating Instant WhatsApp Order & Calculator Badge */}
      <aside aria-label="Quick WhatsApp procurement actions" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => handleOpenCheckout()}
          className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus-visible:outline-hidden"
          title="Instant calculation & WhatsApp Purchase Order"
          aria-label="Instant calculation and WhatsApp Purchase Order"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Calculator className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-bold tracking-wide">WhatsApp Order</span>
        </button>
      </aside>

      <RfqModal
        isOpen={rfqOpen}
        onClose={handleCloseRfq}
        preselectedCommodityId={selectedCommodityId}
      />

      <PurchaseCheckoutModal
        isOpen={checkoutOpen}
        onClose={handleCloseCheckout}
        selectedCommodityId={selectedCheckoutCommodityId}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
