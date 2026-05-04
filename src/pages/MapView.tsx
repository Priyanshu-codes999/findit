import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, List, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';

export const MapView = () => {
  const { t } = useTranslation();
  const { items } = useStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');

  const filteredItems = useMemo(() => {
    if (filterType === 'all') return items;
    return items.filter((item) => item.type === filterType);
  }, [items, filterType]);

  const selectedItemData = items.find((i) => i.id === selectedItem);

  // Generate random positions for demo
  const getPosition = (index: number) => {
    const positions = [
      { top: '20%', left: '30%' },
      { top: '35%', left: '55%' },
      { top: '50%', left: '25%' },
      { top: '45%', left: '70%' },
      { top: '65%', left: '40%' },
      { top: '30%', left: '80%' },
      { top: '70%', left: '60%' },
      { top: '25%', left: '45%' },
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="min-h-screen bg-surface pt-16">
      <div className="h-[calc(100vh-4rem)] relative">
        {/* Map Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* City Labels */}
          <div className="absolute top-1/4 left-1/4 text-muted/50 text-sm font-medium">Central Station</div>
          <div className="absolute top-1/3 right-1/4 text-muted/50 text-sm font-medium">Airport</div>
          <div className="absolute bottom-1/3 left-1/3 text-muted/50 text-sm font-medium">University</div>
          <div className="absolute bottom-1/4 right-1/3 text-muted/50 text-sm font-medium">Shopping Mall</div>

          {/* Item Markers */}
          {filteredItems.map((item, index) => {
            const pos = getPosition(index);
            return (
              <motion.button
                key={item.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedItem(item.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                  selectedItem === item.id ? 'z-20' : ''
                }`}
                style={{ top: pos.top, left: pos.left }}
              >
                <div className={`relative ${
                  selectedItem === item.id ? 'pulse-ring' : ''
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    item.type === 'lost' ? 'bg-error' : 'bg-success'
                  } text-white`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {/* Filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'all' ? 'bg-primary text-white' : 'text-muted hover:bg-surface-alt'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('lost')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'lost' ? 'bg-error text-white' : 'text-muted hover:bg-surface-alt'
              }`}
            >
              Lost
            </button>
            <button
              onClick={() => setFilterType('found')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'found' ? 'bg-success text-white' : 'text-muted hover:bg-surface-alt'
              }`}
            >
              Found
            </button>
          </div>

          {/* Toggle List */}
          <button
            onClick={() => setShowList(!showList)}
            className="p-3 bg-white rounded-xl shadow-lg hover:bg-surface-alt transition-colors"
          >
            <List className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg">
          <h4 className="text-sm font-semibold text-foreground mb-2">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-error" />
              <span className="text-sm text-muted">Lost Items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-success" />
              <span className="text-sm text-muted">Found Items</span>
            </div>
          </div>
        </div>

        {/* My Location Button */}
        <button className="absolute bottom-4 right-4 p-3 bg-white rounded-xl shadow-lg hover:bg-surface-alt transition-colors">
          <Navigation className="w-5 h-5 text-primary" />
        </button>

        {/* Selected Item Panel */}
        {selectedItemData && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="relative h-32">
              <img
                src={selectedItemData.images[0] || 'https://via.placeholder.com/400x200'}
                alt={selectedItemData.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"
              >
                ×
              </button>
              <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                selectedItemData.type === 'lost' ? 'bg-error text-white' : 'bg-success text-white'
              }`}>
                {t(selectedItemData.status)}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                {selectedItemData.title}
              </h3>
              <p className="text-sm text-muted flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4" />
                {selectedItemData.location.name}
              </p>
              <Link
                to={`/item/${selectedItemData.id}`}
                className="block w-full btn-primary py-2 rounded-lg text-white text-center text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        )}

        {/* Items List Sidebar */}
        {showList && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-16 right-4 bottom-4 w-80 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Items Near You</h3>
              <p className="text-sm text-muted">{filteredItems.length} items found</p>
            </div>
            <div className="overflow-y-auto h-[calc(100%-5rem)] scrollbar-hide">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full p-4 border-b border-border hover:bg-surface-alt transition-colors text-left ${
                    selectedItem === item.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={item.images[0] || 'https://via.placeholder.com/100'}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted line-clamp-1 mt-1">
                        {item.location.name}
                      </p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.type === 'lost' ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
                      }`}>
                        {t(item.status)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
