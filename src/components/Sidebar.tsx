
import React from 'react';
import { MessageSquare, Plus, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHistoryItem {
  id: string;
  title: string;
  active?: boolean;
  date: string;
}

interface SidebarProps {
  chatHistory: ChatHistoryItem[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chatHistory, onNewChat, onSelectChat }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedIndustry");
    navigate("/auth");
  };

  const selectedIndustry = localStorage.getItem("selectedIndustry") || "Not selected";

  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">jarfish</h1>
        </div>
      </div>
      
      <div className="p-3">
        <button 
          onClick={onNewChat}
          className="flex items-center gap-2 w-full py-2 px-3 bg-white rounded-lg text-sm text-gray-800 hover:bg-gray-50 transition-all shadow-sm border border-gray-200 hover:border-gray-300"
        >
          <Plus size={16} />
          <span>New chat</span>
        </button>
      </div>
      
      <div className="px-3 py-2">
        <div className="text-xs font-medium text-gray-500 mb-2">Industry: {selectedIndustry}</div>
      </div>
      
      <div className="px-3 py-2">
        <div className="text-xs font-medium text-gray-500 mb-2">Today</div>
        <div className="space-y-1">
          {chatHistory
            .filter(chat => chat.date === 'today')
            .map(chat => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm ${
                  chat.active 
                    ? 'bg-blue-50 text-blue-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                <MessageSquare size={16} />
                <span className="truncate">{chat.title}</span>
                {chat.active && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-auto"></div>}
              </button>
            ))}
        </div>
      </div>
      
      <div className="px-3 py-2">
        <div className="text-xs font-medium text-gray-500 mb-2">30 Days</div>
        <div className="space-y-1">
          {chatHistory
            .filter(chat => chat.date === '30days')
            .map(chat => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm ${
                  chat.active 
                    ? 'bg-blue-50 text-blue-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                <MessageSquare size={16} />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
        </div>
      </div>
      
      <div className="mt-auto border-t border-gray-200 p-3">
        <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <User size={16} />
          <span>My Profile</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
