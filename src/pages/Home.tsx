import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Shield,

  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { SearchBar } from '../components/UI/SearchBar';
import { ItemCard } from '../components/UI/ItemCard';
import { StatsCard } from '../components/UI/StatsCard';

export const Home = () => {
  const { t } = useTranslation();
  const { items } = useStore();

  const recentItems = items.slice(0, 6);

  const stats = [
    { icon: Search, value: '12,450+', label: t('itemsReported'), color: 'bg-primary' },
    { icon: CheckCircle, value: '8,320+', label: t('itemsReturned'), color: 'bg-success' },
    { icon: Users, value: '25,000+', label: t('happyUsers'), color: 'bg-info' },
    { icon: TrendingUp, value: '67%', label: t('recoveryRate'), color: 'bg-warning' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system automatically matches lost items with found reports using image recognition and text analysis.',
    },
    {
      icon: MapPin,
      title: 'Location-Based Search',
      description: 'Find items near you with our interactive map. See hotspots and track items across locations.',
    },
    {
      icon: Shield,
      title: 'Secure Verification',
      description: 'Multi-step claim verification with OTP and ID proof ensures items reach their rightful owners.',
    },
    {
      icon: Award,
      title: 'Rewards & Recognition',
      description: 'Earn points and badges for helping others. Climb the leaderboard and become a community hero.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Lost & Found Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t('heroTitle')}{' '}
              <span className="text-primary">{t('heroSubtitle')}</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              {t('heroDescription')}
            </p>

            {/* Search Bar */}
            <SearchBar />

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                to="/report/lost"
                className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {t('iLostSomething')}
              </Link>
              <Link
                to="/report/found"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                {t('iFoundSomething')}
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, index) => (
              <StatsCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Recent Items</h2>
              <p className="text-muted mt-1">Latest lost and found reports from the community</p>
            </div>
            <Link
              to="/browse"
              className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              {t('viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item, index) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              {t('viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Why Choose FindIt?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with community-driven efforts to maximize item recovery rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Get started in minutes. Our simple process makes reporting and finding items effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Report Your Item',
                description: 'Fill out a simple form with details about your lost or found item. Add photos and location.',
              },
              {
                step: '02',
                title: 'AI Finds Matches',
                description: 'Our intelligent system scans the database and finds potential matches based on your description.',
              },
              {
                step: '03',
                title: 'Connect & Recover',
                description: 'Verify ownership through our secure process and arrange to get your item back.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full">
                  <span className="text-6xl font-bold text-primary/10">{item.step}</span>
                  <h3 className="font-semibold text-xl text-foreground mt-4 mb-2">{item.title}</h3>
                  <p className="text-muted">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-primary">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>
            <div className="relative text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Find What You've Lost?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of users who have successfully recovered their belongings through FindIt.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/browse"
                  className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Browse Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
