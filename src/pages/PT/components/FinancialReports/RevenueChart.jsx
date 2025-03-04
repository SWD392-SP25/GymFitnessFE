// RevenueChart.jsx
import React from 'react';
import styles from './FinancialReports.module.css';

const RevenueChart = ({ revenueData }) => {
  // Format currency values
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2>Revenue Trends</h2>
        <p className={styles.chartSubtitle}>
          Revenue and sales over the selected period
        </p>
      </div>
      
      <div className={styles.simpleChartContainer}>
        <div className={styles.labelContainer}>
          <div className={styles.revenueLabel}>
            <span className={styles.colorIndicator} style={{ backgroundColor: '#2563eb' }}></span>
            <span>Revenue</span>
          </div>
          <div className={styles.salesLabel}>
            <span className={styles.colorIndicator} style={{ backgroundColor: '#10b981' }}></span>
            <span>Sales</span>
          </div>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Period</th>
                <th>Revenue</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {(revenueData?.labels || []).map((label, index) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td className={styles.revenueCell}>
                    {formatCurrency(revenueData?.revenue[index] || 0)}
                  </td>
                  <td className={styles.salesCell}>
                    {revenueData?.salesCount[index] || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;