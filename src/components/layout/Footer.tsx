import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from '@/components/ui/Icons';

const Footer = () => {
  return (
    <footer className="bg-[var(--secondary)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              FUR<span className="text-[var(--primary)]">NOVA</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Elevate your living space with our curated collection of premium furniture. Quality craftsmanship meets modern design.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--primary)] transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--primary)] transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--primary)] transition-colors">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Shop All</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Categories</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-[var(--primary)] text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin size={18} className="text-[var(--primary)] shrink-0" />
                <span>Hathazari, Chattogram, Bangladesh (4336)</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone size={18} className="text-[var(--primary)] shrink-0" />
                <span>01887238025</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail size={18} className="text-[var(--primary)] shrink-0" />
                <span>hsttasin90@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs font-medium">
            © {new Date().getFullYear()} FurNova. All rights reserved. Created with ❤️ for premium homes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
