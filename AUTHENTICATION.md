# Authentication System Documentation

## 🔐 Overview

The app now includes a complete authentication system that allows users to create their own profiles and log in to access the app. This replaces the previous mock user system.

## ✨ Features

### Sign Up
- **Email Address**: Unique identifier for each account
- **Username**: Display name visible to other users
- **Password**: Secure credential (minimum 6 characters)
- **Profile Picture** (Optional): Upload a custom profile image or use default

### Log In
- Existing users authenticate with email and password
- Session persists across browser refreshes
- Invalid credentials show error message

### Log Out
- Click the logout button (🚪 icon) in the top navigation
- Clears session and returns to login page

## 🏗️ Technical Implementation

### Architecture

```
┌─────────────────────────────────────────────────┐
│                   App.tsx                       │
│  ┌───────────────────────────────────────────┐ │
│  │          AuthProvider                     │ │
│  │  ┌─────────────────────────────────────┐ │ │
│  │  │       AppProvider                   │ │ │
│  │  │  ┌───────────────────────────────┐  │ │ │
│  │  │  │      AppContent              │  │ │ │
│  │  │  │  • Shows AuthPage if not     │  │ │ │
│  │  │  │    authenticated             │  │ │ │
│  │  │  │  • Shows main app if         │  │ │ │
│  │  │  │    authenticated             │  │ │ │
│  │  │  └───────────────────────────────┘  │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Key Files

#### 1. `src/context/AuthContext.tsx`
Manages authentication state and operations.

**State:**
```typescript
interface AuthContextType {
  user: AuthUser | null;        // Currently logged in user
  isAuthenticated: boolean;     // Login status
  login: (email: string, password: string) => boolean;
  signup: (email: string, username: string, password: string, profilePicture?: string) => boolean;
  logout: () => void;
}
```

**Functions:**
- `signup()`: Creates a new user account
  - Validates email uniqueness
  - Stores user in localStorage 'users' array
  - Auto-logs in the new user
  - Returns true on success, false if email already exists

- `login()`: Authenticates existing user
  - Checks email and password against stored users
  - Sets currentUser in localStorage
  - Updates auth state
  - Returns true on success, false if credentials invalid

- `logout()`: Clears session
  - Removes currentUser from localStorage
  - Resets auth state to null
  - Redirects to login page

**Data Storage:**
```javascript
// localStorage structure
localStorage.setItem('users', JSON.stringify([
  {
    id: 'unique-id',
    email: 'user@example.com',
    username: 'johndoe',
    password: 'hashed-in-production',  // ⚠️ Currently plain text (demo only)
    profilePicture: 'https://...'
  },
  // ... more users
]));

localStorage.setItem('currentUser', JSON.stringify({
  id: 'unique-id',
  email: 'user@example.com',
  username: 'johndoe',
  profilePicture: 'https://...'
}));
```

#### 2. `src/components/AuthPage.tsx`
Login and signup UI component.

**Features:**
- Toggle between login and signup modes
- Form validation (required fields, email format, password length)
- Profile picture upload with preview
- Error messages for invalid credentials
- Demo credentials display for testing
- Responsive design

**Form Fields:**

*Login:*
- Email address
- Password

*Sign Up:*
- Email address
- Username
- Password
- Profile Picture (optional file upload)

#### 3. `src/App.tsx`
Main application entry with auth gate.

```typescript
function AppContent() {
  const { isAuthenticated } = useAuth();
  
  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }
  
  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      {/* ... rest of app */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
```

#### 4. `src/components/Navigation.tsx`
Updated with logout button.

**Changes:**
- Import `useAuth` hook
- Import `LogOut` icon from lucide-react
- Added logout button next to profile picture
- Calls `logout()` when clicked

#### 5. `src/context/AppContext.tsx`
Syncs with authenticated user.

**Changes:**
- Imports `useAuth` hook
- Reads `authUser` from AuthContext
- Creates or updates User in app state when authUser changes
- Sets currentUser based on authenticated user
- Removes mock user as default currentUser

## 🎯 User Flow

### New User
```
1. Open app → See AuthPage (signup mode)
2. Enter email, username, password
3. Optionally upload profile picture
4. Click "Sign Up"
5. Account created → Auto logged in → Redirected to HomePage
```

### Returning User
```
1. Open app → See AuthPage (login mode)
2. Enter email and password
3. Click "Log In"
4. Authenticated → Redirected to HomePage
```

### Logout
```
1. Click logout button in navigation
2. Session cleared → Redirected to AuthPage
```

## 🧪 Testing

### Demo Accounts
For testing purposes, demo accounts are created on first app load:

```javascript
Email: demo@snaprank.com
Password: demo123
Username: demo_user

Email: alex@example.com  
Password: alex123
Username: alex_photo

Email: sarah@example.com
Password: sarah123  
Username: sarah_snaps
```

These appear in the login page for easy testing.

### Manual Testing Checklist
- [ ] Sign up with new email → Creates account
- [ ] Sign up with existing email → Shows error
- [ ] Log in with valid credentials → Authenticates
- [ ] Log in with invalid credentials → Shows error
- [ ] Upload profile picture during signup → Displays in profile
- [ ] Refresh browser while logged in → Stays logged in
- [ ] Click logout → Returns to login page
- [ ] Upload photo while logged in → Photo tied to user
- [ ] Vote on photo → Vote tied to user
- [ ] Check profile page → Shows user's uploads

## ⚠️ Current Limitations (Demo Mode)

### localStorage Only
- All data stored in browser localStorage
- Data is NOT synced across devices
- Clearing browser data = losing all accounts and photos
- No server-side validation
- Passwords stored in **plain text** (demo only!)

### No Email Verification
- Email addresses not verified
- Users can enter fake emails
- No password reset functionality

### No Password Security
- Passwords stored as plain text in localStorage
- No hashing or encryption
- Anyone with browser access can read passwords

### Single Device
- Session tied to one browser
- Cannot log in from multiple devices
- No "Remember Me" cross-device

## 🚀 Production Migration Guide

### ⚠️ DO NOT use localStorage authentication in production!

For a real production deployment, you **must** migrate to a proper backend authentication service. Here are recommended options:

---

### Option 1: Firebase Authentication (Recommended for beginners)

**Why Firebase:**
- Free tier available
- Handles all authentication logic
- Built-in security (password hashing, rate limiting, etc.)
- Email verification
- Social logins (Google, Facebook, etc.)
- Password reset flows
- Multi-device sync

**Migration Steps:**

1. **Install Firebase SDK**
```bash
npm install firebase
```

2. **Create Firebase project**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create new project
- Enable Authentication
- Enable Email/Password provider

3. **Initialize Firebase**
```typescript
// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

4. **Update AuthContext**
```typescript
// src/context/AuthContext.tsx
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          username: firebaseUser.displayName || 'Anonymous',
          profilePicture: firebaseUser.photoURL || undefined
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, username: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => signOut(auth);

  // ... rest of context
};
```

5. **Store user data in Firestore**
```typescript
// Store additional user profile data
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore(app);

const createUserProfile = async (userId: string, username: string, profilePicture?: string) => {
  await setDoc(doc(db, 'users', userId), {
    username,
    profilePicture,
    createdAt: new Date(),
    badges: [],
    uploads: []
  });
};
```

---

### Option 2: Supabase (Firebase alternative)

**Why Supabase:**
- Open source
- PostgreSQL database
- Built-in authentication
- Row-level security
- Realtime subscriptions
- Free tier available

**Migration Steps:**

1. **Install Supabase SDK**
```bash
npm install @supabase/supabase-js
```

2. **Create Supabase project**
- Go to [Supabase](https://supabase.com/)
- Create new project
- Get your API keys

3. **Initialize Supabase**
```typescript
// src/supabase/config.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

4. **Update AuthContext**
```typescript
import { supabase } from '../supabase/config';

const signup = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      }
    }
  });
  return !error;
};

const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return !error;
};

const logout = () => supabase.auth.signOut();
```

---

### Option 3: Custom Backend (Most control)

**Why Custom:**
- Full control over logic
- Can use any database
- Custom validation rules
- Integrate with existing systems

**Tech Stack Example:**
- Node.js + Express
- PostgreSQL or MongoDB
- JWT for tokens
- bcrypt for password hashing

**Backend Setup:**

1. **Install dependencies**
```bash
npm install express bcryptjs jsonwebtoken pg
```

2. **Create auth routes**
```javascript
// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save to database
  const user = await db.query(
    'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
    [email, username, hashedPassword]
  );
  
  // Generate JWT
  const token = jwt.sign({ userId: user.rows[0].id }, 'SECRET_KEY');
  
  res.json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, 'SECRET_KEY');
  
  res.json({ token });
});
```

3. **Frontend Integration**
```typescript
// src/context/AuthContext.tsx
const signup = async (email: string, password: string, username: string) => {
  const response = await fetch('https://your-api.com/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password })
  });
  
  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    return true;
  }
  return false;
};
```

---

## 🔒 Security Best Practices

When migrating to production:

### 1. Never Store Passwords in Plain Text
```typescript
// ❌ BAD (current demo implementation)
const user = { password: 'user123' };

// ✅ GOOD (use bcrypt or service provider)
const hashedPassword = await bcrypt.hash('user123', 10);
const user = { password: hashedPassword };
```

### 2. Use HTTPS Only
```typescript
// ✅ Enforce HTTPS in production
if (location.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

### 3. Validate Email Addresses
```typescript
// ✅ Server-side email validation
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 4. Implement Rate Limiting
```javascript
// ✅ Prevent brute force attacks
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per window
});

app.use('/auth/login', authLimiter);
```

### 5. Use Environment Variables
```bash
# .env
FIREBASE_API_KEY=your_api_key
JWT_SECRET=your_secret_key
DATABASE_URL=your_db_url
```

```typescript
// ✅ Never hardcode secrets
const apiKey = process.env.FIREBASE_API_KEY;
```

### 6. Enable Email Verification
```typescript
// ✅ Firebase example
import { sendEmailVerification } from 'firebase/auth';

const result = await createUserWithEmailAndPassword(auth, email, password);
await sendEmailVerification(result.user);
```

---

## 📝 Migration Checklist

Before going to production:

- [ ] Choose authentication provider (Firebase, Supabase, or custom)
- [ ] Set up backend/service
- [ ] Implement password hashing
- [ ] Add email verification
- [ ] Add password reset flow
- [ ] Implement rate limiting
- [ ] Use HTTPS only
- [ ] Store secrets in environment variables
- [ ] Add input validation (frontend + backend)
- [ ] Implement session timeout
- [ ] Add "Remember Me" functionality
- [ ] Test across multiple devices
- [ ] Add 2FA (optional but recommended)
- [ ] Set up monitoring and logging
- [ ] Create privacy policy and terms of service
- [ ] Test logout from all devices
- [ ] Implement account deletion
- [ ] Add CAPTCHA to prevent bots (optional)

---

## 🆘 Troubleshooting

### "User already exists" error
- Email already registered
- Try logging in instead of signing up
- Use a different email address

### Session not persisting after refresh
- Check localStorage is enabled in browser
- Clear browser cache and try again
- Check for console errors

### Profile picture not uploading
- Check file size (should be < 5MB for demo)
- Ensure file is an image (jpg, png, gif)
- For production: implement cloud storage (Firebase Storage, AWS S3, Cloudinary)

### Cannot log out
- Check console for errors
- Clear localStorage manually: `localStorage.clear()`
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [bcrypt npm package](https://www.npmjs.com/package/bcryptjs)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Made with SnapRank** 📸
