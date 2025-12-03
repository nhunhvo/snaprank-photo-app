# SnapRank - Social Media Photo Competition App

A competitive social media platform where users upload photos to categories, compete for rankings, and earn achievements through community voting.

## 🌟 Features

### Photo Sharing & Competition
- 📸 Upload from camera roll or take live photos
- 🏷️ Multiple category types (Official, Weekly Challenges, Community, Private)
- 👍 Like/Dislike voting system with real-time scoring
- 🏆 Weekly leaderboards with points system
- 🌟 Hall of Fame for best photos
- 🎖️ Badge system for achievements

### Category System
- **Official Categories**: Permanent categories with Hall of Fame
- **Weekly Challenges**: Rotating themes with leaderboards and points
- **Community Categories**: User-created public categories
- **Private Categories**: Exclusive groups with share codes

### User Features
- 👤 Personal profile with statistics
- 🎯 Badge collection and display (up to 5)
- 📊 Upload management (archive/delete)
- 👑 Leader halo for #1 ranked users
- 📈 Real-time ranking updates

### Discovery
- 🔥 Trending photos (fastest-growing)
- 🆕 Recent uploads
- 🏅 Leaderboard rankings
- 📚 Archived challenge history (top 10)

## 🚀 Quick Start

### Prerequisites
- **Node.js (v18 or higher)** - [Download here](https://nodejs.org/)
  - 📝 **Don't have Node.js?** See **[INSTALL_NODEJS.md](./INSTALL_NODEJS.md)** for step-by-step installation guide
- npm (comes with Node.js)

### Installation

```bash
# Navigate to project folder
cd "Social Media Photo App"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will run at `http://localhost:5173`

> 💡 **First time?** After installing Node.js, make sure to open a **new** terminal window before running commands.

## 📖 Documentation

- **[FEATURES.md](./FEATURES.md)** - Comprehensive feature documentation
- **[SETUP.md](./SETUP.md)** - Detailed setup and development guide
- **[Attributions.md](./src/Attributions.md)** - Design credits

## 🎯 How It Works

### For Users
1. **Browse Categories** - Explore official, weekly, and community categories
2. **Upload Photos** - Take or choose photos and submit to categories
3. **Vote & Compete** - Like/dislike photos to influence rankings
4. **Earn Achievements** - Win weekly challenges and enter Hall of Fame
5. **Display Badges** - Show off your accomplishments on your profile

### For Weekly Challenges
1. New challenge starts each week with a unique theme
2. Users upload photos throughout the week
3. Community votes determine rankings
4. Live leaderboard shows current standings
5. Top 10 earn points (1st: 100pts, 2nd: 75pts, 3rd: 50pts, etc.)
6. Challenge archives at week's end, preserving top 10 photos

### For Private Categories
1. Create a private category for your group
2. Receive a unique share code (e.g., "SQUAD2024")
3. Share code with friends via message/channel
4. Friends join using "Join with Code" button
5. Exclusive photo sharing within the group

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📱 Key Pages

### Home Page
Browse all categories, create new ones, join private categories, view archives

### Upload Page  
Photo upload interface with camera capture or file selection

### Category Detail
View photos with sorting (leaderboard/trending/recent), voting, live rankings

### Leaderboard
Weekly challenge rankings with real-time updates and points display

### Hall of Fame
Monthly, category-specific, and all-time best photos

### Profile
Personal statistics, badge management, upload history, achievement display

## 🎨 Customization

The app is highly customizable:

- **Branding**: Change app name and logo in `Navigation.tsx`
- **Theme**: Update colors in `tailwind.config.js`
- **Points System**: Modify point values in `AppContext.tsx`
- **Trending Algorithm**: Adjust calculation in `CategoryDetailPage.tsx`

## 📊 Mock Data

The app includes rich mock data for testing:
- 4 sample users with profiles and badges
- 11 categories (official, weekly, private, archived)
- Multiple photos across categories
- Sample badges and achievements

## 🔜 Future Enhancements

Potential features for expansion:
- Real backend integration with API
- Image cloud storage (AWS S3, Cloudinary)
- User authentication and accounts
- Push notifications for rankings
- Comments on photos
- Following/friends system
- Photo editing filters
- Export achievements
- Activity feed

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or as a foundation for your own app.

## 🙏 Credits

Original design from [Figma Community](https://www.figma.com/design/cw2upgHiKvs9k0mkYoXgMj/Social-Media-Photo-App)

## 💬 Support

For questions, issues, or suggestions:
- Check the [SETUP.md](./SETUP.md) for detailed documentation
- Review [FEATURES.md](./FEATURES.md) for feature explanations
- Open an issue on GitHub

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
