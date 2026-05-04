import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { RefreshCw, ArrowRight } from '@/components/ui/Icons';

const inventoryData = [
  { id: '#SKU-1001', name: 'Velvet Sofa', category: 'Living Room', stock: 15, status: 'In Stock' },
  { id: '#SKU-1002', name: 'Marble Table', category: 'Living Room', stock: 8, status: 'Low Stock' },
  { id: '#SKU-1003', name: 'Oak Bed Frame', category: 'Bedroom', stock: 6, status: 'Low Stock' },
  { id: '#SKU-1004', name: 'Desk Chair', category: 'Office', stock: 0, status: 'Out of Stock' },
];

const ManagerInventoryPage = () => {
  return (
    <DashboardLayout role="MANAGER">
      <div className="space-y-10 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold dark:text-white">Store Inventory</h1>
            <p className="text-[var(--muted)] font-medium">Monitor and manage local warehouse stock.</p>
          </div>
          <button className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] transition-all">
            <RefreshCw size={24} />
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden transition-colors">
          <div className="p-10 flex items-center justify-between border-b border-[var(--border)]">
            <h3 className="text-xl font-bold dark:text-white">Current Stock Levels</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">SKU ID</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Item Name</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Stock</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {inventoryData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="p-6 font-bold text-sm dark:text-white">{item.id}</td>
                    <td className="p-6 text-sm font-medium text-[var(--muted)]">{item.name}</td>
                    <td className="p-6 font-bold text-sm dark:text-white">{item.stock} Units</td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-600' : 
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <button className="flex items-center space-x-2 text-sm font-bold text-[var(--primary)] hover:underline">
                        <span>Restock</span>
                        <ArrowRight size={16} />
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

export default ManagerInventoryPage;
