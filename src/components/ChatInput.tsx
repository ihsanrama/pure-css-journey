
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isProcessing = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };
  
  const handleSendMessage = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message.trim());
      setMessage('');
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  return (
    <div className="chat-input-container w-full max-w-4xl mx-auto rounded-lg bg-white shadow-soft border border-gray-200 transition-all">
      <div className="flex items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Message Jarfish"
          className="flex-1 max-h-32 p-4 bg-transparent border-0 resize-none focus:ring-0 text-sm text-gray-800 placeholder-gray-500"
          style={{ height: '52px' }}
          disabled={isProcessing}
        />
        <div className="flex items-center px-3 py-2 space-x-2">
          <button className="p-1 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <Image size={18} />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isProcessing}
            className={`p-2 rounded-full ${
              message.trim() && !isProcessing
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 text-xs text-gray-500">
        AI-generated, for reference only
      </div>
    </div>
  );
};

export default ChatInput;
