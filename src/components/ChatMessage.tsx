
import React, { useEffect, useRef } from 'react';
import { ThumbsDown, ThumbsUp, Copy, RefreshCw } from 'lucide-react';

export interface MessageProps {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  animated?: boolean;
}

const ChatMessage: React.FC<MessageProps> = ({ 
  id, 
  content, 
  sender, 
  timestamp,
  animated = true
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (animated && messageRef.current) {
      messageRef.current.style.opacity = '0';
      messageRef.current.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.style.opacity = '1';
          messageRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, [animated]);

  return (
    <div 
      ref={messageRef}
      className={`flex w-full mb-6 transition-all duration-300 ease-out ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
      style={{ 
        opacity: animated ? 0 : 1,
        transform: animated ? 'translateY(10px)' : 'translateY(0)'
      }}
    >
      {sender === 'ai' && (
        <div className="mt-1 mr-3">
          <div className="ai-icon">
            <RefreshCw size={14} />
          </div>
        </div>
      )}
      
      <div className={`flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} max-w-4xl`}>
        <div className={`p-4 rounded-2xl ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
          {content}
        </div>
        
        {sender === 'ai' && (
          <div className="flex items-center mt-2 space-x-3 text-gray-500">
            <button className="p-1 rounded-full hover:bg-gray-100 transition-all">
              <Copy size={16} />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-all">
              <ThumbsUp size={16} />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-all">
              <ThumbsDown size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
