# SnapRank - Social Media Photo Competition App

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Using the Application](#using-the-application)
- [Authentication](#authentication)
- [Features Guide](#features-guide)
- [Troubleshooting](#troubleshooting)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Additional Documentation](#additional-documentation)

---

## Overview

SnapRank is a competitive social media web application where users create accounts, upload photos to various categories, vote on submissions, and compete for rankings and achievements. The platform features multiple category types, a comprehensive points system, real-time leaderboards, and a Hall of Fame for top performers.

**Key Capabilities:**
- User authentication with login/signup
- Photo upload (camera capture or file selection)
- Multiple category types (Official, Weekly Challenges, User-Created, Private)
- Like/Dislike voting system
- Real-time leaderboards with points
- Achievement badges
- Hall of Fame
- Private categories with share codes
- Archived challenge history

**Technology:** This is a client-side React application built with TypeScript, using localStorage for data persistence. No server or database is required to run the application

---

## Prerequisites

Before running SnapRank, you must have Node.js installed on your system.

### Required Software

**Node.js (v18 or higher)**
- Download from: https://nodejs.org/
- **Recommended:** Download the LTS (Long Term Support) version
- npm (Node Package Manager) is included with Node.js

### Installing Node.js

#### Windows
1. Visit https://nodejs.org/
2. Click the green "LTS" button to download the installer
3. Run the downloaded `.msi` installer
4. Follow the installation wizard
5. **Important:** Keep "Add to PATH" checked during installation
6. Restart your terminal/PowerShell after installation

#### macOS
1. Visit https://nodejs.org/ and download the macOS installer, OR
2. Use Homebrew: `brew install node`

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### Verifying Installation

After installing Node.js, open a **new** terminal window and verify:

```bash
node --version
# Should output: v18.x.x or higher

npm --version
# Should output: 9.x.x or higher
```

**Troubleshooting:** If commands are not recognized:
- Close and reopen your terminal
- Restart your computer
- Check that Node.js is in your system PATH
- See detailed guide in `INSTALL_NODEJS.md`

---

## Installation

Once Node.js is installed, follow these steps:

### 1. Navigate to Project Directory

Open your terminal and navigate to the project folder:

**Windows (PowerShell):**
```powershell
cd "C:\Users\YourUsername\Downloads\Social Media Photo App"
```

**macOS/Linux:**
```bash
cd ~/Downloads/Social\ Media\ Photo\ App
```

### 2. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will:
- Read `package.json` to determine dependencies
- Download all required packages to `node_modules/`
- Create `package-lock.json` for version tracking
- Take 1-3 minutes depending on your internet speed

**Expected Output:**
```
added 165 packages, and audited 166 packages in 2s
11 packages are looking for funding
```

---

## Running the Application

### Starting the Development Server

To run SnapRank, execute:

```bash
npm run dev
```

**Expected Output:**
```
VITE v6.3.5  ready in 474 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Accessing the Application

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to: **http://localhost:3000/**
3. You should see the SnapRank login/signup page

**Alternative URLs (if port 3000 is in use):**
- http://localhost:5173/
- http://127.0.0.1:3000/

### Stopping the Server

To stop the development server:
- Press `Ctrl + C` in the terminal
- Type `Y` if prompted to confirm

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with compiled files ready for deployment.

To preview the production build:

```bash
npm run preview
```

---

## Using the Application

### First-Time Setup

When you first open SnapRank, you'll see the authentication page.

#### Option 1: Use Demo Account

For immediate testing, use the pre-configured demo account:

- **Email:** `demo@snaprank.com`
- **Password:** `demo123`

Click "Log In" to access the app with sample data.

#### Option 2: Create Your Own Account

1. Click the "Sign Up" link
2. Fill in the registration form:
   - **Username:** Your display name (required)
   - **Email:** Your email address (required)
   - **Password:** At least 6 characters (required)
   - **Profile Picture:** Optional - click "Upload Photo" to add an image
3. Click "Sign Up"
4. You'll be automatically logged in

**Note:** All account data is stored in your browser's localStorage. Clearing browser data will erase your account.

### Navigating the Application

After logging in, you'll see the main navigation bar with five sections:

1. **Home** (🏠) - Browse all categories
2. **Upload** (📤) - Upload new photos
3. **Leaderboard** (🏆) - View weekly challenge rankings
4. **Hall of Fame** (🌟) - See top-rated photos of all time
5. **Profile** (👤) - Your personal profile and statistics

**Additional Navigation:**
- **Profile Picture** (top right) - Click to view your profile
- **Logout Button** (🚪 icon) - Sign out of your account

---

## Authentication

### Logging In

1. Enter your registered email address
2. Enter your password
3. Click "Log In"
4. Upon success, you'll be redirected to the home page

**Error Messages:**
- "Invalid email or password" - Check credentials and try again
- "Login failed" - Ensure account exists; sign up if new user

### Signing Up

1. Click "Sign Up" link on login page
2. Enter required information (username, email, password)
3. Optionally upload a profile picture:
   - Click "Upload Photo" button
   - Select an image file (JPG, PNG, GIF)
   - Image preview will appear
4. Click "Sign Up"
5. Account is created and you're automatically logged in

**Profile Picture:**
- Optional but recommended
- Accepts common image formats
- Will be displayed in navigation and profile
- Default avatar generated if not provided

### Logging Out

1. Click the logout icon (🚪) in the top-right navigation
2. You'll be returned to the login page
3. Your session is cleared

**Note:** Your account data remains saved in localStorage and you can log back in anytime.

---

## Features Guide

### Home Page - Browsing Categories

The home page displays all available categories organized by type:

#### Official Categories (Basic)
- Permanent categories always available
- Examples: Night Out, Soft Launch, Photobooth, Hiking, Family
- Click any category to view photos
- Contribute to Hall of Fame

#### Official Categories (Weekly Challenges)
- Rotating weekly themes
- Active challenges show countdown timer
- Examples: "Best Holiday Decor", "Cozy Winter Vibes"
- Earn points based on leaderboard position:
  - 1st place: 100 points
  - 2nd place: 75 points
  - 3rd place: 50 points
  - 4th-10th: 25-10 points
- Automatically archive after one week
- Top 10 photos preserved in archive

#### User-Created Categories
- Categories created by community members
- Anyone can view and upload
- No leaderboard points, but can reach Hall of Fame
- Scrollable list of all public user categories

#### Private Categories
- Exclusive categories for groups/friends
- Require share code to access
- Click "Join with Code" to enter a code
- Only members can view and upload photos

#### Archived Weekly Challenges
- Past weekly challenges
- Shows top 10 photos only
- Read-only (no new uploads or voting)
- Historical record of past competitions

### Creating Categories

To create a new category:

1. Scroll to "User-Created Categories" section
2. Click "Create New Category" button
3. Fill in the form:
   - **Category Name:** Descriptive title
   - **Category Type:** Choose "Public" or "Private"
   - **Share Code** (Private only): Unique code for members
4. Click "Create"
5. Your category appears in the appropriate section

**Private Category Example:**
- Name: "Family Vacation 2024"
- Type: Private
- Share Code: "FAMILY2024"
- Share this code with family members
- They use "Join with Code" to access

### Uploading Photos

1. Click "Upload" (📤) in navigation
2. Select a category from the dropdown
   - Only shows categories you have access to
   - Private categories require membership
3. Choose photo source:
   - **Take Photo:** Opens camera (mobile devices)
   - **Choose from Library:** Select existing file
4. Preview your photo
5. Click "Upload Photo"
6. Photo appears immediately in selected category

**Upload Requirements:**
- Must select a category before uploading
- Supported formats: JPG, PNG, GIF
- Recommended size: Under 5MB
- Photo is attributed to your account

### Viewing Category Details

Click any category to see its photos:

**Sorting Options:**
- **Leaderboard** (⭐): Ranked by points (likes - dislikes)
- **Trending** (🔥): Fastest-growing photos (likes per hour)
- **Recent** (🕒): Newest uploads first

**Voting on Photos:**
- Click 👍 to like (adds 1 point)
- Click 👎 to dislike (subtracts 1 point)
- You can only vote once per photo
- Change your vote by clicking the other option
- Your votes affect leaderboard rankings

**Photo Information:**
- Username of uploader
- Upload time (e.g., "2 hours ago")
- Current score (likes - dislikes)
- Like and dislike counts

**Navigation:**
- Click "← Back" to return to home page
- Scroll to view all photos
- Sort order updates in real-time

### Leaderboard Page

View rankings for active weekly challenges:

**Display Information:**
- Challenge name and theme
- Countdown timer to challenge end
- Ranked list of top photos
- User profile pictures and usernames
- Current scores (points)
- Position changes (🔥 rising, 🔻 falling)

**How Rankings Work:**
- Based on photo score (likes - dislikes)
- Updates in real-time as votes come in
- Top 10 positions earn points when challenge ends
- Ties broken by upload time (earlier = higher)

**Interacting:**
- Click photos to view full size
- Vote directly from leaderboard
- See your photos highlighted
- Track your position

### Hall of Fame

View the best photos across different timeframes:

**Three Tabs:**

1. **Monthly Winners**
   - Top photos from each month
   - Organized by month and year
   - Shows best performers over time

2. **Category Winners**
   - Filter by specific category
   - All-time best in each category
   - Dropdown to select category

3. **Overall Top**
   - Highest-scoring photos ever
   - Across all categories and time
   - True champions of the platform

**Display:**
- Photo with ranking badge (🥇 1st, 🥈 2nd, 🥉 3rd)
- Username and profile picture
- Final score
- Upload date
- Category name

### Profile Page

Your personal dashboard and statistics:

**Profile Header:**
- Profile picture
- Username
- 👑 Leader halo (if you're currently #1 in any challenge)
- Total photos uploaded count

**Earned Badges Section:**
- All badges you've earned
- Badge types:
  - **Leaderboard Badges:** Weekly challenge wins
  - **Hall of Fame Badges:** Top 3 in Hall of Fame
- Each badge shows:
  - Category name
  - Rank achieved (1st, 2nd, 3rd)
  - Time period (e.g., "Week of Nov 20", "November 2024")
- Select up to 5 badges to display publicly

**Selecting Badges to Display:**
1. Click "Edit Display Badges" button
2. Toggle badges on/off (checkboxes)
3. Maximum 5 badges can be selected
4. Click "Save Display Badges"
5. Selected badges appear on your profile for others to see

**Your Uploads Section:**
- Grid of all photos you've uploaded
- Each photo shows:
  - Thumbnail image
  - Category name
  - Upload date
  - Current score
  - Like/dislike counts
- Hover actions:
  - **Archive:** Remove from public view (keeps in history)
  - **Delete:** Permanently remove photo

**Managing Uploads:**
- **Archive:** Photo hidden but stats preserved
- **Delete:** Photo removed completely
- Actions are immediate
- Cannot be undone (for delete)

### Voting and Scoring System

**How Voting Works:**
- Each user can vote once per photo
- Vote options: Like (👍) or Dislike (👎)
- You cannot vote on your own photos
- Changing your vote is allowed
- All votes are anonymous

**Score Calculation:**
```
Photo Score = Total Likes - Total Dislikes
```

**Examples:**
- 15 likes, 2 dislikes = 13 points
- 8 likes, 8 dislikes = 0 points
- 5 likes, 10 dislikes = -5 points

**Leaderboard Ranking:**
- Photos sorted by score (highest first)
- Ties broken by upload time
- Real-time updates as votes change

**Trending Calculation:**
```
Trending Score = Likes per Hour Since Upload
```

Photos gaining likes quickly rise in trending view.

### Points and Achievements

**Earning Points:**
- Points awarded when weekly challenges end
- Only top 10 photos receive points
- Point distribution:
  - 1st place: 100 points
  - 2nd place: 75 points
  - 3rd place: 50 points
  - 4th place: 40 points
  - 5th place: 35 points
  - 6th place: 30 points
  - 7th place: 25 points
  - 8th place: 20 points
  - 9th place: 15 points
  - 10th place: 10 points

**Earning Badges:**
1. **Leaderboard Badges** - Finish top 3 in weekly challenge
2. **Hall of Fame Badges** - Enter top 3 of Hall of Fame

**Badge Details Include:**
- Badge type (Leaderboard or Hall of Fame)
- Category name
- Your rank (1st, 2nd, or 3rd)
- Time period earned

**Displaying Badges:**
- Earn unlimited badges
- Select your best 5 to display
- Shown on profile for other users
- Update selection anytime

---

## Troubleshooting

### Common Issues and Solutions

#### "npm: command not found" or "node: command not found"

**Problem:** Node.js not installed or not in PATH

**Solutions:**
1. Install Node.js from https://nodejs.org/
2. Restart terminal after installation
3. Verify with `node --version` and `npm --version`
4. On Windows: Restart computer to refresh PATH
5. See `INSTALL_NODEJS.md` for detailed installation help

#### Page Won't Load / Blank Screen

**Problem:** Development server not running or port conflict

**Solutions:**
1. Ensure `npm run dev` is running
2. Check terminal for error messages
3. Try alternative URL: http://127.0.0.1:3000/
4. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. Clear browser cache
6. Try different browser
7. Check if another app is using port 3000

#### Cannot Log In / "Invalid credentials"

**Problem:** Account doesn't exist or wrong password

**Solutions:**
1. Verify email and password are correct
2. Try demo account: demo@snaprank.com / demo123
3. Sign up for new account if first time
4. Check for typos in email/password
5. Clear localStorage and try again:
   - Open browser console (F12)
   - Run: `localStorage.clear()`
   - Refresh page and sign up again

#### Photos Not Uploading

**Problem:** Category not selected or file issues

**Solutions:**
1. Ensure a category is selected from dropdown
2. Check file is a valid image (JPG, PNG, GIF)
3. Try smaller file size (under 5MB)
4. Check browser console (F12) for errors
5. Try different image file

#### Data Lost After Browser Refresh

**Problem:** localStorage cleared or browser privacy mode

**Solutions:**
1. Don't use incognito/private browsing mode
2. Check browser settings allow localStorage
3. Don't clear browser data/cookies
4. All data is local - no cloud backup exists
5. For persistent data, migrate to backend database (see AUTHENTICATION.md)

#### Port Already in Use

**Problem:** Another application using port 3000

**Solutions:**
1. Stop other applications using port 3000
2. Edit `vite.config.ts` to change port:
   ```typescript
   export default defineConfig({
     server: {
       port: 3001  // Change to any available port
     }
   })
   ```
3. Restart dev server

#### TypeScript Errors

**Problem:** Missing type definitions

**Solutions:**
1. Run: `npm install --save-dev @types/react @types/react-dom`
2. Restart VS Code
3. Run: `npm install` to ensure all dependencies installed

---

## Configuration

### Customizing the Application

#### Changing App Name and Branding

**File:** `src/components/Navigation.tsx`

```tsx
// Line ~30
<span className="text-xl">SnapRank</span>
// Change "SnapRank" to your app name
```

**File:** `src/components/AuthPage.tsx`

```tsx
// Line ~90
<h1 className="text-3xl mb-2">SnapRank</h1>
// Change "SnapRank" to your app name
```

#### Changing Theme Colors

**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      // Add custom colors
      primary: '#9333ea',     // Purple
      secondary: '#ec4899',   // Pink
    }
  }
}
```

Update gradient colors in components:
```tsx
// Change from purple-pink gradient to your colors
className="bg-gradient-to-br from-primary to-secondary"
```

#### Modifying Points System

**File:** `src/context/AppContext.tsx`

Find the `getLeaderboard` function:

```typescript
// Line ~320
const pointsMap: Record<number, number> = {
  1: 100,  // 1st place points
  2: 75,   // 2nd place points
  3: 50,   // 3rd place points
  // ... modify as desired
};
```

#### Adjusting Trending Algorithm

**File:** `src/components/CategoryDetailPage.tsx`

```typescript
// Line ~50
const hoursOld = (Date.now() - photo.uploadedAt) / (1000 * 60 * 60);
const trendingScore = photo.likes / (hoursOld + 1);
// Modify calculation as desired
```

#### Setting Development Port

**File:** `vite.config.ts`

```typescript
export default defineConfig({
  server: {
    port: 3000,  // Change to desired port
  },
  plugins: [react()],
});
```

---

## Project Structure

```
Social Media Photo App/
├── src/
│   ├── components/          # React components
│   │   ├── AuthPage.tsx              # Login/Signup page
│   │   ├── CategoryDetailPage.tsx    # Category view with photos
│   │   ├── HallOfFamePage.tsx        # Hall of Fame display
│   │   ├── HomePage.tsx              # Main category browser
│   │   ├── LeaderboardPage.tsx       # Weekly leaderboards
│   │   ├── Navigation.tsx            # Top navigation bar
│   │   ├── ProfilePage.tsx           # User profile
│   │   ├── UploadPage.tsx            # Photo upload interface
│   │   ├── figma/                    # Figma design components
│   │   └── ui/                       # Reusable UI components
│   │       ├── button.tsx            # Button component
│   │       ├── card.tsx              # Card component
│   │       ├── input.tsx             # Input component
│   │       ├── label.tsx             # Label component
│   │       └── ...                   # Other UI components
│   ├── context/
│   │   ├── AppContext.tsx            # Global app state
│   │   └── AuthContext.tsx           # Authentication state
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css               # Global styles
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Base styles
├── public/                            # Static assets
├── node_modules/                      # Dependencies (not in git)
├── dist/                              # Production build (generated)
├── index.html                         # HTML template
├── package.json                       # Project metadata & dependencies
├── package-lock.json                  # Dependency lock file
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── .gitignore                        # Git ignore rules
├── README.md                         # This user manual
├── DESIGN.md                         # Technical design document
├── FEATURES.md                       # Feature documentation
├── SETUP.md                          # Setup guide
├── USER_GUIDE.md                     # End-user guide
└── AUTHENTICATION.md                 # Authentication documentation
```

### Key Files Explained

**package.json**
- Lists all dependencies
- Defines npm scripts (dev, build, preview)
- Project metadata

**vite.config.ts**
- Vite build tool configuration
- Development server settings
- Plugin configuration

**tsconfig.json**
- TypeScript compiler options
- Type checking rules
- Module resolution settings

**tailwind.config.js**
- Tailwind CSS customization
- Theme colors and fonts
- Plugin configuration

**src/App.tsx**
- Main application component
- Routing logic
- Authentication gate

**src/context/AppContext.tsx**
- Global state management
- User data, photos, categories
- Voting system logic
- Leaderboard calculations
- Points distribution

**src/context/AuthContext.tsx**
- Authentication state
- Login/signup functions
- Session management
- localStorage persistence

---

## Additional Documentation

For more detailed information, see:

- **[DESIGN.md](./DESIGN.md)** - Technical design decisions and architecture
- **[FEATURES.md](./FEATURES.md)** - Comprehensive feature documentation
- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Authentication system details and production migration
- **[SETUP.md](./SETUP.md)** - Detailed development setup guide
- **[USER_GUIDE.md](./USER_GUIDE.md)** - End-user instructions

---

## Data Storage

**Current Implementation:**
- All data stored in browser `localStorage`
- No backend server or database
- Data persists across browser sessions
- Clearing browser data erases all information

**localStorage Structure:**
```javascript
localStorage.users          // All user accounts
localStorage.currentUser    // Currently logged-in user
```

**App State (in memory):**
- Categories
- Photos
- Votes
- Badges
- Points

**Note:** For production use with real users, you should migrate to a backend database. See `AUTHENTICATION.md` for migration guides to Firebase, Supabase, or custom backend.

---

## Browser Compatibility

**Supported Browsers:**
- ✅ Chrome (version 90+)
- ✅ Firefox (version 88+)
- ✅ Safari (version 14+)
- ✅ Edge (version 90+)

**Required Browser Features:**
- localStorage support
- ES6+ JavaScript
- CSS Grid and Flexbox
- File API (for image uploads)
- Camera API (for photo capture on mobile)

---

## Testing the Application

### Using Demo Data

The application includes pre-populated demo data for testing:

- **4 Demo Users:** demo_user, alex_photo, sarah_snaps, mike_adventures
- **11 Categories:** Mix of official, weekly, private, and archived
- **Sample Photos:** Multiple photos across categories
- **Sample Badges:** Pre-earned achievements for testing

**Demo Account Credentials:**
- Email: demo@snaprank.com
- Password: demo123

### Test Scenarios

1. **Authentication Flow:**
   - Sign up with new email
   - Log out
   - Log back in
   - Verify session persistence

2. **Photo Upload:**
   - Upload to different category types
   - Verify photo appears immediately
   - Check attribution to correct user

3. **Voting System:**
   - Like/dislike various photos
   - Verify score updates
   - Check cannot vote on own photos
   - Test changing votes

4. **Leaderboard:**
   - Vote to change rankings
   - Verify positions update
   - Check points awarded correctly

5. **Categories:**
   - Create public category
   - Create private category
   - Join private category with code
   - Test share code validation

6. **Profile:**
   - View earned badges
   - Select badges to display
   - Archive/delete uploads
   - Verify statistics

---

## Support

If you encounter issues not covered in this manual:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console (F12) for error messages  
3. Verify Node.js and npm are properly installed
4. Ensure you're using a supported browser
5. Try clearing browser cache and localStorage
6. Restart the development server

For technical questions, refer to:
- `DESIGN.md` for implementation details
- `AUTHENTICATION.md` for auth-specific issues
- `FEATURES.md` for feature specifications

---

## License

MIT License - Free to use for learning and non-commercial purposes.

---

**Built with React, TypeScript, and Tailwind CSS**

*This is a demonstration project showcasing modern web development practices with client-side state management.*
