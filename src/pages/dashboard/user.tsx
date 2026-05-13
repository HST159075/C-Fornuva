import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Heart, Star, 
  ArrowRight, ShieldCheck, Truck 
} from '@/components/ui/Icons';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { orderService, Order, orderLineItems, orderTotalAmount } from '@/services/order.service';

const UserDashboard = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Orders Placed', value: orders.length.toString(), icon: <ShoppingBag />, color: 'bg-blue-500' },
    { label: 'Saved Items', value: '0', icon: <Heart />, color: 'bg-red-500' },
    { label: 'Member Level', value: 'Silver', icon: <Star />, color: 'bg-[var(--primary)]' },
  ];

  return (
    <DashboardLayout role="USER">
      <div className="space-y-10 pb-12">
        
        {/* Welcome Section */}
        <div className="bg-[var(--primary)] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Hello, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-white/80 text-lg max-w-xl font-medium">
              Welcome back to FurNova. We&apos;ve got some new premium collections waiting for you.
            </p>
            <div className="flex pt-4">
              <Link href="/shop" className="bg-white text-[var(--secondary)] px-8 py-4 rounded-full font-bold flex items-center space-x-3 hover:scale-105 transition-transform shadow-xl">
                <span>Start Shopping</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-[var(--border)] flex items-center space-x-6 hover:shadow-lg transition-all"
            >
              <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-[var(--muted)] uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Orders List */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-[var(--border)] space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Orders</h3>
              <Link href="/dashboard/user/orders" className="text-sm font-bold text-[var(--primary)] hover:underline">See All</Link>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                [...Array(2)].map((_, i) => (
                  <div key={i} className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
                ))
              ) : orders.length > 0 ? (
                orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-[var(--background)] dark:bg-gray-800 border border-[var(--border)] gap-6">
                    <div className="flex items-center space-x-6 w-full">
                      <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center shrink-0">
                        <ShoppingBag size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-white">Order #{order.id.slice(-6).toUpperCase()}</h4>
                        <p className="text-xs text-white/60 font-medium">
                          {new Date(order.createdAt).toLocaleDateString()} • {orderLineItems(order).length} items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                      <div className="text-center md:text-right">
                        <p className="font-black text-white">${orderTotalAmount(order).toFixed(2)}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'DELIVERED' ? 'text-green-500' : 'text-blue-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <Link href={`/dashboard/user/orders`} className="p-3 bg-white dark:bg-gray-700 rounded-full hover:shadow-md transition-shadow">
                        <ArrowRight size={18} className="text-[var(--primary)]" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-[var(--muted)] font-medium">No orders found yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Activity/Support Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-[var(--border)] space-y-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order Updates</h3>
              <div className="space-y-6">
                {orders.length > 0 ? (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <Truck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Latest Order Status</p>
                      <p className="text-xs text-slate-500 dark:text-[var(--muted)] font-medium">Your order #{orders[0].id.slice(-6).toUpperCase()} is currently {orders[0].status.toLowerCase()}.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Welcome!</p>
                      <p className="text-xs text-slate-500 dark:text-[var(--muted)] font-medium">Start shopping to see your order updates here.</p>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/shop" className="block w-full btn-primary !py-4 text-sm text-center">Browse Products</Link>
            </div>

            <div className="bg-gradient-to-br from-[var(--secondary)] to-black p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold">Need Help?</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  Our customer support team is available 24/7 to assist you.
                </p>
                <Link href="/contact" className="inline-block bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">Contact Support</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
