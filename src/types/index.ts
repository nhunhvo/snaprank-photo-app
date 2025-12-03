export interface User {
  id: string;
  username: string;
  profilePicture: string;
  badges: Badge[];
  selectedBadges: string[]; // Badge IDs (max 5)
  isCurrentLeader: boolean;
  uploads: Photo[];
}

export interface Category {
  id: string;
  name: string;
  type: 'official-basic' | 'official-weekly' | 'user-created' | 'private';
  isActive: boolean; // For weekly categories
  createdBy?: string; // User ID for user-created categories
  weekEnding?: string; // For weekly categories
  isArchived?: boolean;
  shareCode?: string; // For private categories
  members?: string[]; // User IDs who have access to private category
}

export interface Photo {
  id: string;
  userId: string;
  username: string;
  userProfilePicture: string;
  categoryId: string;
  imageUrl: string;
  uploadedAt: number;
  likes: number;
  dislikes: number;
  votedBy: { [userId: string]: 'like' | 'dislike' }; // Track who voted
  isArchived?: boolean;
}

export interface Badge {
  id: string;
  type: 'leaderboard' | 'hall-of-fame';
  categoryName: string;
  rank: number;
  period: string; // e.g., "Week of Nov 20", "November 2024"
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  profilePicture: string;
  photoId: string;
  photoUrl: string;
  score: number; // likes - dislikes
  rank: number;
  points: number; // Points awarded based on rank
}

export interface HallOfFameEntry {
  userId: string;
  username: string;
  profilePicture: string;
  photoId: string;
  photoUrl: string;
  likes: number;
  rank: number;
  categoryName: string;
  period: string;
}

export type SortOption = 'recent' | 'trending' | 'leaderboard';
