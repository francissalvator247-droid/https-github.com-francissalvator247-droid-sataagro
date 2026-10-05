import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calculator, Send, AlertCircle, Package, Truck, Calendar } from 'lucide-react';
import { COMMODITIES, COMPANY_DETAILS } from '../data/sataContent';
import { Commodity } from '../types';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCommodityId?: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  preselectedCommodityId,
}) => {
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>(
    preselectedCommodityId || COMMODITIES[0].id
  );
  const [volumeTons, setVolumeTons] = useState<number>(30);
  const [packaging, setPackaging] = useState<string>('50kg Laminated PP Bags');
  const [deliveryType, setDeliveryType] = useState<string>('Local Delivery (Within Nigeria)');
  const [destinationCity, setDestinationCity] = useState<string>('Lagos');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [rfqRef, setRfqRef] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (preselectedCommodityId) {
      setSelectedCommodityId(preselectedCommodityId);
      const matched = COMMODITIES.find((c) => c.id === preselectedCommodityId);
      if (matched && matched.packagingTypes.length > 0) {
        setPackaging(matched.packagingTypes[0]);
      }
    }
  }, [preselectedCommodityId]);

  if (!isOpen) return null;

  const currentCommodity =
    COMMODITIES.find((c) => c.id === selectedCommodityId) || COMMODITIES[0];

  // Volume calculations
  const totalKg = volumeTons * 1000;
  const bags50kg = Math.round(totalKg / 50);
  const trailers30Ton = Math.ceil(volumeTons / 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields (Name, Organization, Email, and Phone).');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (volumeTons < 15) {
      setErrorMsg('Minimum commercial order quantity is 15 Metric Tons.');
      return;
    }

    const generatedRef = `SATA-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqRef(generatedRef);
    setIsSubmitted(true);
    setErrorMsg('');
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-modal-title"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Commercial Procurement Desk
            </div>
            <h2 id="rfq-modal-title" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-0.5">
              Request for Quotation (RFQ)
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Close RFQ dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              RFQ Successfully Logged
            </h3>
            <p className="text-sm font-mono font-semibold text-emerald-700 dark:text-emerald-400 mb-4">
              Reference: {rfqRef}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
              Thank you, {contactName}. Your commercial inquiry for <span className="font-semibold text-neutral-900 dark:text-white">{volumeTons} Metric Tons of {currentCommodity.name}</span> has been forwarded to our trade facilitation desk at Say Plaza, Abuja.
            </p>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-neutral-500">Destination:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{destinationCity} ({deliveryType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Calculated Packaging:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{bags50kg.toLocaleString()} bags (50kg equivalent)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Fleet Units:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{trailers30Ton} x 30-Ton Freight Truckload(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Follow-up Contact:</span>
                <span className="font-medium text-neutral-900 dark:text-white">{COMPANY_DETAILS.phone}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  Select Agro-Commodity *
                </label>
                <select
                  value={selectedCommodityId}
                  onChange={(e) => {
                    setSelectedCommodityId(e.target.value);
                    const found = COMMODITIES.find((c) => c.id === e.target.value);
                    if (found && found.packagingTypes.length > 0) {
                      setPackaging(found.packagingTypes[0]);
                    }
                  }}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  {COMMODITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Order Volume (Metric Tons) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="15"
                    step="5"
                    value={volumeTons}
                    onChange={(e) => setVolumeTons(Math.max(15, Number(e.target.value)))}
                    className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white font-mono tabular-nums focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                  <span className="text-xs font-mono font-medium text-neutral-500 whitespace-nowrap">
                    MT
                  </span>
                </div>
              </div>
            </div>

            {/* Live Volume Estimator Box */}
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Volume & Packaging Breakdown</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-neutral-700 dark:text-neutral-300">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">Gross Weight</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white tabular-nums text-sm">
                    {totalKg.toLocaleString()} kg
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">50kg Bag Equivalent</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white tabular-nums text-sm">
                    {bags50kg.toLocaleString()} bags
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">30-Ton Haulage Units</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white tabular-nums text-sm">
                    {trailers30Ton} Truckload(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Packaging and Delivery options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Packaging Preference
                </label>
                <select
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
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
                  Fulfillment Mode
                </label>
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Local Delivery (Within Nigeria)">Local Delivery (Nationwide Haulage)</option>
                  <option value="Ex-Warehouse (Say Plaza, Abuja)">Ex-Warehouse Pickup (Abuja)</option>
                  <option value="Export CIF/FOB (Apapa/Onne Port)">Export CIF / FOB (International Ports)</option>
                </select>
              </div>
            </div>

            {/* Destination & Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Destination City / State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagos, Abuja, Kano, Port Harcourt"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premier Flour Mills Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name / Procurement Title"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+234 800 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2.5 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Special Quality Specifications or Delivery Instructions
              </label>
              <textarea
                rows={2}
                placeholder="Specify preferred moisture threshold, delivery time window, or laboratory assay requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-xs text-neutral-500">
                Official response within 24 hours
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-lg flex items-center gap-1.5"
                >
                  <span>Submit Commercial RFQ</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[11px] text-center text-neutral-400 pt-2">
              Created by <span className="font-semibold text-neutral-600 dark:text-neutral-300">JCCTEC</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
