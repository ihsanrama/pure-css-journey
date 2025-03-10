
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { MessageProps } from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { Button } from '@/components/ui/button';
import { RefreshCw, User, LogOut, Plus } from 'lucide-react';

const INITIAL_MESSAGES: MessageProps[] = [
  {
    id: '1',
    content: 'Halo, who are you?',
    sender: 'user',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    content: "Hello! I'm Jarfish, an artificial intelligence assistant. I'm at your service and would be delighted to assist you with any inquiries or tasks you may have.",
    sender: 'ai',
    timestamp: new Date().toISOString(),
  },
];

const Index = () => {
  const [messages, setMessages] = useState<MessageProps[]>(INITIAL_MESSAGES);
  const [isProcessing, setIsProcessing] = useState(false);
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
        content: "I'm sorry, as this is just a frontend demo, I can't actually process your request. In a real application, this would connect to the Jarfish API for meaningful responses.",
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold text-gray-800">Jarfish</h1>
        
        <Button onClick={handleNewChat} variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          <span>New chat</span>
        </Button>
        
        <Button variant="ghost" className="w-10 h-10 p-0 rounded-full">
          <User size={18} />
        </Button>
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
              <h3 className="text-xl font-medium text-gray-800 mb-2">Welcome to Jarfish</h3>
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
  );
};

export default Index;
