import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, Search, Menu, X, TrendingUp, Sun, Moon } from '@/components/ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    <nav 
      className={`transition-all duration-700 fixed w-full z-[100] ${
        !showNavbar ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      } ${
        isScrolled 
          ? 'py-4 glass-premium mx-auto mt-4 rounded-[2.5rem] !w-[95%] left-1/2 -translate-x-1/2 shadow-2xl' 
          : 'py-8 bg-white/95 dark:bg-transparent backdrop-blur-md border-b border-black/5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-[var(--foreground)] flex items-center group">
          <div className="w-11 h-11 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl mr-3 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-[var(--primary)]/30">
            <TrendingUp size={24} className="text-white" />
          </div>
          <span className="hidden sm:block text-[var(--foreground)]">FUR<span className="text-gold">NOVA</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all rounded-full relative group ${
                router.pathname === link.href 
                  ? 'text-white bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/20' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 bg-white/5 backdrop-blur-md rounded-2xl text-white transition-all hover:scale-110 border border-white/10 shadow-sm"
          >
            {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <Moon size={20} />}
          </button>

          {/* Search */}
          <button className="hidden sm:flex p-3 bg-white/5 backdrop-blur-md rounded-2xl text-white transition-all hover:scale-110 border border-white/10 shadow-sm">
            <Search size={20} />
          </button>
          
          {/* Cart */}
          <Link href="/cart" className="p-3 bg-white/5 backdrop-blur-md rounded-2xl text-white transition-all hover:scale-110 border border-white/10 shadow-sm relative">
            <ShoppingCart size={20} />
            {mounted && totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] min-w-[20px] h-[20px] flex items-center justify-center rounded-full font-black border-2 border-[var(--background)] shadow-lg">
                {totalItems()}
              </span>
            )}
          </Link>

          <div className="hidden md:block h-6 w-px bg-black/10 dark:bg-white/10 mx-2"></div>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href={user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user'}>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-dark)] p-[2px] cursor-pointer hover:scale-105 transition-all shadow-lg">
                  <div className="w-full h-full bg-white dark:bg-black rounded-2xl flex items-center justify-center text-[var(--primary)] font-black text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="hidden lg:block text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="btn-primary !px-9 !py-3.5 text-sm shadow-2xl shadow-[var(--primary)]/30 hover:-translate-y-1 active:translate-y-0 transition-all">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-3 bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl text-slate-900 dark:text-white border border-black/10 dark:border-white/10 shadow-sm"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl border-b border-white/20 dark:border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-black px-4 py-3 rounded-2xl transition-all ${
                    router.pathname === link.href 
                      ? 'text-[var(--primary)] bg-[var(--primary)]/10' 
                      : 'text-[var(--muted)] dark:text-white/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link 
                  href="/auth/login" 
                  className="btn-primary text-center !py-5 !rounded-3xl mt-4 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
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
