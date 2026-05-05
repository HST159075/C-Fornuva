import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1
      })
      .from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.8')
      .from('.hero-btns', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-stats', {
        x: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.2
      }, '-=0.4')
      .from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5
      }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[90vh] flex items-center overflow-hidden bg-[var(--background)] transition-colors">
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <div className="space-y-10">
          <div className="space-y-6 overflow-hidden">
            <span className="hero-title inline-block text-[var(--primary)] font-black tracking-[0.4em] uppercase text-[10px] mb-2">
              The Art of Living
            </span>
            <h1 className="hero-title text-5xl sm:text-7xl md:text-9xl font-black leading-[0.95] md:leading-[0.9] tracking-tighter text-[var(--foreground)]">
              Luxury <br /> 
              <span className="text-gold italic font-serif font-medium">Redefined</span>
            </h1>
            <p className="hero-desc text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              Experience the pinnacle of craftsmanship with our curated collection of artisanal furniture. Designed for those who appreciate the finer things in life.
            </p>
          </div>
          
          <div className="hero-btns flex flex-wrap gap-6">
            <Link href="/shop" className="btn-primary !px-12 !py-5 text-xl shadow-2xl shadow-[var(--primary)]/30 hover:scale-105 transition-transform">
              Shop Collection
            </Link>
            <Link href="/categories" className="px-12 py-5 rounded-full border-2 border-[var(--border)] font-bold text-lg hover:bg-white dark:hover:bg-gray-800 transition-all shadow-xl">
              Explore More
            </Link>
          </div>

          <div className="hero-stats flex items-center space-x-16 pt-10">
            <div>
              <h3 className="text-3xl font-black tracking-tighter">15k+</h3>
              <p className="text-[10px] text-[var(--muted)] font-black uppercase tracking-[0.2em]">Happy Clients</p>
            </div>
            <div className="w-px h-12 bg-[var(--border)]"></div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter">4.9/5</h3>
              <p className="text-[10px] text-[var(--muted)] font-black uppercase tracking-[0.2em]">User Rating</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div ref={imageRef} className="relative aspect-[4/5] rounded-t-[250px] rounded-b-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-gray-900">
            <Image 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Furniture Hero" 
              fill
              priority
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl hidden md:block border border-white/20"
          >
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-tr from-[var(--primary)] to-amber-300 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <div className="w-6 h-6 border-4 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">Premium Quality</p>
                <p className="text-[10px] text-[var(--primary)] font-black uppercase tracking-widest">Certified Wood</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--primary)]/10 to-transparent -z-0 hidden lg:block"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] border-[40px] border-[var(--primary)]/5 rounded-full"></div>
    </section>
  );
};

export default Hero;