# Mandi

**Connect local buyers and sellers, reducing unnecessary travel and the uncertainty of finding products at weekly markets.**

---

## The Problem

In rural villages across India, weekly markets (mandis/haat) are the lifeline for commerce. Farmers, livestock raisers, and small producers travel hours—sometimes 10-20 km—to reach these markets, investing time, money, and effort into transport.

Yet, every week, the same frustration repeats:

- **Sellers arrive** with their produce or animals, only to find buyers unwilling to pay fair prices. They spend fuel money, time away from home, and effort transporting goods—all for a loss or nothing.
- **Buyers travel** the same distance searching for specific items (a healthy milking cow, particular seeds, fresh vegetables), only to find them unavailable that day.
- **Neighbors miss opportunities** to trade with each other because they don't know what's available. A farmer in Village A sells to the mandi middleman, while a buyer from Village A—just 2 km away—travels 15 km to buy the same item from someone else.

The result: **wasted money, wasted time, wasted opportunity.**

---

## The Solution: Mandi

Mandi is a hyperlocal digital marketplace that connects buyers and sellers within and across nearby villages *before* they travel to the weekly market.

### How It Works

1. **List Locally** — Sellers post products they have available (vegetables, grains, livestock, seeds, tools) or what they're looking to buy.
2. **Discover Nearby** — Buyers browse listings filtered by village, distance (2 km, 5 km, 10 km), and category.
3. **Connect Directly** — Buyers and sellers communicate directly via phone/chat to negotiate price, confirm availability, and arrange pickup or delivery locally.
4. **Save Time & Money** — No unnecessary travel. No middlemen. No surprises.

---

## Key Features

📍 **Local Village Listings**
See products available for sale or wanted within your village and nearby areas. Search by distance, category, and village name.

🔄 **Buy & Sell Listings**
Users can post products they want to sell *and* items they're looking to buy. Create multiple listings, update availability, and manage your profile.

💬 **Direct Communication & Price Negotiation**
Contact sellers/buyers directly via phone or in-app chat. Discuss prices, quantity, condition, and availability without intermediaries.

🐐 **Diverse Categories**
- Produce & Crops (vegetables, grains, fruits, fodder)
- Livestock & Animals (cows, buffaloes, goats, chickens)
- Farm Tools & Services (seeds, fertilizers, equipment rental)
- Local Services (tractor rent, transportation, farm labor)

🌍 **Simple, Village-First Design**
Built for users with varying tech comfort levels. Clear visuals, easy photo uploads, and optional voice/regional language support.

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Vite
- **Backend:** Node.js, Express
- **Database:** PostgreSQL / MongoDB
- **Real-time Communication:** Socket.io / WebSocket
- **Deployment:** Docker, AWS/Railway/Vercel
- **Mobile-First:** Responsive design for low-bandwidth rural areas

---

## Quick Start (Development)

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mandi.git
cd mandi

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Update .env with your database and API keys

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Project Structure

```
mandi/
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── server/              # Backend (Node.js/Express)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
├── docs/                # Documentation
│   ├── ARCHITECTURE.md
│   ├── WORKFLOW.md
│   └── DESIGN.md
├── README.md            # This file
├── .env.example         # Environment variables template
└── package.json         # Root package.json
```

---

## Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design, database schema, API structure, and technical decisions.
- **[WORKFLOW.md](./WORKFLOW.md)** — User workflows, user stories, and interaction flows.
- **[DESIGN.md](./DESIGN.md)** — UI/UX design principles, component library, and wireframes.

---

## How to Contribute

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/your-feature`)
3. **Make your changes** and commit with clear messages
4. **Push** to your fork and **open a Pull Request**

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## Roadmap

- [ ] MVP: Core listing, search, and messaging features
- [ ] User authentication and profiles
- [ ] Image uploads and product galleries
- [ ] Rating & review system
- [ ] Transaction history and seller ratings
- [ ] Mobile app (React Native)
- [ ] WhatsApp integration for messages
- [ ] Regional language support (Hindi, Tamil, etc.)
- [ ] Offline-first features for low connectivity areas

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Questions?

Feel free to open an [issue](https://github.com/yourusername/mandi/issues) or reach out to the maintainers.

**Built with ❤️ for rural communities.**
