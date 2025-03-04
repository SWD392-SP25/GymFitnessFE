// src/mockData/courses.js
const STORAGE_KEY = 'gymfitness_courses';
const VIDEOS_STORAGE_KEY = 'gymfitness_course_videos';

// Default courses data
const defaultCourses = [
  {
    _id: '1',
    title: 'Advanced Strength Training',
    description: 'Complete strength training program for experienced athletes looking to take their performance to the next level. This program covers compound movements, periodization, and recovery techniques.',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Strength+Training',
    price: 99.99,
    videoCount: 24,
    enrollments: 156,
    createdAt: '2023-06-15T10:30:00Z'
  },
  {
    _id: '2',
    title: 'Yoga for Beginners',
    description: 'Learn the basics of yoga and improve your flexibility, balance, and mindfulness. Perfect for beginners who want to start their yoga journey with proper form and technique.',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Yoga',
    price: 49.99,
    videoCount: 18,
    enrollments: 243,
    createdAt: '2023-08-22T14:15:00Z'
  },
  {
    _id: '3',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular health. This program will push your limits and help you achieve your fitness goals faster.',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=HIIT',
    price: 79.99,
    videoCount: 15,
    enrollments: 189,
    createdAt: '2023-09-05T09:45:00Z'
  },
  {
    _id: '4',
    title: 'Nutrition Fundamentals',
    description: 'Learn the science behind proper nutrition for optimal health and performance. This course covers macronutrients, meal planning, and nutrition strategies for different fitness goals.',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Nutrition',
    price: 59.99,
    videoCount: 12,
    enrollments: 211,
    createdAt: '2023-07-10T16:20:00Z'
  },
  {
    _id: '5',
    title: 'Mobility & Recovery',
    description: 'Improve your joint mobility and learn effective recovery techniques to prevent injuries and enhance performance. This course is essential for athletes of all levels.',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Mobility',
    price: 69.99,
    videoCount: 20,
    enrollments: 134,
    createdAt: '2023-10-01T11:10:00Z'
  }
];

// Default videos data
const defaultCourseVideos = {
  '1': [
    {
      _id: 'v1_1',
      title: 'Introduction to Strength Training',
      duration: '10:15',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Intro',
      isFree: true
    },
    {
      _id: 'v1_2',
      title: 'Proper Form for Squats',
      duration: '15:30',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Squats',
      isFree: false
    },
    {
      _id: 'v1_3',
      title: 'Deadlift Fundamentals',
      duration: '18:45',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Deadlifts',
      isFree: false
    },
    {
      _id: 'v1_4',
      title: 'Bench Press Techniques',
      duration: '14:20',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Bench+Press',
      isFree: false
    },
    {
      _id: 'v1_5',
      title: 'Recovery Strategies',
      duration: '12:10',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Recovery',
      isFree: false
    }
  ],
  '2': [
    {
      _id: 'v2_1',
      title: 'Yoga Foundations',
      duration: '8:30',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Yoga+Basics',
      isFree: true
    },
    {
      _id: 'v2_2',
      title: 'Downward Dog and Basic Poses',
      duration: '12:45',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Basic+Poses',
      isFree: false
    },
    {
      _id: 'v2_3',
      title: 'Breathing Techniques',
      duration: '9:15',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Breathing',
      isFree: false
    },
    {
      _id: 'v2_4',
      title: 'Sun Salutation Sequence',
      duration: '14:50',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Sun+Salutation',
      isFree: false
    }
  ],
  '3': [
    {
      _id: 'v3_1',
      title: 'HIIT Fundamentals',
      duration: '7:20',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=HIIT+Basics',
      isFree: true
    },
    {
      _id: 'v3_2',
      title: 'Tabata Intervals',
      duration: '11:30',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Tabata',
      isFree: false
    },
    {
      _id: 'v3_3',
      title: 'Full Body HIIT Circuit',
      duration: '16:40',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Full+Body',
      isFree: false
    }
  ],
  '4': [
    {
      _id: 'v4_1',
      title: 'Nutrition Basics',
      duration: '9:55',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Nutrition+101',
      isFree: true
    },
    {
      _id: 'v4_2',
      title: 'Macronutrients Explained',
      duration: '13:25',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Macros',
      isFree: false
    },
    {
      _id: 'v4_3',
      title: 'Meal Planning Tips',
      duration: '10:15',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Meal+Planning',
      isFree: false
    }
  ],
  '5': [
    {
      _id: 'v5_1',
      title: 'Mobility Assessment',
      duration: '8:10',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Assessment',
      isFree: true
    },
    {
      _id: 'v5_2',
      title: 'Hip Mobility Exercises',
      duration: '11:05',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Hip+Mobility',
      isFree: false
    },
    {
      _id: 'v5_3',
      title: 'Shoulder Mobility Routines',
      duration: '12:30',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Shoulder+Mobility',
      isFree: false
    },
    {
      _id: 'v5_4',
      title: 'Recovery Tools and Techniques',
      duration: '15:20',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Recovery+Tools',
      isFree: false
    }
  ]
};

// Initialize storage with default data if not already present
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCourses));
  }
  
  if (!localStorage.getItem(VIDEOS_STORAGE_KEY)) {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(defaultCourseVideos));
  }
};

// Initialize storage
initializeStorage();

// Helper function to get courses from localStorage
const getCoursesFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Helper function to save courses to localStorage
const saveCoursesToStorage = (courses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
};

// Helper function to get course videos from localStorage
const getVideosFromStorage = () => {
  return JSON.parse(localStorage.getItem(VIDEOS_STORAGE_KEY)) || {};
};

// Helper function to save course videos to localStorage
const saveVideosToStorage = (videos) => {
  localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videos));
};

// Mock API functions for courses
export const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = getCoursesFromStorage();
      resolve(courses);
    }, 800); // Simulate network delay
  });
};

export const createCourse = (courseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = getCoursesFromStorage();
      const newCourse = {
        _id: `${Date.now()}`, // Use timestamp for unique ID
        ...courseData,
        videoCount: 0,
        enrollments: 0,
        createdAt: new Date().toISOString()
      };
      
      courses.push(newCourse);
      saveCoursesToStorage(courses);
      
      // Create empty videos array for the new course
      const videos = getVideosFromStorage();
      videos[newCourse._id] = [];
      saveVideosToStorage(videos);
      
      resolve(newCourse);
    }, 800);
  });
};

export const updateCourse = (courseId, courseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = getCoursesFromStorage();
      const courseIndex = courses.findIndex(course => course._id === courseId);
      
      if (courseIndex !== -1) {
        courses[courseIndex] = {
          ...courses[courseIndex],
          ...courseData
        };
        saveCoursesToStorage(courses);
        resolve(courses[courseIndex]);
      } else {
        resolve(null);
      }
    }, 800);
  });
};

export const deleteCourse = (courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = getCoursesFromStorage();
      const filteredCourses = courses.filter(course => course._id !== courseId);
      saveCoursesToStorage(filteredCourses);
      
      // Also remove course videos
      const videos = getVideosFromStorage();
      delete videos[courseId];
      saveVideosToStorage(videos);
      
      resolve({ success: true });
    }, 800);
  });
};

// Mock API functions for course videos
export const getCoursesWithVideos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const courses = getCoursesFromStorage();
      const videos = getVideosFromStorage();
      
      const coursesWithVideos = courses.map(course => ({
        ...course,
        videos: videos[course._id] || []
      }));
      
      resolve(coursesWithVideos);
    }, 800);
  });
};

export const getCourseVideos = (courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const videos = getVideosFromStorage();
      resolve(videos[courseId] || []);
    }, 800);
  });
};

export const addCourseVideo = (courseId, videoData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const videos = getVideosFromStorage();
      const courses = getCoursesFromStorage();
      
      const newVideo = {
        _id: `v${courseId}_${Date.now()}`,
        ...videoData,
        isFree: false
      };
      
      if (!videos[courseId]) {
        videos[courseId] = [];
      }
      
      videos[courseId].push(newVideo);
      saveVideosToStorage(videos);
      
      // Update video count in course
      const courseIndex = courses.findIndex(course => course._id === courseId);
      if (courseIndex !== -1) {
        courses[courseIndex].videoCount = videos[courseId].length;
        saveCoursesToStorage(courses);
      }
      
      resolve(newVideo);
    }, 800);
  });
};

export const setFreeVideo = (courseId, videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const videos = getVideosFromStorage();
      
      if (videos[courseId]) {
        // Reset all videos to not free
        videos[courseId] = videos[courseId].map(video => ({
          ...video,
          isFree: false
        }));
        
        // Set the selected video to free
        const videoIndex = videos[courseId].findIndex(video => video._id === videoId);
        if (videoIndex !== -1) {
          videos[courseId][videoIndex].isFree = true;
        }
        
        saveVideosToStorage(videos);
        resolve(videos[courseId]);
      } else {
        resolve([]);
      }
    }, 800);
  });
};

export const deleteCourseVideo = (courseId, videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const videos = getVideosFromStorage();
      const courses = getCoursesFromStorage();
      
      if (videos[courseId]) {
        videos[courseId] = videos[courseId].filter(video => video._id !== videoId);
        saveVideosToStorage(videos);
        
        // Update video count in course
        const courseIndex = courses.findIndex(course => course._id === courseId);
        if (courseIndex !== -1) {
          courses[courseIndex].videoCount = videos[courseId].length;
          saveCoursesToStorage(courses);
        }
        
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 800);
  });
};