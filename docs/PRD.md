# PRD.md — Product Requirements Document

## 1. Product Overview

**Product name:** Mandi (गाँव का बाज़ार)
**One-liner:** A hyperlocal digital marketplace that connects rural buyers and sellers within and across nearby villages *before* they travel to the weekly mandi/haat.
**Vision:** Any farmer or villager can list, discover, and negotiate within a 10 km radius from a cheap Android phone on 2G/3G — saving travel money, time, and wasted trips.

---

## 2. Problem Statement

In rural India, weekly markets (mandi/haat) are the primary commerce channel. Every week:

| Actor | Pain |
|-------|------|
| **Seller** | Travels 10–20 km with produce/livestock, finds buyers unwilling to pay fair price → wasted fuel, time, and effort |
| **Buyer** | Travels to find a specific item (milking cow, seeds, fresh vegetables) → item unavailable that day |
| **Neighbors** | A seller and buyer in the SAME village miss each other because neither knows the other has what they need |

Net result: **wasted money, wasted time, missed opportunities.**

---

## 3. Goals & Non-Goals

### Goals
1. Surface all supply/demand within a village cluster (≤ 10 km) **before** market day.
2. Enable direct buyer↔seller negotiation (no middlemen, no commission).
3. Be usable by farmers with low tech literacy: visual-first, bilingual (Hindi/English), few steps per task.
4. Work on low-end Android browsers with slow data.

### Non-Goals (for MVP)
- Payments / escrow (transactions happen offline: cash/UPI at pickup)
- Delivery logistics as a product feature
- Ratings/reviews/reputation system (Phase 2)
- Native mobile app (responsive web only)
- Regional languages beyond Hindi + English

---

## 4. Target Users & Personas

| Persona | Description | Primary needs |
|---------|-------------|---------------|
| **Ramesh — Farmer/Seller (45)** | Grows wheat & vegetables in Rampur. Basic Android, WhatsApp-level skills. | Post what he has, get callers, sell fast without travel |
| **Sunita — Dairy Producer (38)** | Makes A2 ghee/curd. Wants repeat local buyers. | Be discoverable nearby, chat/answer questions |
| **Amit — Service Provider (30)** | Owns a tractor, rents it hourly. | Booking via phone/chat, visibility in radius |
| **Priya — Local Buyer (34)** | Buys produce in bulk for local shops; also wants specific seeds/livestock. | Filter by distance/category/price, see availability before travelling |

---

## 5. User Stories (MVP)

Authentication:
- As a villager, I can sign up with just my **10-digit mobile number + OTP** (no passwords required).
- As a user, I can instead use **email/password** or **email OTP** if I don't want to use my phone.

Profile:
- After auth, I must complete a profile (**name, village, bio, photo**) before posting.
- I can view and edit my profile and see my active ads.

Listings:
- As a seller, I can post a **Sell** listing (category, title, photos ≤ 5, price per unit, quantity, negotiable flag, village).
- As a buyer, I can post a **Buy** (wanted) listing.
- Managing: mark sold, edit non-image fields, delete listings; listings auto-expire after 30 days.

Discovery:
- As a buyer, I can filter the feed by **distance radius (2/5/10 km), category, buy/sell, price range**, and sort by recent/distance/price.
- As a user, I can search by keyword (title/description/village).

Engagement:
- As a buyer, I can ask a **public question/comment** on any listing (with seller replies).
- As a buyer, I can mark a listing **Interested**.
- As a buyer, I can **direct chat** with the seller 1-on-1 with ✓/✓✓ seen status, tied to a specific listing.

Notifications:
- As a seller, I get notified for new comments, interests, and chat messages on my listings.

---

## 6. Feature Requirements — MVP Scope

### 6.1 Auth (Module 3)
- Phone OTP (primary), Email OTP, Email/password registration+login; JWT (24h) with refresh.
- OTP: 6 digits, 5-min expiry, max 3 attempts, rate-limited.

### 6.2 Profile (Module 4)
- Mandatory profile setup after first login (name, village, bio, photo).
- GET/PUT profile, profile picture upload, user's listings list.

### 6.3 Listings CRUD (Module 5)
- Fields: type (sell/buy), category (produce, vegetables, fruits, dairy, livestock, seeds, equipment, services, other), title, description, quantity + unit, price + price_unit, negotiable, images (≤ 5, ≤ 5 MB each), village, lat/long, status (active/inactive/sold/expired).
- Auto-expiry after 30 days; soft-delete.

### 6.4 Search & Filters (Module 6)
- Distance-first filtering using Haversine distance from user location.
- Query params: `distance, price_min, price_max, category, type, q, page, limit`.
- Full-text search on title/description.

### 6.5 Comments & Interested (Module 7)
- Public threaded comments (one-level replies), soft delete by owner.
- Interest toggle with counts (Phase 2 of module).

### 6.6 Direct Chat (Module 8)
- One conversation per (listing, buyer, seller) — unique constraint.
- Socket.io rooms per conversation; REST fallback endpoints.
- Seen receipts (`is_seen`, `seen_at`); persisted history, paginated.

### 6.7 Notifications (Module 9)
- In-app: new_comment, new_message, new_interest, listing_expired.
- Real-time push via Socket.io + polling fallback; bell with unread count.

---

## 7. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| Performance | Feed API < 500 ms P95 for 5k listings; images compressed/resized |
| Availability | 99%+ on Railway/Render hosting tier; DB backups |
| Language | UI first in Hindi-English mix; code in **TypeScript** |
| scalability (Phase 1) | Single Postgres instance, ~500 users, 1–2 villages |
| Security | JWT auth, hashed passwords (bcrypt), OTP rate limiting, parameterized SQL, CORS restricted |
| Low bandwidth | Mobile-first pages < 200 KB JS gzip initial load, lazy images |

---

## 8. Success Metrics

- # listings created per village per week (target ≥ 20 active listings per cluster)
- # buyer-seller contacts (chat started / call click) per week
- % of conversations that lead to an exchange (survey at pickup, MVP: proxy = chats with message exchange)
- Weekly active users (target ≥ 100 by end of pilot)
- Zero-commission: payments always direct between parties

---

## 9. Constraints & Assumptions

- Users are on Android mobile browsers mainly; desktop secondary.
- Village picker initially manual (dropdown of cluster villages); GPS is enhancement.
- SMS/email delivery via Twilio/Nodemailer — needs provider keys; dev mode can print OTP to console.
- No KYC in MVP; verification is a manual "Verified Village Member" badge (Phase 2).

---

## 10. Milestones

| Milestone | Contents | Status |
|-----------|----------|--------|
| M0 | Docs, repo setup, frontend skeleton (TS) | ✅ Done |
| M1 | Backend + DB setup, Auth | ⬜ Next |
| M2 | Profile, Listings CRUD | ⬜ |
| M3 | Search/filters, comments, interested | ⬜ |
| M4 | Direct chat with seen status | ⬜ |
| M5 | Notifications, polish, deploy pilot | ⬜ |

---

## 11. Open Questions

1. Village database: seeded list per pilot district vs. user-added villages?
2. WhatsApp integration (Phase 2)? — likely wa.me deep links for chat fallback.
3. Should "Buy" (wanted) listings auto-expire faster (e.g., 14 days)?
4. Moderate listings (spam/photos) — manual review in pilot, or post-moderation reporting only?
