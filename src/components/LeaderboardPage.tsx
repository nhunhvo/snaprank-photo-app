import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Clock, TrendingUp, Medal } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';

export const LeaderboardPage: React.FC = () => {
  const { categories, getLeaderboard } = useApp();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [updateIndicator, setUpdateIndicator] = useState(false);

  const weeklyCategories = categories.filter(c => c.type === 'official-weekly' && c.isActive);

  useEffect(() => {
    if (weeklyCategories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(weeklyCategories[0].id);
    }
  }, [weeklyCategories, selectedCategoryId]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateIndicator(true);
      setTimeout(() => setUpdateIndicator(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const leaderboard = selectedCategoryId ? getLeaderboard(selectedCategoryId) : [];
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500';
    if (rank === 2) return 'bg-gray-400';
    if (rank === 3) return 'bg-orange-600';
    return 'bg-purple-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-10 h-10 text-yellow-500" />
          <h1 className="text-4xl">Weekly Leaderboard</h1>
          {updateIndicator && (
            <span className="text-sm bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">
              UPDATED
            </span>
          )}
        </div>
        <p className="text-gray-600">
          Compete in weekly challenges and earn points. Top performers get featured!
        </p>
      </div>

      {/* Category Tabs */}
      {weeklyCategories.length > 0 ? (
        <Tabs value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <TabsList className="mb-6">
            {weeklyCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {weeklyCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              {/* Category Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl mb-1">{category.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Ends {category.weekEnding}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Updates in real-time
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Prize Pool</p>
                    <p className="text-2xl">🏆 Points</p>
                  </div>
                </div>
              </div>

              {/* Points System */}
              <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-purple-600" />
                  Points System
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { rank: '1st', points: 100, color: 'bg-yellow-100 text-yellow-700' },
                    { rank: '2nd', points: 75, color: 'bg-gray-100 text-gray-700' },
                    { rank: '3rd', points: 50, color: 'bg-orange-100 text-orange-700' },
                    { rank: '4th', points: 30, color: 'bg-purple-100 text-purple-700' },
                    { rank: '5th', points: 20, color: 'bg-purple-100 text-purple-700' },
                  ].map(({ rank, points, color }) => (
                    <div key={rank} className={`${color} rounded-lg p-3 text-center`}>
                      <p className="text-xs mb-1">{rank} Place</p>
                      <p className="text-xl">{points}pts</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xl flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-purple-600" />
                    Current Rankings
                  </h3>
                </div>

                {leaderboard.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.photoId}
                        className={`p-6 hover:bg-gray-50 transition-colors ${
                          entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-white' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank */}
                          <div className={`w-14 h-14 rounded-full ${getRankColor(entry.rank)} flex items-center justify-center text-white flex-shrink-0`}>
                            <span className="text-xl">{getRankIcon(entry.rank)}</span>
                          </div>

                          {/* Photo */}
                          <img
                            src={entry.photoUrl}
                            alt="Entry"
                            className="w-20 h-20 object-cover rounded-lg"
                          />

                          {/* User Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <img
                                src={entry.profilePicture}
                                alt={entry.username}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <p className="font-medium">{entry.username}</p>
                              {entry.rank === 1 && (
                                <span className="text-yellow-500">👑</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              Score: {entry.score} • {entry.points} points
                            </p>
                          </div>

                          {/* Points Badge */}
                          <div className={`px-4 py-2 rounded-full ${
                            entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                            entry.rank === 2 ? 'bg-gray-200 text-gray-700' :
                            entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            <p className="text-sm">{entry.points} pts</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No entries yet. Be the first!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No active weekly challenges</p>
          <p className="text-sm text-gray-500">Check back soon for new challenges!</p>
        </div>
      )}
    </div>
  );
};
