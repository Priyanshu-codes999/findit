import { useState } from 'react';
import { motion } from 'framer-motion';
import {

  Mail,
  Phone,
  MapPin,

  Award,
  Package,
  CheckCircle,
  Edit2,
  Camera,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { ItemCard } from '../components/UI/ItemCard';

export const Profile = () => {
  const { t } = useTranslation();
  const { user, items, isAuthenticated, login } = useStore();
  const [activeTab, setActiveTab] = useState<'items' | 'activity'>('items');

  // Auto-login for demo
  if (!isAuthenticated) {
    login({
      id: '1',
      name: 'Demo User',
      email: 'demo@findit.com',
      phone: '+91 98765 43210',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'user',
      points: 350,
      badges: [
        { id: '1', name: 'Honest Finder', icon: '🏅', description: 'Returned 5+ items', earnedAt: new Date() },
        { id: '2', name: 'Super Helper', icon: '⭐', description: 'Helped 10+ people', earnedAt: new Date() },
        { id: '3', name: 'Quick Responder', icon: '⚡', description: 'Fast responses', earnedAt: new Date() },
      ],
      createdAt: new Date('2023-06-15'),
    });
  }

  const userItems = items.filter((item) => item.userId === user?.id || item.userId === '1').slice(0, 4);

  const stats = [
    { icon: Package, label: 'Items Reported', value: 12 },
    { icon: CheckCircle, label: 'Items Returned', value: 8 },
    { icon: Star, label: 'Points Earned', value: user?.points || 350 },
    { icon: Award, label: 'Badges', value: user?.badges?.length || 3 },
  ];

  const activities = [
    { action: 'Reported a found wallet', time: '2 hours ago', type: 'found' },
    { action: 'Claimed iPhone successfully returned', time: '1 day ago', type: 'returned' },
    { action: 'Earned "Super Helper" badge', time: '3 days ago', type: 'badge' },
    { action: 'Reported lost laptop', time: '1 week ago', type: 'lost' },
    { action: 'Helped verify a claim', time: '1 week ago', type: 'verify' },
  ];

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden mb-8"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary to-primary-dark relative">
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-lg shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">{user?.name || 'Demo User'}</h1>
                <p className="text-muted">Member since {new Date(user?.createdAt || '2023-06-15').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
              </div>
              <button className="px-4 py-2 border border-border rounded-xl hover:bg-surface-alt transition-colors flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email || 'demo@findit.com'}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {user?.phone || '+91 98765 43210'}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </span>
            </div>

            {/* Badges */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted mb-3">{t('badges')}</h3>
              <div className="flex flex-wrap gap-2">
                {user?.badges?.map((badge) => (
                  <span
                    key={badge.id}
                    className="px-3 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary flex items-center gap-1"
                  >
                    <span>{badge.icon}</span>
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'items'
                ? 'bg-primary text-white'
                : 'bg-white text-muted hover:bg-surface-alt'
            }`}
          >
            My Items
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-primary text-white'
                : 'bg-white text-muted hover:bg-surface-alt'
            }`}
          >
            Activity
          </button>
        </div>

        {/* Content */}
        {activeTab === 'items' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {userItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {userItems.map((item, index) => (
                  <ItemCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-border">
                <Package className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No items yet</h3>
                <p className="text-muted">Start by reporting a lost or found item</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
          >
            <div className="divide-y divide-border">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'found' ? 'bg-success/10 text-success' :
                    activity.type === 'lost' ? 'bg-error/10 text-error' :
                    activity.type === 'returned' ? 'bg-info/10 text-info' :
                    activity.type === 'badge' ? 'bg-warning/10 text-warning' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {activity.type === 'found' ? <Package className="w-5 h-5" /> :
                     activity.type === 'lost' ? <Package className="w-5 h-5" /> :
                     activity.type === 'returned' ? <CheckCircle className="w-5 h-5" /> :
                     activity.type === 'badge' ? <Award className="w-5 h-5" /> :
                     <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
