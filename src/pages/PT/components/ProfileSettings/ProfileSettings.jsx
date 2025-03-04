// ProfileSettings.jsx
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ProfileSettings.module.css';
import { FiUser, FiMail, FiPhone, FiMapPin, FiFileText, FiCamera, FiSave, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { getProfile, updateProfile } from '../../../../mockData/profile';
import SocialLinks from './SocialLinks';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    expertise: [],
    certifications: [],
    profileImage: null,
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: ''
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newExpertise, setNewExpertise] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // Fetch profile data from mock API
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await getProfile();
        setProfile(profileData);
        if (profileData.profileImage) {
          setImagePreview(profileData.profileImage);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load profile data. Please try again later.');
        console.error('Error fetching profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (e.g., socialLinks.instagram)
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Handle top-level fields
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSocialLinksChange = (updatedSocialLinks) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: updatedSocialLinks
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setProfile(prev => ({
          ...prev,
          profileImage: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const addExpertise = () => {
    if (newExpertise.trim()) {
      setProfile(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (index) => {
    setProfile(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);
      
      // Use the mock API to update the profile
      await updateProfile(profile);
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again later.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  return (
    <div className={styles.profileSettings}>
      <h1>Profile Settings</h1>
      
      {error && (
        <div className={styles.errorMessage}>
          <FiAlertCircle className={styles.messageIcon} />
          {error}
        </div>
      )}
      
      {success && (
        <div className={styles.successMessage}>
          <FiCheckCircle className={styles.messageIcon} />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <div className={styles.formGrid}>
          <div className={styles.imageSection}>
            <div className={styles.profileImageContainer}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className={styles.profileImage} />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  <FiUser size={48} />
                </div>
              )}
              <button 
                type="button" 
                className={styles.changeImageButton}
                onClick={triggerFileInput}
              >
                <FiCamera />
                <span>Change Photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className={styles.hiddenFileInput}
              />
            </div>
            
            <div className={styles.saveButtonContainer}>
              <button 
                type="submit" 
                className={clsx(styles.saveButton, { [styles.saving]: isSaving })}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
                {!isSaving && <FiSave className={styles.saveIcon} />}
              </button>
            </div>
          </div>
          
          <div className={styles.personalInfoSection}>
            <h2>Personal Information</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                <FiUser className={styles.formIcon} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                <FiMail className={styles.formIcon} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your email address"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                <FiPhone className={styles.formIcon} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your phone number"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.formLabel}>
                <FiMapPin className={styles.formIcon} />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="City, Country"
              />
            </div>
          </div>
          
          <div className={styles.professionalSection}>
            <h2>Professional Information</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="bio" className={styles.formLabel}>
                <FiFileText className={styles.formIcon} />
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Write a short bio about yourself, your experience, and your teaching style"
                rows="4"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Areas of Expertise</label>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  className={styles.tagInputField}
                  placeholder="e.g. Weight Training, Yoga, Nutrition"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                />
                <button 
                  type="button" 
                  className={styles.tagAddButton}
                  onClick={addExpertise}
                >
                  Add
                </button>
              </div>
              <div className={styles.tagList}>
                {profile.expertise.map((item, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{item}</span>
                    <button 
                      type="button" 
                      className={styles.tagRemoveButton}
                      onClick={() => removeExpertise(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Certifications</label>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  className={styles.tagInputField}
                  placeholder="e.g. ACE Certified Personal Trainer"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                />
                <button 
                  type="button" 
                  className={styles.tagAddButton}
                  onClick={addCertification}
                >
                  Add
                </button>
              </div>
              <div className={styles.tagList}>
                {profile.certifications.map((item, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{item}</span>
                    <button 
                      type="button" 
                      className={styles.tagRemoveButton}
                      onClick={() => removeCertification(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <SocialLinks 
            socialLinks={profile.socialLinks} 
            onChange={handleSocialLinksChange} 
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;