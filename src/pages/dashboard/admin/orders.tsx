import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ArrowRight, Search, RefreshCw } from '@/components/ui/Icons';
import { orderService, Order } from '@/services/order.service';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-10 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold dark:text-white">Order Fulfilment</h1>
            <p className="text-[var(--muted)] font-medium">Review and process customer orders globally.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={fetchOrders}
              className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] transition-all"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button className="btn-primary !py-3 !px-8">Export Orders</button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden transition-colors">
          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border)]">
            <h3 className="text-xl font-bold dark:text-white">Recent Transactions</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-2.5 flex items-center space-x-3 w-80">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search customer, ID..." className="bg-transparent border-none text-sm w-full dark:text-white focus:outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Order ID</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Customer</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Date</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Total</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}><td colSpan={6} className="p-6"><div className="h-12 w-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl"></div></td></tr>
                  ))
                ) : orders.length > 0 ? (
                  orders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-6 font-bold text-sm dark:text-white">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center font-bold text-xs">
                            {order.user?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="text-sm font-bold dark:text-white">{order.user?.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-medium text-[var(--muted)]">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-6 font-bold text-sm dark:text-white">${Number(order.totalPrice || order.total).toFixed(2)}</td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 
                          order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <ArrowRight size={18} className="text-[var(--muted)]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="p-10 text-center text-[var(--muted)] font-medium">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminOrdersPage;
