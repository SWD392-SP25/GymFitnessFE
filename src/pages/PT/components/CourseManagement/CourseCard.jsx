// CourseCard.jsx
import React from 'react';
import clsx from 'clsx';
import styles from './CourseManagement.module.css';
import { FiEdit2, FiTrash2, FiVideo, FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi';

const CourseCard = ({ course, onEdit, onDelete, onViewVideos }) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseThumbnail}>
        {course.thumbnailUrl ? (
          <img src={course.thumbnailUrl} alt={course.title} />
        ) : (
          <div className={styles.noThumbnail}>
            <FiVideo size={32} />
          </div>
        )}
      </div>
      <div className={styles.courseInfo}>
        <h3>{course.title}</h3>
        <p className={styles.courseDescription}>{course.description}</p>
        <div className={styles.courseMeta}>
          <div className={styles.metaItem}>
            <FiDollarSign />
            <span>${course.price}</span>
          </div>
          <div className={styles.metaItem}>
            <FiVideo />
            <span>{course.videoCount || 0} Videos</span>
          </div>
          <div className={styles.metaItem}>
            <FiUsers />
            <span>{course.enrollments || 0} Students</span>
          </div>
          <div className={styles.metaItem}>
            <FiCalendar />
            <span>{new Date(course.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className={styles.courseActions}>
        <button 
          className={clsx(styles.actionButton, styles.videos)} 
          onClick={() => onViewVideos(course._id)}
          title="Manage Videos"
        >
          <FiVideo /> Videos
        </button>
        <button 
          className={clsx(styles.actionButton, styles.edit)} 
          onClick={() => onEdit(course._id)}
          title="Edit Course"
        >
          <FiEdit2 /> Edit
        </button>
        <button 
          className={clsx(styles.actionButton, styles.delete)} 
          onClick={() => onDelete(course._id)}
          title="Delete Course"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default CourseCard;