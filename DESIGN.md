# SnapRank - Technical Design Document

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Design Decisions](#design-decisions)
- [State Management](#state-management)
- [Authentication System](#authentication-system)
- [Data Flow](#data-flow)
- [Component Architecture](#component-architecture)
- [Algorithms and Logic](#algorithms-and-logic)
- [Performance Considerations](#performance-considerations)
- [Security Considerations](#security-considerations)
- [Future Scalability](#future-scalability)

---

## Architecture Overview

SnapRank is built as a **client-side single-page application (SPA)** using React with TypeScript. The application follows a component-based architecture with centralized state management using React Context API.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   React Application                    │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │   UI Layer   │──│  State Layer │──│  Data Layer │ │  │
│  │  │  (Components)│  │   (Context)  │  │(localStorage)│ │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Design Philosophy

1. **Client-Side First**: No backend dependency for core functionality
2. **Component Isolation**: Each component is self-contained and reusable
3. **Type Safety**: TypeScript for compile-time error detection
4. **Reactive State**: Centralized state with automatic UI updates
5. **localStorage Persistence**: Simple data persistence without databases

---

## Technology Stack

### Core Technologies

**React 18.3.1**
- **Why:** Industry-standard UI library with mature ecosystem
- **Benefits:** 
  - Component reusability
  - Virtual DOM for performance
  - Large community support
  - Rich tooling ecosystem

**TypeScript 5.x**
- **Why:** Static typing for JavaScript
- **Benefits:**
  - Catch errors at compile-time
  - Better IDE support (autocomplete, refactoring)
  - Self-documenting code
  - Easier refactoring and maintenance

**Vite 6.3.5**
- **Why:** Modern build tool and dev server
- **Benefits:**
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - ES modules support
  - Better DX than webpack

### Supporting Libraries

**Tailwind CSS 3.x**
- **Why:** Utility-first CSS framework
- **Benefits:**
  - Rapid UI development
  - No CSS file bloat
  - Responsive design utilities
  - Consistent design system
- **Trade-offs:** Verbose class names, but improved by component abstraction

**Radix UI**
- **Why:** Unstyled, accessible component primitives
- **Benefits:**
  - WAI-ARIA compliant
  - Keyboard navigation support
  - Screen reader friendly
  - Customizable styling
- **Choice over Material-UI:** More flexibility, smaller bundle size

**Lucide React**
- **Why:** Icon library
- **Benefits:**
  - Consistent design
  - Tree-shakeable (only import used icons)
  - TypeScript support
- **Choice over Font Awesome:** Lighter weight, better performance

**Sonner**
- **Why:** Toast notification library
- **Benefits:**
  - Beautiful default design
  - Accessible
  - Simple API
  - TypeScript support

---

## Design Decisions

### Why No Backend?

**Decision:** Build as a client-side-only application using localStorage

**Rationale:**
1. **Simplicity**: No server deployment, database setup, or API development needed
2. **Portability**: Runs anywhere - just serve static files
3. **Learning Focus**: Demonstrates frontend architecture without backend complexity
4. **Rapid Prototyping**: Faster development and iteration
5. **Demo-Friendly**: Easy to test and showcase without infrastructure

**Trade-offs:**
- ❌ No multi-device sync
- ❌ Data only in browser (lost if cleared)
- ❌ No true multi-user collaboration
- ❌ Not production-ready for real users
- ✅ But perfect for demonstration and learning

**Migration Path:** 
- Detailed in `AUTHENTICATION.md`
- Context API structure makes backend integration straightforward
- Would replace localStorage calls with API calls
- State management logic remains unchanged

### Why React Context Over Redux?

**Decision:** Use React Context API for state management

**Rationale:**
1. **Built-in Solution**: No additional dependencies
2. **Sufficient Complexity**: App state is manageable without Redux
3. **Simpler Mental Model**: Direct state updates vs. actions/reducers
4. **Less Boilerplate**: Context is more concise for this use case
5. **Better for Learning**: Easier to understand flow

**When Redux Would Be Better:**
- Larger app with complex state interactions
- Need for time-travel debugging
- Multiple developers needing strict patterns
- Advanced middleware requirements

**Current Structure:**
```typescript
AppContext: {
  users,
  photos,
  categories,
  currentUser,
  // ... methods for state updates
}

AuthContext: {
  user,
  isAuthenticated,
  login,
  signup,
  logout
}
```

### Why localStorage Over IndexedDB?

**Decision:** Use localStorage for data persistence

**Rationale:**
1. **Simpler API**: Synchronous, key-value storage
2. **Sufficient for Demo**: Data volume is small
3. **Universal Support**: Works in all modern browsers
4. **Easy to Inspect**: Dev tools show localStorage clearly
5. **No Schema Management**: Simple JSON serialization

**Limitations:**
- ~5-10MB storage limit (sufficient for demo)
- Synchronous (can block UI for large data)
- String-only storage (requires JSON serialization)

**When IndexedDB Would Be Better:**
- Storing large images (not just URLs)
- Offline-first PWA
- Complex querying needs
- Storage > 10MB

### Component Architecture Pattern

**Decision:** Container/Presentational pattern with functional components

**Structure:**
```
Page Components (Container)
  ↓
  - Fetch data from Context
  - Handle business logic
  - Pass data to presentational components
  ↓
Presentational Components
  - Receive props
  - Render UI
  - Emit events to parent
```

**Example:**
```typescript
// Container (HomePage.tsx)
export const HomePage = ({ onCategoryClick }) => {
  const { categories, createCategory } = useApp();
  
  // Business logic
  const handleCreate = (data) => {
    createCategory(data);
  };
  
  // Pass to presentational components
  return <CategoryList categories={categories} onCreate={handleCreate} />;
};
```

**Benefits:**
- Separation of concerns
- Reusable presentational components
- Easier testing
- Clear data flow

---

## State Management

### Context Structure

We use **two separate contexts** for distinct concerns:

#### AuthContext

**Purpose:** Authentication state and user session management

**State:**
```typescript
interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, profilePicture?: string) => Promise<boolean>;
  logout: () => void;
}
```

**Why Separate:**
- Auth logic is independent from app logic
- Could be replaced with third-party auth (Firebase, Auth0)
- Clear separation of security concerns
- Easier to test in isolation

#### AppContext

**Purpose:** Application data and business logic

**State:**
```typescript
interface AppContextType {
  currentUser: User | null;
  users: User[];
  categories: Category[];
  photos: Photo[];
  addPhoto: (photo: Omit<Photo, 'id' | 'uploadedAt' | 'likes' | 'dislikes' | 'votedBy'>) => void;
  votePhoto: (photoId: string, vote: 'like' | 'dislike') => void;
  createCategory: (category: Omit<Category, 'id'>) => void;
  deletePhoto: (photoId: string) => void;
  archivePhoto: (photoId: string) => void;
  updateUserBadges: (selectedBadgeIds: string[]) => void;
  getLeaderboard: (categoryId: string) => LeaderboardEntry[];
  getHallOfFame: (type: 'monthly' | 'category' | 'overall', categoryId?: string) => HallOfFameEntry[];
  joinPrivateCategory: (shareCode: string) => boolean;
  canAccessCategory: (categoryId: string) => boolean;
}
```

**Why Not Combined:**
- Single Responsibility Principle
- Auth can be reused in other projects
- App logic can be tested without auth
- Clearer dependencies

### State Initialization

**Decision:** Initialize mock data on first context mount

**Implementation:**
```typescript
useEffect(() => {
  // Check if data exists
  if (!localStorage.getItem('users')) {
    // Create demo users
    const demoUsers = [...];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
  
  // Initialize app state
  setUsers(mockUsers);
  setCategories(mockCategories);
  setPhotos(mockPhotos);
}, []);
```

**Why:**
- Users see data immediately (not empty app)
- Demonstrates all features without manual setup
- Realistic testing scenarios
- Easy to reset (clear localStorage)

### State Updates

**Pattern:** Immutable updates with functional setState

```typescript
// ✅ Good - Immutable update
const addPhoto = (photo) => {
  setPhotos(prev => [newPhoto, ...prev]);
};

// ✅ Good - Preserve other state
const votePhoto = (photoId, vote) => {
  setPhotos(prev => prev.map(p => 
    p.id === photoId 
      ? { ...p, likes: p.likes + (vote === 'like' ? 1 : 0) }
      : p
  ));
};

// ❌ Bad - Direct mutation
const badUpdate = (photoId) => {
  photos[0].likes++; // Mutates state
  setPhotos(photos); // React won't detect change
};
```

**Why Immutability:**
- React detects changes via reference comparison
- Prevents subtle bugs
- Enables time-travel debugging (if added)
- Easier to reason about

---

## Authentication System

### Design Overview

**Architecture:**
```
User → AuthPage → AuthContext → localStorage
                       ↓
                   AppContext (syncs current user)
                       ↓
                   Application
```

### Implementation Details

#### Login Flow

```
1. User enters email/password in AuthPage
2. AuthPage calls AuthContext.login(email, password)
3. AuthContext:
   a. Retrieves users from localStorage
   b. Finds user with matching email and password
   c. If found:
      - Sets user state (minus password)
      - Saves to localStorage.currentUser
      - Returns true
   d. If not found:
      - Returns false
4. AuthPage shows success/error toast
5. App.tsx detects isAuthenticated = true
6. Renders main app instead of AuthPage
```

**Code:**
```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const foundUser = users.find((u: any) => 
      u.email === email && u.password === password
    );
    
    if (!foundUser) {
      return false;
    }
    
    // Don't store password in state
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};
```

**Security Note:** Passwords stored in plain text for demo only. Production would use:
- Backend authentication
- Password hashing (bcrypt)
- HTTPS only
- JWT tokens
- Rate limiting

#### Signup Flow

```
1. User fills signup form (username, email, password, optional photo)
2. AuthPage calls AuthContext.signup(...)
3. AuthContext:
   a. Validates email doesn't exist
   b. Creates new user object with unique ID
   c. Adds to users array in localStorage
   d. Auto-logs in the new user
   e. Returns true/false
4. AuthPage shows success/error toast
5. User redirected to main app
```

**Email Uniqueness Check:**
```typescript
const users = JSON.parse(localStorage.getItem('users') || '[]');
if (users.find((u: any) => u.email === email)) {
  return false; // Email exists
}
```

#### Session Persistence

**Implementation:**
```typescript
// On app load (AuthContext mount)
useEffect(() => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
```

**Why:**
- User stays logged in across page refreshes
- No need to re-enter credentials
- Common UX pattern
- Simple with localStorage

#### Logout Flow

```
1. User clicks logout button in Navigation
2. Navigation calls AuthContext.logout()
3. AuthContext:
   a. Sets user state to null
   b. Removes currentUser from localStorage
4. App.tsx detects isAuthenticated = false
5. Shows AuthPage (login screen)
```

**Code:**
```typescript
const logout = () => {
  setUser(null);
  localStorage.removeItem('currentUser');
};
```

### Syncing Auth with App State

**Challenge:** AppContext needs the authenticated user as currentUser

**Solution:**
```typescript
// In AppContext
const { user: authUser } = useAuth();

useEffect(() => {
  if (authUser) {
    // Find or create user in users list
    setUsers(prev => {
      const exists = prev.find(u => u.id === authUser.id);
      if (!exists) {
        return [...prev, createUserFromAuth(authUser)];
      }
      return prev;
    });
    
    // Set as current user
    setCurrentUser(users.find(u => u.id === authUser.id));
  } else {
    setCurrentUser(null);
  }
}, [authUser]);
```

**Why Necessary:**
- Photos need to be attributed to currentUser
- Votes tracked per currentUser
- Badges awarded to currentUser
- Profile shows currentUser data

---

## Data Flow

### Voting System Data Flow

```
User clicks "Like" button
  ↓
CategoryDetailPage.handleVote(photoId, 'like')
  ↓
AppContext.votePhoto(photoId, 'like')
  ↓
Updates photos state:
  - Increment likes
  - Add user to votedBy
  - Calculate new score
  ↓
React re-renders CategoryDetailPage
  ↓
Photo shows updated score
  ↓
Leaderboard positions recalculate
  ↓
UI updates automatically
```

**Implementation:**
```typescript
const votePhoto = (photoId: string, vote: 'like' | 'dislike') => {
  if (!currentUser) return;
  
  setPhotos(prev => prev.map(photo => {
    if (photo.id !== photoId) return photo;
    
    const votedBy = { ...photo.votedBy };
    const currentVote = votedBy[currentUser.id];
    
    // Calculate new likes/dislikes
    let likes = photo.likes;
    let dislikes = photo.dislikes;
    
    if (currentVote === 'like') {
      likes--;
    } else if (currentVote === 'dislike') {
      dislikes--;
    }
    
    if (vote === 'like') {
      likes++;
    } else {
      dislikes++;
    }
    
    votedBy[currentUser.id] = vote;
    
    return { ...photo, likes, dislikes, votedBy };
  }));
};
```

**Key Decisions:**
1. **One vote per user per photo**: Tracked in `votedBy` object
2. **Can change vote**: Re-clicking removes old vote, adds new
3. **Immediate UI update**: Optimistic update (no API latency)
4. **Score = Likes - Dislikes**: Simple, understandable metric

### Photo Upload Data Flow

```
User selects photo file
  ↓
UploadPage reads file as DataURL
  ↓
UploadPage.handleUpload calls AppContext.addPhoto(...)
  ↓
AppContext creates new Photo object:
  - Generates unique ID
  - Sets timestamp
  - Initializes likes/dislikes to 0
  - Sets userId to currentUser.id
  ↓
Adds to photos state
  ↓
Updates user.uploads array
  ↓
React re-renders
  ↓
Photo appears in category
```

**ID Generation:**
```typescript
const newPhoto: Photo = {
  ...photo,
  id: `p${Date.now()}`, // Unique timestamp-based ID
  uploadedAt: Date.now(),
  likes: 0,
  dislikes: 0,
  votedBy: {},
};
```

**Why Timestamp IDs:**
- Guaranteed unique (millisecond precision)
- No need for counter or UUID library
- Sortable by creation time
- Simple implementation

### Leaderboard Calculation

**On-Demand Calculation:**
```
CategoryDetailPage renders
  ↓
Calls AppContext.getLeaderboard(categoryId)
  ↓
Filters photos by categoryId
  ↓
Sorts by score (likes - dislikes)
  ↓
Breaks ties by upload time (earlier = higher)
  ↓
Maps to LeaderboardEntry objects
  ↓
Returns sorted array
  ↓
Component renders leaderboard
```

**Implementation:**
```typescript
const getLeaderboard = (categoryId: string): LeaderboardEntry[] => {
  const categoryPhotos = photos.filter(p => p.categoryId === categoryId);
  
  const sorted = [...categoryPhotos].sort((a, b) => {
    const scoreA = a.likes - a.dislikes;
    const scoreB = b.likes - b.dislikes;
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA; // Higher score first
    }
    
    return a.uploadedAt - b.uploadedAt; // Earlier upload wins ties
  });
  
  return sorted.map((photo, index) => ({
    photo,
    rank: index + 1,
    score: photo.likes - photo.dislikes,
  }));
};
```

**Why Not Stored:**
- Always current (reflects latest votes)
- No need to update on every vote
- Simpler state management
- Negligible performance impact (small data set)

---

## Component Architecture

### Component Hierarchy

```
App
├── AuthProvider
│   ├── AppProvider
│   │   ├── AppContent
│   │   │   ├── Navigation
│   │   │   └── (Current Page Component)
│   │   │       ├── HomePage
│   │   │       │   ├── CategoryCard (multiple)
│   │   │       │   └── CreateCategoryDialog
│   │   │       ├── UploadPage
│   │   │       │   ├── CategorySelect
│   │   │       │   └── FileInput
│   │   │       ├── CategoryDetailPage
│   │   │       │   ├── PhotoCard (multiple)
│   │   │       │   └── SortTabs
│   │   │       ├── LeaderboardPage
│   │   │       │   └── LeaderboardEntry (multiple)
│   │   │       ├── HallOfFamePage
│   │   │       │   └── HallOfFameCard (multiple)
│   │   │       └── ProfilePage
│   │   │           ├── BadgeDisplay
│   │   │           ├── BadgeSelector
│   │   │           └── UploadGrid
│   │   └── Toaster
│   └── AuthPage
│       ├── LoginForm
│       └── SignupForm
```

### Key Component Patterns

#### Page Components (Smart Components)

**Characteristics:**
- Access Context (useApp, useAuth)
- Manage local UI state
- Handle business logic
- Compose presentational components

**Example: HomePage**
```typescript
export const HomePage: React.FC<{ onCategoryClick: (id: string) => void }> = ({ 
  onCategoryClick 
}) => {
  // Access global state
  const { categories, createCategory, currentUser } = useApp();
  
  // Local UI state
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // Business logic
  const handleCreate = async (data: CategoryData) => {
    const newCategory = {
      ...data,
      createdBy: currentUser.id,
      createdAt: Date.now(),
    };
    createCategory(newCategory);
    setShowCreateDialog(false);
  };
  
  // Render presentational components
  return (
    <div>
      {categories.map(cat => (
        <CategoryCard 
          key={cat.id}
          category={cat}
          onClick={() => onCategoryClick(cat.id)}
        />
      ))}
      
      {showCreateDialog && (
        <CreateCategoryDialog 
          onSubmit={handleCreate}
          onClose={() => setShowCreateDialog(false)}
        />
      )}
    </div>
  );
};
```

#### Presentational Components (Dumb Components)

**Characteristics:**
- Receive data via props
- No Context access
- Pure UI rendering
- Emit events to parent

**Example: CategoryCard**
```typescript
interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onClick 
}) => {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg">
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <Badge>{category.type}</Badge>
    </Card>
  );
};
```

**Benefits:**
- Reusable across pages
- Easy to test (just props)
- No side effects
- Clear interface (props)

#### UI Components (Atomic Components)

**Examples:** Button, Input, Card, Badge from `components/ui/`

**Source:** Shadcn/ui (built on Radix UI)

**Why Used:**
- Accessible out of the box
- Customizable with Tailwind
- Consistent design language
- TypeScript support

**Customization Example:**
```typescript
// Original shadcn button
import { Button } from '@/components/ui/button';

// Usage with Tailwind customization
<Button className="bg-purple-600 hover:bg-purple-700">
  Custom Button
</Button>
```

### Routing Strategy

**Decision:** Simple view-based routing with state (no React Router)

**Implementation:**
```typescript
// App.tsx
const [currentView, setCurrentView] = useState('home');
const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

const renderView = () => {
  switch (currentView) {
    case 'home':
      return <HomePage onCategoryClick={handleCategoryClick} />;
    case 'upload':
      return <UploadPage onSuccess={() => setCurrentView('home')} />;
    case 'category':
      return <CategoryDetailPage categoryId={selectedCategoryId!} onBack={() => setCurrentView('home')} />;
    // ... other views
  }
};
```

**Why Not React Router:**
1. **Simplicity**: Only need client-side view switching
2. **No URL Requirements**: No need for shareable URLs (demo app)
3. **Smaller Bundle**: One less dependency
4. **State-Based**: View is just another piece of state

**When React Router Would Be Better:**
- Shareable URLs needed
- Browser back/forward navigation
- Deep linking to specific photos
- SEO requirements (with SSR)

**Migration Path:**
```typescript
// Easy to add React Router later
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/upload" element={<UploadPage />} />
    <Route path="/category/:id" element={<CategoryDetailPage />} />
  </Routes>
</BrowserRouter>
```

---

## Algorithms and Logic

### Trending Algorithm

**Goal:** Surface photos gaining likes quickly (viral content)

**Formula:**
```
Trending Score = Likes / (Hours Since Upload + 1)
```

**Implementation:**
```typescript
const trendingPhotos = photos
  .map(photo => {
    const hoursOld = (Date.now() - photo.uploadedAt) / (1000 * 60 * 60);
    const trendingScore = photo.likes / (hoursOld + 1);
    return { photo, trendingScore };
  })
  .sort((a, b) => b.trendingScore - a.trendingScore)
  .map(item => item.photo);
```

**Design Rationale:**
- **Recency Bias**: Recent photos with few likes can rank high
- **+1 in Denominator**: Prevents division by zero for brand new photos
- **Likes Only**: Dislikes don't factor in (trending is about engagement growth)
- **Time Decay**: Older photos need more likes to stay trending

**Alternative Considered:**
- Reddit's "Hot" algorithm: More complex, considers controversiality
- Hacker News algorithm: More aggressive time decay
- **Chosen:** Simple and effective for photo sharing context

### Points Distribution System

**Goal:** Reward top performers in weekly challenges

**Distribution:**
```typescript
const pointsMap: Record<number, number> = {
  1: 100,
  2: 75,
  3: 50,
  4: 40,
  5: 35,
  6: 30,
  7: 25,
  8: 20,
  9: 15,
  10: 10,
};
```

**Design Rationale:**
- **Top-Heavy**: 1st place gets significantly more (incentivizes winning)
- **Top 10 Only**: Participation reward (motivates engagement)
- **Diminishing Returns**: Gap decreases lower in ranking
- **Round Numbers**: Easy to understand and communicate

**Implementation on Challenge End:**
```typescript
const awardPoints = (categoryId: string) => {
  const leaderboard = getLeaderboard(categoryId);
  
  leaderboard.slice(0, 10).forEach((entry, index) => {
    const points = pointsMap[index + 1] || 0;
    const badge: Badge = {
      id: `b${Date.now()}_${entry.photo.userId}`,
      type: 'leaderboard',
      categoryName: category.name,
      rank: index + 1,
      period: `Week of ${formatDate(category.startDate)}`,
    };
    
    // Award badge to user
    awardBadge(entry.photo.userId, badge);
  });
};
```

### Hall of Fame Selection

**Goal:** Showcase best photos across different time periods

**Three Views:**

1. **Monthly Winners**
   ```typescript
   const getMonthlyWinners = () => {
     const photosByMonth = photos.reduce((acc, photo) => {
       const month = getMonth(photo.uploadedAt);
       if (!acc[month]) acc[month] = [];
       acc[month].push(photo);
       return acc;
     }, {});
     
     return Object.entries(photosByMonth).map(([month, monthPhotos]) => ({
       month,
       topPhoto: monthPhotos.sort(byScore)[0],
     }));
   };
   ```

2. **Category Winners**
   ```typescript
   const getCategoryWinners = (categoryId: string) => {
     return photos
       .filter(p => p.categoryId === categoryId)
       .sort(byScore)
       .slice(0, 10);
   };
   ```

3. **Overall Top**
   ```typescript
   const getOverallTop = () => {
     return photos
       .sort(byScore)
       .slice(0, 50);
   };
   ```

**Sorting Function:**
```typescript
const byScore = (a: Photo, b: Photo) => {
  const scoreA = a.likes - a.dislikes;
  const scoreB = b.likes - b.dislikes;
  return scoreB - scoreA;
};
```

### Private Category Access Control

**Goal:** Restrict category access to members only

**Share Code System:**
```typescript
interface Category {
  id: string;
  name: string;
  type: 'public' | 'private';
  shareCode?: string;  // Only for private categories
  members?: string[];  // User IDs with access
}
```

**Joining Private Category:**
```typescript
const joinPrivateCategory = (shareCode: string): boolean => {
  const category = categories.find(c => 
    c.type === 'private' && c.shareCode === shareCode
  );
  
  if (!category) {
    return false; // Invalid code
  }
  
  if (category.members?.includes(currentUser.id)) {
    return true; // Already a member
  }
  
  // Add user to members
  setCategories(prev => prev.map(c => 
    c.id === category.id
      ? { ...c, members: [...(c.members || []), currentUser.id] }
      : c
  ));
  
  return true;
};
```

**Access Check:**
```typescript
const canAccessCategory = (categoryId: string): boolean => {
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) return false;
  if (category.type === 'public') return true;
  
  // Private category - check membership
  return category.members?.includes(currentUser.id) || false;
};
```

**UI Integration:**
```typescript
// Only show accessible categories in upload dropdown
const accessibleCategories = categories.filter(c => 
  canAccessCategory(c.id)
);
```

---

## Performance Considerations

### Optimization Strategies

#### 1. Component Memoization

**Not Widely Used** in current implementation

**Reason:**
- Small data sets (hundreds of photos max)
- Simple component tree
- No performance issues observed

**Where It Would Help:**
```typescript
// If we had thousands of photos
const PhotoCard = React.memo(({ photo, onVote }) => {
  // Only re-renders if photo or onVote changes
  return <Card>{photo.title}</Card>;
});
```

#### 2. Virtual Scrolling

**Not Implemented**

**Current Approach:**
- Render all photos in a category
- Works fine for typical use (10-100 photos)

**When Needed:**
- Categories with 1000+ photos
- Would use `react-window` or `react-virtual`
- Render only visible photos

#### 3. Image Optimization

**Current:**
- Photos stored as DataURLs in memory
- Full resolution always loaded

**Improvements for Production:**
- Compress images before upload
- Generate thumbnails
- Lazy load images
- Use `<img loading="lazy" />`
- CDN for image delivery
- WebP format

**Example:**
```typescript
// Add to UploadPage
const compressImage = async (file: File): Promise<string> => {
  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  });
  return readAsDataURL(compressed);
};
```

#### 4. Code Splitting

**Current:**
- All code in single bundle
- Loaded upfront

**Improvement:**
```typescript
// Lazy load page components
const HomePage = lazy(() => import('./components/HomePage'));
const UploadPage = lazy(() => import('./components/UploadPage'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  {renderView()}
</Suspense>
```

**Benefits:**
- Faster initial load
- Only load needed code
- Smaller bundle for first paint

#### 5. Context Optimization

**Current Potential Issue:**
- Entire AppContext re-renders on any state change
- All consumers re-render

**Better Approach (if needed):**
```typescript
// Split into multiple contexts
<PhotosProvider>
  <CategoriesProvider>
    <UsersProvider>
      <App />
    </UsersProvider>
  </CategoriesProvider>
</PhotosProvider>

// Components only subscribe to what they need
const { photos } = usePhotos(); // Only re-renders on photo changes
```

---

## Security Considerations

### Current Security Posture

⚠️ **Warning:** This is a demo application. Not production-ready.

**Current Vulnerabilities:**

1. **Plain Text Passwords**
   - Stored directly in localStorage
   - No hashing or encryption
   - Anyone with browser access can read them

2. **No Input Validation**
   - No email format enforcement
   - No password strength requirements
   - No XSS protection on user inputs

3. **Client-Side Only**
   - No server verification
   - Users can manipulate localStorage directly
   - No audit trail

4. **No Rate Limiting**
   - Can spam votes
   - Can create unlimited accounts
   - No CAPTCHA

### Production Security Requirements

**Authentication:**
```typescript
// ❌ Current
localStorage.setItem('users', JSON.stringify([{
  email: 'user@example.com',
  password: 'password123'  // Plain text!
}]));

// ✅ Production
// Backend with bcrypt
const hashedPassword = await bcrypt.hash('password123', 10);
await db.users.create({
  email: 'user@example.com',
  password: hashedPassword
});

// Use JWT for sessions
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
```

**Input Sanitization:**
```typescript
import DOMPurify from 'dompurify';

// Sanitize user content
const safeUsername = DOMPurify.sanitize(username);
const safeDescription = DOMPurify.sanitize(description);
```

**HTTPS Only:**
```typescript
// Redirect to HTTPS
if (location.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

**Rate Limiting:**
```typescript
// Backend middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Data Privacy

**Current:**
- All data in user's browser
- No tracking
- No analytics
- No data collection

**For Production:**
- Privacy policy required
- Cookie consent
- GDPR compliance (EU users)
- Data export functionality
- Account deletion

---

## Future Scalability

### Backend Migration Path

**Phase 1: Add Backend API**

1. **Setup Express Server**
   ```typescript
   // server/index.ts
   const app = express();
   
   app.post('/api/auth/login', loginHandler);
   app.post('/api/auth/signup', signupHandler);
   app.get('/api/photos', getPhotos);
   app.post('/api/photos', createPhoto);
   app.post('/api/votes', createVote);
   ```

2. **Update Context to Use API**
   ```typescript
   // Replace localStorage calls
   const login = async (email, password) => {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     
     const { token, user } = await response.json();
     localStorage.setItem('authToken', token);
     setUser(user);
   };
   ```

3. **Add Database**
   ```sql
   CREATE TABLE users (
     id UUID PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     username VARCHAR(50) NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     profile_picture TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE photos (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     category_id UUID REFERENCES categories(id),
     image_url TEXT NOT NULL,
     likes INTEGER DEFAULT 0,
     dislikes INTEGER DEFAULT 0,
     uploaded_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE votes (
     user_id UUID REFERENCES users(id),
     photo_id UUID REFERENCES photos(id),
     vote_type VARCHAR(10) CHECK (vote_type IN ('like', 'dislike')),
     created_at TIMESTAMP DEFAULT NOW(),
     PRIMARY KEY (user_id, photo_id)
   );
   ```

**Phase 2: Real-Time Features**

1. **WebSocket for Live Updates**
   ```typescript
   // Server
   io.on('connection', (socket) => {
     socket.on('vote', ({ photoId, vote }) => {
       // Update database
       // Broadcast to all clients
       io.emit('vote_update', { photoId, newScore });
     });
   });
   
   // Client
   socket.on('vote_update', ({ photoId, newScore }) => {
     setPhotos(prev => prev.map(p => 
       p.id === photoId ? { ...p, score: newScore } : p
     ));
   });
   ```

2. **Server-Sent Events for Leaderboard**
   ```typescript
   app.get('/api/leaderboard/stream', (req, res) => {
     res.writeHead(200, {
       'Content-Type': 'text/event-stream',
       'Cache-Control': 'no-cache',
     });
     
     const intervalId = setInterval(() => {
       const leaderboard = calculateLeaderboard();
       res.write(`data: ${JSON.stringify(leaderboard)}\n\n`);
     }, 5000);
     
     req.on('close', () => clearInterval(intervalId));
   });
   ```

**Phase 3: Cloud Infrastructure**

1. **Image Storage**
   ```typescript
   // Upload to S3/Cloudinary instead of DataURL
   import { v2 as cloudinary } from 'cloudinary';
   
   const uploadImage = async (file: File) => {
     const result = await cloudinary.uploader.upload(file, {
       folder: 'snaprank',
       transformation: [
         { width: 1920, height: 1080, crop: 'limit' },
         { quality: 'auto' },
         { fetch_format: 'auto' }
       ]
     });
     
     return result.secure_url;
   };
   ```

2. **CDN for Assets**
   - CloudFront or Cloudflare
   - Cache images globally
   - Reduce latency

3. **Database Scaling**
   - Read replicas for leaderboard queries
   - Redis cache for hot data
   - Database indexing on category_id, user_id

**Phase 4: Advanced Features**

1. **Search and Discovery**
   - Elasticsearch for photo search
   - AI tagging for automatic categorization
   - Recommendation engine

2. **Social Features**
   - Following system
   - Activity feed
   - Comments and replies
   - Direct messaging

3. **Mobile App**
   - React Native with shared components
   - Native camera integration
   - Push notifications

---

## Conclusion

SnapRank demonstrates modern frontend development practices with a clean architecture that prioritizes:

1. **Type Safety** - TypeScript throughout
2. **Component Isolation** - Reusable, testable components
3. **Centralized State** - Context API for predictable data flow
4. **User Experience** - Immediate feedback, intuitive interface
5. **Scalability** - Clear path to backend integration

While not production-ready due to localStorage limitations and security concerns, the architecture is sound and easily extendable. The separation of concerns between Auth and App contexts, the immutable state updates, and the component hierarchy all facilitate future growth.

**Key Takeaways:**
- Client-side architecture is viable for prototypes and demos
- React Context sufficient for moderate complexity
- TypeScript catches bugs early and documents code
- Clear migration path to full-stack architecture
- Simplicity enables rapid development and iteration

For production deployment, follow the security and scalability guidelines in this document and `AUTHENTICATION.md`.
