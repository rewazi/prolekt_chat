'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Main({ search }: { search: string }) {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received websocket message:', data);

      if (data.type === 'init') {
        setChats(data.chats || []);
      } else if (data.type === 'new_chat') {
        setChats(prevChats => [...prevChats, data]);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    setWs(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const query = (search).toLowerCase();
  const filteredChats = chats.filter(chat =>
    (chat.name).toLowerCase().includes(query) ||
    (chat.creator_username).toLowerCase().includes(query)
  );

  return (
    <section className="flex-1 overflow-y-auto p-[50px]">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[55px]">
        {filteredChats.map((chat) => (
          <div key={chat.id} className="bg-gradient-to-b from-[#2B2B2B] to-[#1F1F1F] rounded-[25px] overflow-hidden hover:scale-[1.02] transition-transform">
            <img src={chat.preview_image || "/assets/example.png"} alt={`${chat.name} preview`} className="w-full h-[125px] object-cover" />

            <div className="px-[20px] py-[10px] flex flex-col h-[150px] justify-between">
              <div>
                <h3 className="text-white font-bold text-[28px] pb-[10px]">{chat.name}</h3>

                <div className="flex items-center text-gray-400 text-[14px] gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[16px] h-[16px]"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14s1-4 6-4 6 4 6 4H2z" />
                  </svg>
                  <span>{chat.creator_username}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-[10px]">
                <div className="text-gray-400 text-[14px]">Created: {new Date(chat.created_at).toLocaleDateString()}</div>

                <button
                  onClick={() => router.push(`/chat/${chat.id}`)}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-1.5 rounded-[25px] text-sm transition"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
