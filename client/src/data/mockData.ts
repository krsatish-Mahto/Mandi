// Mock data for Mandi Hyperlocal Marketplace

import type { Category, Comment, Conversation, Listing, User, Village } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Categories', icon: '🌾', count: 28 },
  { id: 'grains', name: 'Grains & Cereals', icon: '🌾', count: 8 },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥔', count: 9 },
  { id: 'fruits', name: 'Fruits & Berries', icon: '🥭', count: 4 },
  { id: 'dairy', name: 'Dairy & Ghee', icon: '🥛', count: 3 },
  { id: 'livestock', name: 'Livestock & Poultry', icon: '🐄', count: 4 },
  { id: 'seeds', name: 'Seeds & Fertilizer', icon: '🌱', count: 3 },
  { id: 'equipment', name: 'Tractor & Machinery', icon: '🚜', count: 5 },
  { id: 'services', name: 'Farming Services', icon: '🧑‍🌾', count: 2 },
];

export const VILLAGES: Village[] = [
  { id: 'v1', name: 'Rampur', distance: 1.2, district: 'Patna', state: 'Bihar' },
  { id: 'v2', name: 'Sonpur', distance: 3.5, district: 'Saran', state: 'Bihar' },
  { id: 'v3', name: 'Keshopur', distance: 4.8, district: 'Patna', state: 'Bihar' },
  { id: 'v4', name: 'Belur', distance: 7.2, district: 'Vaishali', state: 'Bihar' },
  { id: 'v5', name: 'Dhanbad Gaon', distance: 9.5, district: 'Saran', state: 'Bihar' },
  { id: 'v6', name: 'Fatehpur', distance: 12.0, district: 'Vaishali', state: 'Bihar' },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.farmer@example.com',
    role: 'Farmer',
    village: 'Rampur',
    distance: 1.2,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.9,
    reviewsCount: 34,
    memberSince: 'March 2024',
    bio: 'Organic vegetable & wheat grower in Rampur village with 15 years farming experience.',
  },
  {
    id: 'u2',
    name: 'Sunita Devi',
    phone: '+91 94312 88765',
    email: 'sunita.dairy@example.com',
    role: 'Producer',
    village: 'Sonpur',
    distance: 3.5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.8,
    reviewsCount: 22,
    memberSince: 'January 2024',
    bio: 'Pure Gir Cow A2 Milk, Bilona Desi Ghee & Fresh Curd producer.',
  },
  {
    id: 'u3',
    name: 'Amit Patel',
    phone: '+91 87654 32109',
    email: 'amit.patel@example.com',
    role: 'Service Provider',
    village: 'Keshopur',
    distance: 4.8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.7,
    reviewsCount: 19,
    memberSince: 'April 2024',
    bio: 'John Deere 5050D Tractor with Rotavator & Harvester on hourly/acre rental basis.',
  },
  {
    id: 'u4',
    name: 'Manoj Yadav',
    phone: '+91 91234 56780',
    email: 'manoj.yadav@example.com',
    role: 'Farmer & Trader',
    village: 'Belur',
    distance: 7.2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: false,
    rating: 4.5,
    reviewsCount: 8,
    memberSince: 'July 2024',
    bio: 'Mustard, Maize & Paddy bulk supplier.',
  },
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'lst-101',
    title: 'Freshly Harvested Sharbati Wheat (गेहूं)',
    category: 'grains',
    listing_type: 'sell',
    price: 2450,
    price_unit: 'quintal',
    price_negotiable: true,
    quantity: 45,
    unit: 'Quintal',
    village: 'Rampur',
    distance: 1.2,
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      '100% clean, sun-dried Sharbati grade golden wheat. Harvested this week with zero chemical moisture. Ideal for domestic flour milling or bulk trading.',
    seller: INITIAL_USERS[0],
    views: 142,
    comments_count: 5,
    status: 'active',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    is_featured: true,
  },
  {
    id: 'lst-102',
    title: 'Desi Red Potatoes - Fresh Harvest (आलू)',
    category: 'vegetables',
    listing_type: 'sell',
    price: 18,
    price_unit: 'kg',
    price_negotiable: false,
    quantity: 1200,
    unit: 'kg',
    village: 'Keshopur',
    distance: 4.8,
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590165482129-1b8b27698980?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Direct from field farm-fresh red potatoes (लाल आलू). Firm texture, medium to large size. Available in 50kg jute bags. Pickup from Keshopur field.',
    seller: INITIAL_USERS[2],
    views: 89,
    comments_count: 3,
    status: 'active',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    is_featured: true,
  },
  {
    id: 'lst-103',
    title: 'Pure Desi Gir Cow Vedic Bilona Ghee (देसी घी)',
    category: 'dairy',
    listing_type: 'sell',
    price: 1400,
    price_unit: 'litre',
    price_negotiable: true,
    quantity: 15,
    unit: 'Litre',
    village: 'Sonpur',
    distance: 3.5,
    images: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Traditional Bilona churned A2 Ghee made from grass-fed indigenous Gir Cows. Rich aroma, golden granules, absolutely chemical free.',
    seller: INITIAL_USERS[1],
    views: 210,
    comments_count: 8,
    status: 'active',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: 'lst-104',
    title: 'John Deere 5050D Tractor Rental with Driver',
    category: 'equipment',
    listing_type: 'sell',
    price: 850,
    price_unit: 'hour',
    price_negotiable: true,
    quantity: 1,
    unit: 'Tractor',
    village: 'Keshopur',
    distance: 4.8,
    images: [
      'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      '50 HP John Deere Tractor available for ploughing, rotavator, leveling, and trolley haulage across Rampur, Sonpur & Belur villages. Diesel included options available.',
    seller: INITIAL_USERS[2],
    views: 95,
    comments_count: 2,
    status: 'active',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: 'lst-105',
    title: 'High-Yielding Yellow Mustard Seeds (सरसों)',
    category: 'seeds',
    listing_type: 'sell',
    price: 5800,
    price_unit: 'quintal',
    price_negotiable: true,
    quantity: 20,
    unit: 'Quintal',
    village: 'Belur',
    distance: 7.2,
    images: [
      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Top grade Pusa Bold yellow mustard. High oil content (42%+). Ideal for oil extraction or next season sowing.',
    seller: INITIAL_USERS[3],
    views: 64,
    comments_count: 1,
    status: 'active',
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: 'lst-106',
    title: 'Looking to BUY 30 Bags of Organic Vermicompost',
    category: 'seeds',
    listing_type: 'buy',
    price: 320,
    price_unit: 'bag (50kg)',
    price_negotiable: true,
    quantity: 30,
    unit: 'Bags',
    village: 'Rampur',
    distance: 1.2,
    images: [
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Urgent requirement: Need 30 bags (50kg each) of certified pure vermicompost for vegetable field prep. Can arrange own pickup from nearby 10km villages.',
    seller: INITIAL_USERS[0],
    views: 78,
    comments_count: 4,
    status: 'active',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: 'lst-107',
    title: 'Healthy Sahiwal Milking Cow with 1-Month Calf',
    category: 'livestock',
    listing_type: 'sell',
    price: 48000,
    price_unit: 'animal',
    price_negotiable: true,
    quantity: 1,
    unit: 'Cow',
    village: 'Sonpur',
    distance: 3.5,
    images: [
      'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Second lactation Sahiwal pure breed cow giving 14 Litres milk daily. Very gentle, vaccinated, comes with female healthy calf. Inspection welcome.',
    seller: INITIAL_USERS[1],
    views: 312,
    comments_count: 11,
    status: 'active',
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: 'lst-108',
    title: 'Organic Green Cauliflower & Cabbage (गोभी)',
    category: 'vegetables',
    listing_type: 'sell',
    price: 25,
    price_unit: 'piece',
    price_negotiable: true,
    quantity: 350,
    unit: 'Pieces',
    village: 'Rampur',
    distance: 1.2,
    images: [
      'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Freshly cut morning harvest. Crisp white cauliflower heads (avg 1.2kg each). Bulk buyers and local shop owners welcome.',
    seller: INITIAL_USERS[0],
    views: 45,
    comments_count: 0,
    status: 'active',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
];

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'lst-101': [
    {
      id: 'c1',
      user: INITIAL_USERS[1],
      text: 'Namaste Ramesh ji, is this suitable for making chapati flour at home? Can I buy 2 quintals?',
      created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      reply: 'Yes Sunita ji! Very soft chapatis. You can collect 2 quintals anytime tomorrow morning.',
    },
    {
      id: 'c2',
      user: INITIAL_USERS[3],
      text: 'If I take 20 quintals together, will you reduce the rate to ₹2,350?',
      created_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      reply: null,
    },
  ],
  'lst-103': [
    {
      id: 'c3',
      user: INITIAL_USERS[0],
      text: 'Sunita ji, do you deliver to Rampur village or should I visit Sonpur?',
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      reply: 'Ramesh ji, my son passes Rampur daily at 8 AM, we can deliver to your doorstep!',
    },
  ],
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant: INITIAL_USERS[0],
    listing: INITIAL_LISTINGS[0],
    last_message: 'Sure, I will keep 2 quintals packed for you tomorrow.',
    last_message_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    unread: 1,
    messages: [
      { id: 'm1', senderId: 'current-user', text: 'Namaste Ramesh ji, regarding the Sharbati wheat listing.', time: '10:15 AM', status: 'seen' },
      { id: 'm2', senderId: 'u1', text: 'Namaste! Yes, how many quintals do you need?', time: '10:20 AM', status: 'seen' },
      { id: 'm3', senderId: 'current-user', text: 'Need 2 quintals. Is ₹2,400 okay per quintal?', time: '10:22 AM', status: 'seen' },
      { id: 'm4', senderId: 'u1', text: 'Sure, I will keep 2 quintals packed for you tomorrow.', time: '10:25 AM', status: 'sent' },
    ],
  },
  {
    id: 'conv-2',
    participant: INITIAL_USERS[1],
    listing: INITIAL_LISTINGS[2],
    last_message: 'Yes, fresh batch of Desi Bilona Ghee is available.',
    last_message_time: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    unread: 0,
    messages: [
      { id: 'm201', senderId: 'current-user', text: 'Hello Sunita ji, is the Gir cow ghee available today?', time: 'Yesterday', status: 'seen' },
      { id: 'm202', senderId: 'u2', text: 'Yes, fresh batch of Desi Bilona Ghee is available.', time: 'Yesterday', status: 'seen' },
    ],
  },
];

// Helper functions for mock storage
const STORAGE_KEY_LISTINGS = 'mandi_mock_listings';
const STORAGE_KEY_COMMENTS = 'mandi_mock_comments';

export const getStoredListings = (): Listing[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LISTINGS);
    if (saved) {
      return JSON.parse(saved) as Listing[];
    }
  } catch (e) {
    console.error('Failed to load listings from storage', e);
  }
  return INITIAL_LISTINGS;
};

export const saveListing = (newListing: Partial<Listing>): Listing => {
  const current = getStoredListings();
  const listingWithDefaults: Listing = {
    id: `lst-${Date.now()}`,
    views: 1,
    comments_count: 0,
    status: 'active',
    created_at: new Date().toISOString(),
    is_featured: false,
    price_negotiable: true,
    quantity: null,
    images: [],
    seller: INITIAL_USERS[0],
    price: 0,
    title: '',
    category: 'grains',
    listing_type: 'sell',
    unit: '',
    village: 'Rampur',
    distance: 1.5,
    description: '',
    ...newListing,
  };
  const updated = [listingWithDefaults, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save listing to storage', e);
  }
  return listingWithDefaults;
};

export const getListingById = (id: string | undefined): Listing | null => {
  const listings = getStoredListings();
  return listings.find((l) => l.id === id) || null;
};

export const getCommentsForListing = (listingId: string | undefined): Comment[] => {
  if (!listingId) return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COMMENTS);
    if (saved) {
      const allComments = JSON.parse(saved) as Record<string, Comment[]>;
      return allComments[listingId] || INITIAL_COMMENTS[listingId] || [];
    }
  } catch (e) {
    console.error('Failed to read comments', e);
  }
  return INITIAL_COMMENTS[listingId] || [];
};

export const addCommentToListing = (
  listingId: string,
  commentText: string,
  user?: User | null
): Comment => {
  const currentComments = getCommentsForListing(listingId);
  const newComment: Comment = {
    id: `c-${Date.now()}`,
    user: user || {
      name: 'You (Visitor)',
      village: 'Rampur',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    },
    text: commentText,
    created_at: new Date().toISOString(),
    reply: null,
  };

  const updated = [newComment, ...currentComments];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COMMENTS);
    const allComments = saved
      ? (JSON.parse(saved) as Record<string, Comment[]>)
      : { ...INITIAL_COMMENTS };
    allComments[listingId] = updated;
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(allComments));
  } catch (e) {
    console.error('Failed to save comment', e);
  }
  return newComment;
};
