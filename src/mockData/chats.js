// src/mockData/chats.js
const CONVERSATIONS_STORAGE_KEY = 'gymfitness_conversations';
const MESSAGES_STORAGE_KEY = 'gymfitness_messages';

// Default conversations data
const defaultConversations = [
  {
    _id: 'conv1',
    customerName: 'John Smith',
    customerAvatar: 'https://via.placeholder.com/50x50?text=JS',
    courseName: 'Advanced Strength Training',
    courseId: '1',
    lastMessage: 'I have a question about the deadlift technique shown in video 3',
    lastMessageTime: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
    unreadCount: 2
  },
  {
    _id: 'conv2',
    customerName: 'Emma Wilson',
    customerAvatar: 'https://via.placeholder.com/50x50?text=EW',
    courseName: 'Yoga for Beginners',
    courseId: '2',
    lastMessage: 'Thank you for the additional resources! They were very helpful.',
    lastMessageTime: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    unreadCount: 0
  },
  {
    _id: 'conv3',
    customerName: 'Michael Chen',
    customerAvatar: 'https://via.placeholder.com/50x50?text=MC',
    courseName: 'HIIT Cardio Blast',
    courseId: '3',
    lastMessage: 'Could you recommend some modifications for someone with knee issues?',
    lastMessageTime: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
    unreadCount: 1
  },
  {
    _id: 'conv4',
    customerName: 'Sophia Rodriguez',
    customerAvatar: 'https://via.placeholder.com/50x50?text=SR',
    courseName: 'Nutrition Fundamentals',
    courseId: '4',
    lastMessage: 'Is there a meal plan template I can download?',
    lastMessageTime: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    unreadCount: 0
  },
  {
    _id: 'conv5',
    customerName: 'David Johnson',
    customerAvatar: 'https://via.placeholder.com/50x50?text=DJ',
    courseName: 'Mobility & Recovery',
    courseId: '5',
    lastMessage: 'The foam rolling techniques have been a game changer for me!',
    lastMessageTime: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
    unreadCount: 0
  }
];

// Default messages data for each conversation
const defaultMessages = {
  'conv1': [
    {
      _id: 'msg1_1',
      senderId: 'customer', // 'customer' or 'pt'
      content: 'Hi, I just purchased your Advanced Strength Training course and I\'m loving it so far!',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString() // 30 minutes ago
    },
    {
      _id: 'msg1_2',
      senderId: 'pt',
      content: 'Hi John! I\'m glad to hear you\'re enjoying the course. Let me know if you have any questions.',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString() // 25 minutes ago
    },
    {
      _id: 'msg1_3',
      senderId: 'customer',
      content: 'Actually, I do have a question about the deadlift form shown in video 3. I\'m not sure if my back position is correct.',
      timestamp: new Date(Date.now() - 20 * 60000).toISOString() // 20 minutes ago
    },
    {
      _id: 'msg1_4',
      senderId: 'customer',
      content: 'Would it be possible to get some feedback if I send you a video of my form?',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString() // 5 minutes ago
    }
  ],
  'conv2': [
    {
      _id: 'msg2_1',
      senderId: 'customer',
      content: 'Hello! I\'m finding the breathing techniques really challenging in the Sun Salutation sequence.',
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
    },
    {
      _id: 'msg2_2',
      senderId: 'pt',
      content: 'Hi Emma, that\'s a common challenge for beginners. Try focusing on your breath first before coordinating with the movements.',
      timestamp: new Date(Date.now() - 2 * 86400000 + 30 * 60000).toISOString() // 2 days ago + 30 minutes
    },
    {
      _id: 'msg2_3',
      senderId: 'pt',
      content: 'I\'ll send you some additional resources that might help with the breathing techniques.',
      timestamp: new Date(Date.now() - 2 * 86400000 + 35 * 60000).toISOString() // 2 days ago + 35 minutes
    },
    {
      _id: 'msg2_4',
      senderId: 'customer',
      content: 'Thank you for the additional resources! They were very helpful.',
      timestamp: new Date(Date.now() - 3 * 3600000).toISOString() // 3 hours ago
    }
  ],
  'conv3': [
    {
      _id: 'msg3_1',
      senderId: 'customer',
      content: 'Hi there! I just started your HIIT program and it\'s quite challenging!',
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
    },
    {
      _id: 'msg3_2',
      senderId: 'pt',
      content: 'Hello Michael! Yes, it\'s designed to be intense, but you can always modify to your fitness level.',
      timestamp: new Date(Date.now() - 2 * 86400000 + 45 * 60000).toISOString() // 2 days ago + 45 minutes
    },
    {
      _id: 'msg3_3',
      senderId: 'customer',
      content: 'Could you recommend some modifications for someone with knee issues?',
      timestamp: new Date(Date.now() - 1 * 86400000).toISOString() // 1 day ago
    }
  ],
  'conv4': [
    {
      _id: 'msg4_1',
      senderId: 'customer',
      content: 'Hello! I\'m finding the nutrition course very informative.',
      timestamp: new Date(Date.now() - 3 * 86400000).toISOString() // 3 days ago
    },
    {
      _id: 'msg4_2',
      senderId: 'pt',
      content: 'That\'s great to hear, Sophia! Nutrition is so foundational to fitness success.',
      timestamp: new Date(Date.now() - 3 * 86400000 + 2 * 3600000).toISOString() // 3 days ago + 2 hours
    },
    {
      _id: 'msg4_3',
      senderId: 'customer',
      content: 'Is there a meal plan template I can download?',
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString() // 2 days ago
    },
    {
      _id: 'msg4_4',
      senderId: 'pt',
      content: 'Absolutely! I\'ve just added a downloadable meal plan template to the resources section of the course. You should be able to access it now.',
      timestamp: new Date(Date.now() - 2 * 86400000 + 1 * 3600000).toISOString() // 2 days ago + 1 hour
    }
  ],
  'conv5': [
    {
      _id: 'msg5_1',
      senderId: 'customer',
      content: 'I\'ve been following your mobility routine for a week now.',
      timestamp: new Date(Date.now() - 7 * 86400000).toISOString() // 7 days ago
    },
    {
      _id: 'msg5_2',
      senderId: 'pt',
      content: 'How\'s it going so far, David?',
      timestamp: new Date(Date.now() - 7 * 86400000 + 30 * 60000).toISOString() // 7 days ago + 30 minutes
    },
    {
      _id: 'msg5_3',
      senderId: 'customer',
      content: 'I\'m already noticing improvement in my shoulder mobility! The foam rolling techniques have been a game changer for me!',
      timestamp: new Date(Date.now() - 5 * 86400000).toISOString() // 5 days ago
    },
    {
      _id: 'msg5_4',
      senderId: 'pt',
      content: 'That\'s fantastic to hear! Consistency is key with mobility work, so keep it up!',
      timestamp: new Date(Date.now() - 5 * 86400000 + 45 * 60000).toISOString() // 5 days ago + 45 minutes
    }
  ]
};

// Initialize storage with default data if not already present
const initializeStorage = () => {
  if (!localStorage.getItem(CONVERSATIONS_STORAGE_KEY)) {
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(defaultConversations));
  }
  
  if (!localStorage.getItem(MESSAGES_STORAGE_KEY)) {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(defaultMessages));
  }
};

// Initialize storage
initializeStorage();

// Helper functions for localStorage
const getConversationsFromStorage = () => {
  return JSON.parse(localStorage.getItem(CONVERSATIONS_STORAGE_KEY)) || [];
};

const saveConversationsToStorage = (conversations) => {
  localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
};

const getMessagesFromStorage = () => {
  return JSON.parse(localStorage.getItem(MESSAGES_STORAGE_KEY)) || {};
};

const saveMessagesToStorage = (messages) => {
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
};

// Mock API functions
export const getConversations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const conversations = getConversationsFromStorage();
      // Sort by last message time, newest first
      conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
      resolve(conversations);
    }, 800);
  });
};

export const getConversationMessages = (conversationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getMessagesFromStorage();
      const conversationMessages = messages[conversationId] || [];
      
      // Mark conversation as read
      const conversations = getConversationsFromStorage();
      const conversationIndex = conversations.findIndex(conv => conv._id === conversationId);
      
      if (conversationIndex !== -1) {
        conversations[conversationIndex].unreadCount = 0;
        saveConversationsToStorage(conversations);
      }
      
      resolve(conversationMessages);
    }, 800);
  });
};

export const sendMessage = (conversationId, content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getMessagesFromStorage();
      const conversations = getConversationsFromStorage();
      
      // Create new message
      const newMessage = {
        _id: `msg${conversationId}_${Date.now()}`,
        senderId: 'pt', // This is a PT sending a message
        content,
        timestamp: new Date().toISOString()
      };
      
      // Add message to conversation
      if (!messages[conversationId]) {
        messages[conversationId] = [];
      }
      messages[conversationId].push(newMessage);
      saveMessagesToStorage(messages);
      
      // Update conversation last message
      const conversationIndex = conversations.findIndex(conv => conv._id === conversationId);
      if (conversationIndex !== -1) {
        conversations[conversationIndex].lastMessage = content;
        conversations[conversationIndex].lastMessageTime = newMessage.timestamp;
        saveConversationsToStorage(conversations);
      }
      
      resolve(newMessage);
    }, 800);
  });
};

// Simulate receiving a new message (can be used for testing)
export const simulateIncomingMessage = (conversationId, content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getMessagesFromStorage();
      const conversations = getConversationsFromStorage();
      
      // Create new message
      const newMessage = {
        _id: `msg${conversationId}_${Date.now()}`,
        senderId: 'customer', // This is a customer sending a message
        content,
        timestamp: new Date().toISOString()
      };
      
      // Add message to conversation
      if (!messages[conversationId]) {
        messages[conversationId] = [];
      }
      messages[conversationId].push(newMessage);
      saveMessagesToStorage(messages);
      
      // Update conversation last message and increment unread count
      const conversationIndex = conversations.findIndex(conv => conv._id === conversationId);
      if (conversationIndex !== -1) {
        conversations[conversationIndex].lastMessage = content;
        conversations[conversationIndex].lastMessageTime = newMessage.timestamp;
        conversations[conversationIndex].unreadCount += 1;
        saveConversationsToStorage(conversations);
      }
      
      resolve(newMessage);
    }, 800);
  });
};