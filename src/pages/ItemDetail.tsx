import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Tag,
  ArrowLeft,
  MessageSquare,
  Shield,
  Share2,
  Heart,
  Sparkles,
  CheckCircle,
  AlertCircle,

} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { ItemCard } from '../components/UI/ItemCard';

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items, isAuthenticated, login } = useStore();
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimProof, setClaimProof] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-surface pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Item Not Found</h2>
          <p className="text-muted mb-4">The item you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse" className="btn-primary px-6 py-3 rounded-xl text-white">
            Browse Items
          </Link>
        </div>
      </div>
    );
  }

  const statusClasses = {
    lost: 'status-lost',
    found: 'status-found',
    matched: 'status-matched',
    claimed: 'status-matched',
    returned: 'status-returned',
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const similarItems = items
    .filter((i) => i.id !== item.id && i.category === item.category)
    .slice(0, 3);

  const handleClaim = () => {
    if (!isAuthenticated) {
      login({
        id: '1',
        name: 'Demo User',
        email: 'demo@findit.com',
        role: 'user',
        points: 100,
        badges: [],
        createdAt: new Date(),
      });
    }
    setShowClaimModal(true);
  };

  const submitClaim = () => {
    setClaimSubmitted(true);
    setTimeout(() => {
      setShowClaimModal(false);
      setClaimSubmitted(false);
      setClaimProof('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
            >
              {/* Image Gallery */}
              <div className="relative h-64 sm:h-96">
                <img
                  src={item.images[0] || 'https://via.placeholder.com/800x400'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusClasses[item.status]}`}>
                    {t(item.status)}
                  </span>
                </div>
                {item.matchScore && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-warning text-white text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    {item.matchScore}% Match Found
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {item.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {t(item.category as any)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors">
                      <Heart className="w-5 h-5 text-muted" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors">
                      <Share2 className="w-5 h-5 text-muted" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{item.location.name}</span>
                </div>

                <div className="border-t border-border pt-6">
                  <h2 className="font-semibold text-lg text-foreground mb-3">Description</h2>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>

                {/* Reporter Info */}
                <div className="border-t border-border mt-6 pt-6">
                  <h2 className="font-semibold text-lg text-foreground mb-4">Reported By</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.userAvatar || 'https://i.pravatar.cc/150'}
                      alt={item.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{item.userName}</p>
                      <p className="text-sm text-muted">Reported on {formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border"
            >
              <h3 className="font-semibold text-lg text-foreground mb-4">Actions</h3>
              <div className="space-y-3">
                {item.type === 'found' && (
                  <button
                    onClick={handleClaim}
                    className="w-full btn-primary py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    {t('claimItem')}
                  </button>
                )}
                <button className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {t('contactFinder')}
                </button>
              </div>
            </motion.div>

            {/* Location Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted">Location: {item.location.name}</p>
                </div>
              </div>
              <div className="p-4">
                <Link
                  to="/map"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View on Map →
                </Link>
              </div>
            </motion.div>

            {/* Safety Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/5 rounded-2xl p-6 border border-primary/10"
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Safety Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  Meet in public places
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  Verify ownership before handover
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  Use in-app chat for communication
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Similar Items */}
        {similarItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarItems.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            {claimSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t('claimSuccess')}</h3>
                <p className="text-muted">We'll verify your claim and get back to you soon.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground mb-4">Claim This Item</h3>
                <p className="text-muted mb-6">
                  Please provide proof of ownership to claim this item. Describe unique features or contents that only the owner would know.
                </p>
                <textarea
                  value={claimProof}
                  onChange={(e) => setClaimProof(e.target.value)}
                  placeholder="Describe proof of ownership..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClaimModal(false)}
                    className="flex-1 py-3 rounded-xl border border-border text-muted font-medium hover:bg-surface-alt transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitClaim}
                    disabled={!claimProof.trim()}
                    className="flex-1 btn-primary py-3 rounded-xl text-white font-medium disabled:opacity-50"
                  >
                    Submit Claim
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
