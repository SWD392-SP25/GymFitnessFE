// ConversationList.jsx
import React from 'react';
import clsx from 'clsx';
import styles from './CustomerChats.module.css';
import { FiUser, FiClock, FiMessageCircle } from 'react-icons/fi';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation,
  searchTerm,
  isLoading 
}) => {
  const safeSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";
  // Filter conversations based on search term
  const filteredConversations = (Array.isArray(conversations) ? conversations : []).filter(conversation =>
    (conversation.customerName?.toLowerCase() || "").includes(safeSearchTerm) ||
    (conversation.courseName?.toLowerCase() || "").includes(safeSearchTerm)
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading conversations...</div>;
  }

  if (filteredConversations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FiMessageCircle size={40} />
        <p>No conversations found</p>
      </div>
    );
  }

  return (
    <div className={styles.conversationsItems}>
      {filteredConversations.map(conversation => (
        <div 
          key={conversation._id} 
          className={clsx(styles.conversationItem, { 
            [styles.active]: selectedConversation && selectedConversation._id === conversation._id,
            [styles.unread]: conversation.unreadCount > 0
          })}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className={styles.conversationAvatar}>
            {conversation.customerAvatar ? (
              <img src={conversation.customerAvatar} alt={conversation.customerName} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <FiUser />
              </div>
            )}
          </div>
          <div className={styles.conversationInfo}>
            <div className={styles.conversationHeader}>
              <h4>{conversation.customerName}</h4>
              <span className={styles.conversationTime}>
                <FiClock size={12} />
                {formatTime(conversation.lastMessageTime)}
              </span>
            </div>
            <p className={styles.courseName}>{conversation.courseName}</p>
            <p className={styles.lastMessage}>{conversation.lastMessage}</p>
          </div>
          {conversation.unreadCount > 0 && (
            <div className={styles.unreadBadge}>{conversation.unreadCount}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;