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

// Main app content - handles navigation and view rendering
function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Show login page if user is not authenticated
  if (!isAuthenticated) return <AuthPage />;

  // Render the appropriate page based on current view
  const renderView = () => {
    if (currentView === 'home') return <HomePage onCategoryClick={(id) => { setSelectedCategoryId(id); setCurrentView('category'); }} />;
    if (currentView === 'upload') return <UploadPage onSuccess={() => setCurrentView('home')} />;
    if (currentView === 'leaderboard') return <LeaderboardPage />;
    if (currentView === 'hall-of-fame') return <HallOfFamePage />;
    if (currentView === 'profile') return <ProfilePage />;
    if (currentView === 'category' && selectedCategoryId) return <CategoryDetailPage categoryId={selectedCategoryId} onBack={() => setCurrentView('home')} />;
    return <HomePage onCategoryClick={(id) => { setSelectedCategoryId(id); setCurrentView('category'); }} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="pt-16">
        {renderView()}
      </main>
      <Toaster />
    </div>
  );
}

// Root component - wraps app with Auth and App context providers
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