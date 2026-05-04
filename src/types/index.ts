export type ItemStatus = 'lost' | 'found' | 'matched' | 'claimed' | 'returned';
export type ItemCategory = 'electronics' | 'documents' | 'accessories' | 'bags' | 'clothing' | 'keys' | 'wallet' | 'other';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  points: number;
  badges: Badge[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  category: ItemCategory;
  description: string;
  images: string[];
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  date: Date;
  status: ItemStatus;
  userId: string;
  userName: string;
  userAvatar?: string;
  matchScore?: number;
  possibleMatches?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Claim {
  id: string;
  itemId: string;
  claimerId: string;
  proof: string;
  idProof?: string;
  status: 'pending' | 'verified' | 'rejected';
  otp?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  itemId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'match' | 'claim' | 'message' | 'system';
  read: boolean;
  createdAt: Date;
}

export interface Stats {
  totalLost: number;
  totalFound: number;
  totalReturned: number;
  recoveryRate: number;
  activeUsers: number;
}
