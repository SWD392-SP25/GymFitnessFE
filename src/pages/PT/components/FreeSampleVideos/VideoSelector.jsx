// VideoSelector.jsx
import React from 'react';
import clsx from 'clsx';
import styles from './FreeSampleVideos.module.css';
import { FiCheck, FiUnlock } from 'react-icons/fi';

const VideoSelector = ({ video, courseId, onSetFree }) => {
  return (
    <div className={styles.videoItem}>
      <div className={styles.videoDetails}>
        <div className={styles.videoThumbnail}>
          {video.thumbnailUrl ? (
            <img src={video.thumbnailUrl} alt={video.title} />
          ) : (
            <div className={styles.placeholderThumbnail}></div>
          )}
        </div>
        <div className={styles.videoInfo}>
          <h4>{video.title}</h4>
          <span className={styles.videoDuration}>
            {video.duration || 'Unknown duration'}
          </span>
        </div>
      </div>
      <div className={styles.videoActions}>
        <button 
          className={clsx(styles.setFreeButton, { [styles.isFree]: video.isFree })}
          onClick={() => onSetFree(courseId, video._id)}
          disabled={video.isFree}
        >
          {video.isFree ? (
            <>
              <FiCheck /> Current Free Sample
            </>
          ) : (
            <>
              <FiUnlock /> Set as Free Sample
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoSelector;