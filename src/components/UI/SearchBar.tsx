import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../hooks/useTranslation';
import type { ItemCategory, ItemStatus } from '../../types';

export const SearchBar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { searchQuery, setSearchQuery, filters, setFilters } = useStore();
  const { t } = useTranslation();

  const categories: ItemCategory[] = ['electronics', 'documents', 'accessories', 'bags', 'clothing', 'keys', 'wallet', 'other'];
  const statuses: ItemStatus[] = ['lost', 'found', 'matched', 'claimed', 'returned'];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-12 pr-24 py-4 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 hover:bg-surface-alt rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-primary text-white' : 'hover:bg-surface-alt text-muted'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-white rounded-2xl border border-border shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Type</label>
                <div className="flex gap-2">
                  {['all', 'lost', 'found'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters({ type: type as any })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filters.type === type
                          ? 'bg-primary text-white'
                          : 'bg-surface-alt text-muted hover:bg-surface'
                      }`}
                    >
                      {type === 'all' ? 'All' : t(type as any)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-muted mb-2">{t('category')}</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{t(cat as any)}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{t(status as any)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({ category: 'all', status: 'all', type: 'all' })}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
