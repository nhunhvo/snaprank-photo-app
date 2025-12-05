import React, { createContext, useContext, useState, useEffect } from 'react';

// User data structure for authenticated users
interface AuthUser {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
}

// Context methods for authentication
interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, profilePicture?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to access auth context in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Provider component that manages authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Initialize demo users and load current user from localStorage on mount
  useEffect(() => {
    // Create demo accounts if this is first time running app
    const usersData = localStorage.getItem('users');
    if (!usersData) {
      const demoUsers = [
        {
          id: 'demo1',
          username: 'demo_user',
          email: 'demo@snaprank.com',
          password: 'demo123',
          profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        },
        {
          id: 'alex1',
          username: 'alex_photo',
          email: 'alex@example.com',
          password: 'alex123',
          profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        },
        {
          id: 'sarah1',
          username: 'sarah_snaps',
          email: 'sarah@example.com',
          password: 'sarah123',
          profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        },
      ];
      localStorage.setItem('users', JSON.stringify(demoUsers));
    }

    // Load current user from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Create new user account
  const signup = async (username: string, email: string, password: string, profilePicture?: string): Promise<boolean> => {
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    if (users.find((u: any) => u.email === email)) return false;

    const newUser = {
      id: `user_${Date.now()}`,
      username,
      email,
      password,
      profilePicture: profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    if (!foundUser) return false;

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
