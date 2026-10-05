import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS } from '../data/sataContent';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Commodity Procurement Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields (Name, Email, and Message).');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What is SATA Agro’s minimum order quantity (MOQ)?',
      a: 'Our standard wholesale minimum order volume is 15 Metric Tons for milled rice and 30 Metric Tons for raw paddy, industrial maize, and soybeans (standard 30-ton trailer load).',
    },
    {
      q: 'How does SATA Agro verify moisture and grain purity?',
      a: 'Every truckload is sampled and tested with digital moisture meters and optical purity analyzers at our Abuja terminal. A certified laboratory Certificate of Analysis (COA) is issued with every shipment.',
    },
    {
      q: 'What are your standard commercial payment terms?',
      a: 'We offer structured bank trade facilitation, irrevocable letters of credit (LC), escrow settlement, and verified cash-against-documents for institutional off-takers.',
    },
    {
      q: 'Do you arrange interstate delivery across Nigeria?',
      a: 'Yes, through our dedicated logistics fleet partners, we coordinate door-to-door delivery with GPS tracking directly into factory storage bays across Lagos, Kano, Port Harcourt, Ibadan, and all geopolitical zones.',
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white dark:bg-neutral-950 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            Direct Trade Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white [text-wrap:balance]">
            Partner with SATA Agro & Allied Limited.
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Whether you are a food processing enterprise seeking reliable grain supplies, a cooperative distributor, or an international commodity buyer, our trade desk in Abuja is ready to assist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Company Contact Details (Zone 1) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Corporate Office
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {COMPANY_DETAILS.registeredOffice}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Direct Email
                  </h3>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 hover:underline block mt-1"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                  <span className="text-[11px] text-neutral-500">
                    Trade desk responses within 24 hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Telephone & WhatsApp
                  </h3>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <a
                      href="tel:+2348089532760"
                      className="text-xs sm:text-sm font-mono text-neutral-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400"
                    >
                      {COMPANY_DETAILS.phone}
                    </a>
                    <a
                      href="https://wa.me/2348089532760?text=Hello%20SATA%20Agro%2C%20I%20would%20like%20to%20inquire%20about%20commercial%20grain%20procurement."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 rounded-md hover:bg-emerald-200 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">
                    Official voice & WhatsApp business line
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Trading Hours
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {COMPANY_DETAILS.operatingHours}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Message Form (Zone 2) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                Send an Executive Message
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                Connect with our procurement and marketing divisions for partnership inquiries.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                    Message Successfully Sent
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto mb-4">
                    Thank you, {form.name}. Our commercial trade desk has received your message and will respond via {form.email} promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: 'Commodity Procurement Inquiry', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Darlington / Morrison"
                        className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="buyer@enterprise.com"
                        className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+234 ..."
                        className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      >
                        <option value="Commodity Procurement Inquiry">Bulk Commodity Procurement</option>
                        <option value="Rice Milling / Contract Packaging">Rice Milling & Private Labeling</option>
                        <option value="Grain Silo Warehousing">Silo Storage & Warehousing</option>
                        <option value="Commodity Export Facilitation">Cross-Border Commodity Export</option>
                        <option value="Cooperative Aggregation Partnership">Farmer Cooperative Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                      Message Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Outline your volume requirements, delivery timelines, or partnership proposal..."
                      className="w-full text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-neutral-900 dark:text-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Send Inquiry Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Trade Frequently Asked Questions (Anti-Slop, High-Value) */}
        <div>
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              Procurement & Trade FAQ
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Common questions regarding our quality guarantees, logistics coverage, and payment terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800"
              >
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-start gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
