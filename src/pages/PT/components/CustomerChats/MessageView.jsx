// MessageView.jsx
import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './CustomerChats.module.css';
import { FiUser, FiSend, FiMessageCircle } from 'react-icons/fi';

const MessageView = ({ 
  selectedConversation, 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage, 
  onGoBack,
  isLoading 
}) => {
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (!selectedConversation) {
    return (
      <div className={styles.noConversationSelected}>
        <FiMessageCircle size={64} />
        <h3>Select a conversation</h3>
        <p>Choose a customer conversation from the list to start chatting</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.messageHeader}>
        <button 
          className={styles.backButton}
          onClick={onGoBack}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className={styles.customerInfo}>
          <div className={styles.customerAvatar}>
            {selectedConversation.customerAvatar ? (
              <img src={selectedConversation.customerAvatar} alt={selectedConversation.customerName} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <FiUser />
              </div>
            )}
          </div>
          <div>
            <h3>{selectedConversation.customerName}</h3>
            <p className={styles.courseName}>{selectedConversation.courseName}</p>
          </div>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {isLoading ? (
          <div className={styles.loading}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className={styles.noMessages}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((message, index) => {
              // Check if we need to display the date separator
              const showDateSeparator = index === 0 || 
                formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
              
              return (
                <div key={message._id}>
                  {showDateSeparator && (
                    <div className={styles.dateSeparator}>
                      <span>{formatDate(message.timestamp)}</span>
                    </div>
                  )}
                  <div 
                    className={clsx(styles.message, {
                      [styles.outgoing]: message.senderId === 'pt', // PT's messages
                      [styles.incoming]: message.senderId !== 'pt' // Customer's messages
                    })}
                  >
                    <div className={styles.messageContent}>
                      <p>{message.content}</p>
                      <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form className={styles.messageForm} onSubmit={onSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.messageInput}
        />
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={!newMessage.trim()}
        >
          <FiSend />
        </button>
      </form>
    </>
  );
};

export default MessageView;