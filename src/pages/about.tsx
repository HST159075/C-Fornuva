import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { ShieldCheck, Headphones, Star } from '@/components/ui/Icons';

const AboutPage = () => {
  return (
    <Layout title="Our Story | FurNova">
      <div className="bg-[var(--background)] min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556912177-f547c12dd0ee?auto=format&fit=crop&q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="About FurNova"
          />
          <div className="relative z-20 text-center space-y-6 container mx-auto px-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm"
            >
              Est. 2024
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white"
            >
              Crafting Comfort, <br /> Defining Style
            </motion.h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold">Our Philosophy</h2>
                <div className="space-y-6 text-[var(--muted)] text-lg leading-relaxed">
                  <p>
                    At FurNova, we believe that your home is a reflection of your personality. Our journey began with a simple mission: to provide high-quality, sustainable, and beautifully designed furniture that turns a house into a home.
                  </p>
                  <p>
                    Every piece in our collection is carefully curated, balancing modern aesthetics with timeless craftsmanship. We work with talented designers and master craftsmen to ensure that every curve, joint, and fabric meets our rigorous standards.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <h4 className="text-3xl font-bold text-[var(--primary)]">10k+</h4>
                    <p className="text-sm font-medium text-[var(--muted)]">Happy Customers</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-[var(--primary)]">500+</h4>
                    <p className="text-sm font-medium text-[var(--muted)]">Unique Designs</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800" 
                  className="rounded-[3rem] shadow-2xl relative z-10"
                  alt="Our Workshop"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">Why Choose Us</h2>
              <p className="text-[var(--muted)] max-w-xl mx-auto">We are committed to excellence in every aspect of our business.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <ShieldCheck size={40} />, title: 'Quality Assurance', desc: 'Each piece undergoes a 12-point quality check.' },
                { icon: <Star size={40} />, title: 'Premium Material', desc: 'We use sustainably sourced premium materials only.' },
                { icon: <Headphones size={40} />, title: 'Expert Support', desc: 'Our interior experts are here to help you 24/7.' },
              ].map((val, idx) => (
                <div key={idx} className="p-10 rounded-[3rem] bg-[var(--background)] border border-[var(--border)] text-center space-y-6">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[var(--primary)] mx-auto shadow-lg">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold">{val.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
