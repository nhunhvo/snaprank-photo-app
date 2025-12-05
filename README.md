# SnapRank - Social Media Photo Competition App

A web application where users upload photos, vote on submissions, and compete for rankings and achievements.

## What This Project Is

A competitive photo-sharing platform with:
- User authentication (login/signup)
- Photo uploads to different categories
- Like/dislike voting system
- Leaderboards and points
- Achievement badges
- Hall of Fame

## Technologies Used

- **React 18.3.1** - Frontend framework
- **TypeScript 5.x** - Type safety
- **Vite 6.3.5** - Build tool and dev server
- **Tailwind CSS 3.x** - Styling
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **localStorage** - Data persistence (no backend needed)

---

## How to Compile and Run

### Prerequisites

You need **Node.js** installed on your computer.

**Install Node.js:**
1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. Keep "Add to PATH" checked
5. Restart your terminal after installation

**Verify installation:**
```bash
node --version
npm --version
```

### Installation

1. **Navigate to the project folder:**
   ```bash
   cd "Social Media Photo App"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This downloads all required packages (takes 1-2 minutes).

### Running the Application

**Start the development server:**
```bash
npm run dev
```

You'll see:
```
VITE v6.3.5  ready in 474 ms
➜  Local:   http://localhost:3000/
```

**Open your browser and go to:** http://localhost:3000/

**To stop the server:** Press `Ctrl + C` in the terminal

### Building for Production

**Create production build:**
```bash
npm run build
```
This creates optimized files in the `dist/` folder.

**Preview production build:**
```bash
npm run preview
```

---

## Where Everything Is

```
Social Media Photo App/
├── src/
│   ├── components/           # All React components
│   │   ├── AuthPage.tsx          # Login/signup page
│   │   ├── HomePage.tsx          # Main page with categories
│   │   ├── UploadPage.tsx        # Photo upload
│   │   ├── CategoryDetailPage.tsx # View photos in category
│   │   ├── LeaderboardPage.tsx   # Weekly rankings
│   │   ├── HallOfFamePage.tsx    # Top photos
│   │   ├── ProfilePage.tsx       # User profile
│   │   ├── Navigation.tsx        # Top nav bar
│   │   └── ui/                   # Reusable UI components
│   ├── context/
│   │   ├── AppContext.tsx        # App state (photos, votes, etc.)
│   │   └── AuthContext.tsx       # Authentication state
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── public/                       # Static files
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript settings
└── tailwind.config.js           # Tailwind CSS config
```

---

## How to Use the Application

### 1. Login or Sign Up

When you open the app, you'll see a login page.

**Option A: Use demo account**
- Email: `demo@snaprank.com`
- Password: `demo123`

**Option B: Create your own account**
1. Click "Sign Up"
2. Enter username, email, and password
3. Optionally upload a profile picture
4. Click "Sign Up"

### 2. Navigate the App

Five main pages accessible from the top navigation:

- **Home** (🏠) - Browse all photo categories
- **Upload** (📤) - Upload new photos
- **Leaderboard** (🏆) - Weekly challenge rankings
- **Hall of Fame** (🌟) - Best photos of all time
- **Profile** (👤) - Your profile and uploads

### 3. Upload Photos

1. Click "Upload" in navigation
2. Select a category from dropdown
3. Click "Take Photo" (camera) or "Choose from Library"
4. Select/take your photo
5. Click "Upload Photo"

### 4. Vote on Photos

1. Browse categories on the Home page
2. Click any category to view photos
3. Click 👍 (like) or 👎 (dislike) on photos
4. Cannot vote on your own photos
5. Can change your vote anytime

### 5. View Rankings

**Leaderboard Page:**
- See current weekly challenge standings
- Top 10 photos earn points when challenge ends
- Rankings update in real-time as people vote

**Hall of Fame:**
- View best photos by month, category, or overall
- Top 3 in each get special badges

### 6. Manage Your Profile

1. Click your profile picture or "Profile" tab
2. View your uploaded photos
3. See earned badges
4. Select up to 5 badges to display publicly
5. Archive or delete your uploads

### 7. Private Categories

**Create a private category:**
1. On Home page, click "Create New Category"
2. Choose "Private" type
3. Create a share code (e.g., "FAMILY2024")
4. Share this code with friends

**Join a private category:**
1. Click "Join with Code" on Home page
2. Enter the share code
3. Access granted if code is valid

---

## Configuration

### Change App Name

**File:** `src/components/Navigation.tsx` (line ~30)
```tsx
<span className="text-xl">SnapRank</span>
// Change "SnapRank" to your app name
```

**File:** `src/components/AuthPage.tsx` (line ~90)
```tsx
<h1 className="text-3xl mb-2">SnapRank</h1>
// Change "SnapRank" to your app name
```

### Change Colors

**File:** `tailwind.config.js`
```javascript
theme: {
  extend: {
    colors: {
      primary: '#9333ea',    // Purple
      secondary: '#ec4899',  // Pink
      // Add your colors here
    }
  }
}
```

### Change Points System

**File:** `src/context/AppContext.tsx` (line ~320)
```typescript
const pointsMap: Record<number, number> = {
  1: 100,  // 1st place
  2: 75,   // 2nd place
  3: 50,   // 3rd place
  // Modify as desired
};
```

### Change Server Port

**File:** `vite.config.ts`
```typescript
export default defineConfig({
  server: {
    port: 3000,  // Change to any port
  },
});
```

---

## How It Works (Technical Overview)

### Architecture

This is a **client-side only** application. Everything runs in the browser:

```
Browser
  ↓
React App
  ↓
Context API (state management)
  ↓
localStorage (data persistence)
```

No backend server or database required.

### Data Storage

All data is stored in your browser's **localStorage**:

- User accounts
- Photos (as base64 DataURLs)
- Votes
- Categories
- Badges

**Note:** Clearing browser data will erase everything.

### Key Components

**AppContext** (`src/context/AppContext.tsx`)
- Manages all app data (users, photos, categories)
- Handles voting logic
- Calculates leaderboards
- Awards points and badges

**AuthContext** (`src/context/AuthContext.tsx`)
- Handles login/signup/logout
- Manages user sessions
- Stores user accounts in localStorage

**Page Components**
- `HomePage` - Displays all categories
- `UploadPage` - Photo upload interface
- `CategoryDetailPage` - Shows photos in a category
- `LeaderboardPage` - Weekly challenge rankings
- `HallOfFamePage` - Best photos
- `ProfilePage` - User profile and badges

### How Voting Works

```
User clicks 👍 or 👎
  ↓
AppContext.votePhoto() is called
  ↓
Updates photo state:
  - Increment likes or dislikes
  - Track vote in votedBy object
  ↓
React re-renders components
  ↓
Leaderboard recalculates automatically
```

**Score Formula:**
```
Photo Score = Likes - Dislikes
```

### How Leaderboards Work

Calculated on-demand (not stored):
1. Filter photos by category
2. Sort by score (likes - dislikes)
3. Break ties by upload time (earlier = higher rank)
4. Return top ranked photos

### How Trending Works

**Formula:**
```
Trending Score = Likes / (Hours Since Upload + 1)
```

Photos gaining likes quickly appear in trending.

### How Points Are Awarded

When a weekly challenge ends:
- 1st place: 100 points
- 2nd place: 75 points
- 3rd place: 50 points
- 4th-10th: 40 down to 10 points

Top 3 also receive badge achievements.

---

## Troubleshooting

### "npm: command not found"
- Node.js not installed or not in PATH
- Install from https://nodejs.org/
- Restart terminal after installation

### Page won't load
- Make sure `npm run dev` is running
- Try http://127.0.0.1:3000/ instead
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Can't login
- Try demo account: demo@snaprank.com / demo123
- Or create new account via "Sign Up"
- Clear localStorage if issues persist:
  - Open browser console (F12)
  - Run: `localStorage.clear()`
  - Refresh and try again

### Photos won't upload
- Select a category from dropdown first
- File must be an image (JPG, PNG, GIF)
- Try a smaller file size

### Data disappeared
- Don't use incognito/private browsing
- Don't clear browser data
- All data is local to your browser

---

## Additional Documentation

- **DESIGN.md** - Detailed technical design decisions and architecture
- **FEATURES.md** - Complete feature documentation
- **AUTHENTICATION.md** - Authentication system details
- **SETUP.md** - Extended setup guide

---

## License

MIT License

---

**Built with React, TypeScript, and Tailwind CSS**
