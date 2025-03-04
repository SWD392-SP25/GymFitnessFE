// CustomerChats.jsx
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './CustomerChats.module.css';
import { getConversations, getConversationMessages, sendMessage } from '../../../../mockData/chats';
import ConversationList from './ConversationList';
import MessageView from './MessageView';

const CustomerChats = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const conversationsData = await getConversations();
        setConversations(conversationsData);
        setError(null);
      } catch (err) {
        setError('Failed to load conversations. Please try again later.');
        console.error('Error fetching conversations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          setIsLoading(true);
          const messagesData = await getConversationMessages(selectedConversation._id);
          setMessages(messagesData);
          setError(null);
          
          // Update conversation unread count in the list
          setConversations(conversations.map(conv => 
            conv._id === selectedConversation._id ? { ...conv, unreadCount: 0 } : conv
          ));
        } catch (err) {
          setError('Failed to load messages. Please try again later.');
          console.error('Error fetching messages:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMessages();
    }
  }, [selectedConversation]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async (content) => {
    if (!content.trim() || !selectedConversation) return;
    
    try {
      const sentMessage = await sendMessage(selectedConversation._id, content);
      
      // Add the new message to the messages list
      setMessages([...messages, sentMessage]);
      
      // Update the conversation in the list with the new last message
      setConversations(conversations.map(conv => {
        if (conv._id === selectedConversation._id) {
          return {
            ...conv,
            lastMessage: content,
            lastMessageTime: new Date().toISOString()
          };
        }
        return conv;
      }));
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className={styles.customerChats}>
      <div className={styles.chatContainer}>
        {/* Conversations list */}
        <div className={clsx(styles.conversationsList, { [styles.hidden]: selectedConversation && isMobile })}>
          <ConversationList 
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            isLoading={isLoading && !selectedConversation}
          />
        </div>

        {/* Message view */}
        <div className={clsx(styles.messageView, { [styles.hidden]: !selectedConversation && isMobile })}>
          <MessageView 
            conversation={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={handleBackToList}
            isLoading={isLoading && selectedConversation}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerChats;