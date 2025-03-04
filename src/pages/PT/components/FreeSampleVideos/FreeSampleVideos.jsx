// FreeSampleVideos.jsx
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './FreeSampleVideos.module.css';
import { FiLock, FiUnlock, FiInfo, FiSearch } from 'react-icons/fi';
import { getCoursesWithVideos, setFreeVideo } from '../../../../mockData/courses';
import VideoSelector from './VideoSelector';

const FreeSampleVideos = () => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch courses with their videos from mock data
    const fetchCoursesWithVideos = async () => {
      try {
        setIsLoading(true);
        const coursesWithVideos = await getCoursesWithVideos();
        setCourses(coursesWithVideos);
        setError(null);
      } catch (err) {
        setError('Failed to load courses and videos. Please try again later.');
        console.error('Error fetching courses with videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesWithVideos();
  }, []);

  const toggleCourseExpansion = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const handleSetFreeVideo = async (courseId, videoId) => {
    try {
      const updatedVideos = await setFreeVideo(courseId, videoId);
      
      // Update the local state to reflect the change
      setCourses(courses.map(course => {
        if (course._id === courseId) {
          return {
            ...course,
            videos: updatedVideos
          };
        }
        return course;
      }));

      // Show success message
      setSuccessMessage('Free sample video updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update free sample video. Please try again.');
      console.error('Error setting free video:', err);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.freeSampleVideos}>
      <div className={styles.header}>
        <h1>Free Sample Videos</h1>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.infoBanner}>
        <FiInfo className={styles.infoIcon} />
        <p>Select <strong>one video per course</strong> to be available as a free sample for non-buyers.</p>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Loading courses and videos...</div>
      ) : filteredCourses.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No courses found</h3>
          <p>You haven't created any courses yet or no courses match your search.</p>
        </div>
      ) : (
        <div className={styles.coursesList}>
          {filteredCourses.map(course => (
            <div key={course._id} className={styles.courseItem}>
              <div 
                className={styles.courseHeader} 
                onClick={() => toggleCourseExpansion(course._id)}
              >
                <div className={styles.courseTitle}>
                  <h3>{course.title}</h3>
                  <span className={styles.videoCount}>
                    {course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}
                  </span>
                </div>
                <div className={styles.freeStatus}>
                  {course.videos.some(video => video.isFree) ? (
                    <span className={styles.hasFree}>
                      <FiUnlock /> Has free sample
                    </span>
                  ) : (
                    <span className={styles.noFree}>
                      <FiLock /> No free sample
                    </span>
                  )}
                </div>
              </div>

              {expandedCourse === course._id && (
                <VideoSelector 
                  videos={course.videos} 
                  courseId={course._id} 
                  onSelectFreeVideo={handleSetFreeVideo} 
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreeSampleVideos;