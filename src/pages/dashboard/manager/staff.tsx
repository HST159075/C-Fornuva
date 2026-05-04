import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, ArrowRight, Mail } from '@/components/ui/Icons';
import { userService, User } from '@/services/user.service';

const ManagerStaffPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      // For manager, maybe only show non-admin staff? Or all users if that's the requirement
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="MANAGER">
      <div className="space-y-10 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold dark:text-white">Team Management</h1>
            <p className="text-[var(--muted)] font-medium">Manage staff access and roles.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden transition-colors">
          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border)]">
            <h3 className="text-xl font-bold dark:text-white">All Personnel</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-2.5 flex items-center space-x-3 w-80">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search by name, email..." className="bg-transparent border-none text-sm w-full dark:text-white focus:outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Personnel</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Role</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Joined Date</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}><td colSpan={5} className="p-6"><div className="h-12 w-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl"></div></td></tr>
                  ))
                ) : users.length > 0 ? (
                  users.map((u, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[var(--primary)]/10 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-[var(--primary)]">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold dark:text-white">{u.name}</p>
                            <p className="text-xs text-[var(--muted)]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-6 text-sm font-medium text-[var(--muted)]">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-6">
                        <div className="flex items-center space-x-2 text-green-500 font-bold text-xs uppercase tracking-tighter">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Active</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <button className="p-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"><Mail size={18} /></button>
                          <button className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors"><ArrowRight size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-10 text-center text-[var(--muted)] font-medium">No personnel found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerStaffPage;
