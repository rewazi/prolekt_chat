'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateChat() {
  const router = useRouter();
  const [chatData, setChatData] = useState({
    name: '',
    username: '',
    preview_image: ''
  });
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onopen = () => {
      console.log('WebSocket connected for chat creation');
      setWs(socket);
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setWs(null);
    };
    
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ws) {
      ws.send(JSON.stringify({
        type: 'create_chat',
        ...chatData
      }));
      router.push('/');
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-md mx-auto bg-[#2B2B2B] rounded-lg p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Create New Chat</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Chat Name</label>
            <input
              type="text"
              value={chatData.name}
              onChange={(e) => setChatData({ ...chatData, name: e.target.value })}
              className="w-full p-2 rounded bg-[#1E1E1E] text-white border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Your Username</label>
            <input
              type="text"
              value={chatData.username}
              onChange={(e) => setChatData({ ...chatData, username: e.target.value })}
              className="w-full p-2 rounded bg-[#1E1E1E] text-white border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Preview Image URL (optional)</label>
            <input
              type="text"
              value={chatData.preview_image}
              onChange={(e) => setChatData({ ...chatData, preview_image: e.target.value })}
              className="w-full p-2 rounded bg-[#1E1E1E] text-white border border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition"
          >
            Create Chat
          </button>
        </form>
      </div>
    </div>
  );
}