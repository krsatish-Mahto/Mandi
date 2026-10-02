# WORKFLOW.md

## User Workflows & Interactions

This document outlines the complete user journeys, workflows, and interaction patterns in the Mandi platform.

---

## 1. User Onboarding Flow

### Step 1: Authentication
User chooses authentication method:

```
┌──────────────────────────────────────────┐
│         Authentication Choice            │
└──────────────┬───────────────────────────┘
               │
    ┌──────────┼──────────┬────────────┐
    ▼          ▼          ▼            ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│ Phone  │ │ Email  │ │ Email  │ │ Register │
│  OTP   │ │  OTP   │ │/Pass   │ │ New User │
└────────┘ └────────┘ └────────┘ └──────────┘
```

**Phone OTP Flow:**
```
1. Enter phone number
2. Receive OTP via SMS
3. Verify OTP
4. Proceed to profile setup
```

**Email OTP Flow:**
```
1. Enter email
2. Receive OTP via email
3. Verify OTP
4. Proceed to profile setup
```

**Email/Password Registration:**
```
1. Enter email & password
2. Create account
3. Verify email
4. Proceed to profile setup
```

**Email/Password Login:**
```
1. Enter email & password
2. Login
3. Check if profile complete
   ├─ YES → Go to home
   └─ NO → Go to profile setup
```

---

### Step 2: Profile Completion (Mandatory)

Before accessing the home page, users **must** complete their profile:

```
┌─────────────────────────────────────────┐
│          Profile Setup Page              │
├─────────────────────────────────────────┤
│                                          │
│  Full Name: [_________________]         │
│                                          │
│  Village Name: [_________________]      │
│                                          │
│  Bio/About: [_________________________] │
│                                          │
│  Profile Picture: [Upload Image]        │
│                                          │
│  [Complete Profile Button]              │
│                                          │
└─────────────────────────────────────────┘
```

**After Profile Setup:**
- User is redirected to **Home Page**
- Ready to browse listings, create listings, and chat

---

## 2. Home Page & Listing Discovery

### Home Page Layout

```
┌─────────────────────────────────────────────────┐
│           MANDI - Home Page                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Profile] [Listings] [Chat] [Interested]       │ ← Top Nav
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Create Listing [+ Button]                  │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  FILTERS:                                  │ │
│  │  Distance: [2km ▼] Price: [Any ▼] Category: [All ▼] │
│  │  Buy/Sell: [Buy ▼] Search: [_____________] │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  LISTINGS FEED:                            │ │
│  │                                             │ │
│  │  ┌──────────────────────────────────────┐  │ │
│  │  │ [Image] Fresh Tomatoes               │  │ │
│  │  │ Price: ₹50/kg | Distance: 2.5 km    │  │ │
│  │  │ Seller: Rajesh Kumar, Village A      │  │ │
│  │  │ Interested: 5 | Liked: 12 | Comment:3│  │ │
│  │  └──────────────────────────────────────┘  │ │
│  │                                             │ │
│  │  ┌──────────────────────────────────────┐  │ │
│  │  │ [Image] Healthy Goat (1 year old)    │  │ │
│  │  │ Price: ₹5000 | Distance: 4 km        │  │ │
│  │  │ Seller: Priya Singh, Village B       │  │ │
│  │  │ Interested: 3 | Liked: 8 | Comment: 2│  │ │
│  │  └──────────────────────────────────────┘  │ │
│  │                                             │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Filter Priority

1. **Distance** (2km, 5km, 10km)
2. **Price Range** (₹0-100, ₹100-500, ₹500-2000, etc.)
3. **Category** (Produce, Livestock, Seeds, Tools, Services)

---

## 3. Create Listing Flow

### Trigger
User clicks **+ Create Listing** button from home page.

### Create Listing Form

```
┌─────────────────────────────────────────────┐
│        Create New Listing                   │
├─────────────────────────────────────────────┤
│                                              │
│  Listing Type: [Sell ▼] [Buy]               │
│                                              │
│  Category: [Produce ▼]                      │
│                                              │
│  Title: [_____________________________]     │
│                                              │
│  Description: [_____________________       │
│                _____________________]       │
│                                              │
│  Quantity: [_______] Unit: [Kg ▼]          │
│                                              │
│  Price: [_______] ₹                        │
│                                              │
│  Price Negotiable: [✓ Yes]                 │
│                                              │
│  Upload Images: [+ Add Images] (Multiple)  │
│  [Img1] [Img2] [Img3]                      │
│                                              │
│  [Cancel] [Create Listing]                 │
│                                              │
└─────────────────────────────────────────────┘
```

### Listing Creation Steps

1. **Choose Listing Type:** Sell or Buy
2. **Select Category:** Produce, Livestock, Seeds, Tools, Services
3. **Fill Details:** Title, description, quantity, unit, price
4. **Upload Images:** Multiple images allowed (stored in order)
5. **Submit:** Listing goes live immediately with status "Active"

### Post-Creation
- Listing appears on home feed
- Seller can see the listing in their profile
- Notifications enabled for comments/interests

---

## 4. Listing Detail Page & Interactions

### When User Clicks on a Listing

```
┌──────────────────────────────────────────────────┐
│         Listing Detail Page                      │
├──────────────────────────────────────────────────┤
│                                                   │
│  ← Back                                          │
│                                                   │
│  [Image Carousel: Img1 > Img2 > Img3]            │
│                                                   │
│  Fresh Tomatoes                                  │
│  Price: ₹50/kg  |  Distance: 2.5 km             │
│  Quantity: 50 kg  |  Negotiable: Yes            │
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │ Seller Profile:                          │   │
│  │ [Avatar] Rajesh Kumar                    │   │
│  │ Village A  | Rating: 4.5/5               │   │
│  │ Last Active: 2 hours ago                 │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
│  Description:                                    │
│  Fresh, organic tomatoes picked today.           │
│  Perfect for cooking or market sale.             │
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │ More from this Seller (Recent):          │   │
│  │ [Onion - ₹30/kg] [Potato - ₹20/kg]     │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
│  ─────────────────────────────────────────────   │
│                                                   │
│  COMMENTS & INTERACTIONS:                        │
│                                                   │
│  👍 Like (12)  ❤️ Interested (5)  💬 Comment (3) 📤 Share │
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │ Comments:                                │   │
│  │                                          │   │
│  │ [Avatar] Priya Singh (2 hours ago)      │   │
│  │ "Can you deliver to Village B?"         │   │
│  │ └─ [Avatar] Rajesh Kumar (1 hour ago)  │   │
│  │    "Yes, delivery possible for ₹50"    │   │
│  │                                          │   │
│  │ [Avatar] Amit Patel (30 mins ago)       │   │
│  │ "Still available?"                      │   │
│  │ └─ [Avatar] Rajesh Kumar (Just now)    │   │
│  │    "Yes, 30 kg left"                   │   │
│  │                                          │   │
│  │ [Type comment...]  [Post Comment]       │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
│  ─────────────────────────────────────────────   │
│                                                   │
│  [Direct Chat with Seller]  (Blue Button)       │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## 5. Interaction Buttons (Like Facebook)

### Row of Buttons Below Listing

```
┌────────────────────────────────────────────┐
│  👍 Like  ❤️ Interested  💬 Comment  📤 Share │
└────────────────────────────────────────────┘
```

### Button Behaviors

| Button | Action | Notification |
|--------|--------|--------------|
| **Like** | Toggle like status | None (just visual count) |
| **Interested** | Mark interest in listing | Seller gets notification: "User X is interested" |
| **Comment** | Add public comment | Seller gets notification: "New comment on your listing" |
| **Share** | Share listing via WhatsApp/Link | None |
| **Direct Chat** | Open private conversation | Seller gets notification: "New message from User Y" |

---

## 6. Public Comments Section

### Comment Flow

```
Buyer clicks Comment:
│
├─ Typing area appears: [Type your comment...]
│
├─ Buyer types: "Can you deliver?"
│
├─ Click "Post Comment"
│
├─ Comment appears publicly with timestamp
│
├─ Seller receives notification: "New comment on your listing"
│
├─ Seller can reply to comment (reply appears indented)
│
└─ Other users can see the conversation
```

### Comment Thread Example

```
[Avatar] Priya Singh (2 hours ago)
"Can you deliver to Village B?"
  └─ [Avatar] Rajesh Kumar (1 hour ago) [Seller]
     "Yes, delivery possible for ₹50"
     └─ [Avatar] Priya Singh (45 mins ago)
        "Great! I'll contact you soon"

[Avatar] Amit Patel (30 mins ago)
"Still available?"
  └─ [Avatar] Rajesh Kumar (Just now) [Seller]
     "Yes, 30 kg left"
```

---

## 7. Direct Chat Flow

### Trigger
User clicks **"Direct Chat with Seller"** button on listing detail page.

### Chat Interface

```
┌─────────────────────────────────────────────┐
│  Rajesh Kumar - Fresh Tomatoes              │
│  ← Back                                     │
├─────────────────────────────────────────────┤
│                                              │
│  [Seller avatar] Rajesh Kumar (Online)      │
│  Last seen: Just now                        │
│                                              │
│  ─────────────────────────────────────────  │
│                                              │
│  [Avatar] Rajesh Kumar (2:00 PM)            │
│  "Hi! Available in your area?"              │
│  ✓✓ Seen                                    │
│                                              │
│                             [Buyer avatar]  │
│                             "Yes, interested│
│                              in 10 kg"      │
│                             ✓ Sent          │
│                                              │
│  [Avatar] Rajesh Kumar (2:05 PM)            │
│  "Good. Price is ₹50/kg"                    │
│  ✓✓ Seen                                    │
│                                              │
│                             [Buyer avatar]  │
│                             "Can you do     │
│                              ₹45/kg?"       │
│                             ✓✓ Seen         │
│                                              │
│  [Avatar] Rajesh Kumar (2:06 PM)            │
│  "Ok, deal. When can you come?"             │
│  ✓✓ Seen                                    │
│                                              │
│  ─────────────────────────────────────────  │
│                                              │
│  [Type your message...]     [Send]          │
│                                              │
└─────────────────────────────────────────────┘
```

### Message Features

1. **Real-time Chat:** Messages appear instantly
2. **Message Status:**
   - ✓ Sent (message delivered to database)
   - ✓✓ Seen (receiver has opened the chat)
3. **Conversation History:** All messages are persistent and retrievable
4. **Automatic Chat Creation:** When user opens chat for first time, conversation is created

---

## 8. Edit/Delete Listing Flow

### User Actions (Seller)

User views their own listing or goes to **"My Listings"** section.

```
┌──────────────────────────────────────┐
│  My Listings                         │
├──────────────────────────────────────┤
│                                       │
│  [Listing 1]                         │
│  Fresh Tomatoes - Active             │
│  [Edit] [Delete] [View] [Mark Sold] │
│                                       │
│  [Listing 2]                         │
│  Healthy Goat - Active               │
│  [Edit] [Delete] [View] [Mark Sold] │
│                                       │
└──────────────────────────────────────┘
```

### Edit Listing

Seller can update:
- ✅ Title
- ✅ Description
- ✅ Quantity
- ✅ Unit
- ✅ Price
- ✅ Price Negotiable status
- ✅ Status (Active/Inactive/Sold/Expired)
- ❌ Images (locked - cannot change)

### Delete Listing

- Seller clicks "Delete"
- Confirmation dialog appears
- Listing is removed from platform
- All associated comments and chats become inaccessible

---

## 9. Interested/Notifications

### When Buyer Clicks "Interested"

```
Buyer clicks ❤️ Interested button:
│
├─ Button highlights red
│
├─ Count increases (e.g., Interested: 5 → 6)
│
├─ Seller receives notification:
│  "User X is interested in Fresh Tomatoes"
│
└─ Buyer can see who else is interested (optional)
```

### Notification Types

| Notification | Trigger | Message |
|--------------|---------|---------|
| **New Interest** | Buyer clicks "Interested" | "User X is interested in your Fresh Tomatoes" |
| **New Comment** | Buyer posts comment | "User Y commented: 'Can you deliver?'" |
| **New Message** | Buyer sends direct message | "New message from User Z" |

### Notification Badge

- Chat icon shows count of unread messages
- Home icon shows count of new activities on listings

---

## 10. Search & Filter Logic

### Filter Application Order

```
1. Distance Filter (Primary)
   ├─ 2 km radius
   ├─ 5 km radius
   └─ 10 km radius

2. Price Filter (Secondary)
   ├─ ₹0-100
   ├─ ₹100-500
   ├─ ₹500-2000
   └─ ₹2000+

3. Category Filter (Tertiary)
   ├─ Produce
   ├─ Livestock
   ├─ Seeds
   ├─ Tools
   └─ Services

4. Buy/Sell Filter
   ├─ Sell listings
   └─ Buy listings
```

### Search Results Display Priority

For each listing card, display in order of importance:

1. **Product Image** (prominent)
2. **Title** (large text)
3. **Price** (highlighted in bold)
4. **Distance** (emphasized)
5. **Seller Name & Village**
6. **Engagement Metrics** (Interested count, Likes, Comments)

---

## 11. User Profile

### Seller Profile

```
┌──────────────────────────────────────────┐
│  Rajesh Kumar                            │
│  [Edit Profile]                          │
├──────────────────────────────────────────┤
│                                           │
│  [Avatar] Rating: ★★★★☆ (4.5/5)         │
│           Member since: Jan 2024         │
│           Total listings: 12             │
│           Active listings: 5             │
│                                           │
│  Village: Village A                      │
│  Bio: "Fresh produce every week"         │
│                                           │
│  ─────────────────────────────────────   │
│  Recent Listings:                        │
│  [Tomato] [Onion] [Potato] [Goat]       │
│                                           │
│  ─────────────────────────────────────   │
│  [Contact Seller] [View All Listings]   │
│                                           │
└──────────────────────────────────────────┘
```

### Profile Edit

Seller can update:
- Full name
- Bio/About
- Profile picture
- Village name

---

## 12. My Conversations

### Chat List View

```
┌─────────────────────────────────────┐
│  My Conversations                   │
├─────────────────────────────────────┤
│                                      │
│  Rajesh Kumar - Fresh Tomatoes       │
│  "When can you come?" - 2:06 PM     │
│  ✓✓ You: Seen                       │
│  [Unread: 0] [Delete]               │
│                                      │
│  Priya Singh - Healthy Goat          │
│  "Still available?" - Yesterday      │
│  ✓ Sent                             │
│  [Unread: 1] [Delete]               │
│                                      │
│  Amit Patel - Wheat Seeds            │
│  "Can you deliver?" - 2 days ago    │
│  ✓✓ Seen                            │
│  [Unread: 0] [Delete]               │
│                                      │
└─────────────────────────────────────┘
```

### Chat Actions
- Click to open chat
- View conversation history
- Delete conversation
- Unread message indicator

---

## 13. User Stories

### Story 1: Farmer Selling Produce (Seller Journey)

**As a** farmer with excess tomatoes  
**I want to** quickly list them for sale locally  
**So that** I can sell to nearby buyers without traveling to the market

**Flow:**
1. Sign up with phone OTP
2. Complete profile (name, village, bio)
3. Click "Create Listing"
4. Select "Sell" → "Produce" → "Tomatoes"
5. Fill: 50 kg, ₹50/kg, price negotiable, add 3 photos
6. Publish listing
7. Receive notifications when buyers are interested or comment
8. Chat with interested buyers to negotiate
9. Mark listing as "Sold" when done

---

### Story 2: Buyer Looking for Specific Item (Buyer Journey)

**As a** buyer looking for fresh vegetables  
**I want to** find what's available locally before traveling to the market  
**So that** I save time and money on unnecessary travel

**Flow:**
1. Sign up with email/password
2. Complete profile
3. Go to home page
4. Apply filters: Distance 5km, Price ₹20-100, Category "Produce"
5. Browse listings
6. Click on "Fresh Tomatoes" listing
7. See seller details, comments, and engagement
8. Click "Interested" to show interest
9. Post comment: "Can you deliver?"
10. Open direct chat with seller
11. Negotiate price and arrange meeting
12. Complete transaction

---

### Story 3: Cross-Village Communication (Both Roles)

**As a** seller and buyer in neighboring villages  
**I want to** know what's available nearby without weekly market trips  
**So that** I can trade directly with neighbors and save travel costs

**Flow:**
1. Farmer A (Village X) lists goat for sale
2. Buyer B (Village Y, 3 km away) searches "Distance 5km" → finds goat listing
3. Buyer B clicks "Interested"
4. Farmer A gets notification
5. Buyer B posts comment: "Is it healthy for milking?"
6. Farmer A replies: "Yes, 5 years old, gives 3L milk/day"
7. Buyer B opens direct chat
8. They agree on price (₹5000)
9. Buyer B travels 3 km instead of 15 km to market
10. Transaction complete, both happy

---

## 14. State Diagram - Listing Lifecycle

```
         ┌─────────────┐
         │   CREATED   │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │   ACTIVE    │◄────────┐
         └──────┬──────┘         │
                │                │
         ┌──────┼──────┐    ┌────────┐
         │      │      │    │ MARKED │
         ▼      ▼      ▼    │ SOLD   │
      SOLD  INACTIVE EXPIRED└────────┘
```

### Listing Status Transitions

- **Created** → **Active** (immediately after creation)
- **Active** → **Inactive** (seller pauses listing)
- **Inactive** → **Active** (seller resumes listing)
- **Active** → **Sold** (seller marks as sold)
- **Active** → **Expired** (auto-expire after 30 days)
- **Sold/Expired/Inactive** → Listing removed from public feed

---

## 15. Notification Flow

### Real-time Notifications

```
Event: Buyer clicks "Interested"
│
├─ Notification created in database
│
├─ Server sends notification to seller (Socket.io)
│
├─ Seller sees notification badge (Inbox)
│
├─ Notification details: "User X is interested in Fresh Tomatoes"
│
└─ Notification persists (in-app only, no push notifications)
```

### Notification Types & Triggers

| Event | Notification | Recipient |
|-------|--------------|-----------|
| Comment posted | "New comment on Fresh Tomatoes" | Seller |
| Buyer interested | "User X is interested in Fresh Tomatoes" | Seller |
| Direct message | "New message from Buyer Y" | Seller/Buyer |
| Reply to comment | "New reply to your comment" | Commenter |

---

## 16. Edge Cases & Behaviors

### What if seller is offline?

- Messages are stored in database
- "Seen" status shows ✓ (sent) until seller comes online
- When seller opens chat, all new messages marked as seen (✓✓)

### What if listing expires?

- Listing auto-expires after 30 days of creation
- Status changes to "Expired"
- Removed from public feed
- Seller can still view it in "My Listings" and can repost it

### What if seller deletes listing?

- All public comments become inaccessible
- Direct chat conversations are archived (not deleted)
- Buyers can see conversation history but cannot send new messages

### What if buyer/seller blocks each other?

- Future feature: Block user → Cannot see listings or send messages
- (Not in MVP)

---

## Summary

The Mandi platform provides a complete ecosystem for hyperlocal commerce:

1. **Simple Onboarding:** Phone/Email authentication + profile setup
2. **Easy Listing Creation:** Multi-image upload from home page
3. **Smart Discovery:** Distance-first filtering for local relevance
4. **Rich Interactions:** Public comments + private chats (like Facebook)
5. **Engagement:** Like, Interested, Comment, Share buttons
6. **Direct Communication:** Private 1-on-1 chats with message history
7. **Seller Control:** Edit status, delete listings, manage conversations
8. **Notifications:** In-app alerts for interests, comments, messages

This workflow minimizes unnecessary travel, enables direct negotiation, and builds a trusted local community marketplace.
