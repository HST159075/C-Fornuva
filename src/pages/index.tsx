import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones, 
  Star, Users, Package, Award, Phone, Mail, MapPin 
} from '@/components/ui/Icons';
import Link from 'next/link';

const features = [
  { icon: <Truck size={32} />, title: "Free Shipping", desc: "On all orders over $500" },
  { icon: <ShieldCheck size={32} />, title: "Secure Payment", desc: "100% secure payment processing" },
  { icon: <RefreshCw size={32} />, title: "Easy Returns", desc: "30-day return policy" },
  { icon: <Headphones size={32} />, title: "24/7 Support", desc: "Dedicated customer support" },
];

const stats = [
  { icon: <Users size={24} />, count: "15k+", label: "Happy Customers" },
  { icon: <Package size={24} />, count: "8k+", label: "Products Sold" },
  { icon: <Award size={24} />, count: "120+", label: "Design Awards" },
  { icon: <Star size={24} />, count: "4.9/5", label: "Average Rating" },
];

const testimonials = [
  { name: "Sarah Johnson", role: "Interior Designer", text: "The quality of craftsmanship at FurNova is unmatched. Every piece I've ordered for my clients has been stunning." },
  { name: "Michael Chen", role: "Homeowner", text: "Fast delivery and exceptional service. The sofa I bought fits perfectly in our living room." },
  { name: "Emma Wilson", role: "Architect", text: "Modern, sleek, and durable. FurNova's collection is exactly what I look for in premium furniture." },
];

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for sections
      const sections = gsap.utils.toArray('.reveal-section') as HTMLElement[];
      sections.forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Special animation for categories
      gsap.from('.category-card', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: '.categories-grid',
          start: 'top 80%',
        },
      });

      // Stats counter animation
      const statsItems = gsap.utils.toArray('.stat-item') as HTMLElement[];
      statsItems.forEach((item) => {
        gsap.from(item, {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      <div ref={containerRef}>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Features Section */}
        <section className="py-24 bg-[var(--background)] transition-colors reveal-section overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="premium-card group text-center"
                >
                  <div className="text-[var(--primary)] bg-[var(--primary)]/10 w-20 h-20 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500 shadow-lg mb-8 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Featured Categories */}
        <section className="py-20 bg-[var(--background)] transition-colors reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-4">
                <span className="text-[var(--primary)] font-black tracking-[0.3em] uppercase text-[10px]">Categories</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-100">Browse by <span className="text-gold italic">Category</span></h2>
              </div>
              <Link href="/categories" className="group text-[var(--primary)] font-bold flex items-center hover:translate-x-2 transition-transform">
                View All <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 categories-grid">
              {['Living Room', 'Bedroom', 'Office'].map((cat, idx) => (
                <div
                  key={cat}
                  className="category-card group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl"
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src={`https://images.unsplash.com/photo-${idx === 0 ? '1586023492125-27b2c045efd7' : idx === 1 ? '1505691938895-1758d7eaa511' : '1524758631624-e2822e304c36'}?auto=format&fit=crop&q=80&w=800`}
                    alt={cat}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute bottom-10 left-10 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">{cat}</h3>
                    <div className="flex items-center space-x-2 text-white/70 group-hover:text-white transition-colors">
                      <span className="text-sm font-bold uppercase tracking-widest">Explore Collection</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Statistics Section */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden reveal-section">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--primary)] rounded-full blur-[200px]"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="stat-item space-y-8 group"
                >
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center mx-auto text-[var(--primary)] border border-white/10 shadow-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {stat.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-6xl md:text-7xl font-black mb-2 tracking-tighter text-gold">{stat.count}</h3>
                    <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Special Offer / Highlight */}
        <section className="py-24 bg-[var(--background)] transition-colors reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-slate-900 dark:bg-[#0A0A0A] rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-3xl border border-white/10">
              <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)] rounded-full blur-[250px] -mr-96 -mt-96"></div>
              </div>
              <div className="lg:w-1/2 space-y-8 relative z-10 text-center lg:text-left">
                <span className="inline-block bg-[var(--primary)] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--primary)]/30">Limited Time Offer</span>
                <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white">Elevate Your <br/><span className="text-gold">Living Space</span></h2>
                <p className="text-slate-400 text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Discover our new Summer Collection and transform your space into a masterpiece of modern design.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                  <Link href="/shop" className="btn-primary !px-10 !py-5 text-lg shadow-2xl shadow-[var(--primary)]/40 flex items-center space-x-3 hover:-translate-y-1 transition-all">
                    <span>Shop Now</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 relative group">
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-all duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover aspect-video"
                    alt="Highlight"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="py-24 bg-[var(--background)] transition-colors overflow-hidden reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
              <span className="text-[var(--primary)] font-black tracking-[0.3em] uppercase text-xs">Customer Stories</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-100">Trusted by <span className="text-gold">Architects</span></h2>
              <div className="w-24 h-1 bg-[var(--primary)] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="premium-card relative"
                >
                  <div className="absolute top-12 right-12 text-8xl text-[var(--primary)]/10 font-serif font-black select-none pointer-events-none">“</div>
                  <div className="flex text-amber-500 space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed relative z-10 font-medium italic mb-10">&quot;{t.text}&quot;</p>
                  <div className="flex items-center space-x-5 pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="w-14 h-14 bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-[var(--primary)]/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-xs text-[var(--primary)] font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Newsletter Section */}
        <section className="py-20 bg-white dark:bg-gray-900 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-[var(--secondary)] rounded-[4rem] p-10 md:p-24 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/20 rounded-full blur-[150px] -mr-64 -mt-64"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Join the Inner Circle</h2>
                <p className="text-gray-400 text-xl leading-relaxed font-medium">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals. We promise not to spam.
                </p>
                <form className="flex flex-col md:flex-row gap-5 max-w-2xl mx-auto">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="flex-grow px-10 py-5 rounded-full bg-white/5 border-2 border-white/10 text-white focus:outline-none focus:border-[var(--primary)] transition-all text-lg font-bold"
                  />
                  <button className="btn-primary !py-5 !px-12 text-lg shadow-2xl shadow-[var(--primary)]/30 hover:scale-105 transition-transform">Join Now</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section className="py-32 bg-[var(--background)] dark:bg-gray-950 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-6">
                <span className="text-[var(--primary)] font-black tracking-[0.4em] uppercase text-xs">Knowledge Base</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Your Questions, Answered</h2>
              </div>
              <div className="space-y-6">
                {[
                  { q: "What is your delivery time?", a: "Standard delivery takes 3-7 business days depending on your location. We offer white-glove delivery for premium pieces." },
                  { q: "Do you offer international shipping?", a: "Currently, we ship within Bangladesh and selected international regions including USA, UK, and UAE." },
                  { q: "Can I customize the furniture colors?", a: "Yes, many of our pieces offer custom fabric and wood finish options. Contact our concierge team for bespoke requests." },
                  { q: "What is your return policy?", a: "We offer a 30-day easy return policy for all standard furniture items in original condition." }
                ].map((faq, idx) => (
                  <details key={idx} className="group bg-white dark:bg-gray-800 rounded-[2.5rem] border border-[var(--border)] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <summary className="flex items-center justify-between p-10 font-black text-lg cursor-pointer list-none select-none text-slate-900 dark:text-slate-100">
                      <span>{faq.q}</span>
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center group-open:rotate-180 transition-transform duration-500">
                        <ArrowRight size={20} className="rotate-90 text-[var(--primary)]" />
                      </div>
                    </summary>
                    <div className="px-10 pb-10 text-[var(--muted)] text-lg leading-relaxed border-t border-[var(--border)] pt-8">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. Blog Preview Section */}
        <section className="py-24 bg-[var(--background)] transition-colors reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <span className="text-[var(--primary)] font-black tracking-[0.3em] uppercase text-xs">The Journal</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-100">Design Insights</h2>
              </div>
              <Link href="/blog" className="group bg-[var(--primary)]/10 text-[var(--primary)] px-8 py-3 rounded-full font-black flex items-center hover:bg-[var(--primary)] hover:text-white transition-all">
                Read All Stories <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer space-y-8">
                  <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    <img 
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1616489953149-8d80e82977cc' : i === 2 ? '1586023492125-27b2c045efd7' : '1556228453-efd6c1ff04f6'}?auto=format&fit=crop&q=80&w=800`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 bg-slate-800"
                      alt=""
                    />
                    <div className="absolute top-8 left-8 px-6 py-2 bg-white/90 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg text-slate-900">Design Trends</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="space-y-4 px-2">
                    <div className="flex items-center space-x-3 text-xs text-[var(--muted)] font-bold uppercase tracking-widest">
                      <span>Oct 24, 2024</span>
                      <span className="w-1 h-1 bg-[var(--primary)] rounded-full"></span>
                      <span>5 Min Read</span>
                    </div>
                    <h3 className="text-2xl font-black group-hover:text-[var(--primary)] transition-colors leading-tight tracking-tighter text-slate-900 dark:text-slate-100">
                      {i === 1 ? '5 Minimalism Tips for a Modern Living Room' : i === 2 ? 'The Secret to Choosing the Perfect Sofa Color' : 'Why Sustainable Materials are the Future'}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section className="py-24 bg-white dark:bg-gray-900 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <span className="text-[var(--primary)] font-black tracking-[0.3em] uppercase text-xs">Contact Us</span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-100">Get in Touch</h2>
                  <p className="text-[var(--muted)] dark:text-white/70 text-lg md:text-xl max-w-lg leading-relaxed">
                    Have questions about our collection or need a custom design? Our team is here to help you.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-lg">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--muted)] dark:text-white/40 mb-1">Call Us</p>
                      <p className="text-xl font-black dark:text-white">01887238025</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--muted)] dark:text-white/40 mb-1">Email Us</p>
                      <p className="text-xl font-black dark:text-white">hsttasin90@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-lg">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--muted)] dark:text-white/40 mb-1">Visit Us</p>
                      <p className="text-xl font-black dark:text-white">Hathazari, Chattogram, Bangladesh</p>
                      <p className="text-sm font-bold text-[var(--muted)] dark:text-white/50">Postal Code: 4336</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[500px] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14742.6687426189!2d91.80236054999999!3d22.5166418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd174579d4947%3A0x6a165b4526d40866!2sHathazari!5e0!3m2!1sen!2sbd!4v1714888000000!5m2!1sen!2sbd" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/5 rounded-[4rem]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Final Call to Action */}
        <section className="py-24 bg-[var(--background)] dark:bg-gray-950 reveal-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-[var(--primary)] rounded-[3rem] md:rounded-[5rem] p-10 md:p-32 text-center space-y-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>
              <h2 className="text-4xl md:text-8xl font-black text-white relative z-10 tracking-tighter leading-[0.9]">Transform <br /> Your Home.</h2>
              <p className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto relative z-10 font-bold leading-relaxed">
                Join 15,000+ happy customers and start creating your dream living space today with FurNova.
              </p>
              <div className="flex justify-center relative z-10 pt-8">
                <Link href="/shop" className="bg-white text-[var(--secondary)] px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-lg md:text-xl hover:scale-110 hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all flex items-center space-x-4">
                  <span>Start Exploring</span>
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
