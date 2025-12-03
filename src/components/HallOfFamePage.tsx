import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Star, TrendingUp, Calendar } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const HallOfFamePage: React.FC = () => {
  const { categories, getHallOfFame } = useApp();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [viewType, setViewType] = useState<'monthly' | 'category' | 'overall'>('monthly');

  const officialCategories = categories.filter(c => 
    c.type === 'official-basic' || c.type === 'official-weekly'
  );

  const hallOfFame = viewType === 'overall'
    ? getHallOfFame('overall')
    : viewType === 'monthly'
    ? getHallOfFame('monthly', selectedCategoryId === 'all' ? undefined : selectedCategoryId)
    : getHallOfFame('category', selectedCategoryId);

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const FameCard: React.FC<{ entry: typeof hallOfFame[0]; isTopThree: boolean }> = ({ entry, isTopThree }) => (
    <div
      className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl ${
        entry.rank === 1 ? 'border-yellow-400' :
        entry.rank === 2 ? 'border-gray-400' :
        entry.rank === 3 ? 'border-orange-400' :
        'border-gray-200'
      } ${isTopThree ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <div className="relative">
        <img
          src={entry.photoUrl}
          alt="Hall of fame entry"
          className="w-full h-64 object-cover"
        />
        {getRankMedal(entry.rank) && (
          <div className="absolute top-4 left-4">
            <div className="text-4xl drop-shadow-lg">
              {getRankMedal(entry.rank)}
            </div>
          </div>
        )}
        {!getRankMedal(entry.rank) && (
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl shadow-lg">
              #{entry.rank}
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={entry.profilePicture}
            alt={entry.username}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1">
            <p className="font-medium">{entry.username}</p>
            <p className="text-sm text-gray-600">{entry.categoryName}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{entry.likes} likes</span>
          </div>
          <div className="text-sm text-gray-500">
            {entry.period}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-10 h-10 text-purple-600" />
          <h1 className="text-4xl">Hall of Fame</h1>
        </div>
        <p className="text-gray-600">
          Celebrating the best photos and top performers
        </p>
      </div>

      {/* View Type Tabs */}
      <Tabs value={viewType} onValueChange={(v) => setViewType(v as typeof viewType)} className="mb-6">
        <TabsList>
          <TabsTrigger value="monthly" className="gap-2">
            <Calendar className="w-4 h-4" />
            Monthly Leaders
          </TabsTrigger>
          <TabsTrigger value="category" className="gap-2">
            <Star className="w-4 h-4" />
            Category Champions
          </TabsTrigger>
          <TabsTrigger value="overall" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            All-Time Best
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Category Filter */}
      {viewType !== 'overall' && (
        <div className="mb-8 flex items-center gap-4">
          <label className="text-sm font-medium">Filter by category:</label>
          <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
            <SelectTrigger className="w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {officialCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Description based on view type */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200">
        {viewType === 'monthly' && (
          <div>
            <h2 className="text-xl mb-2">📅 Monthly Hall of Fame</h2>
            <p className="text-gray-600">
              The most liked photos from official categories in the past month. These legends earned their place through community love!
            </p>
          </div>
        )}
        {viewType === 'category' && (
          <div>
            <h2 className="text-xl mb-2">⭐ Category Champions</h2>
            <p className="text-gray-600">
              The all-time best photos in each category. These are the photos that defined excellence!
            </p>
          </div>
        )}
        {viewType === 'overall' && (
          <div>
            <h2 className="text-xl mb-2">🏆 All-Time Legends</h2>
            <p className="text-gray-600">
              The most liked photos across all categories and all time. The absolute best of the best!
            </p>
          </div>
        )}
      </div>

      {/* Top 3 Podium */}
      {hallOfFame.length >= 3 && (
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-center">🏆 Top 3 🏆</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 2nd Place */}
            <div className="md:order-1 md:mt-8">
              <FameCard entry={hallOfFame[1]} isTopThree={true} />
            </div>
            
            {/* 1st Place */}
            <div className="md:order-2">
              <FameCard entry={hallOfFame[0]} isTopThree={true} />
            </div>
            
            {/* 3rd Place */}
            <div className="md:order-3 md:mt-8">
              <FameCard entry={hallOfFame[2]} isTopThree={true} />
            </div>
          </div>
        </div>
      )}

      {/* Rest of the Hall of Fame */}
      {hallOfFame.length > 3 && (
        <div>
          <h2 className="text-2xl mb-6">Honorable Mentions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hallOfFame.slice(3, 20).map((entry) => (
              <FameCard key={entry.photoId} entry={entry} isTopThree={false} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {hallOfFame.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No entries in the Hall of Fame yet</p>
          <p className="text-sm text-gray-500">Start uploading and earning likes to make it here!</p>
        </div>
      )}

      {/* Only 1-2 entries */}
      {hallOfFame.length > 0 && hallOfFame.length < 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hallOfFame.map((entry) => (
            <FameCard key={entry.photoId} entry={entry} isTopThree={true} />
          ))}
        </div>
      )}
    </div>
  );
};
