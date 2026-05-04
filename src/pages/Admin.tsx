import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  CheckCircle,
  AlertTriangle,

  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  Check,
  X,
  Shield,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';

export const Admin = () => {
  const { t } = useTranslation();
  const { items, isAuthenticated, user, login } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'claims' | 'users'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-login as admin for demo
  if (!isAuthenticated || user?.role !== 'admin') {
    login({
      id: '1',
      name: 'Admin User',
      email: 'admin@findit.com',
      role: 'admin',
      points: 500,
      badges: [],
      createdAt: new Date(),
    });
  }

  const stats = [
    { icon: Package, label: 'Total Items', value: '12,450', change: '+12%', color: 'bg-primary' },
    { icon: CheckCircle, label: 'Items Returned', value: '8,320', change: '+8%', color: 'bg-success' },
    { icon: Users, label: 'Active Users', value: '25,430', change: '+15%', color: 'bg-info' },
    { icon: AlertTriangle, label: 'Pending Claims', value: '156', change: '-5%', color: 'bg-warning' },
  ];

  const pendingClaims = [
    { id: '1', item: 'iPhone 15 Pro Max', claimant: 'Amit Kumar', date: '2024-01-18', status: 'pending' },
    { id: '2', item: 'Brown Leather Wallet', claimant: 'Rahul Verma', date: '2024-01-17', status: 'pending' },
    { id: '3', item: 'MacBook Pro 14"', claimant: 'Sneha Patel', date: '2024-01-16', status: 'pending' },
  ];

  const recentUsers = [
    { id: '1', name: 'Priya Sharma', email: 'priya@email.com', items: 5, status: 'active' },
    { id: '2', name: 'Vikram Singh', email: 'vikram@email.com', items: 3, status: 'active' },
    { id: '3', name: 'Meera Joshi', email: 'meera@email.com', items: 7, status: 'flagged' },
  ];

  return (
    <div className="min-h-screen bg-surface pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <p className="text-muted">Manage items, verify claims, and monitor platform activity</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'items', label: 'Items', icon: Package },
            { id: 'claims', label: 'Claims', icon: CheckCircle },
            { id: 'users', label: 'Users', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted hover:bg-surface-alt'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-error'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-muted text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Recovery Rate Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border"
              >
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recovery Rate Trend
                </h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[65, 72, 68, 75, 80, 78, 85, 82, 88, 85, 90, 87].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/30"
                        style={{ height: `${value}%` }}
                      >
                        <div
                          className="w-full bg-primary rounded-t-lg"
                          style={{ height: `${value}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Category Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border"
              >
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Items by Category
                </h3>
                <div className="space-y-3">
                  {[
                    { category: 'Electronics', count: 4520, percentage: 36, color: 'bg-primary' },
                    { category: 'Documents', count: 2890, percentage: 23, color: 'bg-info' },
                    { category: 'Accessories', count: 2100, percentage: 17, color: 'bg-warning' },
                    { category: 'Bags', count: 1560, percentage: 13, color: 'bg-success' },
                    { category: 'Others', count: 1380, percentage: 11, color: 'bg-muted' },
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{item.category}</span>
                        <span className="text-sm text-muted">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Claims */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Pending Claims</h3>
                  <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full font-medium">
                    {pendingClaims.length} pending
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {pendingClaims.map((claim) => (
                    <div key={claim.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{claim.item}</p>
                        <p className="text-sm text-muted">by {claim.claimant} • {claim.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-success/10 text-success rounded-lg transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Recent Users</h3>
                </div>
                <div className="divide-y divide-border">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium">{user.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted">{user.items} items</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
          >
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-alt transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-alt">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Item</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-alt/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0] || 'https://via.placeholder.com/40'}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-foreground line-clamp-1">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{t(item.category as any)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'lost' ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
                        }`}>
                          {t(item.type)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'returned' ? 'bg-info/10 text-info' :
                          item.status === 'matched' ? 'bg-warning/10 text-warning' :
                          'bg-muted/10 text-muted'
                        }`}>
                          {t(item.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-surface-alt rounded">
                            <Eye className="w-4 h-4 text-muted" />
                          </button>
                          <button className="p-1 hover:bg-surface-alt rounded">
                            <MoreVertical className="w-4 h-4 text-muted" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Claim Verification Queue</h3>
            </div>
            <div className="divide-y divide-border">
              {pendingClaims.map((claim) => (
                <div key={claim.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{claim.item}</h4>
                      <p className="text-sm text-muted">Claimed by {claim.claimant} on {claim.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                      Pending Verification
                    </span>
                  </div>
                  <div className="bg-surface rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted mb-2">Proof of ownership:</p>
                    <p className="text-foreground">"The wallet has my initials 'AK' embossed inside and contains my gym membership card."</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-success text-white rounded-lg font-medium hover:bg-success/90 transition-colors flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Approve Claim
                    </button>
                    <button className="flex-1 py-2 bg-error text-white rounded-lg font-medium hover:bg-error/90 transition-colors flex items-center justify-center gap-2">
                      <X className="w-4 h-4" />
                      Reject Claim
                    </button>
                    <button className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-surface-alt transition-colors">
                      Request More Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
          >
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-alt">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Points</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-surface-alt/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium">{user.name[0]}</span>
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{user.items}</td>
                      <td className="px-4 py-3 text-sm text-foreground">150</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-surface-alt rounded" title="View">
                            <Eye className="w-4 h-4 text-muted" />
                          </button>
                          <button className="p-1 hover:bg-error/10 rounded" title="Ban">
                            <Ban className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
