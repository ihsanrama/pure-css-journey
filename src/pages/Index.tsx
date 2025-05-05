
import Sidebar from "@/components/Sidebar";
import ChatInput from "@/components/ChatInput";
import ChatMessage, { MessageProps } from "@/components/ChatMessage";
import ChatEmptyState from "@/components/ChatEmptyState";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for chat history
const mockChatHistory = [
  { id: "1", title: "Manufacturing Setup", active: true, date: "today" },
  { id: "2", title: "Document Analysis", active: false, date: "today" },
  { id: "3", title: "HR Policy Review", active: false, date: "30days" },
  { id: "4", title: "Supply Chain Optimization", active: false, date: "30days" },
];

interface IndexProps {
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(
    chatHistory.find(chat => chat.active)?.id || null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedIndustry");
    onLogout();
    navigate("/auth");
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      active: true,
      date: "today"
    };

    setChatHistory(prev => 
      prev.map(chat => ({ ...chat, active: false }))
        .concat(newChat)
    );
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  const handleSelectChat = (id: string) => {
    setChatHistory(prev => 
      prev.map(chat => ({
        ...chat,
        active: chat.id === id
      }))
    );
    setCurrentChatId(id);
    
    // In a real app, you'd load messages for this chat
    // For now, just clear messages if it's not the active chat
    if (id !== currentChatId) {
      setMessages([]);
    }
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Set processing state to simulate AI response
    setIsProcessing(true);
    
    // Simulate AI response time
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, as this is just a frontend demo, I can't actually process your request. In a real application, this would connect to the Jarfish API for meaningful responses.",
        sender: 'ai' as const,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      
      // Update chat title after first message if it's "New Chat"
      if (chatHistory.find(chat => chat.id === currentChatId)?.title === "New Chat") {
        setChatHistory(prev => 
          prev.map(chat => 
            chat.id === currentChatId 
              ? { ...chat, title: message.substring(0, 20) + (message.length > 20 ? '...' : '') } 
              : chat
          )
        );
      }
    }, 1000);
  };

  const isEmptyChat = messages.length === 0 && !isProcessing;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        chatHistory={chatHistory} 
        onNewChat={handleNewChat} 
        onSelectChat={handleSelectChat} 
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              {isEmptyChat ? (
                <ChatEmptyState onNewChat={handleNewChat} />
              ) : (
                <div className="max-w-4xl mx-auto">
                  {messages.map(message => (
                    <ChatMessage
                      key={message.id}
                      id={message.id}
                      content={message.content}
                      sender={message.sender}
                      timestamp={message.timestamp}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
        </main>
        
        {!isEmptyChat && (
          <div className="p-4 md:p-6">
            <ChatInput 
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
