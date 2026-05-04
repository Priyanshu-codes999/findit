import { motion } from 'framer-motion';
import {
  Trophy,

  Award,

  TrendingUp,
  Crown,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Leaderboard = () => {
  const { t } = useTranslation();

  const topUsers = [
    {
      rank: 1,
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=5',
      points: 2450,
      itemsReturned: 28,
      badges: ['🏆', '⭐', '🏅'],
    },
    {
      rank: 2,
      name: 'Rahul Verma',
      avatar: 'https://i.pravatar.cc/150?img=12',
      points: 2120,
      itemsReturned: 24,
      badges: ['🥈', '⭐'],
    },
    {
      rank: 3,
      name: 'Sneha Patel',
      avatar: 'https://i.pravatar.cc/150?img=9',
      points: 1890,
      itemsReturned: 21,
      badges: ['🥉', '🌟'],
    },
  ];

  const leaderboardData = [
    { rank: 4, name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=15', points: 1650, itemsReturned: 18 },
    { rank: 5, name: 'Meera Joshi', avatar: 'https://i.pravatar.cc/150?img=16', points: 1420, itemsReturned: 15 },
    { rank: 6, name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?img=11', points: 1280, itemsReturned: 14 },
    { rank: 7, name: 'Neha Gupta', avatar: 'https://i.pravatar.cc/150?img=20', points: 1150, itemsReturned: 12 },
    { rank: 8, name: 'Arjun Reddy', avatar: 'https://i.pravatar.cc/150?img=33', points: 980, itemsReturned: 10 },
    { rank: 9, name: 'Kavita Rao', avatar: 'https://i.pravatar.cc/150?img=25', points: 870, itemsReturned: 9 },
    { rank: 10, name: 'Sanjay Mehta', avatar: 'https://i.pravatar.cc/150?img=53', points: 750, itemsReturned: 8 },
  ];

  const badges = [
    { id: '1', name: t('honestFinder'), icon: '🏅', description: 'Returned 5+ items', color: 'bg-yellow-100' },
    { id: '2', name: t('superHelper'), icon: '⭐', description: 'Helped 10+ people', color: 'bg-blue-100' },
    { id: '3', name: t('communityHero'), icon: '🦸', description: 'Top contributor', color: 'bg-purple-100' },
    { id: '4', name: 'Quick Responder', icon: '⚡', description: 'Responds within 1 hour', color: 'bg-orange-100' },
    { id: '5', name: 'Verified Member', icon: '✅', description: 'ID verified', color: 'bg-green-100' },
    { id: '6', name: 'Early Adopter', icon: '🚀', description: 'Joined in first month', color: 'bg-pink-100' },
  ];

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Community Heroes
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('leaderboard')}
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Celebrating our most helpful community members who go above and beyond to reunite people with their belongings.
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="relative mb-4">
              <img
                src={topUsers[1].avatar}
                alt={topUsers[1].name}
                className="w-20 h-20 rounded-full border-4 border-gray-300 mx-auto"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
            </div>
            <div className="bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-2xl p-4 h-32 flex flex-col justify-end">
              <p className="font-semibold text-foreground text-sm">{topUsers[1].name}</p>
              <p className="text-primary font-bold">{topUsers[1].points} pts</p>
              <div className="flex justify-center gap-1 mt-1">
                {topUsers[1].badges.map((badge, i) => (
                  <span key={i} className="text-lg">{badge}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="relative mb-4">
              <Crown className="w-8 h-8 text-yellow-500 absolute -top-8 left-1/2 -translate-x-1/2" />
              <img
                src={topUsers[0].avatar}
                alt={topUsers[0].name}
                className="w-24 h-24 rounded-full border-4 border-yellow-400 mx-auto"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
            </div>
            <div className="bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-t-2xl p-4 h-40 flex flex-col justify-end">
              <p className="font-bold text-foreground">{topUsers[0].name}</p>
              <p className="text-primary font-bold text-lg">{topUsers[0].points} pts</p>
              <div className="flex justify-center gap-1 mt-1">
                {topUsers[0].badges.map((badge, i) => (
                  <span key={i} className="text-xl">{badge}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="relative mb-4">
              <img
                src={topUsers[2].avatar}
                alt={topUsers[2].name}
                className="w-20 h-20 rounded-full border-4 border-amber-600 mx-auto"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
            </div>
            <div className="bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-2xl p-4 h-24 flex flex-col justify-end">
              <p className="font-semibold text-foreground text-sm">{topUsers[2].name}</p>
              <p className="text-primary font-bold">{topUsers[2].points} pts</p>
              <div className="flex justify-center gap-1 mt-1">
                {topUsers[2].badges.map((badge, i) => (
                  <span key={i} className="text-lg">{badge}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard Table */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Top Contributors
                </h2>
                <select className="px-3 py-1 rounded-lg border border-border text-sm">
                  <option>This Month</option>
                  <option>All Time</option>
                  <option>This Week</option>
                </select>
              </div>
              <div className="divide-y divide-border">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 flex items-center gap-4 hover:bg-surface-alt/50 transition-colors"
                  >
                    <span className="w-8 text-center font-bold text-muted">{user.rank}</span>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted">{user.itemsReturned} items returned</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.points}</p>
                      <p className="text-xs text-muted">points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Badges Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-border p-6"
            >
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                {t('badges')}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`${badge.color} rounded-xl p-3 text-center`}
                  >
                    <span className="text-2xl mb-1 block">{badge.icon}</span>
                    <p className="font-medium text-foreground text-sm">{badge.name}</p>
                    <p className="text-xs text-muted">{badge.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How to Earn Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 mt-6 text-white"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                How to Earn Points
              </h3>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+50</span>
                  Return a found item
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+20</span>
                  Report a found item
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+10</span>
                  Help verify a claim
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">+5</span>
                  Daily login bonus
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
