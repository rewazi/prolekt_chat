'use client'
import React, { useEffect, useState } from "react";
import Modal_window from './Modal_window.js';

export default function Home() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "text") {
        setMessages(prev => [...prev, data]);
      }
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    socket.onclose = () => {};

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && input.trim() !== "" && username.trim() !== "") {
      const msg = { username, message: input };
      ws.send(JSON.stringify(msg));
      setInput("");
    }
  };

  return (
    <>
      <Modal_window username={username} setUsername={setUsername} />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4"> Chat</h1>
        <div className="border p-3 h-64 overflow-y-auto bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i}>
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            className="border p-2 flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите сообщение..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Отправить
          </button>
        </div>
      </div>
    </>
  );
}
