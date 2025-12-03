import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, Camera, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

interface UploadPageProps {
  onSuccess: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onSuccess }) => {
  const { categories, currentUser, addPhoto, canAccessCategory } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'camera' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const activeCategories = categories.filter(c => c.isActive && canAccessCategory(c.id));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Trigger the camera input
    cameraInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedCategory || !imageUrl || !currentUser) return;

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    addPhoto({
      userId: currentUser.id,
      username: currentUser.username,
      userProfilePicture: currentUser.profilePicture,
      categoryId: selectedCategory,
      imageUrl: imageUrl,
    });

    setIsUploading(false);
    toast.success('Photo uploaded successfully!', {
      description: 'Your photo is now live and ready to receive votes.',
    });
    onSuccess();
  };

  const getCategoryDisplayName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return '';
    
    let badge = '';
    if (category.type === 'official-weekly') badge = '🔥 ';
    if (category.type === 'official-basic') badge = '⭐ ';
    
    return `${badge}${category.name}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Upload Photo</h1>
        <p className="text-gray-600">Share your moment and compete for the top spot</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Upload Method Selection */}
        {!imageUrl && (
          <div className="space-y-6">
            <div>
              <Label className="text-base mb-3 block">Choose Upload Method</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setUploadMethod('file');
                    fileInputRef.current?.click();
                  }}
                  className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <p>Upload from Camera Roll</p>
                    <p className="text-sm text-gray-500 mt-1">Choose from your photos</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setUploadMethod('camera');
                    handleCameraCapture();
                  }}
                  className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <p>Take Photo</p>
                    <p className="text-sm text-gray-500 mt-1">Use your camera</p>
                  </div>
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Image Preview and Category Selection */}
        {imageUrl && (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-96 object-cover rounded-xl"
              />
              <button
                onClick={() => {
                  setImageUrl('');
                  setUploadMethod(null);
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <Label htmlFor="category" className="text-base mb-3 block">Select Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  {activeCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {getCategoryDisplayName(category.id)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCategory && (
                <p className="text-sm text-gray-500 mt-2">
                  {categories.find(c => c.id === selectedCategory)?.type === 'official-weekly'
                    ? 'This is a weekly challenge - compete for leaderboard points!'
                    : 'Your photo will be added to this category'}
                </p>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedCategory || isUploading}
              className="w-full gap-2"
              size="lg"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Upload Photo
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};