// CourseManagement.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CourseManagement.module.css';
import { FiPlus, FiVideo } from 'react-icons/fi';
import { getCourses, deleteCourse } from '../../../../mockData/courses';
import CourseCard from './CourseCard';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from mock data
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await getCourses();
        setCourses(coursesData);
        setError(null);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = () => {
    navigate('/pt/courses/create');
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await deleteCourse(courseId);
        // Update the UI by removing the deleted course
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (err) {
        setError('Failed to delete course. Please try again later.');
        console.error('Error deleting course:', err);
      }
    }
  };

  return (
    <div className={styles.courseManagement}>
      <div className={styles.header}>
        <h1>Course Management</h1>
        <button 
          className={styles.createButton} 
          onClick={handleCreateCourse}
        >
          <FiPlus /> Create New Course
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading courses...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : courses.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FiVideo size={48} />
          </div>
          <h2>No Courses Yet</h2>
          <p>Start creating your first fitness course to share your expertise.</p>
          <button 
            className={styles.createButton} 
            onClick={handleCreateCourse}
          >
            <FiPlus /> Create Your First Course
          </button>
        </div>
      ) : (
        <div className={styles.coursesGrid}>
          {courses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              onDelete={handleDeleteCourse} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseManagement;