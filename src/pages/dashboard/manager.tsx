import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  TrendingUp, ShoppingBag, Package, 
  RefreshCw 
} from '@/components/ui/Icons';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { adminService, DashboardStats } from '@/services/admin.service';

const COLORS = ['#D4AF37', '#1A1A1A', '#4A4A4A', '#8E8E8E'];

const ManagerDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Failed to load dashboard statistics. Make sure you have manager permissions.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="MANAGER">
        <div className="h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !stats) {
    return (
      <DashboardLayout role="MANAGER">
        <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
          <p className="text-red-500 font-bold">{error || "Something went wrong"}</p>
          <button onClick={fetchStats} className="btn-primary !px-6">Retry</button>
        </div>
      </DashboardLayout>
    );
  }

  const { overview, monthlyRevenue, recentOrders } = stats;

  const statCards = [
    { label: 'Store Revenue', value: `$${overview.totalRevenue.toLocaleString()}`, change: '+12.5%', icon: <TrendingUp />, color: 'bg-green-500' },
    { label: 'Daily Orders', value: overview.thisMonthOrders.toString(), change: '+8.2%', icon: <ShoppingBag />, color: 'bg-[var(--primary)]' },
    { label: 'Inventory Level', value: overview.totalProducts.toString(), change: '+2.4%', icon: <Package />, color: 'bg-purple-500' },
    { label: 'Pending Orders', value: overview.pendingOrders.toString(), change: 'Urgent', icon: <RefreshCw />, color: 'bg-yellow-500' },
  ];

  return (
    <DashboardLayout role="MANAGER">
      <div className="space-y-10 pb-12">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold dark:text-white">Store Management</h1>
            <p className="text-[var(--muted)] font-medium">Monitoring real-time performance and inventory.</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-[var(--border)] dark:text-white">Today&apos;s View</span>
            <button className="btn-primary !py-2.5 !px-6 text-sm">Manager Report</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {statCards.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="text-sm font-bold text-[var(--muted)] mb-1 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black dark:text-white">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] border border-[var(--border)] shadow-sm">
            <h3 className="text-xl font-bold dark:text-white mb-10">Sales Performance</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: 'currentColor' }} opacity={0.5} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: 'currentColor' }} opacity={0.5} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={4} dot={{ r: 6, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="xl:col-span-1 bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] border border-[var(--border)] shadow-sm flex flex-col">
            <h3 className="text-xl font-bold dark:text-white mb-10">Operational Status</h3>
            <div className="flex-grow flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.ordersByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="status"
                  >
                    {stats.ordersByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Manager Action Table */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-10 border-b border-[var(--border)]">
            <h3 className="text-xl font-bold dark:text-white">Orders Awaiting Processing</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Order ID</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Customer</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Total</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentOrders.filter(o => o.status !== 'DELIVERED').map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="p-6 font-bold text-sm dark:text-white">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="p-6 font-bold text-sm dark:text-white">{order.user?.name}</td>
                    <td className="p-6 font-bold text-sm dark:text-white">${Number(order.totalPrice).toFixed(2)}</td>
                    <td className="p-6">
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-yellow-100 text-yellow-600">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <button className="btn-primary !py-2 !px-4 text-[10px]">Process</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
