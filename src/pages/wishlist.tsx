import React from 'react';
import Layout from '@/components/layout/Layout';
import { AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';
import { useWishlistStore } from '@/store/useWishlistStore';
import Link from 'next/link';

const WishlistPage = () => {
  const { items } = useWishlistStore();

  return (
    <Layout title="My Wishlist | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Saved Items</span>
              <h1 className="text-4xl md:text-5xl font-bold">My Wishlist</h1>
              <p className="text-[var(--muted)] font-medium">You have {items.length} items saved for later.</p>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-white rounded-[4rem] p-20 text-center border border-[var(--border)] border-dashed space-y-8">
              <div className="w-32 h-32 bg-[var(--background)] rounded-full flex items-center justify-center mx-auto text-5xl">
                💝
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Wishlist is empty</h2>
                <p className="text-[var(--muted)] max-w-sm mx-auto text-lg leading-relaxed">
                  Save your favorite pieces here to easily find them later and keep track of style inspiration.
                </p>
              </div>
              <Link href="/shop" className="btn-primary inline-flex !px-10 !py-4">
                Explore Collection
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
