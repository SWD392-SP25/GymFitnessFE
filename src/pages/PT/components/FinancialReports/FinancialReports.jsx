// FinancialReports.jsx
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './FinancialReports.module.css';
import { FiDollarSign, FiTrendingUp, FiBarChart2, FiUsers, FiCalendar, FiDownload } from 'react-icons/fi';
import { getRevenueData, getCourseStats, exportFinancialReport } from '../../../../mockData/financial';
import RevenueChart from './RevenueChart';
import CoursePerformanceTable from './CoursePerformanceTable';

const FinancialReports = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [courseStats, setCourseStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date(),
  });
  
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setIsLoading(true);
        
        // Prepare date parameters
        const fromDate = selectedRange.from.toISOString();
        const toDate = selectedRange.to.toISOString();
        
        // Fetch revenue data from mock API
        const revenueDataResponse = await getRevenueData(timeRange, fromDate, toDate);
        
        // Fetch course stats from mock API
        const courseStatsData = await getCourseStats(fromDate, toDate);
        
        setRevenueData(revenueDataResponse);
        setCourseStats(courseStatsData);
        setError(null);
      } catch (err) {
        setError('Failed to load financial data. Please try again later.');
        console.error('Error fetching financial data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinancialData();
  }, [timeRange, selectedRange]);

  const handleExportReport = async () => {
    try {
      await exportFinancialReport(selectedRange.from.toISOString(), selectedRange.to.toISOString());
      
      // Since our mock doesn't actually create a file, we'll show a message
      alert('Report exported successfully! In a real implementation, the file would download automatically.');
    } catch (err) {
      setError('Failed to export report. Please try again later.');
      console.error('Error exporting report:', err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={styles.financialReports}>
      <div className={styles.header}>
        <h1>Financial Reports</h1>
        <div className={styles.headerActions}>
          <div className={styles.dateRangeSelector}>
            <button 
              className={styles.dateRangeButton} 
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <FiCalendar className={styles.buttonIcon} />
              <span>
                {formatDate(selectedRange.from)} - {formatDate(selectedRange.to)}
              </span>
            </button>
            {showDatePicker && (
              <div className={styles.datePickerPopup}>
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setSelectedRange(range);
                      setShowDatePicker(false);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.timeRangeSelector}>
            <button 
              className={clsx(styles.timeRangeButton, { [styles.active]: timeRange === 'week' })}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={clsx(styles.timeRangeButton, { [styles.active]: timeRange === 'month' })}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={clsx(styles.timeRangeButton, { [styles.active]: timeRange === 'year' })}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
          <button 
            className={styles.exportButton}
            onClick={handleExportReport}
          >
            <FiDownload className={styles.buttonIcon} />
            Export Report
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading financial data...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          {/* Summary cards */}
          <div className={styles.summaryCards}>
            <div className={styles.summaryCard}>
              <div className={styles.cardIcon}>
                <FiDollarSign />
              </div>
              <div className={styles.cardContent}>
                <h3>Total Revenue</h3>
                <p className={styles.cardValue}>{formatCurrency(revenueData?.totalRevenue || 0)}</p>
                <p className={styles.cardCompare}>
                  <FiTrendingUp className={styles.trendIcon} />
                  <span className={styles.trendValue}>+{revenueData?.revenueGrowth || 0}%</span>
                  <span className={styles.trendPeriod}>vs prev. period</span>
                </p>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.cardIcon}>
                <FiBarChart2 />
              </div>
              <div className={styles.cardContent}>
                <h3>Total Sales</h3>
                <p className={styles.cardValue}>{revenueData?.totalSales || 0}</p>
                <p className={styles.cardCompare}>
                  <FiTrendingUp className={styles.trendIcon} />
                  <span className={styles.trendValue}>+{revenueData?.salesGrowth || 0}%</span>
                  <span className={styles.trendPeriod}>vs prev. period</span>
                </p>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.cardIcon}>
                <FiUsers />
              </div>
              <div className={styles.cardContent}>
                <h3>Unique Customers</h3>
                <p className={styles.cardValue}>{revenueData?.uniqueCustomers || 0}</p>
                <p className={styles.cardCompare}>
                  <FiTrendingUp className={styles.trendIcon} />
                  <span className={styles.trendValue}>+{revenueData?.customerGrowth || 0}%</span>
                  <span className={styles.trendPeriod}>vs prev. period</span>
                </p>
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.cardIcon}>
                <FiDollarSign />
              </div>
              <div className={styles.cardContent}>
                <h3>Average Sale</h3>
                <p className={styles.cardValue}>{formatCurrency(revenueData?.averageSale || 0)}</p>
                <p className={styles.cardCompare}>
                  <FiTrendingUp className={styles.trendIcon} />
                  <span className={styles.trendValue}>+{revenueData?.avgSaleGrowth || 0}%</span>
                  <span className={styles.trendPeriod}>vs prev. period</span>
                </p>
              </div>
            </div>
          </div>

          {/* Revenue chart */}
          <RevenueChart revenueData={revenueData} />

          {/* Course performance table */}
          <CoursePerformanceTable courseStats={courseStats} />
        </>
      )}
    </div>
  );
};

export default FinancialReports;