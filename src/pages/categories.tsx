import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { ArrowRight } from '@/components/ui/Icons';
import { productService, Category } from '@/services/product.service';
import Link from 'next/link';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const categoryImages: Record<string, string> = {
    'Living Room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    'Bedroom': 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800',
    'Office': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    'Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    'Dining': 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800',
    'Outdoor': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
  };

  return (
    <Layout title="Categories | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 mb-16 text-center">
            <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Curated Collections</span>
            <h1 className="text-4xl md:text-6xl font-bold">Shop by Category</h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto text-lg leading-relaxed">
              Find the perfect pieces for every room in your home with our specialized collections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <img 
                  src={categoryImages[cat.name] || `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800`}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-12 left-12 z-20 space-y-4">
                  <h3 className="text-3xl font-bold text-white">{cat.name}</h3>
                  <Link 
                    href={`/shop?category=${cat.id}`}
                    className="inline-flex items-center space-x-2 text-white/80 hover:text-[var(--primary)] transition-colors font-bold group/btn"
                  >
                    <span>View Collection</span>
                    <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
