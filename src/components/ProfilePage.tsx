import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Trophy, Award, Archive, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Badge as BadgeType } from '../types';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const { currentUser, photos, deletePhoto, archivePhoto, updateUserBadges } = useApp();
  const [showArchived, setShowArchived] = useState(false);
  const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false);
  const [selectedBadgeIds, setSelectedBadgeIds] = useState<string[]>(
    currentUser?.selectedBadges || []
  );

  if (!currentUser) return null;

  const userPhotos = photos.filter(p => p.userId === currentUser.id);
  const activePhotos = userPhotos.filter(p => !p.isArchived);
  const archivedPhotos = userPhotos.filter(p => p.isArchived);

  const displayedPhotos = showArchived ? archivedPhotos : activePhotos;

  const handleBadgeSelection = (badgeId: string, checked: boolean) => {
    if (checked && selectedBadgeIds.length >= 5) {
      return; // Max 5 badges
    }
    
    setSelectedBadgeIds(prev =>
      checked ? [...prev, badgeId] : prev.filter(id => id !== badgeId)
    );
  };

  const handleSaveBadges = () => {
    updateUserBadges(selectedBadgeIds);
    setIsBadgeDialogOpen(false);
    toast.success('Badges updated!', {
      description: 'Your profile now displays your selected badges.',
    });
  };

  const getBadgeDisplay = (badge: BadgeType) => {
    const icon = badge.type === 'leaderboard' ? '🏆' : '⭐';
    const bgColor = badge.rank === 1
      ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
      : badge.rank === 2
      ? 'bg-gray-200 text-gray-700 border-gray-400'
      : badge.rank === 3
      ? 'bg-orange-100 text-orange-700 border-orange-300'
      : 'bg-purple-100 text-purple-700 border-purple-300';

    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 text-sm ${bgColor}`}>
        <span>{icon}</span>
        <span>#{badge.rank} {badge.categoryName}</span>
      </div>
    );
  };

  const PhotoCard: React.FC<{ photo: typeof userPhotos[0] }> = ({ photo }) => {
    const score = photo.likes - photo.dislikes;

    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all">
        <img
          src={photo.imageUrl}
          alt="Upload"
          className="w-full h-64 object-cover"
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          {!photo.isArchived && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  archivePhoto(photo.id);
                  toast.success('Photo archived');
                }}
                className="gap-1"
              >
                <Archive className="w-4 h-4" />
                Archive
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this photo?')) {
                    deletePhoto(photo.id);
                    toast.success('Photo deleted');
                  }
                }}
                className="gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </>
          )}
          {photo.isArchived && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                deletePhoto(photo.id);
                toast.success('Photo permanently deleted');
              }}
              className="gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete Permanently
            </Button>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(photo.uploadedAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="text-green-600">{photo.likes} likes</span>
                {' • '}
                <span className="text-red-600">{photo.dislikes} dislikes</span>
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              score > 0 ? 'bg-green-100 text-green-700' :
              score < 0 ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {score > 0 ? '+' : ''}{score}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture with Leader Halo */}
          <div className="relative">
            <img
              src={currentUser.profilePicture}
              alt={currentUser.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            {currentUser.isCurrentLeader && (
              <div className="absolute -top-4 -right-4 w-20 h-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FCD34D"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#FCD34D"
                    strokeWidth="2"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs"
                    fill="#92400E"
                  >
                    Leader
                  </text>
                </svg>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-3xl mb-2">{currentUser.username}</h1>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <span>{activePhotos.length} uploads</span>
              <span>•</span>
              <span>{currentUser.badges.length} achievements</span>
            </div>

            {/* Selected Badges Display */}
            {currentUser.selectedBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {currentUser.selectedBadges.map(badgeId => {
                  const badge = currentUser.badges.find(b => b.id === badgeId);
                  return badge ? (
                    <div key={badge.id}>{getBadgeDisplay(badge)}</div>
                  ) : null;
                })}
              </div>
            )}

            <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Manage Badges
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Manage Your Badges</DialogTitle>
                  <DialogDescription>
                    Select up to 5 badges to display on your profile. Your achievements speak for themselves!
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Selected: {selectedBadgeIds.length}/5
                  </p>
                  
                  {currentUser.badges.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {currentUser.badges.map(badge => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          <Checkbox
                            checked={selectedBadgeIds.includes(badge.id)}
                            onCheckedChange={(checked) => 
                              handleBadgeSelection(badge.id, checked as boolean)
                            }
                            disabled={
                              !selectedBadgeIds.includes(badge.id) && 
                              selectedBadgeIds.length >= 5
                            }
                          />
                          <div className="flex-1">
                            {getBadgeDisplay(badge)}
                            <p className="text-sm text-gray-500 mt-1">{badge.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p>No badges earned yet</p>
                      <p className="text-sm mt-1">Compete in challenges to earn badges!</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedBadgeIds(currentUser.selectedBadges);
                        setIsBadgeDialogOpen(false);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveBadges} className="flex-1">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl">{currentUser.badges.filter(b => b.type === 'leaderboard').length}</p>
              <p className="text-sm text-gray-600">Leaderboard Wins</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl">{currentUser.badges.filter(b => b.type === 'hall-of-fame').length}</p>
              <p className="text-sm text-gray-600">Hall of Fame</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl">📸</span>
            </div>
            <div>
              <p className="text-2xl">
                {userPhotos.reduce((sum, p) => sum + p.likes, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Likes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">My Uploads</h2>
          <Button
            variant="outline"
            onClick={() => setShowArchived(!showArchived)}
            className="gap-2"
          >
            {showArchived ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showArchived ? 'Show Active' : 'Show Archived'}
          </Button>
        </div>

        {displayedPhotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="mb-2">
              {showArchived ? 'No archived photos' : 'No photos uploaded yet'}
            </p>
            <p className="text-sm">
              {showArchived ? 'Archive photos to see them here' : 'Start uploading to build your collection!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};