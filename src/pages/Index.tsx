
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatMessage, { MessageProps } from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const INITIAL_MESSAGES: MessageProps[] = [
  {
    id: '1',
    content: 'Halo, who are you?',
    sender: 'user',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    content: "Hello! I'm DeepSeek-V3, an artificial intelligence assistant created by DeepSeek. I'm at your service and would be delighted to assist you with any inquiries or tasks you may have.",
    sender: 'ai',
    timestamp: new Date().toISOString(),
  },
];

const CHAT_HISTORY = [
  {
    id: '1',
    title: 'User Greets AI Assistant DeepSeek-V3',
    active: true,
    date: 'today',
  },
  {
    id: '2',
    title: 'Creating DeepSeek Chat Layout',
    active: false,
    date: 'today',
  },
  {
    id: '3',
    title: 'Creating HTML Newsletter from',
    active: false,
    date: '30days',
  },
  {
    id: '4',
    title: 'Penyebaran Kendaraan Listrik di',
    active: false,
    date: '30days',
  },
  {
    id: '5',
    title: 'Earning $152,000 in New York: Is',
    active: false,
    date: '30days',
  },
  {
    id: '6',
    title: 'can you make me structure and',
    active: false,
    date: '30days',
  },
];

const Index = () => {
  const [messages, setMessages] = useState<MessageProps[]>(INITIAL_MESSAGES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState(CHAT_HISTORY);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageProps = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: MessageProps = {
        id: `ai-${Date.now()}`,
        content: "I'm sorry, as this is just a frontend demo, I can't actually process your request. In a real application, this would connect to the DeepSeek API for meaningful responses.",
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleNewChat = () => {
    // Create a new chat and set all chats to inactive
    const updatedHistory = chatHistory.map(chat => ({
      ...chat,
      active: false,
    }));
    
    // Add new chat to the top of the today list
    const newChat = {
      id: `chat-${Date.now()}`,
      title: 'New Conversation',
      active: true,
      date: 'today',
    };
    
    setChatHistory([newChat, ...updatedHistory]);
    setMessages([]);
  };

  const handleSelectChat = (id: string) => {
    // Set the selected chat to active and others to inactive
    const updatedHistory = chatHistory.map(chat => ({
      ...chat,
      active: chat.id === id,
    }));
    
    setChatHistory(updatedHistory);
    
    // In a real app, we would load the messages for this chat
    // For demo purposes, we'll just use the initial messages for any selected chat
    if (id === '1') {
      setMessages(INITIAL_MESSAGES);
    } else {
      setMessages([]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-14 border-b border-gray-200 flex items-center justify-center">
          <h2 className="text-sm font-medium text-gray-800">
            {chatHistory.find(chat => chat.active)?.title || 'New Conversation'}
          </h2>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide chat-window-container">
          <div className="max-w-4xl mx-auto">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    {...message}
                    animated={index >= messages.length - 2}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <RefreshCw size={28} />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Welcome to DeepSeek Chat</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Start a conversation with our advanced AI assistant.
                </p>
                <div className="space-x-4">
                  <Button onClick={() => handleSendMessage("What can you help me with?")} variant="outline">
                    Get started
                  </Button>
                  <Button onClick={handleNewChat} variant="secondary">
                    New chat
                  </Button>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
};

export default Index;
