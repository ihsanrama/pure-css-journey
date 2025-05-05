
import Sidebar from "@/components/Sidebar";
import ChatInput from "@/components/ChatInput";
import React, { useState } from 'react';

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
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [isProcessing, setIsProcessing] = useState(false);

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
  };

  const handleSelectChat = (id: string) => {
    setChatHistory(prev => 
      prev.map(chat => ({
        ...chat,
        active: chat.id === id
      }))
    );
  };

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Set processing state to simulate AI response
    setIsProcessing(true);
    
    // Simulate AI response time
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        chatHistory={chatHistory} 
        onNewChat={handleNewChat} 
        onSelectChat={handleSelectChat} 
      />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {/* Chat messages would go here */}
          <div className="flex flex-col h-full">
            <div className="flex-1">
              {/* This is where chat messages would be displayed */}
            </div>
          </div>
        </main>
        
        <div className="p-4 md:p-6">
          <ChatInput 
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
