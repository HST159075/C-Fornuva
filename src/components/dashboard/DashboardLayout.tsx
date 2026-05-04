import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, User, LogOut, Search, 
  BarChart, Package, ShoppingBag, Users, 
  Settings, Heart, TrendingUp, PieChart, Plus
} from '@/components/ui/Icons';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'USER' | 'ADMIN' | 'MANAGER';
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const menuItems = {
    USER: [
      { icon: <TrendingUp size={20} />, label: 'Overview', href: '/dashboard/user' },
      { icon: <ShoppingBag size={20} />, label: 'My Orders', href: '/dashboard/user/orders' },
      { icon: <Heart size={20} />, label: 'Wishlist', href: '/wishlist' },
      { icon: <Settings size={20} />, label: 'Profile Settings', href: '/profile' },
    ],
    ADMIN: [
      { icon: <PieChart size={20} />, label: 'Analytics', href: '/dashboard/admin' },
      { icon: <Package size={20} />, label: 'Products', href: '/dashboard/admin/products' },
      { icon: <ShoppingBag size={20} />, label: 'Total Orders', href: '/dashboard/admin/orders' },
      { icon: <Users size={20} />, label: 'Customers', href: '/dashboard/admin/users' },
      { icon: <BarChart size={20} />, label: 'Inventory', href: '/dashboard/admin/inventory' },
      { icon: <Settings size={20} />, label: 'Site Settings', href: '/dashboard/admin/settings' },
    ],
    MANAGER: [
      { icon: <PieChart size={20} />, label: 'Store Stats', href: '/dashboard/manager' },
      { icon: <Plus size={20} />, label: 'Add Listing', href: '/dashboard/manager/products' },
      { icon: <Package size={20} />, label: 'Manage Inventory', href: '/dashboard/manager/inventory' },
      { icon: <ShoppingBag size={20} />, label: 'Order Processing', href: '/dashboard/manager/orders' },
      { icon: <Users size={20} />, label: 'Team Management', href: '/dashboard/manager/staff' },
    ]
  };

  const currentMenu = menuItems[role] || menuItems.USER;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors">
      
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex flex-col bg-[var(--secondary)] text-white transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-24'}`}
      >
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen && (
            <Link href="/" className="text-2xl font-black tracking-tighter text-[var(--primary)]">
              FUR<span className="text-white">NOVA.</span>
            </Link>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-8">
          {currentMenu.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${router.pathname === item.href ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className="shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-[var(--border)] flex items-center justify-between px-8 shrink-0 transition-colors">
          <div className="flex items-center space-x-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
              <Menu size={24} />
            </button>
            <span className="font-black text-xl">FUR<span className="text-[var(--primary)]">NOVA</span></span>
          </div>

          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-2.5 w-96 transition-colors">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search data, orders, clients..." 
              className="bg-transparent border-none focus:outline-none px-4 text-sm w-full dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold dark:text-white">{user?.name || 'User'}</span>
              <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest">{role}</span>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {/* Profile Dropdown */}
              <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-[var(--border)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                <Link href="/profile" className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <User size={18} className="text-gray-400" />
                  <span className="text-sm font-bold dark:text-white">My Profile</span>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-6 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors border-t border-[var(--border)]">
                  <LogOut size={18} />
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 w-80 h-full bg-[var(--secondary)] text-white z-[110] p-8 lg:hidden"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-2xl font-black text-[var(--primary)]">FUR<span className="text-white">NOVA.</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <nav className="space-y-4">
                {currentMenu.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${router.pathname === item.href ? 'bg-[var(--primary)] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {item.icon}
                    <span className="font-bold">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
