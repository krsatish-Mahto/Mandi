// Shared domain types for the Mandi client

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role?: string;
  village?: string;
  distance?: number;
  avatar?: string;
  verified?: boolean;
  rating?: number;
  reviewsCount?: number;
  memberSince?: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Village {
  id: string;
  name: string;
  distance: number;
  district: string;
  state: string;
}

export type ListingType = 'sell' | 'buy';

export type ListingStatus = 'active' | 'sold' | 'expired';

export interface Listing {
  id: string;
  title: string;
  category: string;
  listing_type: ListingType;
  price: number;
  price_unit?: string;
  price_negotiable: boolean;
  quantity: number | null;
  unit: string;
  village: string;
  distance: number;
  images: string[];
  description: string;
  seller: User;
  views: number;
  comments_count: number;
  status: ListingStatus;
  created_at: string;
  is_featured: boolean;
}

export interface Comment {
  id: string;
  user: Partial<User>;
  text: string;
  created_at: string;
  reply: string | null;
}

export type MessageStatus = 'sent' | 'delivered' | 'seen';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  participant: User;
  listing: Listing;
  last_message: string;
  last_message_time: string;
  unread: number;
  messages: Message[];
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}
