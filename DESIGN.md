# SnapRank - Technical Design

## Overview

SnapRank is a React-based single-page application for photo competitions. Users upload photos to compete in categories, vote on submissions, and track scores on a leaderboard.

## Architecture

**Client-side only** - Everything runs in the browser with no backend server.

## Technologies Used

### Design
- **Figma** - UI/UX design and layout prototyping

### Development
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
- Good for protoyping usually large scale projects such as social media apps

**Trade-off:** Data only persists locally in browser storage and is lost when user refreshes.

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

## Key Algorithms

### Leaderboard Calculation

For each user:
1. Get all their photos
2. For each photo, get all votes
3. Calculate average rating
4. Sum all average ratings = user score
5. Sort users by total score descending

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

## Error Handling

The app uses multiple layers of error handling to ensure a smooth user experience:

### 1. Form Validation

**Authentication Forms** (`AuthPage.tsx`):
- **Email validation**: Regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` checks for valid format
- **Password validation**: Minimum 6 characters required
- **Empty field checks**: All required fields must be filled
- **User feedback**: Error messages displayed via Sonner toast notifications

**Upload Forms** (`UploadPage.tsx`):
- **File type validation**: Only image files accepted (jpg, png, gif, etc.)
- **Required fields**: Title and category must be selected
- **User feedback**: Toast notifications for success/error states

### 2. Defensive Coding Patterns

**Optional Chaining**:
```typescript
// Safely access nested properties
const avatarUrl = user?.avatar || '/default-avatar.png'
const photoCount = user?.photos?.length || 0
```

**Nullish Coalescing**:
```typescript
// Provide fallback values
const displayName = user.name ?? 'Anonymous User'
const votes = photo.votes || []
```

**Array Safety**:
```typescript
// Ensure arrays exist before operations
const topPhotos = (photos || []).filter(p => p.rating >= 4.0)
```

### 3. LocalStorage Error Handling

**Data Loading** (`AuthContext.tsx`, `AppContext.tsx`):
```typescript
try {
  const saved = localStorage.getItem('snaprank-data')
  const data = saved ? JSON.parse(saved) : defaultData
  setAppData(data)
} catch (error) {
  console.error('Failed to load data:', error)
  setAppData(defaultData) // Fall back to defaults
}
```

**Data Saving**:
```typescript
try {
  localStorage.setItem('snaprank-data', JSON.stringify(data))
} catch (error) {
  console.error('Failed to save data:', error)
  // Show user notification that data wasn't saved
  toast.error('Failed to save changes')
}
```

### 4. Authentication Error Handling

**Login Validation** (`AuthContext.tsx`):
```typescript
const login = (email: string, password: string) => {
  // Check if user exists
  const user = users.find(u => u.email === email)
  if (!user) {
    toast.error('User not found')
    return false
  }
  
  // Verify password
  if (user.password !== password) {
    toast.error('Invalid password')
    return false
  }
  
  // Success
  setAuthUser(user)
  return true
}
```

**Signup Validation**:
- Checks for duplicate emails
- Validates all required fields
- Creates user only if validation passes

### 5. Navigation Guards

**Protected Routes** (`App.tsx`):
```typescript
// Redirect to auth page if not logged in
if (!isAuthenticated) {
  return <AuthPage />
}

// Show main app only when authenticated
return <MainApp />
```

### 6. Vote Validation

**Preventing Duplicate Votes** (`AppContext.tsx`):
```typescript
const addVote = (photoId: string, value: number) => {
  // Check if user already voted
  const existingVote = votes.find(
    v => v.photoId === photoId && v.userId === currentUser.id
  )
  
  if (existingVote) {
    toast.error('You already voted on this photo')
    return
  }
  
  // Add new vote
  setVotes([...votes, { userId, photoId, value }])
}
```

### 7. Image Upload Error Handling

**File Reader Errors**:
```typescript
const handleImageUpload = (file: File) => {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    const imageUrl = e.target?.result as string
    setImagePreview(imageUrl)
  }
  
  reader.onerror = () => {
    toast.error('Failed to read image file')
  }
  
  reader.readAsDataURL(file)
}
```

### 8. User Feedback

**Toast Notifications** (using Sonner):
- Success messages: "Photo uploaded!", "Login successful!"
- Error messages: "Invalid credentials", "Upload failed"
- Warning messages: "Storage limit reached"

**Visual States**:
- Loading spinners during operations
- Disabled buttons to prevent double-clicks
- Form field error highlights

### Error Handling Philosophy

The app follows these principles:

1. **Fail Gracefully** - Never crash, always provide fallbacks
2. **User-Friendly Messages** - Clear explanations, not technical jargon
3. **Defensive Defaults** - Assume data might be missing or invalid
4. **Early Validation** - Check inputs before processing
5. **Silent Recovery** - Fix minor issues automatically, only notify on critical errors

## Limitations

1. **Local Storage Only** - Data doesn't sync across devices
2. **No Real Authentication** - Client-side only, not secure
3. **No Image Optimization** - Base64 images can be large
4. **Browser Storage Limit** - ~5-10MB max
5. **No Collaboration** - Single-user experience

## Future Improvements

1. **Add Backend**
   - Use Node.js + Express or Firebase
   - Add real login + signup with JWT or Firebase Auth.
   - DStore data in PostgreSQL or MongoDB.

2. **Image Hosting**
   - Upload photos to Cloudinary or AWS S3
   - Use thumbnails

3. **Real-time Features**
   - Use WebSockets for live updates
   - Add basic notifications

4. **Security**
   - Run site on HTTPS
   - Add rate limits so people can’t spam the server.

5. **Performance**
   - Virtual scrolling for long feeds so page doesn't lag
   - Split code into smaller chunks so pages load faster

## Why This Design

- **Simple to understand** - No complex backend or database
- **Fast to develop** - Minimal setup, no API design
- **Easy to demo** - Just run and open in browser
- **Extensible** - Can add backend later without major rewrites

