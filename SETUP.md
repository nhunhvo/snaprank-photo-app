# Social Media Photo App - Setup & Development Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Code editor (VS Code recommended)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

### 2. Start Development Server

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The app will open at `http://localhost:5173` (default Vite port).

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
Social Media Photo App/
├── src/
│   ├── components/          # React components
│   │   ├── AuthPage.tsx              # Login/Signup interface
│   │   ├── CategoryDetailPage.tsx    # Category view with photos
│   │   ├── HallOfFamePage.tsx        # Hall of Fame display
│   │   ├── HomePage.tsx              # Main category browser
│   │   ├── LeaderboardPage.tsx       # Weekly leaderboards
│   │   ├── Navigation.tsx            # Top navigation bar
│   │   ├── ProfilePage.tsx           # User profile & uploads
│   │   ├── UploadPage.tsx            # Photo upload interface
│   │   ├── figma/                    # Figma design components
│   │   └── ui/                       # Reusable UI components (buttons, cards, etc.)
│   ├── context/
│   │   ├── AppContext.tsx            # Global state management
│   │   └── AuthContext.tsx           # Authentication state
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css               # Global styles
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Base styles
├── index.html                        # HTML template
├── package.json                      # Dependencies & scripts
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── README.md                        # This file
```

## 🎨 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **localStorage** - Client-side data persistence (authentication & app data)

## 🧪 Features Implementation

### Authentication System
The app uses `AuthContext.tsx` for user authentication:
- **Sign Up**: Create accounts with email, username, password, and optional profile picture
- **Log In**: Authenticate existing users
- **Session Management**: Persistent login state across browser refreshes
- **localStorage**: User accounts stored in browser (demo/development only)
- **Production Migration**: For real deployment, replace localStorage with:
  - Firebase Authentication
  - Supabase Auth
  - Auth0
  - Custom backend API (Node.js + JWT + database)

### State Management
The app uses React Context for global state:

#### AuthContext (`context/AuthContext.tsx`)
- Current authenticated user
- Sign up / log in / log out functions
- Session persistence
- User account storage

#### AppContext (`context/AppContext.tsx`)
- Current user
- All users
- Categories (official, weekly, user-created, private)
- Photos
- CRUD operations
- Voting system
- Leaderboard calculations
- Hall of Fame logic

### Key Components

#### HomePage
- Browse all category types
- Create new categories (public/private)
- Join private categories with codes
- View archived challenges

#### UploadPage
- Upload from camera roll
- Take photo with camera (on mobile)
- Select category
- Submit photos

#### CategoryDetailPage
- View category photos
- Sort by leaderboard, trending, or recent
- Live leaderboard for weekly challenges
- Voting on photos
- Archived view (top 10 only)

#### LeaderboardPage
- Weekly challenge tabs
- Real-time rankings
- Points system display
- Top performers highlighted

#### HallOfFamePage
- Monthly leaders
- Category champions
- All-time best
- Top 3 podium display

#### ProfilePage
- User stats and badges
- Upload management
- Badge selection (up to 5)
- Archive/delete photos
- Leader halo display

### Data Flow

```
User Action → Component → AppContext → State Update → Re-render
```

Example: Liking a photo
1. User clicks like button
2. `PhotoCard` calls `votePhoto(photoId, 'like')`
3. AppContext updates photo's votes
4. All components re-render with new data
5. Leaderboard positions update automatically

## 🎯 Development Tips

### Adding Mock Data
Edit `AppContext.tsx` in the `useEffect` hook to add:
- New users
- New categories
- Sample photos
- Badge data

### Creating New Categories
Categories have these types:
- `official-basic` - Permanent official categories
- `official-weekly` - Weekly challenges (become archived)
- `user-created` - Public community categories
- `private` - Private categories with share codes

### Testing Features

#### Test Private Categories
1. Create a private category
2. Note the share code displayed
3. Open in incognito/another browser
4. Use "Join with Code" button
5. Enter the share code

#### Test Weekly Leaderboard
1. Navigate to a weekly category
2. Upload multiple photos
3. Vote on photos (like/dislike)
4. Check leaderboard updates in real-time
5. Note points assignment

#### Test Archived Categories
1. Find an archived category on homepage
2. Click to view
3. See top 10 photos only
4. Note sorting is disabled
5. Cannot upload to archived category

#### Test Badges
1. Go to Profile
2. Click "Manage Badges"
3. Select up to 5 badges
4. Save and see them on profile

## 🔧 Customization

### Styling
- Edit `tailwind.config.js` for theme colors
- Modify `src/styles/globals.css` for global styles
- Component styles use Tailwind utility classes

### Branding
- App name: `Navigation.tsx` (currently "SnapRank")
- Logo: `Navigation.tsx` (update gradient div)
- Theme colors: Purple/pink gradient (search for `purple` and `pink`)

### Points System
Edit `getLeaderboard` in `AppContext.tsx`:
```typescript
const pointsMap = [100, 75, 50, 30, 20, 10, 5, 3, 2, 1];
```

### Trending Algorithm
Currently: `likes per hour since upload`
Modify in `CategoryDetailPage.tsx`:
```typescript
const aRate = a.likes / Math.max(1, (Date.now() - a.uploadedAt) / 3600000);
```

## 📱 Mobile Development

### Testing Camera Feature
The camera feature uses:
```html
<input type="file" accept="image/*" capture="environment" />
```

- Works on mobile browsers
- Falls back to file picker on desktop
- `capture="environment"` uses rear camera
- Change to `capture="user"` for front camera

### Responsive Design
All layouts are responsive using Tailwind's breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Build: `npm run build`
2. Publish directory: `dist`
3. Deploy

### Static Hosting
1. Run `npm run build`
2. Upload `dist/` folder to any static host
3. Ensure proper redirects for SPA routing

## 🔐 Environment Variables

Currently, the app uses mock data. For production:

1. Create `.env` file:
```env
VITE_API_URL=your-api-url
VITE_UPLOAD_ENDPOINT=your-upload-endpoint
```

2. Use in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🧩 Adding Real Backend

To connect to a real backend:

1. Replace mock data in `AppContext.tsx`
2. Add API calls:
```typescript
const addPhoto = async (photo) => {
  const response = await fetch('/api/photos', {
    method: 'POST',
    body: JSON.stringify(photo)
  });
  const newPhoto = await response.json();
  setPhotos(prev => [newPhoto, ...prev]);
};
```

3. Add authentication
4. Implement real-time updates (WebSocket/Polling)
5. Add image upload to cloud storage

## 📚 Learning Resources

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Have Fun!

Build amazing features, compete with friends, and share your best moments!
