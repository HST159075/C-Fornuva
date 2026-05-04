import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones, 
  Star, Users, Package, Award, Play 
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
  { name: "Michael Chen", role: "Homeowner", text: "Fast delivery and exceptional service. The sofa I bought fits perfectly in my living room." },
  { name: "Emma Wilson", role: "Architect", text: "Modern, sleek, and durable. FurNova's collection is exactly what I look for in premium furniture." },
];

const HomePage = () => {
  return (
    <Layout>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="flex items-center space-x-4 p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] dark:bg-gray-800"
              >
                <div className="text-[var(--primary)] bg-[var(--primary)]/10 p-3 rounded-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{feature.title}</h3>
                  <p className="text-xs text-[var(--muted)]">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="py-20 bg-[var(--background)] dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-4">
              <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Categories</span>
              <h2 className="text-3xl md:text-4xl font-bold">Browse by Category</h2>
            </div>
            <Link href="/categories" className="text-[var(--primary)] font-medium flex items-center hover:underline">
              View All <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Living Room', 'Bedroom', 'Office'].map((cat, idx) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={`https://images.unsplash.com/photo-${idx === 0 ? '1586023492125-27b2c045efd7' : idx === 1 ? '1505691938895-1758d7eaa511' : '1524758631624-e2822e304c36'}?auto=format&fit=crop&q=80&w=800`}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat}</h3>
                  <p className="text-white/80 text-sm">Explore Collection</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistics Section */}
      <section className="py-24 bg-[var(--secondary)] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[var(--primary)] rounded-full blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-[var(--primary)]">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold">{stat.count}</h3>
                <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Offer / Highlight */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[var(--background)] dark:bg-gray-800 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            <div className="lg:w-1/2 space-y-8 relative z-10">
              <span className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Limited Time Offer</span>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">Elevate Your Living Room with 30% Off</h2>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                Discover our new Summer Collection and transform your space into a masterpiece of modern design. Valid until July 31st.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/shop" className="btn-primary flex items-center space-x-2">
                  <span>Shop Collection</span>
                  <ArrowRight size={20} />
                </Link>
                <button className="flex items-center space-x-2 px-8 py-4 font-bold border border-[var(--border)] rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all">
                  <Play size={18} />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200" 
                className="rounded-[2.5rem] shadow-2xl relative z-10 transform lg:rotate-3 hover:rotate-0 transition-transform duration-700"
                alt="Highlight"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-[var(--background)] dark:bg-gray-950 transition-colors overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">Customer Stories</span>
            <h2 className="text-4xl font-bold">Trusted by Thousands</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] border border-[var(--border)] space-y-6 relative"
              >
                <div className="absolute top-10 right-10 text-6xl text-gray-100 dark:text-gray-700 font-serif opacity-50">“</div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[var(--muted)] text-lg leading-relaxed relative z-10 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center font-bold text-[var(--primary)]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-[var(--muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[var(--secondary)] rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Join our newsletter</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              <form className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
                <button className="btn-primary !py-4">Subscribe Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 bg-[var(--background)] dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">Support</span>
              <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is your delivery time?", a: "Standard delivery takes 3-7 business days depending on your location." },
                { q: "Do you offer international shipping?", a: "Currently, we ship within Bangladesh and selected international regions." },
                { q: "Can I customize the furniture colors?", a: "Yes, many of our pieces offer custom fabric and wood finish options." },
                { q: "What is your return policy?", a: "We offer a 30-day easy return policy for all standard furniture items." }
              ].map((faq, idx) => (
                <details key={idx} className="group bg-white dark:bg-gray-800 rounded-3xl border border-[var(--border)] overflow-hidden">
                  <summary className="flex items-center justify-between p-8 font-bold cursor-pointer list-none">
                    <span>{faq.q}</span>
                    <span className="group-open:rotate-180 transition-transform duration-300"><ArrowRight size={20} className="rotate-90" /></span>
                  </summary>
                  <div className="p-8 pt-0 text-[var(--muted)] leading-relaxed border-t border-[var(--border)]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Blog Preview Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-4">
              <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Journal</span>
              <h2 className="text-4xl font-bold">Latest Design Trends</h2>
            </div>
            <Link href="/blog" className="text-[var(--primary)] font-medium flex items-center hover:underline">
              Read Blog <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group cursor-pointer space-y-6">
                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden relative">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1618221195710-dd6b41faaea6' : i === 2 ? '1616489953149-8d80e82977cc' : '1616137422495-1e902b7ecbb7'}?auto=format&fit=crop&q=80&w=800`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Blog post"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur text-xs font-bold rounded-full">Interior</div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted)] font-medium">October 24, 2024 • 5 min read</p>
                  <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors">
                    {i === 1 ? '5 Minimalism Tips for a Modern Living Room' : i === 2 ? 'The Secret to Choosing the Perfect Sofa Color' : 'Why Sustainable Materials are the Future'}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="py-24 bg-[var(--background)] dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[var(--primary)] rounded-[4rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
            <h2 className="text-4xl md:text-6xl font-bold text-white relative z-10">Ready to transform your home?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto relative z-10 font-medium">
              Join thousands of happy customers and start creating your dream living space today with FurNova.
            </p>
            <div className="flex justify-center relative z-10 pt-4">
              <Link href="/shop" className="bg-white text-[var(--secondary)] px-10 py-5 rounded-full font-bold text-lg hover:scale-110 hover:shadow-2xl transition-all flex items-center space-x-3">
                <span>Explore All Products</span>
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
