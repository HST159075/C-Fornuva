import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ArrowRight, Truck, Package, RefreshCw, X } from '@/components/ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, OrderLineItem, orderService, orderTotalAmount, orderLineItems } from '@/services/order.service';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (orderId: string) => {
    setDetailLoading(true);
    setDetailOrder(null);
    try {
      const full = await orderService.getOrderById(orderId);
      setDetailOrder(full);
    } catch (err) {
      console.error(err);
      setDetailOrder(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetails = () => {
    setDetailOrder(null);
    setDetailLoading(false);
  };

  const lineThumbSrc = (line: OrderLineItem) => line.image || line.product?.images?.[0] || null;

  const stats = [
    { label: 'Active Orders', value: orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length.toString(), icon: <Truck size={24} />, color: 'bg-blue-500' },
    { label: 'Completed', value: orders.filter(o => o.status === 'DELIVERED').length.toString(), icon: <Package size={24} />, color: 'bg-green-500' },
    { label: 'Returns', value: '0', icon: <RefreshCw size={24} />, color: 'bg-orange-500' },
  ];

  return (
    <DashboardLayout role="USER">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold dark:text-white">My Orders</h1>
            <p className="text-[var(--muted)] font-medium">Track and manage your furniture purchases.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-[var(--border)] shadow-sm flex items-center space-x-6 transition-colors">
              <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black dark:text-white">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-[var(--border)] shadow-sm overflow-hidden transition-colors">
          <div className="p-10 flex items-center justify-between border-b border-[var(--border)]">
            <h3 className="text-xl font-bold dark:text-white">Order history</h3>
            <div className="flex space-x-2">
              <button type="button" className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-bold dark:text-white transition-colors">All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Order ID</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Date</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Items</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Total</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Order details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}><td colSpan={6} className="p-6"><div className="h-10 w-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-xl"></div></td></tr>
                  ))
                ) : orders.length > 0 ? (
                  orders.map((order) => {
                    const lines = orderLineItems(order);
                    const totalAmt = orderTotalAmount(order);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="p-6 font-bold text-sm dark:text-white">#{order.id.slice(-6).toUpperCase()}</td>
                        <td className="p-6 text-sm font-medium text-[var(--muted)]">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-6 text-sm font-medium text-[var(--muted)]">{lines.length} items</td>
                        <td className="p-6 font-bold text-sm dark:text-white">${totalAmt.toFixed(2)}</td>
                        <td className="p-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' :
                            order.status === 'PROCESSING' || order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-600' :
                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6">
                          <button
                            type="button"
                            onClick={() => openDetails(order.id)}
                            className="flex items-center space-x-2 text-sm font-bold text-[var(--primary)] hover:underline"
                          >
                            <span>View details</span>
                            <ArrowRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan={6} className="p-10 text-center text-[var(--muted)] font-medium">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(detailLoading || detailOrder) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={closeDetails}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="bg-white dark:bg-gray-900 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] border border-[var(--border)] shadow-2xl p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">Order details</p>
                  <h2 className="text-2xl font-black dark:text-white mt-1">
                    {detailOrder ? `#${detailOrder.id.slice(-6).toUpperCase()}` : 'Loading…'}
                  </h2>
                </div>
                <button type="button" onClick={closeDetails} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--muted)]" aria-label="Close">
                  <X size={22} />
                </button>
              </div>

              {detailLoading && !detailOrder ? (
                <div className="space-y-3 py-8">
                  <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
                  <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
                </div>
              ) : detailOrder ? (
                <>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[var(--muted)] font-bold uppercase text-[10px] tracking-wider">Date</p>
                      <p className="font-bold dark:text-white">{new Date(detailOrder.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[var(--muted)] font-bold uppercase text-[10px] tracking-wider">Payment</p>
                      <p className="font-bold dark:text-white">{detailOrder.paymentMethod}{detailOrder.isPaid ? ' • Paid' : ''}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[var(--muted)] font-bold uppercase text-[10px] tracking-wider">Status</p>
                      <span className="inline-block mt-1 px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {detailOrder.status}
                      </span>
                    </div>
                    {detailOrder.trackingNumber && (
                      <div className="col-span-2">
                        <p className="text-[var(--muted)] font-bold uppercase text-[10px] tracking-wider">Tracking</p>
                        <p className="font-bold dark:text-white">{detailOrder.trackingNumber}</p>
                      </div>
                    )}
                  </div>

                  <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Items</p>
                    <ul className="divide-y divide-[var(--border)]">
                      {orderLineItems(detailOrder).map((line) => (
                        <li key={line.id} className="flex gap-4 p-4">
                          {lineThumbSrc(line) ? (
                            <img
                              src={lineThumbSrc(line)!}
                              alt=""
                              className="w-14 h-14 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center text-[10px] font-bold text-[var(--muted)]">IMG</div>
                          )}
                          <div className="min-w-0 flex-grow">
                            <p className="font-bold dark:text-white text-sm truncate">{line.name}</p>
                            <p className="text-xs text-[var(--muted)]">Qty {line.quantity} × ${Number(line.price).toFixed(2)}</p>
                          </div>
                          <p className="font-bold text-sm dark:text-white shrink-0">${(Number(line.price) * line.quantity).toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(detailOrder.shippingStreet || detailOrder.shippingCity) && (
                    <div>
                      <p className="text-[var(--muted)] font-bold uppercase text-[10px] tracking-wider mb-2">Shipping address</p>
                      <p className="text-sm dark:text-white leading-relaxed">
                        {[detailOrder.shippingName, detailOrder.shippingStreet, detailOrder.shippingCity, detailOrder.shippingState, detailOrder.shippingZip, detailOrder.shippingCountry]
                          .filter(Boolean)
                          .join(', ')}
                        {detailOrder.shippingPhone && (
                          <>
                            <br />
                            <span className="text-[var(--muted)]">{detailOrder.shippingPhone}</span>
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 text-sm border-t border-[var(--border)] pt-4">
                    {detailOrder.itemsPrice != null && (
                      <div className="flex justify-between text-[var(--muted)]"><span>Subtotal</span><span className="dark:text-white">${Number(detailOrder.itemsPrice).toFixed(2)}</span></div>
                    )}
                    {detailOrder.shippingPrice != null && (
                      <div className="flex justify-between text-[var(--muted)]"><span>Shipping</span><span className="dark:text-white">${Number(detailOrder.shippingPrice).toFixed(2)}</span></div>
                    )}
                    {detailOrder.taxPrice != null && (
                      <div className="flex justify-between text-[var(--muted)]"><span>Tax</span><span className="dark:text-white">${Number(detailOrder.taxPrice).toFixed(2)}</span></div>
                    )}
                    <div className="flex justify-between font-black text-lg dark:text-white pt-2"><span>Total</span><span>${orderTotalAmount(detailOrder).toFixed(2)}</span></div>
                  </div>

                  {detailOrder.notes && (
                    <div>
                      <p className="text-[var(--muted)] font-bold uppercase text-[10px] tracking-wider mb-1">Notes</p>
                      <p className="text-sm dark:text-white">{detailOrder.notes}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-red-500 font-medium py-8">Could not load order details.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default UserOrdersPage;
