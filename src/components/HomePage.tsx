import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Clock, Star, Users, Lock, Archive, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Category } from '../types';
import { toast } from 'sonner';

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCategoryClick }) => {
  const { categories, createCategory, joinPrivateCategory, canAccessCategory, currentUser } = useApp();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState<'user-created' | 'private'>('user-created');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const officialBasicCategories = categories.filter(c => c.type === 'official-basic' && c.isActive);
  const officialWeeklyCategories = categories.filter(c => c.type === 'official-weekly' && c.isActive);
  const archivedWeeklyCategories = categories.filter(c => c.type === 'official-weekly' && c.isArchived);
  const userCreatedCategories = categories.filter(c => c.type === 'user-created' && c.isActive);
  const privateCategories = categories.filter(c => c.type === 'private' && c.isActive && canAccessCategory(c.id));

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      createCategory({
        name: newCategoryName.trim(),
        type: categoryType,
        isActive: true,
        createdBy: currentUser?.id,
      });
      
      // Get the created category (it will be the last one)
      const createdCategory = categories[categories.length - 1];
      if (categoryType === 'private' && createdCategory?.shareCode) {
        setShareCode(createdCategory.shareCode);
      }
      
      setNewCategoryName('');
      setIsDialogOpen(false);
      toast.success('Category created!', {
        description: categoryType === 'private' 
          ? `Share code: ${shareCode || 'Check back in a moment'}` 
          : `${newCategoryName} is now live and ready for uploads.`,
      });
    }
  };

  const handleJoinPrivateCategory = () => {
    if (joinCode.trim()) {
      const success = joinPrivateCategory(joinCode.trim());
      if (success) {
        toast.success('Joined private category!', {
          description: 'You can now view and upload to this category.',
        });
        setJoinCode('');
        setIsJoinDialogOpen(false);
      } else {
        toast.error('Invalid share code', {
          description: 'Please check the code and try again.',
        });
      }
    }
  };

  const getCategoryIcon = (category: Category) => {
    if (category.type === 'official-weekly') return <Clock className="w-5 h-5 text-purple-500" />;
    if (category.type === 'official-basic') return <Star className="w-5 h-5 text-yellow-500" />;
    if (category.type === 'private') return <Lock className="w-5 h-5 text-gray-500" />;
    return <Users className="w-5 h-5 text-blue-500" />;
  };

  const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
    <button
      onClick={() => onCategoryClick(category.id)}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getCategoryIcon(category)}
          <h3 className="text-lg">{category.name}</h3>
        </div>
        {category.type === 'official-weekly' && (
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            Ends {category.weekEnding}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500">
        {category.type === 'official-weekly' && 'Weekly Challenge • Leaderboard Active'}
        {category.type === 'official-basic' && 'Official Category • Permanent'}
        {category.type === 'user-created' && 'Community Category'}
        {category.type === 'private' && 'Private Category'}
      </div>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Explore Categories</h1>
        <p className="text-gray-600">Upload your photos and compete for the top spot!</p>
      </div>

      {/* Weekly Challenges */}
      {officialWeeklyCategories.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-1">🔥 This Week's Challenges</h2>
              <p className="text-sm text-gray-600">Compete for points on the weekly leaderboard</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialWeeklyCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Official Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl mb-1">Official Categories</h2>
            <p className="text-sm text-gray-600">Permanent categories with hall of fame</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {officialBasicCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* User Created Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl mb-1">Community Categories</h2>
            <p className="text-sm text-gray-600">Created by users like you</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>
                  Create a public community category or a private one to share with friends.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    placeholder="e.g., Concert Vibes, Coffee Moments"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant={categoryType === 'user-created' ? 'default' : 'outline'}
                      onClick={() => setCategoryType('user-created')}
                      className="flex-1"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Public
                    </Button>
                    <Button
                      type="button"
                      variant={categoryType === 'private' ? 'default' : 'outline'}
                      onClick={() => setCategoryType('private')}
                      className="flex-1"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Private
                    </Button>
                  </div>
                </div>
                <Button onClick={handleCreateCategory} className="w-full">
                  Create Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {userCreatedCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userCreatedCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No community categories yet</p>
            <p className="text-sm text-gray-500">Be the first to create one!</p>
          </div>
        )}
      </section>

      {/* Private Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl mb-1 flex items-center gap-2">
              <Lock className="w-6 h-6 text-gray-600" />
              Private Categories
            </h2>
            <p className="text-sm text-gray-600">Exclusive categories you have access to</p>
          </div>
          <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Join with Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join Private Category</DialogTitle>
                <DialogDescription>
                  Enter the share code you received to join a private category.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="join-code">Share Code</Label>
                  <Input
                    id="join-code"
                    placeholder="Enter code (e.g., SQUAD2024)"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  />
                </div>
                <Button onClick={handleJoinPrivateCategory} className="w-full">
                  Join Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {privateCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {privateCategories.map(category => (
              <div key={category.id} className="relative">
                <CategoryCard category={category} />
                {category.createdBy === currentUser?.id && category.shareCode && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Share Code:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-white px-2 py-1 rounded border border-gray-300 flex-1">
                        {category.shareCode}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          navigator.clipboard.writeText(category.shareCode!);
                          toast.success('Code copied to clipboard!');
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No private categories yet</p>
            <p className="text-sm text-gray-500">Create one or join with a code!</p>
          </div>
        )}
      </section>

      {/* Archived Weekly Challenges */}
      {archivedWeeklyCategories.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-1 flex items-center gap-2">
                <Archive className="w-6 h-6 text-gray-600" />
                Past Challenges
              </h2>
              <p className="text-sm text-gray-600">Browse top photos from previous weekly challenges</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archivedWeeklyCategories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Archive className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg">{category.name}</h3>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Ended {category.weekEnding}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Archived Challenge • View Top 10
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};