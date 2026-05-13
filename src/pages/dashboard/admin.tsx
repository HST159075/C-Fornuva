import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  TrendingUp, ShoppingBag, Users, Package, 
  ArrowRight, ShieldCheck 
} from '@/components/ui/Icons';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { adminService, DashboardStats } from '@/services/admin.service';

const COLORS = ['#D4AF37', '#1A1A1A', '#4A4A4A', '#8E8E8E'];

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <DashboardLayout role="ADMIN">
        <div className="h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
        </div>
      </DashboardLayout>
    );
  }

  const { overview, monthlyRevenue, recentOrders } = stats;

  const statCards = [
    { label: 'Total Revenue', value: `$${overview.totalRevenue.toLocaleString()}`, change: '+12.5%', icon: <TrendingUp />, color: 'bg-green-500' },
    { label: 'Total Orders', value: overview.totalOrders.toLocaleString(), change: '+8.2%', icon: <ShoppingBag />, color: 'bg-[var(--primary)]' },
    { label: 'Total Customers', value: overview.totalUsers.toLocaleString(), change: '+15.3%', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Active Products', value: overview.totalProducts.toLocaleString(), change: '+2.4%', icon: <Package />, color: 'bg-purple-500' },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-10 pb-12">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Analytics Overview</h1>
            <p className="text-slate-500 dark:text-[var(--muted)] font-medium">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-[var(--border)] dark:text-white">Last 30 Days</span>
            <button className="btn-primary !py-2.5 !px-6 text-sm">Download Report</button>
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
              <p className="text-sm font-bold text-slate-500 dark:text-[var(--muted)] mb-1 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] border border-[var(--border)] shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Revenue Analytics</h3>
              <div className="flex items-center space-x-6 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                  <span className="text-slate-900 dark:text-white">Revenue</span>
                </div>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 600, fill: 'currentColor' }} 
                    opacity={0.5}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 600, fill: 'currentColor' }} 
                    opacity={0.5}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      backgroundColor: 'var(--card)',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={4} dot={{ r: 6, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart (Simulated from Orders by Status) */}
          <div className="xl:col-span-1 bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] border border-[var(--border)] shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-10">Orders by Status</h3>
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
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.ordersByStatus.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap uppercase tracking-widest">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden transition-colors">
          <div className="p-10 flex items-center justify-between border-b border-[var(--border)]">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
            <div className="flex items-center space-x-4">
              <button className="text-sm font-bold text-[var(--primary)] hover:underline">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Order ID</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Customer</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Amount</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Payment</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="p-6 font-bold text-sm text-slate-900 dark:text-white">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center text-[10px] font-bold">
                          {order.user?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{order.user?.name}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-sm text-slate-900 dark:text-white">${Number(order.totalPrice).toFixed(2)}</td>
                    <td className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                      {order.isPaid ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <ShieldCheck size={14} /> Paid
                        </span>
                      ) : 'Pending'}
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-600' :
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
