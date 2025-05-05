
import React from 'react';
import { Button } from '@/components/ui/button';

interface ChatEmptyStateProps {
  onNewChat: () => void;
}

const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({ onNewChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8L12.01 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Jarfish</h2>
      <p className="text-gray-500 mb-8 max-w-md">Start a conversation with our advanced AI assistant.</p>
      <div className="flex gap-4">
        <Button onClick={onNewChat} variant="default" size="lg">
          Get started
        </Button>
        <Button onClick={onNewChat} variant="outline" size="lg">
          New chat
        </Button>
      </div>
    </div>
  );
};

export default ChatEmptyState;
