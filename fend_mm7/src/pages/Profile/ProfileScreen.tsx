import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Camera, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut, getCurrentUser, fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';
import { uploadData, getUrl } from 'aws-amplify/storage';
import Toast from '../../components/Toast';

interface UserData {
  name?: string;
  email: string;
  picture?: string;
}

interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
}

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({ email: '' });
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success'
  });
  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
    
    // Check if user just logged in (using URL search params)
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('login') === 'success') {
      setToast({
        visible: true,
        message: 'Successfully logged in',
        type: 'success'
      });
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      // Get current authenticated user
      const currentUser = await getCurrentUser();
      
      // Get user attributes (name, email, etc)
      const attributes = await fetchUserAttributes();
      
      // Set user data
      setUserData({
        name: attributes.name || currentUser.username,
        email: attributes.email || '',
        picture: attributes.picture
      });
      
      // If user has a profile picture, fetch the URL
      if (attributes.picture) {
        try {
          console.log('Fetching image with key:', attributes.picture);
          const result = await getUrl({
            key: attributes.picture,
            options: {
              accessLevel: 'guest'
            }
          });
          console.log('Profile image URL:', result.url.toString());
          setProfileImageUrl(result.url.toString());
        } catch (err) {
          console.error('Error getting profile image URL:', err);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Redirect to auth if not authenticated
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setLoading(true);
      
      // Generate a unique filename - use public/ prefix for public access level
      const filename = `public/uploads/profile-${Date.now()}-${file.name}`;
      
      // Create a temporary URL for immediate display
      const tempUrl = URL.createObjectURL(file);
      setProfileImageUrl(tempUrl);
      setImageError(false);
      
      // Upload file to S3
      const uploadResult = await uploadData({
        key: filename,
        data: file,
        options: {
          accessLevel: 'guest',
          contentType: file.type
        }
      });
      console.log('Upload result:', uploadResult);
      
      // Get the URL of the uploaded image
      const result = await getUrl({
        key: filename,
        options: {
          accessLevel: 'guest'
        }
      });
      
      console.log('Image URL:', result.url.toString());
      
      // Update Cognito user attributes with the S3 key
      await updateUserAttributes({
        userAttributes: {
          picture: filename
        }
      });
      
      // Update local user data state
      setUserData(prevData => ({
        ...prevData,
        picture: filename
      }));
      
      setToast({
        visible: true,
        message: 'Profile picture updated successfully',
        type: 'success'
      });
      
      console.log('Successfully uploaded image and updated profile:', filename);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setToast({
        visible: true,
        message: 'Failed to update profile picture',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut();
      setToast({
        visible: true,
        message: 'Successfully logged out',
        type: 'success'
      });
      // Navigate after a short delay to allow the toast to be seen
      setTimeout(() => {
        navigate('/auth');
      }, 1000);
    } catch (error) {
      console.error('Error signing out:', error);
      setToast({
        visible: true,
        message: 'Error signing out',
        type: 'error'
      });
    } finally {
      setLoggingOut(false);
    }
  };
  
  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {toast.visible && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 h-24 w-full"></div>
        
        <div className="px-8 py-8 relative">
          {/* Profile Image with Upload */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg relative group">
              {!imageError && profileImageUrl ? (
                <img 
                  src={profileImageUrl} 
                  alt={userData.name || 'User'} 
                  className="h-full w-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <User size={48} className="text-gray-400" />
                </div>
              )}
              
              {/* Upload overlay button */}
              <button 
                onClick={triggerFileInput}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Upload profile picture"
              >
                <Camera size={24} className="text-white" />
              </button>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              aria-label="Upload profile image"
            />
          </div>
          
          {/* User Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name || 'User'}
            </h2>
            <p className="text-gray-500 mt-1">{userData.email}</p>
          </div>
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {loggingOut ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging Out...</span>
              </>
            ) : (
              <>
                <LogOut size={18} />
                <span>Log Out</span>
              </>
            )}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;