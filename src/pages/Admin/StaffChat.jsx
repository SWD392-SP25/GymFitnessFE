import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUsersAPI, getUserByEmailAPI } from '../../services/UsersService';
import instance from '../../services/customize-axios';
import { useNavigate } from 'react-router-dom';

const StaffChat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [staffId, setStaffId] = useState(null);
  const messagesEndRef = useRef(null);

  // Get staff ID from JWT token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setStaffId(decoded.sub || decoded.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Fetch users using getUsersAPI
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsersAPI({
          filterOn: searchTerm ? "email" : "",
          filterQuery: searchTerm
        });

        // Transform users into chat contacts
        const userContacts = response.map(user => ({
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          userName: user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email,
          status: user.status === "Banned" ? "offline" : "online"
        }));

        setUsers(userContacts);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  // Get detailed user data and conversation history when a user is selected
  const fetchUserDetailsAndConversation = async (userEmail) => {
    setLoadingMessages(true);
    try {
      // Step 1: Get detailed user info including userId
      const userDetails = await getUserByEmailAPI(userEmail);

      // Set active user with detailed info
      setActiveUser({
        ...userDetails,
        userName: userDetails.firstName && userDetails.lastName
          ? `${userDetails.firstName} ${userDetails.lastName}`
          : userDetails.email
      });

      // Step 2: With userId, get conversation history
      if (staffId && userDetails) {
        // Clear existing messages while fetching
        setMessages([]);

        try {
          // Using instance directly to call conversation API
          const response = await instance.get(`/Chat/history/${userDetails.userId}/${staffId}`);
          if (response && Array.isArray(response)) {
            // Transform API response to match our component's expected message format
            const formattedMessages = response.map(msg => ({
              id: msg.chatId.toString(),
              senderId: msg.isUserMessage ? msg.userId : msg.staffId,
              receiverId: msg.isUserMessage ? msg.staffId : msg.userId,
              message: msg.messageText,
              messageType: msg.messageType,
              timestamp: msg.createdAt
            }));
            setMessages(formattedMessages);
          }
        } catch (chatError) {
          console.error('Error fetching chat history:', chatError);
          // If chat API fails, just start with empty conversation
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeUser || !staffId || sendingMessage) return;

    try {
      setSendingMessage(true);

      const messageData = {
        senderId: staffId,
        receiverId: activeUser.userId,
        message: newMessage,
        messageType: 'text'
      };

      // Send the message to the API
      await instance.post('/Chat/send', messageData);

      // Add the message to the UI (optimistic update)
      const newMessageObj = {
        id: Date.now().toString(),
        ...messageData,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessageObj]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSelectUser = (userEmail) => {
    fetchUserDetailsAndConversation(userEmail);
  };

  const formatTime = (timestamp) => {
    try {
      const cleanTimestamp = timestamp.split('.')[0] + (timestamp.includes('.') ? `.${timestamp.split('.')[1].substring(0, 3)}Z` : '');
      const date = new Date(cleanTimestamp);

      if (isNaN(date.getTime())) {
        console.warn('Invalid date format:', timestamp);
        return 'Time unavailable';
      }

      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Time unavailable';
    }
  };

  // Filter users based on search term
  const filteredUsers = users || [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - Contacts */}
      <div className="w-80 flex flex-col bg-white border-r border-gray-200 h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0 flex items-center">
          <button onClick={() => navigate('/dashboard')} className="mr-3 text-gray-700 hover:text-blue-500 transition-colors focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Chats</h1>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* User list - Independently scrollable */}
        <div className="overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="mb-2">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>
              <p>No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.email}
                className={`p-3 flex items-center hover:bg-gray-100 cursor-pointer transition ${activeUser?.email === user.email ? 'bg-blue-50' : ''
                  }`}
                onClick={() => handleSelectUser(user.email)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {user.userName.slice(0, 1).toUpperCase()}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                  ></span>
                </div>
                <div className="ml-3 flex-grow min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-gray-900 truncate">{user.userName}</h3>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col h-full">
        {activeUser ? (
          <>
            {/* Chat header */}
            <div className="p-3 border-b border-gray-200 bg-white flex items-center shadow-sm flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold">
                  {activeUser.userName.slice(0, 1).toUpperCase()}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{activeUser.userName}</h3>
                  <p className="text-xs text-gray-500">
                    {activeUser.status === 'online' ? (
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        Active now
                      </span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages - Independently scrollable */}
            <div className="flex-grow overflow-y-auto p-4 bg-white">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-1">No messages yet</h3>
                  <p className="text-sm">Start the conversation by sending a message</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => {
                    const isFromStaff = message.senderId === staffId;

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isFromStaff ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isFromStaff && (
                          <div className="flex-shrink-0 mr-2 self-end">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold text-sm">
                              {activeUser.userName.slice(0, 1).toUpperCase()}
                            </div>
                          </div>
                        )}

                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${isFromStaff
                              ? 'bg-blue-500 text-white rounded-br-md'
                              : 'bg-gray-200 text-gray-800 rounded-bl-md'
                            }`}
                        >
                          <p>{message.message}</p>
                          <div className={`text-xs text-right mt-1 ${isFromStaff ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <div className="w-10 text-gray-400 flex-shrink-0 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                  placeholder="Aa"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sendingMessage || !activeUser.userId}
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-blue-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  disabled={!newMessage.trim() || sendingMessage || !activeUser.userId}
                >
                  {sendingMessage ? (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="text-blue-500" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Your Messages</h3>
            <p className="text-sm max-w-sm">Select a user from the left to start a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffChat;