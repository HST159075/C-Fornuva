import React from 'react';
import Layout from '@/components/layout/Layout';
import { ArrowRight, Headphones, ShieldCheck } from '@/components/ui/Icons';

const faqs = [
  {
    category: "General Information",
    items: [
      { q: "What is FurNova?", a: "FurNova is a premium furniture brand dedicated to providing high-quality, modern, and sustainable furniture for homes and offices." },
      { q: "Where are you located?", a: "Our main design studio is in Dhaka, Bangladesh, with warehouses across the country for fast delivery." }
    ]
  },
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 3-7 business days. Custom furniture may take up to 4 weeks." },
      { q: "Can I track my order?", a: "Yes, you can track your order in real-time from your User Dashboard once it is shipped." },
      { q: "Do you offer free shipping?", a: "We offer free shipping on all orders over $500." }
    ]
  },
  {
    category: "Returns & Warranty",
    items: [
      { q: "What is your return policy?", a: "We offer a 30-day easy return policy for all standard items in original condition." },
      { q: "Is there a warranty on the furniture?", a: "Yes, all FurNova furniture comes with a 2-year limited manufacturing warranty." }
    ]
  }
];

const FAQPage = () => {
  return (
    <Layout title="Help & FAQ | FurNova">
      <div className="bg-[var(--background)] dark:bg-gray-950 min-h-screen pt-12 pb-24 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">Support Center</span>
            <h1 className="text-4xl md:text-6xl font-bold dark:text-white">How can we help?</h1>
            <p className="text-[var(--muted)] text-lg">
              Search our help center or browse frequently asked questions below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar Contact */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-[var(--border)] shadow-sm space-y-6">
                <h3 className="text-xl font-bold dark:text-white">Still need help?</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Can&apos;t find what you&apos;re looking for? Our support team is available 24/7.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm font-bold dark:text-white">
                    <Headphones size={20} className="text-[var(--primary)]" />
                    <span>+880 1234 567890</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-bold dark:text-white">
                    <ShieldCheck size={20} className="text-[var(--primary)]" />
                    <span>support@furnova.com</span>
                  </div>
                </div>
                <button className="btn-primary w-full !py-4 text-sm">Contact Us</button>
              </div>

              <div className="bg-[var(--secondary)] p-8 rounded-[2.5rem] text-white space-y-4">
                <h3 className="text-lg font-bold">Store Locator</h3>
                <p className="text-sm text-gray-400">Find the nearest FurNova showroom in your city.</p>
                <button className="text-sm font-bold text-[var(--primary)] flex items-center gap-2">
                  Find Stores <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3 space-y-16">
              {faqs.map((section, sIdx) => (
                <div key={sIdx} className="space-y-8">
                  <h2 className="text-2xl font-bold dark:text-white border-b border-[var(--border)] pb-4">{section.category}</h2>
                  <div className="space-y-4">
                    {section.items.map((item, iIdx) => (
                      <details key={iIdx} className="group bg-white dark:bg-gray-900 rounded-3xl border border-[var(--border)] transition-all overflow-hidden">
                        <summary className="flex items-center justify-between p-8 font-bold cursor-pointer list-none dark:text-white">
                          <span>{item.q}</span>
                          <span className="group-open:rotate-180 transition-transform duration-300">
                            <ArrowRight size={20} className="rotate-90 text-[var(--primary)]" />
                          </span>
                        </summary>
                        <div className="p-8 pt-0 text-[var(--muted)] leading-relaxed border-t border-[var(--border)] animate-fade-in">
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
