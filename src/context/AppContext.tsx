import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Category, Photo, Badge, LeaderboardEntry, HallOfFameEntry } from '../types';
import { useAuth } from './AuthContext';

// Context interface - all app data and methods
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Provider component that manages all app state (users, photos, categories, votes)
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Load demo data on first run
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 'user1',
        username: 'you',
        profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
        badges: [
          { id: 'b1', type: 'leaderboard', categoryName: 'Night Out', rank: 1, period: 'Week of Nov 20' },
          { id: 'b2', type: 'hall-of-fame', categoryName: 'Hiking', rank: 3, period: 'November 2024' },
        ],
        selectedBadges: ['b1', 'b2'],
        isCurrentLeader: true,
        uploads: [],
      },
      {
        id: 'user2',
        username: 'alex_photo',
        profilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
        badges: [],
        selectedBadges: [],
        isCurrentLeader: false,
        uploads: [],
      },
      {
        id: 'user3',
        username: 'sarah_snaps',
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        badges: [
          { id: 'b3', type: 'leaderboard', categoryName: 'Photobooth', rank: 2, period: 'Week of Nov 27' },
        ],
        selectedBadges: ['b3'],
        isCurrentLeader: false,
        uploads: [],
      },
      {
        id: 'user4',
        username: 'mike_adventures',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        badges: [],
        selectedBadges: [],
        isCurrentLeader: false,
        uploads: [],
      },
    ];

    const mockCategories: Category[] = [
      { id: 'cat1', name: 'Night Out', type: 'official-basic', isActive: true },
      { id: 'cat2', name: 'Soft Launch', type: 'official-basic', isActive: true },
      { id: 'cat3', name: 'Photobooth', type: 'official-basic', isActive: true },
      { id: 'cat4', name: 'Hiking', type: 'official-basic', isActive: true },
      { id: 'cat5', name: 'Family', type: 'official-basic', isActive: true },
      { id: 'cat6', name: 'Best Holiday Decor', type: 'official-weekly', isActive: true, weekEnding: '2024-12-08' },
      { id: 'cat7', name: 'Cozy Winter Vibes', type: 'official-weekly', isActive: true, weekEnding: '2024-12-08' },
      { id: 'cat8', name: 'Foodie Moments', type: 'user-created', isActive: true, createdBy: 'user2' },
      { id: 'cat9', name: 'Pet Love', type: 'user-created', isActive: true, createdBy: 'user3' },
      { id: 'cat10', name: 'Thanksgiving Feast', type: 'official-weekly', isActive: false, isArchived: true, weekEnding: '2024-11-24' },
      { id: 'cat11', name: 'Squad Goals', type: 'private', isActive: true, createdBy: 'user1', shareCode: 'SQUAD2024', members: ['user1', 'user2', 'user3'] },
    ];

    const mockPhotos: Photo[] = [
      {
        id: 'p1',
        userId: 'user2',
        username: 'alex_photo',
        userProfilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
        categoryId: 'cat1',
        imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
        uploadedAt: Date.now() - 3600000,
        likes: 45,
        dislikes: 2,
        votedBy: {},
      },
      {
        id: 'p2',
        userId: 'user1',
        username: 'you',
        userProfilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
        categoryId: 'cat1',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
        uploadedAt: Date.now() - 7200000,
        likes: 52,
        dislikes: 1,
        votedBy: {},
      },
      {
        id: 'p3',
        userId: 'user3',
        username: 'sarah_snaps',
        userProfilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        categoryId: 'cat3',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
        uploadedAt: Date.now() - 1800000,
        likes: 38,
        dislikes: 0,
        votedBy: {},
      },
      {
        id: 'p4',
        userId: 'user4',
        username: 'mike_adventures',
        userProfilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        categoryId: 'cat4',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        uploadedAt: Date.now() - 5400000,
        likes: 67,
        dislikes: 3,
        votedBy: {},
      },
      {
        id: 'p5',
        userId: 'user2',
        username: 'alex_photo',
        userProfilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
        categoryId: 'cat6',
        imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
        uploadedAt: Date.now() - 900000,
        likes: 29,
        dislikes: 1,
        votedBy: {},
      },
      {
        id: 'p6',
        userId: 'user3',
        username: 'sarah_snaps',
        userProfilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        categoryId: 'cat6',
        imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800',
        uploadedAt: Date.now() - 2700000,
        likes: 41,
        dislikes: 2,
        votedBy: {},
      },
      // Archived category photos (Top 10 from Thanksgiving Feast)
      {
        id: 'p7',
        userId: 'user1',
        username: 'you',
        userProfilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
        categoryId: 'cat10',
        imageUrl: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=800',
        uploadedAt: Date.now() - 604800000, // 1 week ago
        likes: 89,
        dislikes: 3,
        votedBy: {},
      },
      {
        id: 'p8',
        userId: 'user2',
        username: 'alex_photo',
        userProfilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
        categoryId: 'cat10',
        imageUrl: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=800',
        uploadedAt: Date.now() - 604800000,
        likes: 76,
        dislikes: 1,
        votedBy: {},
      },
      {
        id: 'p9',
        userId: 'user3',
        username: 'sarah_snaps',
        userProfilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        categoryId: 'cat10',
        imageUrl: 'https://images.unsplash.com/photo-1445358621835-20d6271160de?w=800',
        uploadedAt: Date.now() - 604800000,
        likes: 65,
        dislikes: 2,
        votedBy: {},
      },
      {
        id: 'p10',
        userId: 'user4',
        username: 'mike_adventures',
        userProfilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        categoryId: 'cat10',
        imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800',
        uploadedAt: Date.now() - 604800000,
        likes: 58,
        dislikes: 0,
        votedBy: {},
      },
      // Private category photos
      {
        id: 'p11',
        userId: 'user1',
        username: 'you',
        userProfilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
        categoryId: 'cat11',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
        uploadedAt: Date.now() - 1800000,
        likes: 15,
        dislikes: 0,
        votedBy: {},
      },
    ];

    setUsers(mockUsers);
    setCategories(mockCategories);
    setPhotos(mockPhotos);
  }, []);

  // Sync current user with authenticated user
  useEffect(() => {
    if (authUser) {
      // Find or create user in users list
      setUsers(prev => {
        const existingUser = prev.find(u => u.id === authUser.id);
        if (existingUser) {
          return prev;
        } else {
          // Create new user from auth user
          const newUser: User = {
            id: authUser.id,
            username: authUser.username,
            profilePicture: authUser.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
            badges: [],
            selectedBadges: [],
            isCurrentLeader: false,
            uploads: [],
          };
          return [...prev, newUser];
        }
      });

      // Set as current user
      setCurrentUser(prev => {
        if (prev?.id === authUser.id) return prev;
        return users.find(u => u.id === authUser.id) || {
          id: authUser.id,
          username: authUser.username,
          profilePicture: authUser.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
          badges: [],
          selectedBadges: [],
          isCurrentLeader: false,
          uploads: [],
        };
      });
    } else {
      setCurrentUser(null);
    }
  }, [authUser, users]);

  const addPhoto = (photo: Omit<Photo, 'id' | 'uploadedAt' | 'likes' | 'dislikes' | 'votedBy'>) => {
    const newPhoto: Photo = {
      ...photo,
      id: `p${Date.now()}`,
      uploadedAt: Date.now(),
      likes: 0,
      dislikes: 0,
      votedBy: {},
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const votePhoto = (photoId: string, vote: 'like' | 'dislike') => {
    if (!currentUser) return;

    setPhotos(prev => prev.map(photo => {
      if (photo.id !== photoId) return photo;

      const previousVote = photo.votedBy[currentUser.id];
      const newVotedBy = { ...photo.votedBy };
      let newLikes = photo.likes;
      let newDislikes = photo.dislikes;

      if (previousVote === vote) {
        // Remove vote
        delete newVotedBy[currentUser.id];
        if (vote === 'like') newLikes--;
        else newDislikes--;
      } else {
        // Add or change vote
        newVotedBy[currentUser.id] = vote;
        if (vote === 'like') {
          newLikes++;
          if (previousVote === 'dislike') newDislikes--;
        } else {
          newDislikes++;
          if (previousVote === 'like') newLikes--;
        }
      }

      return {
        ...photo,
        likes: newLikes,
        dislikes: newDislikes,
        votedBy: newVotedBy,
      };
    }));
  };

  const createCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat${Date.now()}`,
    };

    // Generate share code for private categories
    if (newCategory.type === 'private' && currentUser) {
      const shareCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      newCategory.shareCode = shareCode;
      newCategory.members = [currentUser.id];
    }

    setCategories(prev => [...prev, newCategory]);
  };

  const deletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const archivePhoto = (photoId: string) => {
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, isArchived: true } : p));
  };

  const updateUserBadges = (selectedBadgeIds: string[]) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, selectedBadges: selectedBadgeIds.slice(0, 5) } : null);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, selectedBadges: selectedBadgeIds.slice(0, 5) } : u));
  };

  const getLeaderboard = (categoryId: string): LeaderboardEntry[] => {
    const categoryPhotos = photos.filter(p => p.categoryId === categoryId && !p.isArchived);
    
    const entries = categoryPhotos.map(photo => {
      const score = photo.likes - photo.dislikes;
      return {
        userId: photo.userId,
        username: photo.username,
        profilePicture: photo.userProfilePicture,
        photoId: photo.id,
        photoUrl: photo.imageUrl,
        score,
        rank: 0,
        points: 0,
      };
    });

    // Sort by score (highest first)
    entries.sort((a, b) => b.score - a.score);

    // Assign ranks and points
    const pointsMap = [100, 75, 50, 30, 20, 10, 5, 3, 2, 1];
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
      entry.points = pointsMap[index] || 1;
    });

    return entries;
  };

  const getHallOfFame = (type: 'monthly' | 'category' | 'overall', categoryId?: string): HallOfFameEntry[] => {
    let relevantPhotos = photos.filter(p => !p.isArchived);
    
    if (type === 'monthly' || type === 'category') {
      if (categoryId) {
        relevantPhotos = relevantPhotos.filter(p => p.categoryId === categoryId);
      }
    }

    const entries = relevantPhotos.map(photo => {
      const category = categories.find(c => c.id === photo.categoryId);
      return {
        userId: photo.userId,
        username: photo.username,
        profilePicture: photo.userProfilePicture,
        photoId: photo.id,
        photoUrl: photo.imageUrl,
        likes: photo.likes,
        rank: 0,
        categoryName: category?.name || 'Unknown',
        period: 'November 2024',
      };
    });

    // Sort by likes (highest first)
    entries.sort((a, b) => b.likes - a.likes);

    // Assign ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries.slice(0, 20); // Top 20
  };

  const joinPrivateCategory = (shareCode: string): boolean => {
    if (!currentUser) return false;

    const category = categories.find(c => c.shareCode === shareCode && c.type === 'private');
    if (!category) return false;

    // Add user to members list
    setCategories(prev => prev.map(c => 
      c.id === category.id 
        ? { ...c, members: [...(c.members || []), currentUser.id] }
        : c
    ));

    return true;
  };

  const canAccessCategory = (categoryId: string): boolean => {
    if (!currentUser) return false;

    const category = categories.find(c => c.id === categoryId);
    if (!category) return false;

    // Everyone can access non-private categories
    if (category.type !== 'private') return true;

    // For private categories, check if user is member or creator
    return category.createdBy === currentUser.id || 
           (category.members || []).includes(currentUser.id);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        categories,
        photos,
        addPhoto,
        votePhoto,
        createCategory,
        deletePhoto,
        archivePhoto,
        updateUserBadges,
        getLeaderboard,
        getHallOfFame,
        joinPrivateCategory,
        canAccessCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
