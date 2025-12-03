import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, profilePicture?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Initialize demo users and load current user
  useEffect(() => {
    // Initialize demo users if they don't exist
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

  const signup = async (username: string, email: string, password: string, profilePicture?: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if email already exists
      if (users.find((u: any) => u.email === email)) {
        return false; // Email already exists
      }

      // Create new user
      const newUser: AuthUser & { password: string } = {
        id: `user_${Date.now()}`,
        username,
        email,
        password, // In real app, this would be hashed
        profilePicture: profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Find user with matching email and password
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        return false; // Invalid credentials
      }

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
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
