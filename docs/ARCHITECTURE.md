# ARCHITECTURE.md

## System Overview

Mandi is a hyperlocal marketplace platform that connects buyers and sellers within nearby villages. This document outlines the technical architecture, database design, API structure, and real-time communication strategy.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React)                      │
│          (Web App - Responsive for mobile & desktop)        │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│   REST API       │      │   WebSocket      │
│  (Express.js)    │      │  (Socket.io)     │
│                  │      │                  │
│ • Auth           │      │ • Live Chat      │
│ • Listings       │      │ • Notifications  │
│ • Search/Filter  │      │ • Seen Status    │
│ • User Profiles  │      │                  │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         └────────────┬────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   PostgreSQL Database  │
         │                        │
         │ • Users               │
         │ • Listings            │
         │ • Messages            │
         │ • Authentication      │
         └────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18+ | UI framework |
| | TailwindCSS | Styling |
| | Vite | Build tool |
| | Axios | HTTP client |
| | Socket.io Client | Real-time chat |
| **Backend** | Node.js 18+ | Runtime |
| | Express.js | Web framework |
| | Socket.io | WebSocket server |
| | JWT | Token-based auth |
| | Nodemailer / Twilio | OTP delivery |
| **Database** | PostgreSQL | Primary datastore |
| **Deployment** | Docker | Containerization |
| | AWS / Railway / Render | Hosting |

---

## Database Schema

### 1. Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  village_name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  profile_picture_url TEXT,
  bio TEXT,
  phone_verified BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```

### 2. OTP Verification Table

```sql
CREATE TABLE otp_verifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  otp_code VARCHAR(6) NOT NULL,
  otp_type ENUM('phone', 'email') NOT NULL,
  destination VARCHAR(255) NOT NULL,
  attempts INT DEFAULT 0,
  max_attempts INT DEFAULT 3,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_otp_user_type ON otp_verifications(user_id, otp_type);
```

### 3. Listings Table

```sql
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('produce', 'livestock', 'seeds', 'tools', 'services', 'other') NOT NULL,
  listing_type ENUM('sell', 'buy') NOT NULL,
  quantity VARCHAR(100),
  unit VARCHAR(50),
  price DECIMAL(10, 2),
  price_negotiable BOOLEAN DEFAULT TRUE,
  image_urls TEXT[],
  village_name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status ENUM('active', 'inactive', 'sold', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days'
);

CREATE INDEX idx_listings_user ON listings(user_id);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_type ON listings(listing_type);
CREATE INDEX idx_listings_village ON listings(village_name);
CREATE INDEX idx_listings_status ON listings(status);
```

### 4. Messages Table

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_seen BOOLEAN DEFAULT FALSE,
  seen_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

### 5. Conversations Table

```sql
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP,
  last_message_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(listing_id, buyer_id, seller_id)
);

CREATE INDEX idx_conversations_buyer ON conversations(buyer_id);
CREATE INDEX idx_conversations_seller ON conversations(seller_id);
CREATE INDEX idx_conversations_listing ON conversations(listing_id);
```

---

## Authentication Flow

### Phone OTP Authentication

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ 1. Enter phone number
       ▼
┌─────────────────────────────┐
│  POST /auth/phone/request   │
│  (Generate OTP, send SMS)   │
└──────┬──────────────────────┘
       │
       │ 2. Receive OTP via SMS
       │
       ▼
┌─────────────────────────────┐
│  POST /auth/phone/verify    │
│  (Verify OTP, issue JWT)    │
└──────┬──────────────────────┘
       │
       │ 3. JWT Token issued
       ▼
┌──────────────┐
│  Logged In   │
└──────────────┘
```

### Email OTP Authentication

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ 1. Enter email
       ▼
┌────────────────────────────┐
│  POST /auth/email/request  │
│  (Generate OTP, send email)│
└──────┬─────────────────────┘
       │
       │ 2. Receive OTP via email
       │
       ▼
┌────────────────────────────┐
│  POST /auth/email/verify   │
│  (Verify OTP, issue JWT)   │
└──────┬─────────────────────┘
       │
       │ 3. JWT Token issued
       ▼
┌──────────────┐
│  Logged In   │
└──────────────┘
```

### Email/Password Registration

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ 1. Enter email & password
       ▼
┌──────────────────────────────┐
│  POST /auth/register         │
│  (Hash password, create user)│
└──────┬───────────────────────┘
       │
       │ 2. Send verification email
       │
       ▼
┌──────────────┐
│  Verify Email│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Logged In   │
└──────────────┘
```

---

## Real-time Chat Architecture

### WebSocket Flow (Socket.io)

```
Client (React)                  Server (Node.js/Socket.io)
     │                                    │
     │──── socket.connect() ────────────▶ │
     │                                    │
     │◀────── connection ack ────────────│
     │                                    │
     │──── join_conversation(conv_id) ──▶│
     │                                    │ (Subscribe to room)
     │◀──── joined_conversation ────────│
     │                                    │
     │──── send_message(msg) ───────────▶│
     │                                    │ (Save to DB)
     │◀──── message_sent(id, timestamp)─│
     │                                    │
     │◀──── new_message(msg) ───────────│ (Broadcast to receiver)
     │                                    │
     │──── mark_as_seen(msg_id) ────────▶│
     │                                    │ (Update DB, broadcast)
     │◀──── message_seen(msg_id) ──────│
```

### Message Lifecycle

1. **Sender sends message** → Message stored in DB with `is_seen = FALSE`
2. **Receiver receives message** → Real-time notification (in-app)
3. **Receiver opens chat** → Automatically marks messages as seen
4. **Sender sees "seen" indicator** → Timestamp displayed

### Socket Events

| Event | Direction | Payload | Purpose |
|-------|-----------|---------|---------|
| `join_conversation` | Client → Server | `{ conversation_id }` | Subscribe to chat room |
| `send_message` | Client → Server | `{ conversation_id, content }` | Send new message |
| `new_message` | Server → Client | `{ id, sender_id, content, timestamp }` | Receive new message |
| `message_sent` | Server → Client | `{ msg_id, timestamp }` | Confirm message delivery |
| `mark_as_seen` | Client → Server | `{ message_ids[] }` | Mark messages as seen |
| `message_seen` | Server → Client | `{ message_ids[], seen_at }` | Broadcast seen status |
| `leave_conversation` | Client → Server | `{ conversation_id }` | Unsubscribe from room |

---

## API Endpoints

### Authentication

```
POST /api/auth/phone/request
  Body: { phone_number }
  Response: { success, message }

POST /api/auth/phone/verify
  Body: { phone_number, otp_code }
  Response: { success, token, user }

POST /api/auth/email/request
  Body: { email }
  Response: { success, message }

POST /api/auth/email/verify
  Body: { email, otp_code }
  Response: { success, token, user }

POST /api/auth/register
  Body: { email, password, full_name, phone_number, village_name }
  Response: { success, token, user }

POST /api/auth/login
  Body: { email, password }
  Response: { success, token, user }

POST /api/auth/logout
  Headers: { Authorization: Bearer <token> }
  Response: { success }
```

### Listings

```
GET /api/listings
  Query: { category, listing_type, village_name, distance, page, limit }
  Response: { listings[], total, page, limit }

GET /api/listings/:id
  Response: { listing }

POST /api/listings
  Headers: { Authorization: Bearer <token> }
  Body: { title, description, category, listing_type, quantity, unit, price, images[], village_name }
  Response: { listing }

PUT /api/listings/:id
  Headers: { Authorization: Bearer <token> }
  Body: { title, description, category, quantity, price, status }
  Response: { listing }

DELETE /api/listings/:id
  Headers: { Authorization: Bearer <token> }
  Response: { success }

GET /api/listings/user/:user_id
  Response: { listings[] }
```

### Users

```
GET /api/users/:id
  Response: { user }

PUT /api/users/:id
  Headers: { Authorization: Bearer <token> }
  Body: { full_name, bio, profile_picture_url, village_name }
  Response: { user }

GET /api/users/:id/listings
  Response: { listings[] }
```

### Conversations & Messages

```
GET /api/conversations
  Headers: { Authorization: Bearer <token> }
  Response: { conversations[] }

GET /api/conversations/:id/messages
  Query: { page, limit }
  Response: { messages[], total }

POST /api/conversations/:id/mark-seen
  Headers: { Authorization: Bearer <token> }
  Body: { message_ids[] }
  Response: { success }

GET /api/conversations/listing/:listing_id
  Headers: { Authorization: Bearer <token> }
  Response: { conversation }
```

---

## Directory Structure

```
mandi/
├── client/                      # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Listings/
│   │   │   ├── Chat/
│   │   │   └── Common/
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ListingDetailPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useSocket.js
│   │   │   └── useListings.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                      # Backend (Node.js/Express)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── listings.js
│   │   │   ├── users.js
│   │   │   └── conversations.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── listingController.js
│   │   │   ├── userController.js
│   │   │   └── messageController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Listing.js
│   │   │   ├── Message.js
│   │   │   └── Conversation.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── services/
│   │   │   ├── otpService.js
│   │   │   ├── jwtService.js
│   │   │   └── socketService.js
│   │   ├── socket/
│   │   │   └── chatHandlers.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md           # This file
│   ├── WORKFLOW.md
│   ├── DESIGN.md
│   └── database-migrations/
│
├── docker-compose.yml
├── Dockerfile
├── README.md
├── .gitignore
└── package.json
```

---

## Deployment Strategy

### Local Development

```bash
# Use docker-compose for PostgreSQL
docker-compose up -d

# Start backend server
cd server && npm run dev

# Start frontend server (in another terminal)
cd client && npm run dev
```

### Production Deployment

**Backend & WebSocket Server:**
- Deploy on AWS EC2 / Railway / Render
- Use environment variables for sensitive data
- Enable HTTPS/SSL
- Configure CORS for frontend domain

**Database:**
- PostgreSQL on AWS RDS / Railway
- Regular backups enabled
- Connection pooling configured

**Frontend:**
- Deploy on Vercel / Netlify / AWS S3 + CloudFront
- Enable CDN for faster asset delivery

---

## Security Considerations

1. **Authentication:** JWT tokens with expiration
2. **OTP Validation:** Rate limiting (max 3 attempts per OTP)
3. **Database:** SQL parameterized queries to prevent SQL injection
4. **CORS:** Restricted to frontend domain
5. **Input Validation:** Server-side validation on all endpoints
6. **HTTPS:** All communications encrypted
7. **Password Hashing:** bcrypt with salt rounds

---

## Performance Optimization

1. **Database Indexing:** Indexes on frequently queried columns
2. **Pagination:** Limit results per page (default 20)
3. **Caching:** Redis for OTP/session data (future)
4. **Image Optimization:** Compress and serve resized images
5. **WebSocket Rooms:** Efficient message broadcasting per conversation

---

## Scalability Path

### Phase 1 (MVP): 1-2 villages, ~500 users
- Single PostgreSQL instance
- Basic WebSocket server
- Simple authentication

### Phase 2: 5-10 villages, ~5000 users
- Connection pooling
- Redis for caching
- Message queue (Bull/RabbitMQ) for async tasks

### Phase 3: State-wide expansion, ~50000+ users
- Database replication & sharding
- Load balancer
- Microservices architecture
- Global CDN

---

## Error Handling

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Human-readable message",
  "data": { /* response data */ },
  "error": { /* error details if applicable */ }
}
```

---

## Future Enhancements

- [ ] Payment integration (Stripe / PayU)
- [ ] Transaction history & ratings
- [ ] Mobile app (React Native)
- [ ] WhatsApp integration for messages
- [ ] Regional language support
- [ ] Offline-first capabilities
- [ ] Image recognition for product categorization
- [ ] Recommendation engine based on user history
