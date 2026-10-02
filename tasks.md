# tasks.md

## Mandi Project - Task Breakdown

**Project Start Date:** October 2, 2026  
**Target Modules:** 9  
**Total Estimated Hours:** ~320 hours (MVP)

---

## Module Overview

| # | Module | Priority | Est. Hours | Status | Dependencies |
|---|--------|----------|------------|--------|--------------|
| 1 | Frontend Setup | High | 16 | Todo | None |
| 2 | Database & Backend Setup | High | 24 | Todo | None |
| 3 | Authentication | High | 40 | Todo | Database & Backend Setup, Frontend Setup |
| 4 | User Profile | High | 32 | Todo | Authentication |
| 5 | Listings (CRUD) | High | 48 | Todo | User Profile |
| 6 | Search & Filters | High | 40 | Todo | Listings |
| 7 | Comments System | Medium | 36 | Todo | Listings |
| 8 | Direct Chat | Medium | 60 | Todo | User Profile, Listings |
| 9 | Notifications | Medium | 24 | Todo | Authentication, Chat, Comments, Listings |

---

## 1. Frontend Setup

**Module Goal:** Set up React project with build tools, styling framework, and project structure  
**Priority:** High  
**Estimated Hours:** 16  
**Status:** Todo  
**Dependencies:** None

### Sub-tasks

#### 1.1 Initialize React Project with Vite
- [ ] Create React app using Vite
- [ ] Install Node dependencies (React, ReactDOM, etc.)
- [ ] Configure Vite for development and production
- [ ] Set up .env.example file
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** None

#### 1.2 Install & Configure TailwindCSS
- [ ] Install TailwindCSS and dependencies
- [ ] Configure tailwind.config.js with design tokens
- [ ] Set up CSS custom properties (colors, spacing, etc.)
- [ ] Create base styles file
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 1.1

#### 1.3 Set Up Project Structure
- [ ] Create folder structure: src/{components, pages, hooks, services, utils, styles}
- [ ] Set up App.jsx and main.jsx entry point
- [ ] Create basic page components (HomePage, AuthPage, etc.)
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 1.2

#### 1.4 Install & Configure HTTP Client & Socket.io
- [ ] Install Axios for API calls
- [ ] Install Socket.io client for real-time chat
- [ ] Create API service wrapper (api.js)
- [ ] Create Socket.io service wrapper (socket.js)
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 1.3

#### 1.5 Set Up Routing
- [ ] Install React Router
- [ ] Create route structure (home, auth, listings, chat, profile)
- [ ] Set up protected routes (authentication required)
- [ ] Create route guards for conditional redirects
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 1.4

---

## 2. Database & Backend Setup

**Module Goal:** Set up PostgreSQL database, Express server, and project structure  
**Priority:** High  
**Estimated Hours:** 24  
**Status:** Todo  
**Dependencies:** None

### Sub-tasks

#### 2.1 Initialize Node.js Project & Install Dependencies
- [ ] Create Node.js project with npm init
- [ ] Install Express.js, dotenv, cors, helmet
- [ ] Install PostgreSQL client (pg or sequelize)
- [ ] Install Socket.io for real-time features
- [ ] Create package.json scripts (dev, build, start)
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** None

#### 2.2 Set Up Express Server
- [ ] Create Express app (app.js)
- [ ] Configure middleware (CORS, helmet, body-parser)
- [ ] Set up error handling middleware
- [ ] Create server.js with Socket.io initialization
- [ ] Configure environment variables (.env)
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 2.1

#### 2.3 Set Up PostgreSQL Database
- [ ] Install PostgreSQL locally (or use cloud DB)
- [ ] Create database for Mandi
- [ ] Set up database connection pooling
- [ ] Create connection config file (database.js)
- [ ] Test database connectivity
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 2.1

#### 2.4 Create Database Schema
- [ ] Create users table with all columns
- [ ] Create otp_verifications table
- [ ] Create listings table
- [ ] Create conversations table
- [ ] Create messages table
- [ ] Add indexes on frequently queried columns
- [ ] Create migrations file (optional but recommended)
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 2.3

#### 2.5 Set Up Project Structure
- [ ] Create folder structure: src/{routes, controllers, models, middleware, services, socket, config}
- [ ] Create base model/database connection class
- [ ] Set up logging/debugging configuration
- [ ] Create .gitignore and README for backend
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 2.2

#### 2.6 Set Up Development Environment
- [ ] Configure nodemon for auto-restart
- [ ] Set up development server (localhost:5000)
- [ ] Test basic Express endpoints (GET /health)
- [ ] Configure CORS for frontend (localhost:3000)
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 2.2, 2.3

---

## 3. Authentication

**Module Goal:** Implement phone OTP, email OTP, and email/password authentication  
**Priority:** High  
**Estimated Hours:** 40  
**Status:** Todo  
**Dependencies:** Database & Backend Setup (2), Frontend Setup (1)

### Sub-tasks

#### 3.1 Backend - OTP Service Setup
- [ ] Install OTP generation library (speakeasy or similar)
- [ ] Set up SMS service (Twilio or similar for phone OTP)
- [ ] Set up Email service (Nodemailer or SendGrid for email OTP)
- [ ] Create OTP generation & expiration logic (6-digit code, 5-min expiry)
- [ ] Create OTP validation with rate limiting (max 3 attempts)
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 2.1, 2.3

#### 3.2 Backend - Phone OTP Endpoints
- [ ] POST /auth/phone/request - Generate & send OTP
- [ ] POST /auth/phone/verify - Verify OTP & issue JWT token
- [ ] Create OTP model/queries
- [ ] Add validation for phone number format
- [ ] Add error handling (invalid phone, expired OTP, etc.)
- **Est. Hours:** 5 | **Priority:** High | **Dependencies:** 3.1, 2.4

#### 3.3 Backend - Email OTP Endpoints
- [ ] POST /auth/email/request - Generate & send OTP
- [ ] POST /auth/email/verify - Verify OTP & issue JWT token
- [ ] Create email OTP flow similar to phone
- [ ] Add validation for email format
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 3.1, 2.4

#### 3.4 Backend - Email/Password Endpoints
- [ ] POST /auth/register - Create user with email & password
- [ ] POST /auth/login - Login with email & password
- [ ] Install bcrypt for password hashing
- [ ] Add password strength validation
- [ ] Create JWT token generation & refresh logic
- [ ] POST /auth/logout - Invalidate token
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 3.1, 2.4

#### 3.5 Backend - JWT & Auth Middleware
- [ ] Create JWT service (generate, verify, decode)
- [ ] Create authentication middleware (verify JWT)
- [ ] Create token refresh endpoint (POST /auth/refresh)
- [ ] Add token expiration logic (24 hours)
- [ ] Test JWT verification on protected routes
- **Est. Hours:** 5 | **Priority:** High | **Dependencies:** 3.4

#### 3.6 Frontend - Auth Pages & UI
- [ ] Create AuthPage component with tabs (Phone, Email OTP, Email/Password)
- [ ] Create PhoneOTPForm component
- [ ] Create EmailOTPForm component
- [ ] Create RegisterForm component
- [ ] Create LoginForm component
- [ ] Add form validation (client-side)
- [ ] Add error message display
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 1

#### 3.7 Frontend - Auth Service & Hooks
- [ ] Create authService (API calls to backend)
- [ ] Create useAuth hook (context-based auth state)
- [ ] Implement token storage (localStorage)
- [ ] Create auth interceptor for API requests (attach JWT)
- [ ] Implement auto-logout on token expiration
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 3.6, 1.4

#### 3.8 Frontend - Protected Routes & Auth Guards
- [ ] Create ProtectedRoute component
- [ ] Implement route guards (redirect to login if not authenticated)
- [ ] Test authentication flow end-to-end
- [ ] Handle edge cases (session expiry, invalid token)
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 3.7, 1.5

---

## 4. User Profile

**Module Goal:** Implement user profile setup, viewing, and editing  
**Priority:** High  
**Estimated Hours:** 32  
**Status:** Todo  
**Dependencies:** Authentication (3)

### Sub-tasks

#### 4.1 Backend - User Model & Queries
- [ ] Create User model with all fields
- [ ] Create queries: getUser, updateUser, getUserByPhone, getUserByEmail
- [ ] Add user validation (name, village, bio length limits)
- [ ] Create profile completion check query
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 3

#### 4.2 Backend - Profile Endpoints
- [ ] GET /api/users/:id - Get user profile
- [ ] PUT /api/users/:id - Update user profile (name, bio, village)
- [ ] POST /api/users/:id/profile-picture - Upload profile picture
- [ ] GET /api/users/:id/listings - Get user's listings
- [ ] Add ownership validation (users can only edit their own profile)
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.1

#### 4.3 Backend - Image Upload Service
- [ ] Set up file upload library (multer or similar)
- [ ] Create image storage/CDN integration (AWS S3 or local)
- [ ] Add image validation (size, format)
- [ ] Create image URL generation logic
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.2

#### 4.4 Frontend - Profile Setup Page (Mandatory After Auth)
- [ ] Create ProfileSetupPage component
- [ ] Add form fields: Full Name, Village, Bio, Profile Picture
- [ ] Add profile picture upload with preview
- [ ] Add form validation
- [ ] Add "Complete Profile" button
- [ ] Redirect to home after completion
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 3.8

#### 4.5 Frontend - View Profile Page
- [ ] Create ProfilePage component
- [ ] Display user info: name, village, bio, picture, member since, listings count
- [ ] Display rating/reviews (placeholder for MVP)
- [ ] Display user's recent listings
- [ ] Add "Edit Profile" button (if viewing own profile)
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.4

#### 4.6 Frontend - Edit Profile Page
- [ ] Create EditProfilePage component
- [ ] Pre-fill form with current user data
- [ ] Allow updating name, bio, village, profile picture
- [ ] Add form validation & error handling
- [ ] Add "Save Changes" button
- [ ] Show success/error messages
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.5

#### 4.7 Frontend - User Service & Hooks
- [ ] Create userService (API calls)
- [ ] Create useUser hook (fetch & cache user data)
- [ ] Create useProfile hook (current user profile)
- [ ] Implement image upload helper
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 4.6

#### 4.8 Integration - Profile Completion Flow
- [ ] Test mandatory profile setup after auth
- [ ] Test redirect to home after setup
- [ ] Test profile view, edit, and update
- [ ] Test image upload and display
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.7

---

## 5. Listings (CRUD)

**Module Goal:** Implement create, read, update, delete listings with image uploads  
**Priority:** High  
**Estimated Hours:** 48  
**Status:** Todo  
**Dependencies:** User Profile (4)

### Sub-tasks

#### 5.1 Backend - Listing Model & Queries
- [ ] Create Listing model with all fields
- [ ] Create queries: getAllListings, getListingById, getListingsByUser, createListing, updateListing, deleteListing
- [ ] Add listing status transitions (active, inactive, sold, expired)
- [ ] Add auto-expiration logic (30 days)
- [ ] Create listing validation
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4

#### 5.2 Backend - Listing Endpoints
- [ ] GET /api/listings - Get all listings with pagination
- [ ] GET /api/listings/:id - Get single listing
- [ ] POST /api/listings - Create new listing
- [ ] PUT /api/listings/:id - Update listing (status, details, but not images)
- [ ] DELETE /api/listings/:id - Delete listing
- [ ] GET /api/users/:id/listings - Get user's listings
- [ ] Add ownership validation & error handling
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 5.1

#### 5.3 Backend - Image Upload for Listings
- [ ] Extend multer for multiple image uploads
- [ ] Store image URLs in database
- [ ] Add image validation (max 5 images per listing, max 5MB each)
- [ ] Create image deletion logic when listing deleted
- [ ] Test multi-image upload
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.3, 5.2

#### 5.4 Backend - Listing Status & Expiration
- [ ] Create endpoint to update listing status (active/inactive/sold)
- [ ] Create background job/cron for auto-expiration after 30 days
- [ ] Create soft delete for expired listings
- [ ] Prevent operations on sold/expired listings
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 5.2

#### 5.5 Frontend - Create Listing Page
- [ ] Create CreateListingPage component
- [ ] Add form fields: Type (Sell/Buy), Category, Title, Description, Quantity, Unit, Price, Negotiable, Images
- [ ] Add image upload with preview (multiple images)
- [ ] Add form validation (required fields, character limits)
- [ ] Add "Create Listing" button
- [ ] Show success message & redirect to listing detail
- **Est. Hours:** 8 | **Priority:** High | **Dependencies:** 4.8

#### 5.6 Frontend - Listing Detail Page
- [ ] Create ListingDetailPage component
- [ ] Display image carousel (primary image + thumbnails)
- [ ] Display listing details: title, price, distance, quantity, negotiable
- [ ] Display seller profile card
- [ ] Display "More from Seller" (recent listings)
- [ ] Show engagement buttons (like, interested, comment, share) - non-functional for now
- [ ] Add "Direct Chat" button
- [ ] Make page responsive (mobile & desktop)
- **Est. Hours:** 8 | **Priority:** High | **Dependencies:** 5.5

#### 5.7 Frontend - My Listings Page
- [ ] Create MyListingsPage component
- [ ] Display all user's listings in card format
- [ ] Add edit/delete buttons for each listing
- [ ] Add status indicator (active, sold, expired)
- [ ] Add "Mark as Sold" button
- [ ] Show edit modal/page when user clicks edit
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 5.6

#### 5.8 Frontend - Edit Listing Modal
- [ ] Create EditListingModal component
- [ ] Pre-fill form with current listing data
- [ ] Allow updating: title, description, quantity, price, negotiable, status
- [ ] Prevent image editing (show read-only)
- [ ] Add "Update" button & success/error messages
- [ ] Test update flow
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 5.7

#### 5.9 Frontend - Listing Service & Hooks
- [ ] Create listingService (API calls)
- [ ] Create useListings hook (fetch & cache listings)
- [ ] Create useListing hook (fetch single listing)
- [ ] Create useMyListings hook (user's listings)
- [ ] Implement listing creation helper
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 5.8

#### 5.10 Integration - End-to-End Listing Flow
- [ ] Test create listing from home page
- [ ] Test view listing detail page
- [ ] Test edit/delete listing from my listings
- [ ] Test image uploads & display
- [ ] Test pagination on listings list
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 5.9

---

## 6. Search & Filters

**Module Goal:** Implement distance-first filtering (distance, price, category)  
**Priority:** High  
**Estimated Hours:** 40  
**Status:** Todo  
**Dependencies:** Listings (5)

### Sub-tasks

#### 6.1 Backend - Search & Filter Queries
- [ ] Create query: getListingsByDistance (based on user location & radius)
- [ ] Create query: getListingsByPriceRange (min/max price)
- [ ] Create query: getListingsByCategory (single or multiple)
- [ ] Create combined query: getListingsByFilters (distance + price + category + buy/sell)
- [ ] Add pagination support (limit, offset)
- [ ] Optimize queries with proper indexes
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 5

#### 6.2 Backend - Filter Endpoints
- [ ] GET /api/listings?distance=5&price_min=0&price_max=1000&category=produce&type=sell&page=1
- [ ] Add validation for filter parameters
- [ ] Add error handling for invalid filters
- [ ] Return results with total count
- [ ] Test filter combinations
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 6.1

#### 6.3 Backend - Distance Calculation
- [ ] Implement Haversine formula for distance calculation (lat/long)
- [ ] Set user location in profile (or use IP geolocation)
- [ ] Handle null/missing location gracefully
- [ ] Test distance calculation accuracy
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 6.1

#### 6.4 Backend - Search Endpoint
- [ ] GET /api/listings/search?q=tomato - Text search by title/description
- [ ] Implement full-text search (optional: use PostgreSQL full-text search)
- [ ] Add search term validation
- [ ] Return paginated results
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 6.1

#### 6.5 Frontend - Filter Component
- [ ] Create FilterBar component (distance, price, category dropdowns)
- [ ] Add distance filter options: 2km, 5km, 10km
- [ ] Add price range filter with min/max inputs
- [ ] Add category dropdown (Produce, Livestock, Seeds, Tools, Services)
- [ ] Add buy/sell toggle
- [ ] Add search box
- [ ] Make filter bar sticky on scroll
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 5.10

#### 6.6 Frontend - Home Feed with Filters
- [ ] Integrate FilterBar into HomePage
- [ ] Implement filter state management (useState or Context)
- [ ] Fetch listings based on active filters
- [ ] Display loading state while fetching
- [ ] Display empty state if no results
- [ ] Add pagination controls
- **Est. Hours:** 6 | **Priority:** High | **Dependencies:** 6.5

#### 6.7 Frontend - Listings Display
- [ ] Create ListingCard component (image, title, price, distance, seller, engagement count)
- [ ] Display listings in grid layout (responsive 1-2-3 columns)
- [ ] Add hover effects & shadows
- [ ] Add "See Details" button linking to listing detail page
- [ ] Test card display on mobile/desktop
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 6.6

#### 6.8 Frontend - Search Service & Hooks
- [ ] Create searchService (API calls with filters)
- [ ] Create useSearch hook (manage search state, filters, pagination)
- [ ] Create useFilteredListings hook (fetch listings with filters)
- [ ] Implement debouncing for search input
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 6.7

#### 6.9 Frontend - User Location
- [ ] Get user's location (stored in profile: village, lat/long)
- [ ] Implement location picker (map or manual entry)
- [ ] Use geolocation API (optional, with permission)
- [ ] Store location in user profile
- [ ] Use location for distance calculation
- **Est. Hours:** 4 | **Priority:** High | **Dependencies:** 4.8

#### 6.10 Integration - End-to-End Search Flow
- [ ] Test distance filter: 2km, 5km, 10km
- [ ] Test price range filter
- [ ] Test category filter
- [ ] Test combined filters
- [ ] Test search by text (title/description)
- [ ] Test pagination
- [ ] Test empty state
- **Est. Hours:** 3 | **Priority:** High | **Dependencies:** 6.9

---

## 7. Comments System

**Module Goal:** Implement public comments on listings  
**Priority:** Medium  
**Estimated Hours:** 36  
**Status:** Todo  
**Dependencies:** Listings (5)

### Sub-tasks

#### 7.1 Backend - Comment Model & Queries
- [ ] Create Comment model with fields: id, listing_id, user_id, content, parent_comment_id (for replies), created_at
- [ ] Create queries: getCommentsByListing, createComment, deleteComment, getCommentReplies
- [ ] Add comment validation (min/max length)
- [ ] Add soft delete for comments
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 5

#### 7.2 Backend - Comment Endpoints
- [ ] GET /api/listings/:id/comments - Get all comments for a listing (with pagination)
- [ ] POST /api/listings/:id/comments - Create new comment
- [ ] DELETE /api/comments/:id - Delete comment (owner or admin only)
- [ ] POST /api/comments/:id/replies - Reply to a comment
- [ ] GET /api/comments/:id/replies - Get comment replies
- [ ] Add ownership validation
- **Est. Hours:** 5 | **Priority:** Medium | **Dependencies:** 7.1

#### 7.3 Backend - Comment Notifications
- [ ] Create notification when comment posted on seller's listing
- [ ] Create notification when comment replied to
- [ ] Store notifications in database
- [ ] Retrieve notifications via API
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 7.2

#### 7.4 Frontend - Comments Section Component
- [ ] Create CommentsSection component
- [ ] Display all comments in nested thread format (replies indented)
- [ ] Show comment author, timestamp, content
- [ ] Add reply button/input
- [ ] Add delete button (if owner)
- [ ] Implement infinite scroll or pagination
- **Est. Hours:** 6 | **Priority:** Medium | **Dependencies:** 5.6

#### 7.5 Frontend - Comment Input
- [ ] Create CommentInput component
- [ ] Add text area for comment
- [ ] Add character counter (max 500 chars)
- [ ] Add submit button
- [ ] Add loading/error states
- [ ] Implement reply functionality (prefill with @username)
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 7.4

#### 7.6 Frontend - Like & Interested Buttons (Placeholder)
- [ ] Create engagement button component (👍 Like, ❤️ Interested, 💬 Comment, 📤 Share)
- [ ] Add click handlers (non-functional for now, just UI)
- [ ] Display count badges
- [ ] Style with correct colors & icons
- [ ] Test button styling on different screen sizes
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 5.6

#### 7.7 Frontend - Comment Service & Hooks
- [ ] Create commentService (API calls)
- [ ] Create useComments hook (fetch comments)
- [ ] Create useComment hook (create/delete comment)
- [ ] Implement optimistic updates (show comment immediately, update server)
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 7.6

#### 7.8 Integration - Comments Flow
- [ ] Test post comment on listing detail page
- [ ] Test reply to comment
- [ ] Test delete comment
- [ ] Test comment notifications (placeholder)
- [ ] Test comment display & threading
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 7.7

#### 7.9 Backend - Interested Functionality (Phase 2)
- [ ] Create Interest model (user_id, listing_id)
- [ ] POST /api/listings/:id/interested - Mark as interested
- [ ] DELETE /api/listings/:id/interested - Unmark interested
- [ ] GET /api/listings/:id/interested - Get interested count & users
- [ ] Create notification when user marks interested
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 7.1

#### 7.10 Frontend - Interested Functionality (Phase 2)
- [ ] Implement "Interested" button functionality
- [ ] Toggle interested state
- [ ] Show interested count
- [ ] Add to notifications
- **Est. Hours:** 2 | **Priority:** Medium | **Dependencies:** 7.9

---

## 8. Direct Chat

**Module Goal:** Implement real-time 1-on-1 messaging with seen status  
**Priority:** Medium  
**Estimated Hours:** 60  
**Status:** Todo  
**Dependencies:** User Profile (4), Listings (5)

### Sub-tasks

#### 8.1 Backend - Conversation & Message Models
- [ ] Create Conversation model (listing_id, buyer_id, seller_id, created_at, updated_at)
- [ ] Create Message model (conversation_id, sender_id, receiver_id, content, is_seen, seen_at)
- [ ] Create queries: getConversations, getConversationMessages, createMessage, markMessageAsSeen
- [ ] Add message validation (max length, non-empty)
- [ ] Create unique constraint on conversations (listing, buyer, seller)
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 5, 4

#### 8.2 Backend - Conversation Endpoints
- [ ] GET /api/conversations - Get all conversations for user
- [ ] GET /api/conversations/:id - Get single conversation with messages
- [ ] POST /api/conversations/listing/:id - Create/get conversation for listing
- [ ] GET /api/conversations/:id/messages?page=1 - Get paginated messages
- [ ] Add pagination & sorting (newest first)
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 8.1

#### 8.3 Backend - WebSocket Implementation
- [ ] Set up Socket.io server
- [ ] Implement socket events: connect, disconnect, join_conversation, leave_conversation
- [ ] Implement send_message, receive_message events
- [ ] Implement mark_as_seen event
- [ ] Test socket connections & message delivery
- **Est. Hours:** 6 | **Priority:** Medium | **Dependencies:** 2.2

#### 8.4 Backend - Message Service
- [ ] Create message persistence (save to database)
- [ ] Create seen status update logic
- [ ] Create conversation update logic (last_message_at, last_message_content)
- [ ] Implement socket room management (conversations)
- [ ] Add user online/offline status
- **Est. Hours:** 5 | **Priority:** Medium | **Dependencies:** 8.3

#### 8.5 Backend - Chat Handlers
- [ ] Create socket handlers file: chatHandlers.js
- [ ] Handle: send_message, mark_as_seen, join_conversation, leave_conversation
- [ ] Broadcast messages to receiver
- [ ] Broadcast seen status
- [ ] Handle disconnections gracefully
- [ ] Add error handling & logging
- **Est. Hours:** 6 | **Priority:** Medium | **Dependencies:** 8.4

#### 8.6 Backend - Chat Endpoints
- [ ] POST /api/conversations/:id/send-message - Send message (REST fallback)
- [ ] POST /api/conversations/:id/mark-seen - Mark messages as seen
- [ ] DELETE /api/conversations/:id - Delete conversation
- [ ] Test endpoints with postman/insomnia
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 8.5

#### 8.7 Frontend - Socket.io Setup
- [ ] Create Socket.io service wrapper
- [ ] Implement useSocket hook for component integration
- [ ] Handle socket connection/disconnection
- [ ] Implement socket event listeners
- [ ] Test socket connection from frontend
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 1.4

#### 8.8 Frontend - Chat List Page
- [ ] Create ChatListPage component
- [ ] Display all conversations in list format
- [ ] Show: seller/buyer name, last message preview, timestamp, unread indicator
- [ ] Add delete conversation button
- [ ] Add click to open chat
- [ ] Test responsive layout
- **Est. Hours:** 5 | **Priority:** Medium | **Dependencies:** 8.7

#### 8.9 Frontend - Chat Detail Page
- [ ] Create ChatDetailPage component
- [ ] Display conversation header (seller/buyer, listing name, online status)
- [ ] Display messages in chronological order
- [ ] Show sender/receiver with alignment (left/right)
- [ ] Display message status (✓ sent, ✓✓ seen)
- [ ] Add timestamp for each message
- [ ] Implement auto-scroll to latest message
- **Est. Hours:** 6 | **Priority:** Medium | **Dependencies:** 8.8

#### 8.10 Frontend - Message Input & Sending
- [ ] Create MessageInput component
- [ ] Add text input field
- [ ] Add send button
- [ ] Implement message sending via Socket.io
- [ ] Show loading state while sending
- [ ] Handle send errors
- [ ] Clear input after send
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 8.9

#### 8.11 Frontend - Real-time Message Receiving
- [ ] Implement Socket.io event listener: new_message
- [ ] Add message to chat instantly
- [ ] Play notification sound (optional)
- [ ] Handle message from disconnected user
- [ ] Test message delivery
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 8.10

#### 8.12 Frontend - Seen Status
- [ ] Implement mark_as_seen on message when chat opened
- [ ] Show ✓ (sent) vs ✓✓ (seen) status
- [ ] Broadcast seen status to sender
- [ ] Update sender's message view
- [ ] Test seen status functionality
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 8.11

#### 8.13 Frontend - Chat Service & Hooks
- [ ] Create chatService (API calls for conversations, messages)
- [ ] Create useConversations hook (fetch all conversations)
- [ ] Create useConversation hook (fetch single conversation)
- [ ] Create useChat hook (manage chat state, messages)
- [ ] Implement message caching
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 8.12

#### 8.14 Integration - Chat Flow
- [ ] Test "Direct Chat" button from listing detail page
- [ ] Test conversation creation (buyer → seller)
- [ ] Test message sending & receiving
- [ ] Test seen status
- [ ] Test typing indicator (optional)
- [ ] Test on mobile & desktop
- **Est. Hours:** 5 | **Priority:** Medium | **Dependencies:** 8.13

#### 8.15 Backend - Conversation History
- [ ] Persist all messages in database
- [ ] Retrieve message history on page load
- [ ] Implement pagination for old messages (load more)
- [ ] Test message retrieval & ordering
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 8.2

---

## 9. Notifications

**Module Goal:** Implement in-app notifications for interests, comments, and messages  
**Priority:** Medium  
**Estimated Hours:** 24  
**Status:** Todo  
**Dependencies:** Authentication (3), Chat (8), Comments (7), Listings (5)

### Sub-tasks

#### 9.1 Backend - Notification Model
- [ ] Create Notification model (user_id, type, related_id, message, read, created_at)
- [ ] Notification types: new_comment, new_message, new_interest, listing_expired
- [ ] Create queries: getUserNotifications, markAsRead, deleteNotification
- [ ] Add notification validation
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 3, 8, 7, 5

#### 9.2 Backend - Notification Endpoints
- [ ] GET /api/notifications - Get user's notifications (paginated)
- [ ] POST /api/notifications/:id/read - Mark notification as read
- [ ] DELETE /api/notifications/:id - Delete notification
- [ ] GET /api/notifications/count - Get unread notification count
- [ ] Add user ownership validation
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 9.1

#### 9.3 Backend - Notification Service
- [ ] Create notificationService functions: createNotification, notifyUser
- [ ] Trigger notifications on: new comment, new message, new interest
- [ ] Send notifications via Socket.io
- [ ] Store notifications in database
- [ ] Add notification deduplication (avoid duplicates)
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 9.2

#### 9.4 Backend - Socket.io Notifications
- [ ] Emit notification events to user socket
- [ ] Event: new_notification (send in real-time)
- [ ] Event: notification_read
- [ ] Event: notification_count_update
- [ ] Test notification delivery
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 8.5

#### 9.5 Frontend - Notification Bell Component
- [ ] Create NotificationBell component
- [ ] Show unread notification count badge
- [ ] Add click to open notification dropdown
- [ ] Display recent notifications (5-10)
- [ ] Add "View All" link
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 8.7

#### 9.6 Frontend - Notification List Page
- [ ] Create NotificationsPage component
- [ ] Display all notifications in list format
- [ ] Show notification type with icon (💬 comment, ❤️ interested, 📧 message)
- [ ] Show notification message & timestamp
- [ ] Add mark as read/unread buttons
- [ ] Add delete button
- [ ] Add filter by type (optional)
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 9.5

#### 9.7 Frontend - Real-time Notification Updates
- [ ] Implement Socket.io listener: new_notification
- [ ] Update notification bell count in real-time
- [ ] Add notification to list instantly
- [ ] Show notification toast (optional)
- [ ] Test real-time updates
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 9.6

#### 9.8 Frontend - Notification Service & Hooks
- [ ] Create notificationService (API calls)
- [ ] Create useNotifications hook (fetch notifications)
- [ ] Create useNotificationCount hook (get unread count)
- [ ] Implement Socket.io listeners
- [ ] Add notification polling as fallback
- **Est. Hours:** 3 | **Priority:** Medium | **Dependencies:** 9.7

#### 9.9 Integration - End-to-End Notification Flow
- [ ] Test notification when comment posted on listing
- [ ] Test notification when interested button clicked
- [ ] Test notification when message received
- [ ] Test mark as read
- [ ] Test notification bell update
- [ ] Test delete notification
- **Est. Hours:** 4 | **Priority:** Medium | **Dependencies:** 9.8

#### 9.10 Optional - Toast Notifications
- [ ] Create Toast component (success, error, info)
- [ ] Show toast on: message sent, comment posted, interest marked
- [ ] Auto-dismiss after 3-4 seconds
- [ ] Add close button
- **Est. Hours:** 2 | **Priority:** Low | **Dependencies:** 9.9

---

## Summary Table

| Module # | Module Name | Priority | Est. Hrs | Status | Complete? |
|----------|-------------|----------|----------|--------|-----------|
| 1 | Frontend Setup | High | 16 | Todo | ☐ |
| 2 | Database & Backend Setup | High | 24 | Todo | ☐ |
| 3 | Authentication | High | 40 | Todo | ☐ |
| 4 | User Profile | High | 32 | Todo | ☐ |
| 5 | Listings (CRUD) | High | 48 | Todo | ☐ |
| 6 | Search & Filters | High | 40 | Todo | ☐ |
| 7 | Comments System | Medium | 36 | Todo | ☐ |
| 8 | Direct Chat | Medium | 60 | Todo | ☐ |
| 9 | Notifications | Medium | 24 | Todo | ☐ |
| | **TOTAL** | | **320** | | |

---

## Recommended Implementation Order

1. **Phase 1 - Foundation (Weeks 1-2):**
   - Module 1: Frontend Setup
   - Module 2: Database & Backend Setup

2. **Phase 2 - Core Features (Weeks 3-5):**
   - Module 3: Authentication
   - Module 4: User Profile
   - Module 5: Listings (CRUD)

3. **Phase 3 - Discovery (Week 6):**
   - Module 6: Search & Filters

4. **Phase 4 - Community Features (Weeks 7-9):**
   - Module 7: Comments System
   - Module 8: Direct Chat
   - Module 9: Notifications

5. **Phase 5 - Testing & Deployment (Week 10+):**
   - End-to-end testing
   - Bug fixes
   - Deployment setup

---

## Time Estimates

- **Total MVP Hours:** ~320 hours
- **Assuming 8 hrs/day:** ~40 days (8 weeks)
- **With 2 developers:** ~4 weeks
- **Buffer (20%):** +6-8 weeks (realistic)

---

## Progress Tracking

Update status to "Done" when tasks are completed. Use this format:

```
- [x] Task completed
- [ ] Task not started
- [-] Task in progress
```

Good luck with Mandi! 🚀
