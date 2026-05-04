import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  MapPin,
  Calendar,
  Tag,
  FileText,
  Image as ImageIcon,
  X,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import type { ItemCategory, Item } from '../types';

export const ReportItem = () => {
  const { type } = useParams<{ type: 'lost' | 'found' }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addItem, user, isAuthenticated, login } = useStore();

  const [formData, setFormData] = useState({
    title: '',
    category: 'electronics' as ItemCategory,
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    images: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories: { value: ItemCategory; label: string }[] = [
    { value: 'electronics', label: t('electronics') },
    { value: 'documents', label: t('documents') },
    { value: 'accessories', label: t('accessories') },
    { value: 'bags', label: t('bags') },
    { value: 'clothing', label: t('clothing') },
    { value: 'keys', label: t('keys') },
    { value: 'wallet', label: t('wallet') },
    { value: 'other', label: t('other') },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, upload to server. Here we'll use placeholder URLs
      const newImages = Array.from(files).map(
        (_, i) => `https://images.unsplash.com/photo-${Date.now() + i}?w=400`
      );
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Auto-login for demo if not authenticated
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newItem: Item = {
      id: Date.now().toString(),
      type: type as 'lost' | 'found',
      title: formData.title,
      category: formData.category,
      description: formData.description,
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1586953208270-767889fa9b4c?w=400'],
      location: {
        name: formData.location,
        lat: 19.0760 + Math.random() * 0.1,
        lng: 72.8777 + Math.random() * 0.1,
      },
      date: new Date(formData.date),
      status: type as 'lost' | 'found',
      userId: user?.id || '1',
      userName: user?.name || 'Demo User',
      userAvatar: user?.avatar || 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addItem(newItem);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/browse');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-surface pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('reportSuccess')}</h2>
          <p className="text-muted mb-4">
            {type === 'lost'
              ? "We'll notify you when we find a potential match."
              : 'Thank you for helping someone find their belongings!'}
          </p>
          <p className="text-sm text-primary">Redirecting to browse page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {type === 'lost' ? t('reportLost') : t('reportFound')}
            </h1>
            <p className="text-muted">
              {type === 'lost'
                ? 'Provide details about the item you lost. The more information, the better the chances of finding it.'
                : 'Help reunite someone with their belongings by providing accurate details.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                {t('title')} *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Black iPhone 15 Pro with leather case"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                {t('category')} *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('description')} *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the item in detail - color, brand, distinguishing features, contents, etc."
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                {t('location')} *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Central Railway Station, Platform 3"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <p className="text-xs text-muted mt-1">Enter the location where you lost/found the item</p>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {t('date')} *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <ImageIcon className="w-4 h-4 inline mr-2" />
                {t('uploadImages')}
              </label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-muted mx-auto mb-2" />
                  <p className="text-muted">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted mt-1">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {t('submitReport')}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
