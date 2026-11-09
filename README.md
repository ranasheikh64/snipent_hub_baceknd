# snipent_hub_baceknd

Backend Core Architecture and API Controllers for **SnippetHub** — The Developer's Neo-Brutalist Code Vault.

---

## 🏛️ Architecture Overview

The backend strictly follows Clean Architecture principles:

```
src/
├── api/                  # API Route Controllers (Endpoints)
│   ├── auth/             # Login, Register, Me, GitHub OAuth
│   ├── snippets/         # CRUD, Stars, Copy count, Q&A, Fork
│   ├── blogs/            # CRUD, Likes, Comments & Replies
│   ├── communities/      # Spaces, Hashtags, Join/Leave
│   ├── profile/          # User stats, published/starred items
│   ├── notifications/    # Questions & unread indicators
│   ├── upload/           # Cloudinary image upload handler
│   └── seed/             # Database initialization endpoint
├── backend/              # Clean Backend Core
│   ├── config/           # Database (MongoDB Mongoose) & Cloudinary
│   ├── models/           # Mongoose schemas (User, Snippet, Blog, Community, Note, Category)
│   ├── services/         # Business logic layer (Auth, Snippet, Blog, Community)
│   ├── repositories/     # Data access layer
│   └── data/             # Seeding datasets and initial configurations
└── scripts/
    └── seed.js           # Direct CLI database seeder
```

---

## 🛠️ Tech Stack & Dependencies

- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies + bcryptjs password hashing
- **OAuth**: GitHub OAuth 2.0 Integration
- **Media Storage**: Cloudinary SDK (Image avatars & uploads)
- **Language**: TypeScript (Strict typing)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` or `.env` file based on `.env.example`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed Database
```bash
npm run seed
```

---

## 📡 Key API Routes

### Authentication
- `POST /api/auth/register` — Create new developer account
- `POST /api/auth/login` — Sign in and receive JWT token
- `GET /api/auth/me` — Verify session and fetch current user
- `GET /api/auth/github` — Initiate GitHub OAuth flow
- `GET /api/auth/github/callback` — Exchange OAuth code & authenticate

### Snippets
- `GET /api/snippets` — Query snippets with category, technology, search & tags
- `POST /api/snippets` — Create new multi-file snippet
- `GET /api/snippets/:id` — Get snippet details
- `POST /api/snippets/:id/star` — Toggle star bookmark
- `POST /api/snippets/:id/copy` — Increment copy counter
- `POST /api/snippets/:id/fork` — Fork snippet to user's collection
- `POST /api/snippets/:id/questions` — Ask question on snippet
- `POST /api/snippets/:id/questions/:qid` — Answer question on snippet

### Blogs
- `GET /api/blogs` — Retrieve published articles
- `POST /api/blogs` — Create developer article
- `POST /api/blogs/:id/like` — Toggle like on article
- `POST /api/blogs/:id/comments` — Comment & reply system

### Communities
- `GET /api/communities` — Fetch developer communities
- `POST /api/communities` — Create new space with hashtag
- `POST /api/communities/:id/join` — Join / Leave community
