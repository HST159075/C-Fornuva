import React from 'react';
import Layout from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/store/useCartStore';
import { ShieldCheck, ArrowRight, CreditCard } from '@/components/ui/Icons';
import { useRouter } from 'next/router';
import { orderService } from '@/services/order.service';
import toast from 'react-hot-toast';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
}

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<CheckoutFormData>();
  const router = useRouter();

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/cart');
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        paymentMethod: 'CARD',
        shippingAddress: {
          name: `${data.firstName} ${data.lastName}`,
          street: data.address,
          city: data.city,
          zip: data.zip,
          country: 'Bangladesh',
        }
      };

      const response = await orderService.createOrder(orderData);
      
      if (response.success) {
        toast.success('Order placed successfully!');
        clearCart();
        const orderId = response.order?.id || '';
        router.push(`/order-success${orderId ? `?orderId=${orderId}` : ''}`);
      } else {
        toast.error(response.message || 'Failed to place order');
      }
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Layout title="Checkout | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Secure Checkout</h1>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="xl:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-[var(--border)] shadow-sm space-y-8">
                <div className="flex items-center space-x-4 pb-6 border-b border-[var(--border)]">
                  <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">First Name</label>
                    <input {...register('firstName', { required: true })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">Last Name</label>
                    <input {...register('lastName', { required: true })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">Address</label>
                    <input {...register('address', { required: true })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">City</label>
                    <input {...register('city', { required: true })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">Zip Code</label>
                    <input {...register('zip', { required: true })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                  </div>
                </div>
              </div>

              {/* Payment Simlation */}
              <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-[var(--border)] shadow-sm space-y-8">
                <div className="flex items-center space-x-4 pb-6 border-b border-[var(--border)]">
                  <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h2 className="text-2xl font-bold">Payment Method</h2>
                </div>
                
                <div className="bg-[var(--background)] p-6 rounded-3xl border border-[var(--primary)] flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CreditCard size={32} className="text-[var(--primary)]" />
                    <div>
                      <p className="font-bold">Credit / Debit Card</p>
                      <p className="text-xs text-[var(--muted)]">All major cards supported</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-[var(--primary)] bg-white"></div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--muted)]">Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[var(--muted)]">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[var(--muted)]">CVV</label>
                      <input type="text" placeholder="123" className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Right Sidebar - Sticky Summary */}
            <div className="xl:col-span-1 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-[var(--border)] shadow-xl sticky top-32 space-y-8">
                <h3 className="text-2xl font-bold pb-6 border-b border-[var(--border)]">Your Order</h3>
                
                <div className="max-h-60 overflow-y-auto space-y-4 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[var(--muted)]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm">${(Number(item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[var(--border)] space-y-4">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-[var(--muted)]">Subtotal</span>
                    <span className="font-bold">${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-[var(--muted)]">Shipping</span>
                    <span className="text-green-500 font-bold uppercase tracking-wider text-xs">Free</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-lg font-bold">Grand Total</span>
                    <span className="text-3xl font-bold text-[var(--primary)]">${totalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="btn-primary w-full !py-5 flex items-center justify-center space-x-3 text-lg"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Payment'}
                  {!isSubmitting && <ArrowRight size={20} />}
                </button>

                <div className="pt-4 flex flex-col items-center gap-4">
                  <p className="text-[10px] text-[var(--muted)] flex items-center gap-2 text-center uppercase tracking-widest font-bold">
                    <ShieldCheck size={14} className="text-green-500" />
                    Verified Secure Payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
