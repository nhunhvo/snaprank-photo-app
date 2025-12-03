# Social Media Photo App - Feature Documentation

## 🎯 Overview
A competitive social media photo-sharing platform where users upload photos to categories, vote on submissions, and compete for rankings and achievements.

## ✨ Key Features

### 📸 Photo Upload System
- **Upload from Camera Roll**: Choose existing photos from your device
- **Take Live Photo**: Use your device camera to capture photos directly
- **Category Selection**: Must select a category before uploading
- **Instant Publishing**: Photos go live immediately after upload

### 🏷️ Category System

#### Official Categories - Basic (Permanent)
- Night Out
- Soft Launch
- Photobooth
- Hiking
- Family
- **Features**:
  - Always available
  - Included in Hall of Fame
  - Permanent rankings

#### Official Categories - Weekly Challenges
- Rotating weekly themes (e.g., "Best Holiday Decor", "Cozy Winter Vibes")
- **Features**:
  - Active for one week
  - Live leaderboard with real-time updates
  - Points system (1st: 100pts, 2nd: 75pts, 3rd: 50pts, etc.)
  - Automatically archived after the week ends
  - Archived challenges show top 10 photos only

#### User-Created Categories (Public)
- Any user can create public categories
- Examples: "Foodie Moments", "Pet Love", "Concert Vibes"
- **Features**:
  - Community-driven content
  - Anyone can view and upload
  - No leaderboard points, but can reach Hall of Fame

#### Private Categories
- Create exclusive categories for friends/groups
- **Features**:
  - Share code system (e.g., "SQUAD2024")
  - Only members can view and upload
  - Join via "Join with Code" button
  - Creator can share the code with friends
  - Copy code feature for easy sharing

### 👍 Voting System
- **Like/Dislike**: Vote on any photo
- **Vote Toggle**: Click again to remove your vote
- **Vote Change**: Switch between like/dislike
- **Score Calculation**: Score = Likes - Dislikes
- **Real-time Updates**: Scores update instantly

### 🏆 Leaderboard System

#### Weekly Leaderboard (Official Weekly Categories Only)
- **Live Updates**: Rankings update in real-time
- **Points Awards**:
  - 1st Place: 100 points 🥇
  - 2nd Place: 75 points 🥈
  - 3rd Place: 50 points 🥉
  - 4th Place: 30 points
  - 5th Place: 20 points
  - 6th-10th: 10, 5, 3, 2, 1 points
- **Display**: Shows user, photo, score, and points
- **Top 3 Highlight**: Special styling for podium positions

### 🌟 Hall of Fame

#### Monthly Hall of Fame
- Top photos from official categories in the past month
- Ranked by total likes
- Up to 20 entries displayed

#### Category Hall of Fame
- All-time best photos per category
- Filter by specific category or view all
- Top 3 get podium display

#### Overall Hall of Fame
- The absolute best photos across all categories and time
- Hall of fame legends

### 👤 User Profiles

#### Profile Features
- Profile picture with "Leader" halo if currently #1
- Upload count and achievement count
- Total likes received

#### Badge System
- **Earn Badges**: 
  - Leaderboard wins (weekly challenges)
  - Hall of Fame appearances
- **Display Badges**: Select up to 5 badges to display
- **Badge Details**: Shows rank, category name, and period
- **Visual Indicators**:
  - 🏆 Gold for 1st place
  - 🥈 Silver for 2nd place
  - 🥉 Bronze for 3rd place

#### Photo Management
- View all your uploads
- Active photos grid
- Archive photos (hides from public view)
- Delete photos permanently
- Archived photos section (toggle view)
- Stats for each photo (likes, dislikes, score, date)

### 📊 Category Detail View

#### Viewing Options
- **Leaderboard**: Sort by score (likes - dislikes)
- **Trending**: Sort by photos gaining likes fastest (likes per hour)
- **Recent**: Sort by newest uploads

#### For Active Weekly Challenges
- Live leaderboard sidebar showing top 3
- Real-time "LIVE" indicator
- Current points for each position

#### For Archived Challenges
- Banner indicating archived status
- Shows only top 10 photos from that week
- Cannot upload to archived categories
- Sorting disabled (fixed leaderboard order)

### 🎨 User Interface

#### Navigation
- Home: Browse all categories
- Upload: Upload new photos
- Leaderboard: View weekly challenge rankings
- Hall of Fame: Browse all-time best photos
- Profile: Manage your account

#### Visual Design
- Clean, modern interface
- Card-based layouts
- Real-time update indicators
- Gradient accents (purple/pink theme)
- Responsive grid layouts
- Hover effects and transitions
- Toast notifications for actions

### 🔐 Access Control
- Private categories require membership
- Can't upload to archived categories
- Can't vote on your own photos (in real implementation)
- Share codes are unique per private category

### 📱 Mobile Features
- Camera capture uses native camera on mobile devices
- Responsive design for all screen sizes
- Touch-friendly interfaces
- Optimized image display

## 🎯 Competitive Elements

### Points System
- Only weekly challenges award points
- Points accumulate over time
- Higher ranks = more points
- Creates ongoing competition

### Rankings
- Category-specific leaderboards
- Overall Hall of Fame
- Real-time position updates
- Visual rank indicators (#1, #2, #3, etc.)

### Achievements
- Leaderboard wins become badges
- Hall of Fame entries become badges
- Display achievements on profile
- Competitive badge collection

## 🔄 Weekly Cycle
1. New weekly challenge starts
2. Users upload photos throughout the week
3. Community votes on submissions
4. Live leaderboard shows current standings
5. Week ends, final rankings determined
6. Points awarded to top performers
7. Category archived, showing top 10 forever
8. New weekly challenge begins

## 📈 Discovery & Engagement

### Browse Categories
- Featured weekly challenges at top
- Official permanent categories
- Community categories
- Private categories (if member)
- Archived challenges

### Photo Discovery
- Trending photos gain visibility
- Recent uploads stay fresh
- Leaderboard highlights best performers
- Hall of Fame showcases legends

## 💡 Social Features

### Competition
- Vote on others' photos
- Compete for rankings
- Earn badges and achievements
- Weekly fresh starts

### Community
- Create public categories
- Join private groups
- Share experiences
- Celebrate top performers

### Personal
- Build your portfolio
- Track your success
- Display achievements
- Manage your uploads

## 🚀 Future Enhancements (Potential)
- User comments on photos
- Photo editing filters
- Push notifications for rankings
- Friend system
- Activity feed
- Photo challenges with themes
- Voting analytics
- Profile customization
- Export achievements
