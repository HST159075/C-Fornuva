import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, MessageSquare } from '@/components/ui/Icons';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "5 Minimalism Tips for a Modern Living Room",
    excerpt: "Discover how to create a clean, modern aesthetic in your home using minimal pieces and smart organization strategies.",
    category: "Interior Design",
    author: "Sarah Johnson",
    date: "Oct 24, 2024",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    comments: 12
  },
  {
    id: 2,
    title: "The Secret to Choosing the Perfect Sofa Color",
    excerpt: "Choosing a sofa color isn't just about what you like today, but what will look good for years to come. Here's our guide.",
    category: "Buying Guide",
    author: "Michael Chen",
    date: "Oct 20, 2024",
    image: "https://images.unsplash.com/photo-1616489953149-8d80e82977cc?auto=format&fit=crop&q=80&w=800",
    comments: 8
  },
  {
    id: 3,
    title: "Why Sustainable Materials are the Future",
    excerpt: "Sustainability is no longer a luxury, it's a necessity. Learn about the eco-friendly materials we use at FurNova.",
    category: "Sustainability",
    author: "Emma Wilson",
    date: "Oct 15, 2024",
    image: "https://images.unsplash.com/photo-1616137422495-1e902b7ecbb7?auto=format&fit=crop&q=80&w=800",
    comments: 15
  },
  {
    id: 4,
    title: "The Return of Mid-Century Modern Style",
    excerpt: "Mid-century modern is back and bigger than ever. See how to integrate this classic look into your current home.",
    category: "Trends",
    author: "David Miller",
    date: "Oct 10, 2024",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800",
    comments: 5
  },
  {
    id: 5,
    title: "How to Light Your Dining Room for Maximum Impact",
    excerpt: "Lighting can make or break a room's atmosphere. Master the art of layering light for the perfect dining experience.",
    category: "Lighting",
    author: "Sarah Johnson",
    date: "Oct 05, 2024",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800",
    comments: 20
  },
  {
    id: 6,
    title: "Maximizing Space in a Small Studio Apartment",
    excerpt: "Living small doesn't mean sacrificing style. Here are 10 pieces that do double duty for studio living.",
    category: "Small Spaces",
    author: "Michael Chen",
    date: "Sep 28, 2024",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    comments: 18
  }
];

const BlogPage = () => {
  return (
    <Layout title="Our Journal | FurNova">
      <div className="bg-[var(--background)] dark:bg-gray-950 min-h-screen pt-12 pb-24 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">Our Journal</span>
            <h1 className="text-4xl md:text-6xl font-bold dark:text-white">Design & Lifestyle</h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              Explore our latest articles on interior design, furniture trends, and sustainable living.
            </p>
          </div>

          {/* Search & Categories Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] border border-[var(--border)] shadow-sm transition-colors">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
              {['All Posts', 'Interior', 'Buying Guide', 'Sustainability', 'Trends'].map((cat) => (
                <button 
                  key={cat} 
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${cat === 'All Posts' ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:text-[var(--foreground)] dark:hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-6 py-2.5 bg-[var(--background)] dark:bg-gray-800 rounded-full border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors dark:text-white"
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full dark:text-white">
                    {post.category}
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col space-y-6">
                  <div className="flex items-center space-x-4 text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <MessageSquare size={12} />
                      <span>{post.comments} Comments</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight dark:text-white group-hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-6 border-t border-[var(--border)] mt-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center text-xs font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold dark:text-white">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.id}`} className="text-[var(--primary)] p-2 hover:bg-[var(--primary)]/10 rounded-full transition-all">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center space-x-4">
            <button className="w-12 h-12 border border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--muted)] hover:bg-white dark:hover:bg-gray-900 transition-all font-bold">1</button>
            <button className="w-12 h-12 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">2</button>
            <button className="w-12 h-12 border border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--muted)] hover:bg-white dark:hover:bg-gray-900 transition-all font-bold">3</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
