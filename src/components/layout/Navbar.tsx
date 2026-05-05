import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut, TrendingUp, Sun, Moon } from '@/components/ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className={`glass-nav transition-all duration-300 fixed w-full z-[100] ${isScrolled ? 'py-3 shadow-lg bg-white/80 dark:bg-gray-900/80' : 'py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight text-[var(--foreground)] dark:text-white">
          FUR<span className="text-[var(--primary)]">NOVA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-all hover:text-[var(--primary)] ${
                router.pathname === link.href ? 'text-[var(--primary)]' : 'text-[var(--muted)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] transition-all"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <button className="hidden sm:block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            <Search size={20} />
          </button>
          
          {(!isAuthenticated || user?.role === 'USER') && (
            <Link href="/wishlist" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors relative">
              <Heart size={20} />
            </Link>
          )}

          <Link href="/cart" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors relative">
            <ShoppingCart size={20} />
            {mounted && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems()}
              </span>
            )}
          </Link>

          {mounted && (
            isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  <div className="w-9 h-9 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </button>
                
                {/* Profile Dropdown */}
                <div className="absolute right-0 top-full pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-[var(--border)] overflow-hidden">
                    <div className="px-6 py-5 border-b border-[var(--border)] bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-sm font-black truncate dark:text-white">{user?.name}</p>
                      <p className="text-[10px] text-[var(--muted)] truncate font-bold uppercase tracking-widest">{user?.role}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href={
                          user?.role === 'ADMIN'
                            ? '/dashboard/admin'
                            : user?.role === 'MANAGER'
                              ? '/dashboard/manager'
                              : '/dashboard/user'
                        }
                        className="flex items-center space-x-3 px-6 py-3.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                      >
                        <TrendingUp size={18} className="text-[var(--primary)]" />
                        <span>Dashboard</span>
                      </Link>
                      <Link href="/profile" className="flex items-center space-x-3 px-6 py-3.5 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white">
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>
                    </div>
                    <div className="py-2 border-t border-[var(--border)]">
                      <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-6 py-3.5 text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-primary !px-6 !py-2.5 text-sm shadow-xl shadow-[var(--primary)]/20">
                Login
              </Link>
            )
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--foreground)] dark:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-[var(--border)] overflow-hidden transition-colors"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-bold ${router.pathname === link.href ? 'text-[var(--primary)]' : 'text-[var(--muted)] dark:text-gray-400'}`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link 
                  href="/auth/login" 
                  className="btn-primary text-center !py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login to FurNova
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
