'use client';

import { useState, useEffect } from 'react';
import { AdminProtected } from '@/components/AdminProtected';

const API_BASE_URL = 'http://localhost:8000';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockItems: number;
  newUsersThisWeek: number;
}

interface RecentOrder {
  id: string;
  order_id: string;
  customer: string;
  email: string;
  total: number;
  status: string;
  date: string;
}

function AdminDashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      const [usersRes, ordersRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/userauth/api/users/`, {
          headers: { 'Authorization': `Token ${token}` },
        }),
        fetch(`${API_BASE_URL}/cart/api/orders/`, {
          headers: { 'Authorization': `Token ${token}` },
        }),
        fetch(`${API_BASE_URL}/shop/api/`, {
          headers: { 'Authorization': `Token ${token}` },
        }),
      ]);

      const usersData = await usersRes.json();
      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();

      const stats: DashboardStats = {
        totalUsers: usersData.count || 0,
        totalOrders: ordersData.count || 0,
        totalProducts: productsData.count || 0,
        totalRevenue: ordersData.results?.reduce((sum: number, order: Record<string, unknown>) => sum + ((order.payment_amount as number) || 0), 0) || 0,
        pendingOrders: ordersData.results?.filter((o: Record<string, unknown>) => o.status === 'pending').length || 0,
        lowStockItems: 1,
        newUsersThisWeek: 0,
      };

      setStats(stats);

      const recent = ordersData.results?.slice(0, 5).map((order: Record<string, unknown>) => ({
        id: order.id,
        order_id: order.order_id || `#NW${order.id}`,
        customer: (order.delivery as Record<string, unknown>)?.first_name || 'Unknown',
        email: (order.delivery as Record<string, unknown>)?.email || 'N/A',
        total: (order.payment_amount as number) || 0,
        status: (order.status as string) || 'pending',
        date: new Date(order.created_at as string).toLocaleDateString(),
      })) || [];

      setRecentOrders(recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('auth_token');
  //   router.push('/admin/login');
  // };

  return (
    <AdminProtected>
      <>
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium">Products</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <p className="text-gray-600 text-sm font-medium">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">NPR {stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Order</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm font-medium">{order.order_id}</td>
                        <td className="py-3 px-4 text-sm">{order.customer}</td>
                        <td className="py-3 px-4 text-sm">NPR {order.total.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </>
    </AdminProtected>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtected>
      <AdminDashboardContent />
    </AdminProtected>
  );
}
