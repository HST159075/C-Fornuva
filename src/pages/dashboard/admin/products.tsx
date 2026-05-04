import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Package, Search, Plus, ArrowRight, Star } from '@/components/ui/Icons';
import { productService, Product } from '@/services/product.service';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts({ limit: 100 });
      setProducts(data.products);
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
            <h1 className="text-3xl font-bold dark:text-white">Product Management</h1>
            <p className="text-[var(--muted)] font-medium">Manage your furniture catalog and inventory.</p>
          </div>
          <button className="btn-primary flex items-center space-x-3 !py-3 !px-8">
            <Plus size={20} />
            <span>Add New Product</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden transition-colors">
          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border)]">
            <h3 className="text-xl font-bold dark:text-white">Catalog List</h3>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-2.5 flex items-center space-x-3 w-80">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Search product name, SKU..." className="bg-transparent border-none text-sm w-full dark:text-white focus:outline-none" />
              </div>
              <button className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                <Package size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Product</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Category</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Price</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Stock</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Rating</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}><td colSpan={6} className="p-6"><div className="h-12 w-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl"></div></td></tr>
                  ))
                ) : products.length > 0 ? (
                  products.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold dark:text-white">{p.name}</p>
                            <p className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-widest">#{p.id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-medium text-[var(--muted)]">{p.category?.name}</td>
                      <td className="p-6 font-bold text-sm dark:text-white">${Number(p.price).toFixed(2)}</td>
                      <td className="p-6">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-bold dark:text-white">{p.stock} units</span>
                          <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${p.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(p.stock * 2, 100)}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-1.5 text-yellow-500 font-bold text-sm">
                          <Star size={14} fill="currentColor" />
                          <span>{p.ratings}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <ArrowRight size={18} className="text-[var(--muted)]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="p-10 text-center text-[var(--muted)] font-medium">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProductsPage;
