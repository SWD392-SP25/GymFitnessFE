// src/mockData/financial.js

// Helper function to get a date X days ago
const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };
  
  // Helper function to format date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Helper function to generate daily data for the past X days
  const generateDailyData = (days, baseRevenue, baseSales, volatility = 0.2) => {
    const data = [];
    for (let i = days; i >= 0; i--) {
      const date = getDaysAgo(i);
      const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
      
      // Higher sales on weekends
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const weekendMultiplier = isWeekend ? 1.5 : 1;
      
      const dailyRevenue = Math.round(baseRevenue * randomFactor * weekendMultiplier);
      const dailySales = Math.round(baseSales * randomFactor * weekendMultiplier);
      
      data.push({
        date: formatDate(date),
        revenue: dailyRevenue,
        sales: dailySales
      });
    }
    return data;
  };
  
  // Generate mock data for different time periods
  const generateWeekData = () => {
    return generateDailyData(7, 250, 5);
  };
  
  const generateMonthData = () => {
    return generateDailyData(30, 200, 4);
  };
  
  const generateYearData = () => {
    // For year data, we'll aggregate by month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const data = [];
    
    for (let i = 11; i >= 0; i--) {
      // Calculate month index (wrapping around to previous year if needed)
      const monthIndex = (currentMonth - i + 12) % 12;
      
      // Some variation in monthly data
      const randomFactor = 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
      
      // Summer months (May-Aug) tend to have higher sales
      const seasonalFactor = (monthIndex >= 4 && monthIndex <= 7) ? 1.3 : 1;
      
      data.push({
        date: monthNames[monthIndex],
        revenue: Math.round(5000 * randomFactor * seasonalFactor),
        sales: Math.round(100 * randomFactor * seasonalFactor)
      });
    }
    
    return data;
  };
  
  // Generate course performance data
  const generateCourseStats = () => {
    return [
      {
        _id: '1',
        title: 'Advanced Strength Training',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=Strength+Training',
        price: 99.99,
        sales: 156,
        revenue: 15558.44,
        rating: 4.8,
        completionRate: 78
      },
      {
        _id: '2',
        title: 'Yoga for Beginners',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=Yoga',
        price: 49.99,
        sales: 243,
        revenue: 12147.57,
        rating: 4.7,
        completionRate: 82
      },
      {
        _id: '3',
        title: 'HIIT Cardio Blast',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=HIIT',
        price: 79.99,
        sales: 189,
        revenue: 15118.11,
        rating: 4.5,
        completionRate: 65
      },
      {
        _id: '4',
        title: 'Nutrition Fundamentals',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=Nutrition',
        price: 59.99,
        sales: 211,
        revenue: 12657.89,
        rating: 4.9,
        completionRate: 88
      },
      {
        _id: '5',
        title: 'Mobility & Recovery',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=Mobility',
        price: 69.99,
        sales: 134,
        revenue: 9378.66,
        rating: 4.6,
        completionRate: 71
      }
    ];
  };
  
  // Calculate summary statistics based on data range
  const calculateSummaryStats = (data) => {
    const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0);
    const totalSales = data.reduce((sum, day) => sum + day.sales, 0);
    
    // Previous period data (assume 5% less for simplicity)
    const prevPeriodRevenue = totalRevenue * 0.95;
    const prevPeriodSales = totalSales * 0.95;
    
    // Calculate growth percentages
    const revenueGrowth = Math.round((totalRevenue / prevPeriodRevenue - 1) * 100);
    const salesGrowth = Math.round((totalSales / prevPeriodSales - 1) * 100);
    
    // Unique customers (roughly 90% of total sales)
    const uniqueCustomers = Math.round(totalSales * 0.9);
    const prevPeriodCustomers = Math.round(prevPeriodSales * 0.9);
    const customerGrowth = Math.round((uniqueCustomers / prevPeriodCustomers - 1) * 100);
    
    // Average sale value
    const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0;
    const prevAverageSale = prevPeriodSales > 0 ? prevPeriodRevenue / prevPeriodSales : 0;
    const avgSaleGrowth = Math.round((averageSale / prevAverageSale - 1) * 100);
    
    return {
      totalRevenue,
      totalSales,
      revenueGrowth,
      salesGrowth,
      uniqueCustomers,
      customerGrowth,
      averageSale,
      avgSaleGrowth
    };
  };
  
  // Mock API functions
  export const getRevenueData = (timeRange, fromDate, toDate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data;
        
        switch (timeRange) {
          case 'week':
            data = generateWeekData();
            break;
          case 'year':
            data = generateYearData();
            break;
          case 'month':
          default:
            data = generateMonthData();
            break;
        }
        
        // Format data for chart
        const labels = data.map(item => item.date);
        const revenue = data.map(item => item.revenue);
        const salesCount = data.map(item => item.sales);
        const summaryStats = calculateSummaryStats(data);
        
        resolve({
          labels,
          revenue,
          salesCount,
          ...summaryStats
        });
      }, 800);
    });
  };
  
  export const getCourseStats = (fromDate, toDate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const courseStats = generateCourseStats();
        resolve(courseStats);
      }, 800);
    });
  };
  
  export const exportFinancialReport = (fromDate, toDate) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would normally generate a CSV file for download
        // Here we're just simulating the API call
        resolve({ success: true });
      }, 800);
    });
  };