import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from '@/components/ui/Icons';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <Layout title="Contact Us | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold">We&apos;d Love to Help</h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto text-lg">
              Have a question or need design advice? Our team is always here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 md:p-16 rounded-[3rem] border border-[var(--border)] shadow-xl space-y-10 text-slate-600"
            >
              <h2 className="text-3xl font-black text-slate-900">Send a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">Your Name</label>
                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">Email Address</label>
                    <input required type="email" className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)] transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--muted)]">Subject</label>
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 text-slate-900 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--muted)]">Message</label>
                  <textarea required rows={5} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)] transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full !py-5 flex items-center justify-center space-x-3 text-lg">
                  <span>Send Message</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>

            {/* Contact Details & Map */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Studio</h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Hathazari, Chattogram <br />
                      Bangladesh (4336)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Main: 01887238025 <br />
                      Support: +8801887238025
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      hsttasin90@gmail.com <br />
                      support@furnova.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Simulation */}
              <div className="h-80 rounded-[3rem] overflow-hidden border border-[var(--border)] shadow-lg relative group">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="Location"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white px-8 py-4 rounded-full font-black shadow-2xl text-slate-900 hover:scale-105 transition-transform cursor-pointer">Find Us Here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
