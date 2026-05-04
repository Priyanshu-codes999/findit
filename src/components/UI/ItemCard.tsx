import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Item } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

interface ItemCardProps {
  item: Item;
  index?: number;
}

export const ItemCard = ({ item, index = 0 }: ItemCardProps) => {
  const { t } = useTranslation();

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
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="item-card bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[item.status]}`}>
            {t(item.status)}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-foreground">
            {t(item.category as any)}
          </span>
        </div>
        {item.matchScore && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-warning/90 text-white text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            {item.matchScore}% Match
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{item.location.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(item.date)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <img
              src={item.userAvatar || 'https://i.pravatar.cc/150'}
              alt={item.userName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{item.userName}</span>
          </div>
          <Link
            to={`/item/${item.id}`}
            className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
          >
            View <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
