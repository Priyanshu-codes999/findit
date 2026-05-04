import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { SearchBar } from '../components/UI/SearchBar';
import { ItemCard } from '../components/UI/ItemCard';

export const Browse = () => {
  const { t } = useTranslation();
  const { items, searchQuery, filters } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Type filter
      if (filters.type !== 'all' && item.type !== filters.type) return false;

      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) return false;

      // Status filter
      if (filters.status !== 'all' && item.status !== filters.status) return false;

      return true;
    });
  }, [items, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('browse')}</h1>
          <p className="text-muted">Search through all reported lost and found items</p>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted">
            Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> items
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-muted hover:bg-surface-alt'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-muted hover:bg-surface-alt'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}>
            {filteredItems.map((item, index) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('noItemsFound')}</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
