
import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload } from 'lucide-react';

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

  const handleFileUpload = () => {
    // This is just a placeholder for the file upload functionality
    console.log('File upload clicked');
    // In a real implementation, this would open a file picker
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  return (
    <div className="chat-input-container w-full max-w-4xl mx-auto rounded-full bg-white shadow-soft border border-gray-200 transition-all">
      <div className="flex items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Message Jarfish"
          className="flex-1 max-h-32 px-6 py-4 bg-transparent border-0 resize-none focus:ring-0 text-sm text-gray-800 placeholder-gray-500"
          style={{ height: '52px' }}
          disabled={isProcessing}
        />
        <div className="flex items-center pr-4 py-2 gap-2">
          <button
            onClick={handleFileUpload}
            className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Upload file"
          >
            <Upload size={18} />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isProcessing}
            className={`p-2 rounded-full ${
              message.trim() && !isProcessing
                ? 'bg-[#111AFE] text-white hover:bg-[#111AFE]/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
