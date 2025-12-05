import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { Camera, Upload } from 'lucide-react';

// Authentication page - handles both login and signup
export const AuthPage: React.FC = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission for both login and signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      const success = await login(email, password);
      setIsLoading(false);
      
      if (success) {
        toast.success('Welcome back!');
        setEmail('');
        setPassword('');
      } else {
        toast.error('Invalid email or password');
      }
    } else {
      if (!username || !email || !password) {
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      const success = await signup(username, email, password, profilePicture);
      setIsLoading(false);
      
      if (success) {
        toast.success('Account created!');
        setEmail('');
        setPassword('');
        setUsername('');
        setProfilePicture('');
      } else {
        toast.error('Email already exists');
      }
    }
  };

  // Convert uploaded image to base64 for storage
  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4" />
          <h1 className="text-3xl mb-2">SnapRank</h1>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                />
              </div>

              {/* Profile Picture */}
              <div>
                <Label>Profile Picture (Optional)</Label>
                <div className="mt-2 flex items-center gap-4">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('profile-upload')?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isLogin ? 'Logging in...' : 'Creating account...'}
              </div>
            ) : (
              isLogin ? 'Log In' : 'Sign Up'
            )}
          </Button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail('');
                setPassword('');
                setUsername('');
                setProfilePicture('');
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo Account:</p>
            <p className="text-xs text-gray-500">Email: demo@snaprank.com</p>
            <p className="text-xs text-gray-500">Password: demo123</p>
          </div>
        )}
      </Card>
    </div>
  );
};
