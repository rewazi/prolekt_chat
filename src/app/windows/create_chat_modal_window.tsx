'use client';
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

interface CreateChatModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateChatModal({ isOpen, setIsOpen }: CreateChatModalProps) {
  const [chatData, setChatData] = useState({
    name: '',
    username: '',
    preview_image: ''
  });

  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);
    
    return () => {
        socket.close();
    };
  },[]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ws && chatData.name.trim() !== '' && chatData.username.trim() !== '') {
      ws.send(JSON.stringify({
        type: 'create_chat',
        ...chatData
      }));
      setIsOpen(false);

      setChatData({ name: '', username: '', preview_image: '' });
    }
  };

  const handleClose = () => {
    setIsOpen(false);

    setChatData({ name: '', username: '', preview_image: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-gray-700 rounded-[15px] p-6 w-[400px] shadow-2xl">
        <h2 className="text-white text-[28px] font-bold mb-4">Create New Chat</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Chat Name</label>
            <input
              autoFocus
              type="text"
              placeholder="Enter chat name"
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={chatData.name}
              onChange={(e) => setChatData({ ...chatData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Your Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={chatData.username}
              onChange={(e) => setChatData({ ...chatData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Preview Image URL (optional)</label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={chatData.preview_image}
              onChange={(e) => setChatData({ ...chatData, preview_image: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-[8px] font-semibold transition-colors duration-200"
              disabled={!chatData.name.trim() || !chatData.username.trim()}
            >
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}