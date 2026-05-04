import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const AdminSettingsPage = () => {
  return (
    <DashboardLayout role="ADMIN">
      <div className="max-w-4xl space-y-10 pb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold dark:text-white">Site Settings</h1>
          <p className="text-[var(--muted)] font-medium">Configure global platform parameters and security.</p>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden p-10 transition-colors">
            <h3 className="text-xl font-bold dark:text-white mb-8 border-b border-[var(--border)] pb-4">General Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest px-2">Store Name</label>
                  <input type="text" defaultValue="FurNova Premium Furniture" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold dark:text-white focus:ring-2 ring-[var(--primary)] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest px-2">Support Email</label>
                  <input type="email" defaultValue="support@furnova.com" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm font-bold dark:text-white focus:ring-2 ring-[var(--primary)] transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest px-2">Meta Description</label>
                <textarea rows={3} defaultValue="Luxury and modern furniture for premium homes." className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-[2rem] px-6 py-4 text-sm font-medium dark:text-white focus:ring-2 ring-[var(--primary)] transition-all" />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden p-10 transition-colors">
            <h3 className="text-xl font-bold dark:text-white mb-8 border-b border-[var(--border)] pb-4">Security & Authentication</h3>
            <div className="space-y-6">
              {[
                { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to admin accounts.', enabled: true },
                { label: 'Automatic Data Backups', desc: 'Daily snapshots of the database stored on secure S3 buckets.', enabled: true },
                { label: 'Maintenance Mode', desc: 'Temporarily disable the storefront for scheduled updates.', enabled: false },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold dark:text-white">{item.label}</p>
                    <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                  </div>
                  <div className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${item.enabled ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary !px-12 !py-4 shadow-xl shadow-[var(--primary)]/20">Save All Changes</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettingsPage;
