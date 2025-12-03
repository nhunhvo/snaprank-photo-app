import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, TrendingUp, Clock, Trophy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { SortOption } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CategoryDetailPageProps {
  categoryId: string;
  onBack: () => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ categoryId, onBack }) => {
  const { categories, photos, currentUser, votePhoto, getLeaderboard } = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('leaderboard');

  const category = categories.find(c => c.id === categoryId);
  const categoryPhotos = photos.filter(p => p.categoryId === categoryId && !p.isArchived);

  // For archived weekly categories, limit to top 10
  const isArchivedWeekly = category?.type === 'official-weekly' && category.isArchived;
  
  const sortedPhotos = useMemo(() => {
    const photosCopy = [...categoryPhotos];

    switch (sortBy) {
      case 'recent':
        return photosCopy.sort((a, b) => b.uploadedAt - a.uploadedAt);
      
      case 'trending':
        // Trending: photos gaining likes fastest (likes per hour since upload)
        return photosCopy.sort((a, b) => {
          const aRate = a.likes / Math.max(1, (Date.now() - a.uploadedAt) / 3600000);
          const bRate = b.likes / Math.max(1, (Date.now() - b.uploadedAt) / 3600000);
          return bRate - aRate;
        });
      
      case 'leaderboard':
        // Sort by score (likes - dislikes)
        return photosCopy.sort((a, b) => {
          const aScore = a.likes - a.dislikes;
          const bScore = b.likes - b.dislikes;
          return bScore - aScore;
        });
      
      default:
        return photosCopy;
    }
  }, [categoryPhotos, sortBy]);

  // Limit to top 10 for archived categories
  const displayPhotos = isArchivedWeekly ? sortedPhotos.slice(0, 10) : sortedPhotos;

  const leaderboard = getLeaderboard(categoryId);

  const handleVote = (photoId: string, vote: 'like' | 'dislike') => {
    votePhoto(photoId, vote);
  };

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Category not found</p>
      </div>
    );
  }

  const PhotoCard: React.FC<{ photo: typeof categoryPhotos[0]; rank?: number }> = ({ photo, rank }) => {
    const userVote = currentUser ? photo.votedBy[currentUser.id] : undefined;
    const score = photo.likes - photo.dislikes;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={photo.imageUrl}
            alt="User upload"
            className="w-full h-64 object-cover"
          />
          {rank && rank <= 3 && (
            <div className="absolute top-4 left-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                rank === 1 ? 'bg-yellow-500' :
                rank === 2 ? 'bg-gray-400' :
                'bg-orange-600'
              }`}>
                <span className="text-xl">#{rank}</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={photo.userProfilePicture}
              alt={photo.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{photo.username}</p>
              <p className="text-sm text-gray-500">
                {new Date(photo.uploadedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={userVote === 'like' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleVote(photo.id, 'like')}
                className="gap-1"
              >
                <ThumbsUp className="w-4 h-4" />
                {photo.likes}
              </Button>
              <Button
                variant={userVote === 'dislike' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleVote(photo.id, 'dislike')}
                className="gap-1"
              >
                <ThumbsDown className="w-4 h-4" />
                {photo.dislikes}
              </Button>
            </div>
            <div className="text-sm">
              <span className={`px-3 py-1 rounded-full ${
                score > 0 ? 'bg-green-100 text-green-700' :
                score < 0 ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                Score: {score > 0 ? '+' : ''}{score}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl mb-2">{category.name}</h1>
            <p className="text-gray-600">
              {category.type === 'official-weekly' && !category.isArchived && `Weekly Challenge • Ends ${category.weekEnding}`}
              {category.type === 'official-weekly' && category.isArchived && `Archived Challenge • Ended ${category.weekEnding} • Top 10 Photos`}
              {category.type === 'official-basic' && 'Official Category'}
              {category.type === 'user-created' && 'Community Category'}
              {category.type === 'private' && '🔒 Private Category'}
            </p>
          </div>
          
          {!isArchivedWeekly && (
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leaderboard">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Leaderboard
                    </div>
                  </SelectItem>
                  <SelectItem value="trending">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </div>
                  </SelectItem>
                  <SelectItem value="recent">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Recent
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Live Leaderboard Sidebar */}
      {category.type === 'official-weekly' && !category.isArchived && leaderboard.length > 0 && (
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl">Live Leaderboard</h2>
            <span className="ml-auto text-sm bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">
              LIVE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <div
                key={entry.photoId}
                className={`bg-white rounded-xl p-4 border-2 ${
                  index === 0 ? 'border-yellow-400' :
                  index === 1 ? 'border-gray-400' :
                  'border-orange-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    'bg-orange-600'
                  }`}>
                    #{entry.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{entry.username}</p>
                    <p className="text-sm text-gray-500">{entry.points} points</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Score: {entry.score}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photos Grid */}
      {isArchivedWeekly && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            🏆 This challenge has ended. Showing the top 10 performing photos from this week's competition.
          </p>
        </div>
      )}
      
      {displayPhotos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              rank={sortBy === 'leaderboard' ? index + 1 : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">No photos in this category yet</p>
          <p className="text-sm text-gray-500">Be the first to upload!</p>
        </div>
      )}
    </div>
  );
};
