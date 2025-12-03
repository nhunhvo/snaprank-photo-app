import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { UploadPage } from './components/UploadPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { HallOfFamePage } from './components/HallOfFamePage';
import { ProfilePage } from './components/ProfilePage';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { AuthPage } from './components/AuthPage';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view !== 'category') {
      setSelectedCategoryId(null);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentView('category');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onCategoryClick={handleCategoryClick} />;
      case 'upload':
        return <UploadPage onSuccess={() => handleNavigate('home')} />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'hall-of-fame':
        return <HallOfFamePage />;
      case 'profile':
        return <ProfilePage />;
      case 'category':
        return selectedCategoryId ? (
          <CategoryDetailPage categoryId={selectedCategoryId} onBack={() => handleNavigate('home')} />
        ) : null;
      default:
        return <HomePage onCategoryClick={handleCategoryClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      <main className="pt-16">
        {renderView()}
      </main>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;