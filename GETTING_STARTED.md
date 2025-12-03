# 🚦 Getting Started Checklist

Use this checklist to get your app running quickly!

## ✅ Pre-Launch Checklist

### Step 1: Verify Node.js Installation
```powershell
# Run these commands in PowerShell:
node --version
npm --version
```

**Expected output:**
- Node: `v18.x.x` or `v20.x.x` or higher ✅
- npm: `9.x.x` or `10.x.x` or higher ✅

**If you see errors:**
- ❌ "not recognized" → Node.js not installed or not in PATH
- 👉 Follow **[INSTALL_NODEJS.md](./INSTALL_NODEJS.md)** guide
- 🔄 After installing, close and reopen PowerShell

---

### Step 2: Navigate to Project
```powershell
cd "c:\Users\votam\Downloads\Social Media Photo App"
```

**Verify you're in the right folder:**
```powershell
ls
```

You should see:
- ✅ `package.json`
- ✅ `src/` folder
- ✅ `index.html`
- ✅ `README.md`

---

### Step 3: Install Dependencies
```powershell
npm install
```

**What you'll see:**
- Progress bars installing packages
- Takes 1-3 minutes depending on internet speed
- Creates `node_modules/` folder (~300MB)
- Creates `package-lock.json`

**Troubleshooting:**
- ❌ "npm is not recognized" → Restart PowerShell after Node.js install
- ❌ Permission errors → Run PowerShell as Administrator
- ❌ Network errors → Check internet connection
- ❌ Disk space → Need ~500MB free space

---

### Step 4: Start Development Server
```powershell
npm run dev
```

**What you'll see:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**Success indicators:**
- ✅ "ready in" message appears
- ✅ No error messages
- ✅ Port number shown (usually 5173)

**Troubleshooting:**
- ❌ "Port already in use" → Use `npm run dev -- --port 3000`
- ❌ Build errors → Run `npm install` again
- ❌ TypeScript errors → Check for file corruption

---

### Step 5: Open in Browser

**Option A: Automatic (recommended)**
- Browser should open automatically to `http://localhost:5173`

**Option B: Manual**
1. Open your browser
2. Go to: `http://localhost:5173`

**What you should see:**
- ✅ SnapRank app with navigation bar
- ✅ Category sections on homepage
- ✅ No error messages in browser console

---

## 🎯 First-Time User Quick Tour

Once the app is running:

### 1. Explore the Homepage (30 seconds)
- [ ] See "This Week's Challenges" section
- [ ] See "Official Categories" 
- [ ] See "Community Categories"
- [ ] See "Private Categories"

### 2. Try Uploading a Photo (2 minutes)
- [ ] Click "Upload" in navigation
- [ ] Click "Upload from Camera Roll"
- [ ] Select any image from your computer
- [ ] Choose a category (try "Night Out")
- [ ] Click "Upload Photo"
- [ ] See success message

### 3. Vote on Photos (1 minute)
- [ ] Click any category on homepage
- [ ] See photos in grid
- [ ] Click thumbs up on a photo
- [ ] See score increase
- [ ] Click thumbs down to try it
- [ ] Click again to remove vote

### 4. Check the Leaderboard (1 minute)
- [ ] Click "Leaderboard" in navigation
- [ ] See weekly challenges with rankings
- [ ] Notice the "LIVE" indicator
- [ ] See points for each rank

### 5. View Hall of Fame (1 minute)
- [ ] Click "Hall of Fame" in navigation
- [ ] Try different tabs (Monthly, Category, Overall)
- [ ] See top 3 on podium

### 6. Explore Your Profile (2 minutes)
- [ ] Click your profile picture (top right)
- [ ] See your stats
- [ ] Click "Manage Badges"
- [ ] Select some badges
- [ ] Save changes

### 7. Try Private Categories (2 minutes)
- [ ] Go back to homepage
- [ ] Find "Private Categories" section
- [ ] Click "Create Category"
- [ ] Name it "Test Category"
- [ ] Select "Private"
- [ ] Create it
- [ ] Note the share code
- [ ] Try "Join with Code" with code "SQUAD2024"

### 8. View Archived Challenge (1 minute)
- [ ] Scroll to "Past Challenges"
- [ ] Click "Thanksgiving Feast"
- [ ] See top 10 photos from past week
- [ ] Notice you can't upload (archived)

**Total time: ~10 minutes** ⏱️

---

## 🐛 Common Issues & Solutions

### Issue: "npm is not recognized"
**Cause:** Node.js not in PATH or PowerShell needs restart
**Solution:**
1. Close all PowerShell windows
2. Open fresh PowerShell
3. Try again
4. If still fails → Restart computer

---

### Issue: npm install hangs or fails
**Cause:** Network issues, corrupted cache
**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

---

### Issue: App won't start (EADDRINUSE)
**Cause:** Port 5173 already in use
**Solution:**
```powershell
# Use different port
npm run dev -- --port 3000

# Or kill process on port
npx kill-port 5173
npm run dev
```

---

### Issue: Blank page or errors in browser
**Cause:** Build errors, cache issues
**Solution:**
1. Stop dev server (Ctrl+C)
2. Delete `node_modules` folder
3. Delete `package-lock.json`
4. Run `npm install` again
5. Run `npm run dev` again

---

### Issue: TypeScript errors
**Cause:** Incompatible versions, missing types
**Solution:**
```powershell
# Reinstall
rm -r node_modules
rm package-lock.json
npm install
```

---

### Issue: Photos won't upload
**Cause:** This is demo mode with local state
**Solution:**
- Photos are stored in memory only
- Refresh page = photos reset
- This is expected behavior
- For persistence, need backend (see SETUP.md)

---

## 📚 Next Steps After Setup

Once everything works:

1. **Read the Guides:**
   - [ ] **USER_GUIDE.md** - How to use every feature
   - [ ] **FEATURES.md** - What the app can do
   - [ ] **QUICK_REFERENCE.md** - Quick tips

2. **Customize:**
   - [ ] Change app name (see Navigation.tsx)
   - [ ] Modify colors (see tailwind.config)
   - [ ] Add your own categories
   - [ ] Upload your own photos

3. **Develop Further:**
   - [ ] Read SETUP.md for development tips
   - [ ] Consider adding a backend
   - [ ] Deploy to production

---

## ✨ You're Ready!

If you've completed all steps above:
- ✅ Node.js installed
- ✅ Dependencies installed
- ✅ Dev server running
- ✅ App opens in browser
- ✅ All features working

**Congratulations! You're ready to compete!** 🎉

---

## 🆘 Still Having Issues?

1. **Check Node.js version:**
   - Need v18 or higher
   - Update if older

2. **Run as Administrator:**
   - Right-click PowerShell
   - "Run as Administrator"
   - Try commands again

3. **Fresh Install:**
   ```powershell
   # Complete fresh start
   cd "c:\Users\votam\Downloads\Social Media Photo App"
   rm -r node_modules -ErrorAction SilentlyContinue
   rm package-lock.json -ErrorAction SilentlyContinue
   npm install
   npm run dev
   ```

4. **Check Firewall:**
   - Make sure port 5173 isn't blocked
   - Allow Node.js through firewall if prompted

---

**Need more help?** Check the documentation files or visit Node.js support.
