# Installing Node.js for Windows

## 🚀 Quick Installation Steps

### Option 1: Official Node.js Installer (Recommended)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Choose "Windows Installer (.msi)" for your system (64-bit or 32-bit)

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the setup wizard
   - **Important**: Check "Automatically install necessary tools" if prompted
   - Accept the license agreement
   - Keep default installation location (usually `C:\Program Files\nodejs\`)
   - Click "Install"
   - Click "Finish"

3. **Verify Installation**
   - Open a **new** PowerShell window (important - must be new!)
   - Run: `node --version`
   - Should show something like: `v20.x.x` or `v18.x.x`
   - Run: `npm --version`
   - Should show something like: `10.x.x` or `9.x.x`

4. **If Commands Still Don't Work**
   - Close **all** PowerShell/Command Prompt windows
   - Open a fresh PowerShell window
   - Try again

### Option 2: Using Winget (Windows Package Manager)

If you have Windows 11 or Windows 10 with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

Then close and reopen PowerShell.

### Option 3: Using Chocolatey

If you have Chocolatey installed:

```powershell
choco install nodejs-lts
```

Then close and reopen PowerShell.

---

## 🧪 After Installation - Test the App

Once Node.js is installed:

1. **Open a NEW PowerShell window**

2. **Navigate to project:**
   ```powershell
   cd "c:\Users\votam\Downloads\Social Media Photo App"
   ```

3. **Install dependencies:**
   ```powershell
   npm install
   ```
   This will take 1-2 minutes and install all required packages.

4. **Start the development server:**
   ```powershell
   npm run dev
   ```

5. **Open your browser:**
   - The app will automatically open, or
   - Manually go to: `http://localhost:5173`

6. **Enjoy your app!** 🎉

---

## 🔧 Troubleshooting

### "npm is not recognized"

**Solution:** Close all PowerShell windows and open a fresh one. The PATH environment variable needs to refresh.

### "node is not recognized"

**Solutions:**
1. Restart your computer
2. Make sure you installed Node.js correctly
3. Check if Node.js is in your PATH:
   - Open System Properties → Environment Variables
   - Look for `C:\Program Files\nodejs\` in PATH

### Installation Stuck or Errors

**Solution:** 
1. Uninstall Node.js completely
2. Restart computer
3. Reinstall with administrator privileges (right-click installer → "Run as administrator")

### Permission Errors During `npm install`

**Solution:**
1. Close VS Code and all terminals
2. Open PowerShell as Administrator
3. Navigate to project folder
4. Run `npm install` again

### Port 5173 Already in Use

**Solution:**
```powershell
npm run dev -- --port 3000
```
This will use port 3000 instead.

---

## 📋 What Gets Installed

When you run `npm install`, you'll get:
- React 18 and React DOM
- TypeScript compiler
- Vite build tool
- Tailwind CSS
- Radix UI components (20+ packages)
- Lucide React icons
- Other dependencies (~200 packages total)

**Size:** ~300-400 MB in `node_modules` folder

---

## ✅ Recommended Setup

For the best development experience:

1. **Node.js LTS** (v18 or v20)
2. **npm** (comes with Node.js)
3. **VS Code** (recommended editor)
4. **VS Code Extensions:**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)

---

## 🎯 Next Steps After Installation

1. ✅ Install Node.js
2. ✅ Run `npm install` in project folder
3. ✅ Run `npm run dev` to start app
4. ✅ Open `http://localhost:5173` in browser
5. 🎉 Start using the app!

Check out:
- **USER_GUIDE.md** - How to use the app
- **FEATURES.md** - What the app can do
- **SETUP.md** - Development details

---

**Need help?** The Node.js installer is straightforward - just download from nodejs.org and run it!
