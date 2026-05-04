import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#F4F1EE]">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[var(--primary)] font-semibold tracking-widest uppercase text-sm"
            >
              Exclusive Collection 2024
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[var(--secondary)]">
              Redefining <br /> 
              <span className="text-[var(--primary)] italic font-medium">Modern</span> Comfort
            </h1>
            <p className="text-[var(--muted)] text-lg max-w-md leading-relaxed">
              Discover artisanal furniture that blends timeless elegance with contemporary functionality. Crafted for the way you live.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary !px-8 !py-4 text-lg">
              Shop Collection
            </Link>
            <Link href="/categories" className="px-8 py-4 rounded-full border border-[var(--border)] font-medium hover:bg-white transition-all">
              Browse Categories
            </Link>
          </div>

          <div className="flex items-center space-x-12 pt-8">
            <div>
              <h3 className="text-2xl font-bold">12k+</h3>
              <p className="text-xs text-[var(--muted)] uppercase tracking-wider">Happy Clients</p>
            </div>
            <div className="w-px h-10 bg-[var(--border)]"></div>
            <div>
              <h3 className="text-2xl font-bold">4.9</h3>
              <p className="text-xs text-[var(--muted)] uppercase tracking-wider">Average Rating</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-t-[200px] overflow-hidden shadow-2xl">
            <img 
              src="/hero-furniture.jpg" 
              alt="Premium Furniture Hero" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                <div className="w-8 h-8 bg-[var(--primary)] rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-bold">Premium Quality</p>
                <p className="text-[10px] text-[var(--muted)] uppercase">Certified Wood</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--primary)]/5 -z-0 hidden lg:block"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 border-2 border-[var(--primary)]/10 rounded-full"></div>
    </section>
  );
};

export default Hero;
