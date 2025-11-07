'use client';
import React, { useEffect, useState } from "react";
import Modal_window from "../windows/modal_window";
import Sidebar from "../components/sidebar";
import Header from "../components/header"; 

interface Message {
  username: string;
  message: string;
  type?: string;
}

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as Message | { type: string; messages: Message[] };

        if ("type" in data && data.type === "history" && "messages" in data) {
          setMessages(data.messages);
        } else if ("type" in data && data.type === "text") {
          setMessages((prev) => [...prev, data as Message]);
        }
      } catch (err) {
        console.error("Ошибка обработки сообщения:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => socket.close();
  }, []);

  const sendMessage = (): void => {
    if (ws && input.trim() !== "" && username.trim() !== "") {
      const msg = { username, message: input };
      ws.send(JSON.stringify(msg));
      setInput("");
    }
  };

  return (
    <>
      <Modal_window username={username} setUsername={setUsername} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>

      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />

        <main className="flex flex-1 flex-col bg-[#121212] min-w-0">
        <Header username={username} setUsername={setUsername} setIsModalOpen={setIsModalOpen}/>

          <div className="p-[25px] flex flex-col h-full overflow-hidden">
            <h1 className="text-[32px] font-extrabold text-white">Chat name</h1>

            <div className="flex-1 overflow-y-auto bg-[#1e1e1e] border border-gray-700 rounded-[5px] p-[10px] space-y-[10px]">
              {messages.map((msg, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-blue-500 font-semibold">{msg.username}</span>
                  <span className="text-white">{msg.message}</span>
                </div>
              ))}
            </div>

            <div className="flex pt-[10px]">
              <input
                className="flex-1 h-[70px] rounded-[5px] px-[10px] text-[24px] bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-[2px] focus:ring-blue-500 duration-500 ease-in-out"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-[24px] hover:bg-blue-700 text-white px-[20px] w-[200px] rounded-[5px] font-semibold ease-in-out duration-500"
              >
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}