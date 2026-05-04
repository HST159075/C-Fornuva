import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Settings, LogOut, ArrowRight } from '@/components/ui/Icons';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/auth.service';
import { orderService, Order } from '@/services/order.service';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout, isAuthenticated, setUser } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      if (user?.role !== 'MANAGER') fetchOrders();
      if (user) setName(user.name || '');
    }
  }, [isAuthenticated, user]);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await authService.updateProfile({ name });
      if (res.success) {
        toast.success('Profile updated successfully');
        setUser({ ...user!, name });
      }
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const isManager = user.role === 'MANAGER';

  useEffect(() => {
    if (isManager && activeTab === 'orders') setActiveTab('settings');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager]);

  return (
    <Layout title="My Profile | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-[var(--border)] shadow-xl text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-lg">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name || 'User'}</h2>
                  <p className="text-sm text-[var(--muted)] font-medium">{user.email}</p>
                </div>
                <div className="pt-6 border-t border-[var(--border)]">
                  <span className="px-4 py-1.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2.5rem] border border-[var(--border)] shadow-sm space-y-2">
                {!isManager && (
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'orders' ? 'bg-[var(--primary)] text-white shadow-lg' : 'hover:bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'}`}
                  >
                    <ShoppingBag size={20} />
                    <span className="font-bold text-sm">My Orders</span>
                  </button>
                )}
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-[var(--primary)] text-white shadow-lg' : 'hover:bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'}`}
                >
                  <Settings size={20} />
                  <span className="font-bold text-sm">Account Settings</span>
                </button>
                <div className="pt-4 mt-4 border-t border-[var(--border)]">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={20} />
                    <span className="font-bold text-sm">Logout</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!isManager && activeTab === 'orders' && (
                  <motion.div 
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-end justify-between">
                      <h2 className="text-3xl font-bold">Order History</h2>
                      <p className="text-sm text-[var(--muted)] font-medium">Total {orders.length} orders found</p>
                    </div>

                    {orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-white p-8 rounded-[3rem] border border-[var(--border)] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center space-x-6">
                              <div className="w-16 h-16 bg-[var(--background)] rounded-2xl flex items-center justify-center text-[var(--primary)]">
                                <ShoppingBag size={28} />
                              </div>
                              <div>
                                <p className="text-xs text-[var(--muted)] font-bold uppercase tracking-widest">Order ID</p>
                                <h3 className="text-lg font-bold">#{order.id.slice(-8).toUpperCase()}</h3>
                                <p className="text-sm text-[var(--muted)] font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-xs text-[var(--muted)] font-bold uppercase tracking-widest">Total Amount</p>
                              <p className="text-2xl font-bold text-[var(--primary)]">${Number(order.totalPrice || order.total).toFixed(2)}</p>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-4">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 
                                order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                              }`}>
                                {order.status}
                              </span>
                              <button className="text-sm font-bold text-[var(--secondary)] hover:text-[var(--primary)] flex items-center gap-2 group transition-colors">
                                View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white p-20 rounded-[4rem] border border-[var(--border)] border-dashed text-center space-y-6">
                        <div className="text-6xl">📦</div>
                        <h3 className="text-2xl font-bold">No orders yet</h3>
                        <p className="text-[var(--muted)] max-w-xs mx-auto">You haven&apos;t placed any orders yet. Start shopping to see your orders here!</p>
                        <button onClick={() => router.push('/shop')} className="btn-primary">Browse Shop</button>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div 
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-12 rounded-[4rem] border border-[var(--border)] space-y-12"
                  >
                    <h2 className="text-3xl font-bold">Account Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--muted)]">Full Name</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--primary)] font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--muted)]">Email Address</label>
                        <input type="email" defaultValue={user.email} disabled className="w-full bg-gray-50 border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--muted)] font-medium cursor-not-allowed" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-6">
                      <button 
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        className="btn-primary !px-10"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
