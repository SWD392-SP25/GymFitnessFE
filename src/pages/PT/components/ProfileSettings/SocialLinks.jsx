// SocialLinks.jsx
import styles from './ProfileSettings.module.css';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

const SocialLinks = ({ socialLinks, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // The input names are in format "socialLinks.platform"
    // Extract the platform part after the dot
    const platform = name.split('.')[1];
    
    onChange({
      ...socialLinks,
      [platform]: value
    });
  };
  
  return (
    <div className={styles.socialSection}>
      <h2>Social Media</h2>
      
      <div className={styles.socialLinks}>
        <div className={styles.formGroup}>
          <label htmlFor="instagram" className={styles.formLabel}>
            <FiInstagram className={styles.socialIcon} /> Instagram
          </label>
          <div className={styles.socialInputGroup}>
            <span className={styles.socialInputPrefix}>instagram.com/</span>
            <input
              type="text"
              id="instagram"
              name="socialLinks.instagram"
              value={socialLinks.instagram}
              onChange={handleChange}
              className={styles.socialInput}
              placeholder="username"
            />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="facebook" className={styles.formLabel}>
            <FiFacebook className={styles.socialIcon} /> Facebook
          </label>
          <div className={styles.socialInputGroup}>
            <span className={styles.socialInputPrefix}>facebook.com/</span>
            <input
              type="text"
              id="facebook"
              name="socialLinks.facebook"
              value={socialLinks.facebook}
              onChange={handleChange}
              className={styles.socialInput}
              placeholder="username"
            />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="twitter" className={styles.formLabel}>
            <FiTwitter className={styles.socialIcon} /> Twitter
          </label>
          <div className={styles.socialInputGroup}>
            <span className={styles.socialInputPrefix}>twitter.com/</span>
            <input
              type="text"
              id="twitter"
              name="socialLinks.twitter"
              value={socialLinks.twitter}
              onChange={handleChange}
              className={styles.socialInput}
              placeholder="username"
            />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="youtube" className={styles.formLabel}>
            <FiYoutube className={styles.socialIcon} /> YouTube
          </label>
          <div className={styles.socialInputGroup}>
            <span className={styles.socialInputPrefix}>youtube.com/</span>
            <input
              type="text"
              id="youtube"
              name="socialLinks.youtube"
              value={socialLinks.youtube}
              onChange={handleChange}
              className={styles.socialInput}
              placeholder="channel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;