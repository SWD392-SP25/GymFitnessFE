// CoursePerformanceTable.jsx
import { useState } from 'react';
import styles from './FinancialReports.module.css';
import { FiFilter } from 'react-icons/fi';

const CoursePerformanceTable = ({ courseStats }) => {
  const [sortType, setSortType] = useState('revenue');
  
  // Format currency values
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Sort courses based on selected filter
  const sortedCourses = [...courseStats].sort((a, b) => {
    switch (sortType) {
      case 'revenue':
        return b.revenue - a.revenue;
      case 'sales':
        return b.sales - a.sales;
      case 'recent':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });
  
  return (
    <div className={styles.coursePerformance}>
      <div className={styles.tableHeader}>
        <h2>Course Performance</h2>
        <div className={styles.tableFilter}>
          <FiFilter className={styles.filterIcon} />
          <span>Filter by:</span>
          <select 
            className={styles.filterSelect}
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="revenue">Revenue (High to Low)</option>
            <option value="sales">Sales (High to Low)</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.coursesTable}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Revenue</th>
              <th>Rating</th>
              <th>Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map(course => (
              <tr key={course._id}>
                <td>
                  <div className={styles.courseCell}>
                    {course.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className={styles.courseThumbnail} />
                    ) : (
                      <div className={styles.coursePlaceholder}></div>
                    )}
                    <span>{course.title}</span>
                  </div>
                </td>
                <td>{formatCurrency(course.price)}</td>
                <td>{course.sales}</td>
                <td>{formatCurrency(course.revenue)}</td>
                <td>
                  <div className={styles.ratingCell}>
                    <span className={styles.ratingValue}>{course.rating.toFixed(1)}</span>
                    <div className={styles.ratingBar}>
                      <div 
                        className={styles.ratingFill} 
                        style={{ width: `${(course.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.progressCell}>
                    <span className={styles.progressValue}>{course.completionRate}%</span>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursePerformanceTable;