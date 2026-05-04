import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Star } from '@/components/ui/Icons';
import ProductCard from '@/components/shop/ProductCard';
import { productService, Product, Category } from '@/services/product.service';
import { useRouter } from 'next/router';

const ShopPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [total, setTotal] = useState(0);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState(5000);
  const [sort, setSort] = useState('createdAt_desc');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [router.query, selectedCategory, sort, priceRange, selectedRating]);

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number | boolean | undefined> = {
        ...(router.query as Record<string, string>),
        category: selectedCategory,
        sort,
        maxPrice: priceRange,
        search
      };
      const data = await productService.getProducts(params);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Shop | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Our Collection</span>
              <h1 className="text-4xl md:text-5xl font-bold">The Shop</h1>
              <p className="text-[var(--muted)] max-w-md">Explore our curated selection of fine furniture pieces for every corner of your home.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchProducts()}
                  className="pl-12 pr-6 py-3 bg-white border border-[var(--border)] rounded-full focus:outline-none focus:border-[var(--primary)] transition-all w-full md:w-64 shadow-sm"
                />
              </div>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-3 bg-white border border-[var(--border)] rounded-full hover:bg-gray-50 transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-12 relative">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 space-y-10 sticky top-32 h-fit">
              {/* Category Filter */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b border-[var(--border)] pb-4">Categories</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedCategory('')}
                    className={`block text-sm font-medium transition-colors ${selectedCategory === '' ? 'text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
                  >
                    All Furniture
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b border-[var(--border)] pb-4">Price Range</h3>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
                <div className="flex justify-between text-sm font-bold text-[var(--muted)]">
                  <span>$0</span>
                  <span className="text-[var(--primary)]">${priceRange}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b border-[var(--border)] pb-4">Minimum Rating</h3>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${selectedRating === star ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg' : 'bg-white border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]'}`}
                    >
                      <span className="font-bold">{star}</span>
                      <Star size={12} className="ml-0.5" fill={selectedRating === star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold border-b border-[var(--border)] pb-4">Sort By</h3>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-white border border-[var(--border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--primary)] text-sm font-medium"
                >
                  <option value="createdAt_desc">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="ratings_desc">Top Rated</option>
                  <option value="sold_desc">Best Sellers</option>
                </select>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-[var(--muted)] font-medium">
                  Showing <span className="text-[var(--foreground)] font-bold">{products.length}</span> of <span className="text-[var(--foreground)] font-bold">{total}</span> products
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl h-[450px] animate-pulse border border-[var(--border)]"></div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 space-y-4">
                  <div className="text-6xl">🏜️</div>
                  <h3 className="text-2xl font-bold">No products found</h3>
                  <p className="text-[var(--muted)]">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => { setSelectedCategory(''); setPriceRange(5000); setSearch(''); }}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 w-80 h-full bg-white z-[70] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>
              {/* Mobile filters same as desktop but stacked */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b border-[var(--border)] pb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSelectedCategory('')}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedCategory === '' ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]'}`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedCategory === cat.id ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Add price range and sort here for mobile too */}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ShopPage;
