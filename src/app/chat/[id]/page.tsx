'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Modal_window from "../../windows/change_nickname_modal_window";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import CreateChatModal from '../../windows/create_chat_modal_window';
import RegisterModal from '../../windows/registration_modal_window';

export default function ChatRoom() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id;
  const [chatName, setChatName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenChat, setIsModalOpenChat] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert('Пожалуйста, введите ваше имя пользователя');
      router.push('/');
      return;
    }
    setUsername(storedUsername);

    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'join_chat',
        chatId,
        username: storedUsername
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chat_history') {
        setChatName(data.chatName)
        setMessages(data.messages);
      } else if (data.type === 'chat_message' && data.chatId === chatId) {
        setMessages(prev => [...prev, data]);
      } else if (data.type === 'chat_info' && data.chatId === chatId) {
        setChatName(data.name);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [chatId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !ws) return;

    ws.send(JSON.stringify({
      type: 'chat_message',
      username,
      message: newMessage,
      chatId
    }));

    setNewMessage('');
  };

  return (
    <>
      <Modal_window username={username} setUsername={setUsername} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>

      <CreateChatModal isOpen={isModalOpenChat} setIsOpen={setIsModalOpenChat}/>

      <RegisterModal isOpen={registerModalOpen} setIsOpen={setRegisterModalOpen}/>

      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar setIsModalOpen={setIsModalOpen} setIsModalOpenChat={setIsModalOpenChat} />

        <main className="flex flex-1 flex-col bg-[#121212] min-w-0">
          <Header username={username} setUsername={setUsername} setIsModalOpen={setIsModalOpen} setRegisterModalOpen={setRegisterModalOpen} chats={[]} search="" setSearch={() => {}} />

          <div className="p-[25px] flex flex-col h-full overflow-hidden">
            <h1 className="text-[32px] h-[50px] font-extrabold text-white">{chatName}</h1>

            <div className="flex-1 overflow-y-auto bg-[#1e1e1e] border border-gray-700 rounded-[5px] p-[10px] space-y-[10px]">
              {messages.map((msg, i) => (
                <div key={i} className={`p-[15px] rounded-[5px] max-w-[70%] ${
                    msg.username === username
                      ? 'ml-auto bg-blue-500 text-white'
                      : 'bg-[#2B2B2B] text-white'
                  }`}
                >
                  <div className="font-bold text-[16px]">{msg.username}</div>
                  <div>{msg.message}</div>
                  {msg.created_at && (
                    <div className="text-[12px]">{new Date(msg.created_at).toLocaleTimeString()}</div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-[10px] pt-[10px]">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#2B2B2B] text-white rounded-[5px] px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-500 text-white px-9 py-4 rounded-[5px] hover:bg-blue-400 transition">Send</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
