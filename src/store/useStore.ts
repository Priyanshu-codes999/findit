import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Item, Notification, Message, ItemCategory, ItemStatus } from '../types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Items
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  
  // Messages
  messages: Message[];
  addMessage: (message: Message) => void;
  
  // UI State
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    category: ItemCategory | 'all';
    status: ItemStatus | 'all';
    type: 'lost' | 'found' | 'all';
  };
  setFilters: (filters: Partial<AppState['filters']>) => void;
}

// Mock data
const mockItems: Item[] = [
  {
    id: '1',
    type: 'lost',
    title: 'iPhone 15 Pro Max - Space Black',
    category: 'electronics',
    description: 'Lost my iPhone 15 Pro Max near Platform 3. Has a black leather case with my initials "AK" engraved. Contains important work data.',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'],
    location: { name: 'Central Railway Station, Platform 3', lat: 19.0760, lng: 72.8777 },
    date: new Date('2024-01-15'),
    status: 'lost',
    userId: '2',
    userName: 'Amit Kumar',
    userAvatar: 'https://i.pravatar.cc/150?img=11',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'found',
    title: 'Brown Leather Wallet',
    category: 'wallet',
    description: 'Found a brown leather wallet near the food court. Contains some cards and cash. Owner can claim by describing the contents.',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'],
    location: { name: 'Phoenix Mall, Food Court', lat: 19.0178, lng: 72.8478 },
    date: new Date('2024-01-16'),
    status: 'found',
    userId: '3',
    userName: 'Priya Sharma',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    type: 'lost',
    title: 'MacBook Pro 14" with Stickers',
    category: 'electronics',
    description: 'Lost my MacBook Pro at the airport lounge. Has multiple tech stickers on the cover including React, Node.js, and Python logos.',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
    location: { name: 'Mumbai International Airport, T2', lat: 19.0896, lng: 72.8656 },
    date: new Date('2024-01-14'),
    status: 'matched',
    matchScore: 87,
    userId: '4',
    userName: 'Rahul Verma',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '4',
    type: 'found',
    title: 'Set of Car Keys with Toyota Logo',
    category: 'keys',
    description: 'Found car keys with Toyota logo keychain near the parking area. Has 3 keys and a small teddy bear charm.',
    images: ['https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400'],
    location: { name: 'University Campus, Parking Lot B', lat: 19.1234, lng: 72.8367 },
    date: new Date('2024-01-17'),
    status: 'found',
    userId: '5',
    userName: 'Sneha Patel',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '5',
    type: 'lost',
    title: 'Blue Backpack with Laptop',
    category: 'bags',
    description: 'Lost my blue JanSport backpack containing a Dell laptop, charger, notebooks, and a water bottle. Very important for work.',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
    location: { name: 'Metro Station - Andheri', lat: 19.1197, lng: 72.8464 },
    date: new Date('2024-01-13'),
    status: 'returned',
    userId: '6',
    userName: 'Vikram Singh',
    userAvatar: 'https://i.pravatar.cc/150?img=15',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '6',
    type: 'found',
    title: 'Gold Necklace with Pendant',
    category: 'accessories',
    description: 'Found a beautiful gold necklace with a heart-shaped pendant near the temple entrance. Looks valuable.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'],
    location: { name: 'Siddhivinayak Temple', lat: 19.0169, lng: 72.8301 },
    date: new Date('2024-01-18'),
    status: 'found',
    userId: '7',
    userName: 'Meera Joshi',
    userAvatar: 'https://i.pravatar.cc/150?img=16',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Possible Match Found!',
    message: 'We found a potential match for your lost iPhone. Check it out!',
    type: 'match',
    read: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    title: 'Claim Update',
    message: 'Your claim for the brown wallet has been verified.',
    type: 'claim',
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Items
      items: mockItems,
      addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, ...updates } : item),
      })),
      deleteItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      
      // Notifications
      notifications: mockNotifications,
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
      })),
      
      // Messages
      messages: [],
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      
      // UI State
      language: 'en',
      setLanguage: (language) => set({ language }),
      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      filters: {
        category: 'all',
        status: 'all',
        type: 'all',
      },
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
    }),
    {
      name: 'findIt-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, language: state.language }),
    }
  )
);
