'use client'

import { useState, useEffect } from "react";
import "./app.css";
import Sidebar from './components/sidebar';
import Header from './components/header';
import Main from './main/main';
import Modal_window from "./windows/modal_window";

export default function App() {
  const [username, setUsername] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <Modal_window username={username} setUsername={setUsername}isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>

      <Sidebar />

      <main className="flex flex-1 flex-col bg-[#121212]">

        <Header username={username} setUsername={setUsername} setIsModalOpen={setIsModalOpen}/>

        <Main />
      </main>
    </div>
  );
}
