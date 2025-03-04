// CreateCourseForm.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CourseManagement.module.css';
import { FiUpload, FiDollarSign, FiX, FiSave, FiArrowLeft } from 'react-icons/fi';
import { createCourse } from '../../../mockData/courses';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnailUrl: null
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
        setFormData({
          ...formData,
          thumbnailUrl: e.target.result // In a real app, this would be uploaded to a server
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      setError('Course title is required');
      return;
    }
    
    if (!formData.price) {
      setError('Course price is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await createCourse(formData);
      
      // Redirect back to courses list
      navigate('/pt/courses');
    } catch (err) {
      setError('Failed to create course. Please try again.');
      console.error('Error creating course:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/pt/courses');
  };

  return (
    <div className={styles.createCourseContainer}>
      <div className={styles.formHeader}>
        <button 
          className={styles.backButton} 
          onClick={handleCancel}
        >
          <FiArrowLeft /> Back to Courses
        </button>
        <h1>Create New Course</h1>
      </div>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button 
            className={styles.closeError} 
            onClick={() => setError(null)}
          >
            <FiX />
          </button>
        </div>
      )}
      
      <form className={styles.courseForm} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.thumbnailSection}>
            <div className={styles.thumbnailContainer}>
              {thumbnailPreview ? (
                <img 
                  src={thumbnailPreview} 
                  alt="Course thumbnail preview" 
                  className={styles.thumbnailPreview} 
                />
              ) : (
                <div className={styles.thumbnailPlaceholder}>
                  <FiUpload size={32} />
                  <span>Upload Thumbnail</span>
                </div>
              )}
              <button 
                type="button" 
                className={styles.uploadButton}
                onClick={triggerFileInput}
              >
                Choose Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleThumbnailChange}
                accept="image/*"
                className={styles.hiddenFileInput}
              />
            </div>
          </div>
          
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Enter course title"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Describe your course"
                rows="5"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.formLabel}>
                Price (USD) *
              </label>
              <div className={styles.priceInputContainer}>
                <FiDollarSign className={styles.priceIcon} />
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={styles.priceInput}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Course'}
            {!isSubmitting && <FiSave className={styles.saveIcon} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;