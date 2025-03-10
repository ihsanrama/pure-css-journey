
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
      className="flex w-full mb-6 transition-all duration-300 ease-out"
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
        <div className={sender === 'user' ? 'user-bubble' : 'ai-bubble'}>
          {content}
        </div>
        
        {sender === 'ai' && (
          <div className="flex items-center mt-2 space-x-2 text-gray-500">
            <button className="p-1 rounded-full hover:bg-gray-100 transition-all">
              <Copy size={14} />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-all">
              <ThumbsUp size={14} />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-all">
              <ThumbsDown size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
