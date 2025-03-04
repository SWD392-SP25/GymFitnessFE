// src/mockData/profile.js
const PROFILE_STORAGE_KEY = 'gymfitness_pt_profile';

// Default profile data
const defaultProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@gymfitness.com',
  phone: '(555) 123-4567',
  location: 'New York, NY',
  bio: 'Certified Personal Trainer with over 8 years of experience specializing in strength training, HIIT, and mobility. My approach focuses on sustainable fitness practices that enhance your overall quality of life. I believe in the power of progressive overload and proper form to achieve lasting results.',
  expertise: [
    'Strength Training',
    'HIIT',
    'Mobility & Recovery',
    'Nutrition',
    'Functional Fitness'
  ],
  certifications: [
    'NASM Certified Personal Trainer',
    'ACE Fitness Nutrition Specialist',
    'TRX Suspension Training',
    'Functional Movement Systems (FMS) Level 2'
  ],
  profileImage: 'https://via.placeholder.com/200x200?text=PT+Profile',
  socialLinks: {
    instagram: 'alexfitpro',
    facebook: 'alexjohnsonfitness',
    twitter: 'alexjfit',
    youtube: 'channel/alexjohnsonfitness'
  }
};

// Initialize storage with default data if not already present
const initializeStorage = () => {
  if (!localStorage.getItem(PROFILE_STORAGE_KEY)) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfile));
  }
};

// Initialize storage
initializeStorage();

// Helper functions
const getProfileFromStorage = () => {
  return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY)) || defaultProfile;
};

const saveProfileToStorage = (profile) => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

// Mock API functions
export const getProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const profile = getProfileFromStorage();
      resolve(profile);
    }, 800);
  });
};

export const updateProfile = (profileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentProfile = getProfileFromStorage();
      
      // If profileData contains a File object for profileImage, 
      // we would normally upload it and get a URL. 
      // For mock purposes, we'll just keep the existing URL or use a placeholder.
      let profileImage = currentProfile.profileImage;
      if (profileData.profileImage && typeof profileData.profileImage !== 'string') {
        // In a real implementation, we would upload the file and get the URL
        // For now, we'll just use a placeholder
        profileImage = 'https://via.placeholder.com/200x200?text=Updated+Profile';
      } else if (profileData.profileImage) {
        profileImage = profileData.profileImage;
      }
      
      // Update the profile
      const updatedProfile = {
        ...currentProfile,
        ...profileData,
        profileImage,
        // Handle nested objects like socialLinks separately
        socialLinks: {
          ...currentProfile.socialLinks,
          ...(profileData.socialLinks || {})
        }
      };
      
      saveProfileToStorage(updatedProfile);
      resolve(updatedProfile);
    }, 800);
  });
};