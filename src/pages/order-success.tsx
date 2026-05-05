import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from '@/components/ui/Icons';
import { useRouter } from 'next/router';

const OrderSuccessPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <Layout title="Order Successful | FurNova">
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-[var(--border)] text-center space-y-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto"
          >
            <ShieldCheck size={64} />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--secondary)]">Order Placed!</h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed max-w-sm mx-auto">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <div className="p-8 bg-[var(--background)] rounded-[2.5rem] border border-[var(--border)] space-y-4 text-left">
            {orderId && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--muted)] font-medium">Order Number:</span>
                <span className="font-bold uppercase">#{(orderId as string).slice(-8).toUpperCase()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-[var(--muted)] font-medium">Estimated Delivery:</span>
              <span className="font-bold">3–7 Business Days</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[var(--muted)] font-medium">Payment Status:</span>
              <span className="font-bold text-yellow-600">Pending Verification</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <Link href="/shop" className="btn-primary flex-grow !py-5 flex items-center justify-center space-x-2">
              <span>Continue Shopping</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/dashboard/user/orders" className="px-8 py-5 border border-[var(--border)] rounded-full font-bold hover:bg-[var(--background)] transition-all text-center">
              Track Orders
            </Link>
          </div>
          
          <p className="text-xs text-[var(--muted)] font-medium italic">
            A confirmation email has been sent to your registered email address.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
