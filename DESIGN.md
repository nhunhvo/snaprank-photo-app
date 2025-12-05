# SnapRank - Technical Design

## Overview

SnapRank is a React-based single-page application for photo competitions. Users upload photos to compete in categories, vote on submissions, and track scores on a leaderboard.

## Architecture

**Client-side only** - Everything runs in the browser with no backend server.

```
Browser
├── React App (UI)
├── Context API (State)
└── localStorage (Data)
```

## Technologies Used

- **React 18.3.1** - UI framework with component-based architecture
- **TypeScript 5.x** - Type safety and better developer experience
- **Vite 6.3.5** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side navigation
- **Lucide React** - Icons

## Key Design Decisions

### Why No Backend?

- Simpler deployment (just static files)
- No server costs or maintenance
- Fast development without API setup
- Perfect for educational projects

**Trade-off:** Data only persists locally in browser storage.

### Why Context API Instead of Redux?

- Simpler for small/medium apps
- Less boilerplate code
- Built into React (no extra library)

### Why localStorage?

- Simple key-value storage
- Synchronous API (easier to use)
- Sufficient for <10MB of data
- Works offline by default

## Project Structure

```
src/
├── components/          # UI components
│   ├── HomePage.tsx
│   ├── AuthPage.tsx
│   ├── UploadPage.tsx
│   ├── LeaderboardPage.tsx
│   └── ...
├── context/            # State management
│   ├── AuthContext.tsx
│   └── AppContext.tsx
├── types/             # TypeScript types
│   └── index.ts
└── App.tsx            # Main app + routing
```

## State Management

### AuthContext (`src/context/AuthContext.tsx`)

Manages authentication state:
- Current logged-in user
- Login/signup/logout functions
- Demo user initialization

**Storage:** `auth-user` key in localStorage

### AppContext (`src/context/AppContext.tsx`)

Manages app data:
- Users, photos, categories, votes
- CRUD operations (create, update, delete)
- Leaderboard calculations

**Storage:** `snaprank-data` key in localStorage

## Authentication Flow

1. User enters email/password on `AuthPage`
2. `AuthContext.login()` validates credentials
3. If valid, user saved to localStorage and state
4. `App.tsx` detects auth state and shows main app
5. User clicks logout → clears auth, returns to login

**Demo Account:**
- Email: `demo@snaprank.com`
- Password: `demo123`

## Data Models

### User
```typescript
{
  id: string           // Unique identifier
  name: string         // Display name
  email: string        // For login
  avatar?: string      // Profile picture
  bio?: string         // User description
}
```

### Photo
```typescript
{
  id: string           // Unique identifier
  title: string        // Photo title
  imageUrl: string     // Base64 or URL
  userId: string       // Who uploaded it
  categoryId: string   // Which category
  uploadDate: string   // ISO timestamp
}
```

### Vote
```typescript
{
  userId: string       // Who voted
  photoId: string      // Which photo
  value: number        // 1-5 stars
}
```

## Key Algorithms

### Leaderboard Calculation

For each user:
1. Get all their photos
2. For each photo, get all votes
3. Calculate average rating
4. Sum all average ratings = user score
5. Sort users by total score descending

```typescript
// Simplified version
const userScore = user.photos
  .map(photo => average(photo.votes))
  .reduce((sum, avg) => sum + avg, 0)
```

### Hall of Fame

- Filter photos with avg rating ≥ 4.0
- Sort by rating (highest first)
- Display with user info

## Component Patterns

### Page Components

Full-screen views (HomePage, UploadPage, etc.):
- Use context hooks: `useAuth()`, `useApp()`
- Handle routing and navigation
- Manage local UI state (forms, filters)

### Reusable UI Components

Located in `src/components/ui/`:
- Generic, styled components (Button, Card, Input)
- No business logic
- Accept props for customization

## Data Persistence

**On Load:**
```typescript
useEffect(() => {
  const saved = localStorage.getItem('snaprank-data')
  if (saved) setData(JSON.parse(saved))
}, [])
```

**On Change:**
```typescript
useEffect(() => {
  localStorage.setItem('snaprank-data', JSON.stringify(data))
}, [data])
```

## Routing

Uses React Router v6:

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/upload" element={<UploadPage />} />
  <Route path="/leaderboard" element={<LeaderboardPage />} />
  <Route path="/category/:id" element={<CategoryDetailPage />} />
  <Route path="/profile/:id" element={<ProfilePage />} />
  <Route path="/hall-of-fame" element={<HallOfFamePage />} />
</Routes>
```

Navigation bar renders on all pages via `Navigation.tsx`.

## Error Handling

**Form Validation:**
- Email format check (regex)
- Password length (min 6 chars)
- Required fields

**Defensive Coding:**
- Optional chaining: `user?.avatar`
- Fallbacks: `data || defaultData`
- Try-catch for JSON parsing

## Limitations

1. **Local Storage Only** - Data doesn't sync across devices
2. **No Real Authentication** - Client-side only, not secure
3. **No Image Optimization** - Base64 images can be large
4. **Browser Storage Limit** - ~5-10MB max
5. **No Collaboration** - Single-user experience

## Future Improvements

To make production-ready:

1. **Add Backend**
   - Node.js + Express or Firebase
   - Real authentication (JWT tokens)
   - Database (PostgreSQL, MongoDB)

2. **Image Hosting**
   - Upload to Cloudinary or AWS S3
   - Thumbnails and optimization

3. **Real-time Features**
   - WebSockets for live updates
   - Notifications

4. **Security**
   - HTTPS
   - Input sanitization
   - Rate limiting

5. **Performance**
   - Lazy loading
   - Virtual scrolling for large lists
   - Code splitting

## Development Workflow

1. **Start Dev Server**
   ```
   npm run dev
   ```
   Runs on `http://localhost:3000`

2. **Make Changes**
   - Edit files in `src/`
   - Hot reload shows changes instantly

3. **Build for Production**
   ```
   npm run build
   ```
   Outputs to `dist/` folder

## Testing the App

1. Log in with demo account or create new account
2. Upload a photo to any category
3. Go to category page and vote on photos
4. Check leaderboard to see rankings
5. Visit Hall of Fame for top photos
6. View user profiles

## Technical Challenges Solved

### Challenge 1: Authentication Without Backend
**Solution:** Store hashed passwords in localStorage, validate on client-side.

### Challenge 2: Keeping Auth and App State Synced
**Solution:** AppContext watches AuthContext and auto-syncs the current user.

### Challenge 3: Preventing Vote Manipulation
**Solution:** Track votes by userId+photoId pairs, prevent duplicate votes.

### Challenge 4: Calculating Accurate Rankings
**Solution:** Average all photo votes first, then sum per user for total score.

## Why This Design Works

- **Simple to understand** - No complex backend or database
- **Fast to develop** - Minimal setup, no API design
- **Easy to demo** - Just open in browser
- **Good for learning** - See how React, state, and routing work together
- **Extensible** - Can add backend later without major rewrites

---

**Note:** This is a prototype/educational project. For production use, implement proper backend authentication, database, and security measures.
