import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calculator, Send, AlertCircle, Package, Truck, ArrowRight, MessageSquare, Copy, Check, ExternalLink } from 'lucide-react';
import { COMMODITIES, COMPANY_DETAILS } from '../data/sataContent';
import { Commodity } from '../types';

interface PurchaseCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCommodityId?: string;
}

export const PurchaseCheckoutModal: React.FC<PurchaseCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedCommodityId,
}) => {
  const [commodityId, setCommodityId] = useState<string>(selectedCommodityId || COMMODITIES[0].id);
  const [tonnage, setTonnage] = useState<number>(30);
  const [packaging, setPackaging] = useState<string>('50kg Laminated PP Bags');
  const [fulfillment, setFulfillment] = useState<string>('Local Delivery (Factory / Warehouse)');
  const [destination, setDestination] = useState<string>('Lagos');
  const [timeline, setTimeline] = useState<string>('Immediate Dispatch (48–72h)');
  const [buyerName, setBuyerName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [orderRef, setOrderRef] = useState<string>('');
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentCommodity: Commodity =
    COMMODITIES.find((c) => c.id === commodityId) || COMMODITIES[0];

  useEffect(() => {
    if (selectedCommodityId) {
      setCommodityId(selectedCommodityId);
      const matched = COMMODITIES.find((c) => c.id === selectedCommodityId);
      if (matched) {
        setTonnage(matched.minTonnage || 15);
        if (matched.packagingTypes.length > 0) {
          setPackaging(matched.packagingTypes[0]);
        }
      }
    }
  }, [selectedCommodityId]);

  if (!isOpen) return null;

  // Real-time calculations
  const totalKg = tonnage * 1000;
  const bagWeight = packaging.includes('25kg') ? 25 : packaging.includes('100kg') ? 100 : 50;
  const estimatedBags = Math.round(totalKg / bagWeight);
  const truckloads = Math.max(1, Math.ceil(tonnage / 30));
  const estimatedTotalNgn = tonnage * currentCommodity.pricePerTonNgn;
  const estimatedTotalUsd = tonnage * currentCommodity.pricePerTonUsd;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName.trim() || !companyName.trim() || !phone.trim() || !destination.trim()) {
      setErrorMsg('Please complete all required fields (Name, Enterprise, Phone, and Delivery Destination).');
      return;
    }

    if (tonnage < currentCommodity.minTonnage) {
      setErrorMsg(`Minimum commercial order for ${currentCommodity.name} is ${currentCommodity.minTonnage} Metric Tons.`);
      return;
    }

    const ref = `SATA-PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderRef(ref);

    const formattedNgn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(estimatedTotalNgn);
    const formattedUsd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(estimatedTotalUsd);

    const message = [
      `🌾 *NEW COMMERCIAL PURCHASE ORDER — SATA AGRO*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📋 *Order Ref:* ${ref}`,
      `🏢 *Company / Enterprise:* ${companyName.trim()}`,
      `👤 *Procurement Officer:* ${buyerName.trim()}`,
      `📱 *Phone / WhatsApp:* ${phone.trim()}`,
      email.trim() ? `✉️ *Email:* ${email.trim()}` : null,
      ``,
      `📦 *COMMODITY & VOLUME DETAILS:*`,
      `• *Commodity:* ${currentCommodity.name} (${currentCommodity.category})`,
      `• *Volume:* ${tonnage} Metric Tons (${totalKg.toLocaleString()} kg)`,
      `• *Packaging Units:* ~${estimatedBags.toLocaleString()} bags (${packaging})`,
      `• *Haulage Fleet:* ${truckloads} x 30-Ton Freight Truckload(s)`,
      `• *Indicative Rate:* ₦${currentCommodity.pricePerTonNgn.toLocaleString()} / MT ($${currentCommodity.pricePerTonUsd.toLocaleString()})`,
      `• *Estimated Total Value:* ${formattedNgn} (~${formattedUsd})`,
      ``,
      `🚚 *FULFILLMENT & DELIVERY:*`,
      `• *Delivery Mode:* ${fulfillment}`,
      `• *Destination:* ${destination.trim()}`,
      `• *Timeline:* ${timeline}`,
      notes.trim() ? `• *Special Requirements:* ${notes.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `✅ *Request:* Please verify warehouse stock, issue the official Proforma Invoice with bank settlement details, and dispatch Certificate of Analysis (COA).`,
    ]
      .filter(Boolean)
      .join('\n');

    const cleanPhone = '2348089532760';
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(waUrl);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsCompleted(true);
    setErrorMsg('');
  };

  const handleCopyOrder = () => {
    const textToCopy = `Order Reference: ${orderRef}\nCommodity: ${currentCommodity.name}\nQuantity: ${tonnage} MT\nEstimated Value: ₦${estimatedTotalNgn.toLocaleString()}\nDestination: ${destination}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClose = () => {
    setIsCompleted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Commercial Procurement & WhatsApp Checkout
              </div>
              <h2 id="checkout-modal-title" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-0.5">
                Calculate & Checkout Purchase
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              Purchase Order Dispatched
            </h3>
            <p className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              Reference: {orderRef}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
              Your calculated purchase order for <span className="font-semibold text-neutral-900 dark:text-white">{tonnage} MT of {currentCommodity.name}</span> has been transferred to our SATA WhatsApp Commercial Desk (+234 808 953 2760).
            </p>

            {/* Calculations Card */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-left text-xs space-y-2.5 mb-6 max-w-lg mx-auto">
              <div className="flex justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-500">Order Reference:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">{orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Commodity:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{currentCommodity.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Calculated Volume:</span>
                <span className="font-mono font-medium text-neutral-900 dark:text-white tabular-nums">
                  {tonnage} MT ({totalKg.toLocaleString()} kg · ~{estimatedBags.toLocaleString()} bags)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Logistics Allocation:</span>
                <span className="font-mono font-medium text-neutral-900 dark:text-white">
                  {truckloads} x 30-Ton Freight Trailer(s)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Destination:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{destination} ({fulfillment})</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-700 dark:text-neutral-300 font-bold">Estimated Order Value:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm tabular-nums">
                  ₦{estimatedTotalNgn.toLocaleString()} (~${estimatedTotalUsd.toLocaleString()})
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleCopyOrder}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Order Summary'}</span>
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400">
              Created by <span className="font-semibold text-neutral-700 dark:text-neutral-300">JCCTEC</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Commodity & Volume Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Grain Commodity *
                </label>
                <select
                  value={commodityId}
                  onChange={(e) => {
                    setCommodityId(e.target.value);
                    const found = COMMODITIES.find((c) => c.id === e.target.value);
                    if (found) {
                      setTonnage(found.minTonnage);
                      if (found.packagingTypes.length > 0) {
                        setPackaging(found.packagingTypes[0]);
                      }
                    }
                  }}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  {COMMODITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — ₦{(c.pricePerTonNgn / 1000).toLocaleString()}k/MT
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Order Volume (Metric Tons) *
                  </label>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Min: {currentCommodity.minTonnage} MT
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={currentCommodity.minTonnage}
                    step="5"
                    value={tonnage}
                    onChange={(e) => setTonnage(Math.max(currentCommodity.minTonnage, Number(e.target.value)))}
                    className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white font-mono tabular-nums focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                  <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                    MT
                  </span>
                </div>
              </div>
            </div>

            {/* Live Pricing & Calculation Summary Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-neutral-50 dark:from-emerald-950/40 dark:to-neutral-900/60 border border-emerald-300/60 dark:border-emerald-800/60 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200/60 dark:border-emerald-800/40">
                <span className="font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Real-Time Purchase Calculation</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  Rate: ₦{currentCommodity.pricePerTonNgn.toLocaleString()} / MT
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-neutral-700 dark:text-neutral-300">
                <div>
                  <span className="text-neutral-500 block text-[11px]">Net Weight</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white tabular-nums text-sm">
                    {totalKg.toLocaleString()} kg
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Packaging Units</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white tabular-nums text-sm">
                    ~{estimatedBags.toLocaleString()} bags
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">30-Ton Trailers</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white tabular-nums text-sm">
                    {truckloads} Truckload(s)
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Estimated Value</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums text-sm">
                    ₦{estimatedTotalNgn.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Packaging and Fulfillment Modes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Packaging Specification
                </label>
                <select
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  {currentCommodity.packagingTypes.map((p, idx) => (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  ))}
                  <option value="Custom Private Label Sacks">Custom Private Label Packaging</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Delivery Logistics
                </label>
                <select
                  value={fulfillment}
                  onChange={(e) => setFulfillment(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Local Delivery (Nationwide Haulage)">Local Delivery (Nationwide Fleet Haulage)</option>
                  <option value="Ex-Warehouse Pickup (Say Plaza, Abuja)">Ex-Warehouse Pickup (Utako, Abuja)</option>
                  <option value="Export Port CIF/FOB (Apapa/Onne Port)">Export CIF / FOB (Apapa or Onne Port)</option>
                </select>
              </div>
            </div>

            {/* Destination & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Delivery Destination / State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagos, Abuja, Kano, Port Harcourt"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Target Fulfillment Window
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Immediate Dispatch (48–72h)">Immediate Dispatch (48–72 Hours)</option>
                  <option value="Within 7 Business Days">Within 7 Business Days</option>
                  <option value="Bi-Weekly Recurring Supply">Bi-Weekly Recurring Contract</option>
                  <option value="Monthly Long-Term Allocation">Monthly Guaranteed Allocation</option>
                </select>
              </div>
            </div>

            {/* Buyer Contact Information */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Procurement Lead / Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Business / Enterprise Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Corporate Email
                </label>
                <input
                  type="email"
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Special Delivery Notes / Laboratory Assay Requests
              </label>
              <textarea
                rows={2}
                placeholder="Mention specific moisture requirement, aflatoxin certificate, or discharge bay hours..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Sends directly to SATA Commercial WhatsApp (+234 808 953 2760)</span>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[11px] text-center text-neutral-400 pt-1">
              Created by <span className="font-semibold text-neutral-700 dark:text-neutral-300">JCCTEC</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
