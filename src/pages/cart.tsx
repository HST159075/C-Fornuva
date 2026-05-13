import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ArrowRight, Trash2, ShieldCheck } from '@/components/ui/Icons';
import { useCartStore } from '@/store/useCartStore';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  return (
    <Layout title="Shopping Cart | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Your Selection</span>
              <h1 className="text-4xl md:text-5xl font-black text-white">Shopping Cart</h1>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              {/* Cart Items List */}
              <div className="xl:col-span-2 space-y-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-8"
                    >
                      {/* Product Image */}
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden bg-gray-100 shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow space-y-2 text-center md:text-left">
                        <p className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">{item.category?.name}</p>
                        <h3 className="text-xl font-bold text-[var(--secondary)]">{item.name}</h3>
                        <p className="text-[var(--muted)] text-sm font-medium line-clamp-1">{item.description}</p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                        <div className="flex items-center justify-center md:justify-end gap-6">
                          <div className="flex items-center border border-[var(--border)] rounded-full p-1 bg-[var(--background)]">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-2xl font-bold text-[var(--secondary)]">
                            ${(Number(item.discountPrice || item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-[var(--muted)] font-medium">
                            ${Number(item.discountPrice || item.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="xl:col-span-1">
                <div className="bg-white p-10 rounded-[3rem] border border-[var(--border)] shadow-xl sticky top-32 space-y-8">
                  <h3 className="text-2xl font-black text-slate-900 pb-6 border-b border-[var(--border)]">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-[var(--muted)] font-medium">
                      <span>Subtotal ({totalItems()} items)</span>
                      <span className="text-[var(--secondary)] font-bold">${Number(totalPrice()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[var(--muted)] font-medium">
                      <span>Shipping</span>
                      <span className="text-green-500 font-bold uppercase tracking-wider text-xs">Free</span>
                    </div>
                    <div className="flex justify-between text-[var(--muted)] font-medium">
                      <span>Estimated Tax</span>
                      <span className="text-[var(--secondary)] font-bold">$0.00</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border)] space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-slate-900">Total Amount</span>
                      <span className="text-4xl font-bold text-[var(--primary)]">${Number(totalPrice()).toFixed(2)}</span>
                    </div>
                    <Link href="/checkout" className="btn-primary w-full !py-5 flex items-center justify-center space-x-3 text-lg">
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>

                  <div className="pt-4 flex flex-col items-center gap-4">
                    <p className="text-xs text-[var(--muted)] flex items-center gap-2">
                      <ShieldCheck size={14} className="text-green-500" />
                      Secure SSL Encryption & Privacy Protection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[4rem] p-20 text-center border border-[var(--border)] border-dashed space-y-8"
            >
              <div className="w-32 h-32 bg-[var(--background)] rounded-full flex items-center justify-center mx-auto text-5xl">
                🛒
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900">Your cart is empty</h2>
                <p className="text-slate-500 max-w-sm mx-auto text-lg leading-relaxed">
                   Looks like you haven&apos;t added anything yet. Explore our collection and find something you love.
                </p>
              </div>
              <Link href="/shop" className="btn-primary inline-flex !px-10 !py-4">
                Start Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
